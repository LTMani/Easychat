'use client';

import React from 'react';
import { Server, Globe, Wifi, CheckCircle2, ShieldCheck, RefreshCw } from 'lucide-react';

const NODES = [
  { id: 'turn_iad_01', region: 'US East (N. Virginia)', uri: 'turn:turn-iad.na.easychat.io:3478', stun: 'stun:stun-iad.na.easychat.io:3478', load: '34%', latency: '12ms', health: 'HEALTHY' },
  { id: 'turn_fra_01', region: 'EU Central (Frankfurt)', uri: 'turn:turn-fra.eu.easychat.io:3478', stun: 'stun:stun-fra.eu.easychat.io:3478', load: '28%', latency: '18ms', health: 'HEALTHY' },
  { id: 'turn_sin_01', region: 'Asia Pacific (Singapore)', uri: 'turn:turn-sin.ap.easychat.io:3478', stun: 'stun:stun-sin.ap.easychat.io:3478', load: '19%', latency: '32ms', health: 'HEALTHY' },
];

export default function TurnClustersPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 shadow-sm">
            <Globe className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Global TURN/STUN Relay Clusters</h1>
            <p className="text-sm text-slate-500 mt-1">Geo-DNS edge routing, ephemeral HMAC token generation, and NAT traversal relays.</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-indigo-50 border border-indigo-200 rounded-xl px-4 py-2 text-xs font-bold text-indigo-900 shadow-xs">
          <CheckCircle2 className="w-4 h-4 text-indigo-600" /> Ephemeral Token Secret: Active
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {NODES.map((n) => (
          <div key={n.id} className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> {n.health}
              </span>
              <span className="text-[10px] font-mono font-bold text-slate-400 flex items-center gap-1">
                <Wifi className="w-3 h-3 text-emerald-500" /> {n.latency}
              </span>
            </div>

            <div className="space-y-1">
              <h3 className="font-bold text-slate-900 text-sm">{n.region}</h3>
              <p className="font-mono text-xs text-indigo-600 truncate">{n.uri}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-1 text-xs text-slate-500">
              <div className="flex justify-between">
                <span>STUN Endpoint:</span>
                <span className="font-mono text-slate-700 truncate max-w-[140px]">{n.stun}</span>
              </div>
              <div className="flex justify-between">
                <span>Relay Load:</span>
                <span className="font-mono font-bold text-slate-900">{n.load}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
