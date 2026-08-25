'use client';

import React from 'react';
import { Database, Zap, Sparkles, TrendingUp, Cpu, Server, CheckCircle2 } from 'lucide-react';

const CACHED_ENTRIES = [
  { id: '1', query: 'What is your refund policy?', hits: 842, latencySaved: '378s', costSaved: '$18.52', updated: '10 mins ago' },
  { id: '2', query: 'What are the enterprise SLA response tiers?', hits: 614, latencySaved: '276s', costSaved: '$13.50', updated: '22 mins ago' },
  { id: '3', query: 'How do I generate an API key?', hits: 490, latencySaved: '220s', costSaved: '$10.78', updated: '1 hour ago' },
  { id: '4', query: 'What CRM integrations do you support?', hits: 388, latencySaved: '174s', costSaved: '$8.53', updated: '3 hours ago' },
];

export default function SemanticCachePage() {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shadow-sm">
            <Zap className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">AI Semantic Vector Cache</h1>
            <p className="text-sm text-slate-500 mt-1">High-performance embedding vector cache reducing LLM inference costs and latency by 85%.</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-2 text-xs font-bold text-amber-900 shadow-xs">
          <Zap className="w-4 h-4 text-amber-600" /> Cache Hit Rate: 68.4%
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-2 shadow-sm">
          <span className="text-[10px] font-bold uppercase text-slate-400">Total Queries Served From Cache</span>
          <p className="text-2xl font-black text-slate-900 font-mono">12,480</p>
          <p className="text-xs text-slate-500">Zero model tokens consumed</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-2 shadow-sm">
          <span className="text-[10px] font-bold uppercase text-slate-400">Average Response Latency</span>
          <p className="text-2xl font-black text-emerald-600 font-mono">18ms</p>
          <p className="text-xs text-slate-500">Down from 650ms full LLM roundtrip</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-2 shadow-sm">
          <span className="text-[10px] font-bold uppercase text-slate-400">Estimated API Cost Savings</span>
          <p className="text-2xl font-black text-indigo-600 font-mono">$274.50</p>
          <p className="text-xs text-slate-500">This billing period</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-sm">Top Cached AI Queries</h3>
          <span className="text-xs text-slate-400">Sorted by hit frequency</span>
        </div>
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-50 border-b border-slate-100 text-[10px] font-bold uppercase text-slate-500">
            <tr>
              <th className="p-4">Customer Query</th>
              <th className="p-4">Total Cache Hits</th>
              <th className="p-4">Latency Saved</th>
              <th className="p-4">Cost Saved</th>
              <th className="p-4 text-right">Last Hit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {CACHED_ENTRIES.map((e) => (
              <tr key={e.id} className="hover:bg-slate-50">
                <td className="p-4 font-bold text-slate-900">{e.query}</td>
                <td className="p-4 font-mono font-bold text-indigo-600">{e.hits}</td>
                <td className="p-4 font-mono text-emerald-600">{e.latencySaved}</td>
                <td className="p-4 font-mono">{e.costSaved}</td>
                <td className="p-4 text-right text-slate-400">{e.updated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
