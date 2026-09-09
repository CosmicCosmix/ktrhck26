import React, { useState } from 'react';
import { StatsOverview } from './StatsOverview';
import { EquipmentList } from './EquipmentList';
import { LayoutDashboard, Layers, ArrowLeftRight, Building } from 'lucide-react';

interface ProviderDashboardProps {
  onToggleToRenter?: () => void;
}

export const ProviderDashboard: React.FC<ProviderDashboardProps> = ({ onToggleToRenter }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'equipment'>('dashboard');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Provider Header */}
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-cyan-500/20">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-base bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                ResourceLink
              </span>
              <span className="block text-[10px] text-cyan-400 font-mono tracking-wider">PROVIDER PORTAL</span>
            </div>
          </div>

          {/* Switch to Rental Mode Toggle */}
          <button 
            onClick={onToggleToRenter}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold px-3 py-2 rounded-xl border border-slate-700 text-slate-300 hover:text-white transition"
          >
            <ArrowLeftRight className="w-3.5 h-3.5 text-cyan-400" />
            Switch to Rental Mode
          </button>
        </div>
      </header>

      {/* Portal Container */}
      <div className="max-w-7xl w-full mx-auto p-4 md:p-6 flex-1 space-y-6">
        {/* Navigation Tabs */}
        <div className="flex space-x-2 border-b border-slate-800 pb-3">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition ${
              activeTab === 'dashboard'
                ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            Statistics
          </button>
          <button
            onClick={() => setActiveTab('equipment')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition ${
              activeTab === 'equipment'
                ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-4 h-4" />
            Equipment
          </button>
        </div>

        {/* Tab View Switcher */}
        {activeTab === 'dashboard' ? <StatsOverview /> : <EquipmentList />}
      </div>
    </div>
  );
};