
import React, { useState } from 'react';
import { ArrowLeft, Menu, Scroll, Clock, User, Heart, BookOpen, Baby, Users, Crown, Quote } from 'lucide-react';
import { STORIES_DATA } from '../data/storiesData';
import { translations } from '../utils/translations';
import { BibleStory } from '../types';

interface StoriesTabProps {
  language: string;
  onMenuClick: () => void;
}

const StoriesTab: React.FC<StoriesTabProps> = ({ language, onMenuClick }) => {
  const [selectedStory, setSelectedStory] = useState<BibleStory | null>(null);
  
  const stories = STORIES_DATA[language] || STORIES_DATA['English'];
  const t = translations[language]?.stories || translations['English'].stories;

  if (selectedStory) {
    return (
      <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-900 animate-fade-in relative">
        {/* Detail Header & Navigation */}
        <div className="absolute top-0 left-0 right-0 p-4 z-30 flex justify-between items-center">
            <button 
                onClick={() => setSelectedStory(null)}
                className="p-2 bg-black/30 backdrop-blur-md hover:bg-black/50 text-white rounded-full transition-all shadow-lg border border-white/10"
            >
                <ArrowLeft size={24} />
            </button>
        </div>

        {/* Parallax Hero Image */}
        <div className="relative h-[45vh] w-full shrink-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-black/60 dark:from-slate-900 z-10"></div>
            <img 
                src={selectedStory.image} 
                className="w-full h-full object-cover animate-scale-in" 
                style={{ animationDuration: '10s' }}
                alt={selectedStory.name}
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-3 py-1 bg-indigo-600/90 backdrop-blur-sm text-white text-xs font-bold rounded-full shadow-lg border border-indigo-400/30">
                        {selectedStory.role}
                    </span>
                    {selectedStory.timeline && (
                        <span className="px-3 py-1 bg-slate-800/80 backdrop-blur-sm text-slate-200 text-xs font-bold rounded-full shadow-lg border border-slate-600/30 flex items-center gap-1">
                            <Clock size={10} /> {selectedStory.timeline}
                        </span>
                    )}
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white font-serif-text drop-shadow-md tracking-tight leading-none mb-1">
                    {selectedStory.name}
                </h1>
                {selectedStory.meaningOfName && (
                    <p className="text-sm text-slate-600 dark:text-slate-300 font-medium italic opacity-90">
                        "{selectedStory.meaningOfName}"
                    </p>
                )}
            </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-900 -mt-4 rounded-t-3xl relative z-20 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
            <div className="max-w-3xl mx-auto p-6 md:p-8 space-y-8">
                
                {/* 1. Quick Stats Grid */}
                {selectedStory.traits && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {selectedStory.traits.map((trait, i) => (
                            <div key={i} className="bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm flex items-center gap-2">
                                <Heart size={14} className="text-rose-500 fill-rose-500/20" />
                                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{trait}</span>
                            </div>
                        ))}
                    </div>
                )}

                {/* 2. Biography Reader */}
                <div className="prose dark:prose-invert max-w-none">
                    {selectedStory.biography && selectedStory.biography.map((para, i) => (
                        <p key={i} className={`text-lg text-slate-700 dark:text-slate-300 leading-relaxed font-serif-text ${i === 0 ? 'first-letter:text-5xl first-letter:font-bold first-letter:text-indigo-600 first-letter:mr-2 first-letter:float-left' : ''}`}>
                            {para}
                        </p>
                    ))}
                    {(!selectedStory.biography || selectedStory.biography.length === 0) && (
                        <p className="text-lg text-slate-700 dark:text-slate-300 font-serif-text">Biography coming soon.</p>
                    )}
                </div>

                {/* 3. Family Tree Card */}
                {selectedStory.family && (
                    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                            <Users size={16} className="text-indigo-500"/> Family Connections
                        </h3>
                        <div className="space-y-4">
                            {selectedStory.family.parents && (
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-400">
                                        <Crown size={14} />
                                    </div>
                                    <div>
                                        <span className="text-xs text-slate-400 block">Parents</span>
                                        <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">{selectedStory.family.parents}</span>
                                    </div>
                                </div>
                            )}
                            {selectedStory.family.spouse && (
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-rose-50 dark:bg-rose-900/20 flex items-center justify-center text-rose-400">
                                        <Heart size={14} />
                                    </div>
                                    <div>
                                        <span className="text-xs text-slate-400 block">Spouse</span>
                                        <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">{selectedStory.family.spouse}</span>
                                    </div>
                                </div>
                            )}
                            {selectedStory.family.children && (
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-500">
                                        <Baby size={16} />
                                    </div>
                                    <div>
                                        <span className="text-xs text-slate-400 block">Children</span>
                                        <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">{selectedStory.family.children}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* 4. Key Verses Section */}
                {selectedStory.keyVerses && (
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                            <BookOpen size={16} className="text-amber-500"/> Key Scripture
                        </h3>
                        <div className="grid gap-4">
                            {selectedStory.keyVerses.map((verse, idx) => (
                                <div key={idx} className="relative bg-amber-50 dark:bg-amber-900/10 p-5 rounded-xl border border-amber-100 dark:border-amber-900/30">
                                    <Quote size={20} className="absolute top-4 left-4 text-amber-500/20 rotate-180" />
                                    <p className="text-slate-700 dark:text-slate-200 font-serif-text italic text-center px-4 mb-3">
                                        "{verse.text}"
                                    </p>
                                    <p className="text-center text-xs font-bold text-amber-600 dark:text-amber-500 uppercase tracking-wide">
                                        — {verse.ref}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="h-12"></div> {/* Bottom Spacer */}
            </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-900">
      <header className="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 p-4 shadow-sm sticky top-0 z-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
              <button 
                  onClick={onMenuClick}
                  className="p-2 -ml-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
              >
                  <Menu size={24} />
              </button>
              <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-lg text-amber-600 dark:text-amber-400">
                  <Scroll size={20} />
              </div>
              <div>
                  <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100 font-serif-text">{t.title}</h1>
                  <p className="text-xs text-slate-500">{t.subtitle}</p>
              </div>
          </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stories.map((story) => (
                  <button 
                      key={story.id}
                      onClick={() => setSelectedStory(story)}
                      className="group relative bg-white dark:bg-slate-800 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden text-left flex flex-col h-80 border border-slate-100 dark:border-slate-700"
                  >
                      {/* Image Top Half */}
                      <div className="h-56 w-full relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                          <img 
                              src={story.image} 
                              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                              alt={story.name}
                          />
                          <div className="absolute bottom-3 left-4 z-20">
                              <span className="px-2 py-0.5 bg-indigo-600 text-white text-[10px] font-bold rounded-md uppercase tracking-wider mb-1 inline-block">
                                  {story.role}
                              </span>
                              <h3 className="text-xl font-bold text-white font-serif-text drop-shadow-sm">
                                  {story.name}
                              </h3>
                          </div>
                      </div>
                      
                      {/* Text Bottom */}
                      <div className="flex-1 p-4 bg-white dark:bg-slate-800 relative z-20 flex flex-col justify-between">
                          <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
                              {story.biography && story.biography.length > 0 ? story.biography[0] : ""}
                          </p>
                          <div className="flex items-center text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider mt-2 group-hover:translate-x-1 transition-transform">
                              {t.readMore} <ArrowLeft size={14} className="rotate-180 ml-1" />
                          </div>
                      </div>
                  </button>
              ))}
          </div>
      </main>
    </div>
  );
};

export default StoriesTab;
