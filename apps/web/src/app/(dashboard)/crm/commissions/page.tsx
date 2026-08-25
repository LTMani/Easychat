'use client';

import React from 'react';
import { DollarSign, Award, TrendingUp, UserCheck, ShieldCheck, CheckCircle2 } from 'lucide-react';

const REPS = [
  { id: '1', name: 'Rahul Varma', quota: '$100,000', closed: '$124,000', attainment: '124%', base: '$10,000', accelerator: '$4,320', total: '$14,320' },
  { id: '2', name: 'Sarah Jenkins', quota: '$80,000', closed: '$88,500', attainment: '110.6%', base: '$8,000', accelerator: '$1,530', total: '$9,530' },
  { id: '3', name: 'David Chen', quota: '$75,000', closed: '$71,200', attainment: '94.9%', base: '$7,120', accelerator: '$0', total: '$7,120' },
  { id: '4', name: 'Emily Watson', quota: '$90,000', closed: '$96,000', attainment: '106.7%', base: '$9,000', accelerator: '$1,080', total: '$10,080' },
];

export default function CommissionsPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shadow-sm">
            <DollarSign className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Sales Rep Commission Statements</h1>
            <p className="text-sm text-slate-500 mt-1">Tiered quotas, 18% accelerator bonuses on over-attainment, and monthly payout statements.</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2 text-xs font-bold text-emerald-900 shadow-xs">
          <Award className="w-4 h-4 text-emerald-600" /> Plan: 10% Base + 18% Super-Accelerator
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-50 border-b border-slate-100 text-[10px] font-bold uppercase text-slate-500">
            <tr>
              <th className="p-4">Sales Representative</th>
              <th className="p-4">Monthly Quota</th>
              <th className="p-4">Closed Revenue</th>
              <th className="p-4">Attainment</th>
              <th className="p-4">Base Commission</th>
              <th className="p-4">Accelerator</th>
              <th className="p-4 text-right">Total Payout</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {REPS.map((r) => (
              <tr key={r.id} className="hover:bg-slate-50">
                <td className="p-4 font-bold text-slate-900">{r.name}</td>
                <td className="p-4 font-mono">{r.quota}</td>
                <td className="p-4 font-mono font-bold text-slate-900">{r.closed}</td>
                <td className="p-4">
                  <span className="bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {r.attainment}
                  </span>
                </td>
                <td className="p-4 font-mono">{r.base}</td>
                <td className="p-4 font-mono text-indigo-600 font-bold">{r.accelerator}</td>
                <td className="p-4 text-right font-mono font-black text-slate-900 text-sm">{r.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
