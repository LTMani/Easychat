'use client';

import React, { useState } from 'react';
import { MessageSquare, CheckCircle2, Bell, Hash, Shield, Send, ExternalLink } from 'lucide-react';

const SLACK_CHANNELS = [
  { id: 'c1', name: '#sales-wins', purpose: 'Broadcasts when a deal is marked Closed Won', active: true, events: ['deal.won'] },
  { id: 'c2', name: '#support-alerts', purpose: 'Urgent ticket assignments & SLA breach alerts', active: true, events: ['ticket.sla_breached', 'ticket.urgent'] },
  { id: 'c3', name: '#leads-inbound', purpose: 'Notifications when new enterprise leads arrive', active: false, events: ['lead.high_score'] },
  { id: 'c4', name: '#general-crm', purpose: 'Daily performance digest and weekly reports', active: true, events: ['report.daily_digest'] },
];

export default function SlackIntegrationPage() {
  const [channels, setChannels] = useState(SLACK_CHANNELS);
  const [testingWebhook, setTestingWebhook] = useState(false);

  const toggleChannel = (id: string) => {
    setChannels((prev) => prev.map((c) => (c.id === id ? { ...c, active: !c.active } : c)));
  };

  const handleTestNotification = () => {
    setTestingWebhook(true);
    setTimeout(() => setTestingWebhook(false), 1500);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shadow-sm">
            <MessageSquare className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Slack Integration</h1>
              <span className="bg-emerald-100 text-emerald-800 border border-emerald-200 text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Connected to Acme Workspace
              </span>
            </div>
            <p className="text-sm text-slate-500 mt-1">Send rich interactive notifications and deal celebrations directly into your team channels.</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleTestNotification}
            disabled={testingWebhook}
            className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-2 transition-colors disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5" />
            {testingWebhook ? 'Sending Test...' : 'Send Test Alert'}
          </button>
        </div>
      </div>

      {/* Connected Workspace */}
      <div className="grid grid-cols-3 gap-5">
        {[
          { label: 'Workspace Name', value: 'Acme Corp Global', desc: 'team-acme.slack.com', icon: Hash },
          { label: 'Active Notification Channels', value: channels.filter((c) => c.active).length.toString(), desc: 'of 4 configured', icon: Bell },
          { label: 'Slash Commands', value: 'Enabled', desc: '/easychat contact, /easychat deal', icon: Shield },
        ].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-2">
              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase">
                <Icon className="w-4 h-4 text-emerald-600" />
                {item.label}
              </div>
              <p className="text-xl font-bold text-slate-900">{item.value}</p>
              <p className="text-xs text-slate-500">{item.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Channel Subscriptions */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Channel Notification Routing</h3>
            <p className="text-xs text-slate-500">Configure which events post to which Slack channels.</p>
          </div>
          <button className="px-3 py-1.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50">
            + Add Channel
          </button>
        </div>
        <div className="divide-y divide-slate-100">
          {channels.map((ch) => (
            <div key={ch.id} className="p-5 flex items-center justify-between hover:bg-slate-50">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-sm text-slate-900">{ch.name}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${ch.active ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'}`}>
                    {ch.active ? 'Active' : 'Muted'}
                  </span>
                </div>
                <p className="text-xs text-slate-500">{ch.purpose}</p>
                <div className="flex items-center gap-2 pt-1">
                  {ch.events.map((ev, i) => (
                    <span key={i} className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-mono text-[10px]">
                      {ev}
                    </span>
                  ))}
                </div>
              </div>
              <button
                onClick={() => toggleChannel(ch.id)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${ch.active ? 'bg-emerald-600' : 'bg-slate-200'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${ch.active ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
