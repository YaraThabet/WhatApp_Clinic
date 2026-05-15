import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { supabaseAdmin } from "@/lib/supabase";

function formatSupabaseErr(err: unknown): string {
  if (!err || typeof err !== "object") return "Unknown Supabase error";
  const e = err as {
    message?: string;
    details?: string;
    hint?: string;
    code?: string;
    cause?: unknown;
  };
  if (!e.message) return "Unknown Supabase error";
  if (e.message !== "fetch failed") return e.message;
  const causeStr =
    e.cause instanceof Error
      ? e.cause.message
      : e.cause != null
        ? String(e.cause)
        : "";
  const parts = [
    "تعذر الاتصال بـ Supabase من الخادم (fetch failed).",
    "تحقق من: NEXT_PUBLIC_SUPABASE_URL، وSUPABASE_SERVICE_ROLE_KEY الصحيح (من لوحة Supabase → Settings → API)، وأن المشروع غير متوقف، وأن الجدار الناري لا يمنع HTTPS من Node.",
  ];
  if (causeStr) parts.push(`سبب الشبكة: ${causeStr}`);
  if (e.details) parts.push(`تفاصيل: ${e.details}`);
  if (e.hint) parts.push(`تلميح: ${e.hint}`);
  return parts.join(" ");
}

type RegisterClinicPayload = {
  clinicType: "single" | "multi";
  admin: {
    name: string;
    email: string;
    password: string;
  };
  clinic: {
    name: string;
    primary_specialty: string;
    country: string;
    city: string;
    number: string;
  };
  doctors: Array<{
    fullName: string;
    email: string;
    specialty: string;
    phone: string;
  }>;
};

export async function POST(req: Request) {
  if (!supabaseAdmin) {
    return NextResponse.json(
      {
        error:
          "Supabase admin client غير مهيأ. أضف SUPABASE_SERVICE_ROLE_KEY وNEXT_PUBLIC_SUPABASE_URL في .env.local ثم أعد تشغيل `npm run dev`.",
      },
      { status: 500 }
    );
  }

  try {
    const payload = (await req.json()) as RegisterClinicPayload;
    const { admin, clinic, clinicType, doctors } = payload;

    if (!admin?.email || !admin?.password || !admin?.name) {
      return NextResponse.json({ error: "Admin data is required." }, { status: 400 });
    }

    if (!clinic?.name || !clinic?.country || !clinic?.city || !clinic?.number) {
      return NextResponse.json({ error: "Clinic data is incomplete." }, { status: 400 });
    }

    const { data: createdUser, error: createUserError } =
      await supabaseAdmin.auth.admin.createUser({
        email: admin.email,
        password: admin.password,
        email_confirm: true,
      });

    if (createUserError || !createdUser.user) {
      console.error("[register-clinic] auth.admin.createUser", createUserError);
      const raw =
        createUserError?.message ||
        "Could not create auth user.";
      const duplicate =
        typeof raw === "string" &&
        (/already\s+registered|already\s+exists|duplicate|unique/i.test(raw) ||
          createUserError?.code === "email_exists");
      return NextResponse.json(
        {
          error: duplicate
            ? "هذا البريد مسجّل مسبقًا. سجّل الدخول أو استخدم بريدًا آخر."
            : formatSupabaseErr(createUserError),
          code: createUserError?.code,
        },
        { status: duplicate ? 409 : 400 }
      );
    }

    const userId = createdUser.user.id;

    const { data: clinicInsert, error: clinicError } = await supabaseAdmin
      .from("clinics")
      .insert([
        {
          name: clinic.name,
          country: clinic.country,
          city: clinic.city,
          phone: clinic.number,
          specialty: clinic.primary_specialty,
          type: clinicType,
        },
      ])
      .select()
      .single();

    if (clinicError) {
      console.error("[register-clinic] clinics.insert", clinicError);
      await supabaseAdmin.auth.admin.deleteUser(userId);
      return NextResponse.json(
        { error: formatSupabaseErr(clinicError) },
        { status: 400 }
      );
    }

    if (clinicType === "multi" && Array.isArray(doctors) && doctors.length > 0) {
      const doctorsToInsert = doctors
        .filter((doc) => doc.fullName?.trim() && doc.email?.trim())
        .map((doc) => ({
          clinic_id: clinicInsert.id,
          full_name: doc.fullName,
          email: doc.email,
          specialty: doc.specialty,
          phone: doc.phone,
        }));

      if (doctorsToInsert.length > 0) {
        const { error: doctorsError } = await supabaseAdmin
          .from("doctor_clinics")
          .insert(doctorsToInsert);

        if (doctorsError) {
          console.error("[register-clinic] doctor_clinics.insert", doctorsError);
          await supabaseAdmin.from("clinics").delete().eq("id", clinicInsert.id);
          await supabaseAdmin.auth.admin.deleteUser(userId);
          return NextResponse.json(
            { error: formatSupabaseErr(doctorsError) },
            { status: 400 }
          );
        }
      }
    }

    const hashedPassword = await bcrypt.hash(admin.password, 10);
    const { error: adminError } = await supabaseAdmin.from("admins").insert([
      {
        name: admin.name,
        email: admin.email,
        password: hashedPassword,
        clinic_id: clinicInsert.id,
        user_id: userId,
      },
    ]);

    if (adminError) {
      console.error("[register-clinic] admins.insert", adminError);
      await supabaseAdmin.from("doctor_clinics").delete().eq("clinic_id", clinicInsert.id);
      await supabaseAdmin.from("clinics").delete().eq("id", clinicInsert.id);
      await supabaseAdmin.auth.admin.deleteUser(userId);
      return NextResponse.json(
        { error: formatSupabaseErr(adminError) },
        { status: 400 }
      );
    }

    return NextResponse.json({ ok: true, clinicId: clinicInsert.id }, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unexpected server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

