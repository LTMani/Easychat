'use client';

import React, { useEffect, useState } from 'react';
import { ShieldCheck, Plus, AlertTriangle, Clock, CheckCircle, RefreshCw } from 'lucide-react';

export default function SlaPage() {
  const [policies, setPolicies] = useState<any[]>([]);
  const [breaches, setBreaches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setPolicies([
        {
          id: '1',
          name: 'Urgent Customer SLA',
          priority: 'URGENT',
          firstResponseMinutes: 15,
          resolutionMinutes: 120,
          isDefault: true,
        },
        {
          id: '2',
          name: 'Standard Ticket Policy',
          priority: 'MEDIUM',
          firstResponseMinutes: 60,
          resolutionMinutes: 480,
          isDefault: false,
        },
      ]);

      setBreaches([
        {
          id: 'b1',
          ticketNumber: 'TCK-1089',
          breachType: 'FIRST_RESPONSE',
          targetMinutes: 15,
          actualMinutes: 34,
          breachedAt: new Date().toISOString(),
        },
      ]);

      setLoading(false);
    }, 400);
  }, []);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
            <ShieldCheck className="w-7 h-7 text-blue-600" />
            Service Level Agreements (SLA Engine)
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Configure response time policies, resolution deadlines, and monitor SLA breach logs.
          </p>
        </div>

        <button className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-2 transition-colors">
          <Plus className="w-4 h-4" />
          Create SLA Policy
        </button>
      </div>

      {/* SLA Policies Grid */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900">Active SLA Policies</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {policies.map((p) => (
            <div key={p.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-blue-600"></span>
                  <h4 className="font-bold text-slate-900 text-base">{p.name}</h4>
                </div>
                <span className="px-2.5 py-1 bg-slate-100 text-slate-700 font-bold text-[10px] uppercase rounded-full">
                  {p.priority} PRIORITY
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-xs">
                <div className="flex items-center gap-2.5 text-slate-600">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <div>
                    <div className="text-[10px] uppercase text-slate-400 font-bold">First Response Target</div>
                    <div className="font-bold text-slate-900">{p.firstResponseMinutes} minutes</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 text-slate-600">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <div>
                    <div className="text-[10px] uppercase text-slate-400 font-bold">Resolution Target</div>
                    <div className="font-bold text-slate-900">{p.resolutionMinutes} minutes</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Breach Logs */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-500" />
          Recent SLA Breach Log Stream
        </h3>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold text-[10px]">
              <tr>
                <th className="p-4">Ticket Number</th>
                <th className="p-4">Breach Type</th>
                <th className="p-4">Target (Mins)</th>
                <th className="p-4">Actual (Mins)</th>
                <th className="p-4">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {breaches.map((b) => (
                <tr key={b.id} className="hover:bg-slate-50">
                  <td className="p-4 font-bold text-blue-600">{b.ticketNumber}</td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 bg-amber-50 text-amber-700 font-bold text-[10px] rounded border border-amber-200">
                      {b.breachType}
                    </span>
                  </td>
                  <td className="p-4">{b.targetMinutes} m</td>
                  <td className="p-4 font-bold text-red-600">{b.actualMinutes} m</td>
                  <td className="p-4 text-slate-400">{new Date(b.breachedAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
