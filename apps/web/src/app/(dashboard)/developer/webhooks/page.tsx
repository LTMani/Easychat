'use client';

import React, { useState } from 'react';
import { Webhook, Plus, CheckCircle2, XCircle, RefreshCw, Send, Shield, Key } from 'lucide-react';

const WEBHOOK_SUBSCRIPTIONS = [
  { id: 'wh_01', url: 'https://api.acme.com/crm/webhooks/easychat', events: ['contact.created', 'deal.won', 'ticket.created'], status: 'ACTIVE', successRate: '99.8%', lastTriggered: '4 mins ago', secret: 'whsec_9948271038472910' },
  { id: 'wh_02', url: 'https://hooks.slack.com/services/T00/B00/XXXX', events: ['deal.won'], status: 'ACTIVE', successRate: '100.0%', lastTriggered: '1 hour ago', secret: 'whsec_1102938471029384' },
  { id: 'wh_03', url: 'https://staging.internal.net/events/listener', events: ['*'], status: 'PAUSED', successRate: '94.2%', lastTriggered: 'Yesterday', secret: 'whsec_4492019283746152' },
];

const RECENT_DELIVERIES = [
  { id: 'del_101', event: 'deal.won', webhookId: 'wh_01', status: 200, latencyMs: 240, timestamp: '14:45:12' },
  { id: 'del_102', event: 'contact.created', webhookId: 'wh_01', status: 200, latencyMs: 180, timestamp: '14:40:00' },
  { id: 'del_103', event: 'ticket.created', webhookId: 'wh_01', status: 200, latencyMs: 310, timestamp: '14:32:45' },
  { id: 'del_104', event: 'deal.won', webhookId: 'wh_02', status: 200, latencyMs: 145, timestamp: '13:45:00' },
];

export default function WebhookSubscriptionsPage() {
  const [testingId, setTestingId] = useState<string | null>(null);

  const handleTest = (id: string) => {
    setTestingId(id);
    setTimeout(() => setTestingId(null), 1500);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 shadow-sm">
            <Webhook className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Webhook Subscriptions & Event Streaming</h1>
            <p className="text-sm text-slate-500 mt-1">Receive real-time HTTPS webhook notifications with HMAC-SHA256 signatures for CRM events.</p>
          </div>
        </div>

        <button className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-2 transition-colors">
          <Plus className="w-4 h-4" /> Add Webhook Endpoint
        </button>
      </div>

      {/* Subscriptions Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100">
          <h3 className="font-bold text-slate-900 text-sm">Configured Webhook Endpoints</h3>
        </div>
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-50 border-b border-slate-100 text-[10px] font-bold uppercase text-slate-500">
            <tr>
              <th className="p-4">Endpoint Target URL</th>
              <th className="p-4">Subscribed Events</th>
              <th className="p-4">Status</th>
              <th className="p-4">Success Rate</th>
              <th className="p-4">Last Event</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {WEBHOOK_SUBSCRIPTIONS.map((wh) => (
              <tr key={wh.id} className="hover:bg-slate-50">
                <td className="p-4">
                  <p className="font-mono font-bold text-slate-900">{wh.url}</p>
                  <p className="font-mono text-[10px] text-slate-400">Secret: {wh.secret.slice(0, 10)}••••••••</p>
                </td>
                <td className="p-4">
                  <div className="flex gap-1.5 flex-wrap">
                    {wh.events.map((ev, i) => (
                      <span key={i} className="bg-indigo-50 text-indigo-800 border border-indigo-200 font-mono font-bold px-2 py-0.5 rounded text-[10px]">
                        {ev}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="p-4">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${wh.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'}`}>
                    {wh.status}
                  </span>
                </td>
                <td className="p-4 font-bold text-emerald-600 font-mono">{wh.successRate}</td>
                <td className="p-4 text-slate-500">{wh.lastTriggered}</td>
                <td className="p-4">
                  <button
                    onClick={() => handleTest(wh.id)}
                    disabled={testingId === wh.id}
                    className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg text-xs flex items-center gap-1.5"
                  >
                    <Send className={`w-3 h-3 ${testingId === wh.id ? 'animate-bounce' : ''}`} />
                    {testingId === wh.id ? 'Sending...' : 'Test Event'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Recent Deliveries */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-sm">Recent Webhook Deliveries</h3>
          <span className="text-[10px] text-slate-400 font-mono">Auto-refreshing every 5s</span>
        </div>
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-50 border-b border-slate-100 text-[10px] font-bold uppercase text-slate-500">
            <tr>
              <th className="p-4">Delivery ID</th>
              <th className="p-4">Event Type</th>
              <th className="p-4">HTTP Status</th>
              <th className="p-4">Response Latency</th>
              <th className="p-4">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-mono text-slate-700">
            {RECENT_DELIVERIES.map((del) => (
              <tr key={del.id} className="hover:bg-slate-50">
                <td className="p-4 font-bold text-slate-900">{del.id}</td>
                <td className="p-4 text-indigo-600 font-bold">{del.event}</td>
                <td className="p-4">
                  <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold text-[10px]">
                    HTTP {del.status} OK
                  </span>
                </td>
                <td className="p-4 text-slate-500">{del.latencyMs}ms</td>
                <td className="p-4 text-slate-400">{del.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
