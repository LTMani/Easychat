'use client';

import React from 'react';
import { MessageSquare, Bot, UserCheck, Shield, Sparkles, Send } from 'lucide-react';

export default function LiveChatBridgePage() {
  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 shadow-sm">
            <MessageSquare className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Customer Portal Live Chat Gateway</h1>
            <p className="text-sm text-slate-500 mt-1">Real-time WebSocket chat bridge with grounded AI copilot and human agent handoff.</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2 text-xs font-bold text-emerald-900 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Live Agent Online
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <div className="h-64 bg-slate-50 rounded-xl p-4 overflow-y-auto space-y-3">
          <div className="flex gap-2.5">
            <div className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-none p-3 max-w-md shadow-2xs text-xs text-slate-800">
              Hello Sarah! I am your EasyChat AI Support Copilot. How can I help you with your workspace today?
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <input
            placeholder="Type your message..."
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-medium outline-none"
          />
          <button className="px-5 py-2.5 bg-[#4f46e5] text-white font-bold text-xs rounded-xl shadow-md shadow-indigo-500/20">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
