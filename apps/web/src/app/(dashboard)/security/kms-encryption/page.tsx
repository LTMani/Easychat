'use client';

import React from 'react';
import { Key, ShieldCheck, RefreshCw, CheckCircle2, Lock, Cpu, ArrowRight } from 'lucide-react';

const KEYS = [
  { id: 'kek_v2_2026', name: 'Master Enterprise Key Encryption Key', algorithm: 'AES-256-GCM', hsmStatus: 'FIPS 140-2 Level 3', rotated: '12 days ago', status: 'ACTIVE' },
  { id: 'kek_v1_2025', name: 'Legacy Master Data Key', algorithm: 'AES-256-GCM', hsmStatus: 'FIPS 140-2 Level 3', rotated: '1 year ago', status: 'RETIRED_DECRYPT_ONLY' },
];

export default function KmsEncryptionPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 shadow-sm">
            <Key className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">KMS Envelope Encryption & DEK Vault</h1>
            <p className="text-sm text-slate-500 mt-1">Hardware Security Module (HSM) key wrapping, automated zero-downtime key rotation, and AES-256-GCM field encryption.</p>
          </div>
        </div>

        <button className="px-4 py-2.5 bg-[#4f46e5] hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md shadow-indigo-500/20 flex items-center gap-2 transition-colors">
          <RefreshCw className="w-4 h-4" /> Rotate Master KEK
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden divide-y divide-slate-100">
        {KEYS.map((k) => (
          <div key={k.id} className="p-6 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <span className="font-mono font-bold text-indigo-600 text-xs bg-indigo-50 px-2 py-0.5 rounded">
                  {k.id}
                </span>
                <h3 className="font-bold text-slate-900 text-sm">{k.name}</h3>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${k.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-600'}`}>
                  {k.status}
                </span>
              </div>
              <p className="text-xs text-slate-500">{k.algorithm} • HSM: {k.hsmStatus} • Rotated: {k.rotated}</p>
            </div>

            <div className="flex items-center gap-3">
              <span className="bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Compliant
              </span>
              <button className="px-3 py-1.5 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-lg">
                Audit Trail
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
