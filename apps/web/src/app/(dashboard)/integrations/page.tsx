'use client';

import React, { useState } from 'react';
import { Share2, Zap, Cloud, RefreshCw, CheckCircle2, ShieldCheck, ExternalLink } from 'lucide-react';

export default function IntegrationsPage() {
  const [integrations, setIntegrations] = useState([
    { id: 'zapier', name: 'Zapier Webhook Triggers', category: 'Automation', status: 'CONNECTED', icon: Zap, color: 'text-amber-500 bg-amber-50' },
    { id: 'salesforce', name: 'Salesforce Enterprise CRM', category: 'CRM Sync', status: 'ACTIVE', icon: Cloud, color: 'text-blue-500 bg-blue-50' },
    { id: 'hubspot', name: 'HubSpot Marketing Hub', category: 'Marketing', status: 'CONFIGURED', icon: Share2, color: 'text-orange-500 bg-orange-50' },
  ]);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
            <Share2 className="w-7 h-7 text-blue-600" />
            Integrations & Ecosystem Connectors
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Connect EasyChat CRM to Zapier, Salesforce, HubSpot, Slack, and external webhooks.
          </p>
        </div>

        <button className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-2 transition-colors">
          <ExternalLink className="w-4 h-4" />
          Explore Integration Directory
        </button>
      </div>

      {/* Integration Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {integrations.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-xl ${item.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 font-bold text-[10px] rounded-full uppercase border border-emerald-200 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    {item.status}
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 text-base">{item.name}</h3>
                <p className="text-xs text-slate-500">
                  Bidirectional data sync engine with real-time event streaming and retry handling.
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">{item.category}</span>
                <button className="text-blue-600 hover:text-blue-700 font-bold flex items-center gap-1">
                  Configure Settings
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
