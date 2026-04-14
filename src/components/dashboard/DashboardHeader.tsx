"use client"

import * as React from "react"
import {
    Search,
    Bell,
    Globe,
    Plus,
    Building2,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { useLanguage } from "@/components/language-provider"
import { translations } from "@/locales/translations"
import { supabase } from "@/lib/supabase"

export default function DashboardHeader() {
    const { language, toggleLanguage } = useLanguage();
    const t = translations[language];

    const [clinicName, setClinicName] = React.useState<string | null>(null)

    React.useEffect(() => {
        const fetchClinic = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession()
                if (!session?.user) return
                const { data: admin } = await supabase.from('admins').select('clinic_id').eq('email', session.user.email).maybeSingle()
                if (admin?.clinic_id) {
                    const { data: clinic } = await supabase.from('clinics').select('name').eq('id', admin.clinic_id).maybeSingle()
                    if (clinic) setClinicName(clinic.name)
                }
            } catch (err) {
                console.error("Header clinic fetch error:", err)
            }
        }
        fetchClinic()
    }, [])

    return (
        <header className="h-16 bg-[#fefdf9] dark:bg-slate-900 border-b dark:border-slate-800 flex items-center justify-between px-8 shrink-0 sticky top-0 z-30 transition-colors">
            <div className="flex-1 flex items-center gap-6 max-w-2xl">
                {/* ── Clinic Name ── */}
                <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 flex-shrink-0 transition-colors">
                    <div className="w-5 h-5 rounded-full bg-blue-600 dark:bg-blue-500 flex items-center justify-center">
                        <Building2 className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-sm font-bold text-blue-900 dark:text-blue-100 pr-1">
                        {clinicName || "WhatApp Clinic"}
                    </span>
                </div>

                {/* ── Search Bar ── */}
                <div className="relative group w-full max-w-sm">
                    <Search className={cn(
                        "absolute top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors",
                        language === 'ar' ? "right-3" : "left-3"
                    )} />
                    <Input
                        placeholder={t.dashboard.search}
                        className={cn(
                            "bg-slate-50 dark:bg-slate-800 border-none focus-visible:ring-1 focus-visible:ring-blue-500 text-slate-900 dark:text-slate-100 transition-colors",
                            language === 'ar' ? "pr-10" : "pl-10"
                        )}
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="relative text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                    <Bell className="w-5 h-5" />
                    <span className={cn(
                        "absolute top-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white",
                        language === 'ar' ? "left-2" : "right-2"
                    )} />
                </Button>

                <Separator orientation="vertical" className="h-8" />

                <Button className="bg-blue-600 hover:bg-blue-500 text-white rounded-full px-6 shadow-lg shadow-blue-600/20 transition-all hover:scale-105 active:scale-95 gap-2">
                    <Plus className="w-4 h-4" />
                    {t.dashboard.newAppointment}
                </Button>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-full">
                            <Avatar className="w-8 h-8">
                                <AvatarFallback className="bg-blue-100 text-blue-700 font-bold text-xs">AD</AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align={language === 'ar' ? "start" : "end"} className="w-56">
                        <DropdownMenuLabel>{t.dashboard.sidebar.myAccount}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>{t.dashboard.sidebar.profile}</DropdownMenuItem>
                        <DropdownMenuItem>{t.dashboard.sidebar.billing}</DropdownMenuItem>
                        <DropdownMenuItem>{t.dashboard.sidebar.team}</DropdownMenuItem>
                        <DropdownMenuItem>{t.dashboard.sidebar.subscription}</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">{t.dashboard.sidebar.logout}</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}
