'use client';

import React, { useState } from 'react';
import { GitFork, Plus, UserCheck, Sliders, Shield, Zap, CheckCircle2 } from 'lucide-react';

const AGENTS = [
  { id: 'u1', name: 'Sarah Jenkins', email: 'sarah@acme.com', skills: ['BILLING', 'ENTERPRISE', 'SAML'], capacity: 5, active: 2, status: 'AVAILABLE' },
  { id: 'u2', name: 'Alex Mercer', email: 'alex@acme.com', skills: ['TECH_SUPPORT', 'API', 'WEBHOOKS'], capacity: 5, active: 4, status: 'AVAILABLE' },
  { id: 'u3', name: 'Priya Sharma', email: 'priya@acme.com', skills: ['WHATSAPP', 'SALES_VIP', 'ONBOARDING'], capacity: 6, active: 1, status: 'AVAILABLE' },
  { id: 'u4', name: 'Sam Chen', email: 'sam@acme.com', skills: ['GENERAL_SUPPORT'], capacity: 4, active: 0, status: 'OFFLINE' },
];

const ROUTING_RULES = [
  { id: 'r1', name: 'Enterprise Billing & Upgrade Inquiries', priority: 1, channel: 'LIVE_CHAT', requiredSkills: ['BILLING', 'ENTERPRISE'], fallback: 'Round Robin' },
  { id: 'r2', name: 'Developer API & Webhook Technical Inquiries', priority: 2, channel: 'EMAIL', requiredSkills: ['API', 'TECH_SUPPORT'], fallback: 'Least Busy Agent' },
  { id: 'r3', name: 'WhatsApp VIP Inbound Messages', priority: 3, channel: 'WHATSAPP', requiredSkills: ['WHATSAPP'], fallback: 'Round Robin' },
];

export default function ChatRoutingRulesPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-600 shadow-sm">
            <GitFork className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Omnichannel Routing & Agent Capacity</h1>
            <p className="text-sm text-slate-500 mt-1">Skill-based chat distribution, agent workload balancing, and fallback queues.</p>
          </div>
        </div>

        <button className="px-4 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-2 transition-colors">
          <Plus className="w-4 h-4" /> Create Routing Rule
        </button>
      </div>

      {/* Capacity Overview */}
      <div className="grid grid-cols-4 gap-5">
        {[
          { label: 'Online Agents', value: '3 Agents', desc: '1 Offline', color: 'text-emerald-500' },
          { label: 'Total Capacity', value: '20 Chats', desc: 'Max concurrent load', color: 'text-blue-500' },
          { label: 'Current Load', value: '7 Active Chats', desc: '35% utilization', color: 'text-cyan-500' },
          { label: 'Avg Wait Time', value: '18 Seconds', desc: 'Queue dispatch latency', color: 'text-purple-500' },
        ].map((kpi, idx) => (
          <div key={idx} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-2">
            <p className="text-[10px] font-bold text-slate-500 uppercase">{kpi.label}</p>
            <p className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</p>
            <p className="text-xs text-slate-400">{kpi.desc}</p>
          </div>
        ))}
      </div>

      {/* Rules Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100">
          <h3 className="font-bold text-slate-900 text-sm">Active Skill-Based Routing Rules</h3>
        </div>
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-50 border-b border-slate-100 text-[10px] font-bold uppercase text-slate-500">
            <tr>
              <th className="p-4">Priority</th>
              <th className="p-4">Rule Name</th>
              <th className="p-4">Channel</th>
              <th className="p-4">Required Agent Skills</th>
              <th className="p-4">Fallback Strategy</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {ROUTING_RULES.map((rule) => (
              <tr key={rule.id} className="hover:bg-slate-50">
                <td className="p-4 font-bold text-slate-900">#{rule.priority}</td>
                <td className="p-4 font-bold text-slate-900">{rule.name}</td>
                <td className="p-4 font-mono text-cyan-600 font-bold">{rule.channel}</td>
                <td className="p-4">
                  <div className="flex gap-1.5 flex-wrap">
                    {rule.requiredSkills.map((s, i) => (
                      <span key={i} className="bg-cyan-50 text-cyan-800 border border-cyan-200 font-bold px-2 py-0.5 rounded text-[10px]">
                        {s}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="p-4 text-slate-500">{rule.fallback}</td>
                <td className="p-4">
                  <button className="text-cyan-600 hover:text-cyan-800 font-bold">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Agent Live Workloads */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100">
          <h3 className="font-bold text-slate-900 text-sm">Agent Workload & Skill Matrix</h3>
        </div>
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-50 border-b border-slate-100 text-[10px] font-bold uppercase text-slate-500">
            <tr>
              <th className="p-4">Agent Name</th>
              <th className="p-4">Status</th>
              <th className="p-4">Active Chats / Capacity</th>
              <th className="p-4">Utilization</th>
              <th className="p-4">Assigned Skills</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {AGENTS.map((a) => {
              const util = Math.round((a.active / a.capacity) * 100);
              return (
                <tr key={a.id} className="hover:bg-slate-50">
                  <td className="p-4">
                    <p className="font-bold text-slate-900">{a.name}</p>
                    <p className="text-slate-400 text-[10px]">{a.email}</p>
                  </td>
                  <td className="p-4">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${a.status === 'AVAILABLE' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'}`}>
                      {a.status}
                    </span>
                  </td>
                  <td className="p-4 font-mono font-bold text-slate-800">
                    {a.active} / {a.capacity}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-slate-100 rounded-full h-2 overflow-hidden">
                        <div className={`h-full rounded-full ${util > 75 ? 'bg-red-500' : util > 40 ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{ width: `${util}%` }} />
                      </div>
                      <span className="font-bold text-slate-700">{util}%</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-1 flex-wrap">
                      {a.skills.map((sk, i) => (
                        <span key={i} className="bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded text-[10px]">
                          {sk}
                        </span>
                      ))}
                    </div>
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
