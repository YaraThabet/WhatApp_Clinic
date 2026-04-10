"use client"

import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  Stethoscope,
  MessageSquare,
  Calendar,
  Bell,
  ShieldCheck,
  Clock,
  ChevronRight,
  Menu,
  X,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Smartphone,
  Zap,
  Users,
  Settings as SettingsIcon,
  Moon,
  Sun,
  LayoutDashboard,
  UserRound,
  Building2,
  Check,
  Star,
  Plus
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Settings from '@/components/Settings';
import RegisterClinic from '@/components/RegisterClinic';
import Dashboard from '@/components/Dashboard';
import { translations, Language } from '@/locales/translations';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { PricingSection } from '@/components/PricingSection';
import { supabase } from "@/lib/supabase";

const FeatureCard = ({ icon: Icon, title, description, delay, darkMode }: { icon: any, title: string, description: string, delay: number, darkMode: boolean }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true }}
    whileHover={{ y: -5 }}
    className="p-8 rounded-[2rem] border border-border bg-card hover:border-primary-base/30 transition-all group shadow-medical hover:shadow-xl"
  >
    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-primary-soft group-hover:bg-primary-base transition-colors duration-300">
      <Icon className="w-7 h-7 text-primary-base group-hover:text-primary-foreground transition-colors duration-300" />
    </div>
    <h3 className="text-xl font-bold mb-3 text-heading">{title}</h3>
    <p className="leading-relaxed text-text-secondary">{description}</p>
  </motion.div>
);

const BenefitItem = ({ text, darkMode }: { text: string, darkMode: boolean }) => (
  <div className="flex items-start gap-3">
    <div className="mt-1 p-1 rounded-full bg-primary-soft">
      <CheckCircle2 className="w-4 h-4 text-primary-base" />
    </div>
    <span className="text-text-secondary font-medium">{text}</span>
  </div>
);


