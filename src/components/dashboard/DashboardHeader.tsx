"use client"

import * as React from "react"
import {
    Search,
    Bell,
    Globe,
    Plus,
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

export default function DashboardHeader() {
    const { language, toggleLanguage } = useLanguage();
    const t = translations[language];

    return (
        <header className="h-16 bg-white border-b flex items-center justify-between px-8 shrink-0 sticky top-0 z-30">
            <div className="flex-1 max-w-xl">
                <div className="relative group">
                    <Search className={cn(
                        "absolute top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors",
                        language === 'ar' ? "right-3" : "left-3"
                    )} />
                    <Input
                        placeholder={t.dashboard.search}
                        className={cn(
                            "bg-slate-50 border-none focus-visible:ring-1 focus-visible:ring-blue-500",
                            language === 'ar' ? "pr-10" : "pl-10"
                        )}
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <Button
                    variant="outline"
                    size="sm"
                    className="gap-2"
                    onClick={toggleLanguage}
                >
                    <Globe className="w-4 h-4" />
                    {language === 'en' ? 'AR' : 'EN'}
                </Button>

                <Button variant="ghost" size="icon" className="relative text-slate-600 hover:bg-slate-100 rounded-full">
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
