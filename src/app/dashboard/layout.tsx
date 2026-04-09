"use client"

import * as React from "react"
import DashboardSidebar from "@/components/dashboard/DashboardSidebar"
import DashboardHeader from "@/components/dashboard/DashboardHeader"
import { useLanguage } from "@/components/language-provider"
import { translations } from "@/locales/translations"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { language } = useLanguage();
    const t = translations[language];

    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden" dir={t.dir}>
            {/* Global Sidebar */}
            <DashboardSidebar />

            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Global Header */}
                <DashboardHeader />

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    )
}
