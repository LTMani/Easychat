'use client';

import React, { useState } from 'react';
import { Clock, ShieldAlert, Plus, Edit2, Trash2, CheckCircle2, AlertTriangle, Calendar } from 'lucide-react';

const SLA_POLICIES = [
  {
    id: 'sla_1',
    name: 'Enterprise VIP Tier',
    description: 'Strict SLA for Enterprise tier accounts paying > $50k ARR',
    priority: 'URGENT',
    firstResponseMinutes: 15,
    resolutionMinutes: 120,
    isDefault: false,
    businessHoursOnly: false,
    activeTicketsCount: 8,
    complianceRate: 98.4,
  },
  {
    id: 'sla_2',
    name: 'Professional Standard',
    description: 'Standard working hour SLA for Pro tier customers',
    priority: 'HIGH',
    firstResponseMinutes: 60,
    resolutionMinutes: 480,
    isDefault: true,
    businessHoursOnly: true,
    activeTicketsCount: 42,
    complianceRate: 94.2,
  },
  {
    id: 'sla_3',
    name: 'Starter Community Support',
    description: 'Best-effort response window for Starter and Free trials',
    priority: 'LOW',
    firstResponseMinutes: 240,
    resolutionMinutes: 1440,
    isDefault: false,
    businessHoursOnly: true,
    activeTicketsCount: 15,
    complianceRate: 96.8,
  },
];

export default function SlaSettingsPage() {
  const [policies, setPolicies] = useState(SLA_POLICIES);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-red-50 border border-red-200 flex items-center justify-center text-red-600 shadow-sm">
            <Clock className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">SLA Policies & Escalation Rules</h1>
            <p className="text-sm text-slate-500 mt-1">Define first response and resolution targets by priority, account tier, and business hours.</p>
          </div>
        </div>

        <button className="px-4 py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-2 transition-colors">
          <Plus className="w-4 h-4" /> Create SLA Policy
        </button>
      </div>

      {/* Policy Cards */}
      <div className="grid grid-cols-3 gap-6">
        {policies.map((p) => (
          <div key={p.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4 hover:border-red-300 transition-colors">
            <div className="flex items-center justify-between">
              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${p.priority === 'URGENT' ? 'bg-red-50 text-red-700 border-red-200' : p.priority === 'HIGH' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-slate-50 text-slate-700 border-slate-200'}`}>
                {p.priority} Priority
              </span>
              {p.isDefault && (
                <span className="bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Default Policy
                </span>
              )}
            </div>

            <div>
              <h3 className="font-bold text-slate-900 text-base">{p.name}</h3>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">{p.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100">
              <div className="bg-slate-50 rounded-xl p-3">
                <p className="text-[10px] text-slate-400 font-bold uppercase">First Response</p>
                <p className="text-lg font-bold text-slate-900">{p.firstResponseMinutes}m</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-3">
                <p className="text-[10px] text-slate-400 font-bold uppercase">Resolution</p>
                <p className="text-lg font-bold text-slate-900">{p.resolutionMinutes / 60}h</p>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-2">
              <span className="text-slate-500 font-medium">{p.activeTicketsCount} active tickets</span>
              <span className="font-bold text-emerald-600">{p.complianceRate}% adherence</span>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-[10px] text-slate-400 flex items-center gap-1">
                <Calendar className="w-3 h-3" /> {p.businessHoursOnly ? 'Business Hours Only' : '24/7 Calendar'}
              </span>
              <div className="flex items-center gap-2">
                <button className="text-slate-400 hover:text-slate-600 font-bold">Edit</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
