'use client';

import React from 'react';
import { RefreshCw, CheckCircle2, ArrowRightLeft, Database, Globe, Plus } from 'lucide-react';

const MAPPINGS = [
  { easyChat: 'email', hubspot: 'email', direction: 'Two-Way (Sync)', status: 'ACTIVE' },
  { easyChat: 'firstName', hubspot: 'firstname', direction: 'Two-Way (Sync)', status: 'ACTIVE' },
  { easyChat: 'lastName', hubspot: 'lastname', direction: 'Two-Way (Sync)', status: 'ACTIVE' },
  { easyChat: 'leadScore', hubspot: 'hs_lead_score', direction: 'EasyChat → HubSpot', status: 'ACTIVE' },
  { easyChat: 'lifecycleStage', hubspot: 'lifecyclestage', direction: 'Two-Way (Sync)', status: 'ACTIVE' },
];

export default function HubspotSyncPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600 shadow-sm font-black text-xl">
            HS
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">HubSpot CRM Bidirectional Sync</h1>
            <p className="text-sm text-slate-500 mt-1">Real-time object mapping, contact attribute syncing, and timestamp conflict resolution.</p>
          </div>
        </div>

        <button className="px-4 py-2.5 bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs rounded-xl shadow-md shadow-orange-500/20 flex items-center gap-2 transition-colors">
          <RefreshCw className="w-4 h-4" /> Trigger Full Sync Now
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-2 shadow-sm">
          <span className="text-[10px] font-bold uppercase text-slate-400">Total Contacts Synced</span>
          <p className="text-2xl font-black text-slate-900 font-mono">2,543</p>
          <p className="text-xs text-slate-500">100% matched across both systems</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-2 shadow-sm">
          <span className="text-[10px] font-bold uppercase text-slate-400">Companies Processed</span>
          <p className="text-2xl font-black text-orange-600 font-mono">480</p>
          <p className="text-xs text-slate-500">Accounts and parent hierarchies</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-2 shadow-sm">
          <span className="text-[10px] font-bold uppercase text-slate-400">Last Sync Time</span>
          <p className="text-2xl font-black text-emerald-600 font-mono">Just Now</p>
          <p className="text-xs text-slate-500">0 sync errors or dropped records</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-sm">Active Field Mappings</h3>
          <span className="text-xs text-slate-400">HubSpot API v3 Schema</span>
        </div>
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-50 border-b border-slate-100 text-[10px] font-bold uppercase text-slate-500">
            <tr>
              <th className="p-4">EasyChat Property</th>
              <th className="p-4">Sync Direction</th>
              <th className="p-4">HubSpot Property</th>
              <th className="p-4 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {MAPPINGS.map((m, idx) => (
              <tr key={idx} className="hover:bg-slate-50">
                <td className="p-4 font-mono font-bold text-indigo-600">{m.easyChat}</td>
                <td className="p-4 font-semibold text-slate-500">{m.direction}</td>
                <td className="p-4 font-mono text-orange-600">{m.hubspot}</td>
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
