
import { supabase } from './supabase';
import { ChatSession, Message, SavedItem, BibleHighlight, UserProfile, FriendRequest, DirectMessage } from '../types';

const ensureSupabase = () => {
    if (!supabase) throw new Error("Database not connected.");
}

export const db = {
  /**
   * Fetch all chats and their messages for the current user.
   */
  async getUserChats(): Promise<ChatSession[]> {
    ensureSupabase();
    // @ts-ignore
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    // @ts-ignore
    const { data: chatsData, error: chatsError } = await supabase
      .from('chats')
      .select(`
        id,
        title,
        created_at,
        messages (
          id,
          role,
          text,
          is_error,
          created_at
        )
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (chatsError) throw chatsError;

    // Transform DB shape to App shape
    return (chatsData || []).map((chat: any) => ({
      id: chat.id,
      title: chat.title || 'New Conversation',
      createdAt: new Date(chat.created_at).getTime(),
      messages: (chat.messages || [])
        .sort((a: any, b: any) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
        .map((m: any) => ({
          id: m.id,
          role: m.role,
          text: m.text,
          isError: m.is_error,
          timestamp: m.created_at
        }))
    }));
  },

  /**
   * Create a new chat session.
   */
  async createChat(title: string = 'New Conversation', initialMessage?: Message, id?: string): Promise<ChatSession> {
    ensureSupabase();
    // @ts-ignore
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const chatData: any = { user_id: user.id, title };
    if (id) chatData.id = id;

    // @ts-ignore
    const { data: chat, error: chatError } = await supabase
      .from('chats')
      .insert(chatData)
      .select()
      .single();

    if (chatError) throw chatError;

    let savedMessages: Message[] = [];
    if (initialMessage) {
       savedMessages = await this.addMessage(chat.id, initialMessage);
    }

    return {
      id: chat.id,
      title: chat.title,
      createdAt: new Date(chat.created_at).getTime(),
      messages: savedMessages
    };
  },

  async deleteChat(chatId: string) {
    ensureSupabase();
    // @ts-ignore
    const { error: msgError } = await supabase.from('messages').delete().eq('chat_id', chatId);
    if (msgError) console.warn("Message deletion warning:", msgError);

    // @ts-ignore
    const { error } = await supabase.from('chats').delete().eq('id', chatId);
    if (error) throw error;
  },

  async updateChatTitle(chatId: string, title: string) {
    ensureSupabase();
    // @ts-ignore
    const { error } = await supabase.from('chats').update({ title }).eq('id', chatId);
    if (error) throw error;
  },

  async addMessage(chatId: string, message: Message): Promise<Message[]> {
    ensureSupabase();
    // @ts-ignore
    const { data, error } = await supabase
      .from('messages')
      .insert({
        chat_id: chatId,
        role: message.role,
        text: message.text,
        is_error: message.isError || false,
        created_at: typeof message.timestamp === 'string' ? message.timestamp : message.timestamp.toISOString()
      })
      .select()
      .single();

    if (error) throw error;
    
    return [{
        id: data.id,
        role: data.role,
        text: data.text,
        isError: data.is_error,
        timestamp: data.created_at
    }];
  },

  // --- SAVED ITEMS CRUD ---

  async getSavedItems(): Promise<SavedItem[]> {
      ensureSupabase();
      // @ts-ignore
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      // @ts-ignore
      const { data, error } = await supabase
          .from('saved_items')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
      
      if (error) throw error;

      return (data || []).map((item: any) => ({
          id: item.id,
          type: item.type as 'verse' | 'chat',
          content: item.content,
          reference: item.reference,
          date: new Date(item.created_at).getTime()
      }));
  },

  async saveItem(item: SavedItem) {
      ensureSupabase();
      // @ts-ignore
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // @ts-ignore
      const { error } = await supabase
          .from('saved_items')
          .insert({
              user_id: user.id,
              type: item.type,
              content: item.content,
              reference: item.reference,
              created_at: new Date(item.date).toISOString()
          });
      
      if (error) throw error;
  },

  async deleteSavedItem(id: string) {
      ensureSupabase();
      // @ts-ignore
      const { error } = await supabase.from('saved_items').delete().eq('id', id);
      if (error) throw error;
  },

  // --- HIGHLIGHTS CRUD ---

  async getHighlights(): Promise<BibleHighlight[]> {
      ensureSupabase();
      // @ts-ignore
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      // @ts-ignore
      const { data, error } = await supabase.from('highlights').select('*').eq('user_id', user.id);
      if (error) throw error;

      return (data || []).map((h: any) => ({
          id: h.id,
          ref: h.ref,
          color: h.color as 'yellow'|'green'|'blue'|'pink'
      }));
  },

  async addHighlight(highlight: BibleHighlight) {
      ensureSupabase();
      // @ts-ignore
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // @ts-ignore
      const { error } = await supabase.from('highlights').insert({ user_id: user.id, ref: highlight.ref, color: highlight.color });
      if (error) throw error;
  },

  async deleteHighlight(ref: string) {
      ensureSupabase();
      // @ts-ignore
      const { error } = await supabase.from('highlights').delete().eq('ref', ref);
      if (error) throw error;
  },

  // --- SOCIAL / FRIENDS SYSTEM ---

  social: {
      /**
       * Checks if a Share ID is already taken by ANY user.
       */
      async checkShareIdExists(shareId: string): Promise<boolean> {
          ensureSupabase();
          // @ts-ignore
          const { data, error } = await supabase
              .from('profiles')
              .select('id')
              .eq('share_id', shareId)
              .maybeSingle();
          
          return !!data;
      },

      /**
       * Syncs profile.
       * CRITICAL: Before saving, it checks if the DB already has a share_id.
       * If yes, it KEEPS the DB version to ensure persistence across devices.
       */
      async upsertProfile(shareId: string, displayName: string, avatar?: string, bio?: string) {
          ensureSupabase();
          // @ts-ignore
          const { data: { user } } = await supabase.auth.getUser();
          if (!user) return;

          // 1. Fetch current DB profile to see if ID exists
          // @ts-ignore
          const { data: existing } = await supabase
              .from('profiles')
              .select('share_id')
              .eq('id', user.id)
              .maybeSingle();

          // 2. Determine which ID to save
          let finalIdToSave = shareId;
          
          if (existing && existing.share_id) {
              // DATABASE IS TRUTH: If DB has an ID, use it. Ignore local.
              finalIdToSave = existing.share_id;
          }

          const updates: any = {
              id: user.id,
              display_name: displayName,
              avatar: avatar || null,
              bio: bio || null,
              share_id: finalIdToSave
          };

          // @ts-ignore
          const { error } = await supabase
              .from('profiles')
              .upsert(updates, { onConflict: 'id' });
          
          if (error) console.error("Profile sync failed", error);
          
          return finalIdToSave;
      },

      async getUserProfile(userId: string): Promise<UserProfile | null> {
          ensureSupabase();
          // @ts-ignore
          const { data, error } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', userId)
              .maybeSingle(); 
          
          if (error || !data) return null;
          return data as UserProfile;
      },

      async searchUserByShareId(shareId: string): Promise<UserProfile | null> {
          ensureSupabase();
          // @ts-ignore
          const { data, error } = await supabase
              .from('profiles')
              .select('*')
              .eq('share_id', shareId)
              .maybeSingle();

          if (error || !data) return null;
          return data as UserProfile;
      },

      async sendFriendRequest(targetUserId: string) {
          ensureSupabase();
          // @ts-ignore
          const { data: { user } } = await supabase.auth.getUser();
          if (!user) throw new Error('Not authenticated');
          if (user.id === targetUserId) throw new Error("You cannot add yourself.");

          // @ts-ignore
          const { data: existing } = await supabase
             .from('friendships')
             .select('*')
             .or(`and(requester_id.eq.${user.id},receiver_id.eq.${targetUserId}),and(requester_id.eq.${targetUserId},receiver_id.eq.${user.id})`)
             .maybeSingle();
          
          if (existing) throw new Error("Request already sent or you are already friends.");

          // @ts-ignore
          const { error } = await supabase
              .from('friendships')
              .insert({ requester_id: user.id, receiver_id: targetUserId, status: 'pending' });

          if (error) throw error;
      },

      async getIncomingRequests(): Promise<FriendRequest[]> {
          ensureSupabase();
          // @ts-ignore
          const { data: { user } } = await supabase.auth.getUser();
          if (!user) return [];

          // @ts-ignore
          const { data, error } = await supabase
              .from('friendships')
              .select(`
                  id, created_at, status,
                  requester:profiles!requester_id ( id, share_id, display_name, avatar, bio )
              `)
              .eq('receiver_id', user.id)
              .eq('status', 'pending');
          
          if (error) throw error;
          
          return (data || []).map((r: any) => ({
              id: r.id, status: r.status, created_at: r.created_at, requester: r.requester
          }));
      },

      async respondToRequest(requestId: string, accept: boolean) {
          ensureSupabase();
          if (accept) {
              // @ts-ignore
              const { error } = await supabase.from('friendships').update({ status: 'accepted' }).eq('id', requestId);
              if (error) throw error;
          } else {
              // @ts-ignore
              const { error } = await supabase.from('friendships').delete().eq('id', requestId);
              if (error) throw error;
          }
      },

      async removeFriend(friendId: string) {
          ensureSupabase();
          // @ts-ignore
          const { data: { user } } = await supabase.auth.getUser();
          if (!user) throw new Error("Not authenticated");

          // @ts-ignore
          const { error } = await supabase
              .from('friendships')
              .delete()
              .or(`and(requester_id.eq.${user.id},receiver_id.eq.${friendId}),and(requester_id.eq.${friendId},receiver_id.eq.${user.id})`);

          if (error) throw error;
      },

      async getFriends(): Promise<UserProfile[]> {
          ensureSupabase();
          // @ts-ignore
          const { data: { user } } = await supabase.auth.getUser();
          if (!user) return [];

          // @ts-ignore
          const { data, error } = await supabase
              .from('friendships')
              .select(`requester:profiles!requester_id(*), receiver:profiles!receiver_id(*)`)
              .eq('status', 'accepted')
              .or(`requester_id.eq.${user.id},receiver_id.eq.${user.id}`);
          
          if (error) throw error;

          const friends: UserProfile[] = [];
          (data || []).forEach((row: any) => {
              if (row.requester.id !== user.id) friends.push(row.requester);
              if (row.receiver.id !== user.id) friends.push(row.receiver);
          });
          return friends;
      },
      
      async getMessages(friendId: string): Promise<DirectMessage[]> {
          ensureSupabase();
          // @ts-ignore
          const { data: { user } } = await supabase.auth.getUser();
          if (!user) return [];

          // @ts-ignore
          const { data, error } = await supabase
              .from('direct_messages')
              .select('*')
              .or(`and(sender_id.eq.${user.id},receiver_id.eq.${friendId}),and(sender_id.eq.${friendId},receiver_id.eq.${user.id})`)
              .order('created_at', { ascending: true });
          
          if (error) throw error;
          return data || [];
      },

      async sendMessage(friendId: string, content: string, type: 'text'|'image'|'audio' = 'text'): Promise<DirectMessage> {
          ensureSupabase();
          // @ts-ignore
          const { data: { user } } = await supabase.auth.getUser();
          if (!user) throw new Error("Not authenticated");

          // @ts-ignore
          const { data, error } = await supabase
              .from('direct_messages')
              .insert({ sender_id: user.id, receiver_id: friendId, content: content, message_type: type })
              .select()
              .single();
          
          if (error) throw error;
          return data;
      },

      async uploadMedia(file: Blob, path: string): Promise<string> {
          ensureSupabase();
          // @ts-ignore
          const { data, error } = await supabase.storage.from('chat-media').upload(path, file);
          if (error) throw error;
          
          // @ts-ignore
          const { data: urlData } = supabase.storage.from('chat-media').getPublicUrl(path);
          return urlData.publicUrl;
      }
  }
};
