'use client';

import React from 'react';
import { Shield, Globe, Lock, Plus, CheckCircle2, Trash2 } from 'lucide-react';

const IP_RULES = [
  { id: 'ipr_corp_hq', cidr: '192.168.1.0/24', desc: 'Corporate Headquarters VPN Subnet', mfa: 'Bypassed (Trusted)', status: 'ACTIVE' },
  { id: 'ipr_datacenter', cidr: '10.0.0.0/16', desc: 'AWS VPC Production Interconnect', mfa: 'Bypassed (Trusted)', status: 'ACTIVE' },
  { id: 'ipr_office_london', cidr: '172.16.4.0/24', desc: 'London Office Static Gateway', mfa: 'Bypassed (Trusted)', status: 'ACTIVE' },
];

export default function IpAllowlistPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 shadow-sm">
            <Shield className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Zero-Trust CIDR IP Allowlist</h1>
            <p className="text-sm text-slate-500 mt-1">Restrict organization access to trusted corporate subnets with automated step-up MFA challenge policies.</p>
          </div>
        </div>

        <button className="px-4 py-2.5 bg-[#4f46e5] hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md shadow-indigo-500/20 flex items-center gap-2 transition-colors">
          <Plus className="w-4 h-4" /> Add CIDR Subnet Rule
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-50 border-b border-slate-100 text-[10px] font-bold uppercase text-slate-500">
            <tr>
              <th className="p-4">Rule Identifier</th>
              <th className="p-4">CIDR Subnet Block</th>
              <th className="p-4">Description</th>
              <th className="p-4">MFA Policy</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {IP_RULES.map((r) => (
              <tr key={r.id} className="hover:bg-slate-50">
                <td className="p-4 font-mono font-bold text-indigo-600">{r.id}</td>
                <td className="p-4 font-mono font-bold text-slate-900">{r.cidr}</td>
                <td className="p-4 text-slate-600">{r.desc}</td>
                <td className="p-4 text-emerald-700 font-medium">{r.mfa}</td>
                <td className="p-4">
                  <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {r.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button className="text-slate-400 hover:text-red-600">
                    <Trash2 className="w-3.5 h-3.5" />
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
