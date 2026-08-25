'use client';

import React from 'react';
import { AlertTriangle, RefreshCw, Send, ShieldAlert, CheckCircle2 } from 'lucide-react';

const FAILED_WEBHOOKS = [
  { id: 'dlq_99a8', endpoint: 'https://api.partnercrm.com/webhooks/deals', event: 'deal.won', error: 'HTTP 504 Gateway Timeout', attempts: 3, time: '8 mins ago', status: 'PENDING' },
  { id: 'dlq_88b2', endpoint: 'https://erp.acme.com/v1/invoices', event: 'quote.accepted', error: 'HTTP 502 Bad Gateway', attempts: 2, time: '14 mins ago', status: 'PENDING' },
  { id: 'dlq_77c1', endpoint: 'https://hooks.slack.com/services/T00/B00/X00', event: 'ticket.escalated', error: 'HTTP 429 Rate Limit Exceeded', attempts: 1, time: '32 mins ago', status: 'REPLAYED' },
];

export default function DeadLetterQueuePage() {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shadow-sm">
            <AlertTriangle className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Webhook Dead-Letter Queue (DLQ)</h1>
            <p className="text-sm text-slate-500 mt-1">Automated exponential backoff retries, poison message isolation, and manual replay triggers.</p>
          </div>
        </div>

        <button className="px-4 py-2.5 bg-[#4f46e5] hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md shadow-indigo-500/20 flex items-center gap-2 transition-colors">
          <RefreshCw className="w-4 h-4" /> Replay All Pending (2)
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-50 border-b border-slate-100 text-[10px] font-bold uppercase text-slate-500">
            <tr>
              <th className="p-4">Message ID</th>
              <th className="p-4">Target Endpoint</th>
              <th className="p-4">Event Type</th>
              <th className="p-4">Last HTTP Error</th>
              <th className="p-4">Attempts</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {FAILED_WEBHOOKS.map((w) => (
              <tr key={w.id} className="hover:bg-slate-50">
                <td className="p-4 font-mono font-bold text-indigo-600">{w.id}</td>
                <td className="p-4 font-mono text-slate-500 max-w-xs truncate">{w.endpoint}</td>
                <td className="p-4 font-bold text-slate-900">{w.event}</td>
                <td className="p-4 text-rose-600 font-mono text-[11px]">{w.error}</td>
                <td className="p-4 font-mono">{w.attempts} / 5</td>
                <td className="p-4 text-right">
                  {w.status === 'PENDING' ? (
                    <button className="px-3 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg text-xs font-bold transition-colors">
                      Replay Now
                    </button>
                  ) : (
                    <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      REPLAYED
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
