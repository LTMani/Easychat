'use client';

import React from 'react';
import { ShieldCheck, Lock, FileCheck, CheckCircle2, Award, ArrowRight } from 'lucide-react';

const CONTROLS = [
  { id: 'CC6.1', name: 'Logical Access & RBAC Enforcement', category: 'ACCESS CONTROL', status: 'COMPLIANT', detail: 'MFA enforced across 124 users, 0 unmanaged privileged roles' },
  { id: 'CC6.6', name: 'Data Encryption In Transit & At Rest', category: 'ENCRYPTION', status: 'COMPLIANT', detail: 'TLS 1.3 enforced, Database volumes encrypted with AES-256-GCM' },
  { id: 'CC7.2', name: 'Continuous Vulnerability & Threat Monitoring', category: 'MONITORING', status: 'COMPLIANT', detail: '99.99% 30-day uptime, 0 critical CVEs, daily backup snapshots' },
  { id: 'CC8.1', name: 'Change Management & Peer Code Review', category: 'CHANGE MANAGEMENT', status: 'COMPLIANT', detail: '100% PR branch protection, 2 senior code review sign-offs required' },
];

export default function Soc2VaultPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shadow-sm">
            <Award className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">SOC 2 Type II Compliance Vault</h1>
            <p className="text-sm text-slate-500 mt-1">Continuous automated control telemetry, auditor evidence exports, and trust center artifacts.</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2 text-xs font-bold text-emerald-900 shadow-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Overall Posture: 100% Compliant
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden divide-y divide-slate-100">
        {CONTROLS.map((c) => (
          <div key={c.id} className="p-6 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
            <div className="space-y-1 max-w-2xl">
              <div className="flex items-center gap-3">
                <span className="font-mono font-bold text-indigo-600 text-xs bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded">
                  {c.id}
                </span>
                <h3 className="font-bold text-slate-900 text-sm">{c.name}</h3>
              </div>
              <p className="text-xs text-slate-500">{c.detail}</p>
            </div>

            <div className="flex items-center gap-4">
              <span className="bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> {c.status}
              </span>
              <button className="px-3 py-1.5 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-lg">
                Evidence Log
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
