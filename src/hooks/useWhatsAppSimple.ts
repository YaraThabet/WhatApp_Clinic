"use client";
import { useState } from "react";

export default function useWhatsAppSimple() {
  const [isLoading, setIsLoading] = useState(false);

  const connectWhatsApp = async () => {
    setIsLoading(true);

    try {
      // البيانات من صفحتك في Meta مباشرة
      const phoneNumberId = "963664079581214";
      const wabaId = "963664079581214";

      // احفظيها في localStorage مؤقتاً
      if (typeof window !== "undefined") {
        localStorage.setItem("whatsapp_phone_id", phoneNumberId);
        localStorage.setItem("whatsapp_waba_id", wabaId);
        localStorage.setItem("whatsapp_connected", "true");
        localStorage.setItem("whatsapp_connected_at", new Date().toISOString());
      }

      return {
        access_token: "verified",
        phone_number_id: phoneNumberId,
        waba_id: wabaId,
      };
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    connectWhatsApp,
    isLoading,
  };
}