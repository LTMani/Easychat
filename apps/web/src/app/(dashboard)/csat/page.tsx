'use client';

import React, { useState } from 'react';
import { BarChart2, Star, MessageSquare, TrendingUp, Clock, Users, Award, Download } from 'lucide-react';

const CSAT_DATA = [
  { month: 'Mar', avg: 4.1, responses: 134 },
  { month: 'Apr', avg: 4.3, responses: 158 },
  { month: 'May', avg: 4.2, responses: 142 },
  { month: 'Jun', avg: 4.6, responses: 201 },
  { month: 'Jul', avg: 4.5, responses: 189 },
  { month: 'Aug', avg: 4.7, responses: 223 },
];

const AGENT_CSAT = [
  { name: 'Alex Mercer', avg: 4.9, total: 73, nps: 82 },
  { name: 'Priya Sharma', avg: 4.7, total: 61, nps: 76 },
  { name: 'Jordan Blake', avg: 4.5, total: 42, nps: 70 },
  { name: 'Sam Chen', avg: 4.3, total: 38, nps: 61 },
  { name: 'Emily Torres', avg: 4.1, total: 29, nps: 55 },
];

const RECENT_FEEDBACK = [
  { contact: 'Sarah J.', rating: 5, comment: 'Incredibly fast resolution. Alex was phenomenal!', agent: 'Alex Mercer', date: '2026-08-24' },
  { contact: 'Mike C.', rating: 4, comment: 'Good support, response time was a bit slow.', agent: 'Jordan Blake', date: '2026-08-23' },
  { contact: 'Lisa P.', rating: 5, comment: 'Priya solved my issue within minutes. Amazing!', agent: 'Priya Sharma', date: '2026-08-22' },
  { contact: 'David K.', rating: 3, comment: 'Issue resolved but needed multiple follow-ups.', agent: 'Sam Chen', date: '2026-08-21' },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} className={`w-3 h-3 ${i <= rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-200'}`} />
      ))}
    </div>
  );
}

export default function CsatAnalyticsPage() {
  const [period, setPeriod] = useState<'30d' | '90d' | '12m'>('90d');

  const overallAvg = (CSAT_DATA.reduce((a, d) => a + d.avg, 0) / CSAT_DATA.length).toFixed(2);
  const totalResponses = CSAT_DATA.reduce((a, d) => a + d.responses, 0);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
            <Star className="w-7 h-7 text-amber-400 fill-amber-400" />
            CSAT & NPS Analytics Dashboard
          </h1>
          <p className="text-sm text-slate-500 mt-1">Customer satisfaction scores, NPS trends, and agent-level feedback analysis.</p>
        </div>
        <div className="flex items-center gap-3">
          {(['30d', '90d', '12m'] as const).map((p) => (
            <button key={p} onClick={() => setPeriod(p)} className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-colors ${period === p ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}>{p}</button>
          ))}
          <button className="px-4 py-2 border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 rounded-xl flex items-center gap-2">
            <Download className="w-3.5 h-3.5" />Export
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-5">
        {[
          { icon: Star, label: 'Overall CSAT Score', value: `${overallAvg} / 5.0`, color: 'text-amber-500' },
          { icon: MessageSquare, label: 'Total Responses', value: totalResponses.toLocaleString(), color: 'text-blue-500' },
          { icon: TrendingUp, label: 'NPS Score', value: '74', color: 'text-emerald-500' },
          { icon: Clock, label: 'Avg Resolution Time', value: '3h 12m', color: 'text-purple-500' },
        ].map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div key={idx} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase"><Icon className={`w-4 h-4 ${kpi.color}`} />{kpi.label}</div>
              <p className="text-2xl font-bold text-slate-900">{kpi.value}</p>
            </div>
          );
        })}
      </div>

      {/* Monthly CSAT Trend */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5">
        <h3 className="font-bold text-slate-900 flex items-center gap-2"><BarChart2 className="w-4 h-4 text-blue-500" />Monthly CSAT Trend</h3>
        <div className="flex items-end gap-4 h-36">
          {CSAT_DATA.map((d) => (
            <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-[10px] font-bold text-slate-600">{d.avg}</span>
              <div className="w-full bg-blue-100 rounded-t-lg" style={{ height: `${(d.avg / 5) * 100}%`, minHeight: '8px' }} />
              <span className="text-[10px] text-slate-500 font-medium">{d.month}</span>
              <span className="text-[9px] text-slate-400">{d.responses} resp.</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Agent CSAT Leaderboard */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400" />
            <h3 className="font-bold text-slate-900 text-sm">Agent CSAT Leaderboard</h3>
          </div>
          <div className="divide-y divide-slate-100">
            {AGENT_CSAT.map((a, idx) => (
              <div key={a.name} className="flex items-center gap-4 p-4">
                <span className={`text-xs font-black ${idx === 0 ? 'text-amber-500' : 'text-slate-400'}`}>#{idx + 1}</span>
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-900">{a.name}</p>
                  <StarRating rating={Math.round(a.avg)} />
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-slate-900">{a.avg}</p>
                  <p className="text-[10px] text-slate-400">{a.total} reviews</p>
                </div>
                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-bold border border-emerald-200">NPS {a.nps}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Customer Feedback */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-500" />
            <h3 className="font-bold text-slate-900 text-sm">Recent Customer Feedback</h3>
          </div>
          <div className="divide-y divide-slate-100">
            {RECENT_FEEDBACK.map((f, idx) => (
              <div key={idx} className="p-4 space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-slate-900">{f.contact}</span>
                    <StarRating rating={f.rating} />
                  </div>
                  <span className="text-[10px] text-slate-400">{f.date}</span>
                </div>
                <p className="text-xs text-slate-600 italic">"{f.comment}"</p>
                <p className="text-[10px] text-slate-400 font-medium">Handled by: {f.agent}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
