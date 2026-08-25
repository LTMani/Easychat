'use client';

import React, { useState } from 'react';
import { Smartphone, Send, Plus, Users, Clock, Shield, CheckCircle2 } from 'lucide-react';

export default function SmsBroadcastPage() {
  const [message, setMessage] = useState('Exclusive EasyChat Customer Update: Your account manager has generated a custom proposal for your team review: https://ech.io/q9948. Reply STOP to opt out.');
  const [recipientsCount, setRecipientsCount] = useState(1250);

  const charCount = message.length;
  const segments = charCount <= 160 ? 1 : Math.ceil(charCount / 153);
  const totalSmsUnits = recipientsCount * segments;

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shadow-sm">
            <Smartphone className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">SMS Broadcast Campaigns</h1>
            <p className="text-sm text-slate-500 mt-1">High-throughput SMS marketing and urgent notification broadcasts with opt-out compliance.</p>
          </div>
        </div>

        <button className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-2 transition-colors">
          <Send className="w-3.5 h-3.5" /> Launch Broadcast
        </button>
      </div>

      <div className="grid grid-cols-3 gap-8">
        {/* Campaign Composer */}
        <div className="col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <h3 className="font-bold text-slate-900 text-sm">Compose SMS Broadcast</h3>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Target Audience Segment</label>
              <select className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs outline-none bg-slate-50 font-medium">
                <option>Enterprise VIP Decision Makers (1,250 contacts)</option>
                <option>All US Customers with Open Opportunities (480 contacts)</option>
                <option>Trial Accounts Expiring in 7 Days (310 contacts)</option>
              </select>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1">
                <span>Message Text</span>
                <span className={`font-mono ${charCount > 160 ? 'text-amber-600' : 'text-slate-500'}`}>
                  {charCount} characters • {segments} segment{segments > 1 ? 's' : ''}
                </span>
              </div>
              <textarea
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full border border-slate-200 rounded-xl p-3.5 text-xs outline-none focus:ring-2 focus:ring-emerald-500 font-sans"
              />
              <p className="text-[10px] text-slate-400 mt-1">
                Standard SMS is 160 characters. Concatenated SMS uses 153 characters per segment.
              </p>
            </div>
          </div>
        </div>

        {/* Live Calculation Sidebar */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <h3 className="font-bold text-slate-900 text-sm">Campaign Estimation</h3>

          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between text-xs border-b border-slate-100 pb-2">
              <span className="text-slate-500">Recipients</span>
              <span className="font-bold text-slate-900 font-mono">{recipientsCount.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between text-xs border-b border-slate-100 pb-2">
              <span className="text-slate-500">Segments Per Contact</span>
              <span className="font-bold text-slate-900 font-mono">{segments}</span>
            </div>
            <div className="flex items-center justify-between text-xs border-b border-slate-100 pb-2">
              <span className="text-slate-500">Total SMS Units</span>
              <span className="font-bold text-emerald-600 font-mono text-base">{totalSmsUnits.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between text-xs border-b border-slate-100 pb-2">
              <span className="text-slate-500">Estimated Cost ($0.0075/ea)</span>
              <span className="font-bold text-slate-900 font-mono">${(totalSmsUnits * 0.0075).toFixed(2)}</span>
            </div>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-[10px] text-emerald-800 space-y-1">
            <p className="font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> TCPA & GDPR Compliant
            </p>
            <p>Opt-out keywords (STOP, CANCEL) are automatically intercepted and suppress future sends.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
