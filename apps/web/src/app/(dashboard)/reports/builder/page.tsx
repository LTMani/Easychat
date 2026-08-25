'use client';

import React, { useState } from 'react';
import { PieChart, BarChart3, Filter, Download, Calendar, ArrowRight, RefreshCw, Layers } from 'lucide-react';

export default function ReportPivotBuilderPage() {
  const [metric, setMetric] = useState<'DEAL_REVENUE' | 'TICKET_VOLUME' | 'CSAT_SCORE'>('DEAL_REVENUE');
  const [groupBy, setGroupBy] = useState<'STAGE' | 'MONTH' | 'AGENT'>('STAGE');

  const sampleData = [
    { label: 'Qualification Stage', value: '$45,000', count: 12 },
    { label: 'Proposal / Quote Sent', value: '$128,000', count: 8 },
    { label: 'Negotiation', value: '$95,000', count: 5 },
    { label: 'Closed Won', value: '$310,000', count: 19 },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
            <PieChart className="w-7 h-7 text-blue-600" />
            Custom BI Pivot & Report Builder
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Build multi-dimension sales pipeline, SLA breach, and CSAT pivot reports with live chart previews.
          </p>
        </div>

        <button className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-2 transition-colors">
          <Download className="w-4 h-4" />
          Export Report to CSV / PDF
        </button>
      </div>

      {/* Query Controls */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Target Metric</label>
          <select
            value={metric}
            onChange={(e: any) => setMetric(e.target.value)}
            className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium text-slate-900"
          >
            <option value="DEAL_REVENUE">Deal Revenue Aggregate ($)</option>
            <option value="TICKET_VOLUME">Support Ticket Volume (Count)</option>
            <option value="CSAT_SCORE">CSAT Average Score Matrix</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Group By Dimension</label>
          <select
            value={groupBy}
            onChange={(e: any) => setGroupBy(e.target.value)}
            className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium text-slate-900"
          >
            <option value="STAGE">Pipeline Stage</option>
            <option value="MONTH">Time Series (Monthly)</option>
            <option value="AGENT">Assigned Support / Sales Agent</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Date Range</label>
          <div className="flex items-center gap-2 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-600 font-medium">
            <Calendar className="w-4 h-4 text-slate-400" />
            <span>2026-01-01 to 2026-12-31</span>
          </div>
        </div>
      </div>

      {/* Pivot Table & Summary */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <Layers className="w-4 h-4 text-blue-600" />
            Pivot Table Results
          </h3>
          <span className="text-xs text-slate-400 font-mono">4 Groups Aggregated</span>
        </div>

        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold text-[10px]">
            <tr>
              <th className="p-3">Dimension ({groupBy})</th>
              <th className="p-3">Aggregated Value</th>
              <th className="p-3 text-right">Entity Count</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {sampleData.map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-50">
                <td className="p-3 font-bold text-slate-900">{row.label}</td>
                <td className="p-3 font-mono text-blue-600 font-bold">{row.value}</td>
                <td className="p-3 text-right font-mono">{row.count} deals</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
