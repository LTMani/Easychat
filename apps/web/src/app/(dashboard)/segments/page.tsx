'use client';

import React, { useState } from 'react';
import { Users, Tag, Filter, Download, Plus, Search, TrendingDown, TrendingUp, Target } from 'lucide-react';

const SAMPLE_SEGMENTS = [
  { id: 'seg_1', name: 'High-Value Customers', description: 'Lifetime value > $10,000', count: 142, color: 'bg-purple-100 text-purple-700 border-purple-200', criteria: 'LTV > $10,000' },
  { id: 'seg_2', name: 'Churn Risk', description: 'No activity in last 60 days', count: 38, color: 'bg-red-100 text-red-700 border-red-200', criteria: 'Last activity > 60 days ago' },
  { id: 'seg_3', name: 'Enterprise Prospects', description: 'Lead score >= 70, Director+', count: 29, color: 'bg-blue-100 text-blue-700 border-blue-200', criteria: 'Score >= 70' },
  { id: 'seg_4', name: 'Trial Users — Free Plan', description: 'Subscribed to free trial', count: 213, color: 'bg-amber-100 text-amber-700 border-amber-200', criteria: 'Plan = Free Trial' },
  { id: 'seg_5', name: 'Re-engagement Targets', description: 'Opened email but no click in 30d', count: 84, color: 'bg-emerald-100 text-emerald-700 border-emerald-200', criteria: 'Email opened, no click, 30d' },
];

export default function ContactSegmentationPage() {
  const [search, setSearch] = useState('');
  const filtered = SAMPLE_SEGMENTS.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) || s.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
            <Users className="w-7 h-7 text-blue-600" />
            Dynamic Contact Segmentation Engine
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Create real-time contact segments based on LTV, activity, lead score, geography, and custom criteria.
          </p>
        </div>
        <button className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-2 transition-colors">
          <Plus className="w-4 h-4" />
          New Segment
        </button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-3 gap-5">
        {[
          { icon: Target, label: 'Total Segments', value: SAMPLE_SEGMENTS.length.toString(), color: 'text-blue-600' },
          { icon: TrendingUp, label: 'Total Contacts Segmented', value: SAMPLE_SEGMENTS.reduce((acc, s) => acc + s.count, 0).toString(), color: 'text-emerald-600' },
          { icon: TrendingDown, label: 'Churn Risk Contacts', value: '38', color: 'text-red-600' },
        ].map((s, idx) => {
          const Icon = s.icon;
          return (
            <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase text-slate-500">
                <Icon className={`w-4 h-4 ${s.color}`} />
                {s.label}
              </div>
              <p className="text-2xl font-bold text-slate-900">{s.value}</p>
            </div>
          );
        })}
      </div>

      {/* Search */}
      <div className="relative w-72">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search segments..." className="w-full pl-9 pr-4 py-2.5 text-xs border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" />
      </div>

      {/* Segment Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((seg) => (
          <div key={seg.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 hover:border-blue-300 transition-colors space-y-3">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-blue-400" />
                  <h3 className="font-bold text-slate-900 text-sm">{seg.name}</h3>
                </div>
                <p className="text-xs text-slate-500">{seg.description}</p>
              </div>
              <span className={`border rounded-full px-3 py-1 text-xs font-bold ${seg.color}`}>
                {seg.count.toLocaleString()} contacts
              </span>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <span className="text-[10px] text-slate-500 font-mono font-bold">{seg.criteria}</span>
              <div className="flex items-center gap-2">
                <button className="px-2.5 py-1.5 text-[10px] font-bold border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 flex items-center gap-1">
                  <Download className="w-3 h-3" />
                  Export
                </button>
                <button className="px-2.5 py-1.5 text-[10px] font-bold bg-blue-600 text-white rounded-lg hover:bg-blue-500 flex items-center gap-1">
                  <Filter className="w-3 h-3" />
                  Run Campaign
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
