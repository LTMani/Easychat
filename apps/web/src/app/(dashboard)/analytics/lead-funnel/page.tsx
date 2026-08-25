'use client';

import React from 'react';
import { Filter, Users, Target, CheckCircle2, TrendingUp, ArrowDown, DollarSign } from 'lucide-react';

const FUNNEL_STAGES = [
  { stage: 'Website Inbound / Form Leads', count: 12400, convRate: '100%', dropOff: '0%', value: '$0' },
  { stage: 'MQL (Marketing Qualified Leads)', count: 4820, convRate: '38.8%', dropOff: '61.2%', value: '$0' },
  { stage: 'SQL (Sales Qualified Opportunities)', count: 1640, convRate: '34.0%', dropOff: '66.0%', value: '$18.4M' },
  { stage: 'Proposal / Quote Delivered', count: 680, convRate: '41.4%', dropOff: '58.6%', value: '$9.2M' },
  { stage: 'Closed Won Contracts', count: 394, convRate: '57.9%', dropOff: '42.1%', value: '$5.4M' },
];

export default function LeadFunnelAnalyticsPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shadow-sm">
            <TrendingUp className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Lead-to-Revenue Funnel Analytics</h1>
            <p className="text-sm text-slate-500 mt-1">Full-funnel conversion analysis from raw inbound leads to closed enterprise contracts.</p>
          </div>
        </div>
      </div>

      {/* Funnel Visual Stack */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <h3 className="font-bold text-slate-900 text-sm">Conversion Pipeline Waterfall</h3>
        <div className="space-y-3">
          {FUNNEL_STAGES.map((s, idx) => {
            const widthPercent = Math.max(25, 100 - idx * 18);
            return (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[10px] flex items-center justify-center font-bold">
                      {idx + 1}
                    </span>
                    <span>{s.stage}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-slate-900">{s.count.toLocaleString()} records</span>
                    {s.value !== '$0' && <span className="font-bold text-emerald-600 font-mono">{s.value}</span>}
                    <span className="text-blue-600 font-black">{s.convRate}</span>
                  </div>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3.5 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-500"
                    style={{ width: `${widthPercent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Funnel Stage Breakdown Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100">
          <h3 className="font-bold text-slate-900 text-sm">Detailed Stage Conversion Matrix</h3>
        </div>
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-50 border-b border-slate-100 text-[10px] font-bold uppercase text-slate-500">
            <tr>
              <th className="p-4">Lifecycle Stage</th>
              <th className="p-4">Total Volume</th>
              <th className="p-4">Stage Conversion Rate</th>
              <th className="p-4">Drop-off Rate</th>
              <th className="p-4">Pipeline Value</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {FUNNEL_STAGES.map((s, idx) => (
              <tr key={idx} className="hover:bg-slate-50">
                <td className="p-4 font-bold text-slate-900">{s.stage}</td>
                <td className="p-4 font-mono font-bold text-slate-800">{s.count.toLocaleString()}</td>
                <td className="p-4 text-blue-600 font-black">{s.convRate}</td>
                <td className="p-4 text-slate-400 font-mono">{s.dropOff}</td>
                <td className="p-4 font-bold text-emerald-600 font-mono">{s.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
