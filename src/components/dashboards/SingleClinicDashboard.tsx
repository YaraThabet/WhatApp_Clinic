"use client";

import React from 'react';

/* KPI Card Component */
function Card({ icon, title, value }: { icon: string; title: string; value: string }) {
    return (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-500 mb-4">
                <span className="material-symbols-outlined">{icon}</span>
            </div>
            <h3 className="text-slate-400 text-sm font-medium">{title}</h3>
            <p className="text-3xl font-bold mt-1 text-white">{value}</p>
        </div>
    );
}

/* Schedule Item Component */
function ScheduleItem({ time, name, type, status }: { time: string; name: string; type: string; status: string }) {
    const statusColors = {
        'DONE': 'text-emerald-500 border-emerald-500/20 bg-emerald-500/5',
        'ACTIVE': 'text-blue-500 border-blue-500/20 bg-blue-500/5',
        'WAITING': 'text-slate-400 border-slate-700 bg-slate-800/50'
    }[status] || 'text-slate-400 border-slate-700';

    return (
        <div className="p-4 flex items-center gap-4 hover:bg-slate-800/50 transition-colors group">
            <div className="min-w-[60px] text-center">
                <p className="text-xs font-bold text-white">{time}</p>
                <p className="text-[10px] text-slate-500 font-bold">AM</p>
            </div>
            <div className="flex-1">
                <h5 className="text-sm font-bold text-white">{name}</h5>
                <p className="text-[10px] text-slate-400 font-medium">{type}</p>
            </div>
            <span className={`text-[10px] font-black px-2 py-1 border rounded uppercase tracking-wider ${statusColors}`}>
                {status}
            </span>
        </div>
    );
}

export default function SingleClinicDashboard() {
    return (
        <div className="min-h-screen flex overflow-hidden bg-slate-950 text-slate-100 font-sans">

            {/* Sidebar */}
            <aside className="w-64 border-r border-slate-800 bg-slate-900 flex flex-col shrink-0">

                <div className="p-6 flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                        <span className="material-symbols-outlined text-white text-xl">
                            chat_bubble
                        </span>
                    </div>
                    <h1 className="text-xl font-black tracking-tighter text-white uppercase italic">WhatsClinic</h1>
                </div>

                <nav className="flex-1 px-4 space-y-1 mt-4">
                    <button className="flex w-full items-center gap-3 px-4 py-3 bg-blue-600/10 text-blue-500 rounded-xl font-bold text-sm transition-all border border-blue-500/10">
                        <span className="material-symbols-outlined text-xl">dashboard</span>
                        Dashboard
                    </button>

                    <button className="flex w-full items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800 rounded-xl font-bold text-sm transition-all">
                        <span className="material-symbols-outlined text-xl">calendar_today</span>
                        Schedule
                    </button>

                    <button className="flex w-full items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800 rounded-xl font-bold text-sm transition-all">
                        <span className="material-symbols-outlined text-xl">group</span>
                        Patients
                    </button>

                    <button className="flex w-full items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800 rounded-xl font-bold text-sm transition-all">
                        <span className="material-symbols-outlined text-xl">settings</span>
                        Settings
                    </button>
                </nav>

                {/* Profile */}
                <div className="p-4 border-t border-slate-800">
                    <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-4">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="relative">
                                <img
                                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed"
                                    alt="doctor"
                                    className="w-10 h-10 rounded-xl bg-slate-700"
                                />
                                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 border-2 border-slate-800 rounded-full" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-white">Dr. Ahmed Khaled</p>
                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">
                                    Chief Medical Officer
                                </p>
                            </div>
                        </div>

                        <button className="w-full py-2.5 text-xs text-slate-400 border border-slate-700/50 rounded-lg flex items-center justify-center gap-2 hover:text-rose-400 hover:border-rose-400/20 hover:bg-rose-400/5 transition-all font-bold uppercase tracking-widest">
                            <span className="material-symbols-outlined text-sm">logout</span>
                            Sign Out
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0">

                {/* Header */}
                <header className="h-16 border-b border-slate-800 bg-slate-900 px-8 flex items-center justify-between sticky top-0 z-10">

                    <div className="relative w-96 group">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors">
                            search
                        </span>

                        <input
                            className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/40 transition-all font-medium"
                            placeholder="Search patients, bookings..."
                        />
                    </div>

                    <div className="flex items-center gap-3">

                        <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-xs font-bold text-slate-300 transition-all">
                            <span className="material-symbols-outlined text-base">person_add</span>
                            New Patient
                        </button>

                        <button className="flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-600/20 transition-all">
                            <span className="material-symbols-outlined text-base">add</span>
                            New Booking
                        </button>

                    </div>

                </header>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto p-8 space-y-8">

                    {/* KPI Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                        <Card icon="groups" title="Total Patients" value="1,284" />
                        <Card icon="event_available" title="Today's Appointments" value="18" />
                        <Card icon="pending_actions" title="Pending Bookings" value="24" />
                        <Card icon="payments" title="Monthly Revenue" value="$42,850" />
                    </div>

                    {/* Schedule Card */}
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl shadow-black/20">

                        <div className="p-6 border-b border-slate-800 flex justify-between items-center">
                            <h3 className="font-bold text-white uppercase tracking-widest text-sm">Today&apos;s Schedule</h3>
                            <button className="text-blue-500 text-xs font-black uppercase tracking-widest hover:text-blue-400 transition-colors">View All</button>
                        </div>

                        <div className="divide-y divide-slate-800/50">
                            <ScheduleItem
                                time="09:00"
                                name="Johnathan Doe"
                                type="Regular Checkup"
                                status="DONE"
                            />

                            <ScheduleItem
                                time="10:30"
                                name="Emma Watson"
                                type="MRI Consultation"
                                status="ACTIVE"
                            />

                            <ScheduleItem
                                time="11:45"
                                name="Robert Fox"
                                type="Initial Screening"
                                status="WAITING"
                            />

                            <ScheduleItem
                                time="12:30"
                                name="Sarah Wilson"
                                type="Post-Surgery Follow-up"
                                status="WAITING"
                            />
                        </div>

                    </div>

                </div>
            </main>
        </div>
    );
}
