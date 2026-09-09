import React, { useState } from 'react';
import { StatsOverview } from './StatsOverview';
import { EquipmentList } from './EquipmentList';
import { PROVIDER_STATS } from './mockData';

interface ProviderDashboardProps {
  onToggleToRenter?: () => void;
}

export const ProviderDashboard: React.FC<ProviderDashboardProps> = ({ onToggleToRenter }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'equipment'>('equipment');

  return (
    <div className="w-full min-h-screen bg-white text-black flex flex-col antialiased">
      
      {/* ── Full-Width Black & White Topbar ── */}
      <header className="w-full border-b border-neutral-200 bg-white sticky top-0 z-30 px-6 lg:px-10 py-3.5 flex items-center justify-between">
        
        {/* Left: Brand & Navigation */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white font-bold text-xs tracking-tight">
              RL
            </div>
            <div>
              <span className="text-xs font-bold text-black tracking-widest block uppercase">
                ResourceLink
              </span>
              <span className="text-[10px] text-neutral-500 font-mono">
                NODE: {PROVIDER_STATS.nodeId}
              </span>
            </div>
          </div>

          {/* Clean Segmented Navigation */}
          <nav className="flex items-center gap-1.5 bg-neutral-100 p-1 rounded-lg border border-neutral-200">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs rounded-md font-semibold transition ${
                activeTab === 'dashboard'
                  ? 'bg-white text-black shadow-sm'
                  : 'text-neutral-600 hover:text-black'
              }`}
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 18 18" fill="currentColor">
                <rect x="1" y="1" width="7" height="7" rx="1.5" />
                <rect x="10" y="1" width="7" height="7" rx="1.5" />
                <rect x="1" y="10" width="7" height="7" rx="1.5" />
                <rect x="10" y="10" width="7" height="7" rx="1.5" />
              </svg>
              Provider Analytics
            </button>

            <button
              onClick={() => setActiveTab('equipment')}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs rounded-md font-semibold transition ${
                activeTab === 'equipment'
                  ? 'bg-white text-black shadow-sm'
                  : 'text-neutral-600 hover:text-black'
              }`}
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 18 18" fill="currentColor">
                <rect x="3" y="2" width="12" height="14" rx="2" opacity=".3" />
                <path d="M6 6h6M6 9h6M6 12h4" stroke="currentColor" strokeWidth="1.2" fill="none" />
              </svg>
              Machine Inventory
            </button>
          </nav>
        </div>

        {/* Right: Institutional Profile & Switch Mode */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5 text-xs">
            <div className="w-7 h-7 rounded-full bg-neutral-100 border border-neutral-300 flex items-center justify-center font-bold text-[10px] text-neutral-800">
              SRM
            </div>
            <span className="font-semibold text-black hidden md:inline">
              {PROVIDER_STATS.institutionName}
            </span>
          </div>

          <button
            onClick={onToggleToRenter}
            className="py-1.5 px-3 bg-black hover:bg-neutral-800 text-white text-xs font-semibold rounded-md transition shadow-sm"
          >
            ⇄ Switch to Renter
          </button>
        </div>
      </header>

      {/* ── Full Screen Content Container ── */}
      <main className="w-full flex-1 px-6 lg:px-10 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-extrabold text-black tracking-tight">
            {activeTab === 'dashboard' ? 'Capacity & Yield Analytics' : 'Institutional Infrastructure'}
          </h1>
          <p className="text-xs font-medium text-neutral-600 mt-1">
            {activeTab === 'dashboard'
              ? 'Real-time performance, machine hours, and automated settlements.'
              : 'Configure equipment operational slots, telemetry, and on-demand capacity rates.'}
          </p>
        </div>

        <div className="w-full">
          {activeTab === 'dashboard' ? <StatsOverview /> : <EquipmentList />}
        </div>
      </main>
    </div>
  );
};