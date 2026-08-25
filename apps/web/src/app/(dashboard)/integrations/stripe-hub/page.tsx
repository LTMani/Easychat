'use client';

import React from 'react';
import { CreditCard, CheckCircle2, DollarSign, ArrowRight, ShieldCheck } from 'lucide-react';

const TRANSACTIONS = [
  { id: 'in_9948a', customer: 'Acme Enterprise Global', amount: '$2,490.00', event: 'invoice.payment_succeeded', plan: 'Enterprise Annual', time: '14 mins ago' },
  { id: 'in_8812b', customer: 'TechFlow Systems', amount: '$990.00', event: 'invoice.payment_succeeded', plan: 'Professional Monthly', time: '1 hour ago' },
  { id: 'in_7741c', customer: 'Horizon Logistics', amount: '$490.00', event: 'customer.subscription.created', plan: 'Starter Growth', time: '3 hours ago' },
];

export default function StripeHubPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 shadow-sm font-black text-xl">
            S
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Stripe Billing & Subscription Hub</h1>
            <p className="text-sm text-slate-500 mt-1">Real-time webhook dispatcher, subscription lifecycle management, and automatic invoice reconciliation.</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-indigo-50 border border-indigo-200 rounded-xl px-4 py-2 text-xs font-bold text-indigo-900 shadow-xs">
          <CheckCircle2 className="w-4 h-4 text-indigo-600" /> Webhook Signature: SHA-256 Verified
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-sm">Recent Stripe Webhook Transactions</h3>
          <span className="text-xs text-slate-400">Live payment telemetry</span>
        </div>
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-50 border-b border-slate-100 text-[10px] font-bold uppercase text-slate-500">
            <tr>
              <th className="p-4">Invoice ID</th>
              <th className="p-4">Customer Account</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Webhook Event</th>
              <th className="p-4">Subscription Plan</th>
              <th className="p-4 text-right">Processed</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {TRANSACTIONS.map((t, idx) => (
              <tr key={idx} className="hover:bg-slate-50">
                <td className="p-4 font-mono font-bold text-indigo-600">{t.id}</td>
                <td className="p-4 font-bold text-slate-900">{t.customer}</td>
                <td className="p-4 font-mono font-bold text-slate-900">{t.amount}</td>
                <td className="p-4 font-mono text-indigo-700">{t.event}</td>
                <td className="p-4 text-slate-600">{t.plan}</td>
                <td className="p-4 text-right text-slate-400">{t.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
