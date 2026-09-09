import React, { useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';
import { PROVIDER_STATS, MOCK_EQUIPMENT } from './mockData';

export const StatsOverview: React.FC = () => {
  const [activeSegment, setActiveSegment] = useState(PROVIDER_STATS.timeDistribution[0]);

  return (
    <div className="w-full space-y-10">
      {/* Upper Grid: Revenue & Time-Slot Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full">
        {/* Infrastructure Revenue */}
        <div className="border border-neutral-200 rounded-xl p-6 flex flex-col justify-between bg-white">
          <div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-bold text-black uppercase tracking-wider">
                  Infrastructure Revenue
                </h3>
                <div className="text-2xl font-black text-black my-1 tracking-tight">
                  {PROVIDER_STATS.totalRevenueAlgo.toLocaleString()} ALGO
                </div>
                <div className="flex items-center gap-1.5 text-xs font-semibold mb-1">
                  <span className="text-black bg-neutral-100 px-1.5 py-0.5 rounded border border-neutral-300">
                    ↑ {PROVIDER_STATS.growthPercentage}%
                  </span>
                  <span className="text-neutral-500">vs last cycle</span>
                </div>
                <p className="text-xs text-neutral-600 mt-1">Verified on Algorand Testnet (x402)</p>
              </div>
              <button className="text-xs font-bold text-black border-b border-black pb-0.5 hover:opacity-75">
                Export Ledger
              </button>
            </div>

            <div className="h-44 w-full mt-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={PROVIDER_STATS.dailyCapacityTrend} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                  <XAxis dataKey="day" stroke="#737373" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#000000', borderColor: '#000000', borderRadius: '6px', color: '#ffffff', fontSize: '11px' }}
                    itemStyle={{ color: '#ffffff' }}
                    formatter={(value: any) => [`${value} ALGO`, 'Revenue']}
                  />
                  <Bar dataKey="current" fill="#000000" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="previous" fill="#d4d4d4" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="flex gap-6 mt-4 pt-4 border-t border-neutral-100 text-xs font-medium text-neutral-700">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-black"></span> Current Cycle
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-neutral-300"></span> Previous Cycle
            </div>
          </div>
        </div>

        {/* Time-Slot Allocation Donut */}
        <div className="border border-neutral-200 rounded-xl p-6 flex flex-col justify-between bg-white">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-sm font-bold text-black uppercase tracking-wider">
                Time-Slot Allocation
              </h3>
              <p className="text-xs text-neutral-600 mt-0.5">Capacity distribution across active shifts</p>
            </div>
            <button className="text-xs font-bold text-black border-b border-black pb-0.5 hover:opacity-75">
              Shift Matrix
            </button>
          </div>

          <div className="flex flex-col items-center">
            <div className="relative w-44 h-44 my-2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={PROVIDER_STATS.timeDistribution}
                    innerRadius={50}
                    outerRadius={68}
                    paddingAngle={3}
                    dataKey="value"
                    onMouseEnter={(_, index) => setActiveSegment(PROVIDER_STATS.timeDistribution[index])}
                  >
                    <Cell fill="#000000" />
                    <Cell fill="#737373" />
                    <Cell fill="#d4d4d4" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>

              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                <span className="text-lg font-black text-black">{activeSegment.value}%</span>
                <span className="block text-[9px] uppercase font-bold text-neutral-500">RUNTIME</span>
              </div>
            </div>

            <div className="flex justify-between w-full mt-4 text-xs">
              {PROVIDER_STATS.timeDistribution.map((item, idx) => (
                <div
                  key={item.name}
                  onClick={() => setActiveSegment(item)}
                  className="text-center cursor-pointer hover:opacity-80 p-2 rounded-lg"
                >
                  <div className="flex items-center gap-1.5 justify-center text-black font-semibold">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: idx === 0 ? '#000' : idx === 1 ? '#737373' : '#d4d4d4' }}
                    />
                    <span>{item.name.split(' ')[0]}</span>
                  </div>
                  <div className="font-extrabold text-neutral-900 mt-1">{item.value}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <hr className="border-t border-neutral-200" />

      {/* Lower Section: High-Demand Units & Continuous Volume Flow */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full">
        {/* Most Utilized Equipment List */}
        <div className="border border-neutral-200 rounded-xl p-6 bg-white">
          <h3 className="text-sm font-bold text-black uppercase tracking-wider">
            High-Demand Infrastructure
          </h3>
          <p className="text-xs text-neutral-600 mb-4 mt-0.5">Top-producing hardware across the network</p>

          <div className="divide-y divide-neutral-100">
            {MOCK_EQUIPMENT.slice(0, 4).map((item) => (
              <div key={item.id} className="flex items-center gap-4 py-3">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-12 h-12 rounded-md object-cover border border-neutral-200 grayscale-20"
                />
                <div className="flex-1">
                  <h4 className="text-xs font-bold text-black">{item.name}</h4>
                  <p className="text-[11px] text-neutral-500">{item.location}</p>
                </div>
                <div className="text-right">
                  <div className="text-xs font-extrabold text-black">{item.ratePerHour} ALGO/hr</div>
                  <span className="text-[10px] font-semibold text-neutral-600">
                    {item.utilizationRate}% Capacity
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hourly Lease Volume Line Chart */}
        <div className="border border-neutral-200 rounded-xl p-6 bg-white flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-bold text-black uppercase tracking-wider">
                  Hourly Utilization Rhythm
                </h3>
                <div className="text-xl font-black text-black my-1">
                  {PROVIDER_STATS.totalLeasedHours} Operating Hours
                </div>
                <p className="text-xs text-neutral-600">Concurrent fleet usage across lab bays</p>
              </div>
              <button className="text-xs font-bold text-black border-b border-black pb-0.5 hover:opacity-75">
                Detailed Logs
              </button>
            </div>

            <div className="h-36 mt-4 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={PROVIDER_STATS.hourlyLeaseVolume}>
                  <XAxis dataKey="time" stroke="#737373" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#000000', borderColor: '#000000', borderRadius: '6px', color: '#ffffff', fontSize: '11px' }}
                    itemStyle={{ color: '#ffffff' }}
                    formatter={(value: any) => [`${value}% Capacity`, 'Live Load']}
                  />
                  <Line type="monotone" dataKey="current" stroke="#000000" strokeWidth={2.5} dot={{ r: 3, fill: '#000' }} />
                  <Line type="monotone" dataKey="previous" stroke="#a3a3a3" strokeWidth={1.5} strokeDasharray="4 4" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="flex gap-6 mt-4 pt-4 border-t border-neutral-100 text-xs font-medium text-neutral-700">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-black"></span> Live Load
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-neutral-400"></span> Baseline Benchmark
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsOverview;