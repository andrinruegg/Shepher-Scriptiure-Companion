
import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { ArrowLeft, Send, Image as ImageIcon, Mic, Loader2, Trash2, Check, CheckCheck, Palette, Database, Copy, X, AlertCircle, Settings } from 'lucide-react';
import { UserProfile, DirectMessage } from '../types';
import { db } from '../services/db';
import DrawingCanvas from './DrawingCanvas';

interface FriendChatProps {
  friend: UserProfile;
  onBack: () => void;
  currentUserShareId: string;
  onMessagesRead?: () => void; 
}

const STORAGE_SQL = `-- Run this in Supabase SQL Editor to fix Media Uploads:

-- 1. Create the 'chat-media' bucket
insert into storage.buckets (id, name, public) 
values ('chat-media', 'chat-media', true)
on conflict (id) do nothing;

-- 2. Allow authenticated users to upload
create policy "Authenticated users can upload chat media"
on storage.objects for insert
to authenticated
with check ( bucket_id = 'chat-media' );

-- 3. Allow everyone to view images/audio
create policy "Public access to chat media"
on storage.objects for select
to public
using ( bucket_id = 'chat-media' );`;

const FriendChat: React.FC<FriendChatProps> = ({ friend, onBack, currentUserShareId, onMessagesRead }) => {
  const [messages, setMessages] = useState<DirectMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [requestingMic, setRequestingMic] = useState(false);
  
  // SQL Help Modal State
  const [showSqlHelp, setShowSqlHelp] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  // Graffiti State
  const [showGraffitiCanvas, setShowGraffitiCanvas] = useState(false);
  const [graffitiUrl, setGraffitiUrl] = useState<string | null>(null);
  const [canvasDimensions, setCanvasDimensions] = useState({ width: 0, height: 0 });
  
  // Refs for logic
  const isDrawingRef = useRef(false);
  const lastUploadTimeRef = useRef(0); // Prevents stale reads after upload

  const [initialLoadDone, setInitialLoadDone] = useState(false);
  const hasScrolledRef = useRef(false);
  
  const [friendStatus, setFriendStatus] = useState<UserProfile | null>(null);
  const deletedIdsRef = useRef<Set<string>>(new Set());
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const timerRef = useRef<any>(null);

  const markAsRead = async () => {
      try {
        await db.social.markMessagesRead(friend.id);
        if (onMessagesRead) onMessagesRead();
      } catch (e) { console.error("Failed to mark read", e); }
  };

  useEffect(() => {
    setInitialLoadDone(false);
    hasScrolledRef.current = false;
    setMessages([]); 
    deletedIdsRef.current.clear();
    setFriendStatus(friend); 
    setGraffitiUrl(null); 
    lastUploadTimeRef.current = 0;
    
    fetchMessages(true); 
    fetchFriendStatus(); 
    loadGraffiti(); 
    
    markAsRead();
    db.social.heartbeat();

    const interval = setInterval(() => {
        fetchMessages(false);
        fetchFriendStatus();
        
        // Only load graffiti if not drawing AND we haven't just uploaded (grace period)
        if (!isDrawingRef.current && (Date.now() - lastUploadTimeRef.current > 10000)) {
            loadGraffiti(); 
        }
        
        markAsRead();
        db.social.heartbeat();
    }, 3000);
    return () => clearInterval(interval);
  }, [friend.id]);

  useLayoutEffect(() => {
      if (!initialLoadDone || messages.length === 0 || hasScrolledRef.current) return;
      const container = messagesContainerRef.current;
      if (!container) return;

      const performScroll = () => {
          const firstUnread = messages.find(m => m.sender_id === friend.id && !m.read_at);
          if (firstUnread) {
              const el = document.getElementById(`msg-${firstUnread.id}`);
              if (el) {
                  el.scrollIntoView({ behavior: 'auto', block: 'center' });
                  hasScrolledRef.current = true;
                  return;
              }
          }
          container.scrollTop = container.scrollHeight;
      };
      performScroll();
      requestAnimationFrame(() => { performScroll(); hasScrolledRef.current = true; });
  }, [initialLoadDone, messages, friend.id]); 

  useEffect(() => {
      if (initialLoadDone && hasScrolledRef.current && messages.length > 0) {
          const lastMsg = messages[messages.length - 1];
          const isMe = lastMsg.sender_id !== friend.id;
          if (isMe) {
              messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
          } else {
              const container = messagesContainerRef.current;
              if (container) {
                  const dist = container.scrollHeight - container.scrollTop - container.clientHeight;
                  if (dist < 300) {
                      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
                  }
              }
          }
      }
  }, [messages.length, initialLoadDone]);

  const fetchFriendStatus = async () => {
      try {
          const profile = await db.social.getUserProfile(friend.id);
          if (profile) setFriendStatus(profile);
      } catch (e) { console.error(e); }
  }

  const loadGraffiti = async () => {
      try {
          const url = await db.social.getGraffitiUrl(friend.id);
          if (url) setGraffitiUrl(url);
      } catch (e) { console.error("Error loading graffiti", e); }
  }

  const fetchMessages = async (isInitial: boolean = false) => {
      try {
          const msgs = await db.social.getMessages(friend.id);
          const filteredMsgs = msgs.filter(m => !deletedIdsRef.current.has(m.id));
          
          setMessages(prev => {
              const isDifferent = 
                  prev.length !== filteredMsgs.length || 
                  prev.some((m, i) => m.id !== filteredMsgs[i].id || m.read_at !== filteredMsgs[i].read_at);
              return isDifferent ? filteredMsgs : prev;
          });

          if (isInitial) setTimeout(() => setInitialLoadDone(true), 0);
      } catch (e) { console.error("Failed to fetch messages", e); }
  };

  const handleSendText = async () => {
      if (!inputText.trim()) return;
      setLoading(true);
      db.social.heartbeat(); 
      try {
          await db.social.sendMessage(friend.id, inputText, 'text');
          setInputText('');
          fetchMessages(false);
          setTimeout(() => {
               messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
          }, 100);
      } catch (e) { console.error("Failed to send", e); } finally { setLoading(false); }
  };

  const handleDeleteMessage = async (id: string, e: React.MouseEvent) => {
      e.stopPropagation(); e.preventDefault();
      setMessages(prev => prev.filter(m => m.id !== id));
      deletedIdsRef.current.add(id);
      try { await db.social.deleteDirectMessage(id); } catch (error: any) { console.error("[UI] Background delete failed:", error); }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      setUploading(true);
      try {
          const fileName = `${currentUserShareId}-${Date.now()}.jpg`;
          const url = await db.social.uploadMedia(file, fileName);
          await db.social.sendMessage(friend.id, url, 'image');
          fetchMessages(false);
          setTimeout(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }); }, 500);
      } catch (e: any) { 
          handleUploadError(e, "Image Upload Failed");
      } finally { setUploading(false); }
  };

  // --- GRAFFITI HANDLERS ---
  const startGraffiti = () => {
      if (messagesContainerRef.current) {
          const w = messagesContainerRef.current.scrollWidth || window.innerWidth;
          const h = Math.max(messagesContainerRef.current.scrollHeight, window.innerHeight);
          setCanvasDimensions({ width: w, height: h });
          setShowGraffitiCanvas(true);
          isDrawingRef.current = true; 
      }
  };

  const closeGraffiti = () => {
      setShowGraffitiCanvas(false);
      isDrawingRef.current = false; 
  }

  const handleSaveGraffiti = async (blob: Blob) => {
      if (uploading) return;
      setUploading(true);
      
      try {
          const url = await Promise.race([
              db.social.uploadGraffiti(friend.id, blob),
              new Promise((_, reject) => setTimeout(() => reject(new Error("Upload timed out. Check connection.")), 10000))
          ]) as string;
          
          lastUploadTimeRef.current = Date.now();
          setGraffitiUrl(url); 
          closeGraffiti(); 
      } catch (e: any) {
          handleUploadError(e, "Could not save drawing");
      } finally {
          setUploading(false);
      }
  };

  // --- AUDIO HANDLERS ---
  const getSupportedMimeType = () => {
      const types = ['audio/webm', 'audio/mp4', 'audio/ogg', 'audio/wav'];
      for (const type of types) {
          if (MediaRecorder.isTypeSupported(type)) return type;
      }
      return '';
  }

  const startRecording = async () => {
      setErrorMessage(null); // Clear previous errors
      setRequestingMic(true);
      
      // 1. Check Browser Support
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          setRequestingMic(false);
          setErrorMessage("Microphone not supported. Please use HTTPS or a modern browser.");
          return;
      }

      try {
          // This line triggers the browser permission prompt
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          
          // If we get here, user clicked "Allow"
          setRequestingMic(false);
          
          const mimeType = getSupportedMimeType();
          const options = mimeType ? { mimeType } : undefined;
          
          let recorder;
          try {
              recorder = new MediaRecorder(stream, options);
          } catch (err) {
              console.warn("MediaRecorder creation failed with options, trying defaults", err);
              recorder = new MediaRecorder(stream); // Fallback
          }

          const chunks: BlobPart[] = [];
          
          recorder.ondataavailable = (e) => {
              if (e.data.size > 0) chunks.push(e.data);
          };
          
          recorder.onstop = async () => {
              // Create blob with correct type
              const finalType = mimeType || 'audio/webm';
              const blob = new Blob(chunks, { type: finalType });
              
              stream.getTracks().forEach(track => track.stop()); // Stop mic immediately

              if (blob.size < 500) { // < 500 bytes is likely empty/noise
                  console.warn("Audio too short, discarded.");
                  return;
              }

              setUploading(true);
              try {
                  const ext = finalType.split('/')[1] || 'webm';
                  const fileName = `voice-${currentUserShareId}-${Date.now()}.${ext}`;
                  const url = await db.social.uploadMedia(blob, fileName);
                  await db.social.sendMessage(friend.id, url, 'audio');
                  fetchMessages(false);
                  setTimeout(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }); }, 200);
              } catch (e: any) { 
                  handleUploadError(e, "Voice Send Failed");
              } finally { 
                  setUploading(false); 
              }
          };
          
          recorder.start();
          setMediaRecorder(recorder);
          setIsRecording(true);
          setRecordingTime(0);
          timerRef.current = setInterval(() => setRecordingTime(p => p + 1), 1000);
      } catch (e: any) { 
          setRequestingMic(false);
          console.error("Mic Access Error:", e);
          
          // Improved Permission Error Detection
          const isPermissionError = 
              e.name === 'NotAllowedError' || 
              e.name === 'PermissionDeniedError' || 
              (typeof e.message === 'string' && e.message.toLowerCase().includes('permission denied'));

          if (isPermissionError) {
              setErrorMessage("Microphone blocked. Click the Lock icon 🔒 in your address bar to Allow.");
          } else {
              setErrorMessage(`Mic Error: ${e.message || "Unknown error"}`);
          }
      }
  };

  const stopRecording = () => {
      if (mediaRecorder && isRecording) {
          if (mediaRecorder.state !== 'inactive') {
              mediaRecorder.stop();
          }
          setIsRecording(false);
          clearInterval(timerRef.current);
      }
  };

  const handleUploadError = (e: any, context: string) => {
      const msg = e.message || "Unknown error";
      // Detect missing bucket or RLS policy errors
      if (msg.includes("row not found") || msg.includes("Unexpected token") || msg.includes("violates row-level security") || msg.includes("new row violates")) {
          setShowSqlHelp(true);
      } else {
          // If it's a fetch error, it's usually network
          if (msg.includes('Failed to fetch')) {
              setErrorMessage(`${context}: Network connection failed.`);
          } else {
              setErrorMessage(`${context}: ${msg}`);
          }
          setTimeout(() => setErrorMessage(null), 5000);
      }
  };

  const handleBack = async () => { await markAsRead(); onBack(); };

  const getStatusText = () => {
      if (!friendStatus || !friendStatus.last_seen) return 'Offline';
      const last = new Date(friendStatus.last_seen).getTime();
      const diff = Date.now() - last;
      if (diff < 5 * 60 * 1000) return 'Online';
      if (diff < 60 * 60 * 1000) return `Last seen ${Math.floor(diff / 60000)}m ago`;
      return 'Offline';
  };
  const isOnline = getStatusText() === 'Online';

  // --- RENDER ---
  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-900 overflow-hidden relative">
      {/* Error Toast */}
      {errorMessage && (
          <div className="absolute top-16 left-4 right-4 z-50 bg-red-100 dark:bg-red-900/90 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-100 p-4 rounded-xl shadow-xl flex items-start gap-3 animate-slide-up backdrop-blur-md">
              <AlertCircle size={20} className="mt-0.5 shrink-0 animate-pulse" />
              <div className="flex-1 text-sm font-medium">{errorMessage}</div>
              <button onClick={() => setErrorMessage(null)} className="p-1 hover:bg-red-200/50 rounded-full"><X size={18}/></button>
          </div>
      )}

      {/* Header */}
      <div className="flex items-center gap-3 p-4 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 shadow-sm z-30 relative shrink-0">
         <button onClick={handleBack} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500">
             <ArrowLeft size={20} />
         </button>
         <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden relative">
             {friend.avatar ? <img src={friend.avatar} className="w-full h-full object-cover" /> : null}
             {isOnline && <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-slate-800 rounded-full"></div>}
         </div>
         <div className="flex-1">
             <h3 className="font-bold text-slate-800 dark:text-white leading-tight">{friend.display_name}</h3>
             <div className="flex items-center gap-1.5">
                <p className={`text-xs ${isOnline ? 'text-emerald-600 font-medium' : 'text-slate-500'}`}>
                    {isOnline ? 'Active now' : getStatusText()}
                </p>
             </div>
         </div>
      </div>

      {/* Messages Container */}
      <div 
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-900 relative p-4 space-y-4 pb-20 scroll-smooth"
      >
        {/* SHARED GRAFFITI LAYER - Visible when NOT drawing. Z-Index 20 places it ON TOP of messages (z-10) */}
        {graffitiUrl && !showGraffitiCanvas && (
            <img 
                src={graffitiUrl} 
                className="absolute top-0 left-0 w-full pointer-events-none z-20 opacity-80 mix-blend-multiply dark:mix-blend-screen" 
                style={{ height: 'auto', minHeight: '100%', objectFit: 'cover' }}
                alt="Graffiti"
                crossOrigin="anonymous"
            />
        )}

        {messages.map(msg => {
            const isMe = msg.sender_id !== friend.id;
            return (
                <div 
                    key={msg.id} 
                    id={`msg-${msg.id}`}
                    className={`flex ${isMe ? 'justify-end' : 'justify-start'} group relative z-10`} 
                >
                    <div className={`max-w-[75%] rounded-2xl p-3 relative shadow-sm animate-pop-in ${
                        isMe 
                        ? 'bg-indigo-600 text-white rounded-tr-none' 
                        : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-tl-none'
                    }`}>
                        {msg.message_type === 'text' && <p>{msg.content}</p>}
                        
                        {msg.message_type === 'image' && (
                            <img 
                                src={msg.content} 
                                alt="Sent image" 
                                className="rounded-lg max-h-48 object-cover cursor-pointer bg-slate-950" 
                                onClick={() => window.open(msg.content, '_blank')}
                                crossOrigin="anonymous"
                            />
                        )}

                        {msg.message_type === 'audio' && (
                            <audio controls src={msg.content} className="h-10 w-[200px]" />
                        )}
                        
                        <div className={`text-[10px] mt-1 flex items-center gap-2 ${isMe ? 'justify-end text-indigo-200' : 'justify-start text-slate-400'}`}>
                            <span>{new Date(msg.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                            {isMe && (
                                <div className="flex items-center gap-1">
                                    {msg.read_at ? (
                                        <span title="Seen"><CheckCheck size={14} className="text-blue-300" /></span>
                                    ) : (
                                        <span title="Delivered"><Check size={14} className="opacity-70" /></span>
                                    )}
                                    <button 
                                        onClick={(e) => handleDeleteMessage(msg.id, e)}
                                        className="ml-2 p-1.5 bg-red-600/20 hover:bg-red-600 text-white rounded-full transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100"
                                        title="Delete Message"
                                        type="button"
                                    >
                                        <Trash2 size={12} />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )
        })}
        <div ref={messagesEndRef} />

        {/* GRAFFITI EDITING MODE (Overlay) */}
        {showGraffitiCanvas && (
            <DrawingCanvas 
               initialImage={graffitiUrl}
               onClose={closeGraffiti}
               onSend={handleSaveGraffiti}
               width={canvasDimensions.width}
               height={canvasDimensions.height}
               isSaving={uploading}
            />
        )}
      </div>

      {/* Input Area */}
      <div className="p-3 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2 z-30 relative shrink-0">
         {isRecording ? (
             <div className="flex-1 flex items-center justify-between bg-red-50 dark:bg-red-900/20 px-4 py-2 rounded-full border border-red-200 dark:border-red-900 transition-all animate-pulse">
                 <div className="flex items-center gap-2 text-red-600">
                     <div className="w-3 h-3 bg-red-600 rounded-full animate-bounce"></div>
                     <span className="font-mono font-bold">{Math.floor(recordingTime / 60)}:{(recordingTime % 60).toString().padStart(2, '0')}</span>
                 </div>
                 <button onClick={stopRecording} className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 shadow-lg">
                     <Send size={18} />
                 </button>
             </div>
         ) : (
             <>
                 <button 
                    onClick={startGraffiti}
                    className="p-2.5 bg-pink-100 dark:bg-pink-900/30 text-pink-500 hover:bg-pink-200 dark:hover:bg-pink-900/50 rounded-full transition-colors"
                    title="Paint Mode"
                 >
                     <Palette size={20} />
                 </button>

                 <label className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer transition-colors">
                     <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploading} />
                     <ImageIcon size={20} />
                 </label>
                 
                 <div className="flex-1 relative">
                    <input 
                        type="text" 
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Message..."
                        className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-full px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white"
                        onKeyDown={(e) => e.key === 'Enter' && handleSendText()}
                    />
                 </div>

                 {inputText.trim() ? (
                     <button onClick={handleSendText} disabled={loading} className="p-2.5 bg-indigo-600 text-white rounded-full hover:bg-indigo-700">
                         {loading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
                     </button>
                 ) : (
                     <button 
                        onClick={startRecording} 
                        disabled={requestingMic}
                        className={`p-2.5 rounded-full transition-all ${requestingMic ? 'bg-indigo-100 text-indigo-500 dark:bg-indigo-900/30 dark:text-indigo-400' : 'bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-700 active:scale-95'}`}
                     >
                         {requestingMic ? <Loader2 size={20} className="animate-spin" /> : <Mic size={20} />}
                     </button>
                 )}
             </>
         )}
      </div>

      {uploading && (
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center z-50">
              <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-xl flex items-center gap-3">
                  <Loader2 className="animate-spin text-indigo-600" />
                  <span className="text-sm font-medium dark:text-white">Sending...</span>
              </div>
          </div>
      )}

      {/* SQL HELP MODAL */}
      {showSqlHelp && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowSqlHelp(false)} />
              <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-xl shadow-2xl p-6 border border-red-200 dark:border-red-900 animate-scale-in">
                  <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                          <Database size={24} />
                          <h3 className="text-lg font-bold">Database Setup Required</h3>
                      </div>
                      <button onClick={() => setShowSqlHelp(false)} className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"><X size={20}/></button>
                  </div>
                  
                  <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
                      The "chat-media" storage bucket is missing in Supabase. Please copy the code below and run it in the Supabase <strong>SQL Editor</strong>.
                  </p>

                  <div className="relative group">
                      <pre className="bg-slate-950 text-slate-200 p-4 rounded-lg text-[10px] md:text-xs overflow-x-auto font-mono border border-slate-800">
                          {STORAGE_SQL}
                      </pre>
                      <button 
                        onClick={() => { navigator.clipboard.writeText(STORAGE_SQL); alert("Copied to clipboard!"); }}
                        className="absolute top-2 right-2 p-2 bg-white/10 hover:bg-white/20 text-white rounded-md transition-colors"
                        title="Copy SQL"
                      >
                          <Copy size={14} />
                      </button>
                  </div>

                  <div className="mt-4 flex justify-end">
                      <button onClick={() => setShowSqlHelp(false)} className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700">
                          Done
                      </button>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};

export default FriendChat;
