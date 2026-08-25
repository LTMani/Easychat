'use client';

import React from 'react';
import { FileCode, Layers, Cpu, CheckCircle2, Split, ArrowRight } from 'lucide-react';

const CHUNKS = [
  { id: 'chk_10a', index: 0, tokens: 92, heading: 'Telephony Architecture > WebRTC Softphone', text: 'The WebRTC softphone provides in-browser audio termination without third-party plugins.' },
  { id: 'chk_10b', index: 1, tokens: 84, heading: 'Telephony Architecture > Codec Negotiation', text: 'Opus wideband audio is preferred for high-definition calls, falling back to G.711 u-law for PSTN.' },
  { id: 'chk_10c', index: 2, tokens: 105, heading: 'Telephony Architecture > Regional Gateways', text: 'SIP trunks terminate into regional edge clusters in N. Virginia, Frankfurt, and Singapore with failover.' },
];

export default function ChunkingStudioPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600 shadow-sm">
            <Split className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Markdown Document Chunking Studio</h1>
            <p className="text-sm text-slate-500 mt-1">Recursive AST document splitter with heading hierarchy retention and token overlap.</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-purple-50 border border-purple-200 rounded-xl px-4 py-2 text-xs font-bold text-purple-900 shadow-xs">
          <CheckCircle2 className="w-4 h-4 text-purple-600" /> Target: 400 Chars / 80 Overlap
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {CHUNKS.map((c) => (
          <div key={c.id} className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                Chunk #{c.index + 1}
              </span>
              <span className="font-mono text-xs text-slate-400 font-bold">{c.tokens} tokens</span>
            </div>

            <p className="text-[11px] font-bold text-slate-500 truncate">{c.heading}</p>

            <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed font-mono">
              "{c.text}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
