'use client';

import React, { useState } from 'react';
import { Search, Sparkles, Database, FileText, CheckCircle2, Sliders, ArrowRight } from 'lucide-react';

const SAMPLE_RESULTS = [
  { id: 'kb_01', title: 'Enterprise SLA & Support Tiers', category: 'SLA', bm25: '0.92', vector: '0.98', hybrid: '0.95', text: 'Our Enterprise tier guarantees 15-minute response times for P1 outages with 99.99% uptime.' },
  { id: 'kb_02', title: 'HIPAA PHI Data Compliance', category: 'COMPLIANCE', bm25: '0.45', vector: '0.84', hybrid: '0.64', text: 'EasyChat complies with HIPAA standards by signing Business Associate Agreements (BAAs) and encrypting PHI.' },
  { id: 'kb_03', title: 'CPQ Custom Quote Generation', category: 'SALES', bm25: '0.12', vector: '0.52', hybrid: '0.32', text: 'Sales representatives can generate custom CPQ quotes with tiered volume discounts and send e-signatures.' },
];

export default function RagSearchPage() {
  const [query, setQuery] = useState('What is the enterprise 15-minute SLA guarantee?');
  const [alpha, setAlpha] = useState(0.5);

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 shadow-sm">
            <Search className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">RAG Hybrid Search & Reranking Simulator</h1>
            <p className="text-sm text-slate-500 mt-1">Reciprocal Rank Fusion blending BM25 sparse keyword search and dense vector embeddings.</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-indigo-50 border border-indigo-200 rounded-xl px-4 py-2 text-xs font-bold text-indigo-900 shadow-xs">
          <Sparkles className="w-4 h-4 text-indigo-600" /> Cross-Encoder Reranking Active
        </div>
      </div>

      {/* Query Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <div className="flex items-center gap-3">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-medium text-slate-900 outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Type customer question to test RAG retrieval..."
          />
          <button className="px-5 py-2.5 bg-[#4f46e5] text-white font-bold text-xs rounded-xl shadow-md shadow-indigo-500/20">
            Execute Search
          </button>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <Sliders className="w-3.5 h-3.5" />
            <span>Hybrid Balance (Alpha): <strong>{alpha}</strong> (50% BM25 / 50% Vector)</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={alpha}
            onChange={(e) => setAlpha(parseFloat(e.target.value))}
            className="w-48 accent-indigo-600"
          />
        </div>
      </div>

      {/* Results list */}
      <div className="space-y-4">
        {SAMPLE_RESULTS.map((r, idx) => (
          <div key={r.id} className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-mono font-black text-indigo-600 text-xs bg-indigo-50 px-2 py-0.5 rounded">
                  #{idx + 1}
                </span>
                <h3 className="font-bold text-slate-900 text-sm">{r.title}</h3>
                <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded">
                  {r.category}
                </span>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono">
                <span className="text-slate-400">BM25: <strong className="text-slate-700">{r.bm25}</strong></span>
                <span className="text-slate-400">Vector: <strong className="text-slate-700">{r.vector}</strong></span>
                <span className="bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded border border-emerald-200">
                  Hybrid: {r.hybrid}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
              "{r.text}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
