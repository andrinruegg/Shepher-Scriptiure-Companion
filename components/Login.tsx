
import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';
import { ArrowRight, Mail, Lock, AlertCircle, CheckCircle2, Moon, Sun, Eye, EyeOff, User, Globe, BadgeCheck, Sparkles } from 'lucide-react';
import ShepherdLogo from './ShepherdLogo';
import { translations } from '../utils/translations';

interface LoginProps {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
    language: string;
    onSetLanguage: (lang: string) => void;
}

const Login: React.FC<LoginProps> = ({ isDarkMode, toggleDarkMode, language, onSetLanguage }) => {
  const [loading, setLoading] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup' | 'forgot'>('signin');
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState(''); 
  
  const [showPassword, setShowPassword] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isVerified, setIsVerified] = useState(false);

  const t = translations[language]?.login || translations['English'].login;

  useEffect(() => {
      if (typeof window !== 'undefined' && window.location.hash) {
           const hash = window.location.hash.substring(1);
           const params = new URLSearchParams(hash);
           
           const type = params.get('type');
           const accessToken = params.get('access_token');
           const errorDescription = params.get('error_description');

           if (type === 'signup' || accessToken) {
               setIsVerified(true);
               setAuthMode('signin');
               setSuccessMsg(language === 'Romanian' 
                   ? "Email verificat cu succes! Te poți conecta acum." 
                   : "Email verified successfully! You can now sign in.");
               window.history.replaceState(null, '', window.location.pathname);
           }
           
           if (type === 'recovery') {
               setIsVerified(true);
               setSuccessMsg(language === 'Romanian' ? "Link de recuperare acceptat." : "Recovery link accepted.");
           }
           
           if (errorDescription) {
               setErrorMsg(decodeURIComponent(errorDescription.replace(/\+/g, ' ')));
           }
      }
  }, [language]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);
    setIsVerified(false);

    const redirectUrl = window.location.origin.endsWith('/') 
        ? window.location.origin 
        : `${window.location.origin}/`;

    try {
        if (authMode === 'forgot') {
             const { error } = await supabase.auth.resetPasswordForEmail(email, {
                 redirectTo: redirectUrl,
             });
             if (error) throw error;
             setSuccessMsg(t.resetText);
        } else if (authMode === 'signup') {
            const { error, data } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    emailRedirectTo: redirectUrl,
                    data: {
                        full_name: displayName,
                        language: language
                    }
                }
            });
            if (error) throw error;
            if (data.user && !data.session) {
                setSuccessMsg(t.successCreated);
            }
        } else {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            if (error) throw error;
        }
    } catch (error: any) {
        setErrorMsg(error.message || "Authentication failed");
    } finally {
        setLoading(false);
    }
  };

  const LANGUAGES = [
      { id: 'English', label: 'English' },
      { id: 'Romanian', label: 'Română' },
      { id: 'German', label: 'Deutsch' }
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fc] dark:bg-slate-950 flex flex-col items-center justify-center p-4 py-12 transition-all duration-700 relative overflow-y-auto overflow-x-hidden">
        
        {/* Advanced Ambient Background for Light Mode */}
        <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] rounded-full bg-indigo-100/50 dark:bg-indigo-500/10 blur-[120px] animate-pulse pointer-events-none"></div>
        <div className="absolute bottom-[-15%] right-[-10%] w-[70%] h-[70%] rounded-full bg-rose-50/50 dark:bg-purple-500/10 blur-[120px] animate-pulse pointer-events-none" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-[20%] right-[-30%] w-[50%] h-[50%] rounded-full bg-emerald-50/50 dark:bg-emerald-500/5 blur-[100px] animate-pulse pointer-events-none" style={{animationDelay: '4s'}}></div>

        {/* Header Controls */}
        <div className="absolute top-6 right-6 flex gap-2 z-30">
            <div className="relative">
                <button 
                    onClick={() => setShowLangMenu(!showLangMenu)}
                    className="p-2.5 rounded-full bg-white/60 dark:bg-slate-800 backdrop-blur-md text-slate-500 dark:text-slate-400 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-white dark:border-slate-700 hover:shadow-md transition-all flex items-center gap-2"
                >
                    <Globe size={18} />
                    <span className="text-xs font-black uppercase hidden md:inline tracking-tighter">{language.substring(0, 3)}</span>
                </button>
                
                {showLangMenu && (
                    <div className="absolute top-full right-0 mt-2 w-32 bg-white/95 dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-700 overflow-hidden animate-scale-in backdrop-blur-xl">
                        {LANGUAGES.map(lang => (
                            <button
                                key={lang.id}
                                onClick={() => { onSetLanguage(lang.id); setShowLangMenu(false); }}
                                className={`w-full text-left px-4 py-3 text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors ${language === lang.id ? 'text-indigo-600 dark:text-indigo-400 font-bold' : 'text-slate-600 dark:text-slate-300'}`}
                            >
                                {lang.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <button 
                onClick={toggleDarkMode}
                className="p-2.5 rounded-full bg-white/60 dark:bg-slate-800 backdrop-blur-md text-slate-500 dark:text-slate-400 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-white dark:border-slate-700 hover:shadow-md transition-all"
            >
                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
        </div>

        <div className="w-full max-w-md bg-white/80 dark:bg-slate-900/95 backdrop-blur-3xl rounded-[3rem] shadow-[0_40px_120px_-20px_rgba(79,70,229,0.12)] dark:shadow-none overflow-hidden border border-white/90 dark:border-slate-800 relative z-20 animate-scale-in my-auto">
            {isVerified && (
                <div className="bg-emerald-500 text-white p-5 flex items-center gap-4 animate-slide-up">
                    <div className="bg-white/20 p-2 rounded-full">
                        <BadgeCheck size={28} className="text-white" />
                    </div>
                    <div>
                        <div className="text-xs font-bold uppercase tracking-widest opacity-80 mb-0.5">Verification Success</div>
                        <div className="text-sm font-bold leading-tight">{successMsg}</div>
                    </div>
                </div>
            )}

            <div className="p-10 pb-6 text-center">
                 <div className="flex justify-center mb-8">
                     <div className="w-20 h-20 bg-gradient-to-br from-indigo-50/80 to-white dark:from-indigo-900/30 dark:to-slate-900 rounded-[2.5rem] flex items-center justify-center text-indigo-600 dark:text-indigo-400 shadow-inner border border-indigo-100/50 dark:border-white/5 relative group">
                        <div className="absolute inset-0 bg-indigo-400/5 blur-xl animate-pulse"></div>
                        <ShepherdLogo size={42} className="relative z-10 transition-transform group-hover:scale-110" />
                     </div>
                 </div>
                 
                 <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3 font-serif-text tracking-tight">
                     {authMode === 'signin' ? t.welcomeBack : authMode === 'signup' ? t.createAccount : 'Reset Password'}
                 </h1>
                 <p className="text-sm text-slate-500 dark:text-slate-400 font-medium opacity-80">
                     {authMode === 'signin' ? t.signInText : authMode === 'signup' ? t.signUpText : t.resetText}
                 </p>
            </div>

            <div className="px-10 pb-12">
                {errorMsg && (
                    <div className="mb-6 p-4 bg-red-50/50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm rounded-[1.5rem] flex items-start gap-3 animate-shake border border-red-100 dark:border-red-900/30 backdrop-blur-md">
                        <AlertCircle size={18} className="mt-0.5 shrink-0" />
                        <span className="font-semibold">{errorMsg}</span>
                    </div>
                )}
                
                {successMsg && !isVerified && (
                    <div className="mb-6 p-4 bg-emerald-50/50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-sm rounded-[1.5rem] flex items-start gap-3 animate-fade-in border border-emerald-100 dark:border-emerald-900/30 backdrop-blur-md">
                        <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
                        <span className="font-semibold">{successMsg}</span>
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-5">
                    {authMode === 'signup' && (
                        <div className="space-y-2">
                            <label className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">{t.displayName}</label>
                            <div className="relative group">
                                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors"><User size={18}/></div>
                                <input 
                                    type="text"
                                    required
                                    value={displayName}
                                    onChange={(e) => setDisplayName(e.target.value)}
                                    className="w-full pl-12 pr-5 py-4 bg-slate-50/30 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700 rounded-[1.5rem] focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-400/50 focus:bg-white dark:focus:bg-slate-900 outline-none transition-all text-slate-900 dark:text-white"
                                    placeholder={t.namePlaceholder || "Your Name"}
                                />
                            </div>
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">{t.emailPlaceholder}</label>
                        <div className="relative group">
                            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors"><Mail size={18}/></div>
                            <input 
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-12 pr-5 py-4 bg-slate-50/30 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700 rounded-[1.5rem] focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-400/50 focus:bg-white dark:focus:bg-slate-900 outline-none transition-all text-slate-900 dark:text-white"
                                placeholder={t.emailPlaceholderExample || "name@example.com"}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">{t.passwordPlaceholder}</label>
                        <div className="relative group">
                            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors"><Lock size={18}/></div>
                            <input 
                                type={showPassword ? "text" : "password"}
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-12 pr-12 py-4 bg-slate-50/30 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700 rounded-[1.5rem] focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-400/50 focus:bg-white dark:focus:bg-slate-900 outline-none transition-all text-slate-900 dark:text-white"
                                placeholder={t.passwordPlaceholderExample || "••••••••"}
                                minLength={6}
                            />
                            <button 
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    {authMode === 'signin' && (
                        <div className="flex justify-end px-1">
                            <button 
                                type="button" 
                                onClick={() => { setAuthMode('forgot'); setErrorMsg(null); setSuccessMsg(null); setIsVerified(false); }} 
                                className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 transition-colors tracking-widest uppercase"
                            >
                                {t.forgotPassword}
                            </button>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-bold rounded-[1.75rem] shadow-[0_20px_40px_-10px_rgba(79,70,229,0.3)] hover:shadow-[0_25px_50px_-12px_rgba(79,70,229,0.4)] transition-all transform hover:-translate-y-1 active:translate-y-0 disabled:opacity-50 disabled:transform-none flex items-center justify-center gap-3 mt-4 ${loading ? 'cursor-wait' : ''}`}
                    >
                        {loading ? (
                            <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                <span className="text-lg tracking-tight">{authMode === 'signin' ? t.signInBtn : authMode === 'signup' ? t.signUpBtn : t.sendReset}</span>
                                <ArrowRight size={20} strokeWidth={2.5} />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-12 text-center">
                    {authMode === 'signin' ? (
                        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                            {t.noAccount}{' '}
                            <button 
                                onClick={() => { setAuthMode('signup'); setErrorMsg(null); setSuccessMsg(null); setIsVerified(false); }} 
                                className="font-black text-indigo-600 dark:text-indigo-400 hover:underline tracking-tight"
                            >
                                {t.signUpBtn}
                            </button>
                        </p>
                    ) : (
                        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                            {t.hasAccount}{' '}
                            <button 
                                onClick={() => { setAuthMode('signin'); setErrorMsg(null); setSuccessMsg(null); setIsVerified(false); }} 
                                className="font-black text-indigo-600 dark:text-indigo-400 hover:underline tracking-tight"
                            >
                                {t.signInBtn}
                            </button>
                        </p>
                    )}
                </div>
            </div>
        </div>

        {/* Footer Disclaimer */}
        <div className="mt-10 flex items-center gap-2 text-slate-400 dark:text-slate-600 animate-fade-in delay-500 pb-8">
            <Sparkles size={14} className="text-indigo-300 dark:text-indigo-500 animate-pulse" />
            <p className="text-[10px] uppercase font-black tracking-[0.5em] ml-1">{language === 'Romanian' ? "Ghidat de credință" : "Guided by faith"}</p>
        </div>
    </div>
  );
};

export default Login;
