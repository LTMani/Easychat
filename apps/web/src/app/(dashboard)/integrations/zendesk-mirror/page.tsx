'use client';

import React from 'react';
import { LifeBuoy, CheckCircle2, ArrowRight, ShieldCheck, RefreshCw } from 'lucide-react';

const MIRRORED = [
  { zendeskId: '#48192', easyChatId: 'TKT-1245', subject: 'SSO SAML authentication loop on Chrome 124', priority: 'HIGH', status: 'OPEN', agent: 'Sarah Jenkins', time: '10 mins ago' },
  { zendeskId: '#48191', easyChatId: 'TKT-1244', subject: 'Custom invoice PDF generation missing tax ID', priority: 'NORMAL', status: 'SOLVED', agent: 'David Chen', time: '1 hour ago' },
  { zendeskId: '#48190', easyChatId: 'TKT-1243', subject: 'Webhook signature verification failure on endpoint', priority: 'URGENT', status: 'OPEN', agent: 'Rahul Varma', time: '2 hours ago' },
];

export default function ZendeskMirrorPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shadow-sm font-black text-xl">
            ZD
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Zendesk Live Ticket Mirror</h1>
            <p className="text-sm text-slate-500 mt-1">Bidirectional ticket synchronization, SLA mapping, and agent assignment mirroring.</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2 text-xs font-bold text-emerald-900 shadow-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Webhook Listener Active
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-50 border-b border-slate-100 text-[10px] font-bold uppercase text-slate-500">
            <tr>
              <th className="p-4">Zendesk ID</th>
              <th className="p-4">EasyChat ID</th>
              <th className="p-4">Subject</th>
              <th className="p-4">Priority</th>
              <th className="p-4">Assigned Agent</th>
              <th className="p-4 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {MIRRORED.map((m, idx) => (
              <tr key={idx} className="hover:bg-slate-50">
                <td className="p-4 font-mono font-bold text-emerald-700">{m.zendeskId}</td>
                <td className="p-4 font-mono font-bold text-indigo-600">{m.easyChatId}</td>
                <td className="p-4 font-bold text-slate-900 max-w-xs truncate">{m.subject}</td>
                <td className="p-4">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${m.priority === 'URGENT' ? 'bg-rose-50 text-rose-700' : m.priority === 'HIGH' ? 'bg-amber-50 text-amber-700' : 'bg-slate-100 text-slate-700'}`}>
                    {m.priority}
                  </span>
                </td>
                <td className="p-4 text-slate-600">{m.agent}</td>
                <td className="p-4 text-right">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${m.status === 'SOLVED' ? 'bg-emerald-50 text-emerald-700' : 'bg-blue-50 text-blue-700'}`}>
                    {m.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
