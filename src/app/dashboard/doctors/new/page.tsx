"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Stethoscope, User, Mail, Phone, Award, Loader2 } from "lucide-react";

export default function AddDoctorPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    specialty: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const user = sessionData?.session?.user;

      const { data: admin } = await supabase
        .from("admins")
        .select("clinic_id")
        .eq("email", user?.email)
        .single();

      const { error } = await supabase.from("doctor_clinics").insert([
        {
          full_name: form.full_name,
          email: form.email,
          phone: form.phone,
          specialty: form.specialty,
          clinic_id: admin?.clinic_id,
          role: "doctor",
        },
      ]);

      if (error) throw error;

      router.push("/dashboard/clinic");
    } catch (err) {
      console.error(err);
      alert("Error adding doctor");
    }

    setLoading(false);
  };

  const specialties = [
    "Cardiologist",
    "Pediatrician",
    "Dermatologist",
    "Neurologist",
    "Orthopedic",
    "General Doctor",
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">

      <Card className="w-full max-w-3xl shadow-lg border-none">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-xl">
          <CardTitle className="flex items-center gap-2 text-xl">
            <Stethoscope className="w-5 h-5" />
            Add New Doctor
          </CardTitle>
          <p className="text-sm text-white/80">
            Fill in the doctor information to assign them to the clinic
          </p>
        </CardHeader>

        <CardContent className="p-6 space-y-8">

          {/* SECTION 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  name="full_name"
                  placeholder="Dr. John Smith"
                  className="pl-10"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <Label>Specialty</Label>
              <div className="relative">
                <Award className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <select
                  name="specialty"
                  className="w-full border rounded-md p-2 pl-10 bg-white"
                  onChange={handleChange}
                >
                  <option value="">Select specialty</option>
                  {specialties.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* SECTION 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  name="email"
                  placeholder="doctor@email.com"
                  className="pl-10"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <Label>Phone</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  name="phone"
                  placeholder="+970 59 123 4567"
                  className="pl-10"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* PREVIEW CARD */}
          <div className="bg-slate-50 p-4 rounded-xl border">
            <p className="text-sm text-gray-500 mb-2">Preview</p>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">
                  {form.full_name || "Doctor Name"}
                </p>
                <p className="text-sm text-gray-500">
                  {form.specialty || "Specialty"}
                </p>
              </div>

              <Badge className="bg-blue-100 text-blue-700">
                New Doctor
              </Badge>
            </div>
          </div>

          {/* BUTTON */}
          <Button
            className="w-full bg-blue-600 hover:bg-blue-500 h-12 text-white"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </div>
            ) : (
              "Add Doctor"
            )}
          </Button>

        </CardContent>
      </Card>
    </div>
  );
}