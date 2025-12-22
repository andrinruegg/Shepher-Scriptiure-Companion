
import React, { useState } from 'react';
/* Added ArrowRight to imports to fix the error on line 204 */
import { ArrowLeft, Menu, Scroll, Clock, Heart, BookOpen, Baby, Users, Crown, Quote, Sparkles, Loader2, ArrowRight } from 'lucide-react';
import { STORIES_DATA } from '../data/storiesData';
import { translations } from '../utils/translations';
import { BibleStory } from '../types';
import { getDetailedBiography } from '../services/geminiService';

interface StoriesTabProps {
  language: string;
  onMenuClick: () => void;
}

const StoriesTab: React.FC<StoriesTabProps> = ({ language, onMenuClick }) => {
  const [selectedStory, setSelectedStory] = useState<BibleStory | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  
  const currentLanguage = language || 'English';
  const stories = STORIES_DATA[currentLanguage] || STORIES_DATA['English'] || [];
  const t = translations[currentLanguage]?.stories || translations['English'].stories;

  const handleFetchDetailedHistory = async () => {
    if (!selectedStory || isFetching) return;
    
    setIsFetching(true);
    try {
        const details = await getDetailedBiography(selectedStory.name, currentLanguage);
        setSelectedStory(prev => prev ? {
            ...prev,
            ...details,
            biography: details.fullHistory || prev.biography
        } : null);
    } catch (e) {
        console.error("Failed to fetch detailed bio", e);
    } finally {
        setIsFetching(false);
    }
  };

  if (selectedStory) {
    const hasDetails = !!selectedStory.meaningOfName;

    return (
      <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-900 animate-fade-in relative">
        <div className="absolute top-0 left-0 right-0 p-4 z-30 flex justify-between items-center">
            <button 
                onClick={() => setSelectedStory(null)}
                className="p-2 bg-black/30 backdrop-blur-md hover:bg-black/50 text-white rounded-full transition-all shadow-lg border border-white/10"
            >
                <ArrowLeft size={24} />
            </button>
        </div>

        <div className="relative h-[40vh] w-full shrink-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-black/60 dark:from-slate-900 z-10"></div>
            <img 
                src={selectedStory.image || 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=1080&q=80'} 
                className="w-full h-full object-cover" 
                alt={selectedStory.name}
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <div className="flex flex-wrap gap-2 mb-2">
                    <span className="px-2 py-1 bg-indigo-600/90 text-white text-[10px] font-bold rounded-full shadow-md">
                        {selectedStory.role}
                    </span>
                    {selectedStory.timeline && (
                        <span className="px-2 py-1 bg-slate-800/80 text-slate-200 text-[10px] font-bold rounded-full flex items-center gap-1 shadow-md">
                            <Clock size={10} /> {selectedStory.timeline}
                        </span>
                    )}
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-white font-serif-text drop-shadow-lg">
                    {selectedStory.name}
                </h1>
            </div>
        </div>

        <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-900 -mt-4 rounded-t-3xl relative z-20 shadow-xl">
            <div className="max-w-2xl mx-auto p-6 space-y-8">
                
                {/* Meta Information Grid */}
                {hasDetails && (
                    <div className="grid grid-cols-2 gap-4 animate-slide-up">
                        <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Meaning</span>
                            <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400">{selectedStory.meaningOfName}</p>
                        </div>
                        <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Key Traits</span>
                            <div className="flex flex-wrap gap-1">
                                {selectedStory.traits?.map((t, i) => (
                                    <span key={i} className="text-[10px] bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded-md text-slate-600 dark:text-slate-300 font-medium">{t}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                <div className="prose dark:prose-invert max-w-none">
                    {selectedStory.biography && selectedStory.biography.length > 0 ? (
                        selectedStory.biography.map((para, i) => (
                            <p key={i} className="text-base md:text-lg text-slate-700 dark:text-slate-200 leading-relaxed font-serif-text mb-4 first-letter:text-4xl first-letter:font-bold first-letter:text-indigo-600 first-letter:mr-2 first-letter:float-left animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
                                {para}
                            </p>
                        ))
                    ) : (
                        <p className="italic text-slate-400">Loading initial summary...</p>
                    )}
                </div>

                {!hasDetails && !isFetching && (
                    <div className="pt-4 animate-slide-up">
                        <button 
                            onClick={handleFetchDetailedHistory}
                            className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-bold shadow-lg hover:shadow-indigo-500/20 transition-all transform active:scale-95 flex items-center justify-center gap-3"
                        >
                            <Sparkles size={20} />
                            <span>Fetch Detailed History (Shepherd AI)</span>
                        </button>
                        <p className="text-center text-[10px] text-slate-400 mt-3 italic uppercase tracking-widest">Powered by Gemini 3 Flash</p>
                    </div>
                )}

                {isFetching && (
                    <div className="py-10 flex flex-col items-center gap-4 animate-pulse">
                        <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">AI is researching the Scriptures...</p>
                    </div>
                )}

                {selectedStory.keyVerses && selectedStory.keyVerses.length > 0 && (
                    <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800 animate-slide-up">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            <BookOpen size={14} className="text-amber-500"/> Key Scripture
                        </h3>
                        <div className="grid gap-4">
                            {selectedStory.keyVerses.map((verse, idx) => (
                                <div key={idx} className="bg-amber-50/50 dark:bg-amber-900/10 p-5 rounded-2xl border border-amber-100 dark:border-amber-900/30 relative overflow-hidden group">
                                    <Quote className="absolute -top-2 -left-2 text-amber-200/40 dark:text-amber-500/10" size={64} />
                                    <p className="text-slate-800 dark:text-slate-200 font-serif-text text-base italic relative z-10 leading-relaxed">"{verse.text}"</p>
                                    <p className="text-[10px] font-bold text-amber-600 dark:text-amber-500 uppercase mt-4 tracking-widest">— {verse.ref}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                <div className="h-16"></div>
            </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-900 transition-colors">
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
                  <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100 font-serif-text">{t?.title || 'Stories'}</h1>
              </div>
          </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stories.map((story, i) => (
                  <button 
                      key={story.id}
                      onClick={() => setSelectedStory(story)}
                      className="group relative bg-white dark:bg-slate-800 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden text-left flex flex-col h-80 border border-slate-100 dark:border-slate-700 animate-slide-up"
                      style={{ animationDelay: `${i * 0.05}s` }}
                  >
                      <div className="h-52 w-full relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
                          <img 
                              src={story.image} 
                              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                              alt={story.name}
                          />
                          <div className="absolute bottom-4 left-4 z-20">
                              <span className="px-2 py-0.5 bg-indigo-600 text-white text-[9px] font-bold rounded uppercase mb-1.5 inline-block shadow-sm">
                                  {story.role}
                              </span>
                              <h3 className="text-2xl font-bold text-white font-serif-text drop-shadow-md">
                                  {story.name}
                              </h3>
                          </div>
                      </div>
                      <div className="flex-1 p-5 bg-white dark:bg-slate-800 flex flex-col justify-between">
                          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed italic">
                              {story.biography[0]}
                          </p>
                          <div className="flex items-center justify-between mt-4">
                              <div className="flex items-center text-indigo-600 dark:text-indigo-400 text-[10px] font-bold uppercase tracking-widest group-hover:gap-2 transition-all">
                                 {t?.readMore || 'Read More'} <ArrowRight size={14} />
                              </div>
                              <Sparkles size={14} className="text-slate-200 dark:text-slate-700" />
                          </div>
                      </div>
                  </button>
              ))}
          </div>
          <div className="h-10"></div>
      </main>
    </div>
  );
};

export default StoriesTab;
