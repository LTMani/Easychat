'use client';

import React, { useState } from 'react';
import { Database, Upload, CheckCircle2, AlertCircle, FileSpreadsheet, RefreshCw } from 'lucide-react';

export default function EtlPage() {
  const [jobs, setJobs] = useState([
    { id: 'job_101', fileName: 'enterprise_contacts_q3.csv', entityType: 'CONTACT', totalRows: 2450, processedRows: 2450, failedRows: 0, status: 'COMPLETED', createdAt: '2026-08-24 14:20' },
    { id: 'job_102', fileName: 'leads_export_august.csv', entityType: 'LEAD', totalRows: 890, processedRows: 885, failedRows: 5, status: 'COMPLETED_WITH_ERRORS', createdAt: '2026-08-25 09:15' },
  ]);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
            <Database className="w-7 h-7 text-blue-600" />
            Bulk Data ETL & Import Engine
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Ingest large CSV / JSON customer datasets with field mapping, deduplication, and error reporting.
          </p>
        </div>

        <button className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-2 transition-colors">
          <Upload className="w-4 h-4" />
          New CSV Import Job
        </button>
      </div>

      {/* Import History Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold text-[10px]">
            <tr>
              <th className="p-4">Job ID</th>
              <th className="p-4">File Name</th>
              <th className="p-4">Entity Type</th>
              <th className="p-4">Processed / Total</th>
              <th className="p-4">Status</th>
              <th className="p-4">Import Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {jobs.map((job) => (
              <tr key={job.id} className="hover:bg-slate-50">
                <td className="p-4 font-mono font-bold text-blue-600">{job.id}</td>
                <td className="p-4 font-bold text-slate-900 flex items-center gap-2">
                  <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                  {job.fileName}
                </td>
                <td className="p-4">
                  <span className="px-2 py-0.5 bg-slate-100 font-bold text-[10px] rounded uppercase">
                    {job.entityType}
                  </span>
                </td>
                <td className="p-4 font-mono">
                  {job.processedRows} / {job.totalRows}
                </td>
                <td className="p-4">
                  <span
                    className={`px-2.5 py-1 font-bold text-[10px] rounded-full uppercase ${
                      job.status === 'COMPLETED'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}
                  >
                    {job.status}
                  </span>
                </td>
                <td className="p-4 text-slate-400">{job.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
