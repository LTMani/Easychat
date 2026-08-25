'use client';

import React from 'react';
import { DollarSign, TrendingUp, Percent, ArrowUpRight, ArrowDownRight, PieChart, ShieldCheck, Wallet } from 'lucide-react';
import { ProfitWaterfallChart } from '@/components/ProfitWaterfallChart';
import { RevenueGrowthBarChart } from '@/components/RevenueGrowthBarChart';

export default function ProfitAnalyticsPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shadow-sm">
            <DollarSign className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Executive Profitability & Margins</h1>
            <p className="text-sm text-slate-500 mt-1">Real-time P&L analysis, Gross & Net Margins, Unit Economics, and EBITDA trajectory.</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2 text-xs font-bold text-emerald-800 flex items-center gap-1.5 shadow-xs">
            <TrendingUp className="w-4 h-4 text-emerald-600" /> +32.4% YoY Growth
          </div>
        </div>
      </div>

      {/* Top 4 KPI Cards */}
      <div className="grid grid-cols-4 gap-6">
        {/* Gross Revenue */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold uppercase">
            <span>Gross Revenue (Q3)</span>
            <ArrowUpRight className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-3xl font-black text-slate-900 font-mono">$1,850,000</p>
          <p className="text-xs text-emerald-600 font-bold flex items-center gap-1">
            +18.2% vs last quarter
          </p>
        </div>

        {/* Gross Profit */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold uppercase">
            <span>Gross Margin</span>
            <Percent className="w-4 h-4 text-blue-500" />
          </div>
          <p className="text-3xl font-black text-blue-600 font-mono">79.2%</p>
          <p className="text-xs text-slate-500 font-medium">
            $1.465M Gross Profit after COGS
          </p>
        </div>

        {/* Net Profit */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold uppercase">
            <span>Net Retained Profit</span>
            <Wallet className="w-4 h-4 text-purple-500" />
          </div>
          <p className="text-3xl font-black text-purple-600 font-mono">$438,500</p>
          <p className="text-xs text-purple-600 font-bold">
            23.7% Net Profit Margin
          </p>
        </div>

        {/* Unit Economics LTV:CAC */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold uppercase">
            <span>LTV : CAC Ratio</span>
            <TrendingUp className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-3xl font-black text-emerald-600 font-mono">16.7x</p>
          <p className="text-xs text-slate-500 font-medium">
            3.0 Months CAC Payback
          </p>
        </div>
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-2 gap-8">
        <ProfitWaterfallChart />
        <RevenueGrowthBarChart />
      </div>

      {/* Unit Economics & Cost Allocation Breakdown Table */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <h3 className="font-bold text-slate-900 text-sm">Unit Economics & Customer Tier Margin Breakdown</h3>

        <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold uppercase text-slate-500">
              <tr>
                <th className="p-4">Customer Tier</th>
                <th className="p-4">Active Accounts</th>
                <th className="p-4">Monthly ARPA</th>
                <th className="p-4">Gross Margin</th>
                <th className="p-4">Monthly Contribution</th>
                <th className="p-4">Health Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              <tr className="hover:bg-slate-50/50">
                <td className="p-4 font-bold text-slate-900">👑 Enterprise Tier (Dedicated SLA)</td>
                <td className="p-4 font-mono">140 Accounts</td>
                <td className="p-4 font-mono font-bold">$2,490 / mo</td>
                <td className="p-4 text-emerald-600 font-bold font-mono">86.5%</td>
                <td className="p-4 font-bold font-mono text-slate-900">$348,600 / mo</td>
                <td className="p-4">
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    High Margin • Prime
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-slate-50/50">
                <td className="p-4 font-bold text-slate-900">💼 Professional Growth Tier</td>
                <td className="p-4 font-mono">620 Accounts</td>
                <td className="p-4 font-mono font-bold">$149 / mo</td>
                <td className="p-4 text-emerald-600 font-bold font-mono">78.0%</td>
                <td className="p-4 font-bold font-mono text-slate-900">$92,380 / mo</td>
                <td className="p-4">
                  <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    Strong Volume
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-slate-50/50">
                <td className="p-4 font-bold text-slate-900">🚀 Starter Inbound Tier</td>
                <td className="p-4 font-mono">1,100 Accounts</td>
                <td className="p-4 font-mono font-bold">$49 / mo</td>
                <td className="p-4 text-amber-600 font-bold font-mono">68.2%</td>
                <td className="p-4 font-bold font-mono text-slate-900">$53,900 / mo</td>
                <td className="p-4">
                  <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    Self-Serve Funnel
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
