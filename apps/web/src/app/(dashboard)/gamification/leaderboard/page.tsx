'use client';

import React from 'react';
import { Trophy, Flame, Zap, Award, Star, Medal, Sparkles } from 'lucide-react';

const AGENTS = [
  { rank: 1, name: 'Sarah Jenkins', role: 'Senior Enterprise Lead', xp: 14500, level: 13, streak: 24, csat: '98.5%', badges: ['⚡ Speed Demon', '⭐ CSAT Champion', '🔥 24-Day Streak'], avatar: 'SJ' },
  { rank: 2, name: 'Alex Mercer', role: 'Technical Support Engineer', xp: 12200, level: 12, streak: 18, csat: '97.1%', badges: ['⚡ Speed Demon', '⭐ CSAT Champion'], avatar: 'AM' },
  { rank: 3, name: 'Priya Sharma', role: 'Support & Billing Specialist', xp: 9800, level: 10, streak: 12, csat: '96.4%', badges: ['🦉 Night Owl'], avatar: 'PS' },
  { rank: 4, name: 'Sam Chen', role: 'Customer Onboarding Architect', xp: 7400, level: 9, streak: 8, csat: '95.0%', badges: ['⭐ CSAT Champion'], avatar: 'SC' },
];

export default function GamificationLeaderboardPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shadow-sm">
            <Trophy className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Agent Gamification & XP Leaderboard</h1>
            <p className="text-sm text-slate-500 mt-1">Real-time team recognition, ticket resolution XP rewards, and daily achievement streaks.</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-2 text-xs font-bold text-amber-900 shadow-xs">
          <Sparkles className="w-4 h-4 text-amber-600" /> Season 3 Active (Ends in 12 days)
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden divide-y divide-slate-100">
        {AGENTS.map((agent) => (
          <div key={agent.rank} className="p-5 flex items-center justify-between hover:bg-slate-50/60 transition-colors">
            <div className="flex items-center gap-4">
              <span className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm ${
                agent.rank === 1 ? 'bg-amber-400 text-amber-950 shadow-sm' :
                agent.rank === 2 ? 'bg-slate-200 text-slate-800' :
                agent.rank === 3 ? 'bg-amber-700 text-amber-100' : 'text-slate-400 font-mono'
              }`}>
                {agent.rank}
              </span>

              <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                {agent.avatar}
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-slate-900 text-sm">{agent.name}</h4>
                  <span className="bg-purple-100 text-purple-800 text-[10px] font-bold px-2 py-0.5 rounded-full font-mono">
                    Lvl {agent.level}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span>{agent.role}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1 font-bold text-amber-600">
                    <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /> {agent.streak} Day Streak
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-1.5">
                {agent.badges.map((b, i) => (
                  <span key={i} className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-1 rounded-lg border border-slate-200">
                    {b}
                  </span>
                ))}
              </div>

              <div className="text-right">
                <p className="text-sm font-black text-slate-900 font-mono">{agent.xp.toLocaleString()} XP</p>
                <p className="text-[10px] font-bold text-emerald-600">{agent.csat} CSAT</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
