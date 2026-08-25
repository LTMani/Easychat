'use client';

import React from 'react';
import { ShieldCheck, Lock, Users, CheckCircle2, UserCheck, ArrowRight } from 'lucide-react';

const PERMS = [
  { code: 'contacts.read', cat: 'CRM_CONTACTS', desc: 'View customer contact 360 profiles and timeline', roles: ['Admin', 'Sales Dir', 'Sales Rep', 'Support Lead', 'Support Agent'] },
  { code: 'contacts.delete_gdpr', cat: 'CRM_CONTACTS', desc: 'Execute GDPR Article 17 hard erasure', roles: ['Admin', 'Compliance Officer'] },
  { code: 'deals.manage_cpq', cat: 'SALES_DEALS', desc: 'Configure custom discount curves & quotes', roles: ['Admin', 'Sales Dir', 'Sales Rep'] },
  { code: 'telephony.listen_live', cat: 'TELEPHONY_VOIP', desc: 'Live whisper and barge into active PSTN calls', roles: ['Admin', 'Support Lead', 'Sales Dir'] },
  { code: 'billing.issue_refund', cat: 'BILLING_INVOICES', desc: 'Issue Stripe charge refunds and credit notes', roles: ['Admin', 'Billing Controller'] },
];

export default function RbacMatrixPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 shadow-sm">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Zero-Trust Role-Based Access Control (RBAC) Matrix</h1>
            <p className="text-sm text-slate-500 mt-1">Granular tenant permission scoping, attribute-based access control (ABAC), and principle of least privilege.</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2 text-xs font-bold text-emerald-900 shadow-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Least-Privilege Enforced
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-50 border-b border-slate-100 text-[10px] font-bold uppercase text-slate-500">
            <tr>
              <th className="p-4">Permission Code</th>
              <th className="p-4">Category</th>
              <th className="p-4">Description</th>
              <th className="p-4 text-right">Authorized Enterprise Roles</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {PERMS.map((p) => (
              <tr key={p.code} className="hover:bg-slate-50">
                <td className="p-4 font-mono font-bold text-indigo-600">{p.code}</td>
                <td className="p-4 font-mono text-[10px] font-bold text-slate-400">{p.cat}</td>
                <td className="p-4 text-slate-800">{p.desc}</td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-1 flex-wrap">
                    {p.roles.map((r, i) => (
                      <span key={i} className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {r}
                      </span>
                    ))}
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
