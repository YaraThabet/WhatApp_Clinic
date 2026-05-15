import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

/* ========== SUPABASE ========== */
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/* ========== MEMORY ========== */
const sessions = new Map();

/* ========== CONFIG ========== */
const VERIFY_TOKEN = "my_secret_123";

const availableTimes = ["10:00", "12:00", "14:00"];

/* ========== HELPERS ========== */

function normalizeArabicNumbers(str: string) {
  const map: Record<string, string> = {
    "٠": "0",
    "١": "1",
    "٢": "2",
    "٣": "3",
    "٤": "4",
    "٥": "5",
    "٦": "6",
    "٧": "7",
    "٨": "8",
    "٩": "9",
  };

  return str.replace(/[٠-٩]/g, (d) => map[d]);
}

function normalizePhone(phone: string) {
  return phone.replace(/[^0-9]/g, "");
}

function normalizeTime(time: string) {
  const cleaned = normalizeArabicNumbers(time).replace(/[^0-9]/g, "");

  if (cleaned === "10") return "10:00";
  if (cleaned === "12") return "12:00";
  if (cleaned === "14") return "14:00";

  return time;
}

/* ========== SEND WHATSAPP ========== */

async function sendWhatsApp(to: string, text: string) {
  console.log("📤 SENDING MESSAGE TO:", to);
  console.log("📝 TEXT:", text);

  const response = await fetch(
    `https://graph.facebook.com/v18.0/${process.env.YOUR_PHONE_NUMBER_ID}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.YOUR_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to,
        type: "text",
        text: {
          body: text,
        },
      }),
    }
  );

  const data = await response.json();

  console.log("📨 WHATSAPP RESPONSE:", data);
}

/* ========== WEBHOOK VERIFY ========== */

export async function GET(req: Request) {
  console.log("🔐 VERIFY REQUEST RECEIVED");

  const url = new URL(req.url);

  const mode = url.searchParams.get("hub.mode");
  const token = url.searchParams.get("hub.verify_token");
  const challenge = url.searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("✅ VERIFY SUCCESS");

    return new Response(challenge, {
      status: 200,
    });
  }

  console.log("❌ VERIFY FAILED");

  return new Response("Forbidden", {
    status: 403,
  });
}

/* ========== MAIN BOT ========== */

export async function POST(req: Request) {
  try {
    console.log("🔥 WEBHOOK HIT");

    const body = await req.json();

    console.log("📩 RAW BODY:", JSON.stringify(body, null, 2));

    const value = body?.entry?.[0]?.changes?.[0]?.value;

    const message = value?.messages?.[0];
    const status = value?.statuses?.[0];

    if (status && !message) {
      console.log("⏭ STATUS UPDATE");

      return NextResponse.json({
        ok: true,
      });
    }

    if (!message) {
      console.log("⚠ NO MESSAGE");

      return NextResponse.json({
        ok: true,
      });
    }

    const phone = message.from;

    let userMessage = message.text?.body?.trim();

    console.log("📱 PHONE:", phone);
    console.log("✉️ MESSAGE:", userMessage);

    if (!userMessage) {
      return NextResponse.json({
        ok: true,
      });
    }

    userMessage = normalizeArabicNumbers(userMessage);

    const session = sessions.get(phone);

    console.log("🧠 SESSION:", session);

    /* ========= START ========= */

    if (!session) {
      console.log("🆕 NEW SESSION");

      sessions.set(phone, {
        step: "ask_name",
        data: {},
      });

      await sendWhatsApp(
        phone,
        `مرحباً بك في العيادة 🏥

لبدء الحجز، ما اسمك الكريم؟`
      );

      return NextResponse.json({
        ok: true,
      });
    }

    /* ========= FLOW ========= */

    switch (session.step) {
      /* ========= NAME ========= */

      case "ask_name":
        console.log("👉 STEP: ask_name");

        session.data.name = userMessage;

        session.step = "ask_age";

        await sendWhatsApp(
          phone,
          "كم عمرك؟"
        );

        break;

      /* ========= AGE ========= */

      case "ask_age":
        console.log("👉 STEP: ask_age");

        if (!/^\d+$/.test(userMessage)) {
          await sendWhatsApp(
            phone,
            "⚠️ العمر يجب أن يكون أرقام فقط"
          );

          return NextResponse.json({
            ok: true,
          });
        }

        session.data.age = userMessage;

        session.step = "ask_phone";

        await sendWhatsApp(
          phone,
          "أدخل رقم الهاتف"
        );

        break;

      /* ========= PHONE ========= */

      case "ask_phone":
        console.log("👉 STEP: ask_phone");

        const phoneClean = normalizePhone(userMessage);

        if (!/^05\d{8}$/.test(phoneClean)) {
          await sendWhatsApp(
            phone,
            "⚠️ رقم غير صحيح (مثال: 059XXXXXXX)"
          );

          return NextResponse.json({
            ok: true,
          });
        }

        session.data.phone = phoneClean;

        session.step = "ask_problem";

        await sendWhatsApp(
          phone,
          "ما سبب الحجز أو الحالة الصحية؟"
        );

        break;

      /* ========= PROBLEM ========= */

      case "ask_problem":
        console.log("👉 STEP: ask_problem");

        session.data.problem = userMessage;

        session.step = "ask_time";

        await sendWhatsApp(
          phone,
          `اختر موعد:

${availableTimes.join(" - ")}`
        );

        break;

      /* ========= TIME ========= */

      case "ask_time":
        console.log("👉 STEP: ask_time");

        const time = normalizeTime(userMessage);

        if (!availableTimes.includes(time)) {
          await sendWhatsApp(
            phone,
            `⚠️ اختر من المواعيد:

${availableTimes.join(" - ")}`
          );

          return NextResponse.json({
            ok: true,
          });
        }

        session.data.time = time;

        session.step = "review";

        await sendWhatsApp(
          phone,
          `📋 مراجعة بيانات الحجز:

👤 الاسم: ${session.data.name}
🎂 العمر: ${session.data.age}
📱 الهاتف: ${session.data.phone}
🩺 الحالة: ${session.data.problem}
⏰ الموعد: ${session.data.time}

هل تريد:
1️⃣ تأكيد
2️⃣ تعديل`
        );

        break;

      /* ========= REVIEW ========= */

      case "review":
        console.log("👉 STEP: review");

        const text = userMessage.toLowerCase();

        /* ========= CONFIRM ========= */

        if (text === "1" || text.includes("تأكيد")) {
          console.log("💾 SAVING TO SUPABASE...");

          const { error } = await supabase
            .from("patients")
            .insert({
              name: session.data.name,
              age: session.data.age,
              phone: session.data.phone,
              problem: session.data.problem,
              appointment_time: session.data.time,
            });

          if (error) {
            console.error("❌ SUPABASE ERROR:", error);

            await sendWhatsApp(
              phone,
              "حدث خطأ أثناء حفظ البيانات"
            );

            return NextResponse.json({
              ok: false,
            });
          }

          console.log("✅ DATA SAVED SUCCESSFULLY");

          await sendWhatsApp(
            phone,
            "✅ تم تأكيد الحجز وحفظ البيانات بنجاح 🌸"
          );

          sessions.delete(phone);

          break;
        }

        /* ========= EDIT ========= */

        if (text === "2" || text.includes("تعديل")) {
          session.step = "ask_name";

          await sendWhatsApp(
            phone,
            "تمام 👍 ابدأ من جديد"
          );

          break;
        }

        await sendWhatsApp(
          phone,
          "⚠️ اختر 1 أو 2"
        );

        break;

      /* ========= DEFAULT ========= */

      default:
        console.log("⚠ RESET SESSION");

        sessions.delete(phone);

        await sendWhatsApp(
          phone,
          "حدث خطأ، حاول مرة أخرى"
        );
    }

    return NextResponse.json({
      ok: true,
    });

  } catch (err: unknown) {
    console.error("❌ ERROR:", err);

    const message =
      err instanceof Error
        ? err.message
        : "Unexpected error";

    return NextResponse.json(
      {
        error: message,
      },
      {
        status: 500,
      }
    );
  }
}
