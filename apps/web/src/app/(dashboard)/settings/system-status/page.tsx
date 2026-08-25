'use client';

import React from 'react';
import { Activity, Globe, Server, CheckCircle2, ShieldCheck, Wifi } from 'lucide-react';

const REGIONS = [
  { code: 'US_EAST_1', name: 'North America (N. Virginia)', p50: '14.2ms', p95: '28.5ms', p99: '42.1ms', uptime: '99.995%', pods: 48, status: 'OPERATIONAL' },
  { code: 'EU_CENTRAL_1', name: 'Europe (Frankfurt)', p50: '18.5ms', p95: '34.2ms', p99: '51.0ms', uptime: '99.992%', pods: 32, status: 'OPERATIONAL' },
  { code: 'AP_SOUTHEAST_1', name: 'Asia Pacific (Singapore)', p50: '29.1ms', p95: '48.0ms', p99: '68.4ms', uptime: '99.990%', pods: 24, status: 'OPERATIONAL' },
];

export default function SystemStatusPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shadow-sm">
            <Activity className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">System Status & Multi-Region Health</h1>
            <p className="text-sm text-slate-500 mt-1">Real-time edge cluster latency percentiles, 30-day uptime telemetry, and pod capacity.</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2 text-xs font-bold text-emerald-900 shadow-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" /> All Global Systems Operational
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {REGIONS.map((r) => (
          <div key={r.code} className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> {r.status}
              </span>
              <span className="font-mono text-xs font-bold text-slate-500">{r.pods} Edge Pods</span>
            </div>

            <div className="space-y-1">
              <h3 className="font-bold text-slate-900 text-sm">{r.name}</h3>
              <p className="text-xs text-slate-400 font-mono">Uptime: {r.uptime}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 grid grid-cols-3 gap-2 text-center text-xs">
              <div className="bg-slate-50 rounded-xl p-2">
                <span className="text-[9px] text-slate-400 font-bold block">P50</span>
                <span className="font-mono font-bold text-slate-800">{r.p50}</span>
              </div>
              <div className="bg-slate-50 rounded-xl p-2">
                <span className="text-[9px] text-slate-400 font-bold block">P95</span>
                <span className="font-mono font-bold text-indigo-600">{r.p95}</span>
              </div>
              <div className="bg-slate-50 rounded-xl p-2">
                <span className="text-[9px] text-slate-400 font-bold block">P99</span>
                <span className="font-mono font-bold text-slate-800">{r.p99}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
