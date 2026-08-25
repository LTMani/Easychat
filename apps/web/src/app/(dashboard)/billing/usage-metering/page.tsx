'use client';

import React from 'react';
import { Gauge, Zap, MessageSquare, Database, Cpu, CheckCircle2, ArrowRight } from 'lucide-react';

const METERS = [
  { name: 'REST API Requests', consumed: '145,200', included: '100,000', overage: '45,200', rate: '$0.50 / 1k', cost: '$22.60', percent: 145, icon: Zap, color: 'text-amber-600 bg-amber-50' },
  { name: 'Omnichannel SMS Blast', consumed: '2,800', included: '1,000', overage: '1,800', rate: '$0.015 / msg', cost: '$27.00', percent: 280, icon: MessageSquare, color: 'text-blue-600 bg-blue-50' },
  { name: 'AI Model Tokens', consumed: '420,000', included: '250,000', overage: '170,000', rate: '$0.02 / 1k', cost: '$3.40', percent: 168, icon: Cpu, color: 'text-purple-600 bg-purple-50' },
  { name: 'Attachment Storage (GB)', consumed: '42.5 GB', included: '100 GB', overage: '0 GB', rate: '$0.10 / GB', cost: '$0.00', percent: 42.5, icon: Database, color: 'text-emerald-600 bg-emerald-50' },
];

export default function UsageMeteringPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 shadow-sm">
            <Gauge className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Real-Time Usage Metering & Overages</h1>
            <p className="text-sm text-slate-500 mt-1">Live consumption telemetry, included quota thresholds, and auto-calculated overage charges.</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-indigo-50 border border-indigo-200 rounded-xl px-4 py-2 text-xs font-bold text-indigo-900 shadow-xs">
          Total Current Overage: $53.00 USD
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {METERS.map((m, idx) => {
          const Icon = m.icon;
          return (
            <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${m.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-xs">{m.name}</h3>
                    <p className="text-[10px] text-slate-400">Rate: {m.rate}</p>
                  </div>
                </div>
                <span className="font-mono font-black text-slate-900 text-sm">{m.cost}</span>
              </div>

              {/* Progress bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-mono">
                  <span className="text-slate-500">{m.consumed} used</span>
                  <span className="text-slate-400">Quota: {m.included}</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${m.percent > 100 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                    style={{ width: `${Math.min(100, m.percent)}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
