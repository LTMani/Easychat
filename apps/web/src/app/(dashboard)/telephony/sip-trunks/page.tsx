'use client';

import React from 'react';
import { PhoneCall, Server, ShieldCheck, Activity, Plus, CheckCircle2, Wifi } from 'lucide-react';

const TRUNKS = [
  { id: '1', name: 'US East Tier 1 Carrier Trunk', domain: 'sip.na-east.easychat.io', channels: '42 / 500 Active', codecs: ['OPUS', 'G.711u'], status: 'ONLINE', latency: '14ms' },
  { id: '2', name: 'EU West Frankfurt Gateway', domain: 'sip.eu-west.easychat.io', channels: '18 / 250 Active', codecs: ['G.711a', 'OPUS'], status: 'ONLINE', latency: '22ms' },
  { id: '3', name: 'Asia Pacific Singapore Hub', domain: 'sip.ap-south.easychat.io', channels: '9 / 100 Active', codecs: ['G.711a'], status: 'ONLINE', latency: '38ms' },
];

export default function SipTrunksPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 shadow-sm">
            <Server className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">SIP Carrier Trunks & Voice Gateways</h1>
            <p className="text-sm text-slate-500 mt-1">Multi-region PSTN carrier termination, Opus codec negotiation, and failover proxies.</p>
          </div>
        </div>

        <button className="px-4 py-2.5 bg-[#4f46e5] hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md shadow-indigo-500/20 flex items-center gap-2 transition-colors">
          <Plus className="w-4 h-4" /> Add Carrier Trunk
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TRUNKS.map((trunk) => (
          <div key={trunk.id} className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> {trunk.status}
              </span>
              <span className="text-[10px] font-mono font-bold text-slate-400 flex items-center gap-1">
                <Wifi className="w-3 h-3 text-emerald-500" /> {trunk.latency}
              </span>
            </div>

            <div className="space-y-1">
              <h3 className="font-bold text-slate-900 text-sm">{trunk.name}</h3>
              <p className="font-mono text-xs text-indigo-600 truncate">{trunk.domain}</p>
            </div>

            <div className="pt-2 border-t border-slate-100 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Channel Load:</span>
                <span className="font-mono font-bold text-slate-900">{trunk.channels}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Codecs:</span>
                <span className="font-mono text-slate-700">{trunk.codecs.join(', ')}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
