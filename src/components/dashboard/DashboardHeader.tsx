"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

import * as React from "react";
import { Bell, Plus, Building2 } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { supabase } from "@/lib/supabase";
import useWhatsAppSimple from "@/hooks/useWhatsAppSimple";

import { toast } from "sonner";

export default function DashboardHeader() {
  const { connectWhatsApp, isLoading } = useWhatsAppSimple();

  // ================= STATES =================
  const [clinicName, setClinicName] = React.useState<string | null>(null);
  const [openAppointmentModal, setOpenAppointmentModal] = React.useState(false);

  const [patientName, setPatientName] = React.useState("");
  const [patientPhone, setPatientPhone] = React.useState("");
  const [age, setAge] = React.useState("");
  const [condition, setCondition] = React.useState("");
  const [time, setTime] = React.useState("");

  const [isSaving, setIsSaving] = React.useState(false);
  const [errors, setErrors] = React.useState<any>({});

  const today = new Date();
  const [selectedDate, setSelectedDate] = React.useState<Date>(today);

  // ================= DATE CONTROL =================
  const goNextDay = () => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + 1);
    setSelectedDate(d);
  };

  const goPrevDay = () => {
    const d = new Date(selectedDate);
    if (d.toDateString() === today.toDateString()) return;
    d.setDate(d.getDate() - 1);
    setSelectedDate(d);
  };

  // ================= VALIDATION =================
  const validate = () => {
    const err: any = {};

    if (!patientName.trim()) err.patientName = "Patient name is required";
    if (!age.trim()) err.age = "Age is required";
    if (!condition.trim()) err.condition = "Condition is required";
    if (!time) err.time = "Please select appointment time";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  // ================= SAVE =================
  const handleSaveAppointment = async () => {
    if (!validate()) return;

    try {
      setIsSaving(true);

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) throw new Error("No session");

      const { data: admin } = await supabase
        .from("admins")
        .select("clinic_id")
        .eq("email", session.user.email)
        .single();

      if (!admin?.clinic_id) throw new Error("No clinic");

      // ================= PATIENT =================
      const { data: patient, error: patientError } = await supabase
        .from("patients")
        .insert([
          {
            name: patientName,
            phone: patientPhone,
            age,
            problem: condition,
            clinic_id: admin.clinic_id,
            status: "active",
          },
        ])
        .select()
        .single();

      if (patientError) throw patientError;

      // ================= APPOINTMENT =================
      const { error: appointmentError } = await supabase
        .from("appointments")
        .insert([
          {
            clinic_id: admin.clinic_id,
            patient_id: patient.id,
            appointment_date: selectedDate.toISOString().split("T")[0],
            appointment_time: time,
            status: "pending",
            procedure: condition,
          },
        ]);

      if (appointmentError) throw appointmentError;

      toast.success("Appointment saved successfully ✅");

      // RESET
      setPatientName("");
      setPatientPhone("");
      setAge("");
      setCondition("");
      setTime("");
      setErrors({});
      setOpenAppointmentModal(false);
    } catch (err: any) {
      toast.error(err.message || "Error saving appointment ❌");
    } finally {
      setIsSaving(false);
    }
  };

  // ================= UI =================
  return (
    <header className="h-16 bg-[#ffffff] border-b flex items-center justify-between px-8">
      {/* LEFT */}
      <div className="flex items-center gap-2">
        <Building2 className="w-5 h-5" />
        <span className="font-bold">{clinicName || "Clinic System"}</span>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        {/* NEW APPOINTMENT */}
        <Dialog
          open={openAppointmentModal}
          onOpenChange={setOpenAppointmentModal}
        >
          <DialogTrigger asChild>
            <Button className="bg-blue-600 text-white rounded-full px-6 flex items-center gap-2">
              <Plus className="w-4 h-4" />
              New Appointment
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[700px]">
            <DialogTitle>Create Appointment</DialogTitle>
            <DialogDescription>Fill patient details</DialogDescription>

            <div className="space-y-4 mt-4">
              <Input
                placeholder="Patient Name"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
              />
              {errors.patientName && (
                <p className="text-red-500 text-sm">{errors.patientName}</p>
              )}

              <Input
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
              {errors.age && (
                <p className="text-red-500 text-sm">{errors.age}</p>
              )}

              <Input
                placeholder="Phone"
                value={patientPhone}
                onChange={(e) => setPatientPhone(e.target.value)}
              />

              <Input
                placeholder="Condition"
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
              />
              {errors.condition && (
                <p className="text-red-500 text-sm">{errors.condition}</p>
              )}

              {/* TIME */}
              <Input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
              {errors.time && (
                <p className="text-red-500 text-sm">{errors.time}</p>
              )}

              {/* DATE */}
              <div className="flex justify-between items-center bg-gray-100 p-2 rounded">
                <button onClick={goPrevDay}>◀</button>
                <span>{selectedDate.toDateString()}</span>
                <button onClick={goNextDay}>▶</button>
              </div>

              {/* SAVE */}
              <Button
                onClick={handleSaveAppointment}
                disabled={isSaving}
                className="w-full bg-blue-600 text-white"
              >
                {isSaving ? "Saving..." : "Save Appointment"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* USER */}
      </div>
    </header>
  );
}
