'use client';

import React, { useState } from 'react';
import { FileText, Send, CheckCircle2, DollarSign, Download, Building, ShieldCheck, PenTool } from 'lucide-react';

const SAMPLE_QUOTE = {
  id: 'q_9948',
  quoteNumber: 'Q-2026-0089',
  title: 'Enterprise Omnichannel CRM & Voice IVR Suite',
  customerName: 'Jonathan Vance',
  companyName: 'TechAlpha Corporation',
  currency: 'USD',
  status: 'DRAFT',
  items: [
    { id: '1', name: 'EasyChat Enterprise Annual License (50 Seats)', qty: 1, unitPrice: 35856, discount: '10%', total: 32270.4 },
    { id: '2', name: 'High-Volume WhatsApp Messaging Add-on (100k/mo)', qty: 12, unitPrice: 299, discount: '0%', total: 3588.0 },
    { id: '3', name: 'Dedicated CSM & Hands-On Implementation Services', qty: 1, unitPrice: 3500, discount: '100% (Waived)', total: 0.0 },
  ],
  subtotal: 35858.4,
  vatRate: '0% (US Export)',
  vatAmount: 0.0,
  grandTotal: 35858.4,
};

export default function QuoteDetailPage() {
  const [status, setStatus] = useState(SAMPLE_QUOTE.status);

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600 shadow-sm">
            <FileText className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Quote {SAMPLE_QUOTE.quoteNumber}</h1>
              <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2.5 py-0.5 rounded-full">
                {status}
              </span>
            </div>
            <p className="text-sm text-slate-500 mt-1">{SAMPLE_QUOTE.title}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="px-4 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5 transition-colors">
            <Download className="w-4 h-4" /> Download PDF
          </button>
          <button
            onClick={() => setStatus('SENT_FOR_SIGNATURE')}
            className="px-4 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-1.5 transition-colors"
          >
            <Send className="w-4 h-4" /> Send for E-Signature
          </button>
        </div>
      </div>

      {/* Bill To Info */}
      <div className="grid grid-cols-2 gap-6 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase">Customer Information</p>
          <h4 className="font-bold text-slate-900 text-sm mt-1">{SAMPLE_QUOTE.customerName}</h4>
          <p className="text-xs text-slate-500">{SAMPLE_QUOTE.companyName}</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-bold text-slate-400 uppercase">Provider Details</p>
          <h4 className="font-bold text-slate-900 text-sm mt-1">EasyChat Global Inc.</h4>
          <p className="text-xs text-slate-500">Enterprise Cloud Communications</p>
        </div>
      </div>

      {/* Line Items Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-50 border-b border-slate-100 text-[10px] font-bold uppercase text-slate-500">
            <tr>
              <th className="p-4">Description</th>
              <th className="p-4 text-center">Qty</th>
              <th className="p-4 text-right">Unit Price</th>
              <th className="p-4 text-right">Discount</th>
              <th className="p-4 text-right">Total ({SAMPLE_QUOTE.currency})</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {SAMPLE_QUOTE.items.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/50">
                <td className="p-4 font-bold text-slate-900">{item.name}</td>
                <td className="p-4 text-center font-mono">{item.qty}</td>
                <td className="p-4 text-right font-mono">${item.unitPrice.toLocaleString()}</td>
                <td className="p-4 text-right font-mono text-emerald-600">{item.discount}</td>
                <td className="p-4 text-right font-bold text-slate-900 font-mono">${item.total.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals Section */}
        <div className="p-6 bg-slate-50/60 border-t border-slate-200 flex justify-end">
          <div className="w-72 space-y-2 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal:</span>
              <span className="font-mono font-bold">${SAMPLE_QUOTE.subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Estimated Tax ({SAMPLE_QUOTE.vatRate}):</span>
              <span className="font-mono">${SAMPLE_QUOTE.vatAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-base font-black text-slate-900 border-t border-slate-200 pt-2">
              <span>Grand Total:</span>
              <span className="font-mono text-purple-600">${SAMPLE_QUOTE.grandTotal.toLocaleString()} {SAMPLE_QUOTE.currency}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
