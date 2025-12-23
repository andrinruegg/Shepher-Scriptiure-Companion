
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
      // Handle verification or recovery redirections from Supabase
      if (typeof window !== 'undefined' && window.location.hash) {
           const hash = window.location.hash.substring(1); // Remove #
           const params = new URLSearchParams(hash);
           
           const type = params.get('type');
           const accessToken = params.get('access_token');
           const errorDescription = params.get('error_description');

           // Successful verification redirect (Supabase uses #access_token=...&type=signup)
           if (type === 'signup' || accessToken) {
               setIsVerified(true);
               setAuthMode('signin'); // Ensure they are on the sign-in form
               setSuccessMsg(language === 'Romanian' 
                   ? "Email verificat cu succes! Te poți conecta acum." 
                   : "Email verified successfully! You can now sign in.");
               
               // Clean the URL hash to prevent re-triggering logic on refresh
               window.history.replaceState(null, '', window.location.pathname);
           }
           
           if (type === 'recovery') {
               // Handled by onAuthStateChange in App.tsx to show reset modal
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

    // Normalize URL to ensure Supabase recognizes it
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
                    emailRedirectTo: redirectUrl, // Tells Supabase where to go after clicking link
                    data: {
                        full_name: displayName,
                        language: language
                    }
                }
            });
            if (error) throw error;
            
            // If Supabase confirms user is created but not yet verified
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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4 transition-colors relative overflow-hidden">
        {/* Background Decorative Blobs */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-500/10 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-500/10 blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>

        {/* Header Controls */}
        <div className="absolute top-6 right-6 flex gap-2 z-30">
            <div className="relative">
                <button 
                    onClick={() => setShowLangMenu(!showLangMenu)}
                    className="p-2 rounded-full bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 shadow-sm hover:shadow-md transition-all flex items-center gap-2"
                >
                    <Globe size={20} />
                    <span className="text-xs font-medium uppercase hidden md:inline">{language.substring(0, 3)}</span>
                </button>
                
                {showLangMenu && (
                    <div className="absolute top-full right-0 mt-2 w-32 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 overflow-hidden animate-scale-in">
                        {LANGUAGES.map(lang => (
                            <button
                                key={lang.id}
                                onClick={() => { onSetLanguage(lang.id); setShowLangMenu(false); }}
                                className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-700 ${language === lang.id ? 'text-indigo-600 dark:text-indigo-400 font-bold' : 'text-slate-600 dark:text-slate-300'}`}
                            >
                                {lang.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <button 
                onClick={toggleDarkMode}
                className="p-2 rounded-full bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 shadow-sm hover:shadow-md transition-all"
            >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
        </div>

        <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-800 relative z-20 animate-scale-in">
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

            <div className="p-8 text-center">
                 <div className="flex justify-center mb-6">
                     <div className="w-20 h-20 bg-indigo-50 dark:bg-indigo-900/30 rounded-[2rem] flex items-center justify-center text-indigo-600 dark:text-indigo-400 shadow-inner relative">
                        <div className="absolute inset-0 bg-indigo-500/10 blur-xl animate-pulse"></div>
                        <ShepherdLogo size={40} className="relative z-10" />
                     </div>
                 </div>
                 
                 <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 font-serif-text">
                     {authMode === 'signin' ? t.welcomeBack : authMode === 'signup' ? t.createAccount : 'Reset Password'}
                 </h1>
                 <p className="text-sm text-slate-500 dark:text-slate-400">
                     {authMode === 'signin' ? t.signInText : authMode === 'signup' ? t.signUpText : t.resetText}
                 </p>
            </div>

            <div className="px-8 pb-10">
                {errorMsg && (
                    <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm rounded-2xl flex items-start gap-3 animate-shake border border-red-100 dark:border-red-900/30">
                        <AlertCircle size={18} className="mt-0.5 shrink-0" />
                        <span className="font-medium">{errorMsg}</span>
                    </div>
                )}
                
                {successMsg && !isVerified && (
                    <div className="mb-6 p-4 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-sm rounded-2xl flex items-start gap-3 animate-fade-in border border-emerald-100 dark:border-emerald-900/30">
                        <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
                        <span className="font-medium">{successMsg}</span>
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-5">
                    {authMode === 'signup' && (
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-2">{t.displayName}</label>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors"><User size={20}/></div>
                                <input 
                                    type="text"
                                    required
                                    value={displayName}
                                    onChange={(e) => setDisplayName(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-slate-900 outline-none transition-all text-slate-900 dark:text-white shadow-sm"
                                    placeholder={t.namePlaceholder || "Your Name"}
                                />
                            </div>
                        </div>
                    )}

                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-2">{t.emailPlaceholder}</label>
                        <div className="relative group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors"><Mail size={20}/></div>
                            <input 
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-slate-900 outline-none transition-all text-slate-900 dark:text-white shadow-sm"
                                placeholder={t.emailPlaceholderExample || "name@example.com"}
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-2">{t.passwordPlaceholder}</label>
                        <div className="relative group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors"><Lock size={20}/></div>
                            <input 
                                type={showPassword ? "text" : "password"}
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-12 pr-12 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-slate-900 outline-none transition-all text-slate-900 dark:text-white shadow-sm"
                                placeholder={t.passwordPlaceholderExample || "••••••••"}
                                minLength={6}
                            />
                            <button 
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    {authMode === 'signin' && (
                        <div className="flex justify-end pr-1">
                            <button 
                                type="button" 
                                onClick={() => { setAuthMode('forgot'); setErrorMsg(null); setSuccessMsg(null); setIsVerified(false); }} 
                                className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline tracking-tight"
                            >
                                {t.forgotPassword}
                            </button>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-4.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-xl shadow-indigo-500/30 transition-all transform hover:-translate-y-1 active:translate-y-0 disabled:opacity-50 disabled:transform-none flex items-center justify-center gap-3 mt-4 ${loading ? 'cursor-wait' : ''}`}
                    >
                        {loading ? (
                            <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                <span className="text-lg">{authMode === 'signin' ? t.signInBtn : authMode === 'signup' ? t.signUpBtn : t.sendReset}</span>
                                <ArrowRight size={20} strokeWidth={3} />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    {authMode === 'signin' ? (
                        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                            {t.noAccount}{' '}
                            <button 
                                onClick={() => { setAuthMode('signup'); setErrorMsg(null); setSuccessMsg(null); setIsVerified(false); }} 
                                className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
                            >
                                {t.signUpBtn}
                            </button>
                        </p>
                    ) : (
                        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                            {t.hasAccount}{' '}
                            <button 
                                onClick={() => { setAuthMode('signin'); setErrorMsg(null); setSuccessMsg(null); setIsVerified(false); }} 
                                className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
                            >
                                {t.signInBtn}
                            </button>
                        </p>
                    )}
                </div>
            </div>
        </div>

        {/* Footer Disclaimer */}
        <div className="mt-8 flex items-center gap-2 text-slate-400 dark:text-slate-600 animate-fade-in delay-500">
            <Sparkles size={14} />
            <p className="text-[10px] uppercase font-bold tracking-[0.2em]">{language === 'Romanian' ? "Ghidat de credință" : "Guided by faith"}</p>
        </div>
    </div>
  );
};

export default Login;
