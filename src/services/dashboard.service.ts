import { supabase } from "@/lib/supabase"

export async function getDoctorsCount() {

    // رقم العيادة الحالي
    // مؤقتًا نحطه يدوي
    const clinicId = "97733e29-a6bb-40b0-b4d0-d3ba35f3ae5b"

    const { count, error } = await supabase
        .from("doctor_clinics")
        .select("*", {
            count: "exact",
            head: true
        })
        .eq("clinic_id", clinicId)

    if (error) {

        console.error(error)

        return 0
    }

    return count || 0
}