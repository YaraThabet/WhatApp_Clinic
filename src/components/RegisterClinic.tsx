import * as React from 'react';
import { useState } from 'react';
import {
    User,
    Users,
    Building2,
    Stethoscope,
    MapPin,
    Globe,
    Phone,
    Mail,
    MessageSquare,
    Lock,
    Upload,
    Plus,
    Trash2,
    CheckCircle2,
    ShieldCheck,
    ArrowRight,
    ArrowLeft,
    Camera,
    FileText,
    Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useRouter } from 'next/navigation';
import { translations, Language } from '@/locales/translations';

interface Doctor {
    id: string;
    fullName: string;
    email: string;
    specialty: string;
    phone: string;
}

export default function RegisterClinic({ darkMode, language, onComplete, onBack }: { darkMode: boolean, language: Language, onComplete: () => void, onBack: () => void }) {
    const t = translations[language];
    const [currentStep, setCurrentStep] = useState(1);
    const [clinicType, setClinicType] = useState<'single' | 'multi'>('single');
    const [isRegistering, setIsRegistering] = useState(false);
    const [doctors, setDoctors] = useState<Doctor[]>([
        { id: '1', fullName: '', email: '', specialty: '', phone: '' }
    ]);

    const baseSteps = [
        { id: 1, title: t.register.steps.type },
        { id: 2, title: t.register.steps.info },
        { id: 3, title: t.register.steps.admin }
    ];

    const steps = clinicType === 'multi'
        ? [...baseSteps, { id: 4, title: t.register.steps.doctors }]
        : baseSteps;
    const router = useRouter();

    const handleRegister = () => {
        setIsRegistering(true);
        // Save clinic type for dashboard routing
        localStorage.setItem("clinicType", clinicType);

        // Ensure no doctors data is sent for single clinics
        const submissionData = {
            clinicType,
            doctors: clinicType === 'multi' ? doctors : [],
        };
        console.log("Submitting registration:", submissionData);

        // Simulate API call
        setTimeout(() => {
            setIsRegistering(false);
            onComplete();

            // Redirect based on clinic type
            if (clinicType === 'single') {
                router.push("/dashboard/single-clinic");
            } else {
                router.push("/dashboard/multi-clinic");
            }
        }, 1500);
    };

    const addDoctor = () => {
        setDoctors([
            ...doctors,
            { id: Math.random().toString(36).substr(2, 9), fullName: '', email: '', specialty: '', phone: '' }
        ]);
    };

    const removeDoctor = (id: string) => {
        if (doctors.length > 1) {
            setDoctors(doctors.filter(d => d.id !== id));
        }
    };

    const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, steps.length));
    const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

    const InputField = ({ label, type = "text", placeholder, icon: Icon, required = false }: any) => (
        <div className="flex flex-col gap-1.5 w-full">
            <label className={`text-sm font-medium ${darkMode ? 'text-slate-400' : 'text-slate-600'} ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <div className="relative">
                {Icon && <Icon className={`absolute ${language === 'ar' ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 w-4 h-4 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`} />}
                <input
                    type={type}
                    placeholder={placeholder}
                    className={`w-full py-2.5 ${Icon ? (language === 'ar' ? 'pr-10 pl-4' : 'pl-10 pr-4') : 'px-4'} rounded-xl border transition-all outline-none ${darkMode
                        ? 'bg-slate-800 border-white/10 text-white focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10'
                        : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5'
                        } ${language === 'ar' ? 'text-right' : 'text-left'}`}
                />
            </div>
        </div>
    );

    return (
        <div className={`min-h-screen pb-20 ${darkMode ? 'bg-slate-950' : 'bg-slate-50'}`} dir={t.dir}>
            {/* Simple Header */}
            <div className={`h-15 border-b flex items-center px-6 mb-12 ${darkMode ? 'bg-slate-900/50 border-white/5' : 'bg-white border-slate-200 shadow-sm'}`}>
                <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
                    <button
                        onClick={onBack}
                        className={`flex items-center gap-2 text-xl font-bold tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}
                    >
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <Stethoscope className="text-white w-5 h-5" />
                        </div>
                        <span>CuraAI</span>
                    </button>
                    <button
                        onClick={onBack}
                        className={`text-sm font-bold ${darkMode ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}
                    >
                        {t.register.nav.back}
                    </button>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-[1fr_380px] gap-12 items-start">

                    {/* Main Form Area */}
                    <div className={`p-8 lg:p-12 rounded-[2.5rem] border shadow-xl ${darkMode ? 'bg-slate-900/50 border-white/10' : 'bg-white border-slate-200'}`}>

                        {/* Progress Bar */}
                        <div className="mb-12" dir="ltr">
                            <div className="flex justify-between mb-4">
                                {steps.map((step) => (
                                    <div key={step.id} className="flex flex-col items-center gap-2">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${currentStep >= step.id
                                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                                            : (darkMode ? 'bg-slate-800 text-slate-500' : 'bg-slate-100 text-slate-400')
                                            }`}>
                                            {currentStep > step.id ? <CheckCircle2 className="w-6 h-6" /> : step.id}
                                        </div>
                                        <span className={`text-xs font-medium hidden sm:block ${currentStep >= step.id ? (darkMode ? 'text-white' : 'text-slate-900') : 'text-slate-500'
                                            }`}>{step.title}</span>
                                    </div>
                                ))}
                            </div>
                            <div className={`h-1.5 w-full rounded-full overflow-hidden ${darkMode ? 'bg-slate-800' : 'bg-slate-100'}`}>
                                <motion.div
                                    className="h-full bg-blue-600"
                                    initial={{ width: '0%' }}
                                    animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                                />
                            </div>
                        </div>

                        <AnimatePresence mode="wait">
                            {currentStep === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-8"
                                >
                                    <div className="text-center mb-10">
                                        <h2 className={`text-3xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-slate-900'}`}>{t.register.type.title}</h2>
                                        <p className={darkMode ? 'text-slate-400' : 'text-slate-600'}>{t.register.type.subtitle}</p>
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-6">
                                        <button
                                            onClick={() => setClinicType('single')}
                                            className={`p-8 rounded-3xl border-2 transition-all text-left group ${clinicType === 'single'
                                                ? 'border-blue-600 bg-blue-600/5 shadow-xl shadow-blue-600/10'
                                                : (darkMode ? 'border-white/5 bg-white/5 hover:border-white/10' : 'border-slate-200 bg-white hover:border-blue-200 shadow-sm')
                                                } ${language === 'ar' ? 'text-right' : 'text-left'}`}
                                        >
                                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors ${clinicType === 'single' ? 'bg-blue-600 text-white' : (darkMode ? 'bg-slate-800 text-slate-400' : 'bg-blue-50 text-blue-600')
                                                } ${language === 'ar' ? 'mr-0 ml-auto' : ''}`}>
                                                <User className="w-7 h-7" />
                                            </div>
                                            <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>{t.register.type.single.title}</h3>
                                            <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{t.register.type.single.description}</p>
                                        </button>

                                        <button
                                            onClick={() => setClinicType('multi')}
                                            className={`p-8 rounded-3xl border-2 transition-all text-left group ${clinicType === 'multi'
                                                ? 'border-blue-600 bg-blue-600/5 shadow-xl shadow-blue-600/10'
                                                : (darkMode ? 'border-white/5 bg-white/5 hover:border-white/10' : 'border-slate-200 bg-white hover:border-blue-200 shadow-sm')
                                                } ${language === 'ar' ? 'text-right' : 'text-left'}`}
                                        >
                                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors ${clinicType === 'multi' ? 'bg-blue-600 text-white' : (darkMode ? 'bg-slate-800 text-slate-400' : 'bg-blue-50 text-blue-600')
                                                } ${language === 'ar' ? 'mr-0 ml-auto' : ''}`}>
                                                <Users className="w-7 h-7" />
                                            </div>
                                            <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>{t.register.type.multi.title}</h3>
                                            <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{t.register.type.multi.description}</p>
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {currentStep === 2 && (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6"
                                >
                                    <div className="mb-8 rtl:text-right">
                                        <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>{t.register.info.title}</h2>
                                        <p className={darkMode ? 'text-slate-400' : 'text-slate-600'}>{t.register.info.subtitle}</p>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <InputField label={t.register.info.name} placeholder="e.g. City Heart Center" icon={Building2} required />
                                        <InputField label={t.register.info.specialty} placeholder="e.g. Cardiology" icon={Stethoscope} required />
                                        <InputField label={t.register.info.country} placeholder="e.g. USA" icon={Globe} required />
                                        <InputField label={t.register.info.city} placeholder="e.g. New York" icon={MapPin} required />
                                        <div className="md:col-span-2">
                                            <InputField label={t.register.info.phone} placeholder="+1 (555) 000-0000" icon={Phone} required />
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {currentStep === 3 && (
                                <motion.div
                                    key="step3"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-8"
                                >
                                    <div className="mb-8 rtl:text-right">
                                        <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>{t.register.admin.title}</h2>
                                        <p className={darkMode ? 'text-slate-400' : 'text-slate-600'}>{t.register.admin.description}</p>
                                    </div>

                                    <div className={`p-4 rounded-xl flex items-start gap-4 mb-8 rtl:flex-row-reverse ${darkMode ? 'bg-blue-500/10 border border-blue-500/20' : 'bg-blue-50 border border-blue-100'
                                        }`}>
                                        <div className={`mt-0.5 p-2 rounded-lg shrink-0 ${darkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>
                                            <ShieldCheck className="w-5 h-5" />
                                        </div>
                                        <p className={`text-sm leading-relaxed rtl:text-right ${darkMode ? 'text-blue-100' : 'text-blue-900'}`}>
                                            {t.register.admin.infoBox}
                                        </p>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <InputField label={t.register.admin.fullName} placeholder="John Doe" icon={User} required />
                                        <InputField label={t.register.admin.email} placeholder="admin@clinic.com" icon={Mail} required />
                                        <InputField label={t.register.admin.password} type="password" icon={Lock} required />
                                        <InputField label={t.register.admin.confirmPassword} type="password" icon={Lock} required />
                                    </div>
                                </motion.div>
                            )}

                            {currentStep === 4 && (
                                <motion.div
                                    key="step4"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-8"
                                >
                                    <div className="flex items-center justify-between mb-8 rtl:flex-row-reverse">
                                        <div className="rtl:text-right">
                                            <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>{t.register.doctors.title}</h2>
                                            <p className={darkMode ? 'text-slate-400' : 'text-slate-600'}>{t.register.doctors.subtitle}</p>
                                        </div>
                                        <button
                                            onClick={addDoctor}
                                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-sm font-bold transition-all"
                                        >
                                            <Plus className="w-4 h-4" /> {t.register.doctors.addDoctor}
                                        </button>
                                    </div>

                                    <div className="space-y-6">
                                        {doctors.map((doctor, index) => (
                                            <div key={doctor.id} className={`relative p-6 rounded-3xl border ${darkMode ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
                                                <div className="flex items-center justify-between mb-4 rtl:flex-row-reverse">
                                                    <span className="text-xs font-bold uppercase tracking-widest text-blue-500">{t.register.doctors.name} #{index + 1}</span>
                                                    {doctors.length > 1 && (
                                                        <button onClick={() => removeDoctor(doctor.id)} className="text-red-500 hover:text-red-600 p-1">
                                                            <Trash2 className="w-5 h-5" />
                                                        </button>
                                                    )}
                                                </div>

                                                <div className="grid md:grid-cols-2 gap-6">
                                                    <InputField label={t.register.doctors.name} placeholder="Dr. Sarah Wilson" icon={User} />
                                                    <InputField label={t.register.doctors.email} placeholder="sarah@clinic.com" icon={Mail} />
                                                    <InputField label={t.register.doctors.specialty} placeholder="Cardiology" icon={Stethoscope} />
                                                    <InputField label={t.register.doctors.phone} placeholder="+1 (555) 000-0000" icon={Phone} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex justify-center pt-4">
                                        <button
                                            onClick={handleRegister}
                                            className={`text-sm font-bold ${darkMode ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900 underline underline-offset-4'}`}
                                        >
                                            {t.register.doctors.skip}
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Navigation Buttons */}
                        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-white/10 flex items-center justify-between" dir="ltr">
                            <button
                                dir={t.dir}
                                onClick={prevStep}
                                disabled={currentStep === 1}
                                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${currentStep === 1
                                    ? 'opacity-0 pointer-events-none'
                                    : (darkMode ? 'text-white hover:bg-white/5' : 'text-slate-900 hover:bg-slate-100')
                                    }`}
                            >
                                {language === 'ar' ? <ArrowRight className="w-5 h-5" /> : <ArrowLeft className="w-5 h-5" />} 
                                <span>{t.register.nav.back}</span>
                            </button>

                            {currentStep < steps.length ? (
                                <button
                                    dir={t.dir}
                                    onClick={nextStep}
                                    className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-blue-600/20 flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
                                >
                                    <span>{t.register.nav.next}</span> 
                                    {language === 'ar' ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
                                </button>
                            ) : (
                                <button
                                    dir={t.dir}
                                    onClick={handleRegister}
                                    disabled={isRegistering}
                                    className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-3 rounded-xl font-bold shadow-lg shadow-blue-600/20 flex items-center gap-2 transition-all hover:scale-105 active:scale-95 disabled:opacity-70 disabled:hover:scale-100"
                                >
                                    <span>{isRegistering ? t.register.nav.registering : t.register.nav.register}</span> 
                                    <CheckCircle2 className="w-5 h-5" />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Right Side Panel - Trust Info */}
                    <aside className="space-y-6">
                        <div className={`p-8 rounded-[2.5rem] border ${darkMode ? 'bg-slate-900/50 border-white/10' : 'bg-white border-slate-200 shadow-sm'}`}>
                            <h3 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-slate-900'} rtl:text-right`}>{t.register.trust.title}</h3>
                            <div className="space-y-6">
                                <div className="flex gap-4 rtl:flex-row-reverse">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${darkMode ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-50 text-blue-600'}`}>
                                        <ShieldCheck className="w-5 h-5" />
                                    </div>
                                    <div className="rtl:text-right">
                                        <h4 className={`font-bold text-sm mb-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>{t.register.trust.hipaa.title}</h4>
                                        <p className="text-xs text-slate-500 leading-relaxed">{t.register.trust.hipaa.description}</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 rtl:flex-row-reverse">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${darkMode ? 'bg-indigo-500/10 text-indigo-400' : 'bg-indigo-50 text-indigo-600'}`}>
                                        <Lock className="w-5 h-5" />
                                    </div>
                                    <div className="rtl:text-right">
                                        <h4 className={`font-bold text-sm mb-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>{t.register.trust.encryption.title}</h4>
                                        <p className="text-xs text-slate-500 leading-relaxed">{t.register.trust.encryption.description}</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 rtl:flex-row-reverse">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${darkMode ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-50 text-blue-600'}`}>
                                        <CheckCircle2 className="w-5 h-5" />
                                    </div>
                                    <div className="rtl:text-right">
                                        <h4 className={`font-bold text-sm mb-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>{t.register.trust.community.title}</h4>
                                        <p className="text-xs text-slate-500 leading-relaxed">{t.register.trust.community.description}</p>
                                    </div>
                                </div>
                            </div>

                            <div className={`mt-10 p-6 rounded-2xl border border-dashed ${darkMode ? 'border-white/10 bg-white/5' : 'border-slate-200 bg-slate-50'}`}>
                                <div className="flex items-center gap-3 mb-3 rtl:flex-row-reverse">
                                    {/* <FileText className="w-5 h-5 text-blue-500" />
                                    <span className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{t.register.help.title}</span> */}
                                </div>
                                <p className={`text-xs text-slate-500 mb-4 rtl:text-right`}>{t.register.help.description}</p>
                                <button className="text-xs font-bold text-blue-500 hover:underline rtl:w-full rtl:text-right">{t.register.help.contact}</button>
                            </div>
                        </div>

                    </aside>
                </div>
            </div>
        </div>
    );
}
