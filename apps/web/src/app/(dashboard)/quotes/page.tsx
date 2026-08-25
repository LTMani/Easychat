'use client';

import React, { useState } from 'react';
import { FileText, Plus, CheckCircle2, DollarSign, Send, Download } from 'lucide-react';

export default function QuotesPage() {
  const [quotes, setQuotes] = useState([
    {
      id: '1',
      quoteNumber: 'QT-9082',
      dealTitle: 'Acme Enterprise License',
      totalAmount: 14500.0,
      validUntil: '2026-09-30',
      status: 'SENT',
    },
    {
      id: '2',
      quoteNumber: 'QT-9083',
      dealTitle: 'Starlight Tech Custom Integration',
      totalAmount: 8200.0,
      validUntil: '2026-10-15',
      status: 'DRAFT',
    },
  ]);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
            <FileText className="w-7 h-7 text-blue-600" />
            Configure, Price, Quote (CPQ Engine)
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Build formal PDF quotes, apply tiered volume discounts, and manage quote approvals.
          </p>
        </div>

        <button className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-2 transition-colors">
          <Plus className="w-4 h-4" />
          Create New Quote
        </button>
      </div>

      {/* Quotes List Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold text-[10px]">
            <tr>
              <th className="p-4">Quote Number</th>
              <th className="p-4">Associated Deal</th>
              <th className="p-4">Total Amount</th>
              <th className="p-4">Valid Until</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {quotes.map((q) => (
              <tr key={q.id} className="hover:bg-slate-50">
                <td className="p-4 font-bold text-blue-600">{q.quoteNumber}</td>
                <td className="p-4 font-bold text-slate-900">{q.dealTitle}</td>
                <td className="p-4 font-bold text-emerald-600">${q.totalAmount.toLocaleString()}</td>
                <td className="p-4 text-slate-500">{q.validUntil}</td>
                <td className="p-4">
                  <span
                    className={`px-2.5 py-1 font-bold text-[10px] rounded-full uppercase ${
                      q.status === 'SENT'
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {q.status}
                  </span>
                </td>
                <td className="p-4 text-right space-x-2">
                  <button className="px-3 py-1 bg-slate-900 text-white font-bold text-[10px] rounded-lg inline-flex items-center gap-1 hover:bg-slate-800">
                    <Download className="w-3 h-3" /> PDF
                  </button>
                  <button className="px-3 py-1 bg-blue-600 text-white font-bold text-[10px] rounded-lg inline-flex items-center gap-1 hover:bg-blue-500">
                    <Send className="w-3 h-3" /> Send
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
