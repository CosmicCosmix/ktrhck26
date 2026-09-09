import { useState } from 'react';
import { ProviderDashboard } from './ProviderDashboard';

export function MainApp() {
  const [mode, setMode] = useState<'provider' | 'renter'>('provider');

  if (mode === 'renter') {
    return (
      <div className="min-h-screen bg-white text-[#273240] flex flex-col items-center justify-center p-6 text-center space-y-4">
        <h2 className="text-xl font-bold text-[#1f384c]">Renter View Mode</h2>
        <p className="text-xs text-[#737b8b] max-w-sm">
          You are currently in the equipment discovery and rental workflow.
        </p>
        <button
          onClick={() => setMode('provider')}
          className="bg-[#5a67ba] hover:bg-[#4d59a8] text-white text-xs font-semibold px-4 py-2.5 rounded transition"
        >
          Return to Provider Mode
        </button>
      </div>
    );
  }

  return <ProviderDashboard onToggleToRenter={() => setMode('renter')} />;
}

export default MainApp;