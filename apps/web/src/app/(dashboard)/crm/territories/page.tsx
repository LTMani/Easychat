'use client';

import React, { useState } from 'react';
import { MapPin, Plus, User, Globe, DollarSign, CheckCircle2 } from 'lucide-react';

const TERRITORIES = [
  { id: 'ter_1', name: 'North America Enterprise', repName: 'Sarah Jenkins', repEmail: 'sarah@acme.com', countries: ['US', 'CA', 'MX'], activeDeals: 18, pipelineValue: 1240000, status: 'ACTIVE' },
  { id: 'ter_2', name: 'DACH & Central Europe', repName: 'Alex Mercer', repEmail: 'alex@acme.com', countries: ['DE', 'AT', 'CH'], activeDeals: 12, pipelineValue: 890000, status: 'ACTIVE' },
  { id: 'ter_3', name: 'UK & Ireland Financial Services', repName: 'Oliver Smith', repEmail: 'oliver@acme.com', countries: ['GB', 'IE'], activeDeals: 8, pipelineValue: 640000, status: 'ACTIVE' },
  { id: 'ter_4', name: 'APAC & Australia Growth', repName: 'Priya Sharma', repEmail: 'priya@acme.com', countries: ['IN', 'SG', 'AU', 'JP'], activeDeals: 22, pipelineValue: 1580000, status: 'ACTIVE' },
];

export default function SalesTerritoriesPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shadow-sm">
            <MapPin className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Sales Territories & Geo-Assignment</h1>
            <p className="text-sm text-slate-500 mt-1">Geographic territory boundary mapping and automatic inbound lead distribution.</p>
          </div>
        </div>

        <button className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-2 transition-colors">
          <Plus className="w-4 h-4" /> Create Sales Territory
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {TERRITORIES.map((ter) => (
          <div key={ter.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4 hover:border-blue-300 transition-colors">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-base">{ter.name}</h3>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                {ter.status}
              </span>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {ter.countries.map((c, i) => (
                <span key={i} className="bg-slate-100 text-slate-800 font-mono font-bold text-xs px-2 py-1 rounded-md">
                  {c}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100">
              <div className="bg-slate-50 rounded-xl p-3">
                <p className="text-[10px] text-slate-400 font-bold uppercase">Active Pipeline</p>
                <p className="text-lg font-bold text-slate-900 font-mono">${(ter.pipelineValue / 1000).toFixed(0)}k</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-3">
                <p className="text-[10px] text-slate-400 font-bold uppercase">Open Opportunities</p>
                <p className="text-lg font-bold text-slate-900 font-mono">{ter.activeDeals} Deals</p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-[10px] flex items-center justify-center">
                  {ter.repName.slice(0, 2).toUpperCase()}
                </div>
                <span className="font-bold text-slate-900">{ter.repName} (Lead Owner)</span>
              </div>
              <button className="text-blue-600 hover:text-blue-800 font-bold">Edit Territory</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
