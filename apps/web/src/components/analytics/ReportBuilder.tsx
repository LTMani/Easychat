'use client';

import React, { useState } from 'react';
import { BarChart3, TrendingUp, Download, Filter, Calendar, DollarSign, Users, LifeBuoy, PieChart, Layers } from 'lucide-react';

export function ReportBuilder() {
  const [reportType, setReportType] = useState<'REVENUE' | 'CONVERSION' | 'SLA' | 'TICKETS'>('REVENUE');
  const [chartType, setChartType] = useState<'BAR' | 'LINE' | 'DONUT'>('BAR');
  const [timeRange, setTimeRange] = useState('THIS_MONTH');

  const reportData = {
    REVENUE: [
      { label: 'Week 1', value: 38000, target: 30000 },
      { label: 'Week 2', value: 45000, target: 35000 },
      { label: 'Week 3', value: 62000, target: 40000 },
      { label: 'Week 4', value: 78000, target: 45000 },
    ],
    CONVERSION: [
      { label: 'Inbound Chat', value: 42, target: 35 },
      { label: 'Website Form', value: 28, target: 25 },
      { label: 'Referrals', value: 65, target: 50 },
      { label: 'Outreach', value: 18, target: 20 },
    ],
    SLA: [
      { label: 'URGENT (15m)', value: 98, target: 95 },
      { label: 'HIGH (2h)', value: 94, target: 90 },
      { label: 'MEDIUM (8h)', value: 99, target: 95 },
      { label: 'LOW (24h)', value: 100, target: 98 },
    ],
    TICKETS: [
      { label: 'Resolved First Contact', value: 184, target: 150 },
      { label: 'Escalated to L2', value: 24, target: 30 },
      { label: 'Pending Customer Response', value: 12, target: 15 },
    ],
  };

  const currentData = reportData[reportType];
  const maxValue = Math.max(...currentData.map((d) => d.value));

  const handleExportCSV = () => {
    const csvContent = 'data:text/csv;charset=utf-8,' + ['Label,Value,Target', ...currentData.map((d) => `${d.label},${d.value},${d.target}`)].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `easychat_report_${reportType.toLowerCase()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col p-6 space-y-6">
      {/* Report Header & Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-slate-900">Custom Executive Report & Pivot Builder</h3>
            <p className="text-xs text-slate-500">Aggregate sales pipeline value, lead conversions, and SLA performance</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <select
            value={reportType}
            onChange={(e: any) => setReportType(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 bg-white"
          >
            <option value="REVENUE">Pipeline Revenue ($)</option>
            <option value="CONVERSION">Lead Win Rate (%)</option>
            <option value="SLA">SLA Compliance Rate (%)</option>
            <option value="TICKETS">Ticket Resolution Metrics</option>
          </select>

          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 bg-white"
          >
            <option value="THIS_MONTH">This Month</option>
            <option value="LAST_QUARTER">Last Quarter</option>
            <option value="YEAR_TO_DATE">Year to Date</option>
          </select>

          <button
            onClick={handleExportCSV}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg shadow-sm flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Dynamic Visual Chart Renderer */}
      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
        <h4 className="font-bold text-sm text-slate-900 mb-6 flex items-center justify-between">
          <span>{reportType} Visual Aggregation Chart</span>
          <span className="text-xs text-slate-400 font-normal">Live Calculated Metric Stream</span>
        </h4>

        <div className="space-y-5">
          {currentData.map((item, index) => {
            const pct = Math.round((item.value / maxValue) * 100);
            return (
              <div key={index} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-700">{item.label}</span>
                  <span className="text-slate-900 font-bold">
                    {reportType === 'REVENUE' ? `$${item.value.toLocaleString()}` : `${item.value}%`}
                  </span>
                </div>
                <div className="w-full h-4 bg-slate-200 rounded-full overflow-hidden flex">
                  <div
                    className="h-full bg-blue-600 rounded-full transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pivot Summary Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-100 text-slate-700 border-b border-slate-200">
              <th className="p-3 font-bold">Dimension Metric</th>
              <th className="p-3 font-bold text-right">Actual Value</th>
              <th className="p-3 font-bold text-right">Target Baseline</th>
              <th className="p-3 font-bold text-right">Variance (%)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {currentData.map((d, i) => {
              const variance = (((d.value - d.target) / d.target) * 100).toFixed(1);
              const isPositive = parseFloat(variance) >= 0;
              return (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="p-3 font-medium text-slate-900">{d.label}</td>
                  <td className="p-3 text-right font-bold text-slate-900">
                    {reportType === 'REVENUE' ? `$${d.value.toLocaleString()}` : `${d.value}%`}
                  </td>
                  <td className="p-3 text-right text-slate-500">
                    {reportType === 'REVENUE' ? `$${d.target.toLocaleString()}` : `${d.target}%`}
                  </td>
                  <td className={`p-3 text-right font-bold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {isPositive ? `+${variance}%` : `${variance}%`}
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
