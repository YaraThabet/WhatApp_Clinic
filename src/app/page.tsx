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

const FeatureCard = ({ icon: Icon, title, description, delay, darkMode }: { icon: any, title: string, description: string, delay: number, darkMode: boolean }) => (

  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true }}
    className={`p-8 rounded-3xl border transition-all group ${darkMode
      ? 'bg-slate-900/50 border-white/5 hover:border-blue-500/30'
      : 'bg-white border-slate-200 hover:border-blue-500/30'
      }`}
  >
    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-colors ${darkMode ? 'bg-blue-500/10 group-hover:bg-blue-500' : 'bg-blue-50 group-hover:bg-blue-600'
      }`}>
      <Icon className={`w-6 h-6 transition-colors ${darkMode ? 'text-blue-500 group-hover:text-white' : 'text-blue-600 group-hover:text-white'
        }`} />
    </div>
    <h3 className={`text-xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-slate-900'}`}>{title}</h3>
    <p className={`leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{description}</p>
  </motion.div>
);

const BenefitItem = ({ text, darkMode }: { text: string, darkMode: boolean }) => (
  <div className="flex items-start gap-3">
    <div className={`mt-1 p-1 rounded-full ${darkMode ? 'bg-blue-500/20' : 'bg-blue-100'}`}>
      <CheckCircle2 className={`w-4 h-4 ${darkMode ? 'text-blue-500' : 'text-blue-600'}`} />
    </div>
    <span className={darkMode ? 'text-slate-300' : 'text-slate-700'}>{text}</span>
  </div>
);

export default function HomePage() {
  const [currentView, setCurrentView] = useState('home');
  const [darkMode, setDarkMode] = useState(true);
  const [language, setLanguage] = useState<Language>('en');

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
        <Navbar currentView={currentView} setCurrentView={setCurrentView} darkMode={darkMode} setDarkMode={setDarkMode} language={language} setLanguage={setLanguage} />
        <div >
          <Settings darkMode={darkMode} setDarkMode={setDarkMode} language={language} setLanguage={setLanguage} />
        </div>
      </div>
    );
  }

  if (currentView === 'register') {
    return (
      <div className={darkMode ? 'dark' : ''}>
        <Navbar currentView={currentView} setCurrentView={setCurrentView} darkMode={darkMode} setDarkMode={setDarkMode} language={language} setLanguage={setLanguage} />
        <RegisterClinic darkMode={darkMode} onComplete={() => setCurrentView('dashboard')} onBack={() => setCurrentView('home')} language={language} />
      </div>
    );
  }

  if (currentView === 'dashboard') {
    return (
      <div className={darkMode ? 'dark' : ''}>
        <Navbar currentView={currentView} setCurrentView={setCurrentView} darkMode={darkMode} setDarkMode={setDarkMode} language={language} setLanguage={setLanguage} />
        <Dashboard darkMode={darkMode} language={language} />
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans selection:bg-blue-500/30 ${darkMode ? 'bg-slate-950 text-slate-200' : 'bg-slate-50 text-slate-900'
      }`} dir={t.dir}>
      <Navbar currentView={currentView} setCurrentView={setCurrentView} darkMode={darkMode} setDarkMode={setDarkMode} language={language} setLanguage={setLanguage} />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-30 lg:pb-32 overflow-hidden">
        {/* Background Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
          <div className={`absolute top-[-10%] left-[-10%] w-[40%] h-[40%] blur-[120px] rounded-full ${darkMode ? 'bg-blue-600/20' : 'bg-blue-400/10'}`} />
          <div className={`absolute bottom-[10%] right-[-10%] w-[30%] h-[30%] blur-[100px] rounded-full ${darkMode ? 'bg-indigo-600/10' : 'bg-indigo-400/5'}`} />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="flex flex-col items-start text-start"
            >
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium mb-8 ${darkMode ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' : 'bg-blue-50 border-blue-100 text-blue-600'
                }`}>
                <Zap className="w-4 h-4" />
                <span>{t.hero.badge}</span>
              </div>

              <h1 className={`text-5xl lg:text-7xl font-extrabold leading-[1.05] mb-6 tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                {t.hero.title} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                  {t.hero.titleAccent}
                </span>
              </h1>

              <p className={`text-lg lg:text-xl leading-relaxed mb-10 max-w-[600px] ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                {t.hero.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-6 w-full sm:w-auto">
                <button
                  onClick={() => setCurrentView('register')}
                  className="bg-gradient-to-r from-blue-500 to-blue-700 hover:shadow-lg hover:shadow-blue-500/30 text-white px-10 py-5 rounded-xl font-bold text-lg transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 shadow-blue-600/20"
                >
                  {t.hero.getStarted}
                  {language === 'ar' ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
                </button>
                <button className={`px-10 py-5 rounded-xl font-bold text-lg transition-all border flex items-center justify-center gap-2 ${darkMode ? 'bg-transparent hover:bg-white/5 text-white border-white/20' : 'bg-white hover:bg-slate-50 text-slate-900 border-slate-200'
                  }`}>
                  {t.hero.viewDemo}
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-12">
                {t.hero.benefits.map((benefit: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-blue-500 shrink-0" />
                    <span className={`text-sm font-medium ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{benefit}</span>
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
              <div className={`relative rounded-3xl border p-4 backdrop-blur-sm ${darkMode ? 'border-white/10 bg-slate-900/50' : 'border-slate-200 bg-white'
                }`}>
                <div className={`aspect-[4/3] rounded-2xl overflow-hidden relative ${darkMode ? 'bg-slate-800' : 'bg-slate-100'}`}>
                  <img
                    src="https://picsum.photos/seed/clinic-dashboard/1200/900"
                    alt="CuraAI Dashboard"
                    className={`w-full h-full object-cover opacity-60 ${darkMode ? 'mix-blend-luminosity' : ''}`}
                    referrerPolicy="no-referrer"
                  />
                  {/* Floating Elements */}
                  <div className="absolute top-6 left-6 right-6 flex justify-between items-start">
                    <div className={`backdrop-blur p-4 rounded-2xl border ${darkMode ? 'bg-slate-900/90 border-white/10' : 'bg-white/90 border-slate-200'}`}>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                          <MessageSquare className="w-4 h-4 text-green-500" />
                        </div>
                        <span className={`text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-white' : 'text-slate-900'}`}>WhatsApp AI</span>
                      </div>
                      <p className={`text-sm ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>"I'd like to book for Tuesday at 3 PM"</p>
                      <div className="mt-2 text-[10px] text-blue-400 font-mono">AI: Checking availability... Confirmed!</div>
                    </div>

                    <div className="bg-blue-600 p-4 rounded-2xl">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  <div className="absolute bottom-6 left-6 right-6">
                    <div className={`backdrop-blur p-4 rounded-2xl border ${darkMode ? 'bg-slate-900/90 border-white/10' : 'bg-white/90 border-slate-200'}`}>
                      <div className="flex items-center justify-between mb-4">
                        <span className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>Today's Schedule</span>
                        <span className="text-[10px] text-slate-500">12 Appointments</span>
                      </div>
                      <div className="space-y-2">
                        <div className={`h-2 w-full rounded-full overflow-hidden ${darkMode ? 'bg-white/5' : 'bg-slate-200'}`}>
                          <div className="h-full w-3/4 bg-blue-500" />
                        </div>
                        <div className="flex justify-between text-[10px] text-slate-400">
                          <span>09:00 AM</span>
                          <span>05:00 PM</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Circles */}
              <div className={`absolute -top-12 -right-12 w-24 h-24 rounded-full blur-2xl ${darkMode ? 'bg-blue-500/20' : 'bg-blue-500/10'}`} />
              <div className={`absolute -bottom-12 -left-12 w-32 h-32 rounded-full blur-3xl ${darkMode ? 'bg-indigo-500/20' : 'bg-indigo-500/10'}`} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 pb-40 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className={`text-3xl lg:text-5xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-slate-900'}`}>{t.landing.features.badge}</h2>
            <p className={`text-lg ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{t.landing.features.description}</p>
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
      <section className={`py-24 justify-center items-center ${darkMode ? 'bg-slate-900/50' : 'bg-blue-50/50'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className={`grid grid-cols-2 gap-4`}>
                <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-slate-800 border-white/5' : 'bg-white border-slate-200'}`}>
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                    <UserRound className="text-blue-600 w-5 h-5" />
                  </div>
                  <h4 className={`font-bold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>{t.landing.multiClinic.singleDoctor}</h4>
                  <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{t.landing.multiClinic.singleDoctorDesc}</p>
                </div>
                <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-slate-800 border-white/5' : 'bg-white border-slate-200'}`}>
                  <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
                    <Building2 className="text-indigo-600 w-5 h-5" />
                  </div>
                  <h4 className={`font-bold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>{t.landing.multiClinic.multiDoctor}</h4>
                  <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{t.landing.multiClinic.multiDoctorDesc}</p>
                </div>
                <div className={`col-span-2 p-6 rounded-3xl border ${darkMode ? 'bg-slate-800 border-white/5' : 'bg-white border-slate-200'}`}>
                  <h4 className={`font-bold mb-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>{t.landing.multiClinic.centralized}</h4>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span className={`text-sm ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>{t.landing.multiClinic.benefit1}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span className={`text-sm ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>{t.landing.multiClinic.benefit2}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span className={`text-sm ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>{t.landing.multiClinic.benefit3}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-center text-green-500" />
                      <span className={`text-sm ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>{t.landing.multiClinic.benefit4}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="justify-center items-center order-1 lg:order-2">
              <h2 className={`text-3xl text-center lg:text-5xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-slate-900'}`}>{t.landing.multiClinic.title}</h2>
              <p className={`text-lg text-center mb-8 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{t.landing.multiClinic.description}</p>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-6 h-6 justify-center item-center   rounded-full bg-blue-500 flex items-center justify-center shrink-0 mt-1">
                    <Check className="w-4 h-4 text-white text-center" />
                  </div>
                  <p className={darkMode ? 'text-slate-300 text-center' : 'text-slate-700 text-center'}>{t.landing.multiClinic.benefit1}</p>
                </div>
                <div className="flex gap-4 justify-center item-center  ">
                  <div className="w-6 h-6 justify-center item-center  rounded-full bg-blue-500 flex items-center justify-center shrink-0 mt-1">
                    <Check className="w-4 h-4 text-white text-center  item-center" />
                  </div>
                  <p className={darkMode ? 'text-slate-300 text-center' : 'text-slate-700 text-center'}>{t.landing.multiClinic.benefit2}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className={`text-3xl lg:text-5xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-slate-900'}`}>{t.landing.howItWorks.title}</h2>
            <p className={`text-lg ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{t.landing.howItWorks.description}</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {t.landing.howItWorks.steps.map((item: any, i: number) => (
              <div key={i} className="relative">
                <div className={`text-6xl font-black mb-4 ${darkMode ? 'text-white/5' : 'text-slate-100'}`}>0{i + 1}</div>
                <div className={`relative -mt-10 ${language === 'ar' ? 'pr-4' : 'pl-4'}`}>
                  <h4 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>{item.title}</h4>
                  <p className={darkMode ? 'text-slate-400' : 'text-slate-600'}>{item.desc}</p>
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
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className={`rounded-[3rem] p-12 lg:p-20 text-center relative overflow-hidden ${darkMode ? 'bg-indigo-600' : 'bg-blue-600'}`}>
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-black rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold text-white mb-8 relative z-10">{t.landing.cta.title}</h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto relative z-10">{t.landing.cta.description}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
              <button
                onClick={() => setCurrentView('register')}
                className="bg-white text-blue-600 hover:bg-slate-100 px-10 py-5 rounded-2xl font-bold text-xl transition-colors"
              >
                {t.landing.cta.getStarted}
              </button>
              <button className="bg-transparent border border-white/30 hover:bg-white/10 text-white px-10 py-5 rounded-2xl font-bold text-xl transition-all">
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
