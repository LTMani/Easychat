'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Building2,
  Target,
  BarChart3,
  GitFork,
  Activity,
  CheckSquare,
  Calendar,
  MessageSquare,
  Inbox,
  PhoneCall,
  Video,
  LifeBuoy,
  BookOpen,
  Zap,
  Send,
  PieChart,
  Settings,
  UserCheck,
  Share2,
  ChevronLeft,
  Search,
  Bell,
  HelpCircle,
  Plus,
} from 'lucide-react';

import { GlobalFloatingAiBot } from './GlobalFloatingAiBot';

export function AppSidebar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const crmNav = [
    { name: 'Customers', href: '/contacts', icon: Users },
    { name: 'Companies', href: '/cdp', icon: Building2 },
    { name: 'Leads', href: '/leads', icon: Target },
    { name: 'Deals', href: '/deals', icon: BarChart3 },
    { name: 'Pipelines', href: '/crm/territories', icon: GitFork },
    { name: 'Activities', href: '/activities', icon: Activity },
    { name: 'Tasks', href: '/tasks', icon: CheckSquare },
    { name: 'Calendar', href: '/calendar', icon: Calendar },
  ];

  const commNav = [
    { name: 'Conversations', href: '/conversations', icon: MessageSquare, badge: 8 },
    { name: 'Inbox', href: '/inbox', icon: Inbox, badge: 5 },
    { name: 'Calls', href: '/telephony/softphone', icon: PhoneCall },
    { name: 'Meetings', href: '/meetings', icon: Video },
  ];

  const supportNav = [
    { name: 'Tickets', href: '/tickets', icon: LifeBuoy, badge: 14 },
    { name: 'Knowledge Base', href: '/help-center/portal', icon: BookOpen },
  ];

  const autoNav = [
    { name: 'Workflows', href: '/automation', icon: Zap },
    { name: 'Campaigns', href: '/marketing/ab-testing', icon: Send },
  ];

  const analyticsNav = [
    { name: 'Reports', href: '/reports', icon: PieChart },
    { name: 'Dashboards', href: '/analytics/profits', icon: LayoutDashboard },
  ];

  const settingsNav = [
    { name: 'Users & Teams', href: '/gamification/leaderboard', icon: UserCheck },
    { name: 'Integrations', href: '/integrations', icon: Share2 },
    { name: 'Settings', href: '/settings/organization', icon: Settings },
  ];

  return (
    <div className="min-h-screen flex bg-[#f8fafc] text-slate-800 font-sans antialiased">
      {/* Left Sidebar */}
      <aside className="w-60 bg-white border-r border-slate-200/80 flex flex-col flex-shrink-0 z-20">
        {/* Brand Header */}
        <div className="h-16 px-5 flex items-center gap-2.5 border-b border-slate-100">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#6366f1] to-[#8b5cf6] flex items-center justify-center shadow-md shadow-indigo-500/20 text-white font-bold">
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
              <path d="M12 2C6.48 2 2 6.48 2 12c0 1.82.49 3.53 1.34 5L2 22l5.2-1.3c1.42.76 3.03 1.3 4.8 1.3 5.52 0 10-4.48 10-10S17.52 2 12 2zm1 14.5h-2v-2h2v2zm0-4h-2V7h2v5.5z"/>
            </svg>
          </div>
          <span className="font-extrabold text-base tracking-tight text-slate-900">
            EasyChat <span className="text-indigo-600 font-bold">CRM</span>
          </span>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 px-3 py-4 overflow-y-auto space-y-5 scrollbar-thin scrollbar-thumb-slate-200">
          {/* Main Dashboard Button */}
          <Link
            href="/"
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold text-xs transition-all ${
              pathname === '/' || pathname === '/dashboard'
                ? 'bg-[#4f46e5] text-white shadow-md shadow-indigo-500/25'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard</span>
          </Link>

          {/* CRM Section */}
          <div>
            <span className="px-3 text-[10px] font-bold tracking-wider text-slate-400 uppercase">CRM</span>
            <div className="mt-1.5 space-y-0.5">
              {crmNav.map((item) => {
                const Icon = item.icon;
                const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      active
                        ? 'bg-indigo-50 text-indigo-700 font-bold'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${active ? 'text-indigo-600' : 'text-slate-400'}`} />
                      <span>{item.name}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* COMMUNICATION Section */}
          <div>
            <span className="px-3 text-[10px] font-bold tracking-wider text-slate-400 uppercase">COMMUNICATION</span>
            <div className="mt-1.5 space-y-0.5">
              {commNav.map((item) => {
                const Icon = item.icon;
                const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      active
                        ? 'bg-indigo-50 text-indigo-700 font-bold'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${active ? 'text-indigo-600' : 'text-slate-400'}`} />
                      <span>{item.name}</span>
                    </div>
                    {item.badge && (
                      <span className="w-4 h-4 rounded-full bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* SUPPORT Section */}
          <div>
            <span className="px-3 text-[10px] font-bold tracking-wider text-slate-400 uppercase">SUPPORT</span>
            <div className="mt-1.5 space-y-0.5">
              {supportNav.map((item) => {
                const Icon = item.icon;
                const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      active
                        ? 'bg-indigo-50 text-indigo-700 font-bold'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${active ? 'text-indigo-600' : 'text-slate-400'}`} />
                      <span>{item.name}</span>
                    </div>
                    {item.badge && (
                      <span className="px-1.5 py-0.2 rounded-full bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* AUTOMATION Section */}
          <div>
            <span className="px-3 text-[10px] font-bold tracking-wider text-slate-400 uppercase">AUTOMATION</span>
            <div className="mt-1.5 space-y-0.5">
              {autoNav.map((item) => {
                const Icon = item.icon;
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      active ? 'bg-indigo-50 text-indigo-700 font-bold' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${active ? 'text-indigo-600' : 'text-slate-400'}`} />
                      <span>{item.name}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* ANALYTICS Section */}
          <div>
            <span className="px-3 text-[10px] font-bold tracking-wider text-slate-400 uppercase">ANALYTICS</span>
            <div className="mt-1.5 space-y-0.5">
              {analyticsNav.map((item) => {
                const Icon = item.icon;
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      active ? 'bg-indigo-50 text-indigo-700 font-bold' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${active ? 'text-indigo-600' : 'text-slate-400'}`} />
                      <span>{item.name}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* SETTINGS Section */}
          <div>
            <span className="px-3 text-[10px] font-bold tracking-wider text-slate-400 uppercase">SETTINGS</span>
            <div className="mt-1.5 space-y-0.5">
              {settingsNav.map((item) => {
                const Icon = item.icon;
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      active ? 'bg-indigo-50 text-indigo-700 font-bold' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${active ? 'text-indigo-600' : 'text-slate-400'}`} />
                      <span>{item.name}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer Collapse */}
        <div className="p-3 border-t border-slate-100">
          <button className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors w-full">
            <ChevronLeft className="w-4 h-4" />
            <span>Collapse</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area with Top Header */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200/80 px-8 flex items-center justify-between sticky top-0 z-10">
          {/* Global Search Bar */}
          <div className="relative w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              placeholder="Search anything..."
              className="w-full bg-slate-50 border border-slate-200/80 rounded-xl pl-9 pr-12 py-2 text-xs text-slate-800 placeholder-slate-400 outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 bg-white border border-slate-200 text-slate-400 text-[10px] font-mono font-bold px-1.5 py-0.5 rounded shadow-2xs">
              ⌘K
            </span>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-4">
            {/* Quick Add Button */}
            <button className="w-8 h-8 rounded-full bg-[#4f46e5] text-white flex items-center justify-center shadow-md shadow-indigo-500/20 hover:bg-indigo-600 transition-colors">
              <Plus className="w-4 h-4 stroke-[2.5]" />
            </button>

            {/* Notifications */}
            <button className="w-8 h-8 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 flex items-center justify-center relative transition-colors">
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center">
                12
              </span>
            </button>

            {/* Help */}
            <button className="w-8 h-8 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 flex items-center justify-center transition-colors">
              <HelpCircle className="w-4 h-4" />
            </button>

            {/* User Profile */}
            <div className="flex items-center gap-3 pl-2 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden ring-2 ring-indigo-500/20">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                  alt="Rahul Varma"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-left leading-tight">
                <p className="text-xs font-bold text-slate-900">Rahul Varma</p>
                <p className="text-[10px] font-medium text-slate-400">Admin</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Children Body */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>

      {/* Global Interactive AI Support Chatbot Widget */}
      <GlobalFloatingAiBot />
    </div>
  );
}
