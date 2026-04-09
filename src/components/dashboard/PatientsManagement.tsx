"use client"

import * as React from "react"
import { useRouter, useParams } from "next/navigation"
import {
    Search,
    Filter,
    MoreVertical,
    Users,
    Phone,
    Calendar,
    MessageCircle,
    Plus,
    Clock,
    User,
    FileText,
    TrendingUp,
    ShieldCheck,
    X
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useLanguage } from "@/components/language-provider"
import { translations } from "@/locales/translations"

// --- Mock Data ---

const mockPatients = [
    {
        id: "1",
        name: "Alice Johnson",
        phone: "+1 234-567-8901",
        visits: 12,
        lastVisit: "2024-03-20",
        status: "Active",
        initials: "AJ",
        appointments: [
            { id: "a1", doctor: "Dr. Sarah Wilson", time: "2024-03-20 10:00 AM", status: "Confirmed" },
            { id: "a2", doctor: "Dr. Michael Chen", time: "2024-02-15 02:30 PM", status: "Completed" },
        ],
        associatedDoctors: [
            { name: "Dr. Sarah Wilson", specialty: "Cardiologist", initials: "SW" },
            { name: "Dr. Michael Chen", specialty: "Pediatrician", initials: "MC" },
        ],
        notes: [
            { id: "n1", text: "Patient reports mild chest pain after exercise.", date: "2024-03-20" },
            { id: "n2", text: "Regular checkup, all vitals normal.", date: "2024-02-15" }
        ],
        stats: { totalVisits: 12, totalAppointments: 14, cancelled: 2 }
    },
    {
        id: "2",
        name: "Robert Brown",
        phone: "+1 234-567-8902",
        visits: 8,
        lastVisit: "2024-03-18",
        status: "Active",
        initials: "RB",
        appointments: [
            { id: "a3", doctor: "Dr. Emily Adams", time: "2024-03-18 11:15 AM", status: "Pending" },
        ],
        associatedDoctors: [
            { name: "Dr. Emily Adams", specialty: "Dermatologist", initials: "EA" },
        ],
        notes: [],
        stats: { totalVisits: 8, totalAppointments: 10, cancelled: 1 }
    },
    {
        id: "3",
        name: "Jane Smith",
        phone: "+1 234-567-8903",
        visits: 5,
        lastVisit: "2024-02-10",
        status: "Inactive",
        initials: "JS",
        appointments: [],
        associatedDoctors: [],
        notes: [],
        stats: { totalVisits: 5, totalAppointments: 5, cancelled: 0 }
    },
    {
        id: "4",
        name: "William Miller",
        phone: "+1 234-567-8904",
        visits: 15,
        lastVisit: "2024-03-25",
        status: "Active",
        initials: "WM",
        appointments: [],
        associatedDoctors: [],
        notes: [],
        stats: { totalVisits: 15, totalAppointments: 18, cancelled: 3 }
    }
];

