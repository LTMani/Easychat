'use client';

import React from 'react';
import { AlertOctagon, TrendingDown, Users, ShieldAlert, CheckCircle2, ArrowRight } from 'lucide-react';

const AT_RISK_ACCOUNTS = [
  { id: '1', account: 'Acme Enterprise Global', mrr: '$15,000 / mo', urgentTickets: 4, activityDecline: '-62%', nps: 4, risk: 'CRITICAL', action: 'Assign Senior VP of Customer Success immediately for emergency triage' },
  { id: '2', account: 'TechFlow Systems', mrr: '$8,400 / mo', urgentTickets: 2, activityDecline: '-35%', nps: 6, risk: 'HIGH', action: 'Trigger executive check-in call and offer customized onboarding session' },
  { id: '3', account: 'Horizon Logistics Corp', mrr: '$12,200 / mo', urgentTickets: 1, activityDecline: '-22%', nps: 7, risk: 'MEDIUM', action: 'Send automated product feature tips and CS re-engagement email' },
];

export default function ChurnRiskPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 shadow-sm">
            <AlertOctagon className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Predictive Account Churn Risk Radar</h1>
            <p className="text-sm text-slate-500 mt-1">Multi-signal telemetry evaluating ticket escalations, usage frequency drop-offs, and NPS sentiment.</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-rose-50 border border-rose-200 rounded-xl px-4 py-2 text-xs font-bold text-rose-900 shadow-xs">
          <ShieldAlert className="w-4 h-4 text-rose-600" /> At-Risk MRR: $35,600 / mo
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden divide-y divide-slate-100">
        {AT_RISK_ACCOUNTS.map((a) => (
          <div key={a.id} className="p-6 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
            <div className="space-y-1 max-w-2xl">
              <div className="flex items-center gap-3">
                <h3 className="font-bold text-slate-900 text-sm">{a.account}</h3>
                <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${a.risk === 'CRITICAL' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'}`}>
                  {a.risk}
                </span>
                <span className="font-mono font-bold text-slate-700 text-xs">{a.mrr}</span>
              </div>
              <p className="text-xs text-slate-500">
                Signals: {a.urgentTickets} urgent tickets • {a.activityDecline} activity decline • NPS {a.nps}/10
              </p>
              <p className="text-xs text-indigo-600 font-medium pt-1">
                Recommended Action: {a.action}
              </p>
            </div>

            <button className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-sm transition-colors">
              Execute Triage
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
