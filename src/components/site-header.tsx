"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Stethoscope, Menu, X } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"
import { LanguageSwitcher } from "./language-switcher"
import { useLanguage } from "./language-provider"

export function SiteHeader() {
    const { t } = useLanguage()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const navLinks = [
        { href: "#home", label: t("nav.product") },
        { href: "#features", label: t("nav.features") },
        { href: "#how-it-works", label: t("nav.howItWorks") },
        { href: "#benefits", label: t("nav.pricing") },
    ]

    return (
        <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/80 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex h-20 items-center justify-between">

                {/* Logo */}
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center space-x-2.5">
                        <div className="bg-[#13a4ec] p-1.5 rounded-lg shadow-lg shadow-[#13a4ec]/20">
                            <Stethoscope className="h-6 w-6 text-white" />
                        </div>
                        <span className="font-bold text-2xl tracking-tight text-foreground">{t("common.whatsClinic")}</span>
                    </Link>
                </div>

                {/* Desktop Nav Links */}
                <nav className="hidden lg:flex items-center gap-10">
                    {navLinks.map((link) => (
                        <Link key={link.href} href={link.href} className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-2 sm:gap-4">
                    <div className="hidden sm:flex items-center gap-2 sm:gap-4">
                        <LanguageSwitcher />
                        <ThemeToggle />
                    </div>

                    <Link
                        href="/login"
                        className="hidden md:block text-sm font-bold text-foreground hover:text-primary transition-colors px-4"
                    >
                        {t("common.login")}
                    </Link>

                    <Button className="hidden sm:inline-flex bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 py-6 rounded-xl text-base shadow-xl shadow-primary/20">
                        {t("common.getStarted")}
                    </Button>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="lg:hidden p-2 text-foreground hover:bg-white/5 rounded-lg transition-colors"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="lg:hidden absolute top-20 left-0 w-full bg-background border-b border-white/5 shadow-2xl animate-in slide-in-from-top duration-300">
                    <nav className="flex flex-col p-6 gap-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-lg font-bold text-foreground hover:text-primary transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <div className="h-px bg-white/5 my-2" />
                        <div className="flex items-center justify-between">
                            <div className="flex gap-4">
                                <LanguageSwitcher />
                                <ThemeToggle />
                            </div>
                            <Link
                                href="/login"
                                className="text-lg font-bold text-foreground hover:text-primary transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {t("common.login")}
                            </Link>
                        </div>
                        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-6 rounded-xl text-lg shadow-xl shadow-primary/20">
                            {t("common.getStarted")}
                        </Button>
                    </nav>
                </div>
            )}
        </header>
    )
}