export default function HomePage() {
  const [currentView, setCurrentView] = useState('home');
  const [darkMode, setDarkMode] = useState(true);
  const [language, setLanguage] = useState<Language>('en');
  const [login, setLogin] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    document.documentElement.dir = translations[language].dir;
    document.documentElement.lang = language;
  }, [language]);



  const t = translations[language];

  if (currentView === 'settings') {
    return (
      <div className={darkMode ? 'dark' : ''}>
        <Navbar currentView={currentView} setCurrentView={setCurrentView} darkMode={darkMode} setDarkMode={setDarkMode} language={language} setLanguage={setLanguage} login={login} setLogin={setLogin} />
        <div >
          <Settings darkMode={darkMode} setDarkMode={setDarkMode} language={language} setLanguage={setLanguage} />
        </div>
      </div>
    );
  }

  if (currentView === 'register') {
    return (
      <div className={darkMode ? 'dark' : ''}>
        <Navbar currentView={currentView} setCurrentView={setCurrentView} darkMode={darkMode} setDarkMode={setDarkMode} language={language} setLanguage={setLanguage} login={login} setLogin={setLogin} />
        <RegisterClinic darkMode={darkMode} onComplete={() => setCurrentView('dashboard')} onBack={() => setCurrentView('home')} language={language} />
      </div>
    );
  }

  if (currentView === 'dashboard') {
    return (
      <div className={darkMode ? 'dark' : ''}>
        <Navbar currentView={currentView} setCurrentView={setCurrentView} darkMode={darkMode} setDarkMode={setDarkMode} language={language} setLanguage={setLanguage} login={login} setLogin={setLogin} />
        <Dashboard darkMode={darkMode} language={language} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-text-primary selection:bg-primary-base/30 transition-colors duration-500 font-sans" dir={t.dir}>
      <Navbar currentView={currentView} setCurrentView={setCurrentView} darkMode={darkMode} setDarkMode={setDarkMode} language={language} setLanguage={setLanguage} login={login} setLogin={setLogin} />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-36 lg:pb-32 overflow-hidden">
        {/* Background Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] blur-[120px] rounded-full bg-primary-base/10 opacity-60" />
          <div className="absolute bottom-[10%] right-[-10%] w-[40%] h-[40%] blur-[100px] rounded-full bg-primary-base/5 opacity-40" />
          <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] blur-[80px] rounded-full bg-accent/20 opacity-30" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="flex flex-col items-start text-start"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary-base/20 bg-primary-soft text-sm font-semibold mb-8 text-primary-base animate-fade-in">
                <Zap className="w-4 h-4 fill-current" />
                <span>{t.hero.badge}</span>
              </div>

              <h1 className="text-5xl lg:text-7xl font-extrabold leading-[1.1] mb-8 tracking-tight text-heading">
                {t.hero.title} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-base to-primary-hover">
                  {t.hero.titleAccent}
                </span>
              </h1>

              <p className="text-lg lg:text-xl leading-relaxed mb-10 max-w-[600px] text-text-secondary">
                {t.hero.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-6 w-full sm:w-auto">
                <div className="flex flex-col sm:flex-row gap-4 mb-8 w-full sm:w-auto">
                  <button
                    onClick={() => setCurrentView('register')}
                    className="bg-primary-base hover:bg-primary-hover active:bg-primary-active text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 shadow-lg shadow-primary-base/25 group"
                  >
                    {t.hero.getStarted}
                    {language === 'ar' ? <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> : <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                  </button>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-12">
                {t.hero.benefits.map((benefit: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-2">
                    <Check className="w-4 h-4 shrink-0 text-primary-base" />
                    <span className="text-sm font-semibold text-text-secondary">{benefit}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative"
            >
              {/* Mockup Container */}
              <div className="relative rounded-[2.5rem] border border-border p-4 backdrop-blur-md bg-card shadow-2xl">
                <div className="aspect-[4/3] rounded-[2rem] overflow-hidden relative bg-secondary">
                  <div
                    className={`w-full h-full opacity-60 bg-gradient-to-br from-primary-base/20 via-primary-hover/10 to-transparent ${darkMode ? 'mix-blend-lighten' : ''}`}
                  />
                  {/* Floating Elements */}
                  <div className="absolute top-6 left-6 right-6 flex justify-between items-start">
                    <div className="backdrop-blur-xl p-5 rounded-2xl border border-border bg-card/90 shadow-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-full bg-primary-soft flex items-center justify-center">
                          <MessageSquare className="w-4 h-4 text-primary-base" />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-wider text-heading">WhatsApp AI</span>
                      </div>
                      <p className="text-sm text-text-primary font-medium">"I'd like to book for Tuesday at 3 PM"</p>
                      <div className="mt-2 text-[10px] text-primary-base font-mono font-bold">AI: Checking availability... Confirmed!</div>
                    </div>

                    <div className="bg-primary-base p-4 rounded-2xl shadow-lg shadow-primary-base/30">
                      <Stethoscope className="w-6 h-6 text-primary-foreground" />
                    </div>
                  </div>

                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="backdrop-blur-xl p-5 rounded-2xl border border-border bg-card/90 shadow-lg">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-bold text-heading">Today's Schedule</span>
                        <span className="text-[10px] text-primary-base/60 font-bold">12 Appointments</span>
                      </div>
                      <div className="space-y-2">
                        <div className="h-2.5 w-full rounded-full overflow-hidden bg-secondary">
                          <div className="h-full w-3/4 bg-primary-base rounded-full" />
                        </div>
                        <div className="flex justify-between text-[10px] text-text-muted font-bold">
                          <span>09:00 AM</span>
                          <span>05:00 PM</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Circles */}
              <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full blur-2xl bg-primary-base/20 opacity-50" />
              <div className="absolute -bottom-12 -left-12 w-32 h-32 rounded-full blur-3xl bg-primary-hover/10 opacity-50" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 relative bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-heading">{t.landing.features.badge}</h2>
            <p className="text-lg text-text-secondary">{t.landing.features.description}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={LayoutDashboard}
              title={t.landing.features.dashboard}
              description={t.landing.features.dashboardDesc}
              delay={0.1}
              darkMode={darkMode}
            />
            <FeatureCard
              icon={Calendar}
              title={t.landing.features.schedule}
              description={t.landing.features.scheduleDesc}
              delay={0.2}
              darkMode={darkMode}
            />
            <FeatureCard
              icon={UserRound}
              title={t.landing.features.patients}
              description={t.landing.features.patientsDesc}
              delay={0.3}
              darkMode={darkMode}
            />
            <FeatureCard
              icon={SettingsIcon}
              title={t.landing.features.settings}
              description={t.landing.features.settingsDesc}
              delay={0.4}
              darkMode={darkMode}
            />
          </div>
        </div>
      </section>

      {/* Multi-Clinic Support Section */}
      <section className="py-24 justify-center items-center bg-section-bg">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 rounded-3xl border border-border bg-card shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 bg-primary-soft rounded-xl flex items-center justify-center mb-4">
                    <UserRound className="text-primary-base w-5 h-5" />
                  </div>
                  <h4 className="font-bold mb-2 text-heading">{t.landing.multiClinic.singleDoctor}</h4>
                  <p className="text-sm text-text-secondary">{t.landing.multiClinic.singleDoctorDesc}</p>
                </div>
                <div className="p-6 rounded-3xl border border-border bg-card shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 bg-primary-soft rounded-xl flex items-center justify-center mb-4">
                    <Building2 className="text-primary-base w-5 h-5" />
                  </div>
                  <h4 className="font-bold mb-2 text-heading">{t.landing.multiClinic.multiDoctor}</h4>
                  <p className="text-sm text-text-secondary">{t.landing.multiClinic.multiDoctorDesc}</p>
                </div>
                <div className="col-span-2 p-6 rounded-3xl border border-border bg-card shadow-sm">
                  <h4 className="font-bold mb-4 text-heading">{t.landing.multiClinic.centralized}</h4>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary-base" />
                      <span className="text-sm text-text-secondary font-medium">{t.landing.multiClinic.benefit1}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary-base" />
                      <span className="text-sm text-text-secondary font-medium">{t.landing.multiClinic.benefit2}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary-base" />
                      <span className="text-sm text-text-secondary font-medium">{t.landing.multiClinic.benefit3}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary-base" />
                      <span className="text-sm text-text-secondary font-medium">{t.landing.multiClinic.benefit4}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="justify-center items-center order-1 lg:order-2">
              <h2 className="text-3xl text-center lg:text-5xl font-bold mb-6 text-heading">{t.landing.multiClinic.title}</h2>
              <p className="text-lg text-center mb-8 text-text-secondary">{t.landing.multiClinic.description}</p>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-6 h-6 justify-center item-center   rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-1">
                    <Check className={`w-4 h-4 ${darkMode ? 'text-white' : 'text-blue-500'}`} />
                  </div>
                  <p className={darkMode ? 'text-blue-100 text-center' : 'text-blue-700 text-center'}>{t.landing.multiClinic.benefit1}</p>
                </div>
                <div className="flex gap-4 justify-center item-center  ">
                  <div className="w-6 h-6 justify-center item-center  rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-1">
                    <Check className={`w-4 h-4 ${darkMode ? 'text-white' : 'text-blue-500'}`} />
                  </div>
                  <p className={darkMode ? 'text-blue-100 text-center' : 'text-blue-700 text-center'}>{t.landing.multiClinic.benefit2}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-heading">{t.landing.howItWorks.title}</h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">{t.landing.howItWorks.description}</p>
          </div>

          <div className="grid md:grid-cols-4 gap-12">
            {t.landing.howItWorks.steps.map((item: any, i: number) => (
              <div key={i} className="relative group">
                <div className="text-7xl font-black mb-6 text-primary-base/5 group-hover:text-primary-base/10 transition-colors duration-500">0{i + 1}</div>
                <div className={`relative -mt-12 ${language === 'ar' ? 'pr-2' : 'pl-2'}`}>
                  <h4 className="text-xl font-bold mb-3 text-heading">{item.title}</h4>
                  <p className="text-text-secondary leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      <PricingSection
        language={language}
        darkMode={darkMode}
        onSelectPlan={(plan) => {
          console.log(`Selected ${plan}`);
          setCurrentView('register');
        }}
      />
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="rounded-[4rem] p-12 lg:p-24 text-center relative overflow-hidden bg-primary-base shadow-2xl shadow-primary-base/20">
            <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
              <div className="absolute top-0 left-0 w-96 h-96 bg-primary-foreground rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary-active rounded-full blur-[120px] translate-x-1/3 translate-y-1/3" />
            </div>
            <h2 className="text-4xl lg:text-7xl font-extrabold text-primary-foreground mb-8 relative z-10 tracking-tight">{t.landing.cta.title}</h2>
            <p className="text-xl text-primary-foreground/90 mb-12 max-w-2xl mx-auto relative z-10 font-medium">{t.landing.cta.description}</p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
              <button
                onClick={() => setCurrentView('register')}
                className="bg-primary-foreground text-primary-base hover:bg-white px-12 py-6 rounded-2xl font-bold text-xl transition-all hover:scale-105 active:scale-95 shadow-xl"
              >
                {t.landing.cta.getStarted}
              </button>
              <button className="bg-transparent border-2 border-primary-foreground/30 hover:bg-primary-foreground/10 text-primary-foreground px-12 py-6 rounded-2xl font-bold text-xl transition-all">
                {t.landing.cta.contactSales}
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer darkMode={darkMode} language={language} />
    </div>
  );
}
