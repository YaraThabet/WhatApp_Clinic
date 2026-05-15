"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Phone, User, Activity, Calendar } from "lucide-react";

export default function PatientDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  const [patient, setPatient] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchPatient = async () => {
      const { data } = await supabase
        .from("patients")
        .select("*, doctor_id")
        .eq("id", id)
        .single();

      setPatient(data);
      setLoading(false);
    };

    fetchPatient();
  }, [id]);

  if (loading) {
    return <div className="p-10">Loading...</div>;
  }

  if (!patient) {
    return (
      <div className="p-10 text-center">
        Patient not found
        <div className="mt-4">
          <Button onClick={() => router.back()}>Go Back</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">

      {/* BACK */}
      <Button variant="ghost" onClick={() => router.back()}>
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </Button>

      {/* HEADER */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <User className="w-5 h-5" />
            {patient.name}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-2">
          <p className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            {patient.phone}
          </p>

          <Badge>{patient.status}</Badge>
        </CardContent>
      </Card>

      {/* DETAILS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <Card>
          <CardHeader>
            <CardTitle>Medical Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p><b>Age:</b> {patient.age}</p>
            <p><b>Problem:</b> {patient.problem}</p>
            <p><b>Condition:</b> {patient.condition}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>More Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p><b>Visits:</b> {patient.visits_count || 0}</p>
            <p><b>Last Visit:</b> {patient.last_visit || "N/A"}</p>
            <p><b>Notes:</b> {patient.notes || "No notes"}</p>
          </CardContent>
        </Card>

      </div>

    </div>
  );
}