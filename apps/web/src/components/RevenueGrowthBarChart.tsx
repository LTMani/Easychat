'use client';

import React from 'react';

export interface MonthlyBarData {
  month: string;
  revenue: number;
  expenses: number;
  netProfit: number;
}

const MONTHS: MonthlyBarData[] = [
  { month: 'Apr', revenue: 480000, expenses: 375000, netProfit: 105000 },
  { month: 'May', revenue: 540000, expenses: 405000, netProfit: 135000 },
  { month: 'Jun', revenue: 610000, expenses: 435000, netProfit: 175000 },
  { month: 'Jul', revenue: 680000, expenses: 468000, netProfit: 212000 },
  { month: 'Aug', revenue: 760000, expenses: 502000, netProfit: 258000 },
  { month: 'Sep (Est)', revenue: 850000, expenses: 538000, netProfit: 312000 },
];

export function RevenueGrowthBarChart() {
  const maxRevenue = 900000;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h3 className="font-bold text-slate-900 text-sm">Monthly Revenue vs Total Costs & Net Profit</h3>
          <p className="text-xs text-slate-500 mt-0.5">6-month longitudinal financial trajectory (USD)</p>
        </div>

        <div className="flex items-center gap-4 text-xs font-bold">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-emerald-500" />
            <span className="text-slate-600">Gross Revenue</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-slate-400" />
            <span className="text-slate-600">Total Costs</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-blue-600" />
            <span className="text-slate-600">Net Profit</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-6 gap-6 items-end h-56 pt-6 border-b border-slate-100">
        {MONTHS.map((m, i) => {
          const revHeight = (m.revenue / maxRevenue) * 100;
          const expHeight = (m.expenses / maxRevenue) * 100;
          const profitHeight = (m.netProfit / maxRevenue) * 100;

          return (
            <div key={i} className="flex flex-col items-center gap-2 h-full justify-end group">
              <div className="flex items-end gap-1.5 h-full w-full justify-center">
                {/* Revenue Bar */}
                <div
                  className="w-4 bg-emerald-500 rounded-t-md hover:bg-emerald-600 transition-all relative"
                  style={{ height: `${revHeight}%` }}
                >
                  <span className="opacity-0 group-hover:opacity-100 absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] font-mono px-1.5 py-0.5 rounded shadow pointer-events-none whitespace-nowrap z-10">
                    ${(m.revenue / 1000).toFixed(0)}k
                  </span>
                </div>

                {/* Expenses Bar */}
                <div
                  className="w-4 bg-slate-300 rounded-t-md hover:bg-slate-400 transition-all"
                  style={{ height: `${expHeight}%` }}
                />

                {/* Net Profit Bar */}
                <div
                  className="w-4 bg-blue-600 rounded-t-md hover:bg-blue-700 transition-all relative"
                  style={{ height: `${profitHeight}%` }}
                >
                  <span className="opacity-0 group-hover:opacity-100 absolute -top-7 left-1/2 -translate-x-1/2 bg-blue-900 text-white text-[9px] font-mono px-1.5 py-0.5 rounded shadow pointer-events-none whitespace-nowrap z-10 font-bold">
                    +${(m.netProfit / 1000).toFixed(0)}k
                  </span>
                </div>
              </div>
              <span className="text-[11px] font-bold text-slate-600 font-sans mt-2">{m.month}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
