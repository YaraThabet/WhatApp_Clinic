"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Mail, Lock, ArrowRight, Stethoscope, Eye, EyeOff, AlertCircle, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/components/language-provider"
import { supabase } from "@/lib/supabase";
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")
    const [loading, setLoading] = useState(false)
    const { t } = useLanguage()
    const router = useRouter()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        if (loading) return
        
        setLoading(true)
        setErrorMsg("")

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            })

            if (error) {
                // Friendly error translation or fallback
                setErrorMsg(error.message === "Invalid login credentials" 
                    ? "Incorrect email or password. Please try again." 
                    : error.message)
                setLoading(false)
                return
            }

            if (!data?.user) {
                setErrorMsg("Internal authentication error. Please try again.")
                setLoading(false)
                return
            }

            const user = data.user

            // Get user profile safely using maybeSingle
            const { data: profile, error: profileError } = await supabase
                .from("profiles")
                .select("clinicType")
                .eq("user_id", user.id)
                .maybeSingle()

            if (profileError) {
                console.error("Profile fetch error:", profileError)
            }

            // Handle potential missing profile - redirect to registration if no profile exists
            if (!profile) {
                console.warn("User logged in but has no profile record.")
                router.push("/register")
                return
            }

            const clinicType = profile?.clinicType || "single"

            if (clinicType === "single") {
                router.push("/dashboard/single-clinic")
            } else {
                router.push("/dashboard/multi-clinic")
            }
        } catch (err) {
            console.error("Unexpected error during login:", err)
            setErrorMsg("An unexpected error occurred. Please try again later.")
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-[#0a0f1c] text-white flex flex-col font-sans selection:bg-[#13a4ec]/30 overflow-x-hidden">
            {/* Header / Back Navigation */}
            <header className="px-6 md:px-12 py-6 flex items-center justify-between relative z-10">
                <Link
                    href="/"
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-all group font-bold"
                >
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-[#13a4ec]/20 transition-colors">
                        <ArrowRight className="w-4 h-4 rotate-180" />
                    </div>
                    <span>Home</span>
                </Link>

                <div className="flex items-center gap-3 text-xl font-bold tracking-tight text-white/90">
                    <div className="w-8 h-8 bg-[#13a4ec] rounded-lg flex items-center justify-center shadow-lg shadow-[#13a4ec]/20">
                        <Stethoscope className="text-white w-4.5 h-4.5" />
                    </div>
                </div>
            </header>

            <main className="flex-1 flex items-center justify-center p-4 md:p-8 relative">
                <div className="max-w-[1100px] w-full bg-[#111827]/60 border border-white/5 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row shadow-[0_32px_120px_rgba(0,0,0,0.6)] backdrop-blur-xl relative z-10 animate-in fade-in zoom-in duration-500">

                    {/* Left Side: Visual */}
                    <div className="hidden md:flex md:w-[55%] relative group overflow-hidden min-h-[400px] md:min-h-full">
                        <Image
                            src="/doctor-login-bg.png"
                            alt="Doctor Login"
                            fill
                            className="object-cover object-center grayscale-[0.2] brightness-75 group-hover:scale-105 transition-transform duration-10000 ease-out"
                        />
                        {/* Gradients */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#0a0f1c] via-[#0a0f1c]/40 to-transparent opacity-90" />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#13a4ec]/20 to-transparent" />

                        {/* Content */}
                        <div className="relative z-20 p-16 flex flex-col justify-end h-full gap-8">
                            <div className="flex flex-col gap-6 max-w-md">
                                <div className="bg-[#137fec]/10 border border-[#137fec]/30 text-[#137fec] text-[10px] font-black tracking-[0.2em] uppercase px-4 py-1.5 rounded-full w-fit">
                                    {t("loginPage.badge")}
                                </div>
                                <h1 className="text-4xl lg:text-5xl font-black leading-[1.1] tracking-tight">
                                    {t("loginPage.leftTitle1")}<br />
                                    {t("loginPage.leftTitle2")}<br />
                                    <span className="text-[#13a4ec]">{t("loginPage.leftTitle3")}</span>
                                </h1>
                                <p className="text-gray-400 text-lg font-medium leading-relaxed max-w-[360px]">
                                    {t("loginPage.leftSubtitle")}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Form */}
                    <div className="flex-1 p-6 sm:p-8 md:p-16 flex flex-col justify-center gap-6 sm:gap-10">
                        <div className="space-y-3">
                            <h2 className="text-4xl font-black tracking-tight">{t("loginPage.welcome")}</h2>
                            <p className="text-gray-400 font-medium tracking-tight">Access your clinic&apos;s medical dashboard.</p>
                        </div>

                        <form className="space-y-8" onSubmit={handleLogin}>
                            <div className="space-y-2.5">
                                <Label htmlFor="email" className="text-xs font-black text-gray-500 uppercase tracking-[0.1em]">{t("loginPage.emailLabel")}</Label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-600 group-focus-within:text-[#13a4ec] transition-colors" />
                                    <Input
                                        id="email"
                                        type="email"
                                        disabled={loading}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder={t("loginPage.emailPlaceholder")}
                                        className="bg-[#0a0f1c]/80 border-white/5 pl-12 h-14 rounded-2xl text-white focus:ring-2 focus:ring-[#13a4ec]/20 focus:border-[#13a4ec]/40 placeholder:text-gray-700 transition-all font-medium disabled:opacity-50"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2.5">
                                <div className="flex justify-between items-center">
                                    <Label htmlFor="password" className="text-xs font-black text-gray-500 uppercase tracking-[0.1em]">{t("loginPage.passwordLabel")}</Label>
                                    <Link href="/forgot-password" title="Click to reset your password" className="text-xs font-bold text-[#137fec] hover:underline decoration-2 underline-offset-4 tracking-tight transition-colors">
                                        {t("loginPage.forgotPassword")}
                                    </Link>
                                </div>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-600 group-focus-within:text-[#13a4ec] transition-colors" />
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        disabled={loading}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="bg-[#0a0f1c]/80 border-white/5 pl-12 pr-12 h-14 rounded-2xl text-white focus:ring-2 focus:ring-[#13a4ec]/20 focus:border-[#13a4ec]/40 transition-all font-medium disabled:opacity-50"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-white transition-colors p-1"
                                        title={showPassword ? "Hide password" : "Show password"}
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center space-x-3">
                                <Checkbox id="remember" className="w-5 h-5 rounded-md border-white/10 bg-white/5 data-[state=checked]:bg-[#13a4ec] data-[state=checked]:border-[#13a4ec]" />
                                <label
                                    htmlFor="remember"
                                    className="text-sm font-bold text-gray-400 cursor-pointer select-none"
                                >
                                    {t("loginPage.rememberMe")}
                                </label>
                            </div>

                            <AnimatePresence>
                                {errorMsg && (
                                    <motion.div 
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="flex items-start gap-2 text-red-400 bg-red-400/10 p-4 rounded-xl border border-red-400/20"
                                    >
                                        <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                                        <p className="text-sm font-medium leading-relaxed">{errorMsg}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <Button 
                                disabled={loading} 
                                className="w-full h-16 bg-[#13a4ec] hover:bg-[#13a4ec]/90 text-white font-black text-lg rounded-[1.25rem] shadow-[0_20px_40px_rgba(19,164,236,0.3)] transition-all hover:translate-y-[-2px] active:translate-y-0 flex items-center justify-center gap-3 disabled:opacity-70 disabled:hover:translate-y-0"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-6 h-6 animate-spin" />
                                        <span>Logging in...</span>
                                    </>
                                ) : (
                                    <>
                                        {t("loginPage.signIn")}
                                        <ArrowRight className="h-6 w-6 stroke-[3]" />
                                    </>
                                )}
                            </Button>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    )
}
