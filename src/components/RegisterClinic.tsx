import * as React from 'react';
import { useState } from 'react';
import {
    User, Users, Building2, Stethoscope, MapPin, Globe, Phone, Mail,
    Lock, Plus, Trash2, CheckCircle2, ShieldCheck, ArrowRight, ArrowLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useRouter } from 'next/navigation';
import { translations, Language } from '@/locales/translations';
import { supabase } from '@/lib/supabase';
import Select from 'react-select';

// --- Interfaces ---
export interface AdminData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface ClinicData {
    name: string;
    primary_specialty: string;
    country: string;
    city: string;
    number: string;
}

export interface DoctorData {
    id: string;
    fullName: string;
    email: string;
    specialty: string;
    phone: string;
}

export interface ClinicFormData {
    clinicType: 'single' | 'multi';
    admin: AdminData;
    clinic: ClinicData;
    doctors: DoctorData[];
}

interface RegisterClinicProps {
    darkMode: boolean;
    language: Language;
    onComplete: () => void;
    onBack: () => void;
}

// --- Reusable Input Component ---
interface InputFieldProps {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    placeholder?: string;
    icon?: any;
    required?: boolean;
    darkMode: boolean;
    language: string;
    error?: string;
    maxLength?: number;
}

const InputField = React.memo(({ label, value, onChange, type = "text", placeholder, icon: Icon, required = false, darkMode, language, error, maxLength }: InputFieldProps) => (
    <div className="flex flex-col gap-2 w-full">
        <label className={`text-sm font-bold tracking-tight text-text-secondary ${language === 'ar' ? 'text-right' : 'text-left'}`}>
            {label} {required && <span className="text-error font-black">*</span>}
        </label>
        <div className="relative group">
            {Icon && <Icon className={`absolute ${language === 'ar' ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 w-4.5 h-4.5 transition-colors group-focus-within:text-primary-base text-text-muted`} />}
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                maxLength={maxLength}
                className={`w-full py-3.5 ${Icon ? (language === 'ar' ? 'pr-11 pl-4' : 'pl-11 pr-4') : 'px-5'} rounded-2xl border transition-all duration-300 outline-none text-base text-heading placeholder:text-text-muted/60 focus:bg-card focus:border-primary-base/50 focus:ring-[6px] focus:ring-primary-base/5 shadow-sm active:scale-[0.99] ${error ? 'border-error/60' : 'border-border'} ${darkMode ? 'bg-sky-950/45' : 'bg-sky-50'} ${language === 'ar' ? 'text-right' : 'text-left'}`}
            />
        </div>
        {error ? <p className={`text-xs font-semibold text-error ${language === 'ar' ? 'text-right' : 'text-left'}`}>{error}</p> : null}
    </div>
));
InputField.displayName = "InputField";

type CountryOption = {
    value: string;
    label: string;
    prefix: string;
};

interface SimpleSelectFieldProps {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: Array<{ value: string; label: string }>;
    placeholder: string;
    icon?: any;
    required?: boolean;
    darkMode: boolean;
    language: string;
    error?: string;
}

const SimpleSelectField = React.memo(({ label, value, onChange, options, placeholder, icon: Icon, required = false, darkMode, language, error }: SimpleSelectFieldProps) => (
    <div className="flex flex-col gap-2 w-full">
        <label className={`text-sm font-bold tracking-tight text-text-secondary ${language === 'ar' ? 'text-right' : 'text-left'}`}>
            {label} {required && <span className="text-error font-black">*</span>}
        </label>
        <div className="relative group">
            {Icon && <Icon className={`absolute ${language === 'ar' ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-text-muted`} />}
            <select
                value={value}
                onChange={onChange}
                className={`w-full py-3.5 appearance-none ${Icon ? (language === 'ar' ? 'pr-11 pl-10' : 'pl-11 pr-10') : 'px-5'} rounded-2xl border transition-all duration-300 outline-none text-base text-heading focus:bg-card focus:border-primary-base/50 focus:ring-[6px] focus:ring-primary-base/5 shadow-sm ${error ? 'border-error/60' : 'border-border'} ${darkMode ? 'bg-sky-950/45' : 'bg-sky-50'} ${language === 'ar' ? 'text-right' : 'text-left'}`}
            >
                <option value="">{placeholder}</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
        {error ? <p className={`text-xs font-semibold text-error ${language === 'ar' ? 'text-right' : 'text-left'}`}>{error}</p> : null}
    </div>
));
SimpleSelectField.displayName = "SimpleSelectField";

