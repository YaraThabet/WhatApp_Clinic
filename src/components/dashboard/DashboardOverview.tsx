"use client"

import * as React from "react"
import {
    Users,
    Calendar,
    CreditCard,
    ChevronLeft,
    ChevronRight,
    TrendingUp,
    Stethoscope,
    Activity,
    Plus,
    MoreVertical
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import { useLanguage } from "@/components/language-provider"
import { translations } from "@/locales/translations"

export default function DashboardOverview() {
    const { language } = useLanguage();
    const t = translations[language];

    // Mock Data
    const stats = [
        { title: t.dashboard.statsLabels.totalDoctors, value: "24", icon: Stethoscope, trend: t.dashboard.mock.thisMonth },
        { title: t.dashboard.statsLabels.totalPatients, value: "1,284", icon: Users, trend: t.dashboard.mock.fromLastMonth },
        { title: t.dashboard.statsLabels.todayAppointments, value: "48", icon: Calendar, trend: t.dashboard.mock.pending },
        { title: t.dashboard.statsLabels.completedVisits, value: "32", icon: Activity, trend: t.dashboard.mock.completionRate },
        { title: t.dashboard.statsLabels.revenueToday, value: "$4,250", icon: CreditCard, trend: t.dashboard.mock.fromYesterday },
    ]

    const todayAppointments = [
        { time: "09:00 AM", patient: "John Doe", doctor: "Dr. Sarah Wilson", department: t.dashboard.mock.cardiology, status: t.dashboard.appointments.statusConfirmed, initials: "JD" },
        { time: "10:30 AM", patient: "Jane Smith", doctor: "Dr. Michael Chen", department: t.dashboard.mock.pediatrics, status: t.dashboard.appointments.statusConfirmed, initials: "JS" },
        { time: "11:15 AM", patient: "Robert Brown", doctor: "Dr. Emily Adams", department: t.dashboard.mock.dermatology, status: t.dashboard.appointments.statusPending, initials: "RB" },
        { time: "01:45 PM", patient: "Linda Davis", doctor: "Dr. Sarah Wilson", department: t.dashboard.mock.cardiology, status: t.dashboard.appointments.statusConfirmed, initials: "LD" },
        { time: "03:00 PM", patient: "William Miller", doctor: "Dr. Michael Chen", department: t.dashboard.mock.pediatrics, status: t.dashboard.appointments.statusCancelled, initials: "WM" },
    ]

    const doctors = [
        { name: "Dr. Sarah Wilson", specialty: t.dashboard.mock.cardiologist, appointments: 12, status: t.dashboard.mock.available, initials: "SW" },
        { name: "Dr. Michael Chen", specialty: t.dashboard.mock.pediatrician, appointments: 15, status: t.dashboard.mock.busy, initials: "MC" },
        { name: "Dr. Emily Adams", specialty: t.dashboard.mock.dermatologist, appointments: 8, status: t.dashboard.mock.available, initials: "EA" },
    ]

    const recentPatients = [
        { name: "Alice Johnson", phone: "+1 234-567-8901", lastVisit: "2024-03-10" },
        { name: "Bob Thompson", phone: "+1 234-567-8902", lastVisit: "2024-03-11" },
        { name: "Charlie Wilson", phone: "+1 234-567-8903", lastVisit: "2024-03-12" },
    ]

    const activityFeed = [
        { type: "registration", message: t.dashboard.mock.patientRegistered.replace('{name}', 'Alice Johnson'), time: t.dashboard.mock.hoursAgo.replace('{n}', '2') },
        { type: "completion", message: t.dashboard.mock.appointmentCompleted.replace('{name}', 'John Doe'), time: t.dashboard.mock.hoursAgo.replace('{n}', '3') },
        { type: "cancellation", message: t.dashboard.mock.appointmentCancelled.replace('{name}', 'William Miller'), time: t.dashboard.mock.hoursAgo.replace('{n}', '5') },
    ]

    const calendarDays = language === 'ar' ? ["الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت", "الأحد"] : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    const calendarHours = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"]

    return (
        <div className="p-8 space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {stats.map((stat) => (
                    <Card key={stat.title} className="border-none shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                                    <stat.icon className="w-5 h-5 text-blue-600" />
                                </div>
                                <Badge variant="secondary" className="bg-emerald-50 text-emerald-600 border-none">
                                    <TrendingUp className={cn("w-3 h-3", language === 'ar' ? "ml-1" : "mr-1")} />
                                    12%
                                </Badge>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-slate-500">{stat.title}</p>
                                <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
                                <p className="text-xs text-slate-400">{stat.trend}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Today's Appointments Table */}
                <Card className="lg:col-span-2 border-none shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div className="rtl:text-right">
                            <CardTitle>{t.dashboard.todayAppointments}</CardTitle>
                            <CardDescription>{t.dashboard.todayAppointmentsDesc}</CardDescription>
                        </div>
                        <Link href="/dashboard/appointments">
                            <Button variant="outline" size="sm">{t.dashboard.appointments.viewAll}</Button>
                        </Link>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="rtl:text-right">{t.dashboard.table.time}</TableHead>
                                    <TableHead className="rtl:text-right">{t.dashboard.table.patient}</TableHead>
                                    <TableHead className="rtl:text-right">{t.dashboard.table.doctor}</TableHead>
                                    <TableHead className="rtl:text-right">{t.dashboard.table.department}</TableHead>
                                    <TableHead className="rtl:text-right">{t.dashboard.table.status}</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {todayAppointments.map((apt, i) => (
                                    <TableRow key={i}>
                                        <TableCell className="font-medium rtl:text-right">{apt.time}</TableCell>
                                        <TableCell className="rtl:text-right">
                                            <div className="flex items-center gap-2 rtl:flex-row-reverse">
                                                <Avatar className="w-7 h-7">
                                                    <AvatarFallback className="bg-slate-100 text-slate-600 text-[10px] uppercase">{apt.initials}</AvatarFallback>
                                                </Avatar>
                                                <span className="text-sm font-medium text-slate-900">{apt.patient}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="rtl:text-right">{apt.doctor}</TableCell>
                                        <TableCell className="rtl:text-right">{apt.department}</TableCell>
                                        <TableCell className="rtl:text-right">
                                            <Badge
                                                className={cn(
                                                    "border-none shadow-none pointer-events-none",
                                                    apt.status === t.dashboard.appointments.statusConfirmed ? "bg-emerald-50 text-emerald-600" :
                                                        apt.status === t.dashboard.appointments.statusPending ? "bg-amber-50 text-amber-600" : "bg-red-50 text-red-600"
                                                )}
                                            >
                                                {apt.status}
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {/* Recent Activity Feed */}
                <Card className="border-none shadow-sm">
                    <CardHeader className="rtl:text-right">
                        <CardTitle>{t.dashboard.recentActivity}</CardTitle>
                        <CardDescription>{t.dashboard.recentActivityDesc}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {activityFeed.map((activity, i) => (
                            <div key={i} className="flex gap-4 rtl:flex-row-reverse">
                                <div className={cn(
                                    "w-2 h-2 rounded-full mt-2 shrink-0",
                                    activity.type === "registration" ? "bg-blue-500" :
                                        activity.type === "completion" ? "bg-emerald-500" : "bg-red-500"
                                )} />
                                <div className="space-y-1 rtl:text-right">
                                    <p className="text-sm text-slate-700">{activity.message}</p>
                                    <p className="text-xs text-slate-400">{activity.time}</p>
                                </div>
                            </div>
                        ))}
                        <Link href="/dashboard/reports" className="w-full">
                            <Button variant="ghost" className="w-full text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                                {t.dashboard.appointments.viewAll}
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Doctors Overview */}
                <Card className="border-none shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div className="rtl:text-right">
                            <CardTitle>{t.dashboard.doctorsOverview}</CardTitle>
                            <CardDescription>{t.dashboard.doctorsOverviewDesc}</CardDescription>
                        </div>
                        <Button variant="ghost" size="icon" className="text-blue-600">
                            <Plus className="w-5 h-5" />
                        </Button>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {doctors.map((doctor, i) => (
                            <div key={i} className="flex items-center justify-between group cursor-pointer rtl:flex-row-reverse">
                                <div className="flex items-center gap-3 rtl:flex-row-reverse">
                                    <Avatar className="w-12 h-12">
                                        <AvatarFallback className="bg-blue-50 text-blue-600 font-semibold">{doctor.initials}</AvatarFallback>
                                    </Avatar>
                                    <div className="space-y-1 rtl:text-right">
                                        <p className="text-sm font-semibold text-slate-900">{doctor.name}</p>
                                        <p className="text-xs text-slate-500">{doctor.specialty}</p>
                                    </div>
                                </div>
                                <div className="text-right space-y-1 rtl:text-left">
                                    <Badge className={cn("border-none shadow-none text-[10px] px-2 py-0.5 pointer-events-none", doctor.status === (language === 'ar' ? "متاح" : "Available") ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600")}>
                                        {doctor.status}
                                    </Badge>
                                    <p className="text-[10px] text-slate-400">{doctor.appointments} {t.dashboard.aptsToday}</p>
                                </div>
                            </div>
                        ))}
                        <Link href="/dashboard/doctors">
                            <Button
                                className="w-full bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-md shadow-blue-600/10 transition-all gap-2"
                            >
                                Manage Doctors
                            </Button>
                        </Link>
                    </CardContent>
                </Card>

                {/* Clinic Calendar (Simplified Weekly View) */}
                <Card className="lg:col-span-2 border-none shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div className="rtl:text-right">
                            <CardTitle>{t.dashboard.clinicCalendar}</CardTitle>
                            <CardDescription>{t.dashboard.clinicCalendarDesc}</CardDescription>
                        </div>
                        <div className="flex items-center gap-2 rtl:flex-row-reverse">
                            <Button variant="outline" size="icon"><ChevronLeft className={cn("w-4 h-4", language === 'ar' && "rotate-180")} /></Button>
                            <span className="text-sm font-medium">{language === 'ar' ? "10 مارس - 16 مارس" : "Mar 10 - Mar 16"}</span>
                            <Button variant="outline" size="icon"><ChevronRight className={cn("w-4 h-4", language === 'ar' && "rotate-180")} /></Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-8 gap-px bg-slate-200 rounded-lg overflow-hidden border border-slate-200">
                            <div className="bg-slate-50 p-2 text-center text-[10px] font-bold text-slate-400 uppercase">{t.dashboard.table.time}</div>
                            {calendarDays.map(day => (
                                <div key={day} className="bg-slate-50 p-2 text-center text-[10px] font-bold text-slate-400 uppercase">{day}</div>
                            ))}

                            {calendarHours.map(hour => (
                                <React.Fragment key={hour}>
                                    <div className="bg-white p-2 text-center text-[10px] font-medium text-slate-500 border-t border-slate-100">{hour}</div>
                                    {calendarDays.map(day => (
                                        <div key={`${day}-${hour}`} className="bg-white p-1 border-t border-l border-slate-100 min-h-[40px] relative">
                                            {(day === "Tue" || day === "الثلاثاء") && hour === "10:00" && (
                                                <div className={cn(
                                                    "absolute inset-y-1 inset-x-1 bg-blue-100 border-blue-600 rounded p-1",
                                                    language === 'ar' ? "border-r-2" : "border-l-2"
                                                )}>
                                                    <p className="text-[8px] font-bold text-blue-700 truncate">Jane Smith</p>
                                                    <p className="text-[7px] text-blue-600 truncate">Dr. Chen</p>
                                                </div>
                                            )}
                                            {(day === "Wed" || day === "الأربعاء") && hour === "11:00" && (
                                                <div className={cn(
                                                    "absolute inset-y-1 inset-x-1 bg-indigo-100 border-indigo-600 rounded p-1",
                                                    language === 'ar' ? "border-r-2" : "border-l-2"
                                                )}>
                                                    <p className="text-[8px] font-bold text-indigo-700 truncate">Robert Brown</p>
                                                    <p className="text-[7px] text-indigo-600 truncate">Dr. Adams</p>
                                                </div>
                                            )}
                                            {(day === "Fri" || day === "الجمعة") && hour === "14:00" && (
                                                <div className={cn(
                                                    "absolute inset-y-1 inset-x-1 bg-emerald-100 border-emerald-600 rounded p-1",
                                                    language === 'ar' ? "border-r-2" : "border-l-2"
                                                )}>
                                                    <p className="text-[8px] font-bold text-emerald-700 truncate">Linda Davis</p>
                                                    <p className="text-[7px] text-emerald-600 truncate">Dr. Wilson</p>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </React.Fragment>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Patients Table */}
            <Card className="border-none shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between">
                    <div className="rtl:text-right">
                        <CardTitle>{t.dashboard.recentPatients}</CardTitle>
                        <CardDescription>{t.dashboard.recentPatientsDesc}</CardDescription>
                    </div>
                    <Link href="/dashboard/patients">
                        <Button variant="outline" size="sm">{t.dashboard.viewAllPatients}</Button>
                    </Link>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="rtl:text-right">{t.dashboard.table.patientName}</TableHead>
                                <TableHead className="rtl:text-right">{t.dashboard.table.phoneNumber}</TableHead>
                                <TableHead className="rtl:text-right">{t.dashboard.table.lastVisit}</TableHead>
                                <TableHead className={cn(language === 'ar' ? "text-left" : "text-right")}>{t.dashboard.table.actions}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {recentPatients.map((patient, i) => (
                                <TableRow key={i}>
                                    <TableCell className="font-medium rtl:text-right">{patient.name}</TableCell>
                                    <TableCell className="rtl:text-right">{patient.phone}</TableCell>
                                    <TableCell className="rtl:text-right">{patient.lastVisit}</TableCell>
                                    <TableCell className={cn(language === 'ar' ? "text-left" : "text-right")}>
                                        <Button variant="ghost" size="icon">
                                            <MoreVertical className="w-4 h-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}

import Link from "next/link"
