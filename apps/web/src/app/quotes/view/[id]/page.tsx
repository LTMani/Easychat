'use client';

import React, { useState } from 'react';
import { FileText, CheckCircle2, ShieldCheck, Download, PenTool, Send } from 'lucide-react';

export default function PublicQuoteViewPage({ params }: { params: { id: string } }) {
  const [signed, setSigned] = useState(false);
  const [signerName, setSignerName] = useState('');

  const handleSign = (e: React.FormEvent) => {
    e.preventDefault();
    if (signerName.trim()) {
      setSigned(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <span className="px-3 py-1 bg-blue-50 text-blue-700 font-bold text-xs rounded-full uppercase">
              Official Proposal & Quote
            </span>
            <h1 className="text-2xl font-bold text-slate-900 mt-2">Quote #QT-2026-0091</h1>
            <p className="text-xs text-slate-500 mt-1">Prepared for Global Logistics Solutions</p>
          </div>

          <div className="flex items-center gap-3">
            <button className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl flex items-center gap-2">
              <Download className="w-4 h-4" />
              Download PDF
            </button>
          </div>
        </div>

        {/* Line Items Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-6 space-y-6">
          <h2 className="font-bold text-slate-900 text-sm uppercase tracking-wide">Quote Summary</h2>

          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold text-[10px]">
              <tr>
                <th className="p-3">Product / Item</th>
                <th className="p-3">Qty</th>
                <th className="p-3">Unit Price</th>
                <th className="p-3 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="p-3 font-bold text-slate-900">EasyChat Enterprise Annual License (40 Seats)</td>
                <td className="p-3">40</td>
                <td className="p-3">$1,200.00</td>
                <td className="p-3 text-right font-mono font-bold">$45,600.00</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-900">Dedicated SIP Voice Trunk Add-on</td>
                <td className="p-3">1</td>
                <td className="p-3">$2,400.00</td>
                <td className="p-3 text-right font-mono font-bold">$2,400.00</td>
              </tr>
            </tbody>
          </table>

          <div className="border-t border-slate-100 pt-4 flex flex-col items-end text-xs space-y-1">
            <div className="flex justify-between w-64 text-slate-500">
              <span>Subtotal:</span>
              <span className="font-mono">$48,000.00</span>
            </div>
            <div className="flex justify-between w-64 text-slate-500">
              <span>Tax (10%):</span>
              <span className="font-mono">$4,800.00</span>
            </div>
            <div className="flex justify-between w-64 font-bold text-slate-900 text-sm pt-2 border-t border-slate-200">
              <span>Total Amount:</span>
              <span className="font-mono text-blue-600">$52,800.00</span>
            </div>
          </div>
        </div>

        {/* E-Signature Section */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <PenTool className="w-6 h-6 text-blue-600" />
            <div>
              <h3 className="font-bold text-slate-900 text-base">Digital Acceptance & E-Signature</h3>
              <p className="text-xs text-slate-500">By signing below, you accept the terms and authorize billing.</p>
            </div>
          </div>

          {signed ? (
            <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-600" />
              <div>
                <p className="font-bold text-sm">Quote Accepted & Signed!</p>
                <p className="text-xs">Signed by {signerName} on {new Date().toLocaleDateString()}. Confirmation sent to your email.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSign} className="space-y-4 max-w-md">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Full Legal Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. David Miller"
                  value={signerName}
                  onChange={(e) => setSignerName(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-sm flex items-center justify-center gap-2 transition-colors"
              >
                <ShieldCheck className="w-4 h-4" />
                Sign & Accept Proposal
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
