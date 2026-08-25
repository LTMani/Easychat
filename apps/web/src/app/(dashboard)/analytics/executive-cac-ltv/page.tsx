'use client';

import React from 'react';
import { DollarSign, TrendingUp, Users, Target, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

const METRICS = [
  { label: 'Customer Lifetime Value (LTV)', value: '$38,400', subtext: 'Blended across 2,543 customers', change: '+14.2% YoY' },
  { label: 'Customer Acquisition Cost (CAC)', value: '$5,200', subtext: 'Sales + Marketing blended cost', change: '-8.5% YoY' },
  { label: 'LTV : CAC Ratio', value: '7.38x', subtext: 'Target benchmark > 3.0x', change: 'Top Decile' },
  { label: 'CAC Payback Period', value: '5.4 Months', subtext: 'Months to recover acquisition spend', change: 'Ultra Healthy' },
];

const TIERS = [
  { tier: 'Enterprise Tier ($249/seat)', customers: 480, mrr: '$285,400', arpu: '$594.50', ltv: '$68,200', payback: '4.2 mos' },
  { tier: 'Professional Tier ($99/seat)', customers: 1150, mrr: '$148,200', arpu: '$128.80', ltv: '$24,500', payback: '5.8 mos' },
  { tier: 'Starter Tier ($49/seat)', customers: 913, mrr: '$49,675', arpu: '$54.40', ltv: '$8,100', payback: '7.9 mos' },
];

export default function ExecutiveCacLtvPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shadow-sm">
            <DollarSign className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Executive Unit Economics & LTV:CAC Ratio</h1>
            <p className="text-sm text-slate-500 mt-1">Blended Customer Acquisition Cost (CAC), Net Revenue Retention (NRR), and capital payback velocity.</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2 text-xs font-bold text-emerald-900 shadow-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Capital Efficiency: Top 5% SaaS Benchmark
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {METRICS.map((m, idx) => (
          <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-6 space-y-2 shadow-sm">
            <span className="text-[10px] font-bold uppercase text-slate-400">{m.label}</span>
            <p className="text-2xl font-black text-slate-900 font-mono">{m.value}</p>
            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] text-slate-400">{m.subtext}</span>
              <span className="text-[10px] font-bold text-emerald-600 font-mono bg-emerald-50 px-1.5 py-0.2 rounded">
                {m.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-sm">Customer Tier Economics Breakdown</h3>
          <span className="text-xs text-slate-400">Audited ASC 606 Metrics</span>
        </div>
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-50 border-b border-slate-100 text-[10px] font-bold uppercase text-slate-500">
            <tr>
              <th className="p-4">Customer Tier</th>
              <th className="p-4">Customer Base</th>
              <th className="p-4">Monthly Recurring Revenue (MRR)</th>
              <th className="p-4">Average Revenue Per User (ARPU)</th>
              <th className="p-4">Calculated LTV</th>
              <th className="p-4 text-right">CAC Payback</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {TIERS.map((t, idx) => (
              <tr key={idx} className="hover:bg-slate-50">
                <td className="p-4 font-bold text-slate-900">{t.tier}</td>
                <td className="p-4 font-mono font-bold text-slate-800">{t.customers} accounts</td>
                <td className="p-4 font-mono font-black text-indigo-600">{t.mrr}</td>
                <td className="p-4 font-mono">{t.arpu}</td>
                <td className="p-4 font-mono font-bold text-emerald-700">{t.ltv}</td>
                <td className="p-4 text-right font-mono font-bold text-slate-900">{t.payback}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
