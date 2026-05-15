import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `
        أنت نظام حجز مواعيد لعيادة طبية.
        
        افهم المستخدم وارجع JSON فقط بهذا الشكل:
        
        {
          "intent": "greeting | booking | unknown",
          "reply": "الرد على المستخدم",
          "nextStep": "name | age | phone | condition | date | done | none"
        }
        
        قواعد:
        - إذا تحية → greet
        - إذا طلب حجز → booking
        - إذا معلومات ناقصة → اسأل خطوة واحدة فقط
        - لا تكتب أي نص خارج JSON
        
        الرسالة:
        ${message}
        `
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    console.log("🧠 GEMINI RAW RESPONSE:");
    console.log(JSON.stringify(data, null, 2));

    // 🔥 استخراج آمن
    let reply = "حصل خطأ، حاول مرة أخرى";

    if (
      data?.candidates &&
      data.candidates.length > 0 &&
      data.candidates[0]?.content?.parts
    ) {
      reply =
        data.candidates[0].content.parts
          .map((p: any) => p.text)
          .join(" ") || reply;
    }

    console.log("🤖 FINAL REPLY:", reply);

    return NextResponse.json({ reply });

  } catch (err: any) {
    console.error("❌ GEMINI ERROR:", err);

    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}