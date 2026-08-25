'use client';

import React from 'react';
import { Users, RotateCw, CheckCircle2, ShieldCheck, UserCheck, Plus } from 'lucide-react';

const AGENTS = [
  { id: '1', name: 'Rahul Varma', territory: 'North America', assigned: 12, max: 25, status: 'AVAILABLE', load: 48 },
  { id: '2', name: 'Sarah Jenkins', territory: 'North America', assigned: 14, max: 25, status: 'AVAILABLE', load: 56 },
  { id: '3', name: 'David Chen', territory: 'EMEA', assigned: 8, max: 20, status: 'AVAILABLE', load: 40 },
  { id: '4', name: 'Emily Watson', territory: 'Asia Pacific', assigned: 15, max: 20, status: 'BUSY', load: 75 },
];

export default function RoundRobinPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shadow-sm">
            <RotateCw className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Round-Robin Lead Distribution Engine</h1>
            <p className="text-sm text-slate-500 mt-1">Weighted sales rep lead routing, territory segregation, and capacity caps.</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2 text-xs font-bold text-emerald-900 shadow-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Algorithm: Weighted Territory Fair Share
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden divide-y divide-slate-100">
        {AGENTS.map((a) => (
          <div key={a.id} className="p-6 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <h3 className="font-bold text-slate-900 text-sm">{a.name}</h3>
                <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded">
                  {a.territory}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${a.status === 'AVAILABLE' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}>
                  {a.status}
                </span>
              </div>
              <p className="text-xs text-slate-500">{a.assigned} of {a.max} active leads assigned ({a.load}% capacity)</p>
            </div>

            <div className="w-48 space-y-1">
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${a.load > 70 ? 'bg-amber-500' : 'bg-indigo-600'}`}
                  style={{ width: `${a.load}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
