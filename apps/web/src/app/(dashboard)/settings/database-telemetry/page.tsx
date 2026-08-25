'use client';

import React from 'react';
import { Database, Activity, Cpu, CheckCircle2, Server, ArrowRight } from 'lucide-react';

export default function DatabaseTelemetryPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 shadow-sm">
            <Database className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Database Connection Pool Telemetry</h1>
            <p className="text-sm text-slate-500 mt-1">Active client connections, query latency percentiles, and connection pool saturation metrics.</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2 text-xs font-bold text-emerald-900 shadow-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" /> PostgreSQL 16 Pool: 18% Saturation (Healthy)
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-2 shadow-sm">
          <span className="text-[10px] font-bold uppercase text-slate-400">Active Connections</span>
          <p className="text-2xl font-black text-indigo-600 font-mono">18 / 100</p>
          <p className="text-xs text-slate-500">12 idle connections warm</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-2 shadow-sm">
          <span className="text-[10px] font-bold uppercase text-slate-400">Average Query Duration</span>
          <p className="text-2xl font-black text-emerald-600 font-mono">2.4ms</p>
          <p className="text-xs text-slate-500">Sub-5ms response target</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-2 shadow-sm">
          <span className="text-[10px] font-bold uppercase text-slate-400">Waiting Queries In Queue</span>
          <p className="text-2xl font-black text-slate-900 font-mono">0</p>
          <p className="text-xs text-slate-500">Zero query queue buildup</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-2 shadow-sm">
          <span className="text-[10px] font-bold uppercase text-slate-400">Slow Queries (&gt;100ms)</span>
          <p className="text-2xl font-black text-slate-900 font-mono">1</p>
          <p className="text-xs text-slate-500">Last 24 hours</p>
        </div>
      </div>
    </div>
  );
}
