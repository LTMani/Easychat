'use client';

import React, { useState } from 'react';
import { Shield, Plus, Trash2, CheckCircle2, XCircle, Globe } from 'lucide-react';

export default function SecurityIpAllowlistPage() {
  const [entries, setEntries] = useState([
    { id: '1', cidr: '192.168.1.0/24', label: 'Office Network - HQ', isEnabled: true },
    { id: '2', cidr: '10.0.0.0/8', label: 'VPN Tunnel Range', isEnabled: true },
    { id: '3', cidr: '203.0.113.42', label: 'Staging Server Static IP', isEnabled: false },
  ]);

  const [newCidr, setNewCidr] = useState('');
  const [newLabel, setNewLabel] = useState('');

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
            <Shield className="w-7 h-7 text-blue-600" />
            IP Allowlist Security Configuration
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Restrict API and dashboard access to specific IP addresses or CIDR ranges.
          </p>
        </div>
      </div>

      {/* Add New Entry Form */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
        <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
          <Globe className="w-4 h-4 text-blue-600" />
          Add IP or CIDR Range
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">IP / CIDR Range</label>
            <input value={newCidr} onChange={(e) => setNewCidr(e.target.value)} placeholder="e.g. 192.168.0.0/24 or 203.0.113.5" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:ring-2 focus:ring-blue-500 font-mono" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Label / Description</label>
            <input value={newLabel} onChange={(e) => setNewLabel(e.target.value)} placeholder="e.g. Office Network" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl flex items-center gap-2">
          <Plus className="w-3.5 h-3.5" />
          Add to Allowlist
        </button>
      </div>

      {/* Allowlist Entries */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold text-[10px]">
            <tr>
              <th className="p-4">CIDR / IP Address</th>
              <th className="p-4">Description</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {entries.map((entry) => (
              <tr key={entry.id} className="hover:bg-slate-50">
                <td className="p-4 font-mono font-bold text-slate-900">{entry.cidr}</td>
                <td className="p-4 text-slate-600">{entry.label}</td>
                <td className="p-4">
                  {entry.isEnabled ? (
                    <span className="flex items-center gap-1.5 text-emerald-700 font-bold text-[10px]"><CheckCircle2 className="w-3.5 h-3.5" /> Active</span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-slate-400 font-bold text-[10px]"><XCircle className="w-3.5 h-3.5" /> Disabled</span>
                  )}
                </td>
                <td className="p-4 text-right">
                  <button className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg">
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
