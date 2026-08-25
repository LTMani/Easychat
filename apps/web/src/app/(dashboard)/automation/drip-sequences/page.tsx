'use client';

import React from 'react';
import { Mail, Clock, Send, Users, Sparkles, CheckCircle2, Plus } from 'lucide-react';

const SEQUENCES = [
  { id: '1', name: 'Enterprise 14-Day Product Onboarding', enrolled: 842, openRate: '68.4%', replyRate: '24.2%', steps: 5, status: 'ACTIVE' },
  { id: '2', name: 'Trial Expiration Win-Back Drip', enrolled: 1240, openRate: '52.1%', replyRate: '18.9%', steps: 3, status: 'ACTIVE' },
  { id: '3', name: 'Executive Advisory Board Invite', enrolled: 140, openRate: '88.5%', replyRate: '42.0%', steps: 2, status: 'ACTIVE' },
];

export default function DripSequencesPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 shadow-sm">
            <Mail className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Automated Drip Campaign Sequences</h1>
            <p className="text-sm text-slate-500 mt-1">Multi-step email & SMS lifecycle campaigns with behavioral branching triggers.</p>
          </div>
        </div>

        <button className="px-4 py-2.5 bg-[#4f46e5] hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md shadow-indigo-500/20 flex items-center gap-2 transition-colors">
          <Plus className="w-4 h-4" /> Create Drip Campaign
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {SEQUENCES.map((s) => (
          <div key={s.id} className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full">
                {s.status}
              </span>
              <span className="text-xs text-slate-400 font-medium">{s.steps} steps sequence</span>
            </div>

            <div className="space-y-1">
              <h3 className="font-bold text-slate-900 text-sm">{s.name}</h3>
              <p className="text-xs text-slate-500">{s.enrolled.toLocaleString()} enrolled contacts</p>
            </div>

            <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
              <div className="bg-slate-50 rounded-xl p-2.5 text-center">
                <span className="text-[10px] text-slate-400 font-bold block">OPEN RATE</span>
                <span className="font-mono font-bold text-indigo-600 text-sm">{s.openRate}</span>
              </div>
              <div className="bg-slate-50 rounded-xl p-2.5 text-center">
                <span className="text-[10px] text-slate-400 font-bold block">REPLY RATE</span>
                <span className="font-mono font-bold text-emerald-600 text-sm">{s.replyRate}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
