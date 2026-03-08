
"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  MessageSquare,
  Calendar,
  LayoutDashboard,
  Brain,
  Clock,
  BarChart3,
  Users,
  CheckCircle2,
  ArrowRight,
  PlayCircle,
  TrendingUp,
  TrendingDown,
} from "lucide-react"

import { useLanguage } from "@/components/language-provider"

export default function HomePage() {
  const { t } = useLanguage()

  return (
    <div className="flex flex-col bg-background">
      <section id="home" className="relative overflow-hidden py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* LEFT – Copy */}
            <div className="flex flex-col gap-8">
              <h1 className="text-5xl lg:text-7xl font-black text-foreground leading-[1.05] tracking-tight">
                {t("hero.title1")} <br />
                <span className="text-[#13a4ec]">{t("hero.title2")}</span> {t("hero.title3")}
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground max-w-[540px] leading-relaxed font-medium">
                {t("hero.subtitle")}
              </p>

              <div className="flex flex-col sm:flex-row gap-5">
                <Button className="bg-[#13a4ec] hover:bg-[#13a4ec]/90 text-primary-foreground font-black px-10 h-16 rounded-2xl text-lg shadow-2xl shadow-[#13a4ec]/30 group transition-all">
                  {t("hero.ctaPrimary")}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{t("hero.noCard")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{t("hero.freeTrial")}</span>
                </div>
              </div>
            </div>

            {/* RIGHT – Dashboard Preview (matches Stitch exactly) */}
            <div className="relative flex items-start justify-center">
              {/* Blue radial glow behind */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[420px] h-[420px] rounded-full bg-[#13a4ec]/15 blur-[100px]" />
              </div>

              {/* ── Browser/Dashboard card ── */}
              <div className="relative z-10 w-full max-w-[520px] bg-[#0d1117] border border-white/10 rounded-2xl shadow-[0_32px_80px_rgba(0,0,0,0.7)] overflow-hidden">

                {/* Mac-style title bar */}
                <div className="flex items-center gap-2 px-4 py-3 bg-[#161b22] border-b border-white/5">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                  <div className="flex-1 flex justify-center">
                    <div className="bg-[#0d1117] border border-white/10 rounded-md px-6 py-0.5 text-[10px] text-muted-foreground font-mono">
                      app.whatsclinic.com/dashboard
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  {/* Dashboard header */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-foreground font-bold text-sm">{t("dashboard.title")}</p>
                      <p className="text-muted-foreground text-[11px] mt-0.5">{t("dashboard.today")} · Aug 12, 2024</p>
                    </div>
                    <div className="flex items-center gap-1.5 bg-[#13a4ec]/10 border border-[#13a4ec]/20 px-3 py-1 rounded-full">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-[#13a4ec] text-[10px] font-black uppercase tracking-widest">{t("dashboard.aiActive")}</span>
                    </div>
                  </div>

                  {/* 4-stat row */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
                    {/* Total Booked */}
                    <div className="bg-[#161b22] rounded-xl p-3 border border-white/5">
                      <p className="text-muted-foreground text-[9px] font-bold uppercase tracking-widest leading-tight mb-1.5">{t("dashboard.totalBooked")}</p>
                      <p className="text-foreground font-black text-xl leading-none">182</p>
                      <div className="flex items-center gap-0.5 mt-1.5">
                        <TrendingUp className="w-2.5 h-2.5 text-green-400" />
                        <span className="text-green-400 text-[9px] font-black">+12%</span>
                      </div>
                    </div>
                    {/* Cancelled */}
                    <div className="bg-[#161b22] rounded-xl p-3 border border-white/5">
                      <p className="text-muted-foreground text-[9px] font-bold uppercase tracking-widest leading-tight mb-1.5">{t("dashboard.cancelled")}</p>
                      <p className="text-foreground font-black text-xl leading-none">24</p>
                      <div className="flex items-center gap-0.5 mt-1.5">
                        <TrendingDown className="w-2.5 h-2.5 text-red-400" />
                        <span className="text-red-400 text-[9px] font-black">-5%</span>
                      </div>
                    </div>
                    {/* Success Rate */}
                    <div className="bg-[#161b22] rounded-xl p-3 border border-white/5">
                      <p className="text-muted-foreground text-[9px] font-bold uppercase tracking-widest leading-tight mb-1.5">{t("dashboard.successRate")}</p>
                      <p className="text-[#13a4ec] font-black text-xl leading-none">94.2%</p>
                      <div className="mt-1.5 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-[#13a4ec] rounded-full" style={{ width: "94%" }} />
                      </div>
                    </div>
                    {/* Revenue */}
                    <div className="bg-[#161b22] rounded-xl p-3 border border-white/5">
                      <p className="text-muted-foreground text-[9px] font-bold uppercase tracking-widest leading-tight mb-1.5">{t("dashboard.revenue")}</p>
                      <p className="text-foreground font-black text-xl leading-none">$12.4k</p>
                      <div className="flex items-center gap-0.5 mt-1.5">
                        <TrendingUp className="w-2.5 h-2.5 text-green-400" />
                        <span className="text-green-400 text-[9px] font-black">+8%</span>
                      </div>
                    </div>
                  </div>

                  {/* Appointment Trends Chart */}
                  <div className="bg-[#161b22] rounded-xl p-4 border border-white/5">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-foreground font-bold text-xs">{t("dashboard.trends")}</p>
                      <div className="flex gap-1">
                        {["W", "M", "Y"].map((t, i) => (
                          <button key={t} className={`px-2 py-0.5 rounded text-[9px] font-black ${i === 0 ? "bg-[#13a4ec] text-foreground" : "text-muted-foreground hover:text-foreground"}`}>{t}</button>
                        ))}
                      </div>
                    </div>

                    {/* Bar chart - days of week */}
                    <div className="flex items-end gap-1 sm:gap-2 h-32">
                      {[
                        { day: "Mon", h: 55, active: false },
                        { day: "Tue", h: 75, active: false },
                        { day: "Wed", h: 45, active: false },
                        { day: "Thu", h: 88, active: false },
                        { day: "Fri", h: 65, active: false },
                        { day: "Sat", h: 100, active: true },
                        { day: "Sun", h: 30, active: false },
                      ].map(({ day, h, active }) => (
                        <div key={day} className="flex-1 flex flex-col items-center gap-1.5">
                          <div className="w-full flex items-end justify-center" style={{ height: "110px" }}>
                            <div
                              className={`w-full rounded-t-md transition-all ${active ? "bg-[#13a4ec] shadow-lg shadow-[#13a4ec]/30" : "bg-white/10"}`}
                              style={{ height: `${h}%` }}
                            />
                          </div>
                          <span className={`text-[9px] font-bold ${active ? "text-[#13a4ec]" : "text-gray-600"}`}>{day}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom row: latest activity */}
                  <div className="mt-3 flex items-center gap-2 sm:gap-3 bg-[#13a4ec]/5 border border-[#13a4ec]/20 rounded-xl px-2 sm:px-3 py-2 sm:py-2.5">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#13a4ec] flex items-center justify-center text-foreground text-[8px] sm:text-[9px] font-black shrink-0">AI</div>
                    <p className="text-[9px] sm:text-[10px] text-gray-300 font-medium line-clamp-1 sm:line-clamp-none">
                      {t("dashboard.aiBooked")}
                    </p>
                    <span className="text-[8px] sm:text-[9px] text-muted-foreground font-bold shrink-0">{t("dashboard.justNow")}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
          PATIENT JOURNEY SECTION
      ────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-20 border-y border-white/5 bg-background/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-16">
          <div className="flex flex-col items-center text-center gap-4">
            <Badge variant="outline" className="border-[#13a4ec]/30 text-[#13a4ec] px-4 py-1.5 rounded-full text-[10px] font-black tracking-[0.2em] uppercase bg-[#13a4ec]/5">{t("workflow.badge")}</Badge>
            <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight">{t("workflow.title")}</h2>
            <p className="text-muted-foreground max-w-[600px] font-medium leading-relaxed">
              {t("workflow.desc")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full relative">
            <div className="hidden md:block absolute top-[44px] left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            {[
              { icon: MessageSquare, label: t("workflow.step1"), desc: t("workflow.step1Desc") },
              { icon: Brain, label: t("workflow.step2"), desc: t("workflow.step2Desc") },
              { icon: Calendar, label: t("workflow.step3"), desc: t("workflow.step3Desc") },
              { icon: LayoutDashboard, label: t("workflow.step4"), desc: t("workflow.step4Desc") }
            ].map((step, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center gap-6 group">
                <div className="w-24 h-24 rounded-[2rem] bg-[#111827] border border-white/10 flex items-center justify-center text-[#13a4ec] group-hover:border-[#13a4ec] group-hover:bg-[#13a4ec]/10 transition-all duration-500 shadow-xl">
                  <step.icon className="h-10 w-10" />
                </div>
                <div className="text-center flex flex-col gap-1">
                  <h3 className="font-black text-foreground text-lg tracking-tight uppercase">{step.label}</h3>
                  <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
          FEATURES SECTION
      ────────────────────────────────────────────── */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="flex flex-col gap-4">
              <Badge variant="outline" className="border-white/10 text-muted-foreground px-4 py-1.5 rounded-full text-[10px] font-black tracking-[0.2em] uppercase w-fit">{t("features.badge")}</Badge>
              <h2 className="text-4xl md:text-6xl font-black text-foreground tracking-tight">{t("features.title")}</h2>
            </div>
            <p className="text-muted-foreground max-w-[400px] font-medium leading-relaxed mb-2">
              {t("features.desc")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: t("features.f1Title"), desc: t("features.f1Desc"), icon: LayoutDashboard },
              { title: t("features.f2Title"), desc: t("features.f2Desc"), icon: Calendar },
              { title: t("features.f3Title"), desc: t("features.f3Desc"), icon: Users },
              { title: t("features.f4Title"), desc: t("features.f4Desc"), icon: Clock },
              { title: t("features.f5Title"), desc: t("features.f5Desc"), icon: BarChart3 },
              { title: t("features.f6Title"), desc: t("features.f6Desc"), icon: Brain }
            ].map((feature, i) => (
              <Card key={i} className="bg-card border-white/5 rounded-[2.5rem] hover:border-[#13a4ec]/40 transition-all duration-500 group overflow-hidden">
                <CardContent className="p-8 flex flex-col gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-[#13a4ec] group-hover:bg-[#13a4ec] group-hover:text-foreground transition-all duration-500">
                    <feature.icon className="h-7 w-7" />
                  </div>
                  <div className="flex flex-col gap-3">
                    <h3 className="text-2xl font-black text-foreground tracking-tight uppercase">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed font-medium">{feature.desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
          BENEFITS SECTION
      ────────────────────────────────────────────── */}
      <section id="benefits" className="py-20 bg-[#13a4ec]/[0.02] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-24">
          <div className="max-w-[800px] flex flex-col gap-6">
            <Badge variant="outline" className="border-green-500/20 text-green-500 px-4 py-1.5 rounded-full text-[10px] font-black tracking-[0.2em] uppercase w-fit bg-green-500/5">{t("benefits.badge")}</Badge>
            <h2 className="text-4xl md:text-6xl font-black text-foreground tracking-tight leading-[1.1]">
              {t("benefits.title1")} <br />
              <span className="text-[#13a4ec]">{t("benefits.title2")}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="bg-card border border-white/5 rounded-[2.5rem] p-10 flex flex-col gap-4 shadow-xl">
                <span className="text-6xl font-black text-[#13a4ec] tracking-tighter">-40%</span>
                <h3 className="text-xl font-black text-foreground uppercase tracking-widest">{t("benefits.noShows")}</h3>
                <p className="text-muted-foreground font-medium">{t("benefits.noShowsDesc")}</p>
              </div>
              <div className="bg-card border border-white/5 rounded-[2.5rem] p-10 flex flex-col gap-4 shadow-xl">
                <span className="text-6xl font-black text-[#13a4ec] tracking-tighter">3x</span>
                <h3 className="text-xl font-black text-foreground uppercase tracking-widest">{t("benefits.speed")}</h3>
                <p className="text-muted-foreground font-medium">{t("benefits.speedDesc")}</p>
              </div>
            </div>

            <div className="lg:col-span-7 bg-card border border-white/5 rounded-[3rem] p-8 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#13a4ec]/10 blur-[60px] rounded-full" />
              <div className="relative z-10 flex flex-col h-full gap-8">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-black text-foreground uppercase tracking-[0.2em]">{t("dashboard.weeklyChart")}</span>
                    <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mt-0.5">{t("dashboard.growth")}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-[#13a4ec]" />
                      <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">{t("benefits.aiBooked")}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-white/20" />
                      <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">{t("benefits.manual")}</span>
                    </div>
                  </div>
                </div>

                <div className="flex-1 flex items-end gap-1.5 sm:gap-3 min-h-[200px] sm:min-h-[280px] border-b border-white/5 pb-2">
                  {[35, 60, 45, 80, 55, 90, 75, 95, 85, 100].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col justify-end gap-1 sm:gap-1.5 h-full">
                      <div className="w-full bg-[#13a4ec] rounded-t-sm sm:rounded-t-lg group-hover:brightness-110 transition-all duration-700" style={{ height: `${h}%` }} />
                      <div className="w-full bg-white/5 rounded-full" style={{ height: `${h * 0.28}%` }} />
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-6 pt-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{t("benefits.hoursSaved")}</span>
                    <span className="text-2xl font-black text-foreground tracking-widest">2,480 hrs</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{t("benefits.satisfaction")}</span>
                    <span className="text-2xl font-black text-green-500 tracking-widest">4.9 / 5</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
          CTA SECTION
      ────────────────────────────────────────────── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#13a4ec] rounded-[4rem] px-8 py-24 md:py-32 flex flex-col items-center text-center gap-12 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2 group-hover:bg-white/15 transition-all duration-700" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-black/10 blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2" />

            <Badge className="bg-white text-[#13a4ec] hover:bg-white px-6 py-2 rounded-full text-xs font-black tracking-[0.3em] uppercase shadow-lg">{t("cta.badge")}</Badge>

            <h2 className="text-5xl md:text-8xl font-black text-foreground tracking-tighter leading-[0.9]">
              {t("cta.title1")} <br /> {t("cta.title2")}
            </h2>

            <p className="text-primary-foreground/80 text-lg md:text-xl max-w-[700px] font-bold leading-relaxed px-4">
              {t("cta.desc")}
            </p>

            <div className="flex flex-col items-center gap-6">
              <Button className="bg-white text-[#13a4ec] hover:scale-105 active:scale-95 transition-all duration-300 px-8 sm:px-12 h-16 sm:h-20 text-xl sm:text-2xl font-black rounded-xl sm:rounded-[2rem] shadow-2xl flex items-center gap-3">
                {t("cta.cta")}
                <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6 stroke-[3]" />
              </Button>
              <div className="text-primary-foreground/50 text-[10px] font-black uppercase tracking-[0.3em]">
                {t("cta.setupInfo")}
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
