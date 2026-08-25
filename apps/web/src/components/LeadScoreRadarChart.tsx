'use client';

import React from 'react';
import { Target, Zap, Building2, Activity, Globe, DollarSign } from 'lucide-react';

export interface LeadScoreFactors {
  companyFit: number; // 0-100
  budgetAuthority: number; // 0-100
  engagementLevel: number; // 0-100
  productNeed: number; // 0-100
  timelineUrgency: number; // 0-100
}

export interface LeadRadarProps {
  leadName: string;
  totalScore: number;
  factors: LeadScoreFactors;
}

export function LeadScoreRadarChart({
  leadName = 'Jonathan Vance (TechAlpha)',
  totalScore = 92,
  factors = { companyFit: 95, budgetAuthority: 90, engagementLevel: 88, productNeed: 94, timelineUrgency: 85 },
}: Partial<LeadRadarProps>) {
  const DIMENSIONS = [
    { label: 'Company Fit (Firmographic)', score: factors.companyFit, icon: Building2, color: 'bg-blue-500' },
    { label: 'Budget & Authority', score: factors.budgetAuthority, icon: DollarSign, color: 'bg-emerald-500' },
    { label: 'Engagement Velocity', score: factors.engagementLevel, icon: Activity, color: 'bg-purple-500' },
    { label: 'Product Need & Tech Stack', score: factors.productNeed, icon: Zap, color: 'bg-amber-500' },
    { label: 'Timeline Urgency', score: factors.timelineUrgency, icon: Globe, color: 'bg-pink-500' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6 max-w-lg">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h3 className="font-bold text-slate-900 text-sm">{leadName}</h3>
          <p className="text-xs text-slate-500 mt-0.5">Predictive AI Lead Qualification Score</p>
        </div>
        <div className="text-right">
          <span className="text-2xl font-black text-blue-600 font-mono">{totalScore}</span>
          <span className="text-xs text-slate-400 font-bold">/100</span>
        </div>
      </div>

      <div className="space-y-4">
        {DIMENSIONS.map((dim, i) => (
          <div key={i} className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <dim.icon className="w-3.5 h-3.5 text-slate-400" />
                <span className="font-medium text-slate-700">{dim.label}</span>
              </div>
              <span className="font-bold text-slate-900 font-mono">{dim.score}%</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className={`h-full ${dim.color} rounded-full transition-all duration-500`}
                style={{ width: `${dim.score}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
