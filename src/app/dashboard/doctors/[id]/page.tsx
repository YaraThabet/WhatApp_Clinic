"use client";

import React from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  ArrowLeft,
  Mail,
  Phone,
  Calendar,
  User,
  Users,
  Clock,
  Award,
  Search,
  MessageSquare,
  Stethoscope,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { translations, Language } from '@/locales/translations';
import { useLanguage } from '@/components/language-provider';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// Same mock data but extended
const mockDoctors = [
  {
    id: "1",
    name: "Dr. Sarah Wilson",
    avatar: "SW",
    specialty: "Cardiologist",
    patients: 1240,
    appointments: 145,
    status: "Active",
    phone: "+1 234-567-8901",
    email: "sarah.wilson@curaclinic.com",
    experience: "12 years",
    workingHours: "09:00 AM - 05:00 PM",
    bio: "Specialist in cardiovascular diseases with over a decade of experience in clinical practice and research."
  },
  {
    id: "2",
    name: "Dr. Michael Chen",
    avatar: "MC",
    specialty: "Pediatrician",
    patients: 890,
    appointments: 98,
    status: "Active",
    phone: "+1 234-567-8902",
    email: "michael.chen@curaclinic.com",
    experience: "8 years",
    workingHours: "10:00 AM - 06:00 PM",
    bio: "Dedicated pediatrician focused on providing comprehensive care for children from infancy through adolescence."
  },
  {
    id: "3",
    name: "Dr. Emily Adams",
    avatar: "EA",
    specialty: "Dermatologist",
    patients: 1530,
    appointments: 210,
    status: "On Leave",
    phone: "+1 234-567-8903",
    email: "emily.adams@curaclinic.com",
    experience: "15 years",
    workingHours: "08:00 AM - 04:00 PM",
    bio: "Expert in clinical and aesthetic dermatology, specializing in advanced skin treatments and surgeries."
  },
  {
    id: "4",
    name: "Dr. James Miller",
    avatar: "JM",
    specialty: "Cardiologist",
    patients: 430,
    appointments: 24,
    status: "Inactive",
    phone: "+1 234-567-8904",
    email: "james.miller@curaclinic.com",
    experience: "5 years",
    workingHours: "09:30 AM - 05:30 PM",
    bio: "Board-certified cardiologist with a focus on preventative medicine and lifestyle-based heart health."
  }
];

