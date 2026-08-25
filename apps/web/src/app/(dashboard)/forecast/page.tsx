'use client';

import React, { useState } from 'react';
import { TrendingUp, DollarSign, Target, BarChart3, ArrowUpRight, RefreshCw } from 'lucide-react';

export default function SalesForecastPage() {
  const [forecastData] = useState([
    { month: 'September 2026', forecastedRevenue: 186400, weightedPipeline: 212045, confidence: 0.88 },
    { month: 'October 2026', forecastedRevenue: 161528, weightedPipeline: 212045, confidence: 0.76 },
    { month: 'November 2026', forecastedRevenue: 136362, weightedPipeline: 212045, confidence: 0.64 },
  ]);

  const totalForecast = forecastData.reduce((acc, d) => acc + d.forecastedRevenue, 0);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
            <TrendingUp className="w-7 h-7 text-blue-600" />
            Sales Revenue Forecast & Pipeline Intelligence
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Probabilistic 3-month revenue forecast based on pipeline stage weights and deal close probabilities.
          </p>
        </div>
        <button className="px-4 py-2.5 border border-slate-200 text-slate-600 font-bold text-xs rounded-xl shadow-sm flex items-center gap-2 hover:bg-slate-50 transition-colors">
          <RefreshCw className="w-4 h-4" />
          Recalculate Forecast
        </button>
      </div>

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-2">
          <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase">
            <DollarSign className="w-4 h-4 text-blue-600" />
            3-Month Total Forecast
          </div>
          <p className="text-3xl font-bold text-slate-900">${totalForecast.toLocaleString()}</p>
          <p className="text-xs text-emerald-600 font-bold flex items-center gap-1"><ArrowUpRight className="w-3.5 h-3.5" /> +12.4% vs prior quarter</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-2">
          <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase">
            <Target className="w-4 h-4 text-purple-600" />
            Weighted Open Pipeline
          </div>
          <p className="text-3xl font-bold text-slate-900">$212,045</p>
          <p className="text-xs text-slate-500 font-medium">Across all open deal stages</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-2">
          <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase">
            <BarChart3 className="w-4 h-4 text-emerald-600" />
            Average Win Confidence
          </div>
          <p className="text-3xl font-bold text-slate-900">76%</p>
          <p className="text-xs text-slate-500 font-medium">Based on stage probability matrix</p>
        </div>
      </div>

      {/* Forecast Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-blue-600" />
            Monthly Revenue Forecast Breakdown
          </h3>
        </div>
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold text-[10px]">
            <tr>
              <th className="p-4">Forecast Month</th>
              <th className="p-4">Weighted Pipeline</th>
              <th className="p-4">Confidence Score</th>
              <th className="p-4 text-right">Forecasted Revenue</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {forecastData.map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-50">
                <td className="p-4 font-bold text-slate-900">{row.month}</td>
                <td className="p-4 font-mono">${row.weightedPipeline.toLocaleString()}</td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: `${row.confidence * 100}%` }}></div>
                    </div>
                    <span className="font-mono font-bold text-slate-700">{(row.confidence * 100).toFixed(0)}%</span>
                  </div>
                </td>
                <td className="p-4 text-right font-mono font-bold text-blue-700">${row.forecastedRevenue.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
