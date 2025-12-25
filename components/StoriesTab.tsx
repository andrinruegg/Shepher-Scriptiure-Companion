import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, Scroll, MessageCircle, Send, Plus, Trash2, Edit2, Check, X, User, History, PenLine, Sparkles, BookOpen, AlertTriangle } from 'lucide-react';
import { STORIES_DATA } from '../data/storiesData';
import { translations } from '../utils/translations';
import { Message, BibleStory } from '../types';
import { sendMessageStream } from '../services/geminiService';
import { v4 as uuidv4 } from 'uuid';
import ReactMarkdown from 'react-markdown';

interface Encounter {
    id: string;
    personaId: string;
    title: string;
    messages: Message[];
    timestamp: number;
}

interface RoleplayViewProps {
  language: string;
  onMenuClick: () => void;
  hasApiKey: boolean; 
}

const RoleplayView: React.FC<RoleplayViewProps> = ({ language, onMenuClick, hasApiKey }) => {
  const [encounters, setEncounters] = useState<Encounter[]>(() => {
      try {
          const saved = localStorage.getItem('figure_encounters');
          return saved ? JSON.parse(saved) : [];
      } catch (e) {
          console.error("Failed to load encounters", e);
          return [];
      }
  });
  
  const [selectedPersona, setSelectedPersona] = useState<BibleStory | null>(null);
  const [activeEncounterId, setActiveEncounterId] = useState<string | null>(null);
  const [view, setView] = useState<'hub' | 'detail' | 'chat'>('hub');
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showNoKeyError, setShowNoKeyError] = useState(false);
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  
  const figures = STORIES_DATA[language] || STORIES_DATA['English'];
  const t = translations[language]?.stories || translations['English'].stories;
  const commonT = translations[language]?.common || translations['English'].common;

  // Persist encounters whenever they change
  useEffect(() => {
      localStorage.setItem('figure_encounters', JSON.stringify(encounters));
  }, [encounters]);

  useEffect(() => {
    if (view === 'chat') {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [encounters, activeEncounterId, isLoading, view]);

  const activeEncounter = encounters.find(e => e.id === activeEncounterId);
  const currentFigure = activeEncounter ? figures.find(f => f.id === activeEncounter.personaId) : selectedPersona;

  // Determine UI Theme based on persona
  const getTheme = (id?: string) => {
      if (id === 'paul') return {
          bg: 'bg-[#f5f3ff]', 
          header: 'bg-[#ede9fe]', 
          accent: 'text-[#6d28d9]', 
          btn: 'bg-[#6d28d9]', 
          border: 'border-[#ddd6fe]'
      };
      // Default: Petrus theme
      return {
          bg: 'bg-[#f4ebd0]', 
          header: 'bg-[#e5d9b6]', 
          accent: 'text-[#8b7e5a]', 
          btn: 'bg-[#8b7e5a]', 
          border: 'border-[#d4c59e]'
      };
  };

  const theme = getTheme(currentFigure?.id);

  const createEncounter = (persona: BibleStory) => {
    if (!hasApiKey) {
        setShowNoKeyError(true);
        setTimeout(() => setShowNoKeyError(false), 4000);
        return;
    }

    const newId = uuidv4();
    let intro = "";
    
    if (persona.id === 'peter') {
        intro = language === 'Romanian' ? `Pacea fie cu tine, prietene. Sunt Simon, deși Învățătorul m-a numit Petrus. Tocmai îmi curățam mrejele... marea este liniștită astăzi. Ce te aduce pe aceste țărmuri? Vino, șezi.` : language === 'German' ? `Friede sei mit dir, Freund. Ich bin Simon, obwohl der Meister mich Petrus nannte. Ich habe gerade meine Netze gereinigt... die See ist heute ruhig. Was führt dich an diese Ufer? Komm, setz dich.` : `Peace be with you, friend. I am Simon, though the Master named me Petrus. I was just cleaning my nets... the sea is quiet today. What brings you to these shores? Come, sit.`;
    } else if (persona.id === 'paul') {
        intro = language === 'Romanian' ? `Harul Domnului nostru Isus să fie cu tine. Tocmai terminam un pergament pentru frații din Galatia. Ochii mei sunt obosiți, dar inima îmi este plină. Cine este cel care vine să discute despre Cale cu mine?` : language === 'German' ? `Die Gnade unseres Herrn Jesus sei mit dir. Ich habe gerade eine Schriftrolle für die Brüder in Galatien fertiggestellt. Meine Augen sind müde, aber mein Herz ist voll. Wer kommt, um mit mir über den Weg zu sprechen?` : `The grace of our Lord Jesus be with you. I was just finishing a scroll for the brothers in Galatia. My eyes are weary, but my heart is full. Who is it that comes to discuss the Way with me?`;
    }

    const firstMsg: Message = {
        id: uuidv4(),
        role: 'model',
        text: intro,
        timestamp: new Date().toISOString()
    };
    const newEncounter: Encounter = {
        id: newId,
        personaId: persona.id,
        title: language === 'Romanian' ? `Întâlnirea cu ${persona.name} ${encounters.filter(e => e.personaId === persona.id).length + 1}` : language === 'German' ? `Begegnung mit ${persona.name} ${encounters.filter(e => e.personaId === persona.id).length + 1}` : `${persona.name} Encounter ${encounters.filter(e => e.personaId === persona.id).length + 1}`,
        messages: [firstMsg],
        timestamp: Date.now()
    };
    
    const updatedEncounters = [newEncounter, ...encounters];
    setEncounters(updatedEncounters);
    setActiveEncounterId(newId);
    setView('chat');
  };

  const deleteEncounter = (id: string, e: React.MouseEvent) => {
      e.stopPropagation();
      if (!confirm(t.deleteEncounter)) return;
      setEncounters(prev => prev.filter(enc => enc.id !== id));
      if (activeEncounterId === id) {
          setActiveEncounterId(null);
          setView('hub');
      }
  };

  const startRename = (enc: Encounter, e: React.MouseEvent) => {
      e.stopPropagation();
      setEditingId(enc.id);
      setEditTitle(enc.title);
  };

  const handleRename = (e: React.FormEvent) => {
      e.preventDefault();
      if (editingId && editTitle.trim()) {
          setEncounters(prev => prev.map(enc => enc.id === editingId ? { ...enc, title: editTitle.trim() } : enc));
          setEditingId(null);
      }
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim() || isLoading || !activeEncounterId || !currentFigure) return;
    
    if (!hasApiKey) {
        setShowNoKeyError(true);
        setTimeout(() => setShowNoKeyError(false), 4000);
        return;
    }

    const userText = inputValue.trim();
    const userMsg: Message = { id: uuidv4(), role: 'user', text: userText, timestamp: new Date().toISOString() };
    const aiMsgId = uuidv4();
    const initialAiMsg: Message = { id: aiMsgId, role: 'model', text: '', timestamp: new Date().toISOString() };

    setEncounters(prev => prev.map(enc => enc.id === activeEncounterId ? { ...enc, messages: [...enc.messages, userMsg, initialAiMsg] } : enc));
    setInputValue('');
    setIsLoading(true);

    const baseInstruction = `
        TIME: Approx 60 AD. Respond as an eyewitness of the first century.
        NO MODERN AI BEHAVIOR: Never say "Hello Friend!", use emojis, or provide bulleted lists.
        NO BIBLE CITATIONS: Chapters and verses do not exist. Quote from memory.
        THE MASTER: Always refer to Jesus as "The Master", "The Lord", or "The Teacher".
        LANGUAGE: Respond only in ${language}.
    `;

    let personaSpecific = "";
    if (currentFigure.id === 'peter') {
        personaSpecific = `YOU ARE SIMON PETER. A rough, humble fisherman. Speak of the sea, the storm, and your personal failure and restoration. Your voice is slightly rugged but deeply warm.`;
    } else {
        personaSpecific = `YOU ARE PAUL OF TARSUS. Intense, scholarly, and visionary. Speak of your journey to Damascus, the "Way", and the prize of the high calling. Use metaphors of architecture, racing, or tentmaking. Your voice is passionate and intellectual.`;
    }

    try {
        let accumulatedText = "";
        const history = encounters.find(e => e.id === activeEncounterId)?.messages.slice(0, -1) || [];
        
        await sendMessageStream(
            history,
            userText,
            undefined, 
            'NIV',
            language,
            localStorage.getItem('displayName') || 'Friend',
            (chunk) => {
                accumulatedText += chunk;
                setEncounters(prev => prev.map(enc => enc.id === activeEncounterId ? {
                    ...enc,
                    messages: enc.messages.map(m => m.id === aiMsgId ? { ...m, text: accumulatedText } : m)
                } : enc));
            },
            () => {
                setIsLoading(false);
                setEncounters(prev => [...prev]);
            },
            (err) => {
                setIsLoading(false);
                setEncounters(prev => prev.map(enc => enc.id === activeEncounterId ? {
                    ...enc,
                    messages: enc.messages.map(m => m.id === aiMsgId ? { ...m, text: "The words fail me... let us try again.", isError: true } : m)
                } : enc));
            },
            baseInstruction + personaSpecific 
        );
    } catch (error) {
        setIsLoading(false);
    }
  };

  if (view === 'chat' && activeEncounter && currentFigure) {
      return (
          <div className={`flex flex-col h-full ${theme.bg} dark:bg-slate-950 animate-fade-in font-serif-text`}>
              <header className={`p-4 ${theme.header} dark:bg-slate-900 border-b ${theme.border} dark:border-slate-800 flex items-center justify-between shadow-md z-30`}>
                  <div className="flex items-center gap-3">
                      <button onClick={() => setView('detail')} className={`p-2 -ml-2 ${theme.accent} dark:text-slate-400 hover:bg-black/5 rounded-lg transition-colors`}>
                          <ArrowLeft size={24} />
                      </button>
                      <div className={`w-12 h-12 rounded-full overflow-hidden border-2 ${theme.accent.replace('text-', 'border-')} shadow-lg`}>
                          <img src={currentFigure.image} className="w-full h-full object-cover object-top" />
                      </div>
                      <div>
                          <h2 className={`font-bold ${theme.accent} dark:text-slate-200 text-lg leading-tight`}>{currentFigure.name}</h2>
                          <div className="flex items-center gap-1.5">
                              <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></div>
                              <span className={`text-[10px] uppercase font-bold opacity-70 tracking-widest`}>
                                {t.encounterLabel}
                              </span>
                          </div>
                      </div>
                  </div>
              </header>

              {/* Error: No Key Toast in Chat */}
              {showNoKeyError && (
                  <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-red-600 text-white px-5 py-3 rounded-2xl flex items-center gap-3 shadow-2xl animate-pop-in">
                      <AlertTriangle size={20} />
                      <div className="flex flex-col">
                          <span className="text-xs font-bold">{commonT.warning}</span>
                          <span className="text-xs opacity-90">{t.needKey}</span>
                      </div>
                  </div>
              )}

              <main className="flex-1 overflow-y-auto p-4 md:p-8 space-y-10 bg-[url('https://www.transparenttextures.com/patterns/old-paper.png')] scroll-smooth">
                  {activeEncounter.messages.map((msg) => (
                      <div key={msg.id} className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-pop-in`}>
                          <div className={`flex gap-4 max-w-[92%] md:max-w-[80%] items-start`}>
                              {msg.role === 'model' && (
                                  <div className={`w-10 h-10 rounded-full ${theme.header} flex items-center justify-center shrink-0 mt-1 shadow-md border ${theme.border} overflow-hidden`}>
                                      <img src={currentFigure.image} className="w-full h-full object-cover object-top" />
                                  </div>
                              )}
                              <div className={`
                                px-6 py-5 rounded-2xl shadow-lg relative border
                                ${msg.role === 'user' 
                                    ? 'bg-slate-800 text-slate-100 border-slate-700 rounded-tr-none' 
                                    : 'bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-800 italic rounded-tl-none'}
                                `}>
                                  {msg.text === '' && msg.role === 'model' && isLoading ? (
                                      <div className="flex items-center space-x-1.5 h-6 px-2">
                                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                                      </div>
                                  ) : (
                                      <div className="prose dark:prose-invert prose-slate max-w-none text-lg leading-relaxed">
                                          <ReactMarkdown>{msg.text}</ReactMarkdown>
                                      </div>
                                  )}
                              </div>
                              {msg.role === 'user' && (
                                  <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center shrink-0 mt-1 shadow-md border border-slate-600">
                                      <User size={20} className="text-slate-300" />
                                  </div>
                              )}
                          </div>
                      </div>
                  ))}
                  <div ref={messagesEndRef} className="h-24" />
              </main>

              <footer className={`p-4 md:p-6 ${theme.header}/95 dark:bg-slate-900/95 backdrop-blur-md border-t ${theme.border} dark:border-slate-800 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]`}>
                  <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto flex items-end gap-3">
                      <textarea
                          ref={inputRef}
                          value={inputValue}
                          onChange={(e) => {
                              setInputValue(e.target.value);
                              e.target.style.height = 'auto';
                              e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
                          }}
                          onKeyDown={(e) => { if(e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendMessage(); } }}
                          placeholder={t.inputPlaceholder}
                          rows={1}
                          className="flex-1 bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-3.5 text-lg focus:ring-2 focus:ring-slate-400 outline-none resize-none dark:text-white placeholder-slate-400 shadow-inner"
                      />
                      <button 
                        type="submit" 
                        disabled={isLoading || !inputValue.trim()}
                        className={`p-5 ${theme.btn} text-white rounded-2xl disabled:opacity-50 transition-all shadow-xl active:scale-95 flex items-center justify-center`}
                      >
                          <Send size={24} />
                      </button>
                  </form>
                  <p className={`text-[10px] text-center ${theme.accent} mt-4 uppercase tracking-[0.2em] font-bold opacity-70`}>
                      {t.disclaimer}
                  </p>
              </footer>
          </div>
      );
  }

  return (
    <div className="flex flex-col h-full bg-[#f8fafc] dark:bg-slate-950 overflow-hidden font-serif-text">
      <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 p-4 shadow-sm flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
              <button onClick={view === 'detail' ? () => setView('hub') : onMenuClick} className="p-2 -ml-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
                  <ArrowLeft size={24} />
              </button>
              <div className="bg-amber-100 dark:bg-amber-900/30 p-2.5 rounded-2xl text-amber-600 dark:text-amber-400 shadow-sm">
                  <Scroll size={24} />
              </div>
              <div>
                  <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">{view === 'hub' ? t.title : selectedPersona?.name}</h1>
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">{view === 'hub' ? t.subtitle : selectedPersona?.role}</p>
              </div>
          </div>
          {view === 'detail' && selectedPersona && (
            <button 
                onClick={() => createEncounter(selectedPersona)}
                className="flex items-center gap-2 px-5 py-2.5 bg-amber-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-amber-600/20 hover:bg-amber-500 transition-all active:scale-95"
            >
                <Plus size={18} /> {t.newEncounter}
            </button>
          )}
      </header>

      {/* Error: No Key Toast in Hub/Detail */}
      {showNoKeyError && (
          <div className="absolute top-20 left-1/2 -translate-x-1/2 z-50 bg-red-600 text-white px-5 py-3 rounded-2xl flex items-center gap-3 shadow-2xl animate-pop-in">
              <AlertTriangle size={20} />
              <div className="flex flex-col">
                  <span className="text-xs font-bold">{commonT.warning}</span>
                  <span className="text-xs opacity-90">{t.needKey}</span>
              </div>
          </div>
      )}

      <main className="flex-1 overflow-y-auto p-6 scroll-smooth">
          <div className="max-w-6xl mx-auto">
              
              {view === 'hub' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
                      {figures.map((fig) => (
                          <div 
                            key={fig.id} 
                            onClick={() => { setSelectedPersona(fig); setView('detail'); }}
                            className="group bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-lg overflow-hidden border border-slate-100 dark:border-slate-800 cursor-pointer hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                          >
                               <div className="h-64 relative overflow-hidden">
                                   <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent z-10"></div>
                                   <img src={fig.image} className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700" />
                                   <div className="absolute bottom-6 left-8 z-20">
                                       <span className="px-3 py-1 bg-amber-600 text-white text-[10px] font-bold rounded-full uppercase tracking-widest mb-2 inline-block">{fig.role}</span>
                                       <h3 className="text-3xl font-bold text-white">{fig.name}</h3>
                                   </div>
                               </div>
                               <div className="p-8">
                                   <div className="flex gap-2 mb-4">
                                       {fig.traits.slice(0, 3).map(trait => (
                                           <span key={trait} className="text-[10px] font-bold text-slate-400 border border-slate-200 dark:border-slate-700 px-2 py-0.5 rounded-full uppercase tracking-wider">{trait}</span>
                                       ))}
                                   </div>
                                   <p className="text-slate-600 dark:text-slate-400 italic line-clamp-2 mb-6">"{fig.biography[0]}"</p>
                                   <div className="flex items-center justify-between text-amber-600 font-bold text-sm">
                                       <span>{t.viewDetails}</span>
                                       <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                   </div>
                               </div>
                          </div>
                      ))}
                  </div>
              )}

              {view === 'detail' && selectedPersona && (
                  <div className="max-w-2xl mx-auto animate-slide-up">
                      <div className="flex flex-col items-center mb-10">
                          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-2xl mb-4">
                              <img src={selectedPersona.image} className="w-full h-full object-cover object-top" />
                          </div>
                          <h2 className="text-4xl font-bold text-slate-800 dark:text-white mb-2">{selectedPersona.name}</h2>
                          <p className="text-amber-600 font-bold uppercase tracking-[0.2em] text-sm">{selectedPersona.role}</p>
                      </div>

                      <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 border border-slate-100 dark:border-slate-800 shadow-xl mb-8">
                          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                              <BookOpen size={16} /> {t.history}
                          </h3>
                          <div className="space-y-6">
                             {selectedPersona.biography.map((p, i) => (
                                 <p key={i} className="text-xl leading-relaxed text-slate-600 dark:text-slate-300 italic border-l-4 border-amber-100 dark:border-amber-900/30 pl-6">"{p}"</p>
                             ))}
                          </div>
                      </div>

                      {/* Previous Encounters for this persona */}
                      <div className="space-y-4">
                          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] px-2 mb-4">{t.pastConversations}</h3>
                          {encounters.filter(e => e.personaId === selectedPersona.id).length === 0 ? (
                              <button 
                                onClick={() => createEncounter(selectedPersona)}
                                className="w-full py-6 bg-amber-600 hover:bg-amber-500 text-white rounded-[1.5rem] font-bold text-xl shadow-2xl shadow-amber-600/30 transition-all flex items-center justify-center gap-4 group"
                              >
                                  <MessageCircle size={28} className="group-hover:scale-110 transition-transform" />
                                  {t.startRoleplay}
                              </button>
                          ) : (
                              encounters.filter(e => e.personaId === selectedPersona.id).map(enc => (
                                  <div 
                                    key={enc.id}
                                    onClick={() => { setActiveEncounterId(enc.id); setView('chat'); }}
                                    className="flex items-center justify-between p-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 hover:border-amber-200 transition-all cursor-pointer group shadow-sm hover:shadow-md"
                                  >
                                      <div className="flex items-center gap-4 flex-1 min-w-0">
                                          <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center text-amber-600">
                                              <Scroll size={24} />
                                          </div>
                                          <div className="flex-1 min-w-0">
                                              {editingId === enc.id ? (
                                                  <form onSubmit={handleRename} className="flex gap-2" onClick={e => e.stopPropagation()}>
                                                      <input autoFocus value={editTitle} onChange={e => setEditTitle(e.target.value)} className="flex-1 bg-slate-50 dark:bg-slate-800 border-2 border-amber-500 rounded-xl px-2 py-1 outline-none font-bold" />
                                                      <button type="submit" className="p-2 bg-emerald-500 text-white rounded-lg"><Check size={16}/></button>
                                                  </form>
                                              ) : (
                                                  <>
                                                      <h4 className="font-bold text-slate-800 dark:text-slate-100 truncate group-hover:text-amber-700 dark:group-hover:text-amber-400">{enc.title}</h4>
                                                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{new Date(enc.timestamp).toLocaleDateString()}</p>
                                                  </>
                                              )}
                                          </div>
                                      </div>
                                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                          <button onClick={(e) => startRename(enc, e)} className="p-2 text-slate-400 hover:text-amber-600 transition-colors"><Edit2 size={16}/></button>
                                          <button onClick={(e) => deleteEncounter(enc.id, e)} className="p-2 text-slate-400 hover:text-red-500 transition-colors"><Trash2 size={16}/></button>
                                      </div>
                                  </div>
                              ))
                          )}
                      </div>
                  </div>
              )}
          </div>
          <div className="h-24"></div>
      </main>
    </div>
  );
};

export default RoleplayView;