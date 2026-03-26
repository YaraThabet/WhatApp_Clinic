import * as React from 'react';
import {
    Stethoscope,
    MessageSquare,
    Smartphone
} from 'lucide-react';
import { translations, Language } from '@/locales/translations';

export const Footer = ({ darkMode, language }: { darkMode: boolean, language: Language }) => {
    const t = translations[language];

    return (
        <footer className={`border-t pt-20 pb-10 ${darkMode ? 'bg-slate-950 border-white/5' : 'bg-white border-slate-200'}`}>
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    <div className={`col-span-1 lg:col-span-1 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                        <div className={`flex items-center gap-2 mb-6 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                <Stethoscope className="text-white w-5 h-5" />
                            </div>
                            <span className={`text-xl font-bold tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>CuraAI</span>
                        </div>
                        <p className={darkMode ? 'text-slate-400' : 'text-slate-600'}>
                            {t.landing.footer.tagline}
                        </p>
                    </div>

                    <div className={language === 'ar' ? 'text-right' : 'text-left'}>
                        <h4 className={`font-bold mb-6 ${darkMode ? 'text-white' : 'text-slate-900'}`}>{t.landing.footer.product}</h4>
                        <ul className={`space-y-4 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                            <li><a href="#features" className="hover:text-blue-500 transition-colors">{t.nav.features}</a></li>
                            <li><a href="#demo" className="hover:text-blue-500 transition-colors">{t.hero.viewDemo}</a></li>
                            <li><a href="#how-it-works" className="hover:text-blue-500 transition-colors">{t.nav.howItWorks}</a></li>
                            <li><a href="#pricing" className="hover:text-blue-500 transition-colors">{t.nav.pricing}</a></li>
                        </ul>
                    </div>

                    <div className={language === 'ar' ? 'text-right' : 'text-left'}>
                        <h4 className={`font-bold mb-6 ${darkMode ? 'text-white' : 'text-slate-900'}`}>{t.landing.footer.company}</h4>
                        <ul className={`space-y-4 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                            <li><a href="#" className="hover:text-blue-500 transition-colors">{t.landing.footer.about}</a></li>
                            <li><a href="#" className="hover:text-blue-500 transition-colors">{t.landing.footer.contact}</a></li>
                            <li><a href="#" className="hover:text-blue-500 transition-colors">{t.landing.footer.privacy}</a></li>
                            <li><a href="#" className="hover:text-blue-500 transition-colors">{t.landing.footer.terms}</a></li>
                        </ul>
                    </div>

                    <div className={language === 'ar' ? 'text-right' : 'text-left'}>
                        <h4 className={`font-bold mb-6 ${darkMode ? 'text-white' : 'text-slate-900'}`}>{t.landing.footer.contact}</h4>
                        <ul className={`space-y-4 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                            <li className={`flex items-center gap-3 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                                <MessageSquare className="w-4 h-4 text-blue-500" />
                                <span>support@curaai.com</span>
                            </li>
                            <li className={`flex items-center gap-3 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                                <Smartphone className="w-4 h-4 text-blue-500" />
                                <span>+1 (555) 000-0000</span>
                            </li>
                            <li className="mt-6">
                                <button className="w-full bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-bold transition-all">
                                    {t.nav.login}
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className={`border-t pt-8 flex flex-col md:flex-row justify-center  items-center gap-4 ${darkMode ? 'border-white/5' : 'border-slate-100'} ${language === 'ar' ? 'md:flex-row-reverse' : ''}`}>
                    <p className="text-slate-500 text-sm">
                        © {new Date().getFullYear()} CuraAI Systems. {t.landing.footer.rights}
                    </p>
                </div>
            </div>
        </footer>
    );
};
