import React, { useState } from 'react';
import { MOCK_EQUIPMENT, type EquipmentItem } from './mockData';
import { Plus, Search, MapPin, Wrench, CheckCircle, Clock } from 'lucide-react';

export const EquipmentList: React.FC = () => {
  const [items] = useState<EquipmentItem[]>(MOCK_EQUIPMENT);
  const [filter, setFilter] = useState('');

  const filteredItems = items.filter(i => 
    i.name.toLowerCase().includes(filter.toLowerCase()) || 
    i.category.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="space-y-4 animate-in fade-in duration-500">
      {/* Header Controls */}
      <div className="flex flex-col md:flex-row justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search listed assets or categories..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition"
          />
        </div>
        <button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium px-4 py-2 rounded-xl text-sm flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition">
          <Plus className="w-4 h-4" /> Add New Infrastructure
        </button>
      </div>

      {/* Equipment Table/Card List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-mono px-2.5 py-0.5 rounded-md bg-slate-800 text-cyan-400 border border-slate-700">
                  {item.id}
                </span>
                <h3 className="font-semibold text-slate-100 text-lg mt-2">{item.name}</h3>
                <p className="text-slate-400 text-xs">{item.modelNumber}</p>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 ${
                item.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                item.status === 'Rented' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' :
                'bg-amber-500/10 text-amber-400 border border-amber-500/20'
              }`}>
                {item.status === 'Active' && <CheckCircle className="w-3 h-3" />}
                {item.status === 'Rented' && <Clock className="w-3 h-3 animate-spin" />}
                {item.status === 'Maintenance' && <Wrench className="w-3 h-3" />}
                {item.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs bg-slate-950 p-3 rounded-xl border border-slate-800/80">
              <div>
                <span className="text-slate-500 block">Rate/Hour</span>
                <span className="text-slate-200 font-bold">{item.ratePerHour} ALGO</span>
              </div>
              <div>
                <span className="text-slate-500 block">Total Yield</span>
                <span className="text-emerald-400 font-bold">{item.totalEarningsAlgo} ALGO</span>
              </div>
            </div>

            {/* Utilization Bar */}
            <div>
              <div className="flex justify-between text-xs text-slate-400 mb-1">
                <span>Capacity Efficiency</span>
                <span className="font-mono text-slate-200">{item.utilizationRate}%</span>
              </div>
              <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-cyan-500 h-full rounded-full transition-all duration-1000"
                  style={{ width: `${item.utilizationRate}%` }}
                ></div>
              </div>
            </div>

            <div className="flex items-center gap-1 text-xs text-slate-500 pt-2 border-t border-slate-800/60">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              {item.location}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};