'use client';

import React from 'react';
import { GitPullRequest, Play, CheckCircle2, Layers, Cpu, ArrowRight, Zap, Sparkles } from 'lucide-react';

const NODES = [
  { id: 'start_01', type: 'START_EVENT', label: 'Inbound Lead Created', status: 'EXECUTED', desc: 'Webhook triggers pipeline upon form submission' },
  { id: 'enrich_task_02', type: 'SERVICE_TASK', label: 'Firmographic Enrichment', status: 'EXECUTED', desc: 'Clearbit API auto-fills company revenue, headcount, tech stack' },
  { id: 'gw_vip_03', type: 'EXCLUSIVE_GATEWAY', label: 'VIP Threshold Gateway', status: 'EVALUATED', desc: 'Evaluates deal value >= $50k or employee count >= 500' },
  { id: 'vip_route_04', type: 'SERVICE_TASK', label: 'Dedicated AE & Slack Alert', status: 'COMPLETED', desc: 'Directly routes lead to VP of Sales with instant notification' },
  { id: 'end_06', type: 'END_EVENT', label: 'Lead Fully Provisioned', status: 'FINISHED', desc: 'Customer 360 CDP profile initialized in CRM' },
];

export default function BpmnDesignerPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 shadow-sm">
            <GitPullRequest className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">BPMN 2.0 Workflow Orchestration Engine</h1>
            <p className="text-sm text-slate-500 mt-1">Visual state machine workflow orchestration with automated exclusive gateways and compensation runners.</p>
          </div>
        </div>

        <button className="px-4 py-2.5 bg-[#4f46e5] hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md shadow-indigo-500/20 flex items-center gap-2">
          <Play className="w-4 h-4" /> Trigger Test BPMN Run
        </button>
      </div>

      <div className="space-y-4">
        {NODES.map((n, idx) => (
          <div key={n.id} className="bg-white rounded-2xl border border-slate-200 p-6 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-700 font-mono font-bold text-xs">
                #{idx + 1}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <h3 className="font-bold text-slate-900 text-sm">{n.label}</h3>
                  <span className="bg-indigo-50 text-indigo-700 border border-indigo-200 text-[10px] font-bold px-2 py-0.5 rounded-full font-mono">
                    {n.type}
                  </span>
                </div>
                <p className="text-xs text-slate-500">{n.desc}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> {n.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
