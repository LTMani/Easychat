'use client';

import React, { useState } from 'react';
import { LifeBuoy, FileText, Send, CheckCircle2, Search, ArrowRight, ShieldCheck } from 'lucide-react';

export default function SelfServicePortalPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Sarah Jenkins',
    email: 'sarah.jenkins@acmecorp.com',
    category: 'TECHNICAL',
    priority: 'HIGH',
    subject: 'SSO SAML 2.0 Identity Provider loop on Chrome 124',
    description: 'When logging in via Okta SAML 2.0, user is redirected back to login page.',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 shadow-sm">
            <LifeBuoy className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Customer Self-Service Support Portal</h1>
            <p className="text-sm text-slate-500 mt-1">Submit high-priority support tickets, view live SLA resolution commitments, and access verified guides.</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-indigo-50 border border-indigo-200 rounded-xl px-4 py-2 text-xs font-bold text-indigo-900 shadow-xs">
          <ShieldCheck className="w-4 h-4 text-indigo-600" /> Enterprise SLA: 15-Min Response Guaranteed
        </div>
      </div>

      {submitted ? (
        <div className="bg-white rounded-2xl border border-emerald-200 p-8 shadow-sm text-center space-y-4">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Ticket #TKT-8942 Created Successfully!</h2>
          <p className="text-xs text-slate-600 max-w-md mx-auto">
            Your ticket has been assigned to the <strong>QUEUE_SUPPORT_P1_CRITICAL</strong> queue. A senior engineer will respond within 15 minutes.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="px-4 py-2 bg-[#4f46e5] text-white text-xs font-bold rounded-xl shadow-sm"
          >
            Submit Another Ticket
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Your Name</label>
              <input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Work Email</label>
              <input
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Subject</label>
            <input
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Detailed Description</label>
            <textarea
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#4f46e5] hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md shadow-indigo-500/20 flex items-center justify-center gap-2"
          >
            Submit Support Request <Send className="w-4 h-4" />
          </button>
        </form>
      )}
    </div>
  );
}
