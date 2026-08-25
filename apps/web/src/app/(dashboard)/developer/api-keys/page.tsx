'use client';

import React, { useState } from 'react';
import { Key, Plus, Copy, Trash2, ShieldCheck, Terminal } from 'lucide-react';

export default function DeveloperApiKeysPage() {
  const [apiKeys] = useState([
    { id: 'key_1', prefix: 'ech_prod_abc1', name: 'Production Server Key', permissions: '["READ","WRITE"]', createdAt: '2026-08-01' },
    { id: 'key_2', prefix: 'ech_test_def2', name: 'Staging Integration Key', permissions: '["READ"]', createdAt: '2026-08-15' },
  ]);

  const [showRaw, setShowRaw] = useState(false);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
            <Key className="w-7 h-7 text-blue-600" />
            Developer API Keys & Access Control
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Generate SHA256-hashed API keys for server-to-server integrations and webhook signing.
          </p>
        </div>
        <button className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-2 transition-colors">
          <Plus className="w-4 h-4" />
          Generate New API Key
        </button>
      </div>

      {/* Security Notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
        <div>
          <p className="text-xs font-bold text-amber-900">API Key Security Notice</p>
          <p className="text-xs text-amber-700 mt-1">
            API keys are displayed only once after generation. Store them securely. All keys are stored as SHA256 hashes — we cannot recover your raw key.
          </p>
        </div>
      </div>

      {/* API Keys Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold text-[10px]">
            <tr>
              <th className="p-4">Key Name</th>
              <th className="p-4">Key Prefix</th>
              <th className="p-4">Permissions</th>
              <th className="p-4">Created</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {apiKeys.map((k) => (
              <tr key={k.id} className="hover:bg-slate-50">
                <td className="p-4 font-bold text-slate-900 flex items-center gap-2">
                  <Key className="w-3.5 h-3.5 text-blue-400" />
                  {k.name}
                </td>
                <td className="p-4 font-mono text-slate-600 font-bold">{k.prefix}••••••••••••</td>
                <td className="p-4">
                  {JSON.parse(k.permissions).map((p: string) => (
                    <span key={p} className="mr-1 px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded font-bold text-[10px] uppercase">{p}</span>
                  ))}
                </td>
                <td className="p-4 text-slate-500">{k.createdAt}</td>
                <td className="p-4 text-right">
                  <div className="flex items-center gap-2 justify-end">
                    <button className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg">
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Code Example */}
      <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-3">
        <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase">
          <Terminal className="w-4 h-4" />
          API Authorization Example
        </div>
        <pre className="text-emerald-400 text-xs font-mono overflow-x-auto">{`curl -X GET https://api.easychat.io/v1/contacts \\
  -H "Authorization: Bearer ech_prod_abc1..." \\
  -H "Content-Type: application/json"`}
        </pre>
      </div>
    </div>
  );
}
