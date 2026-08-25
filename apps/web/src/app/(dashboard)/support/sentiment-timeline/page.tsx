'use client';

import React from 'react';
import { Activity, Smile, Frown, Sparkles, MessageCircle, CheckCircle2 } from 'lucide-react';

const TURNS = [
  { turn: 1, speaker: 'Customer', text: 'I am so frustrated with this broken billing invoice error!', sentiment: -0.85, rating: 'FRUSTRATED' },
  { turn: 2, speaker: 'Agent (Sarah)', text: 'I completely understand your urgency, let me issue an immediate refund right now.', sentiment: +0.45, rating: 'EMPATHETIC' },
  { turn: 3, speaker: 'Customer', text: 'Thank you so much! That was great and resolved my issue fast.', sentiment: +0.92, rating: 'DELIGHTED' },
];

export default function SentimentTimelinePage() {
  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shadow-sm">
            <Smile className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Turn-by-Turn Sentiment Trajectory</h1>
            <p className="text-sm text-slate-500 mt-1">NLP polarity shift analysis tracking emotional progression from friction to resolution.</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2 text-xs font-bold text-emerald-900 shadow-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Outcome: Sentiment Improved (+1.77 Shift)
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
        <div className="space-y-4">
          {TURNS.map((t) => (
            <div key={t.turn} className="p-4 rounded-xl border border-slate-100 flex items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-slate-400">Turn #{t.turn}</span>
                  <span className="font-bold text-slate-900 text-xs">{t.speaker}</span>
                </div>
                <p className="text-xs text-slate-600 italic">"{t.text}"</p>
              </div>

              <div className="text-right shrink-0">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${t.sentiment > 0 ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                  {t.sentiment > 0 ? `+${t.sentiment}` : t.sentiment} ({t.rating})
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
