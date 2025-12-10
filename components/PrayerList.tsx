

import React, { useState } from 'react';
import { Plus, Trash2, Check, Feather, Calendar, Menu, Circle, CheckCircle2 } from 'lucide-react';
import { SavedItem } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { translations } from '../utils/translations';

interface PrayerListProps {
    savedItems: SavedItem[];
    onSaveItem: (item: SavedItem) => void;
    onUpdateItem: (item: SavedItem) => void;
    onRemoveItem: (id: string) => void;
    language: string;
    onMenuClick: () => void;
}

const PrayerList: React.FC<PrayerListProps> = ({ savedItems, onSaveItem, onUpdateItem, onRemoveItem, language, onMenuClick }) => {
    const [newPrayer, setNewPrayer] = useState('');
    const t = translations[language]?.prayer || translations['English'].prayer;

    // Filter only prayers
    const prayers = savedItems.filter(i => i.type === 'prayer');
    const activePrayers = prayers.filter(p => !p.metadata?.answered);
    const answeredPrayers = prayers.filter(p => p.metadata?.answered);

    const handleAddPrayer = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!newPrayer.trim()) return;

        const item: SavedItem = {
            id: uuidv4(),
            type: 'prayer',
            content: newPrayer.trim(),
            date: Date.now(),
            metadata: { answered: false }
        };

        onSaveItem(item);
        setNewPrayer('');
    };

    const toggleAnswered = (prayer: SavedItem) => {
        const updated = {
            ...prayer,
            metadata: { ...prayer.metadata, answered: !prayer.metadata?.answered }
        };
        onUpdateItem(updated); 
    };

    return (
        <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-900">
            <header className="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 p-6 shadow-sm sticky top-0 z-10">
                <div className="max-w-3xl mx-auto flex items-center gap-3">
                    <button onClick={onMenuClick} className="md:hidden p-2 -ml-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
                        <Menu size={24} />
                    </button>
                    <div className="bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-xl text-indigo-600 dark:text-indigo-400">
                        <Feather size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 font-serif-text">{t.title}</h1>
                        <p className="text-sm text-slate-500">{activePrayers.length} {t.active} • {answeredPrayers.length} {t.answered}</p>
                    </div>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto p-4 md:p-8">
                <div className="max-w-3xl mx-auto space-y-8">
                    
                    {/* Input Area */}
                    <form onSubmit={handleAddPrayer} className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm border border-slate-100 dark:border-slate-700 flex gap-2">
                        <input 
                            type="text" 
                            value={newPrayer}
                            onChange={(e) => setNewPrayer(e.target.value)}
                            placeholder={t.placeholder}
                            className="flex-1 bg-transparent outline-none text-slate-800 dark:text-slate-200 placeholder-slate-400"
                        />
                        <button type="submit" disabled={!newPrayer.trim()} className="p-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 transition-colors">
                            <Plus size={20} />
                        </button>
                    </form>

                    {/* Active Prayers */}
                    <section>
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                            <Circle size={10} className="fill-indigo-500 text-indigo-500"/> {t.active}
                        </h3>
                        {activePrayers.length === 0 ? (
                            <div className="text-center py-8 text-slate-400 italic text-sm border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl">
                                {t.empty}
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {activePrayers.map(p => (
                                    <div key={p.id} className="group bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-all flex items-start gap-3">
                                        <button onClick={() => toggleAnswered(p)} className="mt-1 text-slate-300 hover:text-emerald-500 transition-colors">
                                            <Circle size={20} />
                                        </button>
                                        <div className="flex-1">
                                            <p className="text-slate-800 dark:text-slate-200 text-lg leading-relaxed">{p.content}</p>
                                            <span className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                                                <Calendar size={10} /> {new Date(p.date).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <button onClick={() => onRemoveItem(p.id)} className="p-2 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>

                    {/* Answered Prayers */}
                    {answeredPrayers.length > 0 && (
                        <section className="opacity-80">
                            <h3 className="text-xs font-bold text-emerald-600 dark:text-emerald-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                                <CheckCircle2 size={10} /> {t.answered}
                            </h3>
                            <div className="space-y-3">
                                {answeredPrayers.map(p => (
                                    <div key={p.id} className="bg-emerald-50 dark:bg-emerald-900/10 p-4 rounded-xl border border-emerald-100 dark:border-emerald-900/30 flex items-start gap-3">
                                        <button onClick={() => toggleAnswered(p)} className="mt-1 text-emerald-500">
                                            <CheckCircle2 size={20} className="fill-emerald-100 dark:fill-emerald-900" />
                                        </button>
                                        <div className="flex-1">
                                            <p className="text-slate-600 dark:text-slate-300 line-through decoration-emerald-300">{p.content}</p>
                                            <span className="text-xs text-emerald-500/70 flex items-center gap-1 mt-1">
                                                Answered
                                            </span>
                                        </div>
                                        <button onClick={() => onRemoveItem(p.id)} className="p-2 text-slate-300 hover:text-red-500">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                </div>
            </main>
        </div>
    );
};

export default PrayerList;
