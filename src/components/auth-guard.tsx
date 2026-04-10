"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { motion, AnimatePresence } from "framer-motion"
import { Stethoscope } from "lucide-react"

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(true)
    const [session, setSession] = useState<any>(null)
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        // Initial session check
        const checkSession = async () => {
            try {
                const { data: { session: currentSession } } = await supabase.auth.getSession()
                setSession(currentSession)
                handleRouting(currentSession, pathname)
            } catch (error) {
                console.error("Error checking auth session:", error)
            } finally {
                // We add a slight delay to make the transition feel "premium" and smooth
                setTimeout(() => setIsLoading(false), 800)
            }
        }

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
            handleRouting(session, pathname)
        })

        checkSession()

    }, [pathname])

    const handleRouting = (currentSession: any, path: string) => {
        const isAuthPage = path === "/login" || path === "/register"
        const isLandingPage = path === "/"
        const isProtectedRoute = path.startsWith("/dashboard") || path.startsWith("/patients")

        if (currentSession) {
            // If logged in and on a public-only page (login/register/landing), 
            // redirect to the dashboard. Sub-routes are handled by Next.js.
            if (isAuthPage || isLandingPage) {
                router.replace("/dashboard")
            }
        } else {
            // If not logged in and trying to access a protected route,
            // push to login page while preserving the destination (optional, but standard).
            if (isProtectedRoute) {
                router.replace("/login")
            }
        }
    }

    if (isLoading) {
        return (
            <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                        duration: 0.5,
                        repeat: Infinity,
                        repeatType: "reverse"
                    }}
                    className="flex flex-col items-center gap-6"
                >
                    <div className="w-20 h-20 bg-primary-base rounded-[2rem] flex items-center justify-center shadow-2xl shadow-primary-base/40">
                        <Stethoscope className="text-white w-10 h-10" />
                    </div>
                    <div className="flex flex-col items-center">
                        <h2 className="text-2xl font-bold text-heading tracking-tight">WhatApp Clinic</h2>
                        <div className="mt-4 flex gap-1">
                            {[0, 1, 2].map((i) => (
                                <motion.div
                                    key={i}
                                    animate={{
                                        scale: [1, 1.5, 1],
                                        opacity: [0.3, 1, 0.3]
                                    }}
                                    transition={{
                                        duration: 1,
                                        repeat: Infinity,
                                        delay: i * 0.2
                                    }}
                                    className="w-1.5 h-1.5 rounded-full bg-primary-base"
                                />
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        )
    }

    return <>{children}</>
}
