'use client';

import React, { useState } from 'react';
import { UserCheck, Clock, MessageSquare, LifeBuoy, FileText, Phone, ArrowUpRight } from 'lucide-react';

export default function Customer360CdpPage() {
  const [timelineEvents, setTimelineEvents] = useState([
    { id: 'ev_1', eventType: 'TICKET', title: 'Support Ticket TCK-2026-8801 Created', description: 'Inbound Webhook Verification Latency Issue', timestamp: '2026-08-25 10:30', icon: LifeBuoy, color: 'text-purple-600 bg-purple-50' },
    { id: 'ev_2', eventType: 'DEAL', title: 'Quote QT-2026-0091 Sent', description: 'Global Logistics - 200 Seat Upgrade ($48,000.00)', timestamp: '2026-08-24 16:15', icon: FileText, color: 'text-blue-600 bg-blue-50' },
    { id: 'ev_3', eventType: 'VOICE_CALL', title: 'WebRTC Inbound Call Completed', description: 'Duration: 4m 12s (Agent: Alex Mercer)', timestamp: '2026-08-24 14:00', icon: Phone, color: 'text-emerald-600 bg-emerald-50' },
  ]);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
            <UserCheck className="w-7 h-7 text-blue-600" />
            Customer 360 CDP & Unified Timeline Stream
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Aggregated cross-channel interaction stream for David Miller (Global Logistics Solutions).
          </p>
        </div>

        <button className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-2 transition-colors">
          <ArrowUpRight className="w-4 h-4" />
          Export Customer CDP Profile
        </button>
      </div>

      {/* Customer Overview Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white font-bold text-xl flex items-center justify-center">
            DM
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">David Miller</h2>
            <p className="text-xs text-slate-500">Chief Technology Officer • Global Logistics Solutions</p>
            <p className="text-xs font-mono text-slate-400 mt-1">david.miller@globallogistics.com</p>
          </div>
        </div>

        <div className="flex items-center gap-6 text-xs border-t md:border-t-0 pt-4 md:pt-0 border-slate-100">
          <div>
            <span className="text-slate-400 font-medium block">Lifetime Value</span>
            <span className="font-bold text-slate-900 text-sm">$24,500.00</span>
          </div>
          <div>
            <span className="text-slate-400 font-medium block">Lead Score</span>
            <span className="font-bold text-emerald-600 text-sm">92 / 100</span>
          </div>
        </div>
      </div>

      {/* Unified Event Stream Timeline */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
        <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wide flex items-center gap-2">
          <Clock className="w-4 h-4 text-blue-600" />
          Cross-Channel Activity Log
        </h3>

        <div className="relative border-l-2 border-slate-100 ml-4 pl-6 space-y-6">
          {timelineEvents.map((ev) => {
            const Icon = ev.icon;
            return (
              <div key={ev.id} className="relative">
                <div className={`absolute -left-[35px] top-0 p-2 rounded-xl ${ev.color} border border-slate-200 shadow-sm`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-900 text-sm">{ev.title}</h4>
                    <span className="text-[10px] font-mono text-slate-400">{ev.timestamp}</span>
                  </div>
                  <p className="text-xs text-slate-500">{ev.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
