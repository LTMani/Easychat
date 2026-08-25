'use client';

import React from 'react';
import { ArrowDown, ArrowUp, DollarSign, TrendingUp } from 'lucide-react';

export interface WaterfallStep {
  label: string;
  amount: number;
  type: 'START' | 'SUBTRACT' | 'TOTAL';
  color: string;
}

const WATERFALL_DATA: WaterfallStep[] = [
  { label: 'Gross Inbound Revenue', amount: 1850000, type: 'START', color: 'bg-emerald-500' },
  { label: 'COGS (Cloud & Telephony)', amount: -385000, type: 'SUBTRACT', color: 'bg-red-400' },
  { label: 'Sales & Marketing OpEx', amount: -420000, type: 'SUBTRACT', color: 'bg-amber-400' },
  { label: 'R&D Engineering', amount: -350000, type: 'SUBTRACT', color: 'bg-purple-400' },
  { label: 'G&A / Operations', amount: -180000, type: 'SUBTRACT', color: 'bg-slate-400' },
  { label: 'Est. Taxes (15%)', amount: -76500, type: 'SUBTRACT', color: 'bg-rose-400' },
  { label: 'Net Profit (Q3)', amount: 438500, type: 'TOTAL', color: 'bg-blue-600' },
];

export function ProfitWaterfallChart() {
  const maxVal = 2000000;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h3 className="font-bold text-slate-900 text-sm">Quarterly Profit & Loss Waterfall (Q3 2026)</h3>
          <p className="text-xs text-slate-500 mt-0.5">Step-by-step margin bridge from Gross Revenue to Net Retained Earnings</p>
        </div>
        <span className="text-xs font-black text-blue-600 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full font-mono">
          23.7% Net Margin
        </span>
      </div>

      <div className="space-y-4">
        {WATERFALL_DATA.map((step, i) => {
          const isNegative = step.amount < 0;
          const absAmount = Math.abs(step.amount);
          const barWidthPercent = Math.min(100, Math.max(5, (absAmount / maxVal) * 100));

          return (
            <div key={i} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-medium">
                <div className="flex items-center gap-2">
                  <span className="text-slate-700 font-bold">{step.label}</span>
                </div>
                <span className={`font-mono font-bold ${
                  step.type === 'TOTAL' ? 'text-blue-600 text-sm font-black' :
                  isNegative ? 'text-red-600' : 'text-emerald-600'
                }`}>
                  {isNegative ? '-' : '+'}${absAmount.toLocaleString()}
                </span>
              </div>

              <div className="w-full bg-slate-100 h-4 rounded-lg overflow-hidden flex">
                <div
                  className={`h-full ${step.color} rounded-lg transition-all duration-500`}
                  style={{ width: `${barWidthPercent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
