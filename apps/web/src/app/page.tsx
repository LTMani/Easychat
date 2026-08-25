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
          Phase 2 — EasyChat Core Realtime Engine
        </span>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight max-w-4xl">
          Conversation ® Context ® Action
        </h1>
        <p className="mt-6 text-lg text-slate-600 max-w-2xl">
          EasyChat CRM connects customer communications directly to profiles, leads, deals, tickets, and automated workflows in one unified operating system.
        </p>

        <div className="mt-10 flex flex-wrap gap-4 justify-center">
          <Link href="/conversations" className="px-6 py-3 text-base font-semibold text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700">
            Open Chat Workspace
          </Link>
          <Link href="/settings/organization" className="px-6 py-3 text-base font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg shadow-sm hover:bg-slate-50">
            Organization & Team Dashboard
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-left w-full">
          <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-semibold text-lg text-slate-900">Realtime Engine</h3>
            <p className="mt-2 text-sm text-slate-600">
              WebSockets & Socket.IO powering instant 1-on-1 and group messaging, typing indicators, presence, and unread notification alerts.
            </p>
          </div>
          <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-semibold text-lg text-slate-900">Conversation First</h3>
            <p className="mt-2 text-sm text-slate-600">
              Every customer conversation provides CRM context and serves as the starting point for triggering business workflows.
            </p>
          </div>
          <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-semibold text-lg text-slate-900">In-App Notifications</h3>
            <p className="mt-2 text-sm text-slate-600">
              Live notification bell badge, mention alerts, and action triggers keeping team members synchronized across channels.
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
