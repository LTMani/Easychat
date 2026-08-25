'use client';

import React, { useState } from 'react';
import { Globe, TrendingUp, Users, MapPin, Download, BarChart2 } from 'lucide-react';

const REGIONAL_DATA = [
  { region: 'North America', contactCount: 2841, dealsCount: 187, revenue: 4820000, avgLtv: 1697, topCountry: 'United States', growth: '+12.3%' },
  { region: 'Europe', contactCount: 1562, dealsCount: 104, revenue: 2910000, avgLtv: 1863, topCountry: 'Germany', growth: '+8.7%' },
  { region: 'Asia Pacific', contactCount: 983, dealsCount: 71, revenue: 1640000, avgLtv: 1668, topCountry: 'India', growth: '+24.1%' },
  { region: 'South America', contactCount: 341, dealsCount: 22, revenue: 480000, avgLtv: 1407, topCountry: 'Brazil', growth: '+5.2%' },
  { region: 'Middle East & Africa', contactCount: 128, dealsCount: 9, revenue: 195000, avgLtv: 1523, topCountry: 'UAE', growth: '+18.6%' },
];

const TOP_COUNTRIES = [
  { flag: '🇺🇸', country: 'United States', contacts: 2104, deals: 148, revenue: 3810000 },
  { flag: '🇩🇪', country: 'Germany', contacts: 498, deals: 41, revenue: 1020000 },
  { flag: '🇮🇳', country: 'India', contacts: 412, deals: 28, revenue: 612000 },
  { flag: '🇬🇧', country: 'United Kingdom', contacts: 389, deals: 32, revenue: 890000 },
  { flag: '🇨🇦', country: 'Canada', contacts: 298, deals: 21, revenue: 520000 },
  { flag: '🇦🇺', country: 'Australia', contacts: 213, deals: 17, revenue: 410000 },
  { flag: '🇫🇷', country: 'France', contacts: 187, deals: 14, revenue: 380000 },
  { flag: '🇸🇬', country: 'Singapore', contacts: 156, deals: 12, revenue: 340000 },
];

export default function GeographicAnalyticsPage() {
  const [viewMode, setViewMode] = useState<'REGIONAL' | 'COUNTRY'>('REGIONAL');
  const totalContacts = REGIONAL_DATA.reduce((acc, r) => acc + r.contactCount, 0);
  const totalRevenue = REGIONAL_DATA.reduce((acc, r) => acc + r.revenue, 0);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
            <Globe className="w-7 h-7 text-blue-600" />
            Geographic Analytics & Territory Overview
          </h1>
          <p className="text-sm text-slate-500 mt-1">Analyze customer distribution, revenue, and growth by region and country.</p>
        </div>
        <div className="flex items-center gap-3">
          {(['REGIONAL', 'COUNTRY'] as const).map((m) => (
            <button key={m} onClick={() => setViewMode(m)} className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-colors ${viewMode === m ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}>{m}</button>
          ))}
          <button className="px-4 py-2 border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 rounded-xl flex items-center gap-2">
            <Download className="w-3.5 h-3.5" />Export
          </button>
        </div>
      </div>

      {/* Global KPIs */}
      <div className="grid grid-cols-3 gap-5">
        {[
          { icon: Users, label: 'Total Contacts Globally', value: totalContacts.toLocaleString(), color: 'text-blue-500' },
          { icon: TrendingUp, label: 'Global Revenue (YTD)', value: `$${(totalRevenue / 1000000).toFixed(1)}M`, color: 'text-emerald-500' },
          { icon: MapPin, label: 'Countries Active', value: TOP_COUNTRIES.length.toString() + '+', color: 'text-purple-500' },
        ].map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div key={idx} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-2">
              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase"><Icon className={`w-4 h-4 ${kpi.color}`} />{kpi.label}</div>
              <p className="text-2xl font-bold text-slate-900">{kpi.value}</p>
            </div>
          );
        })}
      </div>

      {viewMode === 'REGIONAL' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2"><BarChart2 className="w-4 h-4 text-blue-500" />Regional Breakdown</h3>
          </div>
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 border-b border-slate-100 text-[10px] font-bold uppercase text-slate-500">
              <tr>
                <th className="p-4">Region</th>
                <th className="p-4">Contacts</th>
                <th className="p-4">Active Deals</th>
                <th className="p-4">Revenue (YTD)</th>
                <th className="p-4">Avg LTV</th>
                <th className="p-4">Top Country</th>
                <th className="p-4">Growth</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {REGIONAL_DATA.map((row) => (
                <tr key={row.region} className="hover:bg-slate-50">
                  <td className="p-4 font-bold text-slate-900">{row.region}</td>
                  <td className="p-4">{row.contactCount.toLocaleString()}</td>
                  <td className="p-4">{row.dealsCount}</td>
                  <td className="p-4 font-bold">${(row.revenue / 1000000).toFixed(2)}M</td>
                  <td className="p-4">${row.avgLtv.toLocaleString()}</td>
                  <td className="p-4">{row.topCountry}</td>
                  <td className="p-4 text-emerald-700 font-bold">{row.growth}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {viewMode === 'COUNTRY' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2"><MapPin className="w-4 h-4 text-blue-500" />Top Countries</h3>
          </div>
          <div className="divide-y divide-slate-100">
            {TOP_COUNTRIES.map((c, idx) => (
              <div key={c.country} className="flex items-center gap-4 p-4 hover:bg-slate-50">
                <span className="text-slate-400 text-xs font-black w-4">#{idx + 1}</span>
                <span className="text-2xl">{c.flag}</span>
                <div className="flex-1">
                  <p className="font-bold text-sm text-slate-900">{c.country}</p>
                  <p className="text-xs text-slate-500">{c.contacts.toLocaleString()} contacts · {c.deals} deals</p>
                </div>
                <p className="font-bold text-slate-900">${(c.revenue / 1000).toFixed(0)}K</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
