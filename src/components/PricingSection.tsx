"use client"

import React from 'react'
import { Check, Star, Zap, Crown, Rocket } from 'lucide-react'
import { motion } from 'framer-motion'
import { translations, Language } from '@/locales/translations'

interface PricingSectionProps {
  language: Language
  darkMode: boolean
  onSelectPlan?: (planName: string) => void
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  language,
  darkMode,
  onSelectPlan
}) => {
  const t = translations[language]

  // Map icons to plans
  const getPlanIcon = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes('starter') || n.includes('بداية')) return <Rocket className="w-5 h-5 text-blue-500" />;
    if (n.includes('pro') || n.includes('برو')) return <Crown className="w-5 h-5 text-amber-500" />;
    if (n.includes('enterprise') || n.includes('مؤسسات')) return <Zap className="w-5 h-5 text-purple-500" />;
    return <Star className="w-5 h-5 text-blue-500" />;
  }

  return (
    <section id="pricing" className={`py-24 relative overflow-hidden ${darkMode ? 'bg-slate-950' : 'bg-white'}`}>
      {/* Dynamic Background Decorations */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-20">
        <div className={`absolute top-[10%] left-[-20%] w-[50%] h-[50%] blur-[160px] rounded-full ${darkMode ? 'bg-blue-600/30' : 'bg-blue-400/10'}`} />
        <div className={`absolute bottom-[-10%] right-[-20%] w-[50%] h-[50%] blur-[160px] rounded-full ${darkMode ? 'bg-indigo-600/30' : 'bg-indigo-400/10'}`} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold uppercase tracking-wider mb-6 ${darkMode ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' : 'bg-blue-50 border-blue-100 text-blue-600'
              }`}
          >
            {t.landing.pricing.title}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={`text-4xl lg:text-5xl font-extrabold mb-6 tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}
          >
            {t.landing.pricing.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`text-lg lg:text-xl max-w-2xl mx-auto ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}
          >
            {t.landing.pricing.description}
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-stretch pt-8">
          {t.landing.pricing.plans.map((plan: any, idx: number) => {
            const isPro = plan.name === 'Pro' || plan.name === 'برو';

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className={`relative flex flex-col items-center text-center p-8 rounded-[2rem] border transition-all duration-300 group ${isPro
                  ? (darkMode ? 'bg-slate-900/60 border-blue-500/50 shadow-2xl shadow-blue-500/10 backdrop-blur-md' : 'bg-white border-blue-500/50 shadow-2xl shadow-blue-500/10')
                  : (darkMode ? 'bg-slate-900/40 border-white/10 hover:border-white/20 hover:bg-slate-900/60' : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm')
                  }`}
              >
                {isPro && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 shadow-lg z-20">
                    <Star className="w-3 h-3 fill-current" />
                    {t.landing.pricing.mostPopular}
                  </div>
                )}

                <div className="mb-10 w-full flex flex-col items-center">
                  <div className="flex items-center justify-center gap-3 mb-6">
                    <div className={`p-2.5 rounded-xl ${darkMode ? 'bg-white/5' : 'bg-slate-100'}`}>
                      {getPlanIcon(plan.name)}
                    </div>
                    <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                      {plan.name}
                    </h3>
                  </div>

                  <div className={`flex items-baseline justify-center gap-1 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                    <span className={`text-5xl font-black tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                      {plan.price}
                    </span>
                    {plan.price !== 'Custom' && plan.price !== 'مخصص' && (
                      <span className={`text-base font-medium ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}>
                        {t.landing.pricing.perMonth}
                      </span>
                    )}
                  </div>
                </div>

                <div className={`h-px w-full ${darkMode ? 'bg-white/10' : 'bg-slate-100'} mb-10`} />

                <ul className="space-y-4 mb-10 flex-1 flex flex-col items-center">
                  {plan.features.map((feature: string, fIdx: number) => (
                    <li key={fIdx} className={`flex items-center justify-center gap-3 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                      <div className={`p-0.5 rounded-full flex-shrink-0 ${isPro ? 'bg-blue-500' : 'bg-slate-500/20'}`}>
                        <Check className={`w-3.5 h-3.5 ${isPro ? 'text-white' : (darkMode ? 'text-slate-400' : 'text-slate-600')}`} />
                      </div>
                      <span className={`text-[15px] leading-snug ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => onSelectPlan?.(plan.name)}
                  className={`w-full py-4 rounded-2xl font-bold text-lg transition-all transform active:scale-[0.98] ${isPro
                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-600/30'
                    : (darkMode ? 'bg-white/5 hover:bg-white/10 text-white border border-white/10 backdrop-blur-sm' : 'bg-slate-100 hover:bg-slate-200 text-slate-900')
                    }`}
                >
                  {plan.price === 'Custom' || plan.price === 'مخصص'
                    ? t.landing.pricing.contactSales
                    : (isPro ? t.landing.pricing.choosePlan : t.landing.pricing.getStarted)}
                </button>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
