'use client';

import React, { useState } from 'react';
import { Share2, CheckCircle2, RefreshCw, Layers, Database, ArrowRight, Settings, Sliders, ExternalLink } from 'lucide-react';

const HUBSPOT_OBJECTS = [
  { id: 'contacts', name: 'Contacts', hsName: 'contacts', syncedCount: 4821, pendingCount: 0, status: 'CONNECTED', lastSync: '2 mins ago' },
  { id: 'companies', name: 'Companies', hsName: 'companies', syncedCount: 812, pendingCount: 0, status: 'CONNECTED', lastSync: '10 mins ago' },
  { id: 'deals', name: 'Deals & Pipelines', hsName: 'deals', syncedCount: 394, pendingCount: 2, status: 'SYNCING', lastSync: 'Just now' },
  { id: 'tickets', name: 'Service Tickets', hsName: 'tickets', syncedCount: 1420, pendingCount: 0, status: 'CONNECTED', lastSync: '15 mins ago' },
];

export default function HubSpotIntegrationPage() {
  const [syncing, setSyncing] = useState(false);
  const [apiKeySet, setApiKeySet] = useState(true);

  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => setSyncing(false), 2000);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shadow-sm">
            <Share2 className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">HubSpot CRM Integration</h1>
              <span className="bg-emerald-100 text-emerald-800 border border-emerald-200 text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> App Installed & Authorized
              </span>
            </div>
            <p className="text-sm text-slate-500 mt-1">Sync contacts, companies, deals, and support tickets with your HubSpot portal.</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSync}
            disabled={syncing}
            className="px-4 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-2 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${syncing ? 'animate-spin' : ''}`} />
            {syncing ? 'Syncing...' : 'Sync Now'}
          </button>
        </div>
      </div>

      {/* Sync Cards */}
      <div className="grid grid-cols-4 gap-5">
        {HUBSPOT_OBJECTS.map((obj) => (
          <div key={obj.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 text-sm">{obj.name}</span>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                {obj.status}
              </span>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{obj.syncedCount.toLocaleString()}</p>
              <p className="text-[10px] text-slate-500 font-mono">HubSpot Object: {obj.hsName}</p>
            </div>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
              <span>Last synced {obj.lastSync}</span>
              <button className="text-amber-600 font-bold hover:underline">Config</button>
            </div>
          </div>
        ))}
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <Sliders className="w-4 h-4 text-amber-500" />
            Sync Rules & Conflict Resolution
          </h3>
          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between border border-slate-100 rounded-xl p-3">
              <div>
                <p className="font-bold text-slate-900">Conflict Master</p>
                <p className="text-slate-500 text-[10px]">When a record is edited in both systems simultaneously</p>
              </div>
              <select className="border border-slate-200 rounded-lg px-2 py-1 text-xs outline-none bg-slate-50 font-medium">
                <option>Most Recent Edit Wins</option>
                <option>EasyChat Always Wins</option>
                <option>HubSpot Always Wins</option>
              </select>
            </div>

            <div className="flex items-center justify-between border border-slate-100 rounded-xl p-3">
              <div>
                <p className="font-bold text-slate-900">Auto-Create Contacts</p>
                <p className="text-slate-500 text-[10px]">Create HubSpot contact on new inbound conversation</p>
              </div>
              <input type="checkbox" defaultChecked className="rounded text-amber-600 focus:ring-amber-500" />
            </div>

            <div className="flex items-center justify-between border border-slate-100 rounded-xl p-3">
              <div>
                <p className="font-bold text-slate-900">Deal Stage Mapping</p>
                <p className="text-slate-500 text-[10px]">Map EasyChat pipeline stages to HubSpot deal stages</p>
              </div>
              <button className="text-amber-600 font-bold hover:underline">Map Stages →</button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <Layers className="w-4 h-4 text-amber-500" />
            HubSpot App Credentials
          </h3>
          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">HubSpot Portal ID (Hub ID)</label>
              <input readOnly value="4819201" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 font-mono text-slate-700 outline-none" />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Private App Access Token</label>
              <input type="password" readOnly value="pat-na1-9988-mock-token-xyz" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 font-mono text-slate-700 outline-none" />
            </div>
            <div className="pt-2">
              <a href="https://app.hubspot.com" target="_blank" rel="noreferrer" className="text-amber-600 hover:text-amber-700 font-bold text-xs flex items-center gap-1.5">
                Open HubSpot Portal <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
