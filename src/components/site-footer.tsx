"use client"

import Link from "next/link"
import { Stethoscope, Twitter, Linkedin, Github, Instagram, Mail, Phone, MapPin } from "lucide-react"
import { useLanguage } from "./language-provider"

export function SiteFooter() {
    const { t } = useLanguage()

    return (
        <footer className="border-t border-white/10 bg-[#020617] py-20 pb-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-20">
                    {/* Brand Section */}
                    <div className="lg:col-span-2 flex flex-col gap-6">
                        <div className="flex items-center gap-2.5">
                            <div className="bg-[#13a4ec] p-1.5 rounded-lg shadow-[0_0_15px_rgba(19,164,236,0.3)]">
                                <Stethoscope className="h-6 w-6 text-white" />
                            </div>
                            <span className="font-bold text-2xl tracking-tight text-white">{t("common.whatsClinic")}</span>
                        </div>
                        <p className="text-slate-400 max-w-sm text-sm font-medium leading-relaxed">
                            {t("footer.desc")}
                        </p>
                        <div className="flex gap-4">
                            <Link href="#" className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:border-[#13a4ec] hover:text-[#13a4ec] transition-all">
                                <Twitter className="h-4 w-4" />
                            </Link>
                            <Link href="#" className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:border-[#13a4ec] hover:text-[#13a4ec] transition-all">
                                <Linkedin className="h-4 w-4" />
                            </Link>
                            <Link href="#" className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:border-[#13a4ec] hover:text-[#13a4ec] transition-all">
                                <Github className="h-4 w-4" />
                            </Link>
                            <Link href="#" className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:border-[#13a4ec] hover:text-[#13a4ec] transition-all">
                                <Instagram className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>

                    {/* Product */}
                    <div className="flex flex-col gap-6">
                        <h4 className="text-white font-bold text-sm tracking-widest uppercase">{t("nav.product")}</h4>
                        <div className="flex flex-col gap-3">
                            <Link href="/features" className="text-slate-400 hover:text-[#13a4ec] text-sm font-medium transition-colors">{t("nav.features")}</Link>
                            <Link href="/pricing" className="text-slate-400 hover:text-[#13a4ec] text-sm font-medium transition-colors">{t("nav.pricing")}</Link>
                            <Link href="/how-it-works" className="text-slate-400 hover:text-[#13a4ec] text-sm font-medium transition-colors">{t("nav.howItWorks")}</Link>
                            <Link href="/docs" className="text-slate-400 hover:text-[#13a4ec] text-sm font-medium transition-colors">{t("common.docs")}</Link>
                        </div>
                    </div>

                    {/* Company */}
                    <div className="flex flex-col gap-6">
                        <h4 className="text-white font-bold text-sm tracking-widest uppercase">{t("footer.company")}</h4>
                        <div className="flex flex-col gap-3">
                            <Link href="/about" className="text-slate-400 hover:text-[#13a4ec] text-sm font-medium transition-colors">{t("footer.about")}</Link>
                            <Link href="/careers" className="text-slate-400 hover:text-[#13a4ec] text-sm font-medium transition-colors">{t("footer.careers")}</Link>
                            <Link href="/contact" className="text-slate-400 hover:text-[#13a4ec] text-sm font-medium transition-colors">{t("footer.contact")}</Link>
                            <Link href="/privacy" className="text-slate-400 hover:text-[#13a4ec] text-sm font-medium transition-colors">{t("footer.privacy")}</Link>
                            <Link href="/terms" className="text-slate-400 hover:text-[#13a4ec] text-sm font-medium transition-colors">{t("footer.terms")}</Link>
                        </div>
                    </div>

                    {/* Support */}
                    <div className="flex flex-col gap-6">
                        <h4 className="text-white font-bold text-sm tracking-widest uppercase">{t("footer.support")}</h4>
                        <div className="flex flex-col gap-3">
                            <Link href="/help" className="text-slate-400 hover:text-[#13a4ec] text-sm font-medium transition-colors">{t("footer.helpCenter")}</Link>
                            <Link href="/api" className="text-slate-400 hover:text-[#13a4ec] text-sm font-medium transition-colors">{t("footer.apiDocs")}</Link>
                            <Link href="/community" className="text-slate-400 hover:text-[#13a4ec] text-sm font-medium transition-colors">{t("footer.community")}</Link>
                            <Link href="/hipaa" className="text-slate-400 hover:text-[#13a4ec] text-sm font-medium transition-colors">{t("footer.hipaa")}</Link>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
                    <div className="flex flex-wrap justify-center md:justify-start gap-x-8 gap-y-2">
                        <span className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em]">
                            © {new Date().getFullYear()} {t("common.whatsClinic").toUpperCase()}
                        </span>
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em]">System Status: Operational</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <span className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 border border-slate-800 rounded-full">
                            {t("common.enterpriseSecurity")}
                        </span>
                        <span className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 border border-slate-800 rounded-full">
                            {t("common.hipaaCompliant")}
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    )
}
