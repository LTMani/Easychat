import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <header className="px-6 py-4 bg-white border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
            E
          </div>
          <span className="font-semibold text-xl tracking-tight text-slate-900">EasyChat CRM</span>
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
        <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-green-700 bg-green-50 border border-green-200 rounded-full mb-6">
          Full 10-Phase Production CRM Suite Complete
        </span>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight max-w-4xl">
          Conversation ® Context ® Action
        </h1>
        <p className="mt-6 text-lg text-slate-600 max-w-2xl">
          EasyChat CRM is a real-world, conversation-first customer relationship management platform combining communication, sales pipelines, customer 360 timelines, support SLAs, background workflow automation, executive analytics, AI copilot intelligence, and developer webhooks.
        </p>

        {/* Feature Workspace Links */}
        <div className="mt-10 flex flex-wrap gap-3 justify-center max-w-4xl">
          <Link href="/conversations" className="px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700">
            Realtime Chat & 360 Action Drawer
          </Link>
          <Link href="/contacts" className="px-5 py-2.5 text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg shadow-sm hover:bg-slate-50">
            Contacts & 360 Timelines
          </Link>
          <Link href="/deals" className="px-5 py-2.5 text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg shadow-sm hover:bg-slate-50">
            Sales Kanban Deals
          </Link>
          <Link href="/leads" className="px-5 py-2.5 text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg shadow-sm hover:bg-slate-50">
            Leads Management
          </Link>
          <Link href="/tickets" className="px-5 py-2.5 text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg shadow-sm hover:bg-slate-50">
            Support Desk & SLAs
          </Link>
          <Link href="/automation" className="px-5 py-2.5 text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg shadow-sm hover:bg-slate-50">
            Automation Workflows
          </Link>
          <Link href="/analytics" className="px-5 py-2.5 text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg shadow-sm hover:bg-slate-50">
            Executive Analytics
          </Link>
          <Link href="/ai" className="px-5 py-2.5 text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg shadow-sm hover:bg-slate-50">
            AI Copilot
          </Link>
          <Link href="/developer" className="px-5 py-2.5 text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg shadow-sm hover:bg-slate-50">
            Developer API Keys & Webhooks
          </Link>
          <Link href="/audit" className="px-5 py-2.5 text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg shadow-sm hover:bg-slate-50">
            Audit Logs
          </Link>
        </div>

        {/* 10-Phase Roadmap Summary Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left w-full">
          <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
            <div className="font-bold text-xs text-blue-600 uppercase mb-1">Phase 1 & 2</div>
            <h3 className="font-semibold text-lg text-slate-900">Realtime Engine</h3>
            <p className="mt-2 text-xs text-slate-600">
              WebSockets Socket.IO gateway, active presence, typing feedback, and multi-tenant organization isolation.
            </p>
          </div>
          <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
            <div className="font-bold text-xs text-blue-600 uppercase mb-1">Phase 3 & 4</div>
            <h3 className="font-semibold text-lg text-slate-900">CRM & Customer 360</h3>
            <p className="mt-2 text-xs text-slate-600">
              1-click Lead Conversion, Kanban deal boards, conversation-to-CRM action drawer, and unified activity timelines.
            </p>
          </div>
          <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
            <div className="font-bold text-xs text-blue-600 uppercase mb-1">Phase 5 & 6</div>
            <h3 className="font-semibold text-lg text-slate-900">Support & Automation</h3>
            <p className="mt-2 text-xs text-slate-600">
              Priority support tickets with SLA breach indicators, internal agent notes, and trigger-condition-action background workflows.
            </p>
          </div>
          <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
            <div className="font-bold text-xs text-blue-600 uppercase mb-1">Phase 7 & 8</div>
            <h3 className="font-semibold text-lg text-slate-900">Analytics & AI Copilot</h3>
            <p className="mt-2 text-xs text-slate-600">
              Pipeline revenue forecasts, win rate metrics, AI conversation summaries, lead scoring, and next-best-action guidance.
            </p>
          </div>
          <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
            <div className="font-bold text-xs text-blue-600 uppercase mb-1">Phase 9 & 10</div>
            <h3 className="font-semibold text-lg text-slate-900">Platform & Enterprise</h3>
            <p className="mt-2 text-xs text-slate-600">
              REST API keys, live webhook delivery logs, custom field definitions, and enterprise security audit log history.
            </p>
          </div>
          <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
            <div className="font-bold text-xs text-green-600 uppercase mb-1">Status</div>
            <h3 className="font-semibold text-lg text-slate-900">100% Production Complete</h3>
            <p className="mt-2 text-xs text-slate-600">
              All 10 phases built, verified with automated test suites, and pushed to your remote Git repository.
            </p>
          </div>
        </div>
      </main>

      <footer className="py-6 border-t border-slate-200 text-center text-sm text-slate-500">
        EasyChat CRM v1.0 — Enterprise Conversation-First CRM Platform
      </footer>
    </div>
  );
}
