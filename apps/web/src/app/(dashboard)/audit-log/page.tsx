'use client';

import React, { useState } from 'react';
import { Activity, AlertTriangle, CheckCircle2, Clock, Search, Filter } from 'lucide-react';

export default function AuditLogPage() {
  const [logs] = useState([
    { id: 'al1', action: 'CONTACT_UPDATED', entityType: 'CONTACT', entityId: 'cont_8821', user: 'Alex Mercer', ipAddress: '192.168.1.101', createdAt: '2026-08-25 14:01:32', severity: 'INFO' },
    { id: 'al2', action: 'API_KEY_CREATED', entityType: 'API_KEY', entityId: 'key_2', user: 'Admin User', ipAddress: '192.168.1.100', createdAt: '2026-08-25 13:45:11', severity: 'WARNING' },
    { id: 'al3', action: 'GDPR_ERASURE', entityType: 'CONTACT', entityId: 'cont_7712', user: 'System', ipAddress: '127.0.0.1', createdAt: '2026-08-25 12:30:05', severity: 'CRITICAL' },
    { id: 'al4', action: 'LOGIN_SUCCESS', entityType: 'USER', entityId: 'usr_1001', user: 'Priya Sharma', ipAddress: '10.0.0.22', createdAt: '2026-08-25 11:00:00', severity: 'INFO' },
    { id: 'al5', action: 'DEAL_STATUS_CHANGED', entityType: 'DEAL', entityId: 'deal_5541', user: 'Jordan Blake', ipAddress: '192.168.1.102', createdAt: '2026-08-25 10:15:48', severity: 'INFO' },
  ]);

  const severityConfig: Record<string, { label: string; className: string }> = {
    INFO: { label: 'INFO', className: 'bg-blue-50 text-blue-700 border-blue-200' },
    WARNING: { label: 'WARN', className: 'bg-amber-50 text-amber-700 border-amber-200' },
    CRITICAL: { label: 'CRITICAL', className: 'bg-red-50 text-red-700 border-red-200' },
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
            <Activity className="w-7 h-7 text-blue-600" />
            Immutable Security Audit Log Stream
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Tamper-proof chronological record of all user and system actions across the organization.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-3 py-2 border border-slate-200 text-slate-600 font-bold text-xs rounded-xl flex items-center gap-2 hover:bg-slate-50">
            <Filter className="w-3.5 h-3.5" />
            Filter
          </button>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input placeholder="Search audit events..." className="pl-9 pr-4 py-2 text-xs border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 w-52" />
          </div>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold text-[10px]">
            <tr>
              <th className="p-4">Timestamp</th>
              <th className="p-4">Action Event</th>
              <th className="p-4">Entity</th>
              <th className="p-4">Performed By</th>
              <th className="p-4">IP Address</th>
              <th className="p-4">Severity</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {logs.map((log) => {
              const sev = severityConfig[log.severity] || severityConfig.INFO;
              return (
                <tr key={log.id} className="hover:bg-slate-50">
                  <td className="p-4 font-mono text-slate-500">{log.createdAt}</td>
                  <td className="p-4 font-bold text-slate-900 font-mono">{log.action}</td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 bg-slate-100 rounded text-[10px] font-bold uppercase text-slate-600">{log.entityType}</span>
                    <span className="ml-1 text-slate-400 font-mono">{log.entityId}</span>
                  </td>
                  <td className="p-4 font-semibold">{log.user}</td>
                  <td className="p-4 font-mono text-slate-500">{log.ipAddress}</td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 border rounded-full text-[10px] font-bold ${sev.className}`}>
                      {sev.label}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
