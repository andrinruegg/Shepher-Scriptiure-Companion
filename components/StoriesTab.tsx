import React, { useState } from 'react';
import { ArrowLeft, Menu, Scroll, Clock, Heart, BookOpen, Baby, Users, Crown, Quote } from 'lucide-react';
import { STORIES_DATA } from '../data/storiesData';
import { translations } from '../utils/translations';
import { BibleStory } from '../types';

interface StoriesTabProps {
  language: string;
  onMenuClick: () => void;
}

const StoriesTab: React.FC<StoriesTabProps> = ({ language, onMenuClick }) => {
  const [selectedStory, setSelectedStory] = useState<BibleStory | null>(null);
  
  const currentLanguage = language || 'English';
  const stories = STORIES_DATA[currentLanguage] || STORIES_DATA['English'] || [];
  const t = translations[currentLanguage]?.stories || translations['English'].stories;

  if (selectedStory) {
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
                    <span className="px-2 py-1 bg-indigo-600/90 text-white text-[10px] font-bold rounded-full">
                        {selectedStory.role}
                    </span>
                    {selectedStory.timeline && (
                        <span className="px-2 py-1 bg-slate-800/80 text-slate-200 text-[10px] font-bold rounded-full flex items-center gap-1">
                            <Clock size={10} /> {selectedStory.timeline}
                        </span>
                    )}
                </div>
                <h1 className="text-3xl font-bold text-slate-800 dark:text-white font-serif-text">
                    {selectedStory.name}
                </h1>
            </div>
        </div>

        <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-900 -mt-4 rounded-t-3xl relative z-20 shadow-xl">
            <div className="max-w-2xl mx-auto p-6 space-y-8">
                <div className="prose dark:prose-invert max-w-none">
                    {selectedStory.biography && selectedStory.biography.length > 0 ? (
                        selectedStory.biography.map((para, i) => (
                            <p key={i} className="text-base text-slate-700 dark:text-slate-300 leading-relaxed font-serif-text mb-4">
                                {para}
                            </p>
                        ))
                    ) : (
                        <p className="italic text-slate-400">Story content coming soon.</p>
                    )}
                </div>

                {selectedStory.keyVerses && selectedStory.keyVerses.length > 0 && (
                    <div className="space-y-4">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            <BookOpen size={14} className="text-amber-500"/> Scripture
                        </h3>
                        <div className="grid gap-3">
                            {selectedStory.keyVerses.map((verse, idx) => (
                                <div key={idx} className="bg-amber-50 dark:bg-amber-900/10 p-4 rounded-xl border border-amber-100 dark:border-amber-900/30 italic">
                                    <p className="text-slate-700 dark:text-slate-200 font-serif-text text-sm mb-2">"{verse.text}"</p>
                                    <p className="text-[10px] font-bold text-amber-600 uppercase">— {verse.ref}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                <div className="h-8"></div>
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
              {stories.length > 0 ? stories.map((story) => (
                  <button 
                      key={story.id}
                      onClick={() => setSelectedStory(story)}
                      className="group relative bg-white dark:bg-slate-800 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden text-left flex flex-col h-72 border border-slate-100 dark:border-slate-700"
                  >
                      <div className="h-48 w-full relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                          <img 
                              src={story.image} 
                              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                              alt={story.name}
                          />
                          <div className="absolute bottom-3 left-4 z-20">
                              <span className="px-2 py-0.5 bg-indigo-600 text-white text-[10px] font-bold rounded uppercase mb-1 inline-block">
                                  {story.role}
                              </span>
                              <h3 className="text-xl font-bold text-white font-serif-text">
                                  {story.name}
                              </h3>
                          </div>
                      </div>
                      <div className="flex-1 p-4 bg-white dark:bg-slate-800 flex flex-col justify-between">
                          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 italic">
                              {story.biography[0]}
                          </p>
                          <div className="flex items-center text-indigo-600 text-[10px] font-bold uppercase tracking-wider mt-2">
                              {t?.readMore || 'Read More'} →
                          </div>
                      </div>
                  </button>
              )) : (
                <div className="col-span-full py-20 text-center text-slate-400">
                    <p>No stories found.</p>
                </div>
              )}
          </div>
      </main>
    </div>
  );
};

export default StoriesTab;