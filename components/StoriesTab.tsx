
import React, { useState } from 'react';
import { ArrowLeft, Menu, Scroll } from 'lucide-react';
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
      <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-900 animate-fade-in">
        {/* Detail Header */}
        <div className="absolute top-0 left-0 right-0 p-4 z-20 flex justify-between items-center">
            <button 
                onClick={() => setSelectedStory(null)}
                className="p-2 bg-black/30 backdrop-blur-md hover:bg-black/50 text-white rounded-full transition-all shadow-lg"
            >
                <ArrowLeft size={24} />
            </button>
        </div>

        {/* Hero Image */}
        <div className="relative h-[40vh] w-full shrink-0">
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-slate-50 dark:to-slate-900 z-10"></div>
            <img 
                src={selectedStory.image} 
                className="w-full h-full object-cover" 
                alt={selectedStory.name}
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <div className="inline-block px-3 py-1 bg-indigo-600 text-white text-xs font-bold rounded-full mb-2 shadow-md">
                    {selectedStory.role}
                </div>
                <h1 className="text-4xl font-bold text-slate-800 dark:text-white font-serif-text drop-shadow-sm">
                    {selectedStory.name}
                </h1>
            </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
            <div className="max-w-2xl mx-auto">
                <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 leading-relaxed font-serif-text whitespace-pre-line first-letter:text-5xl first-letter:font-bold first-letter:text-indigo-600 first-letter:mr-1 first-letter:float-left">
                    {selectedStory.story}
                </p>
                
                <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 text-center">
                    <p className="text-sm text-slate-400 italic">
                        {language === 'Romanian' ? 'O viață dedicată credinței.' : language === 'German' ? 'Ein Leben im Glauben.' : 'A life dedicated to faith.'}
                    </p>
                </div>
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
                  <ArrowLeft size={24} />
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
                      className="group relative bg-white dark:bg-slate-800 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden text-left flex flex-col h-72 border border-slate-100 dark:border-slate-700"
                  >
                      {/* Image Top Half */}
                      <div className="h-48 w-full relative overflow-hidden">
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors z-10"></div>
                          <img 
                              src={story.image} 
                              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                              alt={story.name}
                          />
                      </div>
                      
                      {/* Text Bottom */}
                      <div className="flex-1 p-4 relative z-20 flex flex-col justify-center">
                          <h3 className="text-xl font-bold text-slate-800 dark:text-white font-serif-text group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                              {story.name}
                          </h3>
                          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                              {story.role}
                          </p>
                      </div>

                      {/* Icon Overlay */}
                      <div className="absolute top-4 right-4 z-20 bg-white/90 dark:bg-slate-900/90 p-2 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
                          <ArrowLeft size={16} className="rotate-180 text-indigo-600" />
                      </div>
                  </button>
              ))}
          </div>
      </main>
    </div>
  );
};

export default StoriesTab;
