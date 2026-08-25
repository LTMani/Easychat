import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-6 py-4 bg-white border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
            E
          </div>
          <span className="font-semibold text-xl tracking-tight">EasyChat CRM</span>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/login" className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900">
            Sign In
          </Link>
          <Link href="/register" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-sm">
            Get Started
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-16 flex flex-col items-center justify-center text-center">
        <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200 rounded-full mb-6">
          Phase 5 — Customer Support & SLA Engine
        </span>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight max-w-4xl">
          Conversation ® Context ® Action
        </h1>
        <p className="mt-6 text-lg text-slate-600 max-w-2xl">
          EasyChat CRM connects customer communications directly to profiles, leads, deals, tickets, and automated workflows in one unified operating system.
        </p>

        <div className="mt-10 flex flex-wrap gap-4 justify-center">
          <Link href="/conversations" className="px-6 py-3 text-base font-semibold text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700">
            Realtime Chat
          </Link>
          <Link href="/tickets" className="px-6 py-3 text-base font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg shadow-sm hover:bg-slate-50">
            Support Desk Queue
          </Link>
          <Link href="/deals" className="px-6 py-3 text-base font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg shadow-sm hover:bg-slate-50">
            Deals Board
          </Link>
          <Link href="/knowledge-base" className="px-6 py-3 text-base font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg shadow-sm hover:bg-slate-50">
            Knowledge Base
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-left w-full">
          <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-semibold text-lg text-slate-900">SLA Engine</h3>
            <p className="mt-2 text-sm text-slate-600">
              Automated response targets (15-min SLA for URGENT tickets), first response timers, and breach alerts.
            </p>
          </div>
          <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-semibold text-lg text-slate-900">Internal Agent Notes</h3>
            <p className="mt-2 text-sm text-slate-600">
              Private internal notes for support team collaboration alongside customer-facing ticket replies.
            </p>
          </div>
          <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-semibold text-lg text-slate-900">Knowledge Base</h3>
            <p className="mt-2 text-sm text-slate-600">
              Categorized support documentation and solution guides for self-service and agent resolution links.
            </p>
          </div>
        </div>
      </main>

      <footer className="py-6 border-t border-slate-200 text-center text-sm text-slate-500">
        EasyChat CRM v1.0 — Conversation-First CRM Baseline
      </footer>
    </div>
  );
}
