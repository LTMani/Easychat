'use client';

import React from 'react';
import { PenTool, CheckCircle2, FileText, ShieldCheck, ArrowRight, Download, Send } from 'lucide-react';

const CEREMONIES = [
  { id: 'env_9901', title: 'Enterprise MSA - Apex Global Technologies', signers: 'Alexander Sterling, Sarah Jenkins', status: 'COMPLETED', date: '2026-08-25', cert: 'SHA256:4a5e1e4b...' },
  { id: 'env_9902', title: 'Business Associate Agreement (BAA) - BioHealth Systems', signers: 'Dr. Aris Thorne, Rahul Varma', status: 'COMPLETED', date: '2026-08-24', cert: 'SHA256:b94d27b9...' },
  { id: 'env_9903', title: 'Carrier SIP Interconnect Agreement - Nexus Telecom', signers: 'Eleanor Vance, David Chen', status: 'SENT', date: '2026-08-25', cert: 'Pending Signature' },
];

export default function EsignVaultPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 shadow-sm">
            <PenTool className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">E-Signature Document Ceremony Vault</h1>
            <p className="text-sm text-slate-500 mt-1">Legally binding ESIGN & eIDAS compliant signing ceremonies with cryptographic certificates of completion.</p>
          </div>
        </div>

        <button className="px-4 py-2.5 bg-[#4f46e5] text-white font-bold text-xs rounded-xl shadow-md shadow-indigo-500/20 flex items-center gap-2">
          <Send className="w-4 h-4" /> Send Document For Signature
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-50 border-b border-slate-100 text-[10px] font-bold uppercase text-slate-500">
            <tr>
              <th className="p-4">Envelope ID</th>
              <th className="p-4">Document Title</th>
              <th className="p-4">Signers</th>
              <th className="p-4">Certificate Hash</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {CEREMONIES.map((c) => (
              <tr key={c.id} className="hover:bg-slate-50">
                <td className="p-4 font-mono font-bold text-indigo-600">{c.id}</td>
                <td className="p-4 font-bold text-slate-900">{c.title}</td>
                <td className="p-4 text-slate-600">{c.signers}</td>
                <td className="p-4 font-mono text-slate-400 text-[11px]">{c.cert}</td>
                <td className="p-4">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${c.status === 'COMPLETED' ? 'bg-emerald-50 text-emerald-700' : 'bg-blue-50 text-blue-700'}`}>
                    {c.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button className="text-indigo-600 font-bold hover:underline flex items-center gap-1 ml-auto">
                    <Download className="w-3.5 h-3.5" /> PDF
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
