"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    LayoutDashboard,
    Users,
    Calendar,
    CreditCard,
    UserCog,
    FileText,
    Settings,
    Stethoscope,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useLanguage } from "@/components/language-provider"
import { translations } from "@/locales/translations"
import { supabase } from "@/lib/supabase"

export default function DashboardSidebar() {
    const pathname = usePathname()
    const { language } = useLanguage();
    const t = translations[language];
    
    const [adminData, setAdminData] = React.useState<{name: string, email: string} | null>(null)

    React.useEffect(() => {
        const fetchAdmin = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession()
                if (!session?.user) return
                
                // First try user_id, fallback to email if old schema
                let { data } = await supabase.from('admins').select('name, email').eq('user_id', session.user.id).maybeSingle()
                
                if (!data) {
                    const { data: fallbackData } = await supabase.from('admins').select('name, email').eq('email', session.user.email).maybeSingle()
                    data = fallbackData
                }

                if (data) setAdminData(data)
            } catch (err) {
                console.error("Sidebar admin fetch error:", err)
            }
        }
        fetchAdmin()
    }, [])

    const sidebarItems = [
        { id: 'dashboard', name: t.dashboard.sidebar.dashboard, icon: LayoutDashboard, href: '/dashboard/clinic' },
        { id: 'doctors', name: t.dashboard.sidebar.doctors, icon: Stethoscope, href: '/dashboard/doctors' },
        { id: 'patients', name: t.dashboard.sidebar.patients, icon: Users, href: '/dashboard/patients' },
        { id: 'appointments', name: t.dashboard.sidebar.appointments, icon: Calendar, href: '/dashboard/appointments' },
        { id: 'settings', name: t.dashboard.sidebar.settings, icon: Settings, href: '/dashboard/settings' },
    ]

    return (
        <aside className={cn(
            "w-64 bg-[#eff7fc] dark:bg-slate-900 border-r dark:border-slate-800 flex flex-col shrink-0 h-screen sticky top-0 transition-colors",
            language === 'ar' ? "border-l border-r-0" : "border-r"
        )}>
            <div className="p-6 flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 dark:bg-blue-500 rounded-lg flex items-center justify-center">
                    <Stethoscope className="text-white w-5 h-5" />
                </div>
                <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">WhatApp Clinic</span>
            </div>

            <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
                {sidebarItems.map((item) => {
                    const active = pathname === item.href || (item.href !== '/dashboard/clinic' && pathname.startsWith(item.href));
                    return (
                        <Link
                            key={item.id}
                            href={item.href}
                            className={cn(
                                "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                                active
                                    ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200"
                            )}
                        >
                            <item.icon className={cn("w-5 h-5", active ? "text-blue-600 dark:text-blue-400" : "text-slate-400 dark:text-slate-500")} />
                            {item.name}
                        </Link>
                    )
                })}
            </nav>

            <div className="p-4 border-t dark:border-slate-800">
                <div className="flex items-center gap-3 p-2 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800 transition-colors">
                    <Avatar className="border-2 border-white dark:border-slate-800 shadow-sm">
                        <AvatarFallback className="bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-400 font-bold">
                            {adminData ? adminData.name.substring(0, 2).toUpperCase() : "AD"}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col overflow-hidden">
                        <span className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
                            {adminData ? adminData.name : (language === 'ar' ? "المسؤول" : "Admin User")}
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400 truncate">
                            {adminData ? adminData.email : "admin@whatappclinic.com"}
                        </span>
                    </div>
                </div>
            </div>
        </aside>
    )
}
