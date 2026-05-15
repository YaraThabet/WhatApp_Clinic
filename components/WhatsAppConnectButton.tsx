import { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";
import useFacebookSDK from "@/hooks/useFacebookSDK";

export default function WhatsAppConnectButton() {
  const { isSDKLoaded, openWhatsAppPopup } = useFacebookSDK();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      await openWhatsAppPopup();
      setIsSuccess(true);
    } catch (error) {
      console.error("WhatsApp signup failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={!isSDKLoaded || isLoading}
      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
    >
      <FaWhatsapp />
      {isLoading
        ? "جاري التحميل..."
        : isSuccess
          ? "تم الربط بنجاح"
          : "ربط واتساب العيادة"}
    </button>
  );
}
