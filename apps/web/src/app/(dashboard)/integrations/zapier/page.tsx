'use client';

import React, { useState } from 'react';
import { Zap, CheckCircle2, Copy, ExternalLink, Plus, Trash2, ArrowRight } from 'lucide-react';

const ZAP_TEMPLATES = [
  { title: 'Create EasyChat contacts from Google Forms submissions', uses: '1.2k users', icon: '📝' },
  { title: 'Send Slack alerts when high-value deals are created', uses: '3.4k users', icon: '💬' },
  { title: 'Add new Stripe customers as EasyChat contacts with LTV', uses: '2.1k users', icon: '💳' },
  { title: 'Create Jira support tickets when SLA is breached', uses: '890 users', icon: '🎯' },
  { title: 'Sync Typeform lead responses into EasyChat lead queue', uses: '1.5k users', icon: '📋' },
];

const ACTIVE_HOOKS = [
  { id: 'zh_1', name: 'Google Sheets Lead Ingestion', event: 'contact.created', targetUrl: 'https://hooks.zapier.com/hooks/catch/12345/abcde/', status: 'ACTIVE', triggeredCount: 384 },
  { id: 'zh_2', name: 'Stripe Invoice Won Alert', event: 'deal.won', targetUrl: 'https://hooks.zapier.com/hooks/catch/12345/fghij/', status: 'ACTIVE', triggeredCount: 92 },
  { id: 'zh_3', name: 'Zendesk Ticket Mirror', event: 'ticket.created', targetUrl: 'https://hooks.zapier.com/hooks/catch/12345/klmno/', status: 'ACTIVE', triggeredCount: 1420 },
];

export default function ZapierIntegrationPage() {
  const [copiedKey, setCopiedKey] = useState(false);
  const apiKey = 'ech_live_zap_************************';

  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600 shadow-sm">
            <Zap className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Zapier Automation Hub</h1>
              <span className="bg-emerald-100 text-emerald-800 border border-emerald-200 text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Connected via API
              </span>
            </div>
            <p className="text-sm text-slate-500 mt-1">Connect EasyChat with 5,000+ apps without writing a single line of code.</p>
          </div>
        </div>

        <a
          href="https://zapier.com/apps/easychat/integrations"
          target="_blank"
          rel="noreferrer"
          className="px-4 py-2.5 bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-2 transition-colors"
        >
          Explore on Zapier <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* API Key Box */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-3">
        <h3 className="font-bold text-slate-900 text-sm">Your Zapier Authentication Key</h3>
        <p className="text-xs text-slate-500">Paste this API key when setting up the EasyChat app in Zapier.</p>
        <div className="flex items-center gap-3">
          <input
            readOnly
            value={apiKey}
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 font-mono text-xs text-slate-700 outline-none"
          />
          <button
            onClick={handleCopy}
            className="px-4 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl flex items-center gap-2"
          >
            {copiedKey ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            {copiedKey ? 'Copied!' : 'Copy Key'}
          </button>
        </div>
      </div>

      {/* Active Zap Webhooks */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Active Zapier Webhook Triggers</h3>
            <p className="text-xs text-slate-500">Events streaming to your active Zap workflows.</p>
          </div>
          <button className="px-3 py-1.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800">
            + New Zap Trigger
          </button>
        </div>
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-50 border-b border-slate-100 text-[10px] font-bold uppercase text-slate-500">
            <tr>
              <th className="p-4">Zap Name</th>
              <th className="p-4">Trigger Event</th>
              <th className="p-4">Webhook Endpoint</th>
              <th className="p-4">Status</th>
              <th className="p-4">Executions</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {ACTIVE_HOOKS.map((h) => (
              <tr key={h.id} className="hover:bg-slate-50">
                <td className="p-4 font-bold text-slate-900">{h.name}</td>
                <td className="p-4 font-mono text-orange-600">{h.event}</td>
                <td className="p-4 font-mono text-slate-400 max-w-xs truncate">{h.targetUrl}</td>
                <td className="p-4">
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {h.status}
                  </span>
                </td>
                <td className="p-4 font-bold text-slate-900">{h.triggeredCount.toLocaleString()}</td>
                <td className="p-4">
                  <button className="text-slate-400 hover:text-red-600">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Popular Templates */}
      <div className="space-y-4">
        <h3 className="font-bold text-slate-900 text-sm">Popular EasyChat Zap Templates</h3>
        <div className="grid grid-cols-2 gap-4">
          {ZAP_TEMPLATES.map((tmpl, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 flex items-center justify-between hover:border-orange-300 transition-colors">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{tmpl.icon}</span>
                <div>
                  <p className="font-bold text-slate-900 text-xs">{tmpl.title}</p>
                  <p className="text-[10px] text-slate-400">{tmpl.uses}</p>
                </div>
              </div>
              <button className="px-3 py-1.5 border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-bold flex items-center gap-1">
                Use Zap <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
