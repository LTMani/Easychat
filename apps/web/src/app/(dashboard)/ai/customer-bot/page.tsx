'use client';

import React from 'react';
import { Bot, Sparkles, Sliders, ShieldCheck, Database, CheckCircle2, MessageSquare } from 'lucide-react';
import { AiCustomerSupportWidget } from '@/components/AiCustomerSupportWidget';

export default function CustomerBotPlaygroundPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 shadow-sm">
            <Bot className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">AI Customer Support Bot Studio</h1>
            <p className="text-sm text-slate-500 mt-1">Grounded RAG conversational assistant with dynamic tool execution, knowledge base citations, and human escalation.</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-indigo-50 border border-indigo-200 rounded-xl px-4 py-2 text-xs font-bold text-indigo-900 shadow-xs">
          <Sparkles className="w-4 h-4 text-indigo-600" /> RAG Model: Grounded Knowledge v2
        </div>
      </div>

      <div className="grid grid-cols-5 gap-8 items-start">
        {/* Left Side: Bot Configuration Controls */}
        <div className="col-span-3 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Sliders className="w-4 h-4 text-slate-500" /> Model Grounding & Parameters
            </h3>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">System Prompt Grounding Persona</label>
                <textarea
                  rows={4}
                  defaultValue="You are the official EasyChat CRM customer support AI assistant. Answer accurately based ONLY on verified Knowledge Base documents. If a customer mentions a ticket ID, execute getTicketStatus(). If a customer expresses high frustration or requests a manager, execute escalateToHumanAgent()."
                  className="w-full font-mono bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Temperature (Strictness: 0.1)</label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    defaultValue="0.1"
                    className="w-full accent-indigo-600"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">Low temperature ensures 0% hallucination on pricing & SLAs.</p>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Confidence Threshold</label>
                  <input
                    type="range"
                    min="50"
                    max="100"
                    defaultValue="85"
                    className="w-full accent-indigo-600"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">Escalates to human agent if confidence &lt; 85%.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Active Knowledge Sources */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Database className="w-4 h-4 text-slate-500" /> Grounded Knowledge Sources & Tools
            </h3>

            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900">Pricing & Editions Catalog</h4>
                  <p className="text-[10px] text-slate-500">Starter ($49), Pro ($99), Enterprise ($249/mo)</p>
                </div>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Indexed (100% Match)
                </span>
              </div>

              <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900">Support Ticket Real-Time Lookup Tool</h4>
                  <p className="text-[10px] text-slate-500">API Tool: `getTicketStatus(ticketNumber)`</p>
                </div>
                <span className="bg-purple-100 text-purple-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Live Function
                </span>
              </div>

              <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900">Enterprise SLA Policy Rules</h4>
                  <p className="text-[10px] text-slate-500">15m Urgent SLA, 99.9% Uptime SLA</p>
                </div>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Indexed
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Live Chatbot Simulator */}
        <div className="col-span-2 flex flex-col items-center">
          <AiCustomerSupportWidget />
        </div>
      </div>
    </div>
  );
}
