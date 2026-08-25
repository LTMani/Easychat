'use client';

import React, { useState } from 'react';
import { GitBranch, Plus, Trash2, CheckCircle2, Play, Sparkles } from 'lucide-react';

export default function RuleBuilderPage() {
  const [conditions, setConditions] = useState([
    { field: 'leadScore', operator: 'GREATER_THAN', value: '75' },
    { field: 'country', operator: 'EQUALS', value: 'United States' },
    { field: 'estimatedDealValue', operator: 'GREATER_THAN', value: '10000' },
  ]);

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 shadow-sm">
            <GitBranch className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Visual Dynamic Rule & Trigger Builder</h1>
            <p className="text-sm text-slate-500 mt-1">Build complex boolean AST conditions to trigger automated lead routing and SLA escalations.</p>
          </div>
        </div>

        <button className="px-4 py-2.5 bg-[#4f46e5] hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md shadow-indigo-500/20 flex items-center gap-2 transition-colors">
          <Play className="w-4 h-4" /> Test AST Evaluation
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-indigo-100 text-indigo-800 text-[11px] font-black px-2.5 py-1 rounded-md font-mono">
              MATCH: ALL CONDITIONS (AND)
            </span>
            <span className="text-xs text-slate-400">Trigger action only if all conditions evaluate to true</span>
          </div>
          <button
            onClick={() => setConditions([...conditions, { field: 'status', operator: 'EQUALS', value: 'NEW' }])}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Add Condition
          </button>
        </div>

        <div className="space-y-3">
          {conditions.map((cond, idx) => (
            <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-3">
              <span className="text-xs font-mono font-bold text-slate-400">#{idx + 1}</span>

              <select
                value={cond.field}
                className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-800 outline-none"
              >
                <option value="leadScore">leadScore</option>
                <option value="country">country</option>
                <option value="estimatedDealValue">estimatedDealValue</option>
                <option value="lifecycleStage">lifecycleStage</option>
              </select>

              <select
                value={cond.operator}
                className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-indigo-600 outline-none"
              >
                <option value="EQUALS">EQUALS (=)</option>
                <option value="GREATER_THAN">GREATER THAN (&gt;)</option>
                <option value="LESS_THAN">LESS THAN (&lt;)</option>
                <option value="CONTAINS">CONTAINS</option>
              </select>

              <input
                value={cond.value}
                className="flex-1 bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-800 outline-none"
              />

              <button
                onClick={() => setConditions(conditions.filter((_, i) => i !== idx))}
                className="text-slate-400 hover:text-red-600 p-1"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
