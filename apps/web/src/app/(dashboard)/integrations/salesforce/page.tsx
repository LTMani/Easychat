'use client';

import React from 'react';
import { Cloud, Database, CheckCircle2, ShieldCheck, RefreshCw, Plus } from 'lucide-react';

const OBJECTS = [
  { sObject: 'Lead', syncedCount: 1152, cdc: 'Enabled', status: 'STREAMING' },
  { sObject: 'Contact', syncedCount: 2543, cdc: 'Enabled', status: 'STREAMING' },
  { sObject: 'Account', syncedCount: 480, cdc: 'Enabled', status: 'STREAMING' },
  { sObject: 'Opportunity', syncedCount: 78, cdc: 'Enabled', status: 'STREAMING' },
];

export default function SalesforcePage() {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 shadow-sm font-black text-xl">
            SF
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Salesforce Enterprise CDC Connector</h1>
            <p className="text-sm text-slate-500 mt-1">Real-time Change Data Capture (CDC), SOQL query execution, and multi-tenant org bridging.</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-sky-50 border border-sky-200 rounded-xl px-4 py-2 text-xs font-bold text-sky-900 shadow-xs">
          <CheckCircle2 className="w-4 h-4 text-sky-600" /> Connected: na142.salesforce.com (v60.0)
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden divide-y divide-slate-100">
        {OBJECTS.map((obj, idx) => (
          <div key={idx} className="p-6 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <span className="font-mono font-black text-slate-900 text-sm">{obj.sObject}</span>
                <span className="bg-sky-50 text-sky-700 border border-sky-200 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  CDC {obj.cdc}
                </span>
              </div>
              <p className="text-xs text-slate-500">{obj.syncedCount.toLocaleString()} active records synced in real-time</p>
            </div>

            <div className="flex items-center gap-3">
              <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> {obj.status}
              </span>
              <button className="px-3 py-1.5 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-lg">
                SOQL Studio
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
