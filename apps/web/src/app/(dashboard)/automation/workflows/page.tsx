'use client';

import React, { useState } from 'react';
import { Zap, Plus, ToggleLeft, ToggleRight, Play, Edit, Clock, CheckCircle2, XCircle, ChevronRight } from 'lucide-react';

const TRIGGER_LABELS: Record<string, string> = {
  CONTACT_CREATED: 'Contact Created',
  DEAL_STAGE_CHANGED: 'Deal Stage Changed',
  TICKET_CREATED: 'Ticket Created',
  SLA_BREACHED: 'SLA Breached',
  LEAD_SCORED: 'Lead Scored',
  CONVERSATION_STARTED: 'Conversation Started',
};

const WORKFLOWS = [
  {
    id: 'wf1', name: 'New High-Value Lead — Instant Notify', trigger: 'LEAD_SCORED', enabled: true, executions: 148, lastRan: '2 hours ago',
    conditions: [{ field: 'score', operator: 'GREATER_THAN', value: 75 }],
    actions: [{ type: 'SEND_EMAIL', label: 'Send intro email to lead owner' }, { type: 'CREATE_TASK', label: 'Schedule follow-up call in 24h' }],
  },
  {
    id: 'wf2', name: 'SLA Breach Auto-Escalate to Manager', trigger: 'SLA_BREACHED', enabled: true, executions: 23, lastRan: '1 day ago',
    conditions: [{ field: 'priority', operator: 'EQUALS', value: 'URGENT' }],
    actions: [{ type: 'ASSIGN_AGENT', label: 'Assign to senior support manager' }, { type: 'SEND_WHATSAPP', label: 'Send WhatsApp alert to manager' }],
  },
  {
    id: 'wf3', name: 'Deal Won — Celebrate + Sync to Salesforce', trigger: 'DEAL_STAGE_CHANGED', enabled: false, executions: 67, lastRan: '3 days ago',
    conditions: [{ field: 'stage.name', operator: 'EQUALS', value: 'Closed Won' }],
    actions: [{ type: 'TRIGGER_WEBHOOK', label: 'Push deal to Salesforce via webhook' }, { type: 'SEND_EMAIL', label: 'Send congratulations email to agent' }],
  },
  {
    id: 'wf4', name: 'New Contact Welcome Journey', trigger: 'CONTACT_CREATED', enabled: true, executions: 512, lastRan: '30 minutes ago',
    conditions: [],
    actions: [{ type: 'SEND_EMAIL', label: 'Send personalized welcome email' }, { type: 'ADD_TAG', label: 'Add tag: onboarding' }, { type: 'CREATE_TASK', label: 'Create task: Verify contact details' }],
  },
];

const actionColorMap: Record<string, string> = {
  SEND_EMAIL: 'bg-blue-100 text-blue-700',
  SEND_WHATSAPP: 'bg-emerald-100 text-emerald-700',
  ASSIGN_AGENT: 'bg-purple-100 text-purple-700',
  TRIGGER_WEBHOOK: 'bg-amber-100 text-amber-700',
  ADD_TAG: 'bg-pink-100 text-pink-700',
  CREATE_TASK: 'bg-indigo-100 text-indigo-700',
};

export default function WorkflowAutomationPage() {
  const [workflows, setWorkflows] = useState(WORKFLOWS);

  const toggleWorkflow = (id: string) => {
    setWorkflows((prev) => prev.map((w) => w.id === id ? { ...w, enabled: !w.enabled } : w));
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
            <Zap className="w-7 h-7 text-amber-500" />
            Workflow Automation
          </h1>
          <p className="text-sm text-slate-500 mt-1">Build no-code automations triggered by CRM events to reduce manual work.</p>
        </div>
        <button className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-2 transition-colors">
          <Plus className="w-4 h-4" />New Workflow
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-5">
        {[
          { label: 'Active Workflows', value: workflows.filter((w) => w.enabled).length.toString(), color: 'text-emerald-500' },
          { label: 'Total Executions', value: workflows.reduce((a, w) => a + w.executions, 0).toLocaleString(), color: 'text-blue-500' },
          { label: 'Paused', value: workflows.filter((w) => !w.enabled).length.toString(), color: 'text-amber-500' },
          { label: 'Actions Automated', value: workflows.reduce((a, w) => a + w.actions.length, 0).toString(), color: 'text-purple-500' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
            <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">{stat.label}</p>
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Workflow Cards */}
      <div className="space-y-4">
        {workflows.map((wf) => (
          <div key={wf.id} className={`bg-white rounded-2xl border shadow-sm transition-all ${wf.enabled ? 'border-slate-200' : 'border-dashed border-slate-300 opacity-70'}`}>
            <div className="p-5">
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Zap className={`w-4 h-4 ${wf.enabled ? 'text-amber-500' : 'text-slate-400'}`} />
                    <h3 className="font-bold text-slate-900 text-sm">{wf.name}</h3>
                    <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full text-[10px] font-bold border border-amber-200">
                      {TRIGGER_LABELS[wf.trigger]}
                    </span>
                  </div>

                  {/* Conditions */}
                  {wf.conditions.length > 0 && (
                    <div className="flex items-center gap-1 flex-wrap mb-2">
                      <span className="text-[10px] font-bold text-slate-500 mr-1">IF:</span>
                      {wf.conditions.map((cond, idx) => (
                        <span key={idx} className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full text-[10px] font-bold">
                          {cond.field} {cond.operator.replace('_', ' ').toLowerCase()} {cond.value}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-bold text-slate-500 mr-1">THEN:</span>
                    {wf.actions.map((action, idx) => (
                      <React.Fragment key={idx}>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${actionColorMap[action.type] ?? 'bg-slate-100 text-slate-700'}`}>{action.label}</span>
                        {idx < wf.actions.length - 1 && <ChevronRight className="w-3 h-3 text-slate-400" />}
                      </React.Fragment>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 mt-3 text-[10px] text-slate-500 font-medium">
                    <span className="flex items-center gap-1"><Play className="w-3 h-3" />{wf.executions} executions</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />Last ran {wf.lastRan}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-500">
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => toggleWorkflow(wf.id)} className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${wf.enabled ? 'bg-amber-500' : 'bg-slate-200'}`}>
                    <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${wf.enabled ? 'translate-x-4' : 'translate-x-1'}`} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
