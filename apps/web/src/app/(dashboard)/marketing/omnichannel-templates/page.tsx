'use client';

import React, { useState } from 'react';
import { LayoutTemplate, MessageSquare, Mail, Phone, Sparkles, CheckCircle2 } from 'lucide-react';

const SAMPLE_TEMPLATES = [
  { id: '1', name: 'VIP Lead Qualification Alert', channel: 'WHATSAPP', preview: 'Hi {{ first_name }}, thanks for requesting a demo for {{ company_name }}! A sales engineer is reviewing your requirements.' },
  { id: '2', name: 'SLA Escalation Notification', channel: 'SMS', preview: 'EasyChat Alert: Ticket #{{ ticket_id }} for {{ account_name }} has entered CRITICAL SLA breach status.' },
  { id: '3', name: 'Quarterly Executive Review Invite', channel: 'EMAIL', preview: 'Dear {{ first_name }}, your Q3 executive value summary for {{ company_name }} is ready for review.' },
];

export default function OmnichannelTemplatesPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 shadow-sm">
            <LayoutTemplate className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Omnichannel Message Templates</h1>
            <p className="text-sm text-slate-500 mt-1">Multi-channel WhatsApp, SMS, and Email dynamic template variables with live device previews.</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-indigo-50 border border-indigo-200 rounded-xl px-4 py-2 text-xs font-bold text-indigo-900 shadow-xs">
          <Sparkles className="w-4 h-4 text-indigo-600" /> Liquid & Mustache Syntax Supported
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {SAMPLE_TEMPLATES.map((t) => (
          <div key={t.id} className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="bg-indigo-50 text-indigo-700 border border-indigo-200 text-[10px] font-bold px-2 py-0.5 rounded-full font-mono">
                {t.channel}
              </span>
              <span className="text-[10px] font-bold text-slate-400">ID: #{t.id}</span>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-slate-900 text-sm">{t.name}</h3>
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-3.5 text-xs text-slate-600 font-mono leading-relaxed">
                {t.preview}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-xs">
              <span className="text-slate-400 font-medium">3 dynamic variables</span>
              <button className="text-indigo-600 font-bold hover:underline">
                Edit Template →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