export default function DoctorDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const { language } = useLanguage();
  const t = translations[language];
  const isRTL = language === 'ar';

  const doctor = mockDoctors.find(d => d.id === params.id);

  if (!doctor) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-slate-50 dark:bg-slate-950">
        <h2 className="text-2xl font-bold mb-4">{language === 'ar' ? 'الطبيب غير موجود' : 'Doctor not found'}</h2>
        <Button onClick={() => router.push('/dashboard/clinic')}>
          {language === 'ar' ? 'العودة إلى القائمة' : 'Back to List'}
        </Button>
      </div>
    );
  }

  const handleWhatsApp = () => {
    const cleanPhone = doctor.phone.replace(/\D/g, '');
    window.open(`https://wa.me/${cleanPhone}?text=Hello doctor`, '_blank');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 border-none px-3 py-1">{t.dashboard.doctorsManagement.status.active}</Badge>;
      case "Inactive":
        return <Badge className="bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border-none px-3 py-1">{t.dashboard.doctorsManagement.status.inactive}</Badge>;
      case "On Leave":
        return <Badge className="bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400 border-none px-3 py-1">{t.dashboard.doctorsManagement.status.onLeave}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div dir={t.dir} className="w-full p-6 lg:p-8 font-sans">
      
      {/* Back Button */}
      <div className="mb-6">
        <Button 
          variant="ghost" 
          size="sm"
          className="gap-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
          onClick={() => router.back()}
        >
          <ArrowLeft className={cn("w-4 h-4", isRTL && "rotate-180")} />
          {language === 'ar' ? 'رجوع' : 'Back to Doctors'}
        </Button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

        {/* Left Profile Column */}
        <div className="xl:col-span-1 space-y-8">
          <Card className="border-none shadow-sm dark:bg-slate-900 overflow-hidden">
            <div className="h-24 bg-gradient-to-r from-blue-600 to-indigo-600" />
            <CardContent className="px-6 pb-8 -mt-12 text-center">
              <div className="mb-4 flex justify-center">
                <Avatar className="w-24 h-24 border-4 border-white dark:border-slate-900 shadow-md">
                  <AvatarFallback className="bg-blue-50 text-blue-600 text-3xl font-bold dark:bg-slate-800 dark:text-blue-400">
                    {doctor.avatar}
                  </AvatarFallback>
                </Avatar>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{doctor.name}</h2>
              <div className="flex items-center justify-center gap-2 text-slate-500 dark:text-slate-400 mb-4">
                <Stethoscope className="w-4 h-4" />
                <span className="text-sm font-medium">{doctor.specialty}</span>
              </div>
              <div className="mb-6 flex justify-center">
                {getStatusBadge(doctor.status)}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                  <p className="text-xs text-slate-500 mb-1">{language === 'ar' ? 'المرضى' : 'Patients'}</p>
                  <p className="text-lg font-bold">{doctor.patients.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                  <p className="text-xs text-slate-500 mb-1">{language === 'ar' ? 'المواعيد' : 'Appointments'}</p>
                  <p className="text-lg font-bold">{doctor.appointments.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm dark:bg-slate-900">
            <CardHeader>
              <CardTitle className="text-lg">{language === 'ar' ? 'معلومات الاتصال' : 'Contact Information'}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">{language === 'ar' ? 'البريد الإلكتروني' : 'Email'}</p>
                  <p className="text-sm font-medium">{doctor.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center">
                  <Phone className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">{language === 'ar' ? 'الهاتف' : 'Phone'}</p>
                  <p className="text-sm font-medium">{doctor.phone}</p>
                </div>
              </div>
              <div className="pt-4">
                <Button
                  onClick={handleWhatsApp}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white gap-2 font-semibold shadow-sm rounded-xl h-12"
                >
                  <MessageSquare className="w-4 h-4" />
                  {language === 'ar' ? 'اتصال عبر واتساب' : 'Contact via WhatsApp'}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm dark:bg-slate-900">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-500">
                    <Award className="w-4 h-4" />
                    <span className="text-sm">{language === 'ar' ? 'الخبرة' : 'Experience'}</span>
                  </div>
                  <span className="font-bold text-sm">{doctor.experience}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-500">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{language === 'ar' ? 'ساعات العمل' : 'Working Hours'}</span>
                  </div>
                  <span className="font-bold text-sm">{doctor.workingHours}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Content Column */}
        <div className="xl:col-span-2 space-y-8">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="bg-white dark:bg-slate-900 p-1 rounded-2xl shadow-sm inline-flex mb-8 overflow-x-auto h-auto min-w-full sm:min-w-0">
              <TabsTrigger value="overview" className="rounded-xl px-6 py-2.5 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 dark:data-[state=active]:bg-blue-900/30 dark:data-[state=active]:text-blue-400">
                {language === 'ar' ? 'نظرة عامة' : 'Overview'}
              </TabsTrigger>
              <TabsTrigger value="appointments" className="rounded-xl px-6 py-2.5 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 dark:data-[state=active]:bg-blue-900/30 dark:data-[state=active]:text-blue-400">
                {language === 'ar' ? 'المواعيد' : 'Appointments'}
              </TabsTrigger>
              <TabsTrigger value="patients" className="rounded-xl px-6 py-2.5 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 dark:data-[state=active]:bg-blue-900/30 dark:data-[state=active]:text-blue-400">
                {language === 'ar' ? 'المرضى' : 'Patients'}
              </TabsTrigger>
              <TabsTrigger value="schedule" className="rounded-xl px-6 py-2.5 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 dark:data-[state=active]:bg-blue-900/30 dark:data-[state=active]:text-blue-400">
                {language === 'ar' ? 'الجدول' : 'Schedule'}
              </TabsTrigger>
              <TabsTrigger value="settings" className="rounded-xl px-6 py-2.5 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 dark:data-[state=active]:bg-blue-900/30 dark:data-[state=active]:text-blue-400">
                {language === 'ar' ? 'الإعدادات' : 'Settings'}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <Card className="border-none shadow-sm dark:bg-slate-900">
                <CardHeader>
                  <CardTitle>{language === 'ar' ? 'عن الطبيب' : 'Professional Biography'}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {doctor.bio}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                    <div className="p-6 bg-slate-50 dark:bg-slate-800/30 rounded-2xl border border-slate-100 dark:border-slate-800">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                          <User className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                        </div>
                        <h4 className="font-bold">{language === 'ar' ? 'التخصص الطبي' : 'Medical Discipline'}</h4>
                      </div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {doctor.specialty} Specialist with focus on modern diagnostic techniques and personalized treatment plans.
                      </p>
                    </div>
                    <div className="p-6 bg-slate-50 dark:bg-slate-800/30 rounded-2xl border border-slate-100 dark:border-slate-800">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                          <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                        </div>
                        <h4 className="font-bold">{language === 'ar' ? 'التوافر' : 'Availability'}</h4>
                      </div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Available for consultations during {doctor.workingHours}. Accepts emergency appointments outside these hours.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="appointments">
              <Card className="border-none shadow-sm dark:bg-slate-900">
                <CardHeader>
                  <CardTitle>{language === 'ar' ? 'المواعيد القادمة' : 'Upcoming Appointments'}</CardTitle>
                  <CardDescription>{language === 'ar' ? 'قائمة بجميع المواعيد المجدولة لهذا الطبيب' : 'List of all scheduled appointments for this doctor'}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-4">
                    <Calendar className="w-8 h-8 text-blue-600" />
                  </div>
                  <p className="text-slate-500 dark:text-slate-400">{language === 'ar' ? 'لا توجد مواعيد نشطة حاليا' : 'No active appointments at the moment'}</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="patients">
              <Card className="border-none shadow-sm dark:bg-slate-900">
                <CardHeader>
                  <CardTitle>{language === 'ar' ? 'المرضى المعالجون' : 'Patient List'}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 bg-indigo-50 dark:bg-indigo-900/20 rounded-full flex items-center justify-center mb-4">
                    <Users className="w-8 h-8 text-indigo-600" />
                  </div>
                  <p className="text-slate-500 dark:text-slate-400">{language === 'ar' ? 'قم بتحميل ملفات المرضى' : 'Load patients records'}</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="schedule">
              <Card className="border-none shadow-sm dark:bg-slate-900">
                <CardHeader>
                  <CardTitle>{language === 'ar' ? 'الجدول الأسبوعي' : 'Weekly Schedule'}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 bg-orange-50 dark:bg-orange-900/20 rounded-full flex items-center justify-center mb-4">
                    <Clock className="w-8 h-8 text-orange-600" />
                  </div>
                  <p className="text-slate-500 dark:text-slate-400">{language === 'ar' ? 'تحميل الجدول الزمني للعيادة' : 'Load clinic timeline'}</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card className="border-none shadow-sm dark:bg-slate-900">
                <CardHeader>
                  <CardTitle>{language === 'ar' ? 'إعدادات الطبيب' : 'Doctor Settings'}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-slate-500 dark:text-slate-400">{language === 'ar' ? 'إدارة تفضيلات الطبيب وصلاحيات الوصول' : 'Manage doctor preferences and access controls'}</p>
                  <div className="flex flex-col gap-3">
                    <Button variant="outline" className="justify-start gap-3 h-12 rounded-xl">
                      <Search className="w-4 h-4" />
                      {language === 'ar' ? 'تعديل الملف الشخصي' : 'Edit Profile'}
                    </Button>
                    <Button variant="outline" className="justify-start gap-3 h-12 rounded-xl">
                      <Calendar className="w-4 h-4" />
                      {language === 'ar' ? 'تغيير ساعات العمل' : 'Modify Availability'}
                    </Button>
                    <Button variant="outline" className="justify-start gap-3 h-12 rounded-xl text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20">
                      <ExternalLink className="w-4 h-4" />
                      {language === 'ar' ? 'إلغاء تنشيط الحساب' : 'Deactivate Account'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
