'use client';

import React, { useState } from 'react';
import { CreditCard, CheckCircle2, Clock, Download, AlertCircle, DollarSign, Calendar, Building } from 'lucide-react';

const INVOICES = [
  { id: 'INV-2026-008', date: '2026-08-01', dueDate: '2026-08-15', amount: 2499.00, status: 'PAID', plan: 'Enterprise', seats: 25 },
  { id: 'INV-2026-007', date: '2026-07-01', dueDate: '2026-07-15', amount: 2499.00, status: 'PAID', plan: 'Enterprise', seats: 25 },
  { id: 'INV-2026-006', date: '2026-06-01', dueDate: '2026-06-15', amount: 1999.00, status: 'PAID', plan: 'Enterprise', seats: 20 },
  { id: 'INV-2026-005', date: '2026-05-01', dueDate: '2026-05-15', amount: 999.00, status: 'PAID', plan: 'Pro', seats: 10 },
  { id: 'INV-2026-004', date: '2026-04-01', dueDate: '2026-04-15', amount: 999.00, status: 'OVERDUE', plan: 'Pro', seats: 10 },
];

const PLAN_FEATURES: Record<string, string[]> = {
  Starter: ['5 seats', 'Email + Chat channels', 'Basic CRM', 'Community support'],
  Pro: ['10 seats', 'All channels', 'Sales pipeline + Deals', 'Priority support', 'Custom reports'],
  Enterprise: ['Unlimited seats', 'All channels', 'Full CRM suite', 'AI copilot', 'Dedicated CSM', 'SAML SSO', 'SLA guarantees'],
};

const statusBadge: Record<string, string> = {
  PAID: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  OVERDUE: 'bg-red-100 text-red-700 border-red-200',
  PENDING: 'bg-amber-100 text-amber-700 border-amber-200',
};

export default function BillingInvoicesPage() {
  const [activePlan] = useState('Enterprise');

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
            <CreditCard className="w-7 h-7 text-blue-600" />
            Billing & Subscription Management
          </h1>
          <p className="text-sm text-slate-500 mt-1">View invoices, manage your subscription plan, and update payment details.</p>
        </div>
      </div>

      {/* Current Plan */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Building className="w-5 h-5 opacity-80" />
              <span className="text-sm font-bold opacity-80 uppercase tracking-widest">Current Plan</span>
            </div>
            <h2 className="text-3xl font-black">{activePlan}</h2>
            <p className="text-blue-200 text-sm">Renews on September 1, 2026 · 25 active seats · \$2,499 / month</p>
          </div>
          <div className="text-right space-y-2">
            <span className="bg-white/20 border border-white/30 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm">Active</span>
            <div className="block"><button className="mt-2 px-4 py-2 bg-white text-blue-700 font-bold text-xs rounded-xl hover:bg-blue-50 transition-colors">Manage Plan</button></div>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-white/20 grid grid-cols-3 gap-4">
          {PLAN_FEATURES[activePlan].slice(0, 3).map((feat, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-200" />
              <span className="text-xs text-blue-100">{feat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Billing KPIs */}
      <div className="grid grid-cols-3 gap-5">
        {[
          { icon: DollarSign, label: 'Total Billed (YTD)', value: '$10,994', color: 'text-emerald-500' },
          { icon: Calendar, label: 'Next Invoice', value: 'Sep 1, 2026', color: 'text-blue-500' },
          { icon: AlertCircle, label: 'Outstanding', value: '$999.00', color: 'text-red-500' },
        ].map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div key={idx} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase"><Icon className={`w-4 h-4 ${kpi.color}`} />{kpi.label}</div>
              <p className="text-2xl font-bold text-slate-900">{kpi.value}</p>
            </div>
          );
        })}
      </div>

      {/* Invoice History */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2"><Clock className="w-4 h-4 text-blue-500" />Invoice History</h3>
          <button className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1.5"><Download className="w-3.5 h-3.5" />Export All</button>
        </div>
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-50 text-[10px] font-bold uppercase text-slate-500 border-b border-slate-100">
            <tr>
              <th className="p-4">Invoice</th>
              <th className="p-4">Date</th>
              <th className="p-4">Plan</th>
              <th className="p-4">Seats</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {INVOICES.map((inv) => (
              <tr key={inv.id} className="hover:bg-slate-50">
                <td className="p-4 font-mono font-bold text-slate-900">{inv.id}</td>
                <td className="p-4">{inv.date}</td>
                <td className="p-4">{inv.plan}</td>
                <td className="p-4">{inv.seats}</td>
                <td className="p-4 font-bold text-slate-900">\${inv.amount.toFixed(2)}</td>
                <td className="p-4">
                  <span className={`border px-2 py-0.5 rounded-full text-[10px] font-bold ${statusBadge[inv.status]}`}>{inv.status}</span>
                </td>
                <td className="p-4 text-right">
                  <button className="text-blue-600 hover:text-blue-800 font-bold text-[10px] flex items-center gap-1 ml-auto">
                    <Download className="w-3 h-3" />PDF
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
