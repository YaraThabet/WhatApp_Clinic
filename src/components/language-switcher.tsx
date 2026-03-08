"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"

export function LanguageSwitcher() {
    const { language, toggleLanguage } = useLanguage()

    return (
        <Button
            variant="ghost"
            onClick={toggleLanguage}
            className="h-10 px-4 rounded-xl bg-white/5 border border-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all font-bold text-xs tracking-widest shadow-lg shadow-black/20"
        >
            {language === "en" ? "EN / AR" : "AR / EN"}
        </Button>
    )
}
