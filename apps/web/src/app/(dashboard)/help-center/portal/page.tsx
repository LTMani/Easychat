'use client';

import React, { useState } from 'react';
import { Search, BookOpen, Shield, MessageSquare, PhoneCall, Code2, ArrowRight } from 'lucide-react';

const CATEGORIES = [
  { name: 'Omnichannel & Messaging', count: 18, icon: MessageSquare, description: 'WhatsApp Cloud API, Live Chat widgets, email routing, and SMS.' },
  { name: 'Security, SSO & Compliance', count: 14, icon: Shield, description: 'SAML 2.0, Okta, SOC2 Type II evidence, GDPR erasure, and Merkle audit.' },
  { name: 'Telephony & Voice IVR', count: 9, icon: PhoneCall, description: 'Twilio numbers, call recording archival, visual IVR flow builder.' },
  { name: 'Developer APIs & Webhooks', count: 25, icon: Code2, description: 'REST APIs, HMAC signatures, Zapier triggers, and TypeScript SDK.' },
];

export default function HelpCenterPortalPage() {
  const [search, setSearch] = useState('');

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-10">
      {/* Hero Search */}
      <div className="text-center max-w-2xl mx-auto space-y-4 pt-6">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">How can we help your team today?</h1>
        <p className="text-sm text-slate-500">Search 60+ technical guides, API documentation, and architecture runbooks.</p>

        <div className="relative max-w-lg mx-auto pt-2">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-5" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search guides (e.g. WhatsApp webhooks, SAML Okta, SLA rules)..."
            className="w-full pl-11 pr-4 py-3.5 text-xs bg-white border border-slate-200 rounded-2xl shadow-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-2 gap-6">
        {CATEGORIES.map((cat, i) => (
          <div key={i} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:border-blue-300 transition-all space-y-3 cursor-pointer">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-xl bg-blue-50 text-blue-600">
                <cat.icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                {cat.count} Articles
              </span>
            </div>

            <div>
              <h3 className="font-bold text-slate-900 text-sm">{cat.name}</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">{cat.description}</p>
            </div>

            <div className="pt-2 flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700">
              Browse Category <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
