'use client';

import React from 'react';
import { MessageSquare, Phone, CheckCircle2, ShieldCheck, Send, Sparkles } from 'lucide-react';

const MESSAGES = [
  { id: 'wa_01', from: '+1 (415) 555-0192', name: 'Alexander Sterling (Apex Global)', text: 'Hi! Could you confirm our contract signing ceremony status?', time: '5 mins ago', status: 'DELIVERED' },
  { id: 'wa_02', from: '+44 20 7946 0880', name: 'Eleanor Vance (Nexus Telecom)', text: 'We have provisioned the Frankfurt SIP trunk on our end.', time: '18 mins ago', status: 'READ' },
  { id: 'wa_03', from: '+49 30 555 0192', name: 'Klaus Reinhardt (OmniVanguard)', text: 'Thanks for the quick response on the EU VAT OSS invoice!', time: '1 hour ago', status: 'READ' },
];

export default function WhatsAppChannelPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shadow-sm">
            <MessageSquare className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">WhatsApp Business Cloud API Console</h1>
            <p className="text-sm text-slate-500 mt-1">Official Meta Graph API v19.0 omnichannel gateway with HSM interactive template dispatching.</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2 text-xs font-bold text-emerald-900 shadow-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Meta Webhook Active (Verified)
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-sm">Recent Inbound & Outbound WhatsApp Streams</h3>
          <span className="text-xs text-slate-400">Encrypted End-to-End</span>
        </div>
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-50 border-b border-slate-100 text-[10px] font-bold uppercase text-slate-500">
            <tr>
              <th className="p-4">Sender / Recipient</th>
              <th className="p-4">Message Snippet</th>
              <th className="p-4">Timestamp</th>
              <th className="p-4 text-right">Delivery Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {MESSAGES.map((m) => (
              <tr key={m.id} className="hover:bg-slate-50">
                <td className="p-4">
                  <span className="font-bold text-slate-900 block">{m.name}</span>
                  <span className="font-mono text-slate-400 text-[11px]">{m.from}</span>
                </td>
                <td className="p-4 text-slate-700 max-w-md">{m.text}</td>
                <td className="p-4 text-slate-400">{m.time}</td>
                <td className="p-4 text-right">
                  <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
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
