"use client";

import * as React from "react";
import { supabase } from "@/lib/supabase";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  CalendarRange,
  Calendar as CalendarIcon,
  Clock,
  Plus,
  CheckCircle,
  XCircle,
  Clock as ClockIcon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { useLanguage } from "@/components/language-provider";

// ================= TYPES =================
type Appointment = {
  id: string;
  clinic_id: string | null;
  doctor_id: string | null;
  patient_id: string | null;
  procedure: string | null;
  appointment_date: string;
  appointment_time: string;
  status: string | null;
  created_at: string | null;
};

type ViewMode = "day" | "week" | "month";

export default function AppointmentsPage() {
  const [appointments, setAppointments] = React.useState<Appointment[]>([]);
  const [patientsMap, setPatientsMap] = React.useState<
    Record<
      string,
      { id: string; name: string; age: number; medical_condition: string }
    >
  >({});
  const [doctorsMap, setDoctorsMap] = React.useState<
    Record<string, { id: string; name: string; specialty: string }>
  >({});
  const [loading, setLoading] = React.useState(true);
  const [view, setView] = React.useState<ViewMode>("day");
  const [currentDate, setCurrentDate] = React.useState(new Date());

  const { language } = useLanguage();
  const isRTL = language === "ar";

  // ================= جلب المواعيد من جدول appointments =================
  React.useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);

      try {
        // 1. جلب المواعيد
        const { data: appointmentsData, error: appointmentsError } =
          await supabase
            .from("appointments")
            .select("*")
            .order("appointment_date", { ascending: true })
            .order("appointment_time", { ascending: true });

        if (appointmentsError) {
          console.error("Error fetching appointments:", appointmentsError);
          setLoading(false);
          return;
        }

        setAppointments(appointmentsData || []);

        // 2. جلب بيانات المرضى (إذا وجد patient_id)
        const patientIds = [
          ...new Set(
            appointmentsData?.map((a) => a.patient_id).filter(Boolean) || [],
          ),
        ];
        if (patientIds.length > 0) {
          const { data: patientsData } = await supabase
            .from("patients")
            .select("id, name, age, medical_condition")
            .in("id", patientIds);

          if (patientsData) {
            const patientsMapData: Record<string, any> = {};
            patientsData.forEach((p) => {
              patientsMapData[p.id] = p;
            });
            setPatientsMap(patientsMapData);
          }
        }

        // 3. جلب بيانات الأطباء (إذا وجد doctor_id)
        const doctorIds = [
          ...new Set(
            appointmentsData?.map((a) => a.doctor_id).filter(Boolean) || [],
          ),
        ];
        if (doctorIds.length > 0) {
          const { data: doctorsData } = await supabase
            .from("doctors")
            .select("id, name, specialty")
            .in("id", doctorIds);

          if (doctorsData) {
            const doctorsMapData: Record<string, any> = {};
            doctorsData.forEach((d) => {
              doctorsMapData[d.id] = d;
            });
            setDoctorsMap(doctorsMapData);
          }
        }
      } catch (err) {
        console.error("Unexpected error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  // ================= STATUS COLORS & TEXTS =================
  const getStatusStyle = (status: string | null) => {
    switch (status) {
      case "confirmed":
        return {
          bg: "bg-blue-50 dark:bg-blue-950/30",
          text: "text-blue-700 dark:text-blue-400",
          border: "border-blue-200 dark:border-blue-800",
          icon: <CheckCircle className="w-3 h-3" />,
          label: language === "ar" ? "مؤكد" : "Confirmed",
        };
      case "completed":
      case "done":
        return {
          bg: "bg-green-50 dark:bg-green-950/30",
          text: "text-green-700 dark:text-green-400",
          border: "border-green-200 dark:border-green-800",
          icon: <CheckCircle className="w-3 h-3" />,
          label: language === "ar" ? "مكتمل" : "Completed",
        };
      case "cancelled":
        return {
          bg: "bg-red-50 dark:bg-red-950/30",
          text: "text-red-700 dark:text-red-400",
          border: "border-red-200 dark:border-red-800",
          icon: <XCircle className="w-3 h-3" />,
          label: language === "ar" ? "ملغي" : "Cancelled",
        };
      default:
        return {
          bg: "bg-amber-50 dark:bg-amber-950/30",
          text: "text-amber-700 dark:text-amber-400",
          border: "border-amber-200 dark:border-amber-800",
          icon: <ClockIcon className="w-3 h-3" />,
          label: language === "ar" ? "قيد الانتظار" : "Pending",
        };
    }
  };

  // ================= HELPER FUNCTIONS =================
  const getWeekDays = (date: Date) => {
    const start = new Date(date);
    const day = start.getDay();
    const diff = start.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(start.setDate(diff));
    const days = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      days.push(d);
    }
    return days;
  };

  const getMonthDays = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];
    for (let i = firstDay.getDate(); i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const formatTime = (time: string) => {
    if (!time) return "";
    return time.substring(0, 5);
  };

  const navigatePrevious = () => {
    const newDate = new Date(currentDate);
    if (view === "day") newDate.setDate(currentDate.getDate() - 1);
    if (view === "week") newDate.setDate(currentDate.getDate() - 7);
    if (view === "month") newDate.setMonth(currentDate.getMonth() - 1);
    setCurrentDate(newDate);
  };

  const navigateNext = () => {
    const newDate = new Date(currentDate);
    if (view === "day") newDate.setDate(currentDate.getDate() + 1);
    if (view === "week") newDate.setDate(currentDate.getDate() + 7);
    if (view === "month") newDate.setMonth(currentDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // ================= FILTER APPOINTMENTS =================
  const getFilteredAppointments = () => {
    const today = new Date(currentDate);

    return appointments.filter((apt) => {
      const aptDate = new Date(apt.appointment_date);

      if (view === "day") {
        return aptDate.toDateString() === today.toDateString();
      }

      if (view === "week") {
        const weekDays = getWeekDays(today);
        const weekDates = weekDays.map((d) => d.toDateString());
        return weekDates.includes(aptDate.toDateString());
      }

      if (view === "month") {
        return (
          aptDate.getMonth() === today.getMonth() &&
          aptDate.getFullYear() === today.getFullYear()
        );
      }

      return true;
    });
  };

  const filteredAppointments = getFilteredAppointments();

  // ================= GROUP APPOINTMENTS =================
  const getAppointmentsForDate = (date: Date) => {
    return filteredAppointments.filter(
      (apt) =>
        new Date(apt.appointment_date).toDateString() === date.toDateString(),
    );
  };

  const getAppointmentsForHour = (
    appointmentsList: Appointment[],
    hour: number,
  ) => {
    return appointmentsList.filter((apt) => {
      const aptHour = parseInt(apt.appointment_time.substring(0, 2));
      return aptHour === hour;
    });
  };

  const workingHours = Array.from({ length: 12 }, (_, i) => i + 8);

  // ================= FORMAT HEADER TITLE =================
  const getHeaderTitle = () => {
    if (view === "day") {
      return currentDate.toLocaleDateString(language === "ar" ? "ar" : "en", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }

    if (view === "week") {
      const weekDays = getWeekDays(currentDate);
      const start = weekDays[0];
      const end = weekDays[6];
      const monthNames =
        language === "ar"
          ? [
              "يناير",
              "فبراير",
              "مارس",
              "أبريل",
              "مايو",
              "يونيو",
              "يوليو",
              "أغسطس",
              "سبتمبر",
              "أكتوبر",
              "نوفمبر",
              "ديسمبر",
            ]
          : [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ];
      return `${start.getDate()} ${monthNames[start.getMonth()]} - ${end.getDate()} ${monthNames[end.getMonth()]} ${end.getFullYear()}`;
    }

    if (view === "month") {
      return currentDate.toLocaleDateString(language === "ar" ? "ar" : "en", {
        month: "long",
        year: "numeric",
      });
    }

    return "";
  };

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="text-gray-500">
            {language === "ar"
              ? "جاري تحميل المواعيد..."
              : "Loading appointments..."}
          </p>
        </div>
      </div>
    );
  }

  // ================= RENDER DAY VIEW =================
  const renderDayView = () => {
    const dayAppointments = getAppointmentsForDate(currentDate);

    return (
      <div>
        {workingHours.map((hour) => {
          const hourAppointments = getAppointmentsForHour(
            dayAppointments,
            hour,
          );
          return (
            <div key={hour} className="flex border-b min-h-[80px]">
              <div className="w-24 bg-gray-50 p-3 text-sm text-gray-500 flex items-center justify-center border-r">
                {hour}:00
              </div>
              <div className="flex-1 p-2">
                {hourAppointments.length === 0 ? (
                  <div className="text-xs text-gray-300 h-full flex items-center justify-center">
                    {language === "ar" ? "لا توجد مواعيد" : "No appointments"}
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    {hourAppointments.map((apt) => {
                      const status = getStatusStyle(apt.status);
                      const patient = patientsMap[apt.patient_id || ""];
                      const doctor = doctorsMap[apt.doctor_id || ""];
                      return (
                        <div
                          key={apt.id}
                          className={cn(
                            "p-3 rounded-lg border flex items-center justify-between hover:shadow-md transition-all cursor-pointer",
                            status.bg,
                            status.border,
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4 text-gray-500" />
                              <span className="font-mono font-medium">
                                {formatTime(apt.appointment_time)}
                              </span>
                            </div>
                            <div className="w-px h-6 bg-gray-300" />
                            <Avatar className="w-8 h-8">
                              <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">
                                {patient?.name?.charAt(0) || "P"}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-semibold">
                                {patient?.name || "Unknown Patient"}
                              </div>
                              <div className="text-xs text-gray-500">
                                {doctor?.name || "No doctor assigned"}{" "}
                                {doctor?.specialty
                                  ? `(${doctor.specialty})`
                                  : ""}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {apt.procedure && (
                              <Badge variant="outline" className="text-xs">
                                {apt.procedure}
                              </Badge>
                            )}
                            <Badge className={cn(status.bg, status.text)}>
                              <span className="flex items-center gap-1">
                                {status.icon}
                                {status.label}
                              </span>
                            </Badge>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // ================= RENDER WEEK VIEW =================
  const renderWeekView = () => {
    const weekDays = getWeekDays(currentDate);
    const daysNames =
      language === "ar"
        ? [
            "الإثنين",
            "الثلاثاء",
            "الأربعاء",
            "الخميس",
            "الجمعة",
            "السبت",
            "الأحد",
          ]
        : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    return (
      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          {/* Week Header */}
          <div className="grid grid-cols-8 border-b bg-gray-50 rounded-t-xl">
            <div className="p-3 border-r text-center font-semibold text-gray-600">
              {language === "ar" ? "الساعة" : "Time"}
            </div>
            {weekDays.map((day, idx) => (
              <div
                key={idx}
                className="p-3 text-center border-r last:border-r-0"
              >
                <div className="font-semibold">{daysNames[idx]}</div>
                <div className="text-sm text-gray-500">{day.getDate()}</div>
              </div>
            ))}
          </div>

          {/* Week Body */}
          {workingHours.map((hour) => (
            <div key={hour} className="grid grid-cols-8 border-b min-h-[80px]">
              <div className="p-2 border-r text-sm text-gray-500 bg-gray-50 flex items-center justify-center">
                {hour}:00
              </div>
              {weekDays.map((day, dayIdx) => {
                const dayAppointments = getAppointmentsForDate(day);
                const hourAppointments = getAppointmentsForHour(
                  dayAppointments,
                  hour,
                );
                return (
                  <div key={dayIdx} className="p-1 border-r last:border-r-0">
                    {hourAppointments.map((apt) => {
                      const status = getStatusStyle(apt.status);
                      const patient = patientsMap[apt.patient_id || ""];
                      return (
                        <div
                          key={apt.id}
                          className={cn(
                            "p-2 rounded-lg border text-xs mb-1 cursor-pointer hover:shadow-md transition-all",
                            status.bg,
                            status.border,
                          )}
                        >
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span className="font-medium">
                              {formatTime(apt.appointment_time)}
                            </span>
                          </div>
                          <div className="font-semibold mt-1 truncate">
                            {patient?.name || "Unknown"}
                          </div>
                          <div className="text-[10px] text-gray-500 truncate">
                            {apt.procedure || "No procedure"}
                          </div>
                          <Badge
                            className={cn(
                              "mt-1 text-[9px] px-1 py-0",
                              status.bg,
                              status.text,
                            )}
                          >
                            {status.label}
                          </Badge>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ================= RENDER MONTH VIEW =================
  const renderMonthView = () => {
    const monthDays = getMonthDays(currentDate);
    const daysNames =
      language === "ar"
        ? ["إثنين", "ثلاثاء", "أربعاء", "خميس", "جمعة", "سبت", "أحد"]
        : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    const getFirstDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1,
    );
    const startDayIndex =
      getFirstDayOfMonth.getDay() === 0 ? 6 : getFirstDayOfMonth.getDay() - 1;
    const emptyCells = startDayIndex;

    const allDays = [...Array(emptyCells).fill(null), ...monthDays];

    return (
      <div className="overflow-x-auto">
        <div className="min-w-[700px]">
          <div className="grid grid-cols-7 gap-px bg-gray-200 rounded-t-xl">
            {daysNames.map((day) => (
              <div
                key={day}
                className="bg-gray-50 p-3 text-center font-semibold text-gray-600"
              >
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-px bg-gray-200">
            {allDays.map((day, idx) => {
              const dayAppointments = day ? getAppointmentsForDate(day) : [];
              const isToday =
                day && new Date().toDateString() === day.toDateString();

              return (
                <div
                  key={idx}
                  className={cn(
                    "min-h-[100px] bg-white p-2",
                    isToday && "bg-blue-50",
                  )}
                >
                  {day && (
                    <>
                      <div
                        className={cn(
                          "text-sm font-medium mb-2",
                          isToday && "text-blue-600",
                        )}
                      >
                        {day.getDate()}
                      </div>
                      <div className="space-y-1">
                        {dayAppointments.slice(0, 3).map((apt) => {
                          const patient = patientsMap[apt.patient_id || ""];
                          return (
                            <div
                              key={apt.id}
                              className={cn(
                                "text-[10px] p-1 rounded truncate cursor-pointer",
                                getStatusStyle(apt.status).bg,
                              )}
                              title={`${apt.appointment_time} - ${patient?.name || "Unknown"}`}
                            >
                              {formatTime(apt.appointment_time)} {patient?.name}
                            </div>
                          );
                        })}
                        {dayAppointments.length > 3 && (
                          <div className="text-[9px] text-gray-400">
                            +{dayAppointments.length - 3} more
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  // ================= MAIN UI =================
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">
            {language === "ar" ? "المواعيد" : "Appointments"}
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {language === "ar"
              ? "إدارة وجدولة مواعيد العيادة"
              : "Manage and schedule clinic appointments"}
          </p>
        </div>
      </div>

      {/* Filters Card */}
      <Card className="border-none shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <Tabs value={view} onValueChange={(v) => setView(v as ViewMode)}>
              <TabsList>
                <TabsTrigger value="day" className="gap-2">
                  <CalendarDays className="w-4 h-4" />
                  {language === "ar" ? "يوم" : "Day"}
                </TabsTrigger>
                <TabsTrigger value="week" className="gap-2">
                  <CalendarRange className="w-4 h-4" />
                  {language === "ar" ? "أسبوع" : "Week"}
                </TabsTrigger>
                <TabsTrigger value="month" className="gap-2">
                  <CalendarIcon className="w-4 h-4" />
                  {language === "ar" ? "شهر" : "Month"}
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={goToToday}>
                {language === "ar" ? "اليوم" : "Today"}
              </Button>
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={navigatePrevious}
                >
                  <ChevronLeft
                    className={cn("w-4 h-4", isRTL && "rotate-180")}
                  />
                </Button>
                <Button variant="outline" size="icon" onClick={navigateNext}>
                  <ChevronRight
                    className={cn("w-4 h-4", isRTL && "rotate-180")}
                  />
                </Button>
              </div>
              <span className="text-sm font-medium min-w-[180px] text-center">
                {getHeaderTitle()}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Calendar View */}
      <Card className="border-none shadow-sm">
        <CardContent className="p-0 overflow-hidden">
          {view === "day" && renderDayView()}
          {view === "week" && renderWeekView()}
          {view === "month" && renderMonthView()}
        </CardContent>
      </Card>

    </div>
  );
}
