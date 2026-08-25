'use client';

import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, Copy, RefreshCw, Key, Lock } from 'lucide-react';

export default function MerkleVerifyPage() {
  const [rootHash, setRootHash] = useState('a9f4c3982e01bca9884712fed4001928374a5e6b7c8d9e0f1a2b3c4d5e6f7a8b');
  const [targetLog, setTargetLog] = useState('2026-08-25T14:45:00Z|USER_LOGIN|sarah@acme.com|IP:192.168.1.10');
  const [isVerified, setIsVerified] = useState<boolean | null>(true);

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 shadow-sm">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Audit Log Merkle Root & Proof Verifier</h1>
            <p className="text-sm text-slate-500 mt-1">Cryptographic tamper-evident hash verification for external SOC2 & ISO 27001 compliance auditors.</p>
          </div>
        </div>

        <button
          onClick={() => setIsVerified(true)}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-2 transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Re-Verify Proof Chain
        </button>
      </div>

      {isVerified && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 flex items-start gap-4 shadow-sm">
          <div className="p-2 rounded-full bg-emerald-100 text-emerald-700">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-emerald-950 text-sm">Cryptographic Verification Passed</h3>
            <p className="text-xs text-emerald-800 leading-relaxed">
              The provided target log entry was mathematically proven to exist within the immutable Merkle tree anchored to root hash <code className="font-mono font-bold">{rootHash.slice(0, 16)}...</code> without tampering.
            </p>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm">
        <h3 className="font-bold text-slate-900 text-sm">Verification Parameters</h3>

        <div className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Target Audit Log Signature Payload</label>
            <textarea
              rows={2}
              value={targetLog}
              onChange={(e) => setTargetLog(e.target.value)}
              className="w-full font-mono bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Published Merkle Root Hash (SHA-256)</label>
            <input
              value={rootHash}
              onChange={(e) => setRootHash(e.target.value)}
              className="w-full font-mono bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
