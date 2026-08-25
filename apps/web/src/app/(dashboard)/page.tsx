'use client';

import React from 'react';
import Link from 'next/link';
import {
  Users,
  UserPlus,
  Trophy,
  IndianRupee,
  LifeBuoy,
  TrendingUp,
  TrendingDown,
  Calendar,
  Settings,
  Phone,
  Video,
  FileText,
  CheckSquare,
  Sparkles,
  ArrowRight,
  MoreVertical,
  Plus,
  MessageSquare,
  Target,
  Briefcase,
} from 'lucide-react';

export default function MainDashboardPage() {
  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      {/* 1. Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Dashboard</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Welcome back, Rahul! Here's what's happening with your business.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Date Range Picker */}
          <div className="flex items-center gap-2 bg-white border border-slate-200/80 rounded-xl px-3.5 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>May 12 - May 18, 2025</span>
          </div>

          {/* Customize Button */}
          <button className="flex items-center gap-1.5 bg-white border border-slate-200/80 rounded-xl px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-2xs transition-colors">
            <Settings className="w-3.5 h-3.5 text-slate-400" />
            <span>Customize</span>
          </button>
        </div>
      </div>

      {/* 2. Top 5 Metric Cards */}
      <div className="grid grid-cols-5 gap-4">
        {/* Total Customers */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-slate-500">Total Customers</p>
            <h3 className="text-xl font-black text-slate-900 font-sans tracking-tight">2,543</h3>
            <p className="text-[10px] font-bold text-emerald-600 flex items-center gap-0.5 mt-0.5">
              <span>▲ 12.5%</span> <span className="text-slate-400 font-normal">vs last 7 days</span>
            </p>
          </div>
        </div>

        {/* New Leads */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
            <UserPlus className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-slate-500">New Leads</p>
            <h3 className="text-xl font-black text-slate-900 font-sans tracking-tight">1,152</h3>
            <p className="text-[10px] font-bold text-emerald-600 flex items-center gap-0.5 mt-0.5">
              <span>▲ 8.3%</span> <span className="text-slate-400 font-normal">vs last 7 days</span>
            </p>
          </div>
        </div>

        {/* Deals Won */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-full bg-amber-50 flex items-center justify-center text-amber-500 shrink-0">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-slate-500">Deals Won</p>
            <h3 className="text-xl font-black text-slate-900 font-sans tracking-tight">78</h3>
            <p className="text-[10px] font-bold text-emerald-600 flex items-center gap-0.5 mt-0.5">
              <span>▲ 15.6%</span> <span className="text-slate-400 font-normal">vs last 7 days</span>
            </p>
          </div>
        </div>

        {/* Revenue */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0 font-bold text-lg">
            ₹
          </div>
          <div>
            <p className="text-[11px] font-semibold text-slate-500">Revenue</p>
            <h3 className="text-xl font-black text-slate-900 font-sans tracking-tight">₹48,32,750</h3>
            <p className="text-[10px] font-bold text-emerald-600 flex items-center gap-0.5 mt-0.5">
              <span>▲ 18.2%</span> <span className="text-slate-400 font-normal">vs last 7 days</span>
            </p>
          </div>
        </div>

        {/* Open Tickets */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-full bg-rose-50 flex items-center justify-center text-rose-500 shrink-0">
            <LifeBuoy className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-slate-500">Open Tickets</p>
            <h3 className="text-xl font-black text-slate-900 font-sans tracking-tight">64</h3>
            <p className="text-[10px] font-bold text-rose-500 flex items-center gap-0.5 mt-0.5">
              <span>▼ 5.4%</span> <span className="text-slate-400 font-normal">vs last 7 days</span>
            </p>
          </div>
        </div>
      </div>

      {/* 3. Middle Row (Pipeline Funnel, Sales Curve Graph, Tasks Due Today) */}
      <div className="grid grid-cols-12 gap-5">
        {/* Card 1: Pipeline Overview (4 cols) */}
        <div className="col-span-4 bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-sm">Pipeline Overview</h3>
            <select className="text-xs text-slate-500 font-medium bg-slate-50 border border-slate-200/60 rounded-lg px-2 py-1 outline-none">
              <option>This Month</option>
            </select>
          </div>

          <div className="grid grid-cols-12 gap-4 items-center my-4">
            {/* Visual Funnel Stack */}
            <div className="col-span-6 flex flex-col items-center gap-1">
              <div className="w-full h-8 bg-[#4f46e5] rounded-t-sm" />
              <div className="w-[84%] h-8 bg-[#6366f1]" />
              <div className="w-[68%] h-8 bg-[#3b82f6]" />
              <div className="w-[52%] h-8 bg-[#38bdf8]" />
              <div className="w-[36%] h-8 bg-[#2dd4bf]" />
              <div className="w-[20%] h-8 bg-[#4ade80] rounded-b-sm" />
            </div>

            {/* Funnel Legend Breakdown */}
            <div className="col-span-6 space-y-2 text-[11px]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-xs bg-[#4f46e5]" />
                  <span className="text-slate-600 font-medium">New</span>
                </div>
                <span className="font-bold text-slate-900 font-mono">₹ 25,40,000 (120)</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-xs bg-[#6366f1]" />
                  <span className="text-slate-600 font-medium">Contacted</span>
                </div>
                <span className="font-bold text-slate-900 font-mono">₹ 18,75,000 (95)</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-xs bg-[#3b82f6]" />
                  <span className="text-slate-600 font-medium">Qualified</span>
                </div>
                <span className="font-bold text-slate-900 font-mono">₹ 12,30,000 (63)</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-xs bg-[#38bdf8]" />
                  <span className="text-slate-600 font-medium">Proposal</span>
                </div>
                <span className="font-bold text-slate-900 font-mono">₹ 8,90,000 (32)</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-xs bg-[#2dd4bf]" />
                  <span className="text-slate-600 font-medium">Negotiation</span>
                </div>
                <span className="font-bold text-slate-900 font-mono">₹ 4,50,000 (18)</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-xs bg-[#4ade80]" />
                  <span className="text-slate-600 font-medium">Won</span>
                </div>
                <span className="font-bold text-slate-900 font-mono">₹ 3,20,000 (7)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Sales Overview Chart (5 cols) */}
        <div className="col-span-5 bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-sm">Sales Overview</h3>
            <select className="text-xs text-slate-500 font-medium bg-slate-50 border border-slate-200/60 rounded-lg px-2 py-1 outline-none">
              <option>This Month</option>
            </select>
          </div>

          {/* Line Chart Canvas Graphic */}
          <div className="relative my-2 pt-2">
            <svg viewBox="0 0 400 180" className="w-full h-44 overflow-visible">
              {/* Grid Lines */}
              <line x1="30" y1="20" x2="390" y2="20" stroke="#f1f5f9" strokeDasharray="3 3" />
              <line x1="30" y1="55" x2="390" y2="55" stroke="#f1f5f9" strokeDasharray="3 3" />
              <line x1="30" y1="90" x2="390" y2="90" stroke="#f1f5f9" strokeDasharray="3 3" />
              <line x1="30" y1="125" x2="390" y2="125" stroke="#f1f5f9" strokeDasharray="3 3" />
              <line x1="30" y1="160" x2="390" y2="160" stroke="#f1f5f9" />

              {/* Y Axis Labels */}
              <text x="5" y="24" className="text-[9px] fill-slate-400 font-mono">₹ 50L</text>
              <text x="5" y="59" className="text-[9px] fill-slate-400 font-mono">₹ 40L</text>
              <text x="5" y="94" className="text-[9px] fill-slate-400 font-mono">₹ 30L</text>
              <text x="5" y="129" className="text-[9px] fill-slate-400 font-mono">₹ 20L</text>
              <text x="5" y="159" className="text-[9px] fill-slate-400 font-mono">₹ 10L</text>
              <text x="15" y="175" className="text-[9px] fill-slate-400 font-mono">₹ 0</text>

              {/* Revenue Trajectory (Purple Line) */}
              <path
                d="M 40 145 C 90 120, 150 95, 210 80 C 270 65, 320 40, 380 25"
                fill="none"
                stroke="#6366f1"
                strokeWidth="2.5"
              />
              <circle cx="40" cy="145" r="3" fill="#6366f1" />
              <circle cx="95" cy="122" r="3" fill="#6366f1" />
              <circle cx="150" cy="98" r="3" fill="#6366f1" />
              <circle cx="210" cy="80" r="3.5" fill="#6366f1" />
              <circle cx="270" cy="65" r="3.5" fill="#6366f1" />
              <circle cx="325" cy="42" r="3.5" fill="#6366f1" />
              <circle cx="380" cy="25" r="3.5" fill="#6366f1" />

              {/* Deals Won Trajectory (Green Line) */}
              <path
                d="M 40 155 C 95 140, 150 125, 210 115 C 270 108, 325 95, 380 85"
                fill="none"
                stroke="#22c55e"
                strokeWidth="2"
              />
              <circle cx="40" cy="155" r="2.5" fill="#22c55e" />
              <circle cx="95" cy="140" r="2.5" fill="#22c55e" />
              <circle cx="150" cy="125" r="2.5" fill="#22c55e" />
              <circle cx="210" cy="115" r="3" fill="#22c55e" />

              {/* Floating Tooltip Callout for May 16 */}
              <g transform="translate(230, 48)">
                <rect width="110" height="42" rx="8" fill="#ffffff" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.08))" stroke="#e2e8f0" />
                <text x="10" y="14" className="text-[8px] fill-slate-400 font-bold">May 16, 2025</text>
                <circle cx="12" cy="24" r="2.5" fill="#6366f1" />
                <text x="18" y="27" className="text-[8px] fill-slate-700 font-medium">Revenue</text>
                <text x="62" y="27" className="text-[8px] fill-slate-900 font-bold font-mono">₹ 32,40,000</text>
                <circle cx="12" cy="34" r="2.5" fill="#22c55e" />
                <text x="18" y="37" className="text-[8px] fill-slate-700 font-medium">Deals Won</text>
                <text x="96" y="37" className="text-[8px] fill-slate-900 font-bold font-mono">12</text>
              </g>

              {/* X Axis Labels */}
              <text x="35" y="175" className="text-[9px] fill-slate-400">May 12</text>
              <text x="90" y="175" className="text-[9px] fill-slate-400">May 13</text>
              <text x="145" y="175" className="text-[9px] fill-slate-400">May 14</text>
              <text x="200" y="175" className="text-[9px] fill-slate-400">May 15</text>
              <text x="255" y="175" className="text-[9px] fill-slate-400">May 16</text>
              <text x="310" y="175" className="text-[9px] fill-slate-400">May 17</text>
              <text x="365" y="175" className="text-[9px] fill-slate-400">May 18</text>
            </svg>
          </div>

          <div className="flex items-center justify-center gap-6 pt-2 border-t border-slate-100 text-xs font-semibold text-slate-600">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#6366f1]" />
              <span>Revenue</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e]" />
              <span>Deals Won</span>
            </div>
          </div>
        </div>

        {/* Card 3: Tasks Due Today (3 cols) */}
        <div className="col-span-3 bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-sm">Tasks Due Today</h3>
            <Link href="/tasks" className="text-xs text-indigo-600 font-bold hover:underline">
              View all
            </Link>
          </div>

          <div className="space-y-3 my-2">
            {/* Task 1 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Follow up with Acme Corp</h4>
                  <span className="text-[10px] text-slate-400">Call</span>
                </div>
              </div>
              <span className="text-[10px] font-medium text-slate-400 font-mono">10:00 AM</span>
            </div>

            {/* Task 2 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Calendar className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Demo for TechSolutions</h4>
                  <span className="text-[10px] text-slate-400">Meeting</span>
                </div>
              </div>
              <span className="text-[10px] font-medium text-slate-400 font-mono">11:30 AM</span>
            </div>

            {/* Task 3 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                  <FileText className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Proposal discussion</h4>
                  <span className="text-[10px] text-slate-400">Follow-up</span>
                </div>
              </div>
              <span className="text-[10px] font-medium text-slate-400 font-mono">01:00 PM</span>
            </div>

            {/* Task 4 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                  <CheckSquare className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Contract review</h4>
                  <span className="text-[10px] text-slate-400">Task</span>
                </div>
              </div>
              <span className="text-[10px] font-medium text-slate-400 font-mono">03:30 PM</span>
            </div>

            {/* Task 5 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Check in with Beta LLC</h4>
                  <span className="text-[10px] text-slate-400">Call</span>
                </div>
              </div>
              <span className="text-[10px] font-medium text-slate-400 font-mono">05:00 PM</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Lower Middle Row (Recent Conversations, Lead Sources Donut, Open Tickets) */}
      <div className="grid grid-cols-12 gap-5">
        {/* Card 1: Recent Conversations (4 cols) */}
        <div className="col-span-4 bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-sm">Recent Conversations</h3>
            <Link href="/inbox" className="text-xs text-indigo-600 font-bold hover:underline">
              View all
            </Link>
          </div>

          <div className="space-y-3.5 my-2">
            {/* Conv 1 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80"
                  alt="Acme Corp"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xs font-bold text-slate-900">Acme Corp Team</h4>
                    <span className="text-[9px] font-medium text-slate-400 bg-slate-100 px-1.5 rounded">Customer</span>
                  </div>
                  <p className="text-[11px] text-slate-500 truncate max-w-[170px]">Rahul: Sure, I'll share the proposal shortly.</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-slate-400">2m ago</p>
                <span className="inline-block w-4 h-4 rounded-full bg-indigo-600 text-white text-[9px] font-bold text-center leading-4 mt-0.5">3</span>
              </div>
            </div>

            {/* Conv 2 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=80"
                  alt="Priya Sharma"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xs font-bold text-slate-900">Priya Sharma</h4>
                    <span className="text-[9px] font-medium text-slate-400 bg-slate-100 px-1.5 rounded">Lead</span>
                  </div>
                  <p className="text-[11px] text-slate-500 truncate max-w-[170px]">Thanks for the information! 👍</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-slate-400">15m ago</p>
              </div>
            </div>

            {/* Conv 3 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80"
                  alt="TechSolutions"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xs font-bold text-slate-900">TechSolutions</h4>
                    <span className="text-[9px] font-medium text-slate-400 bg-slate-100 px-1.5 rounded">Customer</span>
                  </div>
                  <p className="text-[11px] text-slate-500 truncate max-w-[170px]">Let's schedule a demo tomorrow.</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-slate-400">45m ago</p>
                <span className="inline-block w-4 h-4 rounded-full bg-indigo-600 text-white text-[9px] font-bold text-center leading-4 mt-0.5">2</span>
              </div>
            </div>

            {/* Conv 4 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80"
                  alt="Vikram Patel"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xs font-bold text-slate-900">Vikram Patel</h4>
                    <span className="text-[9px] font-medium text-slate-400 bg-slate-100 px-1.5 rounded">Lead</span>
                  </div>
                  <p className="text-[11px] text-slate-500 truncate max-w-[170px]">Please send the pricing details.</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-slate-400">1h ago</p>
              </div>
            </div>

            {/* Conv 5 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img
                  src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=80&auto=format&fit=crop&q=80"
                  alt="Global Enterprises"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xs font-bold text-slate-900">Global Enterprises</h4>
                    <span className="text-[9px] font-medium text-slate-400 bg-slate-100 px-1.5 rounded">Customer</span>
                  </div>
                  <p className="text-[11px] text-slate-500 truncate max-w-[170px]">We need support with the integration.</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-slate-400">2h ago</p>
                <span className="inline-block w-4 h-4 rounded-full bg-indigo-600 text-white text-[9px] font-bold text-center leading-4 mt-0.5">1</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Lead Sources Donut Chart (4 cols) */}
        <div className="col-span-4 bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-sm">Lead Sources</h3>
            <select className="text-xs text-slate-500 font-medium bg-slate-50 border border-slate-200/60 rounded-lg px-2 py-1 outline-none">
              <option>This Month</option>
            </select>
          </div>

          <div className="grid grid-cols-12 gap-4 items-center my-3">
            {/* SVG Donut Chart */}
            <div className="col-span-6 relative flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-32 h-32 -rotate-90">
                {/* Background Ring */}
                <circle cx="50" cy="50" r="38" stroke="#f1f5f9" strokeWidth="14" fill="none" />
                {/* 1. Website (35%) */}
                <circle cx="50" cy="50" r="38" stroke="#6366f1" strokeWidth="14" strokeDasharray="83.5 238" strokeDashoffset="0" fill="none" />
                {/* 2. WhatsApp (25%) */}
                <circle cx="50" cy="50" r="38" stroke="#3b82f6" strokeWidth="14" strokeDasharray="59.7 238" strokeDashoffset="-83.5" fill="none" />
                {/* 3. Referral (15%) */}
                <circle cx="50" cy="50" r="38" stroke="#06b6d4" strokeWidth="14" strokeDasharray="35.8 238" strokeDashoffset="-143.2" fill="none" />
                {/* 4. Social Media (10%) */}
                <circle cx="50" cy="50" r="38" stroke="#f97316" strokeWidth="14" strokeDasharray="23.9 238" strokeDashoffset="-179" fill="none" />
                {/* 5. Email Campaign (10%) */}
                <circle cx="50" cy="50" r="38" stroke="#eab308" strokeWidth="14" strokeDasharray="23.9 238" strokeDashoffset="-202.9" fill="none" />
                {/* 6. Other (5%) */}
                <circle cx="50" cy="50" r="38" stroke="#2dd4bf" strokeWidth="14" strokeDasharray="12 238" strokeDashoffset="-226.8" fill="none" />
              </svg>
              {/* Donut Center Label */}
              <div className="absolute text-center leading-none">
                <p className="text-base font-black text-slate-900 font-sans">1,152</p>
                <p className="text-[9px] text-slate-400 font-medium mt-0.5">Total Leads</p>
              </div>
            </div>

            {/* Donut Legend */}
            <div className="col-span-6 space-y-2 text-[11px]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#6366f1]" />
                  <span className="text-slate-600 font-medium">Website</span>
                </div>
                <span className="font-bold text-slate-900">35% <span className="text-slate-400 font-normal font-mono">(403)</span></span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#3b82f6]" />
                  <span className="text-slate-600 font-medium">WhatsApp</span>
                </div>
                <span className="font-bold text-slate-900">25% <span className="text-slate-400 font-normal font-mono">(288)</span></span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#06b6d4]" />
                  <span className="text-slate-600 font-medium">Referral</span>
                </div>
                <span className="font-bold text-slate-900">15% <span className="text-slate-400 font-normal font-mono">(173)</span></span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#f97316]" />
                  <span className="text-slate-600 font-medium">Social Media</span>
                </div>
                <span className="font-bold text-slate-900">10% <span className="text-slate-400 font-normal font-mono">(115)</span></span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#eab308]" />
                  <span className="text-slate-600 font-medium">Email Campaign</span>
                </div>
                <span className="font-bold text-slate-900">10% <span className="text-slate-400 font-normal font-mono">(115)</span></span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#2dd4bf]" />
                  <span className="text-slate-600 font-medium">Other</span>
                </div>
                <span className="font-bold text-slate-900">5% <span className="text-slate-400 font-normal font-mono">(58)</span></span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Open Tickets (4 cols) */}
        <div className="col-span-4 bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-sm">Open Tickets</h3>
            <Link href="/tickets" className="text-xs text-indigo-600 font-bold hover:underline">
              View all
            </Link>
          </div>

          <div className="space-y-3 my-2 text-xs">
            {/* Ticket 1 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-slate-900 text-[11px]">#TKT-1245</span>
                <span className="bg-rose-50 text-rose-600 text-[9px] font-bold px-1.5 py-0.2 rounded">High</span>
                <span className="text-slate-600 truncate max-w-[130px] font-medium">Payment gateway error</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400">Acme Corp • 10m ago</span>
              </div>
            </div>

            {/* Ticket 2 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-slate-900 text-[11px]">#TKT-1244</span>
                <span className="bg-amber-50 text-amber-600 text-[9px] font-bold px-1.5 py-0.2 rounded">Medium</span>
                <span className="text-slate-600 truncate max-w-[130px] font-medium">Unable to upload documents</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400">Beta LLC • 30m ago</span>
              </div>
            </div>

            {/* Ticket 3 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-slate-900 text-[11px]">#TKT-1243</span>
                <span className="bg-blue-50 text-blue-600 text-[9px] font-bold px-1.5 py-0.2 rounded">Low</span>
                <span className="text-slate-600 truncate max-w-[130px] font-medium">Feature request: Dark mode</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400">John Doe • 1h ago</span>
              </div>
            </div>

            {/* Ticket 4 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-slate-900 text-[11px]">#TKT-1242</span>
                <span className="bg-rose-50 text-rose-600 text-[9px] font-bold px-1.5 py-0.2 rounded">High</span>
                <span className="text-slate-600 truncate max-w-[130px] font-medium">Integration not working</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400">TechSolutions • 2h ago</span>
              </div>
            </div>

            {/* Ticket 5 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-slate-900 text-[11px]">#TKT-1241</span>
                <span className="bg-amber-50 text-amber-600 text-[9px] font-bold px-1.5 py-0.2 rounded">Medium</span>
                <span className="text-slate-600 truncate max-w-[130px] font-medium">Slow performance issue</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400">Global Enterprises • 3h ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Bottom Row (Upcoming Activities, Recent Deals, Top Performing Agents, Quick Actions) */}
      <div className="grid grid-cols-12 gap-5">
        {/* Upcoming Activities (3 cols) */}
        <div className="col-span-3 bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-xs">Upcoming Activities</h3>
            <Link href="/calendar" className="text-[10px] text-indigo-600 font-bold hover:underline">
              View calendar
            </Link>
          </div>

          <div className="flex items-center gap-3 mt-3">
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Product Demo</h4>
              <p className="text-[10px] text-slate-400 font-mono">May 19, 2025 • 10:00 AM</p>
            </div>
          </div>
        </div>

        {/* Recent Deals (3 cols) */}
        <div className="col-span-3 bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-xs">Recent Deals</h3>
            <Link href="/deals" className="text-[10px] text-indigo-600 font-bold hover:underline">
              View all
            </Link>
          </div>

          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 font-bold text-xs flex items-center justify-center">
                <Briefcase className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Acme Corp Deal</h4>
                <p className="text-[11px] text-slate-500 font-mono font-bold">₹ 8,50,000</p>
              </div>
            </div>
            <span className="bg-emerald-50 text-emerald-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
              Won
            </span>
          </div>
        </div>

        {/* Top Performing Agents (3 cols) */}
        <div className="col-span-3 bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-xs">Top Performing Agents</h3>
            <select className="text-[10px] text-slate-500 font-medium bg-slate-50 border border-slate-200/60 rounded px-1.5 py-0.5 outline-none">
              <option>This Month</option>
            </select>
          </div>

          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-xs font-bold text-slate-400">1</span>
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&auto=format&fit=crop&q=80"
                alt="Rahul Varma"
                className="w-7 h-7 rounded-full object-cover"
              />
              <span className="text-xs font-bold text-slate-900">Rahul Varma</span>
            </div>
            <span className="text-xs font-bold text-slate-900 font-mono">₹ 12,40,000</span>
          </div>
        </div>

        {/* Quick Actions (3 cols) */}
        <div className="col-span-3 bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs flex flex-col justify-between">
          <h3 className="font-bold text-slate-900 text-xs">Quick Actions</h3>

          <div className="flex items-center justify-between mt-3 gap-1">
            <Link href="/leads" className="flex flex-col items-center gap-1 group">
              <div className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center text-slate-600 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                <UserPlus className="w-4 h-4" />
              </div>
              <span className="text-[9px] font-bold text-slate-500">Add Lead</span>
            </Link>

            <Link href="/deals" className="flex flex-col items-center gap-1 group">
              <div className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center text-slate-600 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                <Briefcase className="w-4 h-4" />
              </div>
              <span className="text-[9px] font-bold text-slate-500">Add Deal</span>
            </Link>

            <Link href="/tasks" className="flex flex-col items-center gap-1 group">
              <div className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center text-slate-600 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                <CheckSquare className="w-4 h-4" />
              </div>
              <span className="text-[9px] font-bold text-slate-500">Add Task</span>
            </Link>

            <Link href="/tickets" className="flex flex-col items-center gap-1 group">
              <div className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center text-slate-600 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                <LifeBuoy className="w-4 h-4" />
              </div>
              <span className="text-[9px] font-bold text-slate-500">New Ticket</span>
            </Link>

            <Link href="/inbox" className="flex flex-col items-center gap-1 group">
              <div className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center text-slate-600 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                <MessageSquare className="w-4 h-4" />
              </div>
              <span className="text-[9px] font-bold text-slate-500">New Message</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
