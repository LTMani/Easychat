'use client';

import React from 'react';
import { Landmark, Globe, CheckCircle2, ShieldCheck, DollarSign } from 'lucide-react';

const JURISDICTIONS = [
  { code: 'US_CA', name: 'California, United States', rate: '7.25%', threshold: '$500,000 / 200 txns', status: 'NEXUS_ESTABLISHED' },
  { code: 'US_NY', name: 'New York, United States', rate: '8.875%', threshold: '$500,000 / 100 txns', status: 'NEXUS_ESTABLISHED' },
  { code: 'US_TX', name: 'Texas, United States', rate: '8.25%', threshold: '$500,000', status: 'NEXUS_ESTABLISHED' },
  { code: 'EU_DE', name: 'Germany (EU OSS)', rate: '19.00%', threshold: '€10,000 (Reverse Charge)', status: 'REGISTERED_OSS' },
  { code: 'GB_UK', name: 'United Kingdom (HMRC)', rate: '20.00%', threshold: '£85,000 (Reverse Charge)', status: 'REGISTERED_HMRC' },
];

export default function VatNexusPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 shadow-sm">
            <Landmark className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Sales Tax & EU VAT Economic Nexus Monitor</h1>
            <p className="text-sm text-slate-500 mt-1">Automated multi-jurisdiction tax calculation, EU VAT Reverse Charge verification, and South Dakota v. Wayfair threshold tracking.</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2 text-xs font-bold text-emerald-900 shadow-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" /> EU VAT Reverse Charge Active
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-50 border-b border-slate-100 text-[10px] font-bold uppercase text-slate-500">
            <tr>
              <th className="p-4">Jurisdiction Code</th>
              <th className="p-4">State / Country</th>
              <th className="p-4">Standard Tax Rate</th>
              <th className="p-4">Economic Nexus Threshold</th>
              <th className="p-4 text-right">Registration Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {JURISDICTIONS.map((j) => (
              <tr key={j.code} className="hover:bg-slate-50">
                <td className="p-4 font-mono font-bold text-indigo-600">{j.code}</td>
                <td className="p-4 font-bold text-slate-900">{j.name}</td>
                <td className="p-4 font-mono font-bold text-slate-800">{j.rate}</td>
                <td className="p-4 text-slate-500 font-mono">{j.threshold}</td>
                <td className="p-4 text-right">
                  <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {j.status}
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
