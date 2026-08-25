'use client';

import React from 'react';
import { Lock, Globe, RefreshCw, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';

const CERTS = [
  { domain: 'api.easychat.io', issuer: "Let's Encrypt Authority X3", validTo: 'Oct 01, 2026', daysLeft: 37, autoRenew: true, ocsp: true, status: 'HEALTHY' },
  { domain: 'app.easychat.io', issuer: 'DigiCert Global Root G2', validTo: 'Jan 01, 2027', daysLeft: 129, autoRenew: true, ocsp: true, status: 'HEALTHY' },
  { domain: 'customer-portal.acme-corp.com', issuer: 'Cloudflare Inc ECC CA-3', validTo: 'Sep 15, 2026', daysLeft: 21, autoRenew: true, ocsp: true, status: 'EXPIRING_SOON' },
];

export default function TlsCertificatesPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shadow-sm">
            <Lock className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">TLS Edge Certificate Management</h1>
            <p className="text-sm text-slate-500 mt-1">Multi-tenant custom domain SSL/TLS certificate automated renewal and OCSP stapling.</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-xl px-4 py-2 text-xs font-bold text-blue-900 shadow-xs">
          <RefreshCw className="w-4 h-4 text-blue-600" /> Auto-Renewal Daemon Active
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {CERTS.map((c, idx) => (
          <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${c.status === 'HEALTHY' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}>
                {c.status}
              </span>
              <span className="font-mono text-xs font-bold text-slate-500">{c.daysLeft} days left</span>
            </div>

            <div className="space-y-1">
              <h3 className="font-bold text-slate-900 text-sm font-mono truncate">{c.domain}</h3>
              <p className="text-xs text-slate-400">Issuer: {c.issuer}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-1 text-xs text-slate-500">
              <div className="flex justify-between">
                <span>Auto-Renew:</span>
                <span className="font-bold text-emerald-600">Enabled</span>
              </div>
              <div className="flex justify-between">
                <span>OCSP Stapling:</span>
                <span className="font-bold text-indigo-600">Active</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
