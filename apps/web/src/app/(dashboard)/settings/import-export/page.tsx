'use client';

import React, { useState } from 'react';
import { Upload, Download, FileSpreadsheet, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';

export default function ImportExportPage() {
  const [csvContent, setCsvContent] = useState('firstName,lastName,email,phone,company\nSarah,Jenkins,sarah@acme.com,+14155550192,Acme Corp\nAlex,Mercer,alex@acme.com,+14155550193,Acme Corp');
  const [previewed, setPreviewed] = useState(true);

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shadow-sm">
            <FileSpreadsheet className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Data Import & Export Center</h1>
            <p className="text-sm text-slate-500 mt-1">High-volume CSV streaming customer import and GDPR compliant database backups.</p>
          </div>
        </div>

        <button className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-2 transition-colors">
          <Upload className="w-4 h-4" /> Run Bulk Import
        </button>
      </div>

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2 bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm">
          <h3 className="font-bold text-slate-900 text-sm">Paste CSV Text or Upload File</h3>
          <textarea
            rows={5}
            value={csvContent}
            onChange={(e) => setCsvContent(e.target.value)}
            className="w-full font-mono text-xs bg-slate-50 border border-slate-200 rounded-xl p-3.5 outline-none focus:ring-2 focus:ring-blue-500"
          />

          {previewed && (
            <div className="space-y-2 pt-2">
              <h4 className="font-bold text-xs text-slate-800">Parsed Schema Preview (2 Records Detected)</h4>
              <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold uppercase text-slate-500">
                    <tr>
                      <th className="p-3">First Name</th>
                      <th className="p-3">Last Name</th>
                      <th className="p-3">Email</th>
                      <th className="p-3">Company</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    <tr>
                      <td className="p-3">Sarah</td>
                      <td className="p-3">Jenkins</td>
                      <td className="p-3 font-mono text-blue-600">sarah@acme.com</td>
                      <td className="p-3">Acme Corp</td>
                    </tr>
                    <tr>
                      <td className="p-3">Alex</td>
                      <td className="p-3">Mercer</td>
                      <td className="p-3 font-mono text-blue-600">alex@acme.com</td>
                      <td className="p-3">Acme Corp</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm">
          <h3 className="font-bold text-slate-900 text-sm">Full Database Export</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Generate an encrypted machine-readable ZIP archive of all contacts, deals, tickets, and custom field values.
          </p>

          <div className="pt-2 space-y-2">
            <button className="w-full py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl flex items-center justify-center gap-2">
              <Download className="w-4 h-4" /> Export Contacts (CSV)
            </button>
            <button className="w-full py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl flex items-center justify-center gap-2">
              <Download className="w-4 h-4" /> Export Deals (CSV)
            </button>
            <button className="w-full py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl flex items-center justify-center gap-2">
              <Download className="w-4 h-4" /> Export Support Tickets (CSV)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
