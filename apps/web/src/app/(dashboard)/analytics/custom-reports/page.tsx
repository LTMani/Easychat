'use client';

import React, { useState } from 'react';
import { BarChart3, Plus, Download, Filter, Table, RefreshCw, Layers } from 'lucide-react';

const SAVED_REPORTS = [
  { id: 'rep_1', name: 'Q3 Regional Deal Win Rates', entity: 'Deal', rows: 'country', cols: 'status', metric: 'SUM(amount)', lastRun: '1 hour ago' },
  { id: 'rep_2', name: 'Agent SLA Breach Breakdown', entity: 'Ticket', rows: 'assignedToId', cols: 'priority', metric: 'COUNT(id)', lastRun: '3 hours ago' },
  { id: 'rep_3', name: 'Channel Acquisition LTV Matrix', entity: 'Contact', rows: 'source', cols: 'country', metric: 'AVG(lifetimeValue)', lastRun: 'Yesterday' },
  { id: 'rep_4', name: 'Sales Pipeline Velocity by Stage', entity: 'Deal', rows: 'pipelineId', cols: 'stageId', metric: 'AVG(daysOpen)', lastRun: '2 days ago' },
];

export default function CustomReportsBuilderPage() {
  const [selectedEntity, setSelectedEntity] = useState('DEAL');
  const [rowDimension, setRowDimension] = useState('country');
  const [colDimension, setColDimension] = useState('status');
  const [metric, setMetric] = useState('SUM_AMOUNT');

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 shadow-sm">
            <BarChart3 className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Custom BI Pivot Report Builder</h1>
            <p className="text-sm text-slate-500 mt-1">Multi-dimensional OLAP analytics engine for dynamic cross-tabulation across CRM entities.</p>
          </div>
        </div>

        <button className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-2 transition-colors">
          <Download className="w-3.5 h-3.5" /> Export Report (CSV / PDF)
        </button>
      </div>

      {/* Query Configuration Toolbar */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
          <Layers className="w-4 h-4 text-indigo-600" /> Report Configuration
        </h3>

        <div className="grid grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Primary Entity</label>
            <select
              value={selectedEntity}
              onChange={(e) => setSelectedEntity(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs outline-none bg-slate-50 font-medium"
            >
              <option value="DEAL">Deals & Opportunities</option>
              <option value="CONTACT">Contacts & Customers</option>
              <option value="TICKET">Support Tickets</option>
              <option value="CONVERSATION">Omnichannel Chats</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Row Grouping</label>
            <select
              value={rowDimension}
              onChange={(e) => setRowDimension(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs outline-none bg-slate-50 font-medium"
            >
              <option value="country">Country / Region</option>
              <option value="source">Lead Acquisition Source</option>
              <option value="assignedToId">Assigned Agent</option>
              <option value="pipelineId">Pipeline Stage</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Column Dimension</label>
            <select
              value={colDimension}
              onChange={(e) => setColDimension(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs outline-none bg-slate-50 font-medium"
            >
              <option value="status">Status (Won / Lost / Open)</option>
              <option value="priority">Priority (Urgent / High / Low)</option>
              <option value="channel">Channel (Email / WA / Live Chat)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Aggregation Metric</label>
            <select
              value={metric}
              onChange={(e) => setMetric(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs outline-none bg-slate-50 font-medium"
            >
              <option value="SUM_AMOUNT">Sum of Deal Amount ($)</option>
              <option value="COUNT">Record Count (#)</option>
              <option value="AVG_AMOUNT">Average Amount ($)</option>
              <option value="AVG_LTV">Average Customer LTV ($)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Pivot Output Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Pivot Cross-Tabulation Matrix</h3>
            <p className="text-xs text-slate-500">Grouped by {rowDimension} × {colDimension}</p>
          </div>
          <button className="text-indigo-600 hover:text-indigo-800 text-xs font-bold flex items-center gap-1">
            <RefreshCw className="w-3 h-3" /> Refresh Calculation
          </button>
        </div>
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-50 border-b border-slate-100 text-[10px] font-bold uppercase text-slate-500">
            <tr>
              <th className="p-4">Dimension ({rowDimension})</th>
              <th className="p-4 text-right">OPEN</th>
              <th className="p-4 text-right">CLOSED WON</th>
              <th className="p-4 text-right">CLOSED LOST</th>
              <th className="p-4 text-right font-black">TOTAL</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700 font-mono">
            <tr className="hover:bg-slate-50">
              <td className="p-4 font-sans font-bold text-slate-900">United States (US)</td>
              <td className="p-4 text-right">$4,820,000</td>
              <td className="p-4 text-right text-emerald-600 font-bold">$3,810,000</td>
              <td className="p-4 text-right text-slate-400">$640,000</td>
              <td className="p-4 text-right font-black text-slate-900">$9,270,000</td>
            </tr>
            <tr className="hover:bg-slate-50">
              <td className="p-4 font-sans font-bold text-slate-900">Germany (DE)</td>
              <td className="p-4 text-right">$1,240,000</td>
              <td className="p-4 text-right text-emerald-600 font-bold">$1,020,000</td>
              <td className="p-4 text-right text-slate-400">$180,000</td>
              <td className="p-4 text-right font-black text-slate-900">$2,440,000</td>
            </tr>
            <tr className="hover:bg-slate-50">
              <td className="p-4 font-sans font-bold text-slate-900">United Kingdom (GB)</td>
              <td className="p-4 text-right">$980,000</td>
              <td className="p-4 text-right text-emerald-600 font-bold">$890,000</td>
              <td className="p-4 text-right text-slate-400">$120,000</td>
              <td className="p-4 text-right font-black text-slate-900">$1,990,000</td>
            </tr>
            <tr className="hover:bg-slate-50">
              <td className="p-4 font-sans font-bold text-slate-900">India (IN)</td>
              <td className="p-4 text-right">$750,000</td>
              <td className="p-4 text-right text-emerald-600 font-bold">$612,000</td>
              <td className="p-4 text-right text-slate-400">$95,000</td>
              <td className="p-4 text-right font-black text-slate-900">$1,457,000</td>
            </tr>
          </tbody>
          <tfoot className="bg-slate-100 border-t-2 border-slate-200 font-bold font-mono text-slate-900 text-xs">
            <tr>
              <td className="p-4 font-sans uppercase">Total Summary</td>
              <td className="p-4 text-right">$7,790,000</td>
              <td className="p-4 text-right text-emerald-700 font-black">$6,332,000</td>
              <td className="p-4 text-right text-slate-500">$1,035,000</td>
              <td className="p-4 text-right font-black text-indigo-700">$15,157,000</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
