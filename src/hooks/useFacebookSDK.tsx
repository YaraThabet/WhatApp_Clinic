"use client";

import { useEffect, useState } from "react";

declare global {
  interface Window {
    FB: any;
    fbAsyncInit: () => void;
  }
}

export default function useFacebookSDK() {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // لو الـ SDK موجود مسبقًا
    if (window.FB) {
      setIsSDKLoaded(true);
      setIsInitialized(true);
      return;
    }

    // تعريف init قبل تحميل السكربت (مهم جدًا)
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID!,
        cookie: true,
        xfbml: true,
        version: "v19.0",
      });

      console.log("✅ Facebook SDK initialized");

      setIsInitialized(true);
      setIsSDKLoaded(true);
    };

    // تحميل SDK
    const script = document.createElement("script");
    script.src = "https://connect.facebook.net/en_US/sdk.js";
    script.async = true;
    script.defer = true;

    script.onerror = () => {
      console.error("❌ Failed to load Facebook SDK");
    };

    document.body.appendChild(script);
  }, []);

  const openWhatsAppPopup = async () => {
    return new Promise((resolve, reject) => {
      // حماية: لا تشغيل قبل التهيئة
      if (!window.FB) {
        reject("❌ Facebook SDK not loaded");
        return;
      }

      if (!isInitialized) {
        reject("❌ Facebook SDK not initialized yet");
        return;
      }

      window.FB.login(
        (response: any) => {
          if (response.authResponse) {
            resolve({
              access_token: response.authResponse.accessToken,
              phone_number_id: response.authResponse.userID,
              waba_id: response.authResponse.userID,
            });
          } else {
            reject("❌ User cancelled login");
          }
        },
        {
          scope: "whatsapp_business_management",
        },
      );
    });
  };

  return {
    isSDKLoaded,
    isInitialized,
    openWhatsAppPopup,
  };
}
