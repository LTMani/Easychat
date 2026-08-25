'use client';

import React, { useState } from 'react';
import { Megaphone, Send, Clock, CheckCircle2, BarChart2, Plus, Search, Filter } from 'lucide-react';

const WHATSAPP_CAMPAIGNS = [
  { id: 'wc1', name: 'Black Friday Offer — Enterprise Clients', template: 'black_friday_promo', sent: 342, delivered: 336, read: 289, replied: 47, status: 'SENT', sentAt: '2026-08-20 10:00' },
  { id: 'wc2', name: 'Product Update — v3.0 Release', template: 'product_update', sent: 891, delivered: 880, read: 721, replied: 124, status: 'SENT', sentAt: '2026-08-18 09:30' },
  { id: 'wc3', name: 'Quarterly Check-in with Churned Users', template: 're_engagement', sent: 0, delivered: 0, read: 0, replied: 0, status: 'DRAFT', sentAt: null },
  { id: 'wc4', name: 'New Feature Announcement — AI Copilot', template: 'feature_announcement', sent: 1203, delivered: 1189, read: 943, replied: 201, status: 'SENT', sentAt: '2026-08-15 11:00' },
];

const WA_TEMPLATES = [
  { id: 't1', name: 'black_friday_promo', preview: '🎉 Black Friday Special! Get 30% off on EasyChat Enterprise plans this week only...' },
  { id: 't2', name: 'product_update', preview: '📦 We just released EasyChat v3.0 with AI Copilot, SAML SSO, and advanced reporting...' },
  { id: 't3', name: 're_engagement', preview: 'Hi {{1}}, we noticed you haven\'t been active recently. We\'d love to show you what\'s new...' },
  { id: 't4', name: 'feature_announcement', preview: '🚀 Introducing AI Copilot — your intelligent assistant in every conversation...' },
];

const statusConfig: Record<string, string> = {
  SENT: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  DRAFT: 'bg-slate-100 text-slate-600 border-slate-200',
  SENDING: 'bg-blue-100 text-blue-700 border-blue-200',
  FAILED: 'bg-red-100 text-red-700 border-red-200',
};

export default function WhatsAppBroadcastPage() {
  const [search, setSearch] = useState('');
  const [view, setView] = useState<'CAMPAIGNS' | 'NEW'>('CAMPAIGNS');

  const filtered = WHATSAPP_CAMPAIGNS.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
            <Megaphone className="w-7 h-7 text-emerald-500" />
            WhatsApp Broadcast Campaigns
          </h1>
          <p className="text-sm text-slate-500 mt-1">Send approved WhatsApp message templates to segmented contact lists.</p>
        </div>
        <button onClick={() => setView(view === 'NEW' ? 'CAMPAIGNS' : 'NEW')} className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-2">
          <Plus className="w-4 h-4" />
          {view === 'NEW' ? 'View Campaigns' : 'New Campaign'}
        </button>
      </div>

      {view === 'CAMPAIGNS' && (
        <>
          <div className="grid grid-cols-4 gap-5">
            {[
              { icon: Send, label: 'Total Messages Sent', value: WHATSAPP_CAMPAIGNS.reduce((a, c) => a + c.sent, 0).toLocaleString(), color: 'text-blue-500' },
              { icon: CheckCircle2, label: 'Avg Delivery Rate', value: '98.2%', color: 'text-emerald-500' },
              { icon: BarChart2, label: 'Avg Read Rate', value: '79.8%', color: 'text-amber-500' },
              { icon: Clock, label: 'Avg Reply Rate', value: '14.3%', color: 'text-purple-500' },
            ].map((kpi, idx) => {
              const Icon = kpi.icon;
              return (
                <div key={idx} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-2">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase"><Icon className={`w-4 h-4 ${kpi.color}`} />{kpi.label}</div>
                  <p className="text-2xl font-bold text-slate-900">{kpi.value}</p>
                </div>
              );
            })}
          </div>

          <div className="relative w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search campaigns..." className="w-full pl-9 pr-4 py-2.5 text-xs border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500" />
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 border-b border-slate-100 text-[10px] font-bold uppercase text-slate-500">
                <tr>
                  <th className="p-4">Campaign Name</th>
                  <th className="p-4">Template</th>
                  <th className="p-4">Sent</th>
                  <th className="p-4">Delivered</th>
                  <th className="p-4">Read</th>
                  <th className="p-4">Replied</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Sent At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {filtered.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50">
                    <td className="p-4 font-bold text-slate-900 max-w-xs truncate">{c.name}</td>
                    <td className="p-4 font-mono text-slate-600 text-[10px]">{c.template}</td>
                    <td className="p-4">{c.sent.toLocaleString()}</td>
                    <td className="p-4">{c.delivered.toLocaleString()}</td>
                    <td className="p-4">{c.read.toLocaleString()}</td>
                    <td className="p-4">{c.replied.toLocaleString()}</td>
                    <td className="p-4"><span className={`border px-2 py-0.5 rounded-full text-[10px] font-bold ${statusConfig[c.status]}`}>{c.status}</span></td>
                    <td className="p-4 text-slate-500">{c.sentAt ?? '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {view === 'NEW' && (
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2"><Send className="w-4 h-4 text-emerald-500" />Campaign Configuration</h3>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Campaign Name</label>
              <input placeholder="e.g. Q3 Product Update Blast" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:ring-2 focus:ring-emerald-500" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Select Template</label>
              <select className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:ring-2 focus:ring-emerald-500">
                {WA_TEMPLATES.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Target Audience</label>
              <select className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:ring-2 focus:ring-emerald-500">
                <option>All Active Contacts</option>
                <option>High-Value Customers (LTV &gt; $10k)</option>
                <option>Enterprise Prospects (Score ≥ 70)</option>
                <option>Churned Users (No activity 60d)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Scheduled Send Time</label>
              <input type="datetime-local" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:ring-2 focus:ring-emerald-500" />
            </div>
            <button className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center gap-2 transition-colors">
              <Send className="w-3.5 h-3.5" />Schedule Campaign
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
            <h3 className="font-bold text-slate-900 text-sm">Approved Templates</h3>
            <div className="space-y-3">
              {WA_TEMPLATES.map((t) => (
                <div key={t.id} className="border border-slate-200 rounded-xl p-4 hover:border-emerald-300 cursor-pointer transition-colors">
                  <p className="font-mono text-[10px] text-emerald-700 font-bold mb-1">{t.name}</p>
                  <p className="text-xs text-slate-600 line-clamp-2">{t.preview}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
