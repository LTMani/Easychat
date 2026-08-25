'use client';

import React from 'react';
import { Shield, Lock, FileText, CheckCircle2, UserCheck, ShieldAlert } from 'lucide-react';

const AUDITS = [
  { id: 'phi_ev_01', actor: 'Dr. Rahul Varma (Chief Medical)', patient: 'Patient #9948', action: 'PHI_VIEWED', fields: 'prescriptions, lab_results', time: '5 mins ago', status: 'HMAC_VERIFIED' },
  { id: 'phi_ev_02', actor: 'Sarah Jenkins (Care Coordinator)', patient: 'Patient #8812', action: 'CONSENT_GRANTED', fields: 'telehealth_consent', time: '18 mins ago', status: 'HMAC_VERIFIED' },
  { id: 'phi_ev_03', actor: 'David Chen (Billing Specialist)', patient: 'Patient #7741', action: 'PHI_EXPORTED', fields: 'claims_summary', time: '45 mins ago', status: 'HMAC_VERIFIED' },
  { id: 'phi_ev_04', actor: 'Emily Watson (Clinical QA)', patient: 'Patient #6620', action: 'PHI_MODIFIED', fields: 'insurance_id', time: '2 hours ago', status: 'HMAC_VERIFIED' },
];

export default function HipaaAuditsPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600 shadow-sm">
            <Shield className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">HIPAA PHI Access & Audit Ledger</h1>
            <p className="text-sm text-slate-500 mt-1">Immutable, HMAC-signed audit logs tracking all access to Protected Health Information (PHI).</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-purple-50 border border-purple-200 rounded-xl px-4 py-2 text-xs font-bold text-purple-900 shadow-xs">
          <Lock className="w-4 h-4 text-purple-600" /> Tamper-Proof Cryptographic Signatures Active
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-50 border-b border-slate-100 text-[10px] font-bold uppercase text-slate-500">
            <tr>
              <th className="p-4">Event ID</th>
              <th className="p-4">Clinical Actor</th>
              <th className="p-4">Patient Record</th>
              <th className="p-4">Action</th>
              <th className="p-4">Fields Accessed</th>
              <th className="p-4">Time</th>
              <th className="p-4 text-right">Integrity Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {AUDITS.map((a) => (
              <tr key={a.id} className="hover:bg-slate-50">
                <td className="p-4 font-mono font-bold text-indigo-600">{a.id}</td>
                <td className="p-4 font-bold text-slate-900">{a.actor}</td>
                <td className="p-4 font-mono text-slate-600">{a.patient}</td>
                <td className="p-4">
                  <span className="bg-purple-50 text-purple-800 text-[10px] font-bold px-2 py-0.5 rounded-md font-mono">
                    {a.action}
                  </span>
                </td>
                <td className="p-4 text-slate-500 max-w-xs truncate">{a.fields}</td>
                <td className="p-4 text-slate-400">{a.time}</td>
                <td className="p-4 text-right">
                  <span className="bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" /> {a.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
