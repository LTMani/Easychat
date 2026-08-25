'use client';

import React, { useState } from 'react';
import { Users, TrendingUp, Star, CheckCircle2, Clock, Award } from 'lucide-react';

export default function AgentPerformancePage() {
  const [agents] = useState([
    { id: 'ag1', name: 'Alex Mercer', assignedTickets: 48, resolvedTickets: 42, csatAverage: 4.7, resolutionRate: 87.5 },
    { id: 'ag2', name: 'Priya Sharma', assignedTickets: 39, resolvedTickets: 37, csatAverage: 4.9, resolutionRate: 94.9 },
    { id: 'ag3', name: 'Jordan Blake', assignedTickets: 55, resolvedTickets: 44, csatAverage: 4.3, resolutionRate: 80.0 },
    { id: 'ag4', name: 'Sam Chen', assignedTickets: 31, resolvedTickets: 30, csatAverage: 4.8, resolutionRate: 96.8 },
  ]);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
            <Users className="w-7 h-7 text-blue-600" />
            Agent Performance & Team Leaderboard
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Real-time support team metrics including resolution rates, CSAT scores, and ticket assignment volumes.
          </p>
        </div>
      </div>

      {/* Summary KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {[
          { label: 'Team Avg CSAT', value: '4.7 / 5.0', icon: Star, color: 'text-amber-500' },
          { label: 'Total Tickets Resolved', value: '153', icon: CheckCircle2, color: 'text-emerald-600' },
          { label: 'Avg Resolution Rate', value: '89.8%', icon: TrendingUp, color: 'text-blue-600' },
          { label: 'Top Performer', value: 'Sam Chen', icon: Award, color: 'text-purple-600' },
        ].map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-2">
              <div className={`flex items-center gap-2 text-xs font-bold uppercase text-slate-500`}>
                <Icon className={`w-4 h-4 ${kpi.color}`} />
                {kpi.label}
              </div>
              <p className="text-2xl font-bold text-slate-900">{kpi.value}</p>
            </div>
          );
        })}
      </div>

      {/* Agent Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold text-[10px]">
            <tr>
              <th className="p-4">Agent Name</th>
              <th className="p-4">Assigned</th>
              <th className="p-4">Resolved</th>
              <th className="p-4">Resolution Rate</th>
              <th className="p-4">CSAT Score</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {agents.map((ag) => (
              <tr key={ag.id} className="hover:bg-slate-50">
                <td className="p-4 font-bold text-slate-900 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center">
                    {ag.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  {ag.name}
                </td>
                <td className="p-4 font-mono">{ag.assignedTickets}</td>
                <td className="p-4 font-mono text-emerald-700 font-bold">{ag.resolvedTickets}</td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${ag.resolutionRate}%` }}></div>
                    </div>
                    <span className="font-mono font-bold">{ag.resolutionRate}%</span>
                  </div>
                </td>
                <td className="p-4">
                  <span className="flex items-center gap-1 font-bold text-amber-600">
                    <Star className="w-3.5 h-3.5" />
                    {ag.csatAverage}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
