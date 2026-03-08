"use client"

import * as React from "react"
import en from "@/locales/en.json"
import ar from "@/locales/ar.json"

type Language = "en" | "ar"
type Direction = "ltr" | "rtl"

interface LanguageContextType {
    language: Language
    direction: Direction
    toggleLanguage: () => void
    t: (key: string) => string
}

const LanguageContext = React.createContext<LanguageContextType | undefined>(undefined)

const dictionaries = { en, ar }

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = React.useState<Language>("en")
    const [direction, setDirection] = React.useState<Direction>("ltr")

    const toggleLanguage = React.useCallback(() => {
        setLanguage((prev) => {
            const next = prev === "en" ? "ar" : "en"
            const nextDir = next === "ar" ? "rtl" : "ltr"
            setDirection(nextDir)
            return next
        })
    }, [])

    const t = React.useCallback((key: string) => {
        const keys = key.split(".")
        let value: any = dictionaries[language]
        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k]
            } else {
                return key
            }
        }
        return typeof value === "string" ? value : key
    }, [language])

    React.useEffect(() => {
        document.documentElement.dir = direction
        document.documentElement.lang = language
    }, [direction, language])

    return (
        <LanguageContext.Provider value={{ language, direction, toggleLanguage, t }}>
            <div dir={direction}>{children}</div>
        </LanguageContext.Provider>
    )
}

export function useLanguage() {
    const context = React.useContext(LanguageContext)
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider")
    }
    return context
}
