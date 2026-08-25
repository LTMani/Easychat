'use client';

import React, { useState } from 'react';
import { DollarSign, PieChart, Plus, Trash2, CheckCircle2, AlertCircle } from 'lucide-react';

export default function OpportunitySplitsPage() {
  const [dealAmount, setDealAmount] = useState(150000);
  const [splits, setSplits] = useState([
    { id: '1', repName: 'Sarah Jenkins', role: 'PRIMARY_CLOSER', pct: 60 },
    { id: '2', repName: 'Alex Mercer', role: 'SOLUTIONS_ARCHITECT', pct: 25 },
    { id: '3', repName: 'Sam Chen', role: 'SDR_QUALIFIER', pct: 15 },
  ]);

  const totalPct = splits.reduce((sum, s) => sum + s.pct, 0);
  const isValid = totalPct === 100;

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shadow-sm">
            <PieChart className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Opportunity Revenue Splits</h1>
            <p className="text-sm text-slate-500 mt-1">Multi-rep commission and quota allocation for co-selling enterprise deals.</p>
          </div>
        </div>

        <div className={`px-4 py-2 rounded-xl text-xs font-black font-mono border flex items-center gap-1.5 shadow-xs ${
          isValid ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-red-50 border-red-200 text-red-800'
        }`}>
          {isValid ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <AlertCircle className="w-4 h-4 text-red-600" />}
          Total: {totalPct}% {isValid ? '(Valid 100% Split)' : '(Must equal 100%)'}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="space-y-1">
            <h3 className="font-bold text-slate-900 text-sm">Deal #DEAL-2026-092: Acme Enterprise Expansion</h3>
            <p className="text-xs text-slate-500">Pipeline Stage: Negotiation • Expected Close: Aug 31, 2026</p>
          </div>

          <div className="text-right">
            <span className="text-xs text-slate-400 font-bold uppercase">Deal Contract Value</span>
            <p className="text-2xl font-black text-slate-900 font-mono">${dealAmount.toLocaleString()}</p>
          </div>
        </div>

        {/* Rep Split Rows */}
        <div className="space-y-3">
          {splits.map((s, idx) => {
            const allocated = (dealAmount * s.pct) / 100;
            return (
              <div key={s.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                    {s.repName.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs">{s.repName}</h4>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">{s.role}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={s.pct}
                      onChange={(e) => {
                        const newSplits = [...splits];
                        newSplits[idx].pct = Number(e.target.value);
                        setSplits(newSplits);
                      }}
                      className="w-16 px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mono font-bold text-right outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-xs font-bold text-slate-600">%</span>
                  </div>

                  <div className="w-32 text-right">
                    <p className="font-mono font-bold text-slate-900 text-xs">${allocated.toLocaleString()}</p>
                    <p className="text-[10px] text-emerald-600 font-bold">Quota Credit</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
