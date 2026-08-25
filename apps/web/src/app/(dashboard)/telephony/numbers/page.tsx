'use client';

import React from 'react';
import { Phone, Globe, ShieldCheck, CheckCircle2, Plus, ArrowRight } from 'lucide-react';

const PHONE_NUMBERS = [
  { id: '1', number: '+1 (415) 555-0192', country: 'United States', type: 'Local (San Francisco)', route: 'IVR Flow: Enterprise Inbound Main', status: 'ACTIVE' },
  { id: '2', number: '+1 (800) 555-0100', country: 'United States', type: 'Toll-Free (US / CA)', route: 'Queue: VIP Support Urgent', status: 'ACTIVE' },
  { id: '3', number: '+44 20 7946 0912', country: 'United Kingdom', type: 'Local (London)', route: 'IVR Flow: Europe Sales & Support', status: 'ACTIVE' },
  { id: '4', number: '+49 30 1234 5678', country: 'Germany', type: 'Local (Berlin)', route: 'Queue: DACH Support Tier 2', status: 'ACTIVE' },
];

export default function PhoneNumbersInventoryPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shadow-sm">
            <Phone className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Virtual Phone Numbers Inventory</h1>
            <p className="text-sm text-slate-500 mt-1">Manage global DID and toll-free numbers, regulatory compliance, and IVR routing bindings.</p>
          </div>
        </div>

        <button className="px-4 py-2.5 bg-[#4f46e5] hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md shadow-indigo-500/20 flex items-center gap-2 transition-colors">
          <Plus className="w-4 h-4" /> Provision New Number
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden divide-y divide-slate-100">
        {PHONE_NUMBERS.map((num) => (
          <div key={num.id} className="p-5 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <span className="font-mono font-black text-slate-900 text-sm">{num.number}</span>
                <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {num.status}
                </span>
              </div>
              <p className="text-xs text-slate-500">{num.country} • {num.type}</p>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <div className="text-right">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Assigned Routing</span>
                <p className="font-semibold text-indigo-600">{num.route}</p>
              </div>

              <button className="px-3 py-1.5 border border-slate-200 hover:bg-slate-50 rounded-lg text-xs font-bold text-slate-700">
                Configure
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
