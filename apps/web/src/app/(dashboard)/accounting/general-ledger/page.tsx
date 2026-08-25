'use client';

import React, { useState } from 'react';
import { BookOpen, DollarSign, CheckCircle2, ShieldCheck, ArrowRight, Plus, RefreshCw, FileText } from 'lucide-react';

const TRANSACTIONS = [
  { id: 'txn_01', ref: 'JE-2026-001', desc: 'Annual Enterprise SaaS Subscription Invoiced (ASC 606 Deferred Revenue)', debit: '$29,880.00', credit: '$29,880.00', postedBy: 'accounting-daemon@easychat.io', date: '2026-08-25', status: 'BALANCED' },
  { id: 'txn_02', ref: 'JE-2026-002', desc: 'Stripe Payment Received for Invoice #INV-001 (Net Payout + Merchant Fee)', debit: '$29,880.00', credit: '$29,880.00', postedBy: 'stripe-webhook-worker@easychat.io', date: '2026-08-25', status: 'BALANCED' },
  { id: 'txn_03', ref: 'JE-2026-003', desc: 'Monthly Revenue Recognition Amortization (Month 1/12)', debit: '$2,490.00', credit: '$2,490.00', postedBy: 'revenue-recognition-cron@easychat.io', date: '2026-08-25', status: 'BALANCED' },
];

const ACCOUNTS = [
  { id: '1010', name: 'Cash & Cash Equivalents (SVB Bank)', type: 'ASSET', balance: '$29,013.48', drCr: 'DR' },
  { id: '1100', name: 'Accounts Receivable (AR)', type: 'ASSET', balance: '$0.00', drCr: 'DR' },
  { id: '2200', name: 'Unearned / Deferred SaaS Revenue', type: 'LIABILITY', balance: '$27,390.00', drCr: 'CR' },
  { id: '4010', name: 'Enterprise Subscription Revenue', type: 'REVENUE', balance: '$2,490.00', drCr: 'CR' },
  { id: '6100', name: 'Merchant Processing & Interchange Fees', type: 'EXPENSE', balance: '$866.52', drCr: 'DR' },
];

export default function GeneralLedgerPage() {
  const [activeTab, setActiveTab] = useState<'TRANSACTIONS' | 'TRIAL_BALANCE'>('TRANSACTIONS');

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shadow-sm">
            <BookOpen className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Enterprise General Ledger & Double-Entry Accounting</h1>
            <p className="text-sm text-slate-500 mt-1">GAAP compliant double-entry journal entries, ASC 606 deferred revenue recognition, and trial balance.</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2 text-xs font-bold text-emerald-900 shadow-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" /> GAAP Audit Trail Verified
        </div>
      </div>

      <div className="flex gap-2 border-b border-slate-200 pb-4">
        <button
          onClick={() => setActiveTab('TRANSACTIONS')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors ${activeTab === 'TRANSACTIONS' ? 'bg-[#4f46e5] text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
        >
          Journal Transactions
        </button>
        <button
          onClick={() => setActiveTab('TRIAL_BALANCE')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors ${activeTab === 'TRIAL_BALANCE' ? 'bg-[#4f46e5] text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
        >
          Trial Balance & Chart of Accounts
        </button>
      </div>

      {activeTab === 'TRANSACTIONS' ? (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 border-b border-slate-100 text-[10px] font-bold uppercase text-slate-500">
              <tr>
                <th className="p-4">Reference #</th>
                <th className="p-4">Description</th>
                <th className="p-4">Total Debit</th>
                <th className="p-4">Total Credit</th>
                <th className="p-4">Posted By</th>
                <th className="p-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {TRANSACTIONS.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50">
                  <td className="p-4 font-mono font-bold text-indigo-600">{t.ref}</td>
                  <td className="p-4 font-bold text-slate-900 max-w-sm">{t.desc}</td>
                  <td className="p-4 font-mono font-bold text-slate-800">{t.debit}</td>
                  <td className="p-4 font-mono font-bold text-slate-800">{t.credit}</td>
                  <td className="p-4 text-slate-500 font-mono text-[11px]">{t.postedBy}</td>
                  <td className="p-4 text-right">
                    <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {t.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 border-b border-slate-100 text-[10px] font-bold uppercase text-slate-500">
              <tr>
                <th className="p-4">Account ID</th>
                <th className="p-4">Account Title</th>
                <th className="p-4">Account Type</th>
                <th className="p-4">Net Balance</th>
                <th className="p-4 text-right">Normal Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {ACCOUNTS.map((a) => (
                <tr key={a.id} className="hover:bg-slate-50">
                  <td className="p-4 font-mono font-bold text-indigo-600">{a.id}</td>
                  <td className="p-4 font-bold text-slate-900">{a.name}</td>
                  <td className="p-4">
                    <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {a.type}
                    </span>
                  </td>
                  <td className="p-4 font-mono font-bold text-slate-900">{a.balance}</td>
                  <td className="p-4 text-right font-mono font-bold text-emerald-700">{a.drCr}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
