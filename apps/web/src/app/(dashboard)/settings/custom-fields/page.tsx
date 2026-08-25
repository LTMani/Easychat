'use client';

import React, { useState } from 'react';
import { FormInput, Plus, Edit2, Trash2, CheckCircle2, Sliders, Hash, Calendar, ToggleLeft, ListFilter } from 'lucide-react';

const TARGET_ENTITIES = ['CONTACT', 'DEAL', 'TICKET', 'LEAD', 'COMPANY'];

const CUSTOM_FIELDS = [
  { id: 'cf_1', name: 'Tax Identification Number', key: 'tax_id', target: 'CONTACT', type: 'TEXT', isRequired: false, description: 'VAT or TIN number for corporate contacts' },
  { id: 'cf_2', name: 'Contract Discount Rate (%)', key: 'discount_percent', target: 'DEAL', type: 'NUMBER', isRequired: true, description: 'Negotiated discount on deal amount' },
  { id: 'cf_3', name: 'Software Tier Needed', key: 'software_tier', target: 'LEAD', type: 'SELECT', options: ['Starter', 'Professional', 'Enterprise', 'Custom'], isRequired: true, description: 'Product package requested by lead' },
  { id: 'cf_4', name: 'Customer Environment', key: 'environment', target: 'TICKET', type: 'SELECT', options: ['Production', 'Staging', 'Development'], isRequired: true, description: 'Deployment context of support inquiry' },
  { id: 'cf_5', name: 'Renewal Anniversary Date', key: 'renewal_anniversary', target: 'DEAL', type: 'DATE', isRequired: false, description: 'Next annual contract review' },
  { id: 'cf_6', name: 'Is Security Audit Required', key: 'security_audit_req', target: 'DEAL', type: 'BOOLEAN', isRequired: false, description: 'Flag for enterprise SOC2 requirement' },
];

export default function CustomFieldsSettingsPage() {
  const [selectedTarget, setSelectedTarget] = useState('ALL');
  const [fields, setFields] = useState(CUSTOM_FIELDS);

  const filtered = selectedTarget === 'ALL' ? fields : fields.filter((f) => f.target === selectedTarget);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 shadow-sm">
            <FormInput className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Custom Field Schema Builder</h1>
            <p className="text-sm text-slate-500 mt-1">Extend CRM records with custom attributes, validation rules, and dropdown options.</p>
          </div>
        </div>

        <button className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-2 transition-colors">
          <Plus className="w-4 h-4" /> Create Custom Field
        </button>
      </div>

      {/* Target Entity Tabs */}
      <div className="flex items-center gap-2">
        {['ALL', ...TARGET_ENTITIES].map((target) => (
          <button
            key={target}
            onClick={() => setSelectedTarget(target)}
            className={`px-3 py-1.5 text-xs font-bold rounded-full border transition-colors ${
              selectedTarget === target
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {target === 'ALL' ? 'All Entities' : target}
          </button>
        ))}
      </div>

      {/* Fields Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-50 border-b border-slate-100 text-[10px] font-bold uppercase text-slate-500">
            <tr>
              <th className="p-4">Field Name</th>
              <th className="p-4">API Key</th>
              <th className="p-4">Entity</th>
              <th className="p-4">Data Type</th>
              <th className="p-4">Required</th>
              <th className="p-4">Options / Schema</th>
              <th className="p-4">Description</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {filtered.map((field) => (
              <tr key={field.id} className="hover:bg-slate-50">
                <td className="p-4 font-bold text-slate-900">{field.name}</td>
                <td className="p-4 font-mono text-indigo-600">{field.key}</td>
                <td className="p-4">
                  <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full font-bold text-[10px]">
                    {field.target}
                  </span>
                </td>
                <td className="p-4 font-bold text-slate-600">{field.type}</td>
                <td className="p-4">
                  {field.isRequired ? (
                    <span className="bg-red-50 text-red-700 border border-red-200 px-2 py-0.5 rounded-full text-[10px] font-bold">
                      Required
                    </span>
                  ) : (
                    <span className="text-slate-400">Optional</span>
                  )}
                </td>
                <td className="p-4">
                  {field.options ? (
                    <div className="flex gap-1 flex-wrap">
                      {field.options.map((opt, i) => (
                        <span key={i} className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded text-[10px]">
                          {opt}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-slate-400">—</span>
                  )}
                </td>
                <td className="p-4 text-slate-500 max-w-xs truncate">{field.description}</td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <button className="text-slate-400 hover:text-indigo-600">
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button className="text-slate-400 hover:text-red-600">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
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
