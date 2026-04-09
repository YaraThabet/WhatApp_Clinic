"use client"

import * as React from 'react';
import { useState, useEffect } from 'react';
import {
    Stethoscope,
    Settings as SettingsIcon,
    Menu,
    X,
    Moon,
    Sun
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { translations, Language } from '@/locales/translations';

export const Navbar = ({ currentView, setCurrentView, darkMode, setDarkMode, language, setLanguage, login, setLogin }: {
    currentView: string,
    setCurrentView: (v: string) => void,
    darkMode: boolean,
    setDarkMode: (v: boolean) => void,
    language: Language,
    setLanguage: (l: Language) => void
    login: boolean,
    setLogin: (l: boolean) => void
}) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const t = translations[language];

    // Helper to determine RTL
    const isRTL = language === 'ar';
    const isHome = currentView === 'home';

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Solid background on Settings page or when scrolled.
    const hasSolidBg = isScrolled || !isHome;

    const navBg = darkMode
        ? (hasSolidBg ? 'bg-slate-950/80 backdrop-blur-md border-b border-white/10 py-3' : 'bg-transparent py-6')
        : (hasSolidBg ? 'bg-white/80 backdrop-blur-md border-b border-slate-200 py-3' : 'bg-transparent py-6');

    const textColor = darkMode ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900';
    const logoColor = darkMode ? 'text-white' : 'text-slate-900';

    return (
        <nav
            dir={isRTL ? 'rtl' : 'ltr'}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                <button onClick={() => setCurrentView('home')} className="flex items-center gap-2 group">
                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center transition-colors group-hover:bg-blue-700">
                        <Stethoscope className="text-white w-6 h-6" />
                    </div>

                    <span className={`text-2xl font-bold ${logoColor} tracking-tight`}>Cura<span className="text-blue-500">AI</span></span>
                </button>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {isHome && (
                        <>
                            <a href="#features" className={`text-sm font-medium ${textColor} transition-colors`}>{t.nav.features}</a>
                            <a href="#how-it-works" className={`text-sm font-medium ${textColor} transition-colors`}>{t.nav.howItWorks}</a>
                            <a href="#pricing" className={`text-sm font-medium ${textColor} transition-colors`}>{t.nav.pricing}</a>
                        </>
                    )}
                    <div className="flex items-center gap-4 border-l border-slate-200 dark:border-white/10 pl-8 rtl:border-l-0 rtl:border-r rtl:pl-0 rtl:pr-8">
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className={`p-2 rounded-lg transition-colors ${darkMode ? 'text-yellow-400 hover:bg-white/5' : 'text-slate-600 hover:bg-slate-100'}`}
                        >
                            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>
                        <button
                            onClick={() => setCurrentView(isHome ? 'settings' : 'home')}
                            className={`p-2 rounded-lg transition-colors ${darkMode ? 'text-slate-400 hover:text-white hover:bg-white/5' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}
                        >
                            <SettingsIcon className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => setCurrentView('register')}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-colors"
                        >
                            {t.nav.getStarted}
                        </button>
                        <button
                            onClick={() => setCurrentView('login')}
                            className={`p-2 rounded-lg transition-colors ${darkMode ? 'text-slate-400 hover:text-white hover:bg-white/5' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}>
                            {t.nav.login}
                        </button>
                    </div>
                </div>

                {/* Mobile Toggle */}
                <button
                    className={`md:hidden ${darkMode ? 'text-white' : 'text-slate-900'}`}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className={`absolute top-full left-0 right-0 border-b p-6 md:hidden flex flex-col gap-4 ${darkMode ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200'}`}
                    >
                        <button onClick={() => { setCurrentView('home'); setIsMobileMenuOpen(false); }} className={`text-lg font-medium ${textColor} text-left rtl:text-right`}>{t.nav.home}</button>
                        <button onClick={() => { setCurrentView('settings'); setIsMobileMenuOpen(false); }} className={`text-lg font-medium ${textColor} text-left rtl:text-right`}>{t.nav.settings}</button>
                        <button onClick={() => { setCurrentView('register'); setIsMobileMenuOpen(false); }} className={`text-lg font-medium ${textColor} text-left rtl:text-right`}>{t.nav.getStarted}</button>
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className={`flex items-center gap-2 text-lg font-medium ${textColor}`}
                        >
                            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                            {darkMode ? t.settings.switchToLight : t.settings.switchToDark}
                        </button>
                        <button className="bg-blue-600 text-white px-6 py-3 rounded-xl text-center font-semibold text-lg"   >
                            <link href='/login' />
                            {t.nav.login}
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};
