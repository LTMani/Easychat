'use client';

import React from 'react';
import { Users, Target, Award, Sparkles, TrendingUp, AlertTriangle, ShieldCheck } from 'lucide-react';

const RFM_SEGMENTS = [
  { name: '👑 Champions', count: 240, avgSpend: '$38,500', rfmScore: '5-5-5', color: 'bg-emerald-50 border-emerald-200 text-emerald-900', action: 'Dedicated Executive Sponsor & VIP Roundtable' },
  { name: '💎 Loyal Customers', count: 680, avgSpend: '$18,200', rfmScore: '4-4-4', color: 'bg-blue-50 border-blue-200 text-blue-900', action: 'Annual Expansion Offer & Beta Features' },
  { name: '🚀 Potential Loyalists', count: 950, avgSpend: '$8,400', rfmScore: '4-3-3', color: 'bg-purple-50 border-purple-200 text-purple-900', action: 'Proactive Onboarding Check-in & Recommendations' },
  { name: '⚠️ At Risk', count: 310, avgSpend: '$12,000', rfmScore: '2-4-4', color: 'bg-amber-50 border-amber-200 text-amber-900', action: 'Automated Renewal Discount & CS Outreach' },
  { name: '🧊 Hibernating / Lost', count: 363, avgSpend: '$1,200', rfmScore: '1-1-1', color: 'bg-slate-50 border-slate-200 text-slate-700', action: 'Automated 30-Day Win-Back Email Journey' },
];

export default function RfmMatrixPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 shadow-sm">
            <Target className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">CDP Predictive RFM Matrix</h1>
            <p className="text-sm text-slate-500 mt-1">Recency, Frequency, and Monetary percentile segmentation with automated retention triggers.</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-indigo-50 border border-indigo-200 rounded-xl px-4 py-2 text-xs font-bold text-indigo-900 shadow-xs">
          <Sparkles className="w-4 h-4 text-indigo-600" /> 2,543 Active Customer Profiles Synced
        </div>
      </div>

      {/* Grid of Segments */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {RFM_SEGMENTS.map((seg, i) => (
          <div key={i} className={`rounded-2xl border p-6 space-y-4 shadow-sm ${seg.color}`}>
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base tracking-tight">{seg.name}</h3>
              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-white/70 border border-black/5">
                {seg.rfmScore}
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs font-medium opacity-80">
                <span>Audience Size:</span>
                <span className="font-bold font-mono">{seg.count} accounts</span>
              </div>
              <div className="flex justify-between text-xs font-medium opacity-80">
                <span>Avg Annual Spend:</span>
                <span className="font-bold font-mono">{seg.avgSpend}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-black/5 text-xs">
              <p className="font-bold text-[10px] uppercase tracking-wider opacity-60">Automated Action</p>
              <p className="font-medium mt-0.5">{seg.action}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
