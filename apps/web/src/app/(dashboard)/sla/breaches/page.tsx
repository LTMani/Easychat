'use client';

import React, { useState } from 'react';
import { AlertTriangle, CheckCircle2, XCircle, BarChart2, Clock, Download, TrendingDown } from 'lucide-react';

const SLA_POLICIES = [
  { id: 'p1', name: 'Enterprise SLA', firstResponseTarget: 30, resolutionTarget: 240 },
  { id: 'p2', name: 'Pro SLA', firstResponseTarget: 60, resolutionTarget: 480 },
  { id: 'p3', name: 'Standard SLA', firstResponseTarget: 120, resolutionTarget: 1440 },
];

const SLA_BREACH_LOG = [
  { id: 'b1', ticketId: 'TKT-1042', subject: 'Payment gateway error on checkout', policy: 'Enterprise SLA', breachType: 'FIRST_RESPONSE', targetMinutes: 30, actualMinutes: 87, breachedAt: '2026-08-25 09:42', agent: 'Sam Chen' },
  { id: 'b2', ticketId: 'TKT-1031', subject: 'API authentication failing', policy: 'Enterprise SLA', breachType: 'RESOLUTION', targetMinutes: 240, actualMinutes: 310, breachedAt: '2026-08-24 16:30', agent: 'Jordan Blake' },
  { id: 'b3', ticketId: 'TKT-1028', subject: 'Mobile app crashes on login', policy: 'Pro SLA', breachType: 'FIRST_RESPONSE', targetMinutes: 60, actualMinutes: 95, breachedAt: '2026-08-23 11:15', agent: 'Priya Sharma' },
];

const COMPLIANCE_STATS = [
  { policy: 'Enterprise SLA', total: 87, breached: 4, rate: 95.4 },
  { policy: 'Pro SLA', total: 142, breached: 9, rate: 93.7 },
  { policy: 'Standard SLA', total: 211, breached: 7, rate: 96.7 },
];

export default function SlaBreachDashboardPage() {
  const [activePolicy, setActivePolicy] = useState('ALL');

  const filtered = activePolicy === 'ALL' ? SLA_BREACH_LOG : SLA_BREACH_LOG.filter((b) => b.policy === activePolicy);
  const totalBreaches = SLA_BREACH_LOG.length;
  const avgOverrun = Math.round(SLA_BREACH_LOG.reduce((acc, b) => acc + (b.actualMinutes - b.targetMinutes), 0) / totalBreaches);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
            <AlertTriangle className="w-7 h-7 text-red-500" />
            SLA Breach Dashboard
          </h1>
          <p className="text-sm text-slate-500 mt-1">Monitor SLA compliance rates, breach events, and response time adherence across all policies.</p>
        </div>
        <button className="px-4 py-2 border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 rounded-xl flex items-center gap-2">
          <Download className="w-3.5 h-3.5" />Export Report
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-5">
        {[
          { icon: XCircle, label: 'Total Breaches (30d)', value: totalBreaches.toString(), color: 'text-red-500' },
          { icon: Clock, label: 'Avg Overrun', value: `${avgOverrun}m`, color: 'text-amber-500' },
          { icon: BarChart2, label: 'Overall Compliance', value: '95.1%', color: 'text-emerald-500' },
          { icon: TrendingDown, label: 'Trending', value: '↓ 12% vs last month', color: 'text-blue-500' },
        ].map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div key={idx} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-2">
              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase"><Icon className={`w-4 h-4 ${kpi.color}`} />{kpi.label}</div>
              <p className="text-xl font-bold text-slate-900">{kpi.value}</p>
            </div>
          );
        })}
      </div>

      {/* Compliance Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" />SLA Policy Compliance Rates</h3>
        </div>
        <div className="divide-y divide-slate-100">
          {COMPLIANCE_STATS.map((stat) => (
            <div key={stat.policy} className="flex items-center gap-4 p-4">
              <div className="flex-1">
                <p className="text-sm font-bold text-slate-900">{stat.policy}</p>
                <p className="text-xs text-slate-500">{stat.total} tickets · {stat.breached} breached</p>
              </div>
              <div className="w-40 bg-slate-100 rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${stat.rate}%` }} />
              </div>
              <span className={`text-sm font-black ${stat.rate >= 95 ? 'text-emerald-700' : 'text-amber-700'}`}>{stat.rate}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Policy Filter */}
      <div className="flex items-center gap-3">
        {['ALL', ...SLA_POLICIES.map((p) => p.name)].map((p) => (
          <button key={p} onClick={() => setActivePolicy(p)} className={`px-3 py-1.5 text-xs font-bold rounded-full border transition-colors ${activePolicy === p ? 'bg-red-600 text-white border-red-600' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}>{p}</button>
        ))}
      </div>

      {/* Breach Log */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-red-500" />Recent Breach Events</h3>
        </div>
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-50 border-b border-slate-100 text-[10px] font-bold uppercase text-slate-500">
            <tr>
              <th className="p-4">Ticket</th>
              <th className="p-4">Subject</th>
              <th className="p-4">Policy</th>
              <th className="p-4">Breach Type</th>
              <th className="p-4">Target</th>
              <th className="p-4">Actual</th>
              <th className="p-4">Overrun</th>
              <th className="p-4">Agent</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {filtered.map((breach) => (
              <tr key={breach.id} className="hover:bg-slate-50">
                <td className="p-4 font-mono font-bold text-red-600">{breach.ticketId}</td>
                <td className="p-4 text-slate-800 max-w-xs truncate">{breach.subject}</td>
                <td className="p-4">{breach.policy}</td>
                <td className="p-4">
                  <span className="bg-red-50 text-red-700 border border-red-200 px-2 py-0.5 rounded-full text-[10px] font-bold">{breach.breachType.replace('_', ' ')}</span>
                </td>
                <td className="p-4">{breach.targetMinutes}m</td>
                <td className="p-4 font-bold text-red-700">{breach.actualMinutes}m</td>
                <td className="p-4 text-red-600 font-bold">+{breach.actualMinutes - breach.targetMinutes}m</td>
                <td className="p-4">{breach.agent}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
