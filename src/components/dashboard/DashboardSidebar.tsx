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

export default function DashboardSidebar() {
    const pathname = usePathname()
    const { language } = useLanguage();
    const t = translations[language];

    const sidebarItems = [
        { id: 'dashboard', name: t.dashboard.sidebar.dashboard, icon: LayoutDashboard, href: '/dashboard/clinic' },
        { id: 'doctors', name: t.dashboard.sidebar.doctors, icon: Stethoscope, href: '/dashboard/doctors' },
        { id: 'patients', name: t.dashboard.sidebar.patients, icon: Users, href: '/dashboard/patients' },
        { id: 'appointments', name: t.dashboard.sidebar.appointments, icon: Calendar, href: '/dashboard/appointments' },
        { id: 'settings', name: t.dashboard.sidebar.settings, icon: Settings, href: '/dashboard/settings' },
    ]

    return (
        <aside className={cn(
            "w-64 bg-white border-r flex flex-col shrink-0 h-screen sticky top-0",
            language === 'ar' ? "border-l border-r-0" : "border-r"
        )}>
            <div className="p-6 flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Stethoscope className="text-white w-5 h-5" />
                </div>
                <span className="text-xl font-bold tracking-tight text-slate-900">CuraClinic</span>
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
                                    ? "bg-blue-50 text-blue-600"
                                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                            )}
                        >
                            <item.icon className={cn("w-5 h-5", active ? "text-blue-600" : "text-slate-400")} />
                            {item.name}
                        </Link>
                    )
                })}
            </nav>

            <div className="p-4 border-t">
                <div className="flex items-center gap-3 p-2 bg-slate-50 rounded-xl border border-slate-100">
                    <Avatar className="border-2 border-white shadow-sm">
                        <AvatarFallback className="bg-blue-100 text-blue-700 font-bold">AD</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col overflow-hidden">
                        <span className="text-sm font-semibold text-slate-900 truncate">{language === 'ar' ? "المسؤول" : "Admin User"}</span>
                        <span className="text-xs text-slate-500 truncate">admin@curaclinic.com</span>
                    </div>
                </div>
            </div>
        </aside>
    )
}
