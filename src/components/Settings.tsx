import * as React from 'react';
import { useState } from 'react';
import {
  Moon,
  Sun,
  User,
  CreditCard,
  Bell,
  Lock,
  Globe,
  LogOut,
  Trash2,
  Camera,
  Save,
  CheckCircle2,
  ChevronRight,
  Mail,
  Phone,
  Building2,
  Stethoscope,
  ShieldCheck,
  Languages,
  Clock,
  CalendarDays,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { translations, Language } from '@/locales/translations';

interface SettingsProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  language: Language;
  setLanguage: (val: Language) => void;
}

const SectionWrapper = ({ title, icon: Icon, children, darkMode }: { title: string, icon: any, children: React.ReactNode, darkMode: boolean }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200'} mb-6`}
  >
    <div className="flex items-center gap-3 mb-6 rtl:flex-row-reverse">
      <div className={`p-2 rounded-lg ${darkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-50 text-blue-600'}`}>
        <Icon className="w-5 h-5" />
      </div>
      <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{title}</h3>
    </div>
    {children}
  </motion.div>
);

const InputField = ({ label, type = "text", placeholder, value, icon: Icon, darkMode, language }: { label: string, type?: string, placeholder?: string, value?: string, icon?: any, darkMode: boolean, language: Language }) => (
  <div className="flex flex-col gap-1.5 w-full">
    <label className={`text-sm font-medium ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{label}</label>
    <div className="relative">
      {Icon && <Icon className={`absolute ${language === 'ar' ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 w-4 h-4 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`} />}
      <input
        type={type}
        placeholder={placeholder}
        defaultValue={value}
        className={`w-full py-2.5 ${Icon ? (language === 'ar' ? 'pr-10 pl-4' : 'pl-10 pr-4') : 'px-4'} rounded-xl border transition-colors outline-none ${darkMode
          ? 'bg-slate-800 border-white/10 text-white focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10'
          : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5'
          }`}
      />
    </div>
  </div>
);

const ToggleSwitch = ({ label, description, enabled, onChange, darkMode }: { label: string, description?: string, enabled: boolean, onChange: () => void, darkMode: boolean }) => (
  <div className="flex items-center justify-between py-2 rtl:flex-row-reverse">
    <div className="flex flex-col gap-0.5 rtl:items-end">
      <span className={`font-medium ${darkMode ? 'text-white' : 'text-slate-900'}`}>{label}</span>
      {description && <span className={`text-xs ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}>{description}</span>}
    </div>
    <button
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${enabled ? 'bg-blue-600' : (darkMode ? 'bg-slate-700' : 'bg-slate-200')
        }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${enabled ? 'translate-x-6' : 'translate-x-1'
          }`}
      />
    </button>
  </div>
);

export default function Settings({ darkMode, setDarkMode, language, setLanguage }: SettingsProps) {
  const [activeTab, setActiveTab] = useState('profile');
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const t = translations[language];

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1000);
  };

  return (
    <div className={`min-h-screen pt-14 ${darkMode ? 'bg-slate-950 text-slate-200' : 'bg-slate-50 text-slate-900'}`} dir={t.dir}>
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div className="rtl:text-right">
            <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{t.settings.title}</h1>
            <p className={`mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{t.settings.profile}, {t.settings.appearance}, {t.settings.security}</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-colors ${isSaving ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'
                } bg-blue-600 text-white rtl:flex-row-reverse`}
            >
              {isSaving ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Save className="w-5 h-5" />
              )}
              {t.settings.save}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-8 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3 text-emerald-500 rtl:flex-row-reverse"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span className="font-medium">{t.settings.success}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid lg:grid-cols-[240px_1fr] gap-10">
          {/* Sidebar Navigation */}
          <aside className="flex flex-col gap-1">
            {[
              { id: 'profile', label: t.settings.profile, icon: User },
              { id: 'appearance', label: t.settings.appearance, icon: Sun },
              { id: 'billing', label: t.settings.subscription, icon: CreditCard },
              { id: 'notifications', label: t.settings.notifications, icon: Bell },
              { id: 'security', label: t.settings.security, icon: Lock },
              { id: 'system', label: t.settings.system, icon: Globe },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center justify-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${language === 'ar' ? 'flex-row-reverse text-right' : 'text-left'
                  } ${activeTab === item.id
                    ? 'bg-blue-600 text-white'
                    : (darkMode ? 'text-slate-400 hover:bg-white/5' : 'text-slate-600 hover:bg-slate-200/50')
                  }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
            <div className={`my-4 h-px ${darkMode ? 'bg-white/5' : 'bg-slate-200'}`} />
            <button className={`flex items-center justify-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-500/10 transition-colors ${language === 'ar' ? 'flex-row-reverse text-right' : 'text-left'}`}>
              <LogOut className="w-4 h-4" />
              {t.settings.logout}
            </button>
          </aside>

          {/* Main Content Area */}
          <main>
            {activeTab === 'profile' && (
              <SectionWrapper title={t.settings.profile} icon={User} darkMode={darkMode}>
                <div className="flex flex-col md:flex-row gap-8 items-start mb-8 rtl:flex-row-reverse">
                  <div className="relative group">
                  </div>
                  <div className="flex-1 grid md:grid-cols-2 gap-4 w-full">
                    <InputField label={language === 'ar' ? 'الاسم الكامل' : 'Full Name'} icon={User} darkMode={darkMode} language={language} />
                    <InputField label={language === 'ar' ? 'التخصص' : 'Specialty'} icon={Stethoscope} darkMode={darkMode} language={language} />
                    <InputField label={language === 'ar' ? 'اسم العيادة' : 'Clinic Name'} icon={Building2} darkMode={darkMode} language={language} />
                    <InputField label={language === 'ar' ? 'رقم الهاتف' : 'Phone Number'} icon={Phone} darkMode={darkMode} language={language} />
                    <div className="md:col-span-2">
                      <InputField label={language === 'ar' ? 'عنوان البريد الإلكتروني' : 'Email Address'} icon={Mail} darkMode={darkMode} language={language} />
                    </div>
                  </div>
                </div>
              </SectionWrapper>
            )}

            {activeTab === 'appearance' && (
              <SectionWrapper title={t.settings.appearance} icon={Sun} darkMode={darkMode}>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 rtl:flex-row-reverse">
                    <div className="flex items-center gap-4 rtl:flex-row-reverse">
                      <div className={`p-3 rounded-xl ${darkMode ? 'bg-slate-800 text-yellow-400' : 'bg-slate-100 text-slate-600'}`}>
                        {darkMode ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
                      </div>
                      <div className="rtl:text-right">
                        <h4 className={`font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{t.settings.themeMode}</h4>
                        <p className="text-sm text-slate-500">{t.settings.themeDesc}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setDarkMode(!darkMode)}
                      className={`px-4 py-2 rounded-xl font-bold transition-colors ${darkMode ? 'bg-white text-slate-900 hover:bg-slate-200' : 'bg-slate-900 text-white hover:bg-slate-800'
                        }`}
                    >
                      {darkMode ? t.settings.switchToLight : t.settings.switchToDark}
                    </button>
                  </div>
                </div>
              </SectionWrapper>
            )}

            {activeTab === 'billing' && (
              <SectionWrapper title={t.settings.subscription} icon={CreditCard} darkMode={darkMode}>
                <div className={`p-6 rounded-2xl mb-6 ${darkMode ? 'bg-blue-600/10 border border-blue-500/20' : 'bg-blue-50 border border-blue-100'}`}>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 rtl:flex-row-reverse">
                    <div className="rtl:text-right">
                      <div className="flex items-center gap-2 mb-1 rtl:flex-row-reverse">
                        <span className={`text-sm font-bold uppercase tracking-wider ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>{t.settings.currentPlan}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-600 text-white">PRO</span>
                      </div>
                      <h4 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>$49.00 / {language === 'ar' ? 'شهر' : 'month'}</h4>
                      <div className="flex items-center gap-4 mt-2 text-sm rtl:flex-row-reverse">
                        <span className="flex items-center gap-1.5 text-emerald-500">
                          <CheckCircle2 className="w-4 h-4" /> {language === 'ar' ? 'نشط' : 'Active'}
                        </span>
                        <span className="text-slate-500">{t.settings.renewsOn} Oct 24, 2026</span>
                      </div>
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-colors">
                      {t.settings.upgradePlan}
                    </button>
                  </div>
                </div>

              </SectionWrapper>
            )}

            {activeTab === 'notifications' && (
              <SectionWrapper title={t.settings.notifications} icon={Bell} darkMode={darkMode}>
                <div className="space-y-4 divide-y divide-slate-200 dark:divide-white/5">
                  <ToggleSwitch
                    label={t.settings.whatsappNotifications}
                    description={t.settings.whatsappDesc}
                    enabled={true}
                    onChange={() => { }}
                    darkMode={darkMode}
                  />
                  <ToggleSwitch
                    label={t.settings.reminders}
                    description={t.settings.remindersDesc}
                    enabled={true}
                    onChange={() => { }}
                    darkMode={darkMode}
                  />
                  <ToggleSwitch
                    label={t.settings.systemAlerts}
                    description={t.settings.systemAlertsDesc}
                    enabled={true}
                    onChange={() => { }}
                    darkMode={darkMode}
                  />
                </div>
              </SectionWrapper>
            )}

            {activeTab === 'security' && (
              <SectionWrapper title={t.settings.security} icon={Lock} darkMode={darkMode}>
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <button className={`flex flex-col items-start p-4 rounded-xl border transition-colors text-left rtl:text-right ${darkMode ? 'bg-slate-800 border-white/10 hover:border-blue-500/50' : 'bg-slate-50 border-slate-200 hover:border-blue-500'}`}>
                      <span className={`font-bold mb-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>{t.settings.changePassword}</span>
                      <span className="text-xs text-slate-500">{t.settings.lastChanged} 3 {language === 'ar' ? 'أشهر مضت' : 'months ago'}</span>
                    </button>
                    <button className={`flex flex-col items-start p-4 rounded-xl border transition-colors text-left rtl:text-right ${darkMode ? 'bg-slate-800 border-white/10 hover:border-blue-500/50' : 'bg-slate-50 border-slate-200 hover:border-blue-500'}`}>
                      <div className="flex items-center gap-2 mb-1 rtl:flex-row-reverse">
                        <span className={`font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{t.settings.twoFactor}</span>
                        <span className="px-1.5 py-0.5 rounded text-[8px] font-bold bg-emerald-500/20 text-emerald-500 uppercase">{language === 'ar' ? 'مفعل' : 'Enabled'}</span>
                      </div>
                      <span className="text-xs text-slate-500">{t.settings.twoFactorDesc}</span>
                    </button>
                  </div>

                  <div className={`p-4 rounded-xl border ${darkMode ? 'bg-red-500/5 border-red-500/20' : 'bg-red-50 border-red-100'}`}>
                    <h4 className="text-red-500 font-bold mb-2 flex items-center gap-2 rtl:flex-row-reverse">
                      <Trash2 className="w-4 h-4" /> {t.settings.dangerZone}
                    </h4>
                    <p className="text-sm text-slate-500 mb-4 rtl:text-right">{t.settings.deleteDesc}</p>
                    <button className="text-sm font-bold text-red-500 hover:underline">{t.settings.deleteAccount}</button>
                  </div>
                </div>
              </SectionWrapper>
            )}

            {activeTab === 'system' && (
              <SectionWrapper title={t.settings.system} icon={Globe} darkMode={darkMode}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-1.5 rtl:items-end">
                    <label className={`text-sm font-medium ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{t.settings.language}</label>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value as Language)}
                      className={`w-full py-2.5 px-4 rounded-xl border transition-colors outline-none ${darkMode
                        ? 'bg-slate-800 border-white/10 text-white focus:border-blue-500/50'
                        : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-blue-500'
                        }`}
                    >
                      <option value="en">English (US)</option>
                      <option value="ar">Arabic (العربية)</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5 rtl:items-end">
                    <label className={`text-sm font-medium ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{t.settings.timeZone}</label>
                    <select className={`w-full py-2.5 px-4 rounded-xl border transition-colors outline-none ${darkMode
                      ? 'bg-slate-800 border-white/10 text-white focus:border-blue-500/50'
                      : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-blue-500'
                      }`}>
                      <option>(GMT-05:00) Eastern Time</option>
                      <option>(GMT+00:00) UTC</option>
                      <option>(GMT+03:00) Riyadh</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5 rtl:items-end">
                    <label className={`text-sm font-medium ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{t.settings.dateFormat}</label>
                    <select className={`w-full py-2.5 px-4 rounded-xl border transition-colors outline-none ${darkMode
                      ? 'bg-slate-800 border-white/10 text-white focus:border-blue-500/50'
                      : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-blue-500'
                      }`}>
                      <option>MM/DD/YYYY</option>
                      <option>DD/MM/YYYY</option>
                      <option>YYYY-MM-DD</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5 rtl:items-end">
                    <label className={`text-sm font-medium ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{t.settings.timeFormat}</label>
                    <div className="flex gap-4 rtl:flex-row-reverse">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="timeformat" defaultChecked className="accent-blue-600" />
                        <span className="text-sm">{t.settings.twelveHour}</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="timeformat" className="accent-blue-600" />
                        <span className="text-sm">{t.settings.twentyFourHour}</span>
                      </label>
                    </div>
                  </div>
                </div>
              </SectionWrapper>
            )}
          </main>
        </div>
      </div>
    </div >
  );
}
