'use client';

import React from 'react';
import { Activity, PhoneCall, Wifi, AlertTriangle, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

const RECENT_CALLS = [
  { id: 'call_9948a', agent: 'Sarah Jenkins', customer: 'Acme Corp', duration: '8m 42s', mos: '4.42', rFactor: '92.1', jitter: '3ms', loss: '0.0%', codec: 'Opus HD', rating: 'EXCELLENT' },
  { id: 'call_8812b', agent: 'Rahul Varma', customer: 'TechFlow Systems', duration: '14m 10s', mos: '4.35', rFactor: '90.4', jitter: '5ms', loss: '0.2%', codec: 'Opus HD', rating: 'EXCELLENT' },
  { id: 'call_7741c', agent: 'David Chen', customer: 'Horizon Logistics', duration: '4m 18s', mos: '3.65', rFactor: '74.2', jitter: '28ms', loss: '2.4%', codec: 'G.711u', rating: 'FAIR' },
];

export default function CallQualityMosPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shadow-sm">
            <Activity className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">WebRTC Audio Quality & MOS Telemetry</h1>
            <p className="text-sm text-slate-500 mt-1">ITU-T G.107 E-model Mean Opinion Score (MOS), jitter buffer telemetry, and packet loss monitoring.</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2 text-xs font-bold text-emerald-900 shadow-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Fleet Average MOS: 4.38 / 4.50
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-2 shadow-sm">
          <span className="text-[10px] font-bold uppercase text-slate-400">Pristine Calls (&gt;4.2 MOS)</span>
          <p className="text-2xl font-black text-emerald-600 font-mono">94.8%</p>
          <p className="text-xs text-slate-500">Crystal wideband Opus HD audio</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-2 shadow-sm">
          <span className="text-[10px] font-bold uppercase text-slate-400">Average Jitter</span>
          <p className="text-2xl font-black text-slate-900 font-mono">4.2ms</p>
          <p className="text-xs text-slate-500">Adaptive dejitter buffer active</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-2 shadow-sm">
          <span className="text-[10px] font-bold uppercase text-slate-400">Average Round-Trip Latency</span>
          <p className="text-2xl font-black text-indigo-600 font-mono">38ms</p>
          <p className="text-xs text-slate-500">Direct regional edge routing</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-50 border-b border-slate-100 text-[10px] font-bold uppercase text-slate-500">
            <tr>
              <th className="p-4">Call ID</th>
              <th className="p-4">Agent</th>
              <th className="p-4">Duration</th>
              <th className="p-4">MOS Score</th>
              <th className="p-4">R-Factor</th>
              <th className="p-4">Jitter / Loss</th>
              <th className="p-4">Codec</th>
              <th className="p-4 text-right">Rating</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {RECENT_CALLS.map((c) => (
              <tr key={c.id} className="hover:bg-slate-50">
                <td className="p-4 font-mono font-bold text-indigo-600">{c.id}</td>
                <td className="p-4 font-bold text-slate-900">{c.agent}</td>
                <td className="p-4 text-slate-500">{c.duration}</td>
                <td className="p-4 font-mono font-black text-emerald-600 text-sm">{c.mos}</td>
                <td className="p-4 font-mono text-slate-600">{c.rFactor}</td>
                <td className="p-4 font-mono text-slate-500">{c.jitter} / {c.loss}</td>
                <td className="p-4 font-mono text-indigo-700">{c.codec}</td>
                <td className="p-4 text-right">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${c.rating === 'EXCELLENT' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                    {c.rating}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
