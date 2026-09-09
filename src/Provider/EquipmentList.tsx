import React, { useState } from 'react';
import { MOCK_EQUIPMENT, type EquipmentItem } from './mockData';

export const EquipmentList: React.FC = () => {
  const [items] = useState<EquipmentItem[]>(MOCK_EQUIPMENT);
  const [query, setQuery] = useState('');
  const [selectedMachine, setSelectedMachine] = useState<EquipmentItem | null>(null);

  const filtered = items.filter(
    (e) =>
      e.name.toLowerCase().includes(query.toLowerCase()) ||
      e.category.toLowerCase().includes(query.toLowerCase()) ||
      e.id.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="w-full space-y-6">
      {/* Search Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-neutral-200">
        <div>
          <h2 className="text-base font-bold text-black tracking-tight">
            Registered Institutional Units
          </h2>
          <p className="text-xs font-medium text-neutral-600">
            Live infrastructure and verified medical equipment on the network
          </p>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search by equipment, wing, or category..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full sm:w-72 bg-neutral-50 border border-neutral-300 rounded-md px-3 py-2 text-xs font-medium text-black placeholder-neutral-500 focus:outline-none focus:border-black focus:bg-white transition"
          />
          <button className="bg-black hover:bg-neutral-800 text-white text-xs font-semibold px-4 py-2 rounded-md transition shrink-0 shadow-sm">
            + Register New Machine
          </button>
        </div>
      </div>

      {/* Equipment Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="w-full border border-neutral-200 rounded-xl overflow-hidden flex flex-col justify-between hover:border-black transition duration-200 bg-white"
          >
            <div>
              {/* Image Preview Container */}
              <div className="relative h-48 w-full bg-neutral-100 overflow-hidden border-b border-neutral-200">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-full object-cover grayscale-15 hover:grayscale-0 transition-all duration-300"
                />

                {/* Status Indicator */}
                <span
                  className={`absolute top-3 right-3 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border shadow-sm ${
                    item.status === 'Active'
                      ? 'bg-white text-black border-black font-semibold'
                      : item.status === 'Rented'
                      ? 'bg-black text-white border-black'
                      : 'bg-neutral-200 text-neutral-800 border-neutral-300'
                  }`}
                >
                  {item.status}
                </span>

                <span className="absolute bottom-3 left-3 text-[10px] font-mono font-bold bg-white/95 text-black px-2 py-0.5 rounded border border-neutral-200">
                  {item.id}
                </span>
              </div>

              {/* Machine Details */}
              <div className="p-5">
                <div className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">
                  {item.category}
                </div>
                <h3 className="text-base font-bold text-black mt-1 tracking-tight">{item.name}</h3>
                <p className="text-xs text-neutral-600 font-medium">{item.modelNumber}</p>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-3 my-4 p-3 bg-neutral-50 rounded-lg border border-neutral-200 text-xs">
                  <div>
                    <span className="text-neutral-500 block text-[10px] uppercase font-semibold">
                      Hourly Rate
                    </span>
                    <span className="font-extrabold text-black text-sm">
                      {item.ratePerHour} ALGO
                    </span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block text-[10px] uppercase font-semibold">
                      Total Yield
                    </span>
                    <span className="font-extrabold text-black text-sm">
                      {item.totalEarningsAlgo} ALGO
                    </span>
                  </div>
                </div>

                {/* Capacity Progress Bar */}
                <div>
                  <div className="flex justify-between text-xs font-semibold text-black mb-1.5">
                    <span>Capacity Allocated</span>
                    <span className="font-mono">{item.utilizationRate}%</span>
                  </div>
                  <div className="w-full bg-neutral-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-black h-full rounded-full transition-all duration-500"
                      style={{ width: `${item.utilizationRate}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Card Action Footer */}
            <div className="text-xs text-neutral-600 px-5 py-3.5 bg-neutral-50 border-t border-neutral-200 flex items-center justify-between font-medium">
              <span>📍 {item.location}</span>
              <button
                onClick={() => setSelectedMachine(item)}
                className="text-black font-bold hover:underline text-xs"
              >
                Schedule Slots →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal View */}
      {selectedMachine && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white border border-black rounded-xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-mono bg-neutral-100 text-black px-2 py-0.5 rounded border border-neutral-300">
                  {selectedMachine.id}
                </span>
                <h3 className="text-base font-bold text-black mt-2">{selectedMachine.name}</h3>
                <p className="text-xs text-neutral-600">{selectedMachine.modelNumber}</p>
              </div>
              <button
                onClick={() => setSelectedMachine(null)}
                className="text-neutral-500 hover:text-black text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200 text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-neutral-500">Location:</span>
                <span className="font-semibold text-black">{selectedMachine.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Rate:</span>
                <span className="font-bold text-black">{selectedMachine.ratePerHour} ALGO/hr</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Total Yield:</span>
                <span className="font-bold text-black">{selectedMachine.totalEarningsAlgo} ALGO</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedMachine(null)}
              className="w-full py-2 text-xs font-semibold bg-black text-white rounded-md hover:bg-neutral-800 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EquipmentList;