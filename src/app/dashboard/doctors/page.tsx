"use client";

import DoctorsManagement from "@/components/dashboards/DoctorsManagement";
import { useLanguage } from "@/components/language-provider";

export default function DoctorsPage() {
    const { language } = useLanguage();
    return (
        <div className="p-6">
            <DoctorsManagement darkMode={false} language={language} />
        </div>
    );
}
