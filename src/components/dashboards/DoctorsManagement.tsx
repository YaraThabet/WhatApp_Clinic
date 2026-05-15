"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Users } from "lucide-react";

import { supabase } from "@/lib/supabase";
import { useLanguage } from "@/components/language-provider";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function DoctorsPage() {
  const router = useRouter();
  const { language } = useLanguage();

  const [doctors, setDoctors] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  const [deleteTarget, setDeleteTarget] = React.useState<any>(null);

  // ================= FETCH DOCTORS =================
  React.useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);

      const { data: sessionData } = await supabase.auth.getSession();
      const user = sessionData?.session?.user;

      if (!user) {
        setDoctors([]);
        setLoading(false);
        return;
      }

      const { data: admin } = await supabase
        .from("admins")
        .select("clinic_id")
        .eq("email", user.email)
        .single();

      if (!admin?.clinic_id) {
        setDoctors([]);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("doctor_clinics")
        .select("*")
        .eq("clinic_id", admin.clinic_id)
        .order("created_at", { ascending: false });

      if (!error) {
        setDoctors(data || []);
      } else {
        console.error(error);
        setDoctors([]);
      }

      setLoading(false);
    };

    fetchDoctors();
  }, []);

  // ================= DELETE DOCTOR =================
  const deleteDoctor = async (doctorId: string) => {
    const { error } = await supabase
      .from("doctor_clinics")
      .delete()
      .eq("id", doctorId);

    if (error) {
      console.error(error);
      return;
    }

    setDoctors((prev) => prev.filter((d) => d.id !== doctorId));
    setDeleteTarget(null);
  };

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  // ================= EMPTY STATE =================
  if (doctors.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 p-6">
        <Card className="p-8 text-center max-w-md w-full">
          <Users className="w-12 h-12 mx-auto text-slate-400 mb-4" />

          <h2 className="text-xl font-bold mb-2">
            {language === "ar" ? "لا يوجد أطباء" : "No Doctors Found"}
          </h2>

          <p className="text-slate-500 mb-6">
            {language === "ar"
              ? "ابدأ بإضافة أول طبيب في العيادة"
              : "Start by adding your first doctor"}
          </p>

          <Button
            className="w-full bg-blue-600 hover:bg-blue-500"
            onClick={() => router.push("/dashboard/doctors/new")}
          >
            {language === "ar" ? "إضافة طبيب" : "Add Doctor"}
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          {language === "ar" ? "الأطباء" : "Doctors"}
        </h1>

        <Button
          onClick={() => router.push("/dashboard/doctors/new")}
          className="bg-blue-600 hover:bg-blue-500"
        >
          {language === "ar" ? "إضافة طبيب" : "Add Doctor"}
        </Button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{language === "ar" ? "الطبيب" : "Doctor"}</TableHead>

              <TableHead>
                {language === "ar" ? "التخصص" : "Specialty"}
              </TableHead>

              <TableHead>{language === "ar" ? "البريد" : "Email"}</TableHead>

              <TableHead>{language === "ar" ? "الهاتف" : "Phone"}</TableHead>

              <TableHead>
                {language === "ar" ? "الإجراءات" : "Actions"}
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {doctors.map((doc) => (
              <TableRow key={doc.id}>
                {/* Doctor */}
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm">
                      {doc.full_name?.slice(0, 2).toUpperCase()}
                    </div>

                    {doc.full_name}
                  </div>
                </TableCell>

                {/* Specialty */}
                <TableCell>{doc.specialty || "-"}</TableCell>

                {/* Email */}
                <TableCell className="text-slate-600">
                  {doc.email || "-"}
                </TableCell>

                {/* Phone */}
                <TableCell className="text-slate-600">
                  {doc.phone || "-"}
                </TableCell>

                {/* Actions */}
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        router.push(`/dashboard/doctors/${doc.id}`)
                      }
                    >
                      {language === "ar" ? "عرض" : "View"}
                    </Button>

                    <Button
                      size="sm"
                      className="bg-red-600 hover:bg-red-500 text-white"
                      onClick={() => setDeleteTarget(doc)}
                    >
                      {language === "ar" ? "حذف" : "Delete"}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* ================= DELETE MODAL ================= */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-[400px] p-6">
            <h2 className="text-lg font-bold mb-2">
              {language === "ar" ? "تأكيد الحذف" : "Confirm Delete"}
            </h2>

            <p className="text-slate-600 mb-6">
              {language === "ar"
                ? `هل أنت متأكد أنك تريد حذف الدكتور ${deleteTarget.full_name}؟`
                : `Are you sure you want to delete Dr. ${deleteTarget.full_name}?`}
            </p>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200"
              >
                {language === "ar" ? "إلغاء" : "Cancel"}
              </button>

              <button
                onClick={() => deleteDoctor(deleteTarget.id)}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-500"
              >
                {language === "ar" ? "حذف" : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
