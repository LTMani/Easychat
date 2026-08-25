'use client';

import React, { useState } from 'react';
import { Sliders, Plus, Trash2, CheckCircle2, ShieldCheck, Tag } from 'lucide-react';

export default function CustomFieldsPage() {
  const [fields, setFields] = useState([
    { id: '1', entityType: 'CONTACT', fieldKey: 'vipStatus', label: 'VIP Status Level', dataType: 'SELECT', options: ['BRONZE', 'SILVER', 'GOLD', 'PLATINUM'], isRequired: true },
    { id: '2', entityType: 'DEAL', fieldKey: 'renewalDate', label: 'Contract Renewal Date', dataType: 'DATE', options: [], isRequired: false },
    { id: '3', entityType: 'TICKET', fieldKey: 'hardwareSerial', label: 'Hardware Serial Number', dataType: 'STRING', options: [], isRequired: false },
  ]);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
            <Sliders className="w-7 h-7 text-blue-600" />
            Dynamic Custom Fields Manager
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Extend Contacts, Deals, Leads, and Ticket entity schemas with dynamic custom attributes.
          </p>
        </div>

        <button className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-2 transition-colors">
          <Plus className="w-4 h-4" />
          Add Custom Field Definition
        </button>
      </div>

      {/* Custom Fields List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold text-[10px]">
            <tr>
              <th className="p-4">Entity Type</th>
              <th className="p-4">Field Key</th>
              <th className="p-4">Display Label</th>
              <th className="p-4">Data Type</th>
              <th className="p-4">Required</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {fields.map((f) => (
              <tr key={f.id} className="hover:bg-slate-50">
                <td className="p-4">
                  <span className="px-2.5 py-1 bg-blue-50 text-blue-700 font-bold text-[10px] rounded uppercase">
                    {f.entityType}
                  </span>
                </td>
                <td className="p-4 font-mono font-bold text-slate-900">{f.fieldKey}</td>
                <td className="p-4 font-bold text-slate-900">{f.label}</td>
                <td className="p-4">
                  <span className="px-2 py-0.5 bg-slate-100 text-slate-700 font-mono text-[10px] rounded">
                    {f.dataType}
                  </span>
                </td>
                <td className="p-4">{f.isRequired ? 'YES' : 'NO'}</td>
                <td className="p-4 text-right">
                  <button className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg">
                    <Trash2 className="w-4 h-4" />
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
