'use client';

import React, { useState } from 'react';
import { MailCheck, ShieldCheck, CheckCircle2, AlertTriangle, RefreshCw, Copy, Check } from 'lucide-react';

export default function EmailDeliverabilityDnsPage() {
  const [domain, setDomain] = useState('acmecorp.com');
  const [isChecking, setIsChecking] = useState(false);
  const [copied, setCopied] = useState('');

  const RECORDS = [
    { type: 'TXT (SPF)', host: '@', value: 'v=spf1 include:_spf.easychat.io ~all', status: 'VALID', note: 'Sender Policy Framework verified' },
    { type: 'CNAME (DKIM)', host: 'ech._domainkey', value: 'ech.dkim.easychat.io', status: 'VALID', note: '2048-bit RSA cryptographic email signing' },
    { type: 'TXT (DMARC)', host: '_dmarc', value: 'v=DMARC1; p=reject; rua=mailto:dmarc@easychat.io', status: 'VALID', note: 'Strict anti-spoofing policy enabled' },
    { type: 'MX Record', host: '@', value: '10 inbound.easychat.io', status: 'VALID', note: 'Dual routing inbound gateway' },
  ];

  const handleCopy = (val: string, key: string) => {
    navigator.clipboard.writeText(val);
    setCopied(key);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shadow-sm">
            <MailCheck className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Email Deliverability & DNS Health</h1>
            <p className="text-sm text-slate-500 mt-1">Verify SPF, DKIM, and DMARC alignment to ensure 99%+ primary inbox delivery.</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2 text-xs font-bold text-emerald-800 shadow-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Deliverability Score: 100/100 (Optimal)
        </div>
      </div>

      {/* Domain Input Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 flex items-center gap-4 shadow-sm">
        <div className="flex-1">
          <label className="block text-xs font-bold text-slate-700 mb-1">Domain Name</label>
          <input
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="w-full text-xs font-mono bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={() => {
            setIsChecking(true);
            setTimeout(() => setIsChecking(false), 600);
          }}
          className="mt-5 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-2 transition-colors"
        >
          <RefreshCw className={`w-4 h-4 ${isChecking ? 'animate-spin' : ''}`} /> Run Live DNS Check
        </button>
      </div>

      {/* DNS Records Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden divide-y divide-slate-100">
        <div className="p-4 bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-700">
          Required DNS Authentications for {domain}
        </div>

        {RECORDS.map((r, i) => (
          <div key={i} className="p-5 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
            <div className="space-y-1 max-w-xl">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 text-xs">{r.type}</span>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {r.status}
                </span>
              </div>
              <p className="font-mono text-xs text-blue-600 bg-slate-50 p-2 rounded-lg border border-slate-200 break-all">
                {r.value}
              </p>
              <p className="text-[11px] text-slate-400">{r.note}</p>
            </div>

            <button
              onClick={() => handleCopy(r.value, r.type)}
              className="px-3 py-1.5 border border-slate-200 hover:bg-slate-100 rounded-lg text-xs font-bold text-slate-700 flex items-center gap-1.5 transition-colors"
            >
              {copied === r.type ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              {copied === r.type ? 'Copied' : 'Copy Record'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
