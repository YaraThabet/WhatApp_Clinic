
import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { clinic_id, access_token, phone_number_id, waba_id } = body;

    // التحقق من البيانات
    if (!clinic_id || !phone_number_id) {
      return NextResponse.json(
        { message: "البيانات المطلوبة ناقصة" },
        { status: 400 }
      );
    }

    // حفظ البيانات في قاعدة البيانات
    const { data, error } = await supabase
      .from("clinic_whatsapp_config")
      .upsert(
        {
          clinic_id,
          access_token,
          phone_number_id,
          waba_id,
          connected_at: new Date().toISOString(),
        },
        {
          onConflict: "clinic_id",
        }
      )
      .select()
      .single();

    if (error) {
      console.error("Database error:", error);
      return NextResponse.json(
        { message: "خطأ في حفظ البيانات: " + error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "تم ربط WhatsApp بنجاح",
        data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { message: "خطأ في الخادم" },
      { status: 500 }
    );
  }
}