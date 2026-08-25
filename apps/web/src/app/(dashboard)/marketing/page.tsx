'use client';

import React, { useState } from 'react';
import { Mail, Send, Plus, Users, BarChart3, CheckCircle2, Clock, FileText } from 'lucide-react';

export default function MarketingPage() {
  const [campaigns, setCampaigns] = useState([
    { id: 'cmp_101', name: 'Q3 Product Announcement', subject: 'Introducing EasyChat 2.0 Automation Engine', status: 'SENT', sentCount: 1420, openCount: 890, clickCount: 340, createdAt: '2026-08-20' },
    { id: 'cmp_102', name: 'Re-engagement Sequence', subject: 'We miss you! Special 20% discount inside', status: 'SCHEDULED', sentCount: 0, openCount: 0, clickCount: 0, createdAt: '2026-08-24' },
  ]);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
            <Mail className="w-7 h-7 text-blue-600" />
            Email Marketing & Broadcast Studio
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Create, schedule, and track targeted email broadcasts with merge tags and open-rate analytics.
          </p>
        </div>

        <button className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-2 transition-colors">
          <Plus className="w-4 h-4" />
          Create Broadcast Campaign
        </button>
      </div>

      {/* Campaign List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold text-[10px]">
            <tr>
              <th className="p-4">Campaign Name</th>
              <th className="p-4">Subject Line</th>
              <th className="p-4">Sent / Target</th>
              <th className="p-4">Open Rate</th>
              <th className="p-4">Click Rate</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {campaigns.map((c) => (
              <tr key={c.id} className="hover:bg-slate-50">
                <td className="p-4 font-bold text-slate-900 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-600" />
                  {c.name}
                </td>
                <td className="p-4 text-slate-600">{c.subject}</td>
                <td className="p-4 font-mono">{c.sentCount} recipients</td>
                <td className="p-4 font-bold text-emerald-600">
                  {c.sentCount > 0 ? `${Math.round((c.openCount / c.sentCount) * 100)}%` : '0%'}
                </td>
                <td className="p-4 font-bold text-blue-600">
                  {c.sentCount > 0 ? `${Math.round((c.clickCount / c.sentCount) * 100)}%` : '0%'}
                </td>
                <td className="p-4">
                  <span
                    className={`px-2.5 py-1 font-bold text-[10px] rounded-full uppercase ${
                      c.status === 'SENT'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}
                  >
                    {c.status}
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
