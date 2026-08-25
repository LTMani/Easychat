'use client';

import React from 'react';
import { Clock, Users, PhoneCall, TrendingUp, CheckCircle2, ShieldCheck, AlertCircle } from 'lucide-react';

const QUEUES = [
  { name: 'VIP Enterprise Priority Desk', agents: 10, arrival: '85 calls/hr', aht: '240s', intensity: '5.67 Erlangs', wait: '14s', probWait: '12.4%', status: 'HEALTHY' },
  { name: 'Tier 1 Customer Support Desk', agents: 18, arrival: '220 calls/hr', aht: '180s', intensity: '11.0 Erlangs', wait: '18s', probWait: '16.8%', status: 'HEALTHY' },
  { name: 'Sales Inbound Engineering', agents: 6, arrival: '90 calls/hr', aht: '210s', intensity: '5.25 Erlangs', wait: '48s', probWait: '42.1%', status: 'UNDERSTAFFED' },
];

export default function QueueForecastPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 shadow-sm">
            <Clock className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Erlang C Queue & Staffing Forecaster</h1>
            <p className="text-sm text-slate-500 mt-1">Mathematical queueing theory forecasting average speed of answer (ASA) and recommended headcount.</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-indigo-50 border border-indigo-200 rounded-xl px-4 py-2 text-xs font-bold text-indigo-900 shadow-xs">
          <CheckCircle2 className="w-4 h-4 text-indigo-600" /> Target SLA: 80% answered in &lt;20 seconds
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-50 border-b border-slate-100 text-[10px] font-bold uppercase text-slate-500">
            <tr>
              <th className="p-4">Queue Name</th>
              <th className="p-4">Active Staff</th>
              <th className="p-4">Inbound Rate</th>
              <th className="p-4">Average Handle Time</th>
              <th className="p-4">Traffic Load</th>
              <th className="p-4">Estimated Wait Time</th>
              <th className="p-4 text-right">Queue Health</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {QUEUES.map((q, idx) => (
              <tr key={idx} className="hover:bg-slate-50">
                <td className="p-4 font-bold text-slate-900">{q.name}</td>
                <td className="p-4 font-mono font-bold text-slate-800">{q.agents} agents</td>
                <td className="p-4 font-mono text-slate-600">{q.arrival}</td>
                <td className="p-4 font-mono text-slate-600">{q.aht}</td>
                <td className="p-4 font-mono text-indigo-600">{q.intensity}</td>
                <td className="p-4 font-mono font-black text-slate-900 text-sm">{q.wait}</td>
                <td className="p-4 text-right">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${q.status === 'HEALTHY' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}>
                    {q.status}
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
