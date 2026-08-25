'use client';

import React from 'react';
import { Gauge, Clock, TrendingUp, AlertOctagon, CheckCircle2 } from 'lucide-react';

const STAGES = [
  { name: 'Discovery', avgDays: 4.2, benchmark: 5.0, deals: 120, value: '$2.54M', status: 'ON_TRACK' },
  { name: 'Contacted', avgDays: 6.8, benchmark: 7.0, deals: 95, value: '$1.87M', status: 'ON_TRACK' },
  { name: 'Qualified', avgDays: 8.5, benchmark: 8.0, deals: 63, value: '$1.23M', status: 'ON_TRACK' },
  { name: 'Proposal', avgDays: 16.4, benchmark: 10.0, deals: 32, value: '$890K', status: 'BOTTLENECK' },
  { name: 'Negotiation', avgDays: 9.1, benchmark: 10.0, deals: 18, value: '$450K', status: 'ON_TRACK' },
];

export default function DealVelocityPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600 shadow-sm">
            <Gauge className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Deal Stage Velocity & Bottlenecks</h1>
            <p className="text-sm text-slate-500 mt-1">Average cycle duration per stage, historical benchmarks, and stall warnings.</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-purple-50 border border-purple-200 rounded-xl px-4 py-2 text-xs font-bold text-purple-900 shadow-xs">
          <Clock className="w-4 h-4 text-purple-600" /> Avg Sales Cycle: 45.0 Days
        </div>
      </div>

      <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-center gap-3 text-xs text-amber-900 font-medium">
        <AlertOctagon className="w-5 h-5 text-amber-600 shrink-0" />
        <span><strong>Bottleneck Alert:</strong> Deals in the <strong>Proposal</strong> stage take 16.4 days on average, exceeding the 10.0-day benchmark by 6.4 days. Consider standardizing CPQ quote approval workflows.</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {STAGES.map((s, idx) => (
          <div key={idx} className={`bg-white rounded-2xl border p-5 space-y-3 shadow-sm ${s.status === 'BOTTLENECK' ? 'border-amber-300 ring-2 ring-amber-400/20' : 'border-slate-200'}`}>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Stage {idx + 1}</span>
              {s.status === 'BOTTLENECK' ? (
                <span className="bg-amber-100 text-amber-800 text-[9px] font-black px-1.5 py-0.5 rounded">STALL</span>
              ) : (
                <span className="bg-emerald-50 text-emerald-700 text-[9px] font-bold px-1.5 py-0.5 rounded">FAST</span>
              )}
            </div>

            <div>
              <h3 className="font-bold text-slate-900 text-sm">{s.name}</h3>
              <p className="font-mono text-xl font-black text-slate-900 mt-1">{s.avgDays}d</p>
              <p className="text-[10px] text-slate-400">Benchmark: {s.benchmark}d</p>
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-1 text-xs">
              <div className="flex justify-between text-slate-500">
                <span>Active Deals:</span>
                <span className="font-bold text-slate-800 font-mono">{s.deals}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Value:</span>
                <span className="font-bold text-indigo-600 font-mono">{s.value}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
