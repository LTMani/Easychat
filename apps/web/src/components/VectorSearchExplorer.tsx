'use client';

import React, { useState } from 'react';
import { Search, Sparkles, Database, FileText, ArrowRight, Layers } from 'lucide-react';

const SAMPLE_RESULTS = [
  { id: 'chunk_101', title: 'WhatsApp Webhook Signature Verification', similarity: 0.94, snippet: 'Verify X-Hub-Signature-256 header using HMAC-SHA256 with the app client secret over the raw payload buffer.', category: 'Channels / WhatsApp' },
  { id: 'chunk_102', title: 'SAML 2.0 Okta Assertion Certificate Setup', similarity: 0.88, snippet: 'Ensure the X.509 certificate matches the Active IdP public key in EasyChat Security settings before rolling over metadata.', category: 'Security / SSO' },
  { id: 'chunk_103', title: 'SLA Breach Policy Calculation Schedules', similarity: 0.82, snippet: 'Business hours exclusion automatically skips weekend windows for Tier 1 enterprise support tickets.', category: 'Ticketing / SLA' },
];

export function VectorSearchExplorer() {
  const [query, setQuery] = useState('How to configure webhook HMAC verification?');
  const [results, setResults] = useState(SAMPLE_RESULTS);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6 max-w-2xl">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-600" />
          <div>
            <h3 className="font-bold text-slate-900 text-sm">RAG Vector & Semantic Knowledge Search</h3>
            <p className="text-xs text-slate-500">Cosine similarity matching over indexed knowledge embeddings</p>
          </div>
        </div>
        <span className="text-[10px] bg-purple-100 text-purple-800 font-bold px-2 py-0.5 rounded-full font-mono">
          text-embedding-3-small (1536-dim)
        </span>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask anything in natural language..."
            className="w-full pl-9 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <button className="px-4 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl shadow-sm transition-colors">
          Search
        </button>
      </div>

      <div className="space-y-3">
        {results.map((r) => (
          <div key={r.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-3.5 h-3.5 text-slate-400" />
                <h4 className="font-bold text-xs text-slate-900">{r.title}</h4>
              </div>
              <span className="text-[10px] font-mono font-bold text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-full">
                {(r.similarity * 100).toFixed(1)}% Match
              </span>
            </div>
            <p className="text-xs text-slate-600 font-sans leading-relaxed">"{r.snippet}"</p>
            <p className="text-[10px] text-slate-400 font-mono">{r.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
