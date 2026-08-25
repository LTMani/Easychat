'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BarChart3, TrendingUp, DollarSign, Users, CheckCircle, AlertCircle } from 'lucide-react';
import { NotificationBell } from '../../../components/NotificationBell';

export default function AnalyticsPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchAnalytics = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) return;
      const res = await fetch('http://localhost:4000/api/v1/analytics/summary', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const resData = await res.json();
      if (res.ok && resData.data) setData(resData.data);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Link href="/" className="w-8 h-8 bg-blue-600 rounded-lg text-white font-bold flex items-center justify-center">
            E
          </Link>
          <h1 className="text-xl font-bold text-slate-900">Analytics & Executive Reporting</h1>
        </div>
        <NotificationBell />
      </header>

      <main className="max-w-6xl w-full mx-auto px-6 py-8 flex-1">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Business Performance Metrics</h2>
          <p className="text-sm text-slate-500 mt-1">Real-time revenue forecast, win rates, conversion funnel, and support SLAs</p>
        </div>

        {loading ? (
          <div className="text-center py-12 text-slate-500">Loading analytics...</div>
        ) : !data ? (
          <div className="text-center py-12 text-slate-500">Unable to load metrics</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-bold uppercase">Pipeline Revenue</span>
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-3xl font-extrabold text-slate-900">${data.totalPipelineRevenue?.toLocaleString()}</div>
              <div className="text-xs text-slate-500 mt-2">{data.openDealsCount} open sales deals</div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-bold uppercase">Deal Win Rate</span>
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-3xl font-extrabold text-slate-900">{data.winRatePercentage}%</div>
              <div className="text-xs text-slate-500 mt-2">{data.wonDealsCount} won deals</div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-bold uppercase">Total Leads</span>
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <div className="text-3xl font-extrabold text-slate-900">{data.totalLeads}</div>
              <div className="text-xs text-slate-500 mt-2">{data.totalContacts} total contacts</div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-bold uppercase">Avg Response Time</span>
                <CheckCircle className="w-5 h-5 text-orange-600" />
              </div>
              <div className="text-3xl font-extrabold text-slate-900">{data.avgResponseTimeMinutes}m</div>
              <div className="text-xs text-slate-500 mt-2">{data.openTicketsCount} open support tickets</div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
