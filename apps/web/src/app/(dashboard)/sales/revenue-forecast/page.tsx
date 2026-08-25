'use client';

import React from 'react';
import { TrendingUp, DollarSign, Target, CheckCircle2, BarChart3, ArrowRight } from 'lucide-react';

const METRICS = [
  { label: 'Total Unweighted Pipeline', value: '$510,000', subtext: '5 Qualified Enterprise Deals' },
  { label: 'Weighted Pipeline Value', value: '$329,500', subtext: 'Probability Adjusted' },
  { label: 'Monte Carlo P50 Forecast', value: '$345,000', subtext: '1,000 Stochastic Iterations' },
  { label: 'Monte Carlo P90 Upside', value: '$465,000', subtext: '90th Percentile Confidence' },
];

export default function RevenueForecastPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 shadow-sm">
            <TrendingUp className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Monte Carlo Revenue & Pipeline Forecaster</h1>
            <p className="text-sm text-slate-500 mt-1">Stochastic win-rate probability simulations, stage weighted ARR projections, and quarterly quota gap analysis.</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2 text-xs font-bold text-emerald-900 shadow-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Confidence Rating: 94.2%
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {METRICS.map((m, idx) => (
          <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-6 space-y-2 shadow-sm">
            <span className="text-[10px] font-bold uppercase text-slate-400">{m.label}</span>
            <p className="text-2xl font-black text-slate-900 font-mono">{m.value}</p>
            <span className="text-xs text-slate-500">{m.subtext}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
