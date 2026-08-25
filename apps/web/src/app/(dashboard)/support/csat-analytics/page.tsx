'use client';

import React from 'react';
import { Smile, Frown, Meh, Heart, MessageSquare, TrendingUp, CheckCircle2 } from 'lucide-react';

const RECENT_FEEDBACK = [
  { id: '1', score: 10, contact: 'Rahul Varma (Acme Corp)', comment: 'The live AI Assistant resolved my billing inquiry within 15 seconds!', category: 'PROMOTER', time: '12 mins ago' },
  { id: '2', score: 9, contact: 'Sarah Jenkins (TechGlobal)', comment: 'Excellent CPQ quote workflow and fast e-signature execution.', category: 'PROMOTER', time: '45 mins ago' },
  { id: '3', score: 7, contact: 'David Chen (DevWorks)', comment: 'Good overall, but would love more Zapier webhook events.', category: 'PASSIVE', time: '2 hours ago' },
  { id: '4', score: 4, contact: 'Emily Watson (CloudNine)', comment: 'Encountered a delay in SIP softphone audio routing.', category: 'DETRACTOR', time: '4 hours ago' },
];

export default function CsatAnalyticsPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shadow-sm">
            <Heart className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Customer Satisfaction & NPS Analytics</h1>
            <p className="text-sm text-slate-500 mt-1">Real-time Net Promoter Score calculations, customer sentiment, and feedback trends.</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2 text-xs font-bold text-emerald-900 shadow-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Net Promoter Score: +68 (World Class)
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-2 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase text-slate-400">Promoters (9-10)</span>
            <Smile className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-black text-emerald-600 font-mono">76.2%</p>
          <p className="text-xs text-slate-500">1,938 customer responses</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-2 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase text-slate-400">Passives (7-8)</span>
            <Meh className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-black text-amber-600 font-mono">15.4%</p>
          <p className="text-xs text-slate-500">392 customer responses</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-2 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase text-slate-400">Detractors (0-6)</span>
            <Frown className="w-4 h-4 text-rose-500" />
          </div>
          <p className="text-2xl font-black text-rose-600 font-mono">8.4%</p>
          <p className="text-xs text-slate-500">213 customer responses</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-sm">Recent Customer Feedback Stream</h3>
          <span className="text-xs text-slate-400">Live sentiment telemetry</span>
        </div>
        <div className="divide-y divide-slate-100">
          {RECENT_FEEDBACK.map((f) => (
            <div key={f.id} className="p-5 flex items-center justify-between hover:bg-slate-50/50">
              <div className="space-y-1 max-w-xl">
                <div className="flex items-center gap-2">
                  <span className={`w-6 h-6 rounded-lg text-xs font-black flex items-center justify-center font-mono ${f.score >= 9 ? 'bg-emerald-100 text-emerald-800' : f.score >= 7 ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'}`}>
                    {f.score}
                  </span>
                  <h4 className="font-bold text-slate-900 text-xs">{f.contact}</h4>
                </div>
                <p className="text-xs text-slate-600 italic">"{f.comment}"</p>
              </div>

              <span className="text-[11px] text-slate-400 font-medium shrink-0">{f.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
