'use client';

import React, { useState } from 'react';
import { FileSignature, Plus, Search, Eye, CheckCircle2, Clock, XCircle, Download, FileText } from 'lucide-react';

const CONTRACTS = [
  { id: 'cnt_101', title: 'Master Services Agreement — Acme Corp', customer: 'Acme Corporation', value: 120000, status: 'SIGNED', signersCount: 2, signedCount: 2, createdDate: '2026-08-15', certId: 'cert_8492019482' },
  { id: 'cnt_102', title: 'Data Processing Addendum (DPA) — FinTech Hub', customer: 'FinTech Hub Ltd', value: 45000, status: 'SENT_FOR_SIGNATURE', signersCount: 2, signedCount: 1, createdDate: '2026-08-22', certId: null },
  { id: 'cnt_103', title: 'Service Level Agreement Upgrade — Global Retail', customer: 'Global Retail Inc', value: 38000, status: 'DRAFT', signersCount: 1, signedCount: 0, createdDate: '2026-08-24', certId: null },
  { id: 'cnt_104', title: 'Software License Schedule — TechVenture', customer: 'TechVenture LLC', value: 85000, status: 'SIGNED', signersCount: 3, signedCount: 3, createdDate: '2026-08-10', certId: 'cert_1192847291' },
];

export default function ContractsDashboardPage() {
  const [contracts, setContracts] = useState(CONTRACTS);
  const [filterStatus, setFilterStatus] = useState('ALL');

  const filtered = filterStatus === 'ALL' ? contracts : contracts.filter((c) => c.status === filterStatus);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600 shadow-sm">
            <FileSignature className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Contracts & E-Signatures</h1>
            <p className="text-sm text-slate-500 mt-1">Manage legal contracts, track multi-party signatures, and generate tamper-evident audit certificates.</p>
          </div>
        </div>

        <button className="px-4 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-2 transition-colors">
          <Plus className="w-4 h-4" /> Draft New Contract
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-5">
        {[
          { label: 'Signed Contract Value', value: '$205,000', desc: 'Across 2 completed agreements', color: 'text-emerald-500' },
          { label: 'Pending Signatures', value: '1 Contract', desc: 'Awaiting 1 counter-signature', color: 'text-amber-500' },
          { label: 'Drafts in Progress', value: '1 Document', desc: 'Under internal legal review', color: 'text-blue-500' },
          { label: 'Avg Time to Sign', value: '2.4 Days', desc: 'From delivery to completion', color: 'text-purple-500' },
        ].map((kpi, idx) => (
          <div key={idx} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-2">
            <p className="text-[10px] font-bold text-slate-500 uppercase">{kpi.label}</p>
            <p className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</p>
            <p className="text-xs text-slate-400">{kpi.desc}</p>
          </div>
        ))}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        {['ALL', 'SIGNED', 'SENT_FOR_SIGNATURE', 'DRAFT'].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-3 py-1.5 text-xs font-bold rounded-full border transition-colors ${
              filterStatus === status
                ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {status.replace(/_/g, ' ')}
          </button>
        ))}
      </div>

      {/* Contracts Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-50 border-b border-slate-100 text-[10px] font-bold uppercase text-slate-500">
            <tr>
              <th className="p-4">Contract Title</th>
              <th className="p-4">Customer Account</th>
              <th className="p-4">Contract Value</th>
              <th className="p-4">Signer Progress</th>
              <th className="p-4">Status</th>
              <th className="p-4">Created Date</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {filtered.map((c) => (
              <tr key={c.id} className="hover:bg-slate-50">
                <td className="p-4 font-bold text-slate-900 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-purple-600" />
                  {c.title}
                </td>
                <td className="p-4 text-slate-600">{c.customer}</td>
                <td className="p-4 font-bold text-slate-900">${c.value.toLocaleString()}</td>
                <td className="p-4">
                  <span className="font-mono text-slate-600 font-bold">{c.signedCount}/{c.signersCount} Signed</span>
                </td>
                <td className="p-4">
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${c.status === 'SIGNED' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : c.status === 'SENT_FOR_SIGNATURE' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-slate-50 text-slate-700 border-slate-200'}`}>
                    {c.status.replace(/_/g, ' ')}
                  </span>
                </td>
                <td className="p-4 text-slate-500">{c.createdDate}</td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <button className="text-purple-600 hover:text-purple-800 font-bold flex items-center gap-1">
                      <Eye className="w-3 h-3" /> View
                    </button>
                    {c.certId && (
                      <button className="text-slate-500 hover:text-slate-700 flex items-center gap-1 font-bold">
                        <Download className="w-3 h-3" /> Cert
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
