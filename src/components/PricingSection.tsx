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
    return <Star className="w-5 h-5 text-blue-500" />;
  }

  return (
    <section id="pricing" className="py-24 relative overflow-hidden bg-background">
      {/* Dynamic Background Decorations */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-30">
        <div className="absolute top-[10%] left-[-20%] w-[50%] h-[50%] blur-[160px] rounded-full bg-primary-base/10" />
        <div className="absolute bottom-[-10%] right-[-20%] w-[50%] h-[50%] blur-[160px] rounded-full bg-primary-base/5" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary-base/20 bg-primary-soft text-xs font-bold uppercase tracking-wider mb-6 text-primary-base"
          >
            {t.landing.pricing.title}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl lg:text-5xl font-extrabold mb-6 tracking-tight text-heading"
          >
            {t.landing.pricing.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg lg:text-xl max-w-2xl mx-auto text-text-secondary"
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
                whileHover={{ y: -8 }}
                className={`relative flex flex-col items-center text-center p-8 lg:p-10 rounded-[2.5rem] border transition-all duration-500 group ${isPro
                  ? 'bg-card-elevated border-primary-base/50 shadow-2xl shadow-primary-base/20 backdrop-blur-md scale-105 z-10'
                  : 'bg-card border-border hover:border-primary-base/30 shadow-medical hover:shadow-xl'
                  }`}
              >
                {isPro && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 shadow-lg z-20">
                    <Star className="w-3 h-3 fill-current" />
                    {t.landing.pricing.mostPopular}
                  </div>
                )}

                <div className="mb-10 w-full flex flex-col items-center">
                  <div className="flex items-center justify-center gap-3 mb-8">
                    <div className="p-3 rounded-2xl bg-secondary group-hover:bg-primary-soft transition-colors duration-300">
                      {getPlanIcon(plan.name)}
                    </div>
                    <h3 className="text-2xl font-bold text-heading">
                      {plan.name}
                    </h3>
                  </div>

                  <div className={`flex items-baseline justify-center gap-1 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                    <span className="text-5xl font-black tracking-tight text-heading">
                      {plan.price}
                    </span>
                    {plan.price !== 'Custom' && plan.price !== 'مخصص' && (
                      <span className="text-base font-medium text-text-muted">
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
                  className={`w-full py-5 rounded-2xl font-bold text-lg transition-all transform active:scale-95 ${isPro
                    ? 'bg-primary-base hover:bg-primary-hover text-white shadow-xl shadow-primary-base/30'
                    : 'bg-secondary hover:bg-primary-soft text-heading border border-border'
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
