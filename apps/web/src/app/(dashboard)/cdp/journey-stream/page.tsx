'use client';

import React from 'react';
import { Activity, Globe, Eye, ShoppingCart, MessageCircle, FileText, CheckCircle2, ArrowRight } from 'lucide-react';

const EVENTS = [
  { id: '1', time: '10:42 AM', type: 'FORM_SUBMIT', profile: 'Sarah Jenkins (Acme Corp)', detail: 'Submitted Enterprise CPQ Custom Quote Request', icon: FileText, color: 'text-emerald-600 bg-emerald-50' },
  { id: '2', time: '10:38 AM', type: 'PRICING_VIEWED', profile: 'Sarah Jenkins (Acme Corp)', detail: 'Viewed Enterprise Tier Pricing Matrix (Time on page: 4m 12s)', icon: Eye, color: 'text-blue-600 bg-blue-50' },
  { id: '3', time: '10:32 AM', type: 'CHAT_INITIATED', profile: 'Jonathan Vance (TechSolutions)', detail: 'Asked AI Assistant: "What is the 15-minute SLA guarantee?"', icon: MessageCircle, color: 'text-purple-600 bg-purple-50' },
  { id: '4', time: '10:15 AM', type: 'PAGE_VIEW', profile: 'Anonymous (IP: 192.168.1.102)', detail: 'Landed on /integrations/whatsapp from Google Search CPC campaign', icon: Globe, color: 'text-slate-600 bg-slate-50' },
  { id: '5', time: '09:50 AM', type: 'CHECKOUT_STARTED', profile: 'Priya Sharma (Mumbai Tech)', detail: 'Initiated Professional Annual Subscription Checkout', icon: ShoppingCart, color: 'text-amber-600 bg-amber-50' },
];

export default function JourneyStreamPage() {
  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shadow-sm">
            <Activity className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Live Customer Journey Stream</h1>
            <p className="text-sm text-slate-500 mt-1">Real-time omnichannel event ingestion, intent detection, and visitor session replay.</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2 text-xs font-bold text-emerald-800 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Streaming Live (WebSocket Ingestion)
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
        <div className="space-y-4">
          {EVENTS.map((e) => {
            const Icon = e.icon;
            return (
              <div key={e.id} className="p-4 rounded-xl border border-slate-100 hover:border-slate-200 flex items-center justify-between gap-4 transition-colors">
                <div className="flex items-center gap-3.5">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${e.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-900 text-xs">{e.profile}</h4>
                      <span className="bg-slate-100 text-slate-600 text-[10px] font-mono font-bold px-1.5 py-0.2 rounded">
                        {e.type}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">{e.detail}</p>
                  </div>
                </div>

                <span className="text-[11px] font-mono font-bold text-slate-400 shrink-0">
                  {e.time}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
