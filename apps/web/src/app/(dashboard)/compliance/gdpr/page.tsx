'use client';

import React, { useState } from 'react';
import { ShieldCheck, Download, Trash2, Search, FileText, CheckCircle2, AlertTriangle, Lock } from 'lucide-react';

const RECENT_REQUESTS = [
  { id: 'gdpr_1', contactName: 'David Meyer', email: 'erased_849102@gdpr-erased.invalid', type: 'RIGHT_TO_ERASURE', status: 'COMPLETED', receiptId: 'cert_9984710291', completedAt: '2026-08-20 14:10' },
  { id: 'gdpr_2', contactName: 'Elena Rostova', email: 'elena.rostova@example.eu', type: 'DATA_PORTABILITY_EXPORT', status: 'COMPLETED', receiptId: 'exp_4491028371', completedAt: '2026-08-18 09:22' },
  { id: 'gdpr_3', contactName: 'Thomas Becker', email: 'erased_220914@gdpr-erased.invalid', type: 'RIGHT_TO_ERASURE', status: 'COMPLETED', receiptId: 'cert_1102948172', completedAt: '2026-08-15 16:45' },
];

export default function GdprCompliancePage() {
  const [searchContact, setSearchContact] = useState('');
  const [erasing, setErasing] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600 shadow-sm">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">GDPR & Data Privacy Hub</h1>
            <p className="text-sm text-slate-500 mt-1">Manage data subject rights (Art. 17 Erasure, Art. 20 Export) and privacy compliance.</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="bg-emerald-100 text-emerald-800 border border-emerald-200 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
            <Lock className="w-3 h-3" /> GDPR Article 17 Compliant
          </span>
        </div>
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-red-50 text-red-600">
              <Trash2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Execute Right to Erasure (Article 17)</h3>
              <p className="text-xs text-slate-500">Permanently anonymize contact profile, tickets, and communications.</p>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Target Contact Email or ID</label>
              <input
                value={searchContact}
                onChange={(e) => setSearchContact(e.target.value)}
                placeholder="customer@example.com"
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <button
              disabled={!searchContact}
              onClick={() => setShowConfirmModal(true)}
              className="px-4 py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-2 transition-colors disabled:opacity-50"
            >
              <Trash2 className="w-3.5 h-3.5" /> Anonymize & Erase PII
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Data Portability Export (Article 20)</h3>
              <p className="text-xs text-slate-500">Generate machine-readable JSON data archive for a data subject.</p>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Target Contact Email or ID</label>
              <input
                placeholder="customer@example.com"
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-2 transition-colors"
            >
              <Download className="w-3.5 h-3.5" /> Generate Portability Export
            </button>
          </div>
        </div>
      </div>

      {/* Compliance Log Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Privacy Request Audit Log</h3>
            <p className="text-xs text-slate-500">Immutable record of all processed GDPR compliance operations.</p>
          </div>
        </div>
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-50 border-b border-slate-100 text-[10px] font-bold uppercase text-slate-500">
            <tr>
              <th className="p-4">Request ID</th>
              <th className="p-4">Contact</th>
              <th className="p-4">Operation Type</th>
              <th className="p-4">Compliance Certificate ID</th>
              <th className="p-4">Status</th>
              <th className="p-4">Completed At</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {RECENT_REQUESTS.map((req) => (
              <tr key={req.id} className="hover:bg-slate-50">
                <td className="p-4 font-mono font-bold text-slate-900">{req.id}</td>
                <td className="p-4 font-mono text-slate-600">{req.email}</td>
                <td className="p-4">
                  <span className="bg-purple-50 text-purple-700 font-bold px-2 py-0.5 rounded-full text-[10px]">
                    {req.type}
                  </span>
                </td>
                <td className="p-4 font-mono text-blue-600 font-bold">{req.receiptId}</td>
                <td className="p-4">
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {req.status}
                  </span>
                </td>
                <td className="p-4 text-slate-500">{req.completedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
