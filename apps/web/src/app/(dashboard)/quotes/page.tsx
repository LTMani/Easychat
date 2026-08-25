'use client';

import React, { useState } from 'react';
import { FileSignature, Eye, Send, Download, Clock, CheckCircle2, XCircle, DollarSign, Plus } from 'lucide-react';

const QUOTES = [
  { id: 'q1', number: 'QTE-2026-0045', title: 'Enterprise License — Acme Corp', contact: 'Sarah Johnson', company: 'Acme Corporation', value: 49800, status: 'SENT', sentAt: '2026-08-20', expiresAt: '2026-09-20', items: 3 },
  { id: 'q2', number: 'QTE-2026-0044', title: 'Pro Plan + Implementation — TechVenture', contact: 'Mike Chen', company: 'TechVenture Inc.', value: 7800, status: 'ACCEPTED', sentAt: '2026-08-15', expiresAt: '2026-09-15', items: 2 },
  { id: 'q3', number: 'QTE-2026-0043', title: 'Multi-channel CRM — GlobalRetail', contact: 'Anna Kim', company: 'GlobalRetail GmbH', value: 12400, status: 'DRAFT', sentAt: null, expiresAt: '2026-09-30', items: 4 },
  { id: 'q4', number: 'QTE-2026-0042', title: 'Starter + WhatsApp Add-on', contact: 'Robert Silva', company: 'Silva Consulting', value: 936, status: 'EXPIRED', sentAt: '2026-08-01', expiresAt: '2026-08-31', items: 2 },
  { id: 'q5', number: 'QTE-2026-0041', title: 'Annual Enterprise + Services', contact: 'Jennifer Park', company: 'Park Holdings', value: 38000, status: 'SIGNED', sentAt: '2026-07-28', expiresAt: '2026-08-28', items: 5 },
];

const statusConfig: Record<string, { label: string; color: string; icon: React.ComponentType<{ className?: string }> }> = {
  DRAFT: { label: 'Draft', color: 'bg-slate-100 text-slate-600 border-slate-200', icon: Clock },
  SENT: { label: 'Sent', color: 'bg-blue-100 text-blue-700 border-blue-200', icon: Send },
  ACCEPTED: { label: 'Accepted', color: 'bg-emerald-100 text-emerald-700 border-emerald-200', icon: CheckCircle2 },
  SIGNED: { label: 'Signed', color: 'bg-purple-100 text-purple-700 border-purple-200', icon: FileSignature },
  EXPIRED: { label: 'Expired', color: 'bg-red-100 text-red-700 border-red-200', icon: XCircle },
};

export default function QuoteManagementPage() {
  const [activeStatus, setActiveStatus] = useState('ALL');

  const filtered = activeStatus === 'ALL' ? QUOTES : QUOTES.filter((q) => q.status === activeStatus);

  const totalValue = QUOTES.filter((q) => ['SENT', 'ACCEPTED', 'SIGNED'].includes(q.status)).reduce((acc, q) => acc + q.value, 0);
  const signedValue = QUOTES.filter((q) => q.status === 'SIGNED').reduce((acc, q) => acc + q.value, 0);
  const acceptanceRate = Math.round((QUOTES.filter((q) => ['ACCEPTED', 'SIGNED'].includes(q.status)).length / QUOTES.filter((q) => q.status !== 'DRAFT').length) * 100);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
            <FileSignature className="w-7 h-7 text-purple-600" />
            Quote & Proposal Manager
          </h1>
          <p className="text-sm text-slate-500 mt-1">Build, send, and track signed quotes and proposals from a single workspace.</p>
        </div>
        <button className="px-4 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-2">
          <Plus className="w-4 h-4" />Create Quote
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-5">
        {[
          { label: 'Active Quote Value', value: '$' + totalValue.toLocaleString(), icon: DollarSign, color: 'text-blue-500' },
          { label: 'Signed Revenue', value: '$' + signedValue.toLocaleString(), icon: CheckCircle2, color: 'text-emerald-500' },
          { label: 'Acceptance Rate', value: `${acceptanceRate}%`, icon: FileSignature, color: 'text-purple-500' },
          { label: 'Total Quotes (MTD)', value: QUOTES.length.toString(), icon: Clock, color: 'text-amber-500' },
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

      {/* Status Filters */}
      <div className="flex items-center gap-2">
        {['ALL', 'DRAFT', 'SENT', 'ACCEPTED', 'SIGNED', 'EXPIRED'].map((s) => (
          <button key={s} onClick={() => setActiveStatus(s)} className={`px-3 py-1.5 text-[10px] font-bold rounded-full border transition-colors ${activeStatus === s ? 'bg-purple-600 text-white border-purple-600' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}>{s}</button>
        ))}
      </div>

      {/* Quotes Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-50 border-b border-slate-100 text-[10px] font-bold uppercase text-slate-500">
            <tr>
              <th className="p-4">Quote #</th>
              <th className="p-4">Title</th>
              <th className="p-4">Contact</th>
              <th className="p-4">Value</th>
              <th className="p-4">Items</th>
              <th className="p-4">Status</th>
              <th className="p-4">Expires</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {filtered.map((quote) => {
              const statusMeta = statusConfig[quote.status];
              const StatusIcon = statusMeta.icon;
              return (
                <tr key={quote.id} className="hover:bg-slate-50">
                  <td className="p-4 font-mono font-bold text-purple-700">{quote.number}</td>
                  <td className="p-4 max-w-xs truncate text-slate-900 font-semibold">{quote.title}</td>
                  <td className="p-4">
                    <p className="font-bold text-slate-900">{quote.contact}</p>
                    <p className="text-slate-500">{quote.company}</p>
                  </td>
                  <td className="p-4 font-black text-slate-900">${quote.value.toLocaleString()}</td>
                  <td className="p-4 text-slate-600">{quote.items} items</td>
                  <td className="p-4">
                    <span className={`border px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 w-fit ${statusMeta.color}`}>
                      <StatusIcon className="w-3 h-3" />{statusMeta.label}
                    </span>
                  </td>
                  <td className="p-4 text-slate-500">{quote.expiresAt}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg border border-slate-200 hover:border-blue-300 transition-colors"><Eye className="w-3.5 h-3.5" /></button>
                      <button className="p-1.5 text-slate-400 hover:text-purple-600 rounded-lg border border-slate-200 hover:border-purple-300 transition-colors"><Send className="w-3.5 h-3.5" /></button>
                      <button className="p-1.5 text-slate-400 hover:text-emerald-600 rounded-lg border border-slate-200 hover:border-emerald-300 transition-colors"><Download className="w-3.5 h-3.5" /></button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
