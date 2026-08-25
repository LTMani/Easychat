'use client';

import React from 'react';
import { DollarSign, Globe, RefreshCw, ArrowRightLeft, CheckCircle2, TrendingUp } from 'lucide-react';

const RATES = [
  { pair: 'USD / INR', midMarket: '83.4500', customerRate: '84.0758', spread: '0.75%', change: '+0.12%', status: 'LIVE' },
  { pair: 'USD / EUR', midMarket: '0.9210', customerRate: '0.9279', spread: '0.75%', change: '-0.04%', status: 'LIVE' },
  { pair: 'USD / GBP', midMarket: '0.7920', customerRate: '0.7979', spread: '0.75%', change: '+0.08%', status: 'LIVE' },
  { pair: 'USD / CAD', midMarket: '1.3640', customerRate: '1.3742', spread: '0.75%', change: '+0.02%', status: 'LIVE' },
  { pair: 'USD / SGD', midMarket: '1.3480', customerRate: '1.3581', spread: '0.75%', change: '-0.01%', status: 'LIVE' },
  { pair: 'USD / JPY', midMarket: '154.2000', customerRate: '155.3565', spread: '0.75%', change: '+0.25%', status: 'LIVE' },
];

export default function ForexRatesPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shadow-sm">
            <ArrowRightLeft className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Multi-Currency Forex & Hedging Engine</h1>
            <p className="text-sm text-slate-500 mt-1">Live ECB mid-market exchange rates, automated conversion spreads, and multi-currency billing invoices.</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2 text-xs font-bold text-emerald-900 shadow-xs">
          <RefreshCw className="w-4 h-4 text-emerald-600 animate-spin" /> Live FX Feeds Active
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {RATES.map((r, idx) => (
          <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm font-mono">{r.pair}</h3>
              <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full">
                {r.status}
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase text-slate-400">Customer Effective Rate</span>
              <p className="font-mono text-xl font-black text-indigo-600">{r.customerRate}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-between text-xs text-slate-500">
              <span>Mid-Market: <strong className="text-slate-800 font-mono">{r.midMarket}</strong></span>
              <span>Spread: <strong className="text-slate-800 font-mono">{r.spread}</strong></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
