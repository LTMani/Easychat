'use client';

import React, { useEffect, useState } from 'react';
import { CreditCard, CheckCircle2, Shield, ArrowUpRight, Zap, RefreshCw } from 'lucide-react';

export default function BillingPage() {
  const [subscription, setSubscription] = useState<any>(null);
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock loading subscription & plans
    setTimeout(() => {
      setPlans([
        {
          code: 'STARTER',
          name: 'Starter Plan',
          priceMonthly: 29,
          features: ['Up to 3 Team Members', '1,000 Contacts', 'Omnichannel Inbox', 'Standard Support'],
        },
        {
          code: 'PRO',
          name: 'Professional Plan',
          priceMonthly: 79,
          isPopular: true,
          features: ['Up to 10 Team Members', '10,000 Contacts', 'Automated Workflows', 'SLA Policy Engine', 'AI Copilot Assistant'],
        },
        {
          code: 'ENTERPRISE',
          name: 'Enterprise Plan',
          priceMonthly: 249,
          features: ['Unlimited Seats', 'Dedicated SIP Telephony', 'Custom Webhooks & API', '24/7 Priority SLA Guarantee'],
        },
      ]);

      setSubscription({
        plan: { name: 'Professional Plan', code: 'PRO' },
        status: 'ACTIVE',
        billingCycle: 'MONTHLY',
        currentPeriodEnd: '2026-09-25T00:00:00Z',
      });

      setLoading(false);
    }, 400);
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-center text-slate-500 font-medium">
        Loading Subscription & Billing Tier details...
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
            <CreditCard className="w-7 h-7 text-blue-600" />
            Billing & Subscriptions
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage your organization tier, seat quotas, invoices, and billing payment gateways.
          </p>
        </div>
      </div>

      {/* Active Subscription Summary */}
      {subscription && (
        <div className="bg-gradient-to-r from-slate-900 to-blue-950 text-white rounded-2xl p-6 shadow-lg border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-semibold border border-blue-400/30">
              <Zap className="w-3.5 h-3.5" />
              {subscription.status} SUBSCRIPTION
            </div>
            <h2 className="text-xl font-bold text-white tracking-wide">
              {subscription.plan.name}
            </h2>
            <p className="text-xs text-slate-300">
              Renews automatically on {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-xl shadow transition-colors flex items-center gap-2">
              <RefreshCw className="w-4 h-4" />
              Change Plan
            </button>
            <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs rounded-xl transition-colors">
              Manage Payment Method
            </button>
          </div>
        </div>
      )}

      {/* Plans Tier Comparison Grid */}
      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-4">Available Subscription Plans</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.code}
              className={`bg-white rounded-2xl p-6 border shadow-sm flex flex-col justify-between relative ${
                plan.isPopular ? 'border-blue-600 ring-2 ring-blue-600/20' : 'border-slate-200'
              }`}
            >
              {plan.isPopular && (
                <span className="absolute -top-3 right-6 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                  Most Popular
                </span>
              )}
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-slate-900">{plan.name}</h4>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-slate-900">${plan.priceMonthly}</span>
                  <span className="text-xs text-slate-500 font-medium">/ month</span>
                </div>

                <div className="space-y-2 pt-4 border-t border-slate-100">
                  {plan.features.map((feat: string, i: number) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                className={`w-full mt-6 py-2.5 rounded-xl font-bold text-xs shadow-sm transition-colors ${
                  subscription?.plan?.code === plan.code
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default'
                    : 'bg-slate-900 hover:bg-slate-800 text-white'
                }`}
              >
                {subscription?.plan?.code === plan.code ? 'Current Active Tier' : 'Upgrade to ' + plan.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
