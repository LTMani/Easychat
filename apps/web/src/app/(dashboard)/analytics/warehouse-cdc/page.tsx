'use client';

import React from 'react';
import { Database, Cloud, RefreshCw, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';

const BATCHES = [
  { id: 'sbatch_01', warehouse: 'SNOWFLAKE_SNOWPIPE', table: 'RAW_CUSTOMER_JOURNEY_EVENTS', records: '14,250 rows', latency: '85ms', compression: 'Snappy Parquet (72% saved)', status: 'COMMITTED' },
  { id: 'sbatch_02', warehouse: 'GOOGLE_BIGQUERY_STORAGE_WRITE', table: 'ANALYTICS_CONVERSATION_TURNS', records: '8,920 rows', latency: '64ms', compression: 'Proto Parquet (68% saved)', status: 'COMMITTED' },
  { id: 'sbatch_03', warehouse: 'DATABRICKS_DELTA_LAKE', table: 'GOLD_EXECUTIVE_P_AND_L', records: '1,420 rows', latency: '42ms', compression: 'Delta Parquet (81% saved)', status: 'COMMITTED' },
];

export default function WarehouseCdcPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 shadow-sm">
            <Database className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Lakehouse Snowpipe & BigQuery CDC Streamer</h1>
            <p className="text-sm text-slate-500 mt-1">Real-time micro-batch change data capture (CDC) streaming into Snowflake, BigQuery, and Databricks Delta Lake.</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2 text-xs font-bold text-emerald-900 shadow-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" /> CDC Pipeline: Streaming Active (Sub-100ms)
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-50 border-b border-slate-100 text-[10px] font-bold uppercase text-slate-500">
            <tr>
              <th className="p-4">Batch ID</th>
              <th className="p-4">Lakehouse Destination</th>
              <th className="p-4">Target Table</th>
              <th className="p-4">Records Streamed</th>
              <th className="p-4">Compression</th>
              <th className="p-4 text-right">Commit Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {BATCHES.map((b) => (
              <tr key={b.id} className="hover:bg-slate-50">
                <td className="p-4 font-mono font-bold text-indigo-600">{b.id}</td>
                <td className="p-4 font-bold text-slate-900">{b.warehouse}</td>
                <td className="p-4 font-mono text-slate-600">{b.table}</td>
                <td className="p-4 font-mono font-bold text-slate-800">{b.records}</td>
                <td className="p-4 text-slate-500">{b.compression}</td>
                <td className="p-4 text-right">
                  <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {b.status}
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
