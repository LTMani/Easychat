'use client';

import React, { useState } from 'react';
import { Phone, PhoneCall, PhoneMissed, PhoneOff, Clock, TrendingUp, Users, Mic, Search, Download } from 'lucide-react';

const CALL_LOG = [
  { id: 'c1', from: '+1 (555) 234-5678', to: '+1 (800) 000-1234', agent: 'Alex Mercer', duration: '3m 42s', status: 'COMPLETED', direction: 'INBOUND', recordingUrl: '#', date: '2026-08-25 09:12' },
  { id: 'c2', from: 'Alex Mercer', to: '+1 (555) 987-6543', agent: 'Alex Mercer', duration: '7m 15s', status: 'COMPLETED', direction: 'OUTBOUND', recordingUrl: '#', date: '2026-08-25 10:30' },
  { id: 'c3', from: '+1 (555) 456-7890', to: '+1 (800) 000-1234', agent: 'Priya Sharma', duration: '—', status: 'MISSED', direction: 'INBOUND', recordingUrl: null, date: '2026-08-25 11:05' },
  { id: 'c4', from: '+44 20 7946 0958', to: '+1 (800) 000-1234', agent: 'Jordan Blake', duration: '12m 08s', status: 'COMPLETED', direction: 'INBOUND', recordingUrl: '#', date: '2026-08-25 13:22' },
  { id: 'c5', from: 'Sam Chen', to: '+1 (555) 111-2222', agent: 'Sam Chen', duration: '2m 11s', status: 'COMPLETED', direction: 'OUTBOUND', recordingUrl: '#', date: '2026-08-25 14:01' },
];

const statusConfig: Record<string, { color: string; icon: React.ComponentType<{ className?: string }> }> = {
  COMPLETED: { color: 'text-emerald-600 bg-emerald-50 border-emerald-200', icon: PhoneCall },
  MISSED: { color: 'text-red-600 bg-red-50 border-red-200', icon: PhoneMissed },
  FAILED: { color: 'text-slate-500 bg-slate-50 border-slate-200', icon: PhoneOff },
};

export default function TelephonyAnalyticsPage() {
  const [search, setSearch] = useState('');
  const filtered = CALL_LOG.filter((c) => c.from.includes(search) || c.agent.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
            <Phone className="w-7 h-7 text-blue-600" />
            Telephony Call Analytics & Log
          </h1>
          <p className="text-sm text-slate-500 mt-1">Track inbound/outbound calls, listen to recordings, and monitor call center performance.</p>
        </div>
        <button className="px-4 py-2 border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 rounded-xl flex items-center gap-2">
          <Download className="w-3.5 h-3.5" />Export Logs
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-5">
        {[
          { icon: PhoneCall, label: 'Total Calls Today', value: '47', color: 'text-blue-500' },
          { icon: PhoneMissed, label: 'Missed Calls', value: '5', color: 'text-red-500' },
          { icon: Clock, label: 'Avg Call Duration', value: '5m 18s', color: 'text-amber-500' },
          { icon: TrendingUp, label: 'Answer Rate', value: '89.4%', color: 'text-emerald-500' },
        ].map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div key={idx} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-2">
              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase"><Icon className={`w-4 h-4 ${kpi.color}`} />{kpi.label}</div>
              <p className="text-2xl font-bold text-slate-900">{kpi.value}</p>
            </div>
          );
        })}
      </div>

      {/* Call Log */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2"><Users className="w-4 h-4 text-blue-500" />Recent Call Log</h3>
          <div className="relative w-56">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search caller or agent..." className="w-full pl-8 pr-4 py-2 text-xs border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-50 border-b border-slate-100 text-[10px] font-bold uppercase text-slate-500">
            <tr>
              <th className="p-4">Direction</th>
              <th className="p-4">From</th>
              <th className="p-4">To</th>
              <th className="p-4">Agent</th>
              <th className="p-4">Duration</th>
              <th className="p-4">Status</th>
              <th className="p-4">Date & Time</th>
              <th className="p-4">Recording</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {filtered.map((call) => {
              const cfg = statusConfig[call.status];
              const StatusIcon = cfg.icon;
              return (
                <tr key={call.id} className="hover:bg-slate-50">
                  <td className="p-4">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${call.direction === 'INBOUND' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-purple-50 text-purple-700 border-purple-200'}`}>{call.direction}</span>
                  </td>
                  <td className="p-4 font-mono text-slate-900 font-bold">{call.from}</td>
                  <td className="p-4 font-mono text-slate-600">{call.to}</td>
                  <td className="p-4">{call.agent}</td>
                  <td className="p-4">{call.duration}</td>
                  <td className="p-4">
                    <span className={`flex items-center gap-1.5 text-[10px] font-bold px-2 py-0.5 rounded-full border ${cfg.color}`}>
                      <StatusIcon className="w-3 h-3" />{call.status}
                    </span>
                  </td>
                  <td className="p-4 text-slate-500">{call.date}</td>
                  <td className="p-4">
                    {call.recordingUrl ? (
                      <button className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-bold text-[10px]"><Mic className="w-3 h-3" />Listen</button>
                    ) : <span className="text-slate-300 text-[10px]">—</span>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
