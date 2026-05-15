"use client";

import * as React from "react";
import { supabase } from "@/lib/supabase";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";

export default function PatientsTable() {
  const router = useRouter();

  const [patients, setPatients] = React.useState<any[]>([]);
  const [doctors, setDoctors] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [search, setSearch] = React.useState("");

  // ================= FETCH DATA =================
  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const { data: session } = await supabase.auth.getSession();
      const user = session?.session?.user;

      const { data: admin } = await supabase
        .from("admins")
        .select("clinic_id")
        .eq("email", user?.email)
        .single();

      const { data: patientsData } = await supabase
        .from("patients")
        .select("*")
        .eq("clinic_id", admin?.clinic_id);

      const { data: doctorsData } = await supabase
        .from("doctor_clinics")
        .select("*")
        .eq("clinic_id", admin?.clinic_id);

      setPatients(patientsData || []);
      setDoctors(doctorsData || []);

      setLoading(false);
    };

    fetchData();
  }, []);

  // ================= UPDATE DOCTOR =================
  const updateDoctor = async (patientId: string, doctorId: string) => {
    await supabase
      .from("patients")
      .update({ doctor_id: doctorId })
      .eq("id", patientId);

    setPatients((prev) =>
      prev.map((p) => (p.id === patientId ? { ...p, doctor_id: doctorId } : p)),
    );
  };

  // ================= CONDITION COLORS =================
  const getConditionColor = (condition?: string) => {
    switch (condition) {
      case "Stable":
        return "bg-emerald-100 text-emerald-700";
      case "Critical":
        return "bg-red-100 text-red-700";
      case "Under Treatment":
        return "bg-amber-100 text-amber-700";
      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  // ================= SAFE SEARCH =================
  const filteredPatients = patients.filter((p) => {
    const name = p.name || "";
    const phone = p.phone || "";

    return (
      name.toLowerCase().includes(search.toLowerCase()) ||
      phone.toLowerCase().includes(search.toLowerCase())
    );
  });

  if (loading) {
    return <div className="p-10">Loading...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Patients</h1>
      </div>

      {/* SEARCH */}
      <Input
        placeholder="Search patients..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-md"
      />

      {/* TABLE */}
      <div className="border rounded-xl overflow-hidden bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Condition</TableHead>
              <TableHead>Doctor</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredPatients.map((p) => {
              const selectedDoctor = doctors.find((d) => d.id === p.doctor_id);

              return (
                <TableRow
                  key={p.id}
                  className="cursor-pointer hover:bg-slate-50"
                  onClick={() => router.push(`/dashboard/patients/${p.id}`)}
                >
                  {/* NAME */}
                  <TableCell className="font-medium">{p.name}</TableCell>

                  {/* PHONE */}
                  <TableCell>{p.phone}</TableCell>

                  {/* CONDITION */}
                  <TableCell>
                    <Badge className={cn(getConditionColor(p.condition))}>
                      {p.condition || "Not set"}
                    </Badge>
                  </TableCell>

                  {/* DOCTOR SELECT */}
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <Select
                      value={p.doctor_id || ""}
                      onValueChange={(value) => updateDoctor(p.id, value)}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue
                          placeholder={
                            selectedDoctor?.full_name || "Select doctor"
                          }
                        />
                      </SelectTrigger>

                      <SelectContent className="bg-white border shadow-xl">
                        {doctors.map((d) => (
                          <SelectItem key={d.id} value={d.id}>
                            {d.full_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* EMPTY STATE */}
      {filteredPatients.length === 0 && (
        <div className="text-center text-gray-500 py-10">No patients found</div>
      )}
    </div>
  );
}