// --- Multi-Step Sections ---
const StepIndicator = ({ steps, currentStep }: { steps: any[], currentStep: number }) => {
    const progress = ((currentStep - 1) / (steps.length - 1)) * 100;
    
    return (
        <div className="mb-12" dir="ltr">
            <div className="flex justify-between mb-6">
                {steps.map((step) => (
                    <div key={step.id} className="flex flex-col items-center gap-3">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold transition-all duration-300 ${currentStep >= step.id
                            ? 'bg-primary-base text-white shadow-lg shadow-primary-base/25 scale-110'
                            : 'bg-muted text-text-muted hover:bg-primary-soft/50'
                            }`}>
                            {currentStep > step.id ? <CheckCircle2 className="w-6 h-6 animate-in zoom-in duration-300" /> : step.id}
                        </div>
                        <span className={`text-[10px] uppercase tracking-widest font-bold hidden sm:block ${currentStep >= step.id ? 'text-primary-base' : 'text-text-muted opacity-60'
                            }`}>{step.title}</span>
                    </div>
                ))}
            </div>
            <div className={`h-2 w-full rounded-full overflow-hidden bg-muted p-0.5`}>
                <motion.div
                    className="h-full rounded-full bg-primary-base shadow-[0_0_10px_rgba(2,132,199,0.3)]"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
            </div>
        </div>
    );
};

const TrustPanel = ({ t }: { t: any }) => (
    <aside className="space-y-6">
        <div className={`p-8 rounded-[2.5rem] border bg-card border-border shadow-medical`}>
            <h3 className={`text-xl font-bold mb-8 text-heading rtl:text-right`}>{t.register.trust.title}</h3>
            <div className="space-y-8">
                <div className="flex gap-4 rtl:flex-row-reverse">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 bg-primary-soft text-primary-base border border-primary-base/10`}>
                        <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div className="rtl:text-right">
                        <h4 className={`font-bold text-base mb-1 text-heading tracking-tight`}>{t.register.trust.hipaa.title}</h4>
                        <p className="text-xs text-text-muted leading-relaxed font-medium">{t.register.trust.hipaa.description}</p>
                    </div>
                </div>
                <div className="flex gap-4 rtl:flex-row-reverse">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 bg-indigo-500/10 text-indigo-500 border border-indigo-500/10`}>
                        <Lock className="w-6 h-6" />
                    </div>
                    <div className="rtl:text-right">
                        <h4 className={`font-bold text-base mb-1 text-heading tracking-tight`}>{t.register.trust.encryption.title}</h4>
                        <p className="text-xs text-text-muted leading-relaxed font-medium">{t.register.trust.encryption.description}</p>
                    </div>
                </div>
                <div className="flex gap-4 rtl:flex-row-reverse">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 bg-primary-soft text-primary-base border border-primary-base/10`}>
                        <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div className="rtl:text-right">
                        <h4 className={`font-bold text-base mb-1 text-heading tracking-tight`}>{t.register.trust.community.title}</h4>
                        <p className="text-xs text-text-muted leading-relaxed font-medium">{t.register.trust.community.description}</p>
                    </div>
                </div>
            </div>

            <div className={`mt-10 p-6 rounded-[1.5rem] border border-dashed border-border bg-background transition-colors`}>
                <p className={`text-xs text-text-muted mb-5 rtl:text-right font-medium`}>{t.register.help.description}</p>
                <button className="text-sm font-bold text-primary-base hover:text-primary-hover hover:scale-105 transition-all rtl:w-full rtl:text-right underline underline-offset-4 decoration-primary-base/30">{t.register.help.contact}</button>
            </div>
        </div>
    </aside>
);

// --- Main Component ---
export default function RegisterClinic({ darkMode, language, onComplete, onBack }: RegisterClinicProps) {
    const t = translations[language];
    const router = useRouter();
    const countries = React.useMemo(
        () => [
            { value: "PS", label: "Palestine", prefix: "+970" },
            { value: "SA", label: "Saudi Arabia", prefix: "+966" },
            { value: "AE", label: "United Arab Emirates", prefix: "+971" },
            { value: "JO", label: "Jordan", prefix: "+962" },
            { value: "EG", label: "Egypt", prefix: "+20" },
            { value: "IQ", label: "Iraq", prefix: "+964" },
            { value: "QA", label: "Qatar", prefix: "+974" },
            { value: "KW", label: "Kuwait", prefix: "+965" },
            { value: "BH", label: "Bahrain", prefix: "+973" },
            { value: "OM", label: "Oman", prefix: "+968" },
            { value: "US", label: "United States", prefix: "+1" },
            { value: "GB", label: "United Kingdom", prefix: "+44" },
            { value: "DE", label: "Germany", prefix: "+49" },
            { value: "FR", label: "France", prefix: "+33" },
            { value: "TR", label: "Turkey", prefix: "+90" },
        ],
        []
    );
    const applyCountryPrefix = React.useCallback((phone: string, prefix: string) => {
        const trimmed = phone.trim();
        if (!trimmed) return `${prefix} `;
        if (trimmed.startsWith(prefix)) return trimmed;
        if (trimmed.startsWith('+')) {
            const rest = trimmed.replace(/^\+\d+\s*/, '');
            return `${prefix} ${rest}`.trim();
        }
        return `${prefix} ${trimmed}`.trim();
    }, []);

    const handleCountryChange = (option: CountryOption | null) => {
        if (!option) {
            updateClinicData({ country: "", city: "" });
            return;
        }

        setFormData(prev => ({
            ...prev,
            clinic: {
                ...prev.clinic,
                country: option.value,
                city: "",
                number: applyCountryPrefix(prev.clinic.number, option.prefix),
            },
            doctors: prev.doctors.map(doc => ({
                ...doc,
                phone: applyCountryPrefix(doc.phone, option.prefix)
            }))
        }));
        setFieldErrors((prev) => ({ ...prev, country: undefined, city: undefined }));
    };

    // Form State (Ready for validation integration)
    const [formData, setFormData] = useState<ClinicFormData>({
        clinicType: 'single',
        admin: { name: "", email: "", password: "", confirmPassword: "" },
        clinic: { name: "", primary_specialty: "", country: "", city: "", number: "" },
        doctors: [{ id: '1', fullName: '', email: '', specialty: '', phone: '' }]
    });
    const selectedCountry = countries.find((country) => country.value === formData.clinic.country);
    const specialtyOptions = React.useMemo(
        () =>
            [
                "General Medicine",
                "Dermatology",
                "Dentistry",
                "Cardiology",
                "Pediatrics",
                "Orthopedics",
                "Neurology",
                "Ophthalmology",
                "Gynecology",
                "Urology",
                "Psychiatry",
                "ENT",
                "Radiology",
                "Oncology",
                "Physiotherapy",
            ].map((specialty) => ({ value: specialty, label: specialty })),
        []
    );
    const citiesByCountry = React.useMemo<Record<string, Array<{ value: string; label: string }>>>(
        () => ({
            PS: [{ value: "Gaza", label: "Gaza" }, { value: "Ramallah", label: "Ramallah" }, { value: "Nablus", label: "Nablus" }, { value: "Hebron", label: "Hebron" }],
            SA: [{ value: "Riyadh", label: "Riyadh" }, { value: "Jeddah", label: "Jeddah" }, { value: "Dammam", label: "Dammam" }, { value: "Mecca", label: "Mecca" }],
            AE: [{ value: "Dubai", label: "Dubai" }, { value: "Abu Dhabi", label: "Abu Dhabi" }, { value: "Sharjah", label: "Sharjah" }],
            JO: [{ value: "Amman", label: "Amman" }, { value: "Irbid", label: "Irbid" }, { value: "Zarqa", label: "Zarqa" }],
            EG: [{ value: "Cairo", label: "Cairo" }, { value: "Alexandria", label: "Alexandria" }, { value: "Giza", label: "Giza" }],
            IQ: [{ value: "Baghdad", label: "Baghdad" }, { value: "Basra", label: "Basra" }, { value: "Mosul", label: "Mosul" }],
            QA: [{ value: "Doha", label: "Doha" }, { value: "Al Rayyan", label: "Al Rayyan" }],
            KW: [{ value: "Kuwait City", label: "Kuwait City" }, { value: "Hawalli", label: "Hawalli" }],
            BH: [{ value: "Manama", label: "Manama" }, { value: "Riffa", label: "Riffa" }],
            OM: [{ value: "Muscat", label: "Muscat" }, { value: "Salalah", label: "Salalah" }],
            US: [{ value: "New York", label: "New York" }, { value: "Los Angeles", label: "Los Angeles" }, { value: "Chicago", label: "Chicago" }],
            GB: [{ value: "London", label: "London" }, { value: "Manchester", label: "Manchester" }, { value: "Birmingham", label: "Birmingham" }],
            DE: [{ value: "Berlin", label: "Berlin" }, { value: "Munich", label: "Munich" }, { value: "Hamburg", label: "Hamburg" }],
            FR: [{ value: "Paris", label: "Paris" }, { value: "Lyon", label: "Lyon" }, { value: "Marseille", label: "Marseille" }],
            TR: [{ value: "Istanbul", label: "Istanbul" }, { value: "Ankara", label: "Ankara" }, { value: "Izmir", label: "Izmir" }],
        }),
        []
    );
    const cityOptions = formData.clinic.country ? citiesByCountry[formData.clinic.country] ?? [] : [];
    const [fieldErrors, setFieldErrors] = useState<
        Partial<
            Record<
                "clinicName" | "specialty" | "country" | "city" | "phone" | "adminName" | "adminEmail" | "adminPassword" | "adminConfirmPassword",
                string
            >
        >
    >({});

    const [currentStep, setCurrentStep] = useState(1);
    const [isRegistering, setIsRegistering] = useState(false);

    const baseSteps = [
        { id: 1, title: t.register.steps.type },
        { id: 2, title: t.register.steps.info },
        { id: 3, title: t.register.steps.admin }
    ];

    const steps = formData.clinicType === 'multi'
        ? [...baseSteps, { id: 4, title: t.register.steps.doctors }]
        : baseSteps;

    // Helpers to update specific sections of formData
    const updateClinicData = (updates: Partial<ClinicData>) => {
        setFormData(prev => ({ ...prev, clinic: { ...prev.clinic, ...updates } }));
    };

    const updateAdminData = (updates: Partial<AdminData>) => {
        setFormData(prev => ({ ...prev, admin: { ...prev.admin, ...updates } }));
    };

    const updateDoctorData = (index: number, updates: Partial<DoctorData>) => {
        setFormData(prev => {
            const newDoctors = [...prev.doctors];
            newDoctors[index] = { ...newDoctors[index], ...updates };
            return { ...prev, doctors: newDoctors };
        });
    };

    const validateClinicFields = () => {
        const errors: Partial<Record<"clinicName" | "specialty" | "country" | "city" | "phone", string>> = {};

        if (!formData.clinic.name.trim()) {
            errors.clinicName = language === 'ar' ? 'اسم العيادة مطلوب' : 'Clinic name is required';
        } else if (formData.clinic.name.trim().length > 40) {
            errors.clinicName = language === 'ar' ? 'اسم العيادة يجب أن لا يزيد عن 40 حرف' : 'Clinic name must not exceed 40 characters';
        }

        if (!formData.clinic.primary_specialty.trim()) {
            errors.specialty = language === 'ar' ? 'يرجى إدخال التخصص' : 'Please enter specialty';
        } else if (formData.clinic.primary_specialty.trim().length > 30) {
            errors.specialty = language === 'ar' ? 'التخصص يجب أن لا يزيد عن 30 حرف' : 'Specialty must not exceed 30 characters';
        }

        if (!formData.clinic.country) {
            errors.country = language === 'ar' ? 'يرجى اختيار الدولة' : 'Please select country';
        }

        if (!formData.clinic.city.trim()) {
            errors.city = language === 'ar' ? 'يرجى إدخال المدينة' : 'Please enter city';
        } else if (formData.clinic.city.trim().length > 20) {
            errors.city = language === 'ar' ? 'المدينة يجب أن لا يزيد عن 20 حرف' : 'City must not exceed 20 characters';
        }

        const phoneValue = formData.clinic.number.trim().replace(/\s+/g, '');
        if (!phoneValue) {
            errors.phone = language === 'ar' ? 'رقم الهاتف مطلوب' : 'Phone number is required';
        } else if (!/^\+\d{7,15}$/.test(phoneValue)) {
            errors.phone = language === 'ar' ? 'صيغة الرقم غير صحيحة. مثال: +970599123456' : 'Invalid phone format. Example: +970599123456';
        }

        setFieldErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const validateAdminFields = () => {
        const errors: Partial<
            Record<"adminName" | "adminEmail" | "adminPassword" | "adminConfirmPassword", string>
        > = {};

        const name = formData.admin.name.trim();
        if (!name) {
            errors.adminName = language === "ar" ? "اسم Admin مطلوب" : "Admin name is required";
        } else if (name.length > 30) {
            errors.adminName = language === "ar" ? "اسم Admin يجب ألا يتجاوز 30 حرفًا" : "Admin name must not exceed 30 characters";
        }

        const email = formData.admin.email.trim();
        if (!email) {
            errors.adminEmail = language === "ar" ? "البريد الإلكتروني مطلوب" : "Email is required";
        } else if (!/^\S+@\S+\.\S+$/.test(email)) {
            errors.adminEmail = language === "ar" ? "البريد الإلكتروني غير صحيح" : "Invalid email address";
        }

        const password = formData.admin.password;
        const confirmPassword = formData.admin.confirmPassword;

        // Allow both Latin and Arabic letters for a more user-friendly password rule.
        const hasLetter = /[A-Za-z\u0600-\u06FF]/.test(password);
        const hasNumber = /\d/.test(password);
        const passwordValidLength = password.length >= 8 && password.length <= 72;

        if (!password) {
            errors.adminPassword = language === "ar" ? "كلمة السر مطلوبة" : "Password is required";
        } else if (!passwordValidLength) {
            errors.adminPassword =
                language === "ar"
                    ? "كلمة السر يجب أن تكون بين 8 و 72 حرفًا"
                    : "Password must be between 8 and 72 characters";
        } else if (!hasLetter || !hasNumber) {
            errors.adminPassword =
                language === "ar"
                    ? "كلمة السر يجب أن تحتوي على أحرف وأرقام"
                    : "Password must contain both letters and numbers";
        }

        if (!confirmPassword) {
            errors.adminConfirmPassword =
                language === "ar" ? "يرجى تأكيد كلمة السر" : "Please confirm your password";
        } else if (confirmPassword !== password) {
            errors.adminConfirmPassword = language === "ar" ? "الرقم غير متطابق" : "Passwords do not match";
        }

        setFieldErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const addDoctor = () => {
        const prefix = selectedCountry ? selectedCountry.prefix : '';
        setFormData(prev => ({
            ...prev,
            doctors: [
                ...prev.doctors,
                { 
                    id: Math.random().toString(36).substr(2, 9), 
                    fullName: '', 
                    email: '', 
                    specialty: '', 
                    phone: prefix ? `${prefix} ` : '' 
                }
            ]
        }));
    };

    const removeDoctor = (id: string) => {
        setFormData(prev => {
            if (prev.doctors.length <= 1) return prev;
            return { ...prev, doctors: prev.doctors.filter(d => d.id !== id) };
        });
    };

    const handleRegister = async () => {
        try {
            setIsRegistering(true);
            const { admin, clinic, clinicType, doctors } = formData;

            // TODO: Replace with robust validation (e.g., Zod + React Hook Form)
            if (!validateClinicFields()) {
                setIsRegistering(false);
                return;
            }

            if (!validateAdminFields()) {
                setIsRegistering(false);
                return;
            }

            // Persist registration on server (service role) to avoid client-side RLS failures.
            const registerResponse = await fetch("/api/register-clinic", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    admin,
                    clinic,
                    clinicType,
                    doctors,
                }),
            });

            let registerResult: { error?: string; code?: string } = {};
            try {
                registerResult = await registerResponse.json();
            } catch {
                throw new Error(
                    language === "ar"
                        ? "استجابة غير متوقعة من الخادم أثناء التسجيل."
                        : "Unexpected server response during registration."
                );
            }
            if (!registerResponse.ok) {
                const suffix =
                    registerResult?.code != null ? ` (${registerResult.code})` : "";
                throw new Error(
                    `${registerResult?.error || "Registration failed"}${suffix}`
                );
            }

            // Sign in newly created admin so AuthGuard routes to dashboard.
            const { error: signInError } = await supabase.auth.signInWithPassword({
                email: admin.email,
                password: admin.password,
            });
            if (signInError) {
                throw new Error(signInError.message);
            }

            // 5️⃣ Completion & Navigation
            localStorage.setItem("clinicType", clinicType);
            onComplete();

            if (clinicType === 'single') {
                router.push("/dashboard/single-clinic");
            } else {
                router.push("/dashboard/multi-clinic");
            }

        } catch (err: unknown) {
            console.error("Unexpected error:", err);
            const message = err instanceof Error ? err.message : "Registration failed. Please try again.";
            alert(message);
        } finally {
            setIsRegistering(false);
        }
    };

    const nextStep = () => {
        // Step 2: validate clinic info before moving forward.
        if (currentStep === 2) {
            if (!validateClinicFields()) return;
        }

        // Step 3: validate admin info before moving forward (multi-clinic flow).
        if (currentStep === 3) {
            if (!validateAdminFields()) return;
        }

        setCurrentStep(prev => Math.min(prev + 1, steps.length));
    };
    const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

    // --- Render Form Steps ---
    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="space-y-8">
                        <div className="text-center mb-10">
                            <h2 className="text-4xl font-extrabold mb-3 text-heading tracking-tight">{t.register.type.title}</h2>
                            <p className="text-text-secondary text-lg">{t.register.type.subtitle}</p>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-8">
                            <button
                                onClick={() => setFormData(prev => ({ ...prev, clinicType: 'single' }))}
                                className={`p-8 rounded-[2rem] border-2 transition-all text-left group relative ${formData.clinicType === 'single'
                                    ? 'border-primary-base bg-primary-soft shadow-lg'
                                    : 'border-border bg-card hover:border-primary-base/30 hover:shadow-md'
                                    } ${language === 'ar' ? 'text-right' : 'text-left'}`}
                            >
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 ${formData.clinicType === 'single' ? 'bg-primary-base text-white' : 'bg-muted text-primary-base group-hover:bg-primary-soft'
                                    } ${language === 'ar' ? 'mr-0 ml-auto' : ''}`}>
                                    <User className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-bold mb-2 text-heading">{t.register.type.single.title}</h3>
                                <p className="text-sm leading-relaxed text-text-secondary">{t.register.type.single.description}</p>
                            </button>
                            <button
                                onClick={() => setFormData(prev => ({ ...prev, clinicType: 'multi' }))}
                                className={`p-8 rounded-[2rem] border-2 transition-all text-left group relative ${formData.clinicType === 'multi'
                                    ? 'border-primary-base bg-primary-soft shadow-lg'
                                    : 'border-border bg-card hover:border-primary-base/30 hover:shadow-md'
                                    } ${language === 'ar' ? 'text-right' : 'text-left'}`}
                            >
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 ${formData.clinicType === 'multi' ? 'bg-primary-base text-white' : 'bg-muted text-primary-base group-hover:bg-primary-soft'
                                    } ${language === 'ar' ? 'mr-0 ml-auto' : ''}`}>
                                    <Users className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-bold mb-2 text-heading">{t.register.type.multi.title}</h3>
                                <p className="text-sm leading-relaxed text-text-secondary">{t.register.type.multi.description}</p>
                            </button>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="space-y-8">
                        <div className="mb-8 rtl:text-right">
                            <h2 className="text-3xl font-bold mb-2 text-heading">{t.register.info.title}</h2>
                            <p className="text-text-secondary">{t.register.info.subtitle}</p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            <InputField
                                label={t.register.info.name}
                                placeholder="e.g. City Heart Center"
                                icon={Building2}
                                value={formData.clinic.name}
                                onChange={(e) => {
                                    updateClinicData({ name: e.target.value });
                                    setFieldErrors((prev) => ({ ...prev, clinicName: undefined }));
                                }}
                                required
                                darkMode={darkMode}
                                language={language}
                                error={fieldErrors.clinicName}
                            />
                            <InputField
                                label={t.register.info.specialty}
                                placeholder={language === 'ar' ? 'مثال: Cardiology' : 'e.g. Cardiology'}
                                icon={Stethoscope}
                                required
                                darkMode={darkMode}
                                language={language}
                                value={formData.clinic.primary_specialty}
                                onChange={(e) => {
                                    const value = e.target.value;
                                
                                    // يسمح فقط بالحروف العربية والإنجليزية والمسافات
                                    const onlyLetters = /^[A-Za-z\u0600-\u06FF\s]*$/;
                                
                                    if (onlyLetters.test(value)) {
                                        updateClinicData({ primary_specialty: value });
                                        setFieldErrors((prev) => ({ ...prev, specialty: undefined }));
                                    }
                                }}
                                error={fieldErrors.specialty}
                            />
                            <div className="flex flex-col gap-2 w-full">
                                <label className={`text-sm font-bold tracking-tight text-text-secondary ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                                    {t.register.info.Country} <span className="text-error font-black">*</span>
                                </label>
                                <div className="relative group">
                                    <Globe className={`absolute z-10 ${language === 'ar' ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-text-muted`} />
                                    <Select<CountryOption, false>
                                        options={countries}
                                        value={selectedCountry ?? null}
                                        onChange={(option) => handleCountryChange(option)}
                                        placeholder={language === 'ar' ? 'اختر الدولة' : 'Select country'}
                                        isRtl={language === 'ar'}
                                        menuPlacement="bottom"
                                        menuPosition="fixed"
                                        className="text-base"
                                        classNamePrefix="country-select"
                                        styles={{
                                            control: (base, state) => ({
                                                ...base,
                                                minHeight: 52,
                                                borderRadius: 16,
                                                borderColor: state.isFocused ? '#38bdf8' : '#d4d4d8',
                                                boxShadow: state.isFocused ? '0 0 0 6px rgba(2,132,199,0.08)' : 'none',
                                                backgroundColor: darkMode ? '#082f49' : '#f0f9ff',
                                                color: darkMode ? '#e0f2fe' : '#0f172a',
                                                paddingLeft: language === 'ar' ? 8 : 28,
                                                paddingRight: language === 'ar' ? 28 : 8,
                                            }),
                                            singleValue: (base) => ({
                                                ...base,
                                                color: darkMode ? '#e0f2fe' : '#0f172a',
                                            }),
                                            input: (base) => ({
                                                ...base,
                                                color: darkMode ? '#e0f2fe' : '#0f172a',
                                            }),
                                            placeholder: (base) => ({
                                                ...base,
                                                color: darkMode ? '#bae6fd' : '#64748b',
                                            }),
                                            menu: (base) => ({
                                                ...base,
                                                zIndex: 40,
                                                borderRadius: 14,
                                                overflow: 'hidden',
                                                backgroundColor: darkMode ? '#082f49' : '#ffffff',
                                            }),
                                            menuList: (base) => ({
                                                ...base,
                                                backgroundColor: darkMode ? '#082f49' : '#ffffff',
                                            }),
                                            option: (base, state) => ({
                                                ...base,
                                                backgroundColor: state.isFocused
                                                    ? (darkMode ? 'rgba(14,165,233,0.25)' : 'rgba(2,132,199,0.08)')
                                                    : (darkMode ? '#082f49' : '#ffffff'),
                                                color: darkMode ? '#e0f2fe' : '#0f172a',
                                                cursor: 'pointer',
                                            }),
                                        }}
                                    />
                                </div>
                                {fieldErrors.country ? <p className={`text-xs font-semibold text-error ${language === 'ar' ? 'text-right' : 'text-left'}`}>{fieldErrors.country}</p> : null}
                            </div>
                            <InputField
                                label={t.register.info.city}
                                value={formData.clinic.city}
                                onChange={(e) => {
                                    updateClinicData({ city: e.target.value });
                                    setFieldErrors((prev) => ({ ...prev, city: undefined }));
                                }}
                                placeholder={language === 'ar' ? 'اكتب المدينة' : 'e.g. Ramallah'}
                                icon={MapPin}
                                required
                                darkMode={darkMode}
                                language={language}
                                error={fieldErrors.city}
                            />
                            <div className="md:col-span-2">
                                <InputField
                                    label={t.register.info.phone}
                                    placeholder={selectedCountry ? `${selectedCountry.prefix} 5XXXXXXXX` : "+1 (555) 000-0000"}
                                    icon={Phone}
                                    value={formData.clinic.number}
                                    onChange={(e) => {
                                        updateClinicData({ number: e.target.value });
                                        setFieldErrors((prev) => ({ ...prev, phone: undefined }));
                                    }}
                                    required
                                    darkMode={darkMode}
                                    language={language}
                                    error={fieldErrors.phone}
                                />
                            </div>
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className="space-y-8">
                        <div className="mb-8 rtl:text-right">
                            <h2 className="text-3xl font-bold mb-2 text-heading">{t.register.admin.title}</h2>
                            <p className="text-text-secondary">{t.register.admin.description}</p>
                        </div>
                        <div className="p-5 rounded-2xl flex items-start gap-4 mb-8 rtl:flex-row-reverse bg-primary-soft border border-primary-base/20 shadow-sm shadow-primary-base/5">
                            <div className="mt-0.5 p-2 rounded-xl shrink-0 bg-primary-base/10 text-primary-base">
                                <ShieldCheck className="w-5 h-5" />
                            </div>
                            <p className="text-sm font-medium leading-relaxed rtl:text-right text-primary-active">
                                {t.register.admin.infoBox}
                            </p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            <InputField
                                label={t.register.admin.fullName}
                                value={formData.admin.name}
                                onChange={(e) => {
                                    updateAdminData({ name: e.target.value });
                                    setFieldErrors((prev) => ({ ...prev, adminName: undefined }));
                                }}
                                placeholder="John Doe"
                                icon={User}
                                required
                                darkMode={darkMode}
                                language={language}
                                error={fieldErrors.adminName}
                            />
                            <InputField
                                label={t.register.admin.email}
                                value={formData.admin.email}
                                onChange={(e) => {
                                    updateAdminData({ email: e.target.value });
                                    setFieldErrors((prev) => ({ ...prev, adminEmail: undefined }));
                                }}
                                placeholder="admin@clinic.com"
                                icon={Mail}
                                required
                                darkMode={darkMode}
                                language={language}
                                error={fieldErrors.adminEmail}
                            />
                            <InputField
                                type="password"
                                label={t.register.admin.password}
                                value={formData.admin.password}
                                onChange={(e) => {
                                    updateAdminData({ password: e.target.value });
                                    setFieldErrors((prev) => ({ ...prev, adminPassword: undefined, adminConfirmPassword: undefined }));
                                }}
                                icon={Lock}
                                required
                                darkMode={darkMode}
                                language={language}
                                error={fieldErrors.adminPassword}
                            />
                            <InputField
                                type="password"
                                label={t.register.admin.confirmPassword}
                                value={formData.admin.confirmPassword}
                                onChange={(e) => {
                                    updateAdminData({ confirmPassword: e.target.value });
                                    setFieldErrors((prev) => ({ ...prev, adminConfirmPassword: undefined }));
                                }}
                                icon={Lock}
                                required
                                darkMode={darkMode}
                                language={language}
                                error={fieldErrors.adminConfirmPassword}
                            />
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div className="space-y-8">
                        <div className="flex items-center justify-between mb-8 rtl:flex-row-reverse">
                            <div className="rtl:text-right">
                                <h2 className="text-3xl font-bold mb-2 text-heading">{t.register.doctors.title}</h2>
                                <p className="text-text-secondary">{t.register.doctors.subtitle}</p>
                            </div>
                            <button
                                onClick={addDoctor}
                                className="flex items-center gap-2 bg-primary-base hover:bg-primary-hover text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg shadow-primary-base/20"
                            >
                                <Plus className="w-4 h-4" /> {t.register.doctors.addDoctor}
                            </button>
                        </div>
                        <div className="space-y-6">
                            {formData.doctors.map((doctor, index) => (
                                <div key={doctor.id} className="relative p-8 rounded-[2rem] border bg-background border-border shadow-sm">
                                    <div className="flex items-center justify-between mb-6 rtl:flex-row-reverse">
                                        <span className="text-xs font-black uppercase tracking-widest text-primary-base opacity-80">{t.register.doctors.name} #{index + 1}</span>
                                        {formData.doctors.length > 1 && (
                                            <button onClick={() => removeDoctor(doctor.id)} className="text-error hover:scale-110 transition-transform p-2 bg-error/5 rounded-full">
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        )}
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <InputField 
                                            label={t.register.doctors.name} 
                                            value={doctor.fullName} 
                                            onChange={(e) => {
                                                const val = e.target.value;
                                                const onlyLetters = /^[A-Za-z\u0600-\u06FF\s]*$/;
                                                if (onlyLetters.test(val) && val.length <= 40) {
                                                    updateDoctorData(index, { fullName: val });
                                                }
                                            }} 
                                            placeholder="Dr. Sarah Wilson" 
                                            icon={User} 
                                            darkMode={darkMode} 
                                            language={language} 
                                        />
                                        <InputField 
                                            label={t.register.doctors.email} 
                                            value={doctor.email} 
                                            onChange={(e) => updateDoctorData(index, { email: e.target.value })} 
                                            placeholder="sarah@clinic.com" 
                                            icon={Mail} 
                                            darkMode={darkMode} 
                                            language={language} 
                                        />
                                        <InputField 
                                            label={t.register.doctors.specialty} 
                                            value={doctor.specialty} 
                                            onChange={(e) => {
                                                const val = e.target.value;
                                                const onlyLetters = /^[A-Za-z\u0600-\u06FF\s]*$/;
                                                if (onlyLetters.test(val)) {
                                                    updateDoctorData(index, { specialty: val });
                                                }
                                            }} 
                                            placeholder="Cardiology" 
                                            icon={Stethoscope} 
                                            darkMode={darkMode} 
                                            language={language} 
                                        />
                                        <InputField 
                                            label={t.register.doctors.phone} 
                                            value={doctor.phone} 
                                            onChange={(e) => updateDoctorData(index, { phone: e.target.value })} 
                                            placeholder={selectedCountry ? `${selectedCountry.prefix} 5XXXXXXXX` : "+1 (555) 000-0000"} 
                                            icon={Phone} 
                                            darkMode={darkMode} 
                                            language={language} 
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-center pt-4">
                            <button
                                onClick={handleRegister}
                                className="text-sm font-bold text-text-muted hover:text-heading transition-colors underline underline-offset-8"
                            >
                                {t.register.doctors.skip}
                            </button>
                        </div>
                    </div>
                );
            default: return null;
        }
    };

    return (
        <div className="min-h-screen pb-20 bg-background" dir={t.dir}>
            <div className="h-16 border-b flex items-center px-6 mb-12 bg-card border-border shadow-sm">
                <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
                    <button onClick={onBack} className="flex items-center gap-3 text-xl font-bold tracking-tight text-heading">
                        <div className="w-9 h-9 bg-primary-base rounded-xl flex items-center justify-center shadow-lg shadow-primary-base/20">
                            <Stethoscope className="text-white w-5 h-5" />
                        </div>
                        <span className="bg-gradient-to-r from-primary-base to-primary-hover bg-clip-text text-transparent">WhatApp Clinic</span>
                    </button>
                    <button onClick={onBack} className="text-sm font-bold text-text-muted hover:text-primary-base transition-colors">
                        {t.register.nav.back}
                    </button>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-[1fr_380px] gap-12 items-start">
                    <div className="p-8 lg:p-12 rounded-[2.5rem] border bg-card border-border shadow-medical transition-all duration-500">
                        <StepIndicator steps={steps} currentStep={currentStep} />

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentStep}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.2 }}
                            >
                                {renderStepContent()}
                            </motion.div>
                        </AnimatePresence>

                        <div className="mt-12 pt-8 border-t border-border flex items-center justify-between" dir="ltr">
                            <button
                                dir={t.dir}
                                onClick={prevStep}
                                disabled={currentStep === 1}
                                className={`flex items-center gap-2 px-8 py-3.5 rounded-2xl font-bold transition-all ${currentStep === 1
                                    ? 'opacity-0 pointer-events-none'
                                    : 'text-heading hover:bg-muted bg-transparent border border-border shadow-sm'
                                    }`}
                            >
                                {language === 'ar' ? <ArrowRight className="w-5 h-5" /> : <ArrowLeft className="w-5 h-5" />}
                                <span>{t.register.nav.back}</span>
                            </button>

                            {currentStep < steps.length ? (
                                <button
                                    dir={t.dir}
                                    onClick={nextStep}
                                    className="bg-primary-base hover:bg-primary-hover text-white px-10 py-3.5 rounded-2xl font-bold shadow-lg shadow-primary-base/20 flex items-center gap-3 transition-all hover:translate-y-[-2px] active:translate-y-[0px]"
                                >
                                    <span>{t.register.nav.next}</span>
                                    {language === 'ar' ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
                                </button>
                            ) : (
                                <button
                                    dir={t.dir}
                                    onClick={handleRegister}
                                    disabled={isRegistering}
                                    className="bg-primary-base hover:bg-primary-hover text-white px-12 py-3.5 rounded-2xl font-bold shadow-lg shadow-primary-base/20 flex items-center gap-3 transition-all hover:translate-y-[-2px] active:translate-y-[0px] disabled:opacity-70 disabled:hover:translate-y-0"
                                >
                                    <span>{isRegistering ? t.register.nav.registering : t.register.nav.register}</span>
                                    <CheckCircle2 className="w-5 h-5" />
                                </button>
                            )}
                        </div>
                    </div>
                    
                    <TrustPanel t={t} />
                </div>
            </div>
        </div>
    );
}
