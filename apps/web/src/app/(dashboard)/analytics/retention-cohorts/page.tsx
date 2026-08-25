'use client';

import React from 'react';
import { Users, TrendingUp, DollarSign, Calendar, BarChart3, HelpCircle } from 'lucide-react';

const COHORTS = [
  { cohort: 'Jan 2026', size: 120, arpu: '$85', m1: '100%', m2: '94%', m3: '88%', m4: '84%', m5: '81%', m6: '79%', ltv12m: '$860' },
  { cohort: 'Feb 2026', size: 145, arpu: '$90', m1: '100%', m2: '92%', m3: '87%', m4: '82%', m5: '80%', m6: '—', ltv12m: '$890' },
  { cohort: 'Mar 2026', size: 180, arpu: '$95', m1: '100%', m2: '95%', m3: '89%', m4: '85%', m5: '—', m6: '—', ltv12m: '$940' },
  { cohort: 'Apr 2026', size: 210, arpu: '$92', m1: '100%', m2: '93%', m3: '88%', m4: '—', m5: '—', m6: '—', ltv12m: '$910' },
  { cohort: 'May 2026', size: 240, arpu: '$98', m1: '100%', m2: '96%', m3: '—', m4: '—', m5: '—', m6: '—', ltv12m: '$980' },
  { cohort: 'Jun 2026', size: 290, arpu: '$105', m1: '100%', m2: '—', m3: '—', m4: '—', m5: '—', m6: '—', ltv12m: '$1,040' },
];

export default function RetentionCohortsPage() {
  const getCellColor = (val: string) => {
    if (val === '—') return 'bg-slate-50 text-slate-300';
    const num = parseInt(val.replace('%', ''), 10);
    if (num >= 95) return 'bg-emerald-100 text-emerald-900 font-bold';
    if (num >= 85) return 'bg-emerald-50 text-emerald-800 font-bold';
    if (num >= 80) return 'bg-blue-50 text-blue-800 font-bold';
    return 'bg-amber-50 text-amber-800 font-bold';
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shadow-sm">
            <Users className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Customer Retention Cohort Heatmap</h1>
            <p className="text-sm text-slate-500 mt-1">Longitudinal cohort retention decay tracking and 12-month predictive lifetime value (LTV).</p>
          </div>
        </div>
      </div>

      {/* Cohort Heatmap Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-xs text-center">
          <thead className="bg-slate-50 border-b border-slate-100 text-[10px] font-bold uppercase text-slate-500">
            <tr>
              <th className="p-4 text-left">Cohort Month</th>
              <th className="p-4">Cohort Size</th>
              <th className="p-4">ARPU</th>
              <th className="p-4">Month 1</th>
              <th className="p-4">Month 2</th>
              <th className="p-4">Month 3</th>
              <th className="p-4">Month 4</th>
              <th className="p-4">Month 5</th>
              <th className="p-4">Month 6</th>
              <th className="p-4 text-right">Projected 12M LTV</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-mono">
            {COHORTS.map((c, i) => (
              <tr key={i} className="hover:bg-slate-50/50">
                <td className="p-4 font-sans font-bold text-slate-900 text-left">{c.cohort}</td>
                <td className="p-4 font-bold text-slate-700">{c.size}</td>
                <td className="p-4 text-slate-600">{c.arpu}</td>
                <td className={`p-4 ${getCellColor(c.m1)}`}>{c.m1}</td>
                <td className={`p-4 ${getCellColor(c.m2)}`}>{c.m2}</td>
                <td className={`p-4 ${getCellColor(c.m3)}`}>{c.m3}</td>
                <td className={`p-4 ${getCellColor(c.m4)}`}>{c.m4}</td>
                <td className={`p-4 ${getCellColor(c.m5)}`}>{c.m5}</td>
                <td className={`p-4 ${getCellColor(c.m6)}`}>{c.m6}</td>
                <td className="p-4 text-right font-black text-emerald-600 font-sans">{c.ltv12m}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
