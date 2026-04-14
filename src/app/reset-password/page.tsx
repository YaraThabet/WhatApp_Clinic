"use client"

import { useState, useEffect, Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { useSearchParams, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { 
    Lock, 
    ShieldCheck, 
    ArrowRight, 
    ArrowLeft, 
    Stethoscope, 
    CheckCircle2, 
    AlertCircle, 
    Loader2,
    Eye,
    EyeOff
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useLanguage } from "@/components/language-provider"
import { supabase } from "@/lib/supabase"

function ResetPasswordForm() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const { t, language } = useLanguage()
    
    // Logic state
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")
    const [success, setSuccess] = useState(false)
    const [token, setToken] = useState<string | null>(null)

    useEffect(() => {
        // Extract token from query params
        const tokenFromUrl = searchParams.get("token")
        if (tokenFromUrl) {
            setToken(tokenFromUrl)
        }
    }, [searchParams])

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault()
        if (loading) return

        // Basic Validation
        if (password.length < 6) {
            setErrorMsg(t("resetPassword.passwordTooShort"))
            return
        }
        if (password !== confirmPassword) {
            setErrorMsg(t("resetPassword.passwordsMismatch"))
            return
        }

        setLoading(true)
        setErrorMsg("")

        try {
            // If the user provided a token in query params (?token=...), we verify it.
            if (token) {
                const { error: verifyError } = await supabase.auth.verifyOtp({
                    token,
                    type: 'recovery'
                })
                if (verifyError) {
                    setErrorMsg(verifyError.message)
                    setLoading(false)
                    return
                }
            }

            // Update the user's password
            const { error } = await supabase.auth.updateUser({
                password: password
            })

            if (error) {
                setErrorMsg(error.message)
                setLoading(false)
                return
            }

            setSuccess(true)
            setLoading(false)
            
            // Redirect after a short delay
            setTimeout(() => {
                router.push("/login")
            }, 3000)

        } catch (err) {
            console.error("Reset password error:", err)
            setErrorMsg("An unexpected error occurred. Please try again.")
            setLoading(false)
        }
    }

    return (
        <div className="flex-1 p-6 sm:p-8 md:p-16 flex flex-col justify-center gap-8">
            <AnimatePresence mode="wait">
                {!success ? (
                    <motion.div 
                        key="reset-form"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-8"
                    >
                        <div className="space-y-3">
                            <h2 className="text-4xl font-black tracking-tight">{t("resetPassword.title")}</h2>
                            <p className="text-gray-400 font-medium tracking-tight">{t("resetPassword.subtitle")}</p>
                        </div>

                        <form className="space-y-6" onSubmit={handleReset}>
                            <div className="space-y-2.5">
                                <Label htmlFor="password" className="text-xs font-black text-gray-500 uppercase tracking-[0.1em]">{t("resetPassword.newPassword")}</Label>
                                <div className="relative group">
                                    <Lock className={`absolute ${language === 'ar' ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 h-5 w-5 text-gray-600 group-focus-within:text-[#13a4ec] transition-colors`} />
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        disabled={loading}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className={`bg-[#0a0f1c]/80 border-white/5 ${language === 'ar' ? 'pr-12' : 'pl-12'} h-14 rounded-2xl text-white focus:ring-2 focus:ring-[#13a4ec]/20 focus:border-[#13a4ec]/40 placeholder:text-gray-700 transition-all font-medium disabled:opacity-50`}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className={`absolute ${language === 'ar' ? 'left-4' : 'right-4'} top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400 transition-colors`}
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-2.5">
                                <Label htmlFor="confirmPassword" className="text-xs font-black text-gray-500 uppercase tracking-[0.1em]">{t("resetPassword.confirmPassword")}</Label>
                                <div className="relative group">
                                    <ShieldCheck className={`absolute ${language === 'ar' ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 h-5 w-5 text-gray-600 group-focus-within:text-[#13a4ec] transition-colors`} />
                                    <Input
                                        id="confirmPassword"
                                        type={showPassword ? "text" : "password"}
                                        disabled={loading}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className={`bg-[#0a0f1c]/80 border-white/5 ${language === 'ar' ? 'pr-12' : 'pl-12'} h-14 rounded-2xl text-white focus:ring-2 focus:ring-[#13a4ec]/20 focus:border-[#13a4ec]/40 placeholder:text-gray-700 transition-all font-medium disabled:opacity-50`}
                                        required
                                    />
                                </div>
                            </div>

                            {errorMsg && (
                                <motion.div 
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex items-start gap-2 text-red-400 bg-red-400/10 p-4 rounded-xl border border-red-400/20"
                                >
                                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                                    <p className="text-sm font-medium leading-relaxed">{errorMsg}</p>
                                </motion.div>
                            )}

                            <Button 
                                disabled={loading} 
                                className="w-full h-16 bg-[#13a4ec] hover:bg-[#13a4ec]/90 text-white font-black text-lg rounded-[1.25rem] shadow-[0_20px_40px_rgba(19,164,236,0.3)] transition-all hover:translate-y-[-2px] active:translate-y-0 flex items-center justify-center gap-3 disabled:opacity-70 disabled:hover:translate-y-0"
                            >
                                {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <span>{t("resetPassword.submit")}</span>}
                                {!loading && <ArrowRight className={`h-6 w-6 stroke-[3] ${language === 'ar' ? 'rotate-180' : ''}`} />}
                            </Button>
                        </form>
                    </motion.div>
                ) : (
                    <motion.div 
                        key="success-message"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center space-y-8 py-8"
                    >
                        <div className="w-24 h-24 bg-[#13a4ec]/10 rounded-3xl flex items-center justify-center mx-auto text-[#13a4ec] shadow-xl shadow-[#13a4ec]/5 border border-[#13a4ec]/20">
                            <CheckCircle2 size={48} className="animate-in zoom-in duration-500" />
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-4xl font-black tracking-tight">{t("resetPassword.successTitle")}</h2>
                            <p className="text-gray-400 font-medium text-lg max-w-xs mx-auto">
                                {t("resetPassword.successMessage")}
                            </p>
                        </div>
                        <div className="pt-6">
                            <p className="text-sm text-gray-500 mb-6 font-medium italic opacity-60">Redirecting to login shortly...</p>
                            <Link href="/login">
                                <Button variant="outline" className="h-14 px-10 rounded-2xl border-white/10 text-white hover:bg-white/5 transition-colors font-bold group">
                                    <ArrowLeft className={`w-4 h-4 mr-2 ${language === 'ar' ? 'rotate-180' : ''}`} />
                                    {t("resetPassword.backToLogin")}
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default function ResetPasswordPage() {
    const { t, language, direction } = useLanguage()

    return (
        <div className="min-h-screen bg-[#0a0f1c] text-white flex flex-col font-sans selection:bg-[#13a4ec]/30 overflow-x-hidden" dir={direction}>
            {/* Header */}
            <header className="px-6 md:px-12 py-6 flex items-center justify-between relative z-10">
                <Link
                    href="/login"
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-all group font-bold"
                >
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-[#13a4ec]/20 transition-colors">
                        <ArrowLeft className={`w-4 h-4 ${language === 'ar' ? 'rotate-180' : ''}`} />
                    </div>
                    <span>{t("resetPassword.backToLogin")}</span>
                </Link>

                <div className="flex items-center gap-3 text-xl font-bold tracking-tight text-white/90">
                    <div className="w-8 h-8 bg-[#13a4ec] rounded-lg flex items-center justify-center shadow-lg shadow-[#13a4ec]/20">
                        <Stethoscope className="text-white w-4.5 h-4.5" />
                    </div>
                </div>
            </header>

            <main className="flex-1 flex items-center justify-center p-4 md:p-8 relative">
                {/* Background Glows */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#13a4ec]/10 rounded-full blur-[120px] pointer-events-none" />
                
                <div className="max-w-[1100px] w-full bg-[#111827]/60 border border-white/5 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row shadow-[0_32px_120px_rgba(0,0,0,0.6)] backdrop-blur-xl relative z-10 animate-in fade-in zoom-in duration-500">
                    
                    {/* Left Side: Visual Component */}
                    <div className="hidden md:flex md:w-[50%] relative group overflow-hidden min-h-[400px] md:min-h-full">
                        <Image
                            src="/doctor-login-bg.png"
                            alt="Security"
                            fill
                            className="object-cover object-center grayscale-[0.2] brightness-75 group-hover:scale-105 transition-transform duration-10000 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#0a0f1c] via-[#0a0f1c]/40 to-transparent opacity-90" />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#13a4ec]/20 to-transparent" />

                        <div className="relative z-20 p-16 flex flex-col justify-end h-full gap-8">
                            <div className="flex flex-col gap-6 max-w-md">
                                <div className="bg-[#137fec]/10 border border-[#137fec]/30 text-[#137fec] text-[10px] font-black tracking-[0.2em] uppercase px-4 py-1.5 rounded-full w-fit">
                                    {language === 'ar' ? 'أمان متطور' : 'Enhanced Security'}
                                </div>
                                <h1 className="text-4xl lg:text-5xl font-black leading-[1.1] tracking-tight text-white">
                                    {language === 'ar' ? (
                                        <>تأمين حسابك<br />بشكل <span className="text-[#13a4ec]">مثالي</span></>
                                    ) : (
                                        <>Secure Your<br />Access <span className="text-[#13a4ec]">Perfectly</span></>
                                    )}
                                </h1>
                                <p className="text-gray-400 text-lg font-medium leading-relaxed max-w-[360px]">
                                    {language === 'ar' ? 'قم بإنشاء كلمة مرور قوية وفريدة لحماية بياناتك الطبية الحساسة.' : 'Create a strong, unique password to protect your sensitive medical data.'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Form (Wrapped in Suspense) */}
                    <Suspense fallback={
                        <div className="flex-1 flex items-center justify-center">
                            <Loader2 className="w-10 h-10 animate-spin text-[#13a4ec]" />
                        </div>
                    }>
                        <ResetPasswordForm />
                    </Suspense>
                </div>
            </main>
        </div>
    )
}
