'use client';

import React from 'react';
import { Package, Check, HelpCircle, ArrowRight, ShieldCheck } from 'lucide-react';

const TIERS = [
  {
    name: 'Starter',
    price: '$49',
    period: '/month',
    description: 'Essential omnichannel support for fast-moving startups.',
    features: ['Up to 5 Agent Seats', 'Live Chat & Email Channels', 'Standard Business Hours SLA', '1,000 API Calls / Month', 'Community Support'],
    cta: 'Select Starter',
    popular: false,
  },
  {
    name: 'Professional',
    price: '$99',
    period: '/month',
    description: 'Advanced CRM, SLA timers, and custom reporting for growing teams.',
    features: ['Up to 20 Agent Seats', 'WhatsApp, SMS & Voice IVR', '60m Response SLA Guarantee', '50,000 API Calls / Month', 'Custom Fields & BI Reports', 'Dedicated Email Support'],
    cta: 'Upgrade to Pro',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: '$249',
    period: '/month',
    description: 'Mission-critical scale, custom SSO, and dedicated success manager.',
    features: ['Unlimited Agent Seats', 'All Omnichannel Connectors', 'Strict 15m Response SLA', 'Unlimited API Calls & Webhooks', 'SAML 2.0 & Okta SSO', 'Tamper-Evident Merkle Auditing', 'Dedicated 24/7 CSM'],
    cta: 'Contact Enterprise Sales',
    popular: false,
  },
];

export default function PricingMatrixPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">EasyChat Edition & Feature Matrix</h1>
        <p className="text-sm text-slate-500">Compare features and select the right tier for your organization's support & sales workload.</p>
      </div>

      <div className="grid grid-cols-3 gap-8 pt-4">
        {TIERS.map((tier, i) => (
          <div
            key={i}
            className={`rounded-3xl border p-8 space-y-6 flex flex-col justify-between ${
              tier.popular
                ? 'border-blue-600 bg-white shadow-xl ring-2 ring-blue-600/20 relative'
                : 'border-slate-200 bg-white/80 shadow-sm'
            }`}
          >
            {tier.popular && (
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-blue-600 text-white font-bold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                Most Popular
              </span>
            )}

            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-slate-900 text-lg">{tier.name}</h3>
                <p className="text-xs text-slate-500 mt-1">{tier.description}</p>
              </div>

              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-slate-900 font-mono">{tier.price}</span>
                <span className="text-xs text-slate-500 font-bold">{tier.period}</span>
              </div>

              <div className="border-t border-slate-100 pt-6 space-y-3 text-xs">
                {tier.features.map((f, fi) => (
                  <div key={fi} className="flex items-center gap-2.5 text-slate-700">
                    <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5" />
                    </div>
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              className={`w-full py-3 rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm ${
                tier.popular
                  ? 'bg-blue-600 hover:bg-blue-500 text-white'
                  : 'bg-slate-900 hover:bg-slate-800 text-white'
              }`}
            >
              {tier.cta} <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
