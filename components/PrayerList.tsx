
import React, { useState, useEffect, useRef } from 'react';
import { Plus, Trash2, Feather, Circle, CheckCircle2, Globe, Lock, Users, User, Eye, EyeOff, ArrowLeft, Calendar } from 'lucide-react';
import { SavedItem, PrayerVisibility, UserProfile } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { useTranslation } from 'react-i18next';
import { db } from '../services/db';

interface PrayerListProps {
    savedItems: SavedItem[];
    onSaveItem: (item: SavedItem) => void;
    onUpdateItem: (item: SavedItem) => void;
    onRemoveItem: (id: string) => void;
    language: string;
    onMenuClick: () => void;
    currentUserId?: string;
    userName?: string;
    userAvatar?: string;
}

const PrayerList: React.FC<PrayerListProps> = ({ 
    savedItems, 
    onSaveItem, 
    onUpdateItem, 
    onRemoveItem, 
    language, 
    onMenuClick, 
    currentUserId,
    userName,
    userAvatar
}) => {
    const { t } = useTranslation();
    const [newPrayer, setNewPrayer] = useState('');
    const [activeTab, setActiveTab] = useState<'journal' | 'community'>('journal');
    const [visibility, setVisibility] = useState<PrayerVisibility>('private');
    const [showVisibilityMenu, setShowVisibilityMenu] = useState(false);
    const [selectedFriends, setSelectedFriends] = useState<string[]>([]);
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [communityPrayers, setCommunityPrayers] = useState<SavedItem[]>([]);
    const [loadingCommunity, setLoadingCommunity] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const prayers = savedItems.filter(i => i.type === 'prayer');
    const activePrayers = prayers.filter(p => !p.metadata?.answered);
    const answeredPrayers = prayers.filter(p => p.metadata?.answered);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setShowVisibilityMenu(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (activeTab === 'community') loadCommunityPrayers();
    }, [activeTab]);

    const loadCommunityPrayers = async () => {
        setLoadingCommunity(true);
        try {
            const data = await db.prayers.getCommunityPrayers();
            setCommunityPrayers(data);
        } catch(e) { console.error(e); } 
        finally { setLoadingCommunity(false); }
    };

    const handleAddPrayer = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!newPrayer.trim()) return;
        const authorName = userName || localStorage.getItem('displayName') || t('common.guest');
        const authorAvatar = userAvatar || localStorage.getItem('userAvatar') || '';
        const item: SavedItem = {
            id: uuidv4(),
            type: 'prayer',
            content: newPrayer.trim(),
            date: Date.now(),
            metadata: { 
                answered: false, visibility, allowed_users: visibility === 'specific' ? selectedFriends : [],
                is_anonymous: isAnonymous, author_name: authorName, author_avatar: authorAvatar,
                interactions: { type: 'amen', count: 0, user_ids: [] }
            }
        };
        onSaveItem(item);
        setNewPrayer('');
        setVisibility('private');
        setSelectedFriends([]);
        setIsAnonymous(false);
        if (activeTab === 'community' && visibility !== 'private') setTimeout(loadCommunityPrayers, 500);
    };

    const handleAmen = async (prayer: SavedItem) => {
        setCommunityPrayers(prev => prev.map(p => {
            if (p.id === prayer.id) {
                 const interactions = p.metadata?.interactions || { type: 'amen', count: 0, user_ids: [] };
                 const hasAmened = interactions.user_ids.includes(currentUserId || "");
                 let newCount = hasAmened ? Math.max(0, interactions.count - 1) : interactions.count + 1;
                 let newIds = hasAmened ? interactions.user_ids.filter((id: string) => id !== currentUserId) : [...interactions.user_ids, currentUserId || ""];
                 return { ...p, metadata: { ...p.metadata, interactions: { ...interactions, count: newCount, user_ids: newIds } } };
            }
            return p;
        }));
        try { await db.prayers.toggleAmen(prayer.id, prayer.metadata); } catch (e) { console.error(e); }
    };

    const VisibilityIcon = ({ vis }: { vis: PrayerVisibility }) => {
        switch(vis) {
            case 'public': return <Globe size={14} className="text-emerald-500" />;
            case 'friends': return <Users size={14} className="text-amber-500" />;
            default: return <Lock size={14} className="text-stone-500" />;
        }
    };

    return (
        <div className="flex flex-col h-full bg-[#fdfbf7] dark:bg-slate-900">
            <header className="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 p-4 shadow-sm sticky top-0 z-20 flex flex-col items-center">
                <div className="w-full max-w-3xl flex flex-col gap-4">
                    <div className="flex items-center gap-3 w-full">
                        <button onClick={onMenuClick} className="p-2 -ml-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 rounded-lg"><ArrowLeft size={24} /></button>
                        <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-xl text-amber-700"><Feather size={24} /></div>
                        <h1 className="text-xl font-bold text-slate-800 dark:text-white font-serif-text">{t('prayer.title')}</h1>
                    </div>
                    <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-lg w-full">
                        <button onClick={() => setActiveTab('journal')} className={`flex-1 py-2 text-xs font-black uppercase tracking-widest rounded-lg transition-all ${activeTab === 'journal' ? 'bg-white dark:bg-slate-700 shadow-sm text-amber-700 dark:text-white' : 'text-slate-500'}`}>{t('prayer.tabs.journal')}</button>
                        <button onClick={() => setActiveTab('community')} className={`flex-1 py-2 text-xs font-black uppercase tracking-widest rounded-lg transition-all ${activeTab === 'community' ? 'bg-white dark:bg-slate-700 shadow-sm text-amber-700 dark:text-white' : 'text-slate-500'}`}>{t('prayer.tabs.community')}</button>
                    </div>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto p-4 md:p-8">
                <div className="max-w-3xl mx-auto space-y-8">
                    {activeTab === 'journal' && (
                        <>
                            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border dark:border-slate-700 animate-slide-up">
                                <textarea value={newPrayer} onChange={(e) => setNewPrayer(e.target.value)} placeholder={t('prayer.placeholder')} rows={3} className="w-full bg-transparent outline-none text-slate-800 dark:text-slate-200 placeholder-slate-400 resize-none mb-4 text-lg font-serif-text italic" />
                                <div className="flex items-center justify-between border-t dark:border-slate-700 pt-4">
                                    <div className="flex gap-2">
                                        <div className="relative" ref={menuRef}>
                                            <button onClick={() => setShowVisibilityMenu(!showVisibilityMenu)} className="flex items-center gap-2 px-3 py-2 bg-slate-100 dark:bg-slate-900 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-400 transition-colors">
                                                <VisibilityIcon vis={visibility} /> 
                                                <span>{visibility === 'private' ? t('prayer.privacy.private') : t('prayer.privacy.public')}</span>
                                            </button>
                                            {showVisibilityMenu && (
                                                <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-slate-800 shadow-xl border dark:border-slate-700 z-30 rounded-xl overflow-hidden animate-scale-in">
                                                    <button onClick={() => { setVisibility('private'); setShowVisibilityMenu(false); }} className="w-full text-left px-4 py-3 text-xs font-medium hover:bg-slate-50 dark:hover:bg-slate-750 flex items-center gap-2 dark:text-white"><Lock size={14}/> {t('prayer.privacy.private')}</button>
                                                    <button onClick={() => { setVisibility('public'); setShowVisibilityMenu(false); }} className="w-full text-left px-4 py-3 text-xs font-medium hover:bg-slate-50 dark:hover:bg-slate-750 flex items-center gap-2 dark:text-white"><Globe size={14}/> {t('prayer.privacy.public')}</button>
                                                </div>
                                            )}
                                        </div>
                                        <button onClick={() => setIsAnonymous(!isAnonymous)} className={`flex items-center gap-2 px-3 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors ${isAnonymous ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-500'}`}>
                                            {isAnonymous ? <EyeOff size={14} /> : <Eye size={14} />}
                                            <span>{isAnonymous ? t('prayer.privacy.anonymous') : t('prayer.privacy.publicId')}</span>
                                        </button>
                                    </div>
                                    <button onClick={handleAddPrayer} disabled={!newPrayer.trim()} className="p-3 bg-amber-700 text-white rounded-2xl hover:bg-amber-800 disabled:opacity-50 shadow-lg"><Plus size={24} /></button>
                                </div>
                            </div>
                            <section>
                                <h3 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                                    <Circle size={10} className="fill-amber-600 text-amber-600"/> 
                                    {t('prayer.active')}
                                </h3>
                                {activePrayers.length === 0 ? <div className="text-center py-12 text-slate-400 italic text-sm border-2 border-dashed dark:border-slate-800 rounded-3xl">{t('prayer.empty')}</div> : (
                                    <div className="space-y-4">
                                        {activePrayers.map(p => (
                                            <div key={p.id} className="group bg-white dark:bg-slate-800 p-6 rounded-3xl border dark:border-slate-700 shadow-sm hover:shadow-md transition-all">
                                                <div className="flex items-start gap-4">
                                                    <button onClick={() => onUpdateItem({...p, metadata:{...p.metadata, answered:true}})} className="mt-1 text-slate-300 hover:text-emerald-500 transition-colors"><Circle size={24}/></button>
                                                    <div className="flex-1">
                                                        <p className="text-slate-800 dark:text-slate-200 text-lg font-serif-text leading-relaxed">"{p.content}"</p>
                                                        <div className="flex items-center gap-3 mt-4">
                                                            <span className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1"><Calendar size={10}/> {new Date(p.date).toLocaleDateString()}</span>
                                                        </div>
                                                    </div>
                                                    <button onClick={() => onRemoveItem(p.id)} className="p-2 text-slate-200 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"><Trash2 size={20}/></button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </section>
                        </>
                    )}
                    {activeTab === 'community' && (
                        <div className="space-y-4">
                             {loadingCommunity && <div className="text-center py-12 text-slate-400 animate-pulse">{t('common.loading')}</div>}
                             {!loadingCommunity && communityPrayers.length === 0 && <div className="text-center py-12 text-slate-400 italic text-sm border-2 border-dashed dark:border-slate-800 rounded-3xl">{t('prayer.communityEmpty')}</div>}
                             {communityPrayers.map((prayer) => (
                                 <div key={prayer.id} className="bg-white dark:bg-slate-800 p-6 rounded-3xl border dark:border-slate-700 shadow-sm animate-slide-up">
                                      <div className="flex items-center gap-3 mb-4">
                                          <div className="w-10 h-10 rounded-full bg-stone-100 dark:bg-slate-700 flex items-center justify-center text-sm font-bold text-slate-500 dark:text-slate-300 border dark:border-slate-600">
                                              {prayer.metadata?.author_avatar ? <img src={prayer.metadata.author_avatar} className="w-full h-full rounded-full object-cover" /> : (prayer.metadata?.author_name?.charAt(0) || '?')}
                                          </div>
                                          <div>
                                              <div className="text-sm font-bold text-slate-800 dark:text-white">{prayer.metadata?.is_anonymous ? t('prayer.privacy.anonymous') : (prayer.metadata?.author_name || t('common.guest'))}</div>
                                              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{new Date(prayer.date).toLocaleDateString()}</div>
                                          </div>
                                      </div>
                                      <p className="text-slate-800 dark:text-slate-200 text-lg leading-relaxed mb-6 font-serif-text italic">"{prayer.content}"</p>
                                      <button 
                                        onClick={() => handleAmen(prayer)} 
                                        className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl transition-all ${prayer.metadata?.interactions?.user_ids?.includes(currentUserId || "") ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300' : 'bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-750'}`}
                                      >
                                          <span className="text-sm font-black">🙏 {t('prayer.amen')}</span>
                                          {((prayer.metadata?.interactions?.count ?? 0) > 0) && (
                                              <span className="text-[10px] font-black bg-white/50 dark:bg-black/20 px-2 py-0.5 rounded-full min-w-[20px] text-center">
                                                  {prayer.metadata?.interactions?.count}
                                              </span>
                                          )}
                                      </button>
                                 </div>
                             ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default PrayerList;
