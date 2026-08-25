'use client';

import React, { useState } from 'react';
import { Shield, Download, Search, Filter, Hash, User, Calendar, CheckCircle2 } from 'lucide-react';

const AUDIT_LOGS = [
  { id: 'aud_101', timestamp: '2026-08-25 14:32:10', user: 'Sarah Jenkins (Admin)', action: 'API_KEY_CREATED', entityType: 'ApiKey', entityId: 'key_prod_9910', ip: '192.168.1.100', integrity: 'VERIFIED' },
  { id: 'aud_102', timestamp: '2026-08-25 14:15:02', user: 'Alex Mercer (Agent)', action: 'DEAL_STAGE_CHANGED', entityType: 'Deal', entityId: 'deal_acme_001', ip: '10.0.4.22', integrity: 'VERIFIED' },
  { id: 'aud_103', timestamp: '2026-08-25 13:45:50', user: 'System Worker', action: 'SLA_BREACH_DETECTED', entityType: 'Ticket', entityId: 'tkt_84920', ip: '127.0.0.1', integrity: 'VERIFIED' },
  { id: 'aud_104', timestamp: '2026-08-25 12:20:18', user: 'Priya Sharma (Admin)', action: 'IP_ALLOWLIST_MODIFIED', entityType: 'SecurityPolicy', entityId: 'ip_rule_12', ip: '192.168.1.50', integrity: 'VERIFIED' },
  { id: 'aud_105', timestamp: '2026-08-25 11:10:00', user: 'Sam Chen (Agent)', action: 'CONTACT_EXPORTED', entityType: 'Contact', entityId: 'bulk_export_44', ip: '172.16.0.4', integrity: 'VERIFIED' },
];

export default function AuditTrailPage() {
  const [search, setSearch] = useState('');
  const [filterAction, setFilterAction] = useState('ALL');

  const filtered = AUDIT_LOGS.filter((l) => {
    if (filterAction !== 'ALL' && !l.action.includes(filterAction)) return false;
    if (search && !l.user.toLowerCase().includes(search.toLowerCase()) && !l.action.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shadow-sm">
            <Shield className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Security Audit Trail</h1>
              <span className="bg-emerald-100 text-emerald-800 border border-emerald-200 text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Cryptographic Integrity Verified
              </span>
            </div>
            <p className="text-sm text-slate-500 mt-1">Immutable SHA-256 hash-chained ledger of all administrative and data operations.</p>
          </div>
        </div>

        <button className="px-4 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl shadow-sm flex items-center gap-2 transition-colors">
          <Download className="w-3.5 h-3.5" /> Export Signed CSV
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by user, action, or entity ID..."
            className="w-full pl-9 pr-4 py-2.5 text-xs border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-1.5">
          {['ALL', 'SECURITY', 'DEAL', 'API_KEY', 'CONTACT'].map((action) => (
            <button
              key={action}
              onClick={() => setFilterAction(action)}
              className={`px-3 py-1.5 text-[10px] font-bold rounded-full border transition-colors ${
                filterAction === action
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {action}
            </button>
          ))}
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-50 border-b border-slate-100 text-[10px] font-bold uppercase text-slate-500">
            <tr>
              <th className="p-4">Timestamp (UTC)</th>
              <th className="p-4">Actor</th>
              <th className="p-4">Action</th>
              <th className="p-4">Entity Type</th>
              <th className="p-4">Entity ID</th>
              <th className="p-4">Client IP</th>
              <th className="p-4">Integrity Hash</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {filtered.map((log) => (
              <tr key={log.id} className="hover:bg-slate-50">
                <td className="p-4 font-mono text-slate-500">{log.timestamp}</td>
                <td className="p-4 font-bold text-slate-900">{log.user}</td>
                <td className="p-4">
                  <span className="bg-slate-100 text-slate-800 font-mono font-bold text-[10px] px-2 py-0.5 rounded-md">
                    {log.action}
                  </span>
                </td>
                <td className="p-4 text-slate-600">{log.entityType}</td>
                <td className="p-4 font-mono text-blue-600 font-bold">{log.entityId}</td>
                <td className="p-4 font-mono text-slate-400">{log.ip}</td>
                <td className="p-4">
                  <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1 w-fit">
                    <CheckCircle2 className="w-3 h-3" /> Verified
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
