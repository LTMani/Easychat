'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, Brain, ArrowRight } from 'lucide-react';
import { NotificationBell } from '../../../components/NotificationBell';

export default function AiCopilotPage() {
  const [insights, setInsights] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchInsights = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) return;
      const res = await fetch('http://localhost:4000/api/v1/ai/suggestions', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok && data.data) setInsights(data.data);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInsights();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Link href="/" className="w-8 h-8 bg-blue-600 rounded-lg text-white font-bold flex items-center justify-center">
            E
          </Link>
          <h1 className="text-xl font-bold text-slate-900">AI Intelligence & Copilot</h1>
        </div>
        <NotificationBell />
      </header>

      <main className="max-w-6xl w-full mx-auto px-6 py-8 flex-1">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-900">AI Next-Best-Action Engine</h2>
          <p className="text-sm text-slate-500 mt-1">Conversation summaries, lead intent scores, and suggested agent replies</p>
        </div>

        {loading ? (
          <div className="text-center py-12 text-slate-500">Loading AI insights...</div>
        ) : insights.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-xl border border-slate-200 text-slate-500">
            No AI insights generated yet. Interact in conversations to view live copilot recommendations!
          </div>
        ) : (
          <div className="space-y-4">
            {insights.map((ins) => (
              <div key={ins.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-start space-x-4">
                <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-slate-900 text-base">Conversation Analysis</span>
                    <span className="px-2.5 py-0.5 text-xs font-bold bg-green-50 text-green-700 border border-green-200 rounded">
                      Score: {ins.leadScore}/100
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed mb-3">{ins.summary}</p>
                  {ins.nextBestAction && (
                    <div className="inline-flex items-center space-x-2 text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg">
                      <span>Suggested Action: {ins.nextBestAction}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
