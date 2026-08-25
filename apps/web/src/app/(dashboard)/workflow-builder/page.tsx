'use client';

import React, { useState } from 'react';
import { GitPullRequest, Plus, Zap, Mail, UserCheck, Play, Save, CheckCircle2 } from 'lucide-react';

export default function WorkflowBuilderPage() {
  const [nodes, setNodes] = useState([
    { id: 'n1', type: 'TRIGGER', label: 'Trigger: Support Ticket Created', icon: Zap, color: 'border-amber-400 bg-amber-50 text-amber-900' },
    { id: 'n2', type: 'CONDITION', label: 'Condition: Priority Equals URGENT', icon: GitPullRequest, color: 'border-purple-400 bg-purple-50 text-purple-900' },
    { id: 'n3', type: 'ACTION', label: 'Action: Assign Round-Robin to Tier-2 Team', icon: UserCheck, color: 'border-blue-400 bg-blue-50 text-blue-900' },
    { id: 'n4', type: 'ACTION', label: 'Action: Dispatch SLA Breach Email Warning', icon: Mail, color: 'border-emerald-400 bg-emerald-50 text-emerald-900' },
  ]);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
            <GitPullRequest className="w-7 h-7 text-blue-600" />
            Visual Workflow Rule Builder & Node Canvas
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Build event-driven trigger rules, conditional branches, and automated action flows.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="px-4 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl shadow-sm flex items-center gap-2 transition-colors">
            <Play className="w-4 h-4 text-emerald-600" />
            Test Execution Flow
          </button>
          <button className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-2 transition-colors">
            <Save className="w-4 h-4" />
            Publish Workflow Rule
          </button>
        </div>
      </div>

      {/* Node Flowchart Visualizer */}
      <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800 shadow-xl space-y-6 min-h-[450px] flex flex-col justify-center items-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]"></div>

        <div className="space-y-6 z-10 w-full max-w-xl">
          {nodes.map((node, index) => {
            const Icon = node.icon;
            return (
              <React.Fragment key={node.id}>
                <div className={`p-4 rounded-2xl border-2 ${node.color} shadow-lg flex items-center justify-between`}>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-white/80 shadow-sm">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-xs">{node.label}</span>
                  </div>
                  <span className="px-2 py-0.5 bg-white/60 font-mono text-[10px] font-bold rounded uppercase">
                    {node.type}
                  </span>
                </div>

                {index < nodes.length - 1 && (
                  <div className="flex justify-center my-2">
                    <div className="w-0.5 h-6 bg-slate-700"></div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
