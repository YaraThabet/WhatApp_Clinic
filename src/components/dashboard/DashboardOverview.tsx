"use client";

import * as React from "react";
import {
  Users,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Stethoscope,
  MoreVertical,
  Mail,
  Phone,
  Star,
  Activity,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useLanguage } from "@/components/language-provider";
import { translations } from "@/locales/translations";

import { supabase } from "@/lib/supabase";

import Link from "next/link";

export default function DashboardOverview() {
  const [doctorsCount, setDoctorsCount] = React.useState(0);
  const [patientsCount, setPatientsCount] = React.useState(0);
  const [todayAppointmentsCount, setTodayAppointmentsCount] = React.useState(0);

  // 🔥 REAL APPOINTMENTS DATA FROM DATABASE
  const [todayAppointments, setTodayAppointments] = React.useState<any[]>([]);
  const [loadingAppointments, setLoadingAppointments] = React.useState(true);

  // 🔥 DOCTORS LIST FROM doctor_stats TABLE
  const [doctorsList, setDoctorsList] = React.useState<any[]>([]);
  const [loadingDoctors, setLoadingDoctors] = React.useState(true);

  const { language } = useLanguage();
  const t = translations[language];

  // ================= جلب الأطباء من جدول doctor_stats =================
  React.useEffect(() => {
    async function fetchDoctorsFromStats() {
      try {
        setLoadingDoctors(true);

        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session?.user) {
          console.log("❌ No session found");
          setLoadingDoctors(false);
          return;
        }

        // جلب clinic_id من جدول admins
        const { data: admin, error: adminError } = await supabase
          .from("admins")
          .select("clinic_id")
          .eq("email", session.user.email)
          .single();

        if (adminError || !admin?.clinic_id) {
          console.log("❌ No clinic_id found for this admin");
          setLoadingDoctors(false);
          return;
        }

        console.log("✅ Clinic ID:", admin.clinic_id);

        // جلب جميع الأطباء من جدول doctor_stats لهذه العيادة
        const { data: doctorsData, error: doctorsError } = await supabase
          .from("doctor_stats")
          .select("*")
          .eq("clinic_id", admin.clinic_id);

        if (doctorsError) {
          console.error("❌ Error fetching doctors:", doctorsError);
          setDoctorsList([]);
          setLoadingDoctors(false);
          return;
        }

        console.log("✅ Doctors data:", doctorsData);
        console.log("✅ Number of doctors:", doctorsData?.length || 0);

        if (!doctorsData || doctorsData.length === 0) {
          console.log("❌ No doctors found for this clinic");
          setDoctorsList([]);
          setDoctorsCount(0);
          setLoadingDoctors(false);
          return;
        }

        // تحويل البيانات إلى التنسيق المطلوب للعرض
        const formattedDoctors = doctorsData.map((doc: any) => ({
          id: doc.doctor_id,
          name: doc.full_name || "Unknown",
          avatar:
            doc.full_name
              ?.split(" ")
              .map((n: string) => n[0])
              .join("") || "DR",
          specialty: doc.specialty || "General",
          phone: doc.phone || "N/A",
          email: doc.email || "N/A",
          status: "Active",
          patients: doc.completed_appointments || 0,
          appointments: doc.total_appointments || 0,
          todayAppointments: doc.today_appointments || 0,
        }));

        setDoctorsList(formattedDoctors);
        setDoctorsCount(formattedDoctors.length);
        setLoadingDoctors(false);
      } catch (err) {
        console.error("Unexpected error:", err);
        setDoctorsList([]);
        setLoadingDoctors(false);
      }
    }

    fetchDoctorsFromStats();
  }, []);

  // ================= جلب عدد المرضى ومواعيد اليوم =================
  React.useEffect(() => {
    const fetchStats = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session?.user) return;

        const { data: admin } = await supabase
          .from("admins")
          .select("clinic_id")
          .eq("email", session.user.email)
          .single();

        if (!admin?.clinic_id) return;

        const clinicId = admin.clinic_id;
        const today = new Date().toISOString().split("T")[0];

        // PATIENTS COUNT
        const { count: patients } = await supabase
          .from("patients")
          .select("*", { count: "exact", head: true })
          .eq("clinic_id", clinicId);

        setPatientsCount(patients || 0);

        // TODAY APPOINTMENTS COUNT
        const { count: appointments } = await supabase
          .from("appointments")
          .select("*", { count: "exact", head: true })
          .eq("clinic_id", clinicId)
          .eq("appointment_date", today);

        setTodayAppointmentsCount(appointments || 0);
      } catch (err) {
        console.error(err);
      }
    };

    fetchStats();
  }, []);

  // ================= جلب مواعيد اليوم =================
  React.useEffect(() => {
    const fetchTodayAppointments = async () => {
      try {
        setLoadingAppointments(true);

        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session?.user) {
          setLoadingAppointments(false);
          return;
        }

        const { data: admin, error: adminError } = await supabase
          .from("admins")
          .select("clinic_id")
          .eq("email", session.user.email)
          .single();

        if (adminError || !admin?.clinic_id) {
          setLoadingAppointments(false);
          return;
        }

        const today = new Date().toISOString().split("T")[0];

        let { data: appointmentsData, error: appointmentsError } =
          await supabase
            .from("appointments")
            .select(
              `
            id,
            appointment_time,
            status,
            patient_id,
            doctor_id
          `,
            )
            .eq("clinic_id", admin.clinic_id)
            .eq("appointment_date", today)
            .order("appointment_time", { ascending: true });

        if (appointmentsError || !appointmentsData) {
          setTodayAppointments([]);
          setLoadingAppointments(false);
          return;
        }

        let patientsMap: Record<string, string> = {};
        let doctorsMap: Record<string, string> = {};

        const patientIds = [
          ...new Set(
            appointmentsData.map((a: any) => a.patient_id).filter(Boolean),
          ),
        ];
        if (patientIds.length > 0) {
          const { data: patientsData } = await supabase
            .from("patients")
            .select("id, name")
            .in("id", patientIds);

          if (patientsData) {
            patientsData.forEach((p: any) => {
              patientsMap[p.id] = p.name;
            });
          }
        }

        const doctorIds = [
          ...new Set(
            appointmentsData.map((a: any) => a.doctor_id).filter(Boolean),
          ),
        ];
        if (doctorIds.length > 0) {
          const { data: doctorsData } = await supabase
            .from("doctor_stats")
            .select("doctor_id, full_name")
            .in("doctor_id", doctorIds);

          if (doctorsData) {
            doctorsData.forEach((d: any) => {
              doctorsMap[d.doctor_id] = d.full_name;
            });
          }
        }

        const mappedAppointments = appointmentsData.map((a: any) => ({
          id: a.id,
          time: a.appointment_time || "N/A",
          patient: patientsMap[a.patient_id] || "Unknown",
          doctor: doctorsMap[a.doctor_id] || "Unknown",
          status: a.status || "pending",
        }));

        setTodayAppointments(mappedAppointments);
      } catch (err) {
        console.error("Error fetching appointments:", err);
        setTodayAppointments([]);
      } finally {
        setLoadingAppointments(false);
      }
    };

    fetchTodayAppointments();
  }, []);

  // ================= STATS =================
  const stats = [
    {
      title: t.dashboard.statsLabels.totalDoctors,
      value: doctorsCount,
      icon: Stethoscope,
      trend: t.dashboard.mock.thisMonth,
    },
    {
      title: t.dashboard.statsLabels.totalPatients,
      value: patientsCount,
      icon: Users,
      trend: t.dashboard.mock.fromLastMonth,
    },
    {
      title: t.dashboard.statsLabels.todayAppointments,
      value: todayAppointmentsCount,
      icon: Calendar,
      trend: t.dashboard.mock.pending,
    },
  ];

  const calendarDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const calendarHours = ["09:00", "10:00", "11:00"];

  // ================= دوال مساعدة =================
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return (
          <Badge className="bg-emerald-50 text-emerald-600 border-none px-3 py-1">
            {language === "ar" ? "نشط" : "Active"}
          </Badge>
        );
      case "Inactive":
        return (
          <Badge className="bg-slate-100 text-slate-600 border-none px-3 py-1">
            {language === "ar" ? "غير نشط" : "Inactive"}
          </Badge>
        );
      case "On Leave":
        return (
          <Badge className="bg-amber-50 text-amber-600 border-none px-3 py-1">
            {language === "ar" ? "في إجازة" : "On Leave"}
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="p-8 space-y-8">
      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-none shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <stat.icon className="w-5 h-5 text-blue-600" />
              </div>
              <p className="text-sm text-slate-500">{stat.title}</p>
              <h3 className="text-2xl font-bold">{stat.value}</h3>
              <p className="text-xs text-slate-400">{stat.trend}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ================= TODAY'S APPOINTMENTS + CLINIC CALENDAR ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Today's Appointments Table */}
        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="rtl:text-right">
              <CardTitle>{t.dashboard.todayAppointments}</CardTitle>
              <CardDescription>
                {t.dashboard.todayAppointmentsDesc}
              </CardDescription>
            </div>
            <Link href="/dashboard/appointments">
              <Button variant="outline" size="sm">
                {t.dashboard.appointments.viewAll}
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {loadingAppointments ? (
              <p className="text-gray-500 text-center py-6">جاري التحميل...</p>
            ) : todayAppointments.length === 0 ? (
              <p className="text-gray-400 text-center py-6">
                لا توجد مواعيد لهذا اليوم
              </p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="rtl:text-right">
                      {t.dashboard.table.time}
                    </TableHead>
                    <TableHead className="rtl:text-right">
                      {t.dashboard.table.patient}
                    </TableHead>
                    <TableHead className="rtl:text-right">
                      {t.dashboard.table.doctor}
                    </TableHead>
                    <TableHead className="rtl:text-right">
                      {t.dashboard.table.status}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {todayAppointments.map((apt, i) => (
                    <TableRow key={apt.id || i}>
                      <TableCell className="font-medium rtl:text-right">
                        {apt.time}
                      </TableCell>
                      <TableCell className="rtl:text-right">
                        <div className="flex items-center gap-2 rtl:flex-row-reverse">
                          <Avatar className="w-7 h-7">
                            <AvatarFallback className="bg-slate-100 text-slate-600 text-[10px] uppercase">
                              {apt.patient
                                .split(" ")
                                .map((n: string) => n[0])
                                .join("")
                                .slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium text-slate-900">
                            {apt.patient}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="rtl:text-right">
                        {apt.doctor}
                      </TableCell>
                      <TableCell className="rtl:text-right">
                        <Badge
                          className={cn(
                            "border-none shadow-none pointer-events-none",
                            apt.status === "confirmed"
                              ? "bg-emerald-50 text-emerald-600"
                              : apt.status === "pending"
                                ? "bg-amber-50 text-amber-600"
                                : "bg-red-50 text-red-600",
                          )}
                        >
                          {apt.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Clinic Calendar */}
        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="rtl:text-right">
              <CardTitle>{t.dashboard.clinicCalendar}</CardTitle>
              <CardDescription>
                {t.dashboard.clinicCalendarDesc}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2 rtl:flex-row-reverse">
              <Button variant="outline" size="icon">
                <ChevronLeft
                  className={cn("w-4 h-4", language === "ar" && "rotate-180")}
                />
              </Button>
              <span className="text-sm font-medium">
                {language === "ar" ? "10 مارس - 16 مارس" : "Mar 10 - Mar 16"}
              </span>
              <Button variant="outline" size="icon">
                <ChevronRight
                  className={cn("w-4 h-4", language === "ar" && "rotate-180")}
                />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-8 gap-px bg-slate-200 rounded-lg overflow-hidden border border-slate-200">
              <div className="bg-slate-50 p-2 text-center text-[10px] font-bold text-slate-400 uppercase">
                {t.dashboard.table.time}
              </div>
              {calendarDays.map((day) => (
                <div
                  key={day}
                  className="bg-slate-50 p-2 text-center text-[10px] font-bold text-slate-400 uppercase"
                >
                  {day}
                </div>
              ))}

              {calendarHours.map((hour) => (
                <React.Fragment key={hour}>
                  <div className="bg-white p-2 text-center text-[10px] font-medium text-slate-500 border-t border-slate-100">
                    {hour}
                  </div>
                  {calendarDays.map((day) => (
                    <div
                      key={`${day}-${hour}`}
                      className="bg-white p-1 border-t border-l border-slate-100 min-h-[40px] relative"
                    />
                  ))}
                </React.Fragment>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ================= DOCTORS LIST FROM doctor_stats TABLE ================= */}
      <Card className="border-none shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="rtl:text-right">
            <CardTitle>
              {language === "ar" ? "قائمة الأطباء" : "Doctors List"}
            </CardTitle>
            <CardDescription>
              {language === "ar"
                ? "الأطباء العاملون في العيادة"
                : "Doctors working in the clinic"}
            </CardDescription>
          </div>
          <Link href="/dashboard/doctors">
            <Button variant="outline" size="sm">
              {language === "ar" ? "عرض جميع الأطباء" : "View All Doctors"}
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          {loadingDoctors ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="mr-2 text-slate-500">
                {language === "ar"
                  ? "جاري تحميل الأطباء..."
                  : "Loading doctors..."}
              </span>
            </div>
          ) : doctorsList.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Stethoscope className="w-8 h-8 text-slate-400" />
              </div>
              <p className="text-gray-400">
                {language === "ar"
                  ? "لا يوجد أطباء مسجلين في العيادة"
                  : "No doctors registered in the clinic"}
              </p>
              <Button variant="outline" className="mt-4">
                {language === "ar" ? "+ إضافة طبيب" : "+ Add Doctor"}
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {doctorsList.map((doctor) => (
                <Link href={`/dashboard/doctors/${doctor.id}`} key={doctor.id}>
                  <Card className="border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer hover:border-blue-200 hover:bg-blue-50/5">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <Avatar className="w-12 h-12 border-2 border-white shadow-sm">
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-sm font-bold">
                            {doctor.avatar || doctor.name?.charAt(0) || "DR"}
                          </AvatarFallback>
                        </Avatar>
                        {getStatusBadge(doctor.status)}
                      </div>
                      <h3 className="font-bold text-slate-900 dark:text-white mb-1 text-base">
                        {doctor.name}
                      </h3>
                      <div className="flex items-center gap-1 text-slate-500 mb-3">
                        <Stethoscope className="w-3 h-3" />
                        <span className="text-xs">{doctor.specialty}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 mb-3 pt-2 border-t border-slate-100">
                        <div className="text-center">
                          <p className="text-[10px] text-slate-400">
                            {language === "ar" ? "المرضى" : "Patients"}
                          </p>
                          <p className="text-sm font-bold text-slate-700">
                            {doctor.patients}
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-[10px] text-slate-400">
                            {language === "ar" ? "المواعيد اليوم" : "Today"}
                          </p>
                          <p className="text-sm font-bold text-slate-700">
                            {doctor.todayAppointments}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-2 pt-1">
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <Mail className="w-3 h-3 flex-shrink-0" />
                          <span className="truncate">{doctor.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <Phone className="w-3 h-3 flex-shrink-0" />
                          <span className="truncate">{doctor.phone}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* ================= RECENT PATIENTS ================= */}
      <Card className="border-none shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="rtl:text-right">
            <CardTitle>{t.dashboard.recentPatients}</CardTitle>
            <CardDescription>{t.dashboard.recentPatientsDesc}</CardDescription>
          </div>
          <Link href="/dashboard/patients">
            <Button variant="outline" size="sm">
              {t.dashboard.viewAllPatients}
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="rtl:text-right">
                  {t.dashboard.table.patientName}
                </TableHead>
                <TableHead className="rtl:text-right">
                  {t.dashboard.table.phoneNumber}
                </TableHead>
                <TableHead className="rtl:text-right">
                  {t.dashboard.table.lastVisit}
                </TableHead>
                <TableHead
                  className={cn(language === "ar" ? "text-left" : "text-right")}
                >
                  {t.dashboard.table.actions}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium rtl:text-right">
                  Sarah Johnson
                </TableCell>
                <TableCell className="rtl:text-right">
                  +1 234-567-8901
                </TableCell>
                <TableCell className="rtl:text-right">2024-03-10</TableCell>
                <TableCell
                  className={cn(language === "ar" ? "text-left" : "text-right")}
                >
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
