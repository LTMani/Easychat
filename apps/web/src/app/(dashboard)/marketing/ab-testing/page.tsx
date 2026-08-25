'use client';

import React, { useState } from 'react';
import { Split, Plus, Play, Pause, CheckCircle2, TrendingUp, BarChart2 } from 'lucide-react';

const AB_TESTS = [
  {
    id: 'ab_01',
    name: 'Q3 Enterprise Product Announcement',
    status: 'RUNNING',
    trafficSplit: '50% / 50%',
    winnerCriteria: 'Click-Through Rate (CTR)',
    variants: [
      { name: 'Variant A: Direct ROI Focus', subject: 'Unlock 3x Support Speed with EasyChat 2.0', sends: 2400, opens: 1120, openRate: '46.7%', clicks: 380, clickRate: '15.8%' },
      { name: 'Variant B: Feature Highlight', subject: 'Introducing AI Copilot & Real-Time WhatsApp CRM', sends: 2400, opens: 1290, openRate: '53.8%', clicks: 490, clickRate: '20.4%', isLeading: true },
    ],
  },
  {
    id: 'ab_02',
    name: 'SaaS Renewal Anniversary Reminder',
    status: 'COMPLETED',
    trafficSplit: '33% / 33% / 34%',
    winnerCriteria: 'Open Rate',
    variants: [
      { name: 'Variant 1: Friendly Check-in', subject: 'How is your team enjoying EasyChat?', sends: 850, opens: 410, openRate: '48.2%', clicks: 120, clickRate: '14.1%' },
      { name: 'Variant 2: VIP Discount', subject: 'Exclusive 15% Early Renewal Benefit Inside', sends: 850, opens: 590, openRate: '69.4%', clicks: 280, clickRate: '32.9%', isWinner: true },
      { name: 'Variant 3: Executive Review', subject: 'Your EasyChat Annual Performance Review', sends: 850, opens: 440, openRate: '51.7%', clicks: 160, clickRate: '18.8%' },
    ],
  },
];

export default function AbTestingDashboardPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-pink-50 border border-pink-200 flex items-center justify-center text-pink-600 shadow-sm">
            <Split className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Marketing A/B Testing Lab</h1>
            <p className="text-sm text-slate-500 mt-1">Multi-variant statistical experiment suite for subject lines, email templates, and CTA buttons.</p>
          </div>
        </div>

        <button className="px-4 py-2.5 bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-2 transition-colors">
          <Plus className="w-4 h-4" /> Create A/B Experiment
        </button>
      </div>

      <div className="space-y-6">
        {AB_TESTS.map((test) => (
          <div key={test.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="font-bold text-slate-900 text-base">{test.name}</h3>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${test.status === 'RUNNING' ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'}`}>
                    {test.status}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">Traffic Split: {test.trafficSplit} • Metric: {test.winnerCriteria}</p>
              </div>

              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-xl flex items-center gap-1">
                  <BarChart2 className="w-3.5 h-3.5" /> Full Report
                </button>
              </div>
            </div>

            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50/80 border-b border-slate-100 text-[10px] font-bold uppercase text-slate-500">
                <tr>
                  <th className="p-4">Variant</th>
                  <th className="p-4">Subject Line</th>
                  <th className="p-4">Sends</th>
                  <th className="p-4">Open Rate</th>
                  <th className="p-4">Click-Through Rate</th>
                  <th className="p-4">Outcome</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {test.variants.map((v, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="p-4 font-bold text-slate-900">{v.name}</td>
                    <td className="p-4 text-slate-600 font-mono text-xs">"{v.subject}"</td>
                    <td className="p-4 font-mono">{v.sends.toLocaleString()}</td>
                    <td className="p-4 font-bold text-slate-900">{v.openRate}</td>
                    <td className="p-4 font-bold text-pink-600">{v.clickRate}</td>
                    <td className="p-4">
                      {v.isWinner && (
                        <span className="bg-emerald-100 text-emerald-800 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 w-fit">
                          <CheckCircle2 className="w-3 h-3" /> Winner (Selected)
                        </span>
                      )}
                      {v.isLeading && (
                        <span className="bg-blue-100 text-blue-800 border border-blue-200 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 w-fit">
                          <TrendingUp className="w-3 h-3" /> Leading (+29%)
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}