export default function PatientsManagement() {
    const router = useRouter();
    const params = useParams();
    const { language } = useLanguage();
    const t = translations[language];
    const isRTL = language === 'ar';

    // UI States
    const [searchQuery, setSearchQuery] = React.useState("");
    const [statusFilter, setStatusFilter] = React.useState<"All" | "Active" | "Inactive">("All");
    const [newNote, setNewNote] = React.useState("");

    // Get selected patient from ID in URL
    const selectedPatientId = params?.id as string;
    const selectedPatient = mockPatients.find(p => p.id === selectedPatientId);

    // Filtering logic
    const filteredPatients = mockPatients.filter(patient => {
        const matchesSearch = patient.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             patient.phone.includes(searchQuery);
        const matchesStatus = statusFilter === "All" || patient.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const handleRowClick = (id: string) => {
        router.push(`/dashboard/patients/${id}`);
    };

    const handleCloseSheet = () => {
        router.push('/dashboard/patients');
    };

    const handleWhatsApp = (phone: string, name: string) => {
        const message = encodeURIComponent(`${t.dashboard.patientsManagement.details.whatsappMessage} (${name})`);
        const url = `https://wa.me/${phone.replace(/[\s+-]/g, '')}?text=${message}`;
        window.open(url, '_blank');
    };

    return (
        <div className="p-8 space-y-8 animate-in fade-in duration-500">
            {/* Header section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 border-b-2 border-blue-600/20 inline-block pb-1">
                        {t.dashboard.patientsManagement.title}
                    </h1>
                    <p className="text-slate-500 text-sm">{t.dashboard.patientsManagement.description}</p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-500 text-white rounded-2xl shadow-lg shadow-blue-600/20 transition-all hover:scale-105 active:scale-95 gap-2 px-6">
                    <Plus className="w-4 h-4" />
                    {language === 'ar' ? 'إضافة مريض' : 'Add New Patient'}
                </Button>
            </div>

            {/* Filter controls */}
            <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-3xl border border-slate-100 shadow-sm">
                <div className="relative flex-1 group">
                    <Search className={cn(
                        "absolute top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-600 transition-colors",
                        isRTL ? "right-3" : "left-3"
                    )} />
                    <Input 
                        placeholder={t.dashboard.patientsManagement.searchPlaceholder}
                        className={cn(
                            "bg-slate-50 border-none focus-visible:ring-2 focus-visible:ring-blue-600/20 transition-all rounded-xl",
                            isRTL ? "pr-10 text-right" : "pl-10"
                        )}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-xl shrink-0">
                    {(["All", "Active", "Inactive"] as const).map((status) => (
                        <Button
                            key={status}
                            variant="ghost"
                            size="sm"
                            className={cn(
                                "rounded-lg text-xs font-semibold px-4 transition-all",
                                statusFilter === status 
                                    ? "bg-white text-blue-600 shadow-sm" 
                                    : "text-slate-500 hover:text-slate-900"
                            )}
                            onClick={() => setStatusFilter(status)}
                        >
                            {status === "All" ? t.dashboard.patientsManagement.filterAll : 
                             status === "Active" ? t.dashboard.patientsManagement.filterActive : 
                             t.dashboard.patientsManagement.filterInactive}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Patients Table */}
            <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
                <Table>
                    <TableHeader className="bg-slate-50/50">
                        <TableRow className="border-slate-100 hover:bg-transparent">
                            <TableHead className={cn("text-xs font-bold uppercase tracking-wider py-5 px-6", isRTL && "text-right")}>
                                {t.dashboard.patientsManagement.table.name}
                            </TableHead>
                            <TableHead className={cn("text-xs font-bold uppercase tracking-wider py-5 px-6", isRTL && "text-right")}>
                                {t.dashboard.patientsManagement.table.phone}
                            </TableHead>
                            <TableHead className={cn("text-xs font-bold uppercase tracking-wider py-5 px-6", isRTL && "text-right")}>
                                {t.dashboard.patientsManagement.table.visits}
                            </TableHead>
                            <TableHead className={cn("text-xs font-bold uppercase tracking-wider py-5 px-6", isRTL && "text-right")}>
                                {t.dashboard.patientsManagement.table.lastVisit}
                            </TableHead>
                            <TableHead className={cn("text-xs font-bold uppercase tracking-wider py-5 px-6", isRTL && "text-right")}>
                                {t.dashboard.patientsManagement.table.status}
                            </TableHead>
                            <TableHead className={cn("text-xs font-bold uppercase tracking-wider py-5 px-6", isRTL ? "text-right" : "text-right")}>
                                {t.dashboard.patientsManagement.table.actions}
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredPatients.map((patient) => (
                            <TableRow 
                                key={patient.id} 
                                className="group cursor-pointer hover:bg-blue-50/30 border-slate-50 transition-colors"
                                onClick={() => handleRowClick(patient.id)}
                            >
                                <TableCell className="py-4 px-6">
                                    <div className="flex items-center gap-4">
                                        <Avatar className="w-10 h-10 ring-2 ring-white shadow-md">
                                            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold">
                                                {patient.initials}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col">
                                            <span className="font-bold text-slate-900 group-hover:text-blue-700 transition-colors">{patient.name}</span>
                                            <span className="text-xs text-slate-400">ID: #{patient.id}00</span>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="py-4 px-6 text-slate-600 font-medium">{patient.phone}</TableCell>
                                <TableCell className="py-4 px-6">
                                    <Badge variant="outline" className="bg-slate-50 border-slate-200 text-slate-600 font-bold px-3">
                                        {patient.visits}
                                    </Badge>
                                </TableCell>
                                <TableCell className="py-4 px-6 text-slate-500 italic text-sm">{patient.lastVisit}</TableCell>
                                <TableCell className="py-4 px-6">
                                    <Badge className={cn(
                                        "shadow-none px-3 py-1 text-[10px] font-bold uppercase border-none",
                                        patient.status === "Active" 
                                            ? "bg-emerald-50 text-emerald-600" 
                                            : "bg-slate-100 text-slate-400"
                                    )}>
                                        {patient.status === "Active" ? t.dashboard.patientsManagement.filterActive : t.dashboard.patientsManagement.filterInactive}
                                    </Badge>
                                </TableCell>
                                <TableCell className="py-4 px-6 text-right">
                                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-white hover:shadow-md transition-all">
                                        <MoreVertical className="w-4 h-4 text-slate-400" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Side Panel (Sheet) */}
            <Sheet open={!!selectedPatientId} onOpenChange={(open) => !open && handleCloseSheet()}>
                <SheetContent 
                    side={isRTL ? "left" : "right"}
                    className="w-full sm:max-w-xl p-0 border-none bg-slate-50/95 backdrop-blur-xl"
                >
                    {selectedPatient && (
                        <div className="flex flex-col h-full overflow-hidden">
                            {/* Patient Header */}
                            <div className="p-8 bg-white border-b border-slate-100 space-y-6">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-4">
                                        <Avatar className="w-16 h-16 shadow-2xl shadow-blue-500/20 ring-4 ring-white">
                                            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-xl font-black">
                                                {selectedPatient.initials}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="space-y-1">
                                            <SheetTitle className="text-2xl font-black text-slate-900">{selectedPatient.name}</SheetTitle>
                                            <div className="flex items-center gap-2 text-slate-500">
                                                <Phone className="w-3.5 h-3.5" />
                                                <span className="text-sm font-medium">{selectedPatient.phone}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <Badge className={cn(
                                        "shadow-none px-4 py-1.5 text-xs font-bold rounded-full border-none",
                                        selectedPatient.status === "Active" 
                                            ? "bg-emerald-500 text-white" 
                                            : "bg-slate-400 text-white"
                                    )}>
                                        {selectedPatient.status === "Active" ? t.dashboard.patientsManagement.filterActive : t.dashboard.patientsManagement.filterInactive}
                                    </Badge>
                                </div>

                                {/* Stats Cards */}
                                <div className="grid grid-cols-3 gap-4">
                                    {[
                                        { label: t.dashboard.patientsManagement.details.totalVisits, value: selectedPatient.stats.totalVisits, icon: Clock, color: "blue" },
                                        { label: t.dashboard.patientsManagement.details.totalAppointments, value: selectedPatient.stats.totalAppointments, icon: Calendar, color: "indigo" },
                                        { label: t.dashboard.patientsManagement.details.cancelledAppointments, value: selectedPatient.stats.cancelled, icon: X, color: "rose" },
                                    ].map((stat, i) => (
                                        <div key={i} className="bg-slate-50/50 p-4 rounded-3xl border border-slate-100/50 hover:bg-white hover:shadow-lg transition-all group">
                                            <div className={cn(
                                                "w-8 h-8 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform",
                                                stat.color === "blue" ? "bg-blue-100/50 text-blue-600" :
                                                stat.color === "indigo" ? "bg-indigo-100/50 text-indigo-600" : "bg-rose-100/50 text-rose-600"
                                            )}>
                                                <stat.icon className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] uppercase tracking-wider font-black text-slate-400 mb-0.5">{stat.label}</p>
                                                <p className="text-xl font-black text-slate-900">{stat.value}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Tabs System */}
                            <div className="flex-1 overflow-y-auto px-8 py-6">
                                <Tabs defaultValue="appointments" className="w-full">
                                    <TabsList className="bg-slate-100/80 p-1 rounded-2xl w-full mb-8">
                                        <TabsTrigger value="appointments" className="flex-1 rounded-xl font-bold py-2 data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm">
                                            {t.dashboard.patientsManagement.details.tabs.appointments}
                                        </TabsTrigger>
                                        <TabsTrigger value="doctors" className="flex-1 rounded-xl font-bold py-2 data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm">
                                            {t.dashboard.patientsManagement.details.tabs.doctors}
                                        </TabsTrigger>
                                        <TabsTrigger value="notes" className="flex-1 rounded-xl font-bold py-2 data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm">
                                            {t.dashboard.patientsManagement.details.tabs.notes}
                                        </TabsTrigger>
                                    </TabsList>

                                    {/* Appointments Tab */}
                                    <TabsContent value="appointments" className="space-y-4 m-0">
                                        {selectedPatient.appointments.length > 0 ? (
                                            selectedPatient.appointments.map(apt => (
                                                <div key={apt.id} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between group hover:border-blue-200 transition-colors">
                                                    <div className="space-y-2">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                                            <span className="font-bold text-slate-900">{apt.doctor}</span>
                                                        </div>
                                                        <div className="flex flex-col gap-1">
                                                            <div className="flex items-center gap-2 text-xs text-slate-400">
                                                                <Clock className="w-3 h-3" />
                                                                {apt.time}
                                                            </div>
                                                            <Badge variant="secondary" className="w-fit text-[10px] bg-slate-50 text-slate-500 font-bold border-none">
                                                                {apt.status}
                                                            </Badge>
                                                        </div>
                                                    </div>
                                                    <Button 
                                                        size="icon" 
                                                        className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full h-11 w-11 transition-all hover:scale-110 active:scale-90"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleWhatsApp(selectedPatient.phone, selectedPatient.name);
                                                        }}
                                                    >
                                                        <MessageCircle className="w-5 h-5" />
                                                    </Button>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="py-20 flex flex-col items-center text-center space-y-4">
                                                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
                                                    <Calendar className="w-8 h-8 text-slate-300" />
                                                </div>
                                                <p className="text-slate-400 font-medium">{language === 'ar' ? 'لا توجد مواعيد' : 'No appointments scheduled'}</p>
                                            </div>
                                        )}
                                    </TabsContent>

                                    {/* Doctors Tab */}
                                    <TabsContent value="doctors" className="space-y-4 m-0">
                                        {selectedPatient.associatedDoctors.map((doc, i) => (
                                            <div key={i} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4 hover:bg-slate-50/50 transition-colors">
                                                <Avatar className="w-12 h-12">
                                                    <AvatarFallback className="bg-blue-50 text-blue-600 font-black">{doc.initials}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="font-bold text-slate-900">{doc.name}</p>
                                                    <p className="text-xs text-slate-400">{doc.specialty}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </TabsContent>

                                    {/* Notes Tab */}
                                    <TabsContent value="notes" className="space-y-6 m-0">
                                        <div className="space-y-4">
                                            {selectedPatient.notes.length > 0 ? (
                                                selectedPatient.notes.map(note => (
                                                    <div key={note.id} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-3">
                                                        <p className="text-sm text-slate-700 leading-relaxed font-medium">{note.text}</p>
                                                        <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                                                            <Clock className="w-3 h-3" />
                                                            {note.date}
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="text-center py-10 text-slate-400 font-medium">
                                                    {t.dashboard.patientsManagement.details.noNotes}
                                                </p>
                                            )}
                                        </div>

                                        <Separator className="bg-slate-200" />

                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <p className="text-xs font-black text-slate-900 uppercase tracking-widest">{t.dashboard.patientsManagement.details.addNote}</p>
                                                <textarea 
                                                    className="w-full bg-white border border-slate-100 rounded-[1.5rem] p-4 text-sm focus:ring-2 focus:ring-blue-600/10 focus:outline-none transition-all placeholder:text-slate-300 min-h-[120px]"
                                                    placeholder={t.dashboard.patientsManagement.details.notePlaceholder}
                                                    value={newNote}
                                                    onChange={(e) => setNewNote(e.target.value)}
                                                />
                                            </div>
                                            <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white rounded-2xl h-12 font-bold shadow-lg shadow-blue-600/10 transition-all hover:scale-[1.02] active:scale-[0.98]">
                                                {t.dashboard.patientsManagement.details.addNote}
                                            </Button>
                                        </div>
                                    </TabsContent>
                                </Tabs>
                            </div>
                        </div>
                    )}
                </SheetContent>
            </Sheet>
        </div>
    )
}
