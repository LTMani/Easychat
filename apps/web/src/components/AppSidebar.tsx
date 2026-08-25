'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  MessageSquare,
  Users,
  Target,
  BarChart3,
  LifeBuoy,
  BookOpen,
  Zap,
  TrendingUp,
  Sparkles,
  Code,
  ShieldCheck,
  Settings,
  LogOut,
  Inbox,
  PieChart,
  Mail,
} from 'lucide-react';
import { NotificationBell } from './NotificationBell';

const navigationItems = [
  { name: 'Conversations', href: '/conversations', icon: MessageSquare, category: 'Communication' },
  { name: 'Omnichannel Inbox', href: '/inbox', icon: Inbox, category: 'Communication' },
  { name: 'Contacts', href: '/contacts', icon: Users, category: 'CRM Suite' },
  { name: 'Leads', href: '/leads', icon: Target, category: 'CRM Suite' },
  { name: 'Deals Board', href: '/deals', icon: BarChart3, category: 'CRM Suite' },
  { name: 'Support Tickets', href: '/tickets', icon: LifeBuoy, category: 'Customer Support' },
  { name: 'Knowledge Base', href: '/knowledge-base', icon: BookOpen, category: 'Customer Support' },
  { name: 'Automation Engine', href: '/automation', icon: Zap, category: 'Platform' },
  { name: 'Analytics Summary', href: '/analytics', icon: TrendingUp, category: 'Platform' },
  { name: 'Custom Reports', href: '/reports', icon: PieChart, category: 'Platform' },
  { name: 'Email Templates', href: '/email-templates', icon: Mail, category: 'Platform' },
  { name: 'AI Copilot', href: '/ai', icon: Sparkles, category: 'Platform' },
  { name: 'Developer & Keys', href: '/developer', icon: Code, category: 'Platform' },
  { name: 'Audit Logs', href: '/audit', icon: ShieldCheck, category: 'Enterprise' },
  { name: 'Organization', href: '/settings/organization', icon: Settings, category: 'Enterprise' },
];

export function AppSidebar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen flex bg-slate-50 font-sans text-slate-900">
      {/* Unified Left Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col border-r border-slate-800 flex-shrink-0">
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-800 flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-xl shadow-sm">
            E
          </div>
          <div>
            <div className="font-bold text-base text-white tracking-tight leading-none">EasyChat CRM</div>
            <div className="text-[11px] text-slate-400 mt-1 font-medium">Operating System</div>
          </div>
        </div>

        {/* Navigation Items grouped */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto space-y-6">
          <div>
            <div className="px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">Communication</div>
            <div className="space-y-1">
              {navigationItems
                .filter((item) => item.category === 'Communication')
                .map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                        isActive
                          ? 'bg-blue-600 text-white font-bold shadow-sm'
                          : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
            </div>
          </div>

          <div>
            <div className="px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">CRM Suite</div>
            <div className="space-y-1">
              {navigationItems
                .filter((item) => item.category === 'CRM Suite')
                .map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                        isActive
                          ? 'bg-blue-600 text-white font-bold shadow-sm'
                          : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
            </div>
          </div>

          <div>
            <div className="px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">Customer Support</div>
            <div className="space-y-1">
              {navigationItems
                .filter((item) => item.category === 'Customer Support')
                .map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                        isActive
                          ? 'bg-blue-600 text-white font-bold shadow-sm'
                          : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
            </div>
          </div>

          <div>
            <div className="px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">Platform & Analytics</div>
            <div className="space-y-1">
              {navigationItems
                .filter((item) => item.category === 'Platform')
                .map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                        isActive
                          ? 'bg-blue-600 text-white font-bold shadow-sm'
                          : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
            </div>
          </div>

          <div>
            <div className="px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">Enterprise</div>
            <div className="space-y-1">
              {navigationItems
                .filter((item) => item.category === 'Enterprise')
                .map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                        isActive
                          ? 'bg-blue-600 text-white font-bold shadow-sm'
                          : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
            </div>
          </div>
        </nav>

        {/* Footer Logout */}
        <div className="p-3 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-3 py-2 text-xs font-semibold text-red-400 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main App Content Container */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        {children}
      </div>
    </div>
  );
}
