import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  BarChart, Bar 
} from 'recharts';
import { Wallet, Activity, PackageCheck, Zap } from 'lucide-react';
import { PROVIDER_STATS } from './mockData';

export const StatsOverview: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Top Stat Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl relative overflow-hidden backdrop-blur-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-medium text-slate-400">Total Revenue</p>
              <h3 className="text-2xl font-bold text-slate-100 mt-1">{PROVIDER_STATS.totalRevenueAlgo} ALGO</h3>
            </div>
            <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <Wallet className="w-5 h-5" />
            </div>
          </div>
          <span className="text-xs text-emerald-400 mt-3 inline-block font-medium">↑ +14.2% from last month</span>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl relative overflow-hidden backdrop-blur-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-medium text-slate-400">Active Rentals</p>
              <h3 className="text-2xl font-bold text-slate-100 mt-1">{PROVIDER_STATS.activeRentals}</h3>
            </div>
            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Zap className="w-5 h-5" />
            </div>
          </div>
          <span className="text-xs text-slate-400 mt-3 inline-block">Across 2 institutions</span>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl relative overflow-hidden backdrop-blur-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-medium text-slate-400">Listed Infrastructure</p>
              <h3 className="text-2xl font-bold text-slate-100 mt-1">{PROVIDER_STATS.totalEquipment} Units</h3>
            </div>
            <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
              <PackageCheck className="w-5 h-5" />
            </div>
          </div>
          <span className="text-xs text-slate-400 mt-3 inline-block">1 undergoing maintenance</span>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl relative overflow-hidden backdrop-blur-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-medium text-slate-400">Overall Utilization</p>
              <h3 className="text-2xl font-bold text-slate-100 mt-1">{PROVIDER_STATS.overallUtilization}%</h3>
            </div>
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <Activity className="w-5 h-5" />
            </div>
          </div>
          <span className="text-xs text-emerald-400 mt-3 inline-block font-medium">Optimal capacity range</span>
        </div>
      </div>

      {/* Graphs Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Revenue Area Chart */}
        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl backdrop-blur-sm">
          <h4 className="text-sm font-semibold text-slate-200 mb-4">Monthly Revenue Flow (ALGO)</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={PROVIDER_STATS.monthlyEarnings}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem' }}
                  labelStyle={{ color: '#f8fafc' }}
                />
                <Area type="monotone" dataKey="earnings" stroke="#06b6d4" strokeWidth={2.5} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Weekly Utilization Bar Chart */}
        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl backdrop-blur-sm">
          <h4 className="text-sm font-semibold text-slate-200 mb-4">Weekly Capacity Usage (%)</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={PROVIDER_STATS.utilizationTrend}>
                <XAxis dataKey="day" stroke="#64748b" fontSize={12} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem' }}
                  cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
                />
                <Bar dataKey="usage" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};