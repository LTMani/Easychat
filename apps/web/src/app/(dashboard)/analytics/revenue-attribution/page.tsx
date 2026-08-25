'use client';

import React from 'react';
import { Target, TrendingUp, DollarSign, Globe, CheckCircle2, ArrowRight } from 'lucide-react';

const CAMPAIGNS = [
  { id: '1', channel: 'Google Search Ads (CPC)', spend: '$24,500', leads: 480, dealsWon: 34, revenueAttributed: '$210,000', roas: '8.57x', model: 'Linear 40/20/40' },
  { id: '2', channel: 'LinkedIn B2B Account Targeting', spend: '$18,200', leads: 290, dealsWon: 22, revenueAttributed: '$168,000', roas: '9.23x', model: 'Linear 40/20/40' },
  { id: '3', channel: 'Organic SEO & Documentation', spend: '$6,000', leads: 520, dealsWon: 41, revenueAttributed: '$245,000', roas: '40.8x', model: 'Linear 40/20/40' },
  { id: '4', channel: 'Partner Referral Network', spend: '$8,400', leads: 110, dealsWon: 18, revenueAttributed: '$112,000', roas: '13.3x', model: 'Linear 40/20/40' },
];

export default function RevenueAttributionPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 shadow-sm">
            <Target className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Multi-Touch UTM Revenue Attribution</h1>
            <p className="text-sm text-slate-500 mt-1">First-touch, last-touch, and position-based linear multi-touch ROI attribution modeling.</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-indigo-50 border border-indigo-200 rounded-xl px-4 py-2 text-xs font-bold text-indigo-900 shadow-xs">
          <CheckCircle2 className="w-4 h-4 text-indigo-600" /> Attribution Model: Position-Based (40-20-40)
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-50 border-b border-slate-100 text-[10px] font-bold uppercase text-slate-500">
            <tr>
              <th className="p-4">Marketing Channel / Campaign</th>
              <th className="p-4">Attributed Spend</th>
              <th className="p-4">Leads</th>
              <th className="p-4">Deals Won</th>
              <th className="p-4">Attributed Closed Revenue</th>
              <th className="p-4 text-right">Channel ROAS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {CAMPAIGNS.map((c) => (
              <tr key={c.id} className="hover:bg-slate-50">
                <td className="p-4 font-bold text-slate-900">{c.channel}</td>
                <td className="p-4 font-mono text-slate-600">{c.spend}</td>
                <td className="p-4 font-mono">{c.leads}</td>
                <td className="p-4 font-mono font-bold text-slate-800">{c.dealsWon}</td>
                <td className="p-4 font-mono font-black text-indigo-600">{c.revenueAttributed}</td>
                <td className="p-4 text-right font-mono font-bold text-emerald-700">{c.roas}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
