import React from 'react';
import { Users, Calendar, Clock, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const StatCard = ({ title, value, change, trend, icon: Icon, darkMode }: any) => (
    <div className={`p-6 rounded-2xl border transition-colors ${darkMode ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200'}`}>
        <div className="flex items-center justify-between mb-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${darkMode ? 'bg-blue-500/10' : 'bg-blue-50'}`}>
                <Icon className={`w-5 h-5 ${darkMode ? 'text-blue-500' : 'text-blue-600'}`} />
            </div>
            <div className={`flex items-center gap-1 text-sm font-medium ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                {trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                <span>{change}</span>
            </div>
        </div>
        <p className={`text-sm mb-1 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{title}</p>
        <h3 className={`text-3xl font-bold tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>{value}</h3>
    </div>
);

const Dashboard = ({ darkMode, language }: any) => {
    return (
        <div className={`min-h-screen pt-24 pb-12 transition-colors ${darkMode ? 'bg-slate-950 text-slate-200' : 'bg-slate-50 text-slate-900'}`}>
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between mb-8">
                    <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>Dashboard</h1>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-colors">
                        Add Appointment
                    </button>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <StatCard title="Total Patients" value="1,248" change="+12%" trend="up" icon={Users} darkMode={darkMode} />
                    <StatCard title="Appointments Today" value="42" change="+4" trend="up" icon={Calendar} darkMode={darkMode} />
                    <StatCard title="Average Wait Time" value="14min" change="-2min" trend="down" icon={Clock} darkMode={darkMode} />
                </div>

                {/* Main Content Area */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Recent Activity */}
                    <div className={`lg:col-span-2 rounded-2xl border ${darkMode ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200'}`}>
                        <div className={`px-6 py-5 border-b ${darkMode ? 'border-white/10' : 'border-slate-200'}`}>
                            <h2 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>Upcoming Appointments</h2>
                        </div>
                        <div className="p-0">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className={`px-6 py-4 flex items-center justify-between border-b last:border-0 ${darkMode ? 'border-white/10 hover:bg-slate-800/50' : 'border-slate-200 hover:bg-slate-50'} transition-colors gap-4`}>
                                    <div className="flex items-center gap-4">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${darkMode ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-700'}`}>
                                            JD
                                        </div>
                                        <div>
                                            <p className={`font-semibold text-sm ${darkMode ? 'text-white' : 'text-slate-900'}`}>John Doe {i}</p>
                                            <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>General Checkup</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className={`font-medium text-sm ${darkMode ? 'text-white' : 'text-slate-900'}`}>09:00 AM</p>
                                        <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Today</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar Area */}
                    <div className={`rounded-2xl border p-6 ${darkMode ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200'}`}>
                        <h2 className={`text-lg font-bold mb-6 ${darkMode ? 'text-white' : 'text-slate-900'}`}>Quick Actions</h2>
                        <div className="space-y-3">
                            {['Register Patient', 'View Schedule', 'Send Reminder', 'Settings'].map((action, i) => (
                                <button key={i} className={`w-full text-left px-4 py-3 rounded-xl border transition-colors text-sm font-medium ${darkMode
                                        ? 'bg-slate-800 border-white/5 hover:border-blue-500 text-white hover:bg-slate-800/80'
                                        : 'bg-white border-slate-200 hover:border-blue-500 text-slate-700 hover:bg-slate-50'
                                    }`}>
                                    {action}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
