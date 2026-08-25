'use client';

import React from 'react';
import { ArrowUpRight, Plus, ShieldAlert, Clock, UserCheck, Bell, AlertTriangle } from 'lucide-react';

const ESCALATION_RULES = [
  { id: 'esc_1', name: 'Critical Security Incident Escalation', trigger: 'SLA Overrun > 30 mins on URGENT Priority', action: 'Reassign to Tier 3 Lead & SMS Alert VP Engineering', status: 'ACTIVE', triggered30d: 4 },
  { id: 'esc_2', name: 'VIP Enterprise Account First Response Delay', trigger: 'First Response Overrun > 15 mins on Enterprise LTV > $50k', action: 'Notify Dedicated CSM & Shift Lead in Slack #support-alerts', status: 'ACTIVE', triggered30d: 12 },
  { id: 'esc_3', name: 'Billing Dispute Resolution Blockage', trigger: 'Ticket Waiting in Billing Category > 48 Hours', action: 'Reassign to Head of Finance Operations', status: 'ACTIVE', triggered30d: 2 },
];

export default function TicketEscalationsPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shadow-sm">
            <ArrowUpRight className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Automated Ticket Escalation Matrix</h1>
            <p className="text-sm text-slate-500 mt-1">Multi-tier escalation rules that trigger automatic reassignments and manager alerts when SLAs are in jeopardy.</p>
          </div>
        </div>

        <button className="px-4 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-2 transition-colors">
          <Plus className="w-4 h-4" /> Add Escalation Policy
        </button>
      </div>

      <div className="space-y-4">
        {ESCALATION_RULES.map((rule) => (
          <div key={rule.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex items-start justify-between hover:border-amber-300 transition-colors">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <h3 className="font-bold text-slate-900 text-sm">{rule.name}</h3>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {rule.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-6 text-xs pt-1">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Trigger Threshold</p>
                  <p className="text-slate-700 font-mono mt-0.5">{rule.trigger}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Automated Action</p>
                  <p className="text-slate-900 font-bold mt-0.5">{rule.action}</p>
                </div>
              </div>
            </div>

            <div className="text-right space-y-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase">Triggered (Last 30d)</p>
              <p className="text-xl font-bold text-slate-900 font-mono">{rule.triggered30d} times</p>
              <button className="text-xs font-bold text-amber-600 hover:underline">Edit Policy</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
