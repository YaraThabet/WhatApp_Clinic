"use client";

import React from 'react';
import { Plus, Filter, MoreVertical, Stethoscope } from 'lucide-react';
import { cn } from '@/lib/utils';
import { translations, Language } from '@/locales/translations';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { useRouter } from 'next/navigation';

interface DoctorsManagementProps {
  darkMode: boolean;
  language: Language;
}

export default function DoctorsManagement({ darkMode, language }: DoctorsManagementProps) {
  const router = useRouter();
  const t = translations[language];
  const isRTL = language === 'ar';

  const mockDoctors = [
    {
      id: "1",
      name: "Dr. Sarah Wilson",
      avatar: "SW",
      specialty: t.dashboard.mock.cardiologist,
      patients: 1240,
      appointments: 145,
      status: "Active"
    },
    {
      id: "2",
      name: "Dr. Michael Chen",
      avatar: "MC",
      specialty: t.dashboard.mock.pediatrician,
      patients: 890,
      appointments: 98,
      status: "Active"
    },
    {
      id: "3",
      name: "Dr. Emily Adams",
      avatar: "EA",
      specialty: t.dashboard.mock.dermatologist,
      patients: 1530,
      appointments: 210,
      status: "On Leave"
    },
    {
      id: "4",
      name: "Dr. James Miller",
      avatar: "JM",
      specialty: t.dashboard.mock.cardiologist,
      patients: 430,
      appointments: 24,
      status: "Inactive"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border-none shadow-none dark:bg-emerald-500/10 dark:text-emerald-400 pointer-events-none">{t.dashboard.doctorsManagement.status.active}</Badge>;
      case "Inactive":
        return <Badge className="bg-slate-100 text-slate-600 hover:bg-slate-200 border-none shadow-none dark:bg-slate-800 dark:text-slate-400 pointer-events-none">{t.dashboard.doctorsManagement.status.inactive}</Badge>;
      case "On Leave":
        return <Badge className="bg-amber-50 text-amber-600 hover:bg-amber-100 border-none shadow-none dark:bg-amber-500/10 dark:text-amber-400 pointer-events-none">{t.dashboard.doctorsManagement.status.onLeave}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div dir={t.dir} className={cn(
      "w-full font-sans transition-colors duration-300",
      darkMode ? "bg-slate-950 text-slate-200" : "bg-slate-50 text-slate-900"
    )}>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className={cn("text-2xl font-bold tracking-tight mb-1", darkMode ? "text-white" : "text-slate-900")}>
            {t.dashboard.doctorsManagement.title}
          </h1>
          <p className={darkMode ? "text-slate-400" : "text-slate-500"}>
            {t.dashboard.doctorsManagement.description}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className={cn(
            "gap-2 font-medium bg-white",
            darkMode ? "bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800" : "border-slate-200 text-slate-700 hover:bg-slate-50"
          )}>
            <Filter className="w-4 h-4" />
            {t.dashboard.doctorsManagement.filter}
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2 font-semibold shadow-sm rounded-lg h-10 px-4">
            <Plus className="w-4 h-4" />
            {t.dashboard.doctorsManagement.addDoctor}
          </Button>
        </div>
      </div>

      {/* Main Table Card */}
      <Card className={cn(
        "border shadow-sm rounded-2xl overflow-hidden",
        darkMode ? "bg-slate-900/50 border-slate-800" : "bg-white border-slate-200"
      )}>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className={darkMode ? "bg-slate-900/80" : "bg-slate-50/80"}>
                <TableRow className={darkMode ? "hover:bg-slate-800/50 border-slate-800" : "hover:bg-slate-50 border-slate-100"}>
                  <TableHead className={cn("font-semibold text-xs py-4 px-6 uppercase tracking-wider", darkMode ? "text-slate-400" : "text-slate-500", isRTL && "text-right")}>
                    {t.dashboard.doctorsManagement.table.doctorName}
                  </TableHead>
                  <TableHead className={cn("font-semibold text-xs py-4 px-6 uppercase tracking-wider", darkMode ? "text-slate-400" : "text-slate-500", isRTL && "text-right")}>
                    {t.dashboard.doctorsManagement.table.specialty}
                  </TableHead>
                  <TableHead className={cn("font-semibold text-xs py-4 px-6 uppercase tracking-wider", darkMode ? "text-slate-400" : "text-slate-500", isRTL && "text-right")}>
                    {t.dashboard.doctorsManagement.table.patients}
                  </TableHead>
                  <TableHead className={cn("font-semibold text-xs py-4 px-6 uppercase tracking-wider", darkMode ? "text-slate-400" : "text-slate-500", isRTL && "text-right")}>
                    {t.dashboard.doctorsManagement.table.appointments}
                  </TableHead>
                  <TableHead className={cn("font-semibold text-xs py-4 px-6 uppercase tracking-wider", darkMode ? "text-slate-400" : "text-slate-500", isRTL && "text-right")}>
                    {t.dashboard.doctorsManagement.table.status}
                  </TableHead>
                  <TableHead className={cn("font-semibold text-xs py-4 px-6 uppercase tracking-wider", darkMode ? "text-slate-400" : "text-slate-500", isRTL ? "text-left" : "text-right")}>
                    {t.dashboard.doctorsManagement.table.actions}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockDoctors.map((doc) => (
                  <TableRow
                    key={doc.id}
                    className={cn(
                      "transition-colors group cursor-pointer",
                      darkMode ? "hover:bg-slate-800/50 border-slate-800" : "hover:bg-slate-50/80 border-slate-100"
                    )}
                    onClick={() => router.push(`/dashboard/doctors/${doc.id}`)}
                  >
                    <TableCell className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10 border-2 border-white dark:border-slate-800 shadow-sm">
                          <AvatarFallback className={cn("text-xs font-bold", darkMode ? "bg-slate-800 text-blue-400" : "bg-blue-50 text-blue-600")}>
                            {doc.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <span className={cn("font-semibold text-sm transition-colors", darkMode ? "text-white group-hover:text-blue-400" : "text-slate-900 group-hover:text-blue-600")}>
                          {doc.name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Stethoscope className="w-4 h-4 text-slate-400" />
                        <span className={cn("text-sm font-medium", darkMode ? "text-slate-300" : "text-slate-600")}>
                          {doc.specialty}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className={cn("px-6 py-4 whitespace-nowrap text-sm font-medium", darkMode ? "text-slate-300" : "text-slate-700")}>
                      {doc.patients.toLocaleString()}
                    </TableCell>
                    <TableCell className={cn("px-6 py-4 whitespace-nowrap text-sm font-medium", darkMode ? "text-slate-300" : "text-slate-700")}>
                      {doc.appointments.toLocaleString()}
                    </TableCell>
                    <TableCell className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(doc.status)}
                    </TableCell>
                    <TableCell className="px-6 py-4 whitespace-nowrap">
                      <div className={cn("flex items-center", isRTL ? "justify-start" : "justify-end")}>
                        <Button variant="ghost" size="icon" className={cn("rounded-lg", darkMode ? "hover:bg-slate-800 text-slate-400 hover:text-white" : "hover:bg-slate-100 text-slate-500 hover:text-slate-900")}>
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
