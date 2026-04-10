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
        <footer className="border-t border-border pt-24 pb-12 bg-background">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    <div className={`col-span-1 lg:col-span-1 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                        <div className={`flex items-center gap-3 mb-8 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                            <div className="w-10 h-10 bg-primary-base rounded-xl flex items-center justify-center shadow-lg shadow-primary-base/20">
                                <Stethoscope className="text-white w-6 h-6" />
                            </div>
                            <span className="text-2xl font-bold tracking-tight text-heading">WhatApp Clinic</span>
                        </div>
                        <p className="text-text-secondary leading-relaxed max-w-xs">
                            {t.landing.footer.tagline}
                        </p>
                    </div>

                    <div className={language === 'ar' ? 'text-right' : 'text-left'}>
                        <h4 className="font-bold mb-8 text-heading uppercase text-xs tracking-widest">{t.landing.footer.product}</h4>
                        <ul className="space-y-4 text-text-secondary">
                            <li><a href="#features" className="hover:text-primary-base transition-colors duration-300">{t.nav.features}</a></li>
                            <li><a href="#demo" className="hover:text-primary-base transition-colors duration-300">{t.hero.viewDemo}</a></li>
                            <li><a href="#how-it-works" className="hover:text-primary-base transition-colors duration-300">{t.nav.howItWorks}</a></li>
                            <li><a href="#pricing" className="hover:text-primary-base transition-colors duration-300">{t.nav.pricing}</a></li>
                        </ul>
                    </div>

                    <div className={language === 'ar' ? 'text-right' : 'text-left'}>
                        <h4 className="font-bold mb-8 text-heading uppercase text-xs tracking-widest">{t.landing.footer.company}</h4>
                        <ul className="space-y-4 text-text-secondary">
                            <li><a href="#" className="hover:text-primary-base transition-colors duration-300">{t.landing.footer.about}</a></li>
                            <li><a href="#" className="hover:text-primary-base transition-colors duration-300">{t.landing.footer.contact}</a></li>
                            <li><a href="#" className="hover:text-primary-base transition-colors duration-300">{t.landing.footer.privacy}</a></li>
                            <li><a href="#" className="hover:text-primary-base transition-colors duration-300">{t.landing.footer.terms}</a></li>
                        </ul>
                    </div>

                    <div className={language === 'ar' ? 'text-right' : 'text-left'}>
                        <h4 className="font-bold mb-8 text-heading uppercase text-xs tracking-widest">{t.landing.footer.contact}</h4>
                        <ul className="space-y-4 text-text-secondary">
                            <li className={`flex items-center gap-3 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                                <MessageSquare className="w-4 h-4 text-primary-base" />
                                <span>support@whatappclinic.com</span>
                            </li>
                            <li className={`flex items-center gap-3 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                                <Smartphone className="w-4 h-4 text-primary-base" />
                                <span>+1 (555) 000-0000</span>
                            </li>
                            <li className="mt-8">
                                <button className="w-full bg-primary-base hover:bg-primary-hover text-white px-6 py-4 rounded-xl font-bold transition-all shadow-lg shadow-primary-base/20">
                                    {t.nav.login}
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className={`border-t pt-8 flex flex-col md:flex-row justify-center  items-center gap-4 ${darkMode ? 'border-white/5' : 'border-blue-100'} ${language === 'ar' ? 'md:flex-row-reverse' : ''}`}>
                    <p className="text-text-muted text-sm">
                        © {new Date().getFullYear()} WhatApp Clinic. {t.landing.footer.rights}
                    </p>
                </div>
            </div>
        </footer>
    );
};
