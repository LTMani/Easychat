'use client';

import React, { useState } from 'react';
import { DollarSign, MoreHorizontal, Plus, User, Building } from 'lucide-react';

export interface KanbanDeal {
  id: string;
  title: string;
  amount: number;
  currency: string;
  companyName: string;
  contactName: string;
  stageId: string;
}

export interface KanbanStage {
  id: string;
  name: string;
  probability: number;
  color: string;
}

const DEFAULT_STAGES: KanbanStage[] = [
  { id: 'st_1', name: 'Prospecting', probability: 10, color: 'border-t-blue-500' },
  { id: 'st_2', name: 'Qualification', probability: 25, color: 'border-t-indigo-500' },
  { id: 'st_3', name: 'Proposal', probability: 60, color: 'border-t-purple-500' },
  { id: 'st_4', name: 'Negotiation', probability: 85, color: 'border-t-amber-500' },
  { id: 'st_5', name: 'Closed Won', probability: 100, color: 'border-t-emerald-500' },
];

const SAMPLE_DEALS: KanbanDeal[] = [
  { id: 'd1', title: 'Enterprise Omnichannel License', amount: 96000, currency: 'USD', companyName: 'Acme Corp', contactName: 'Jonathan Vance', stageId: 'st_3' },
  { id: 'd2', title: 'WhatsApp Broadcast Expansion', amount: 24000, currency: 'USD', companyName: 'FinTech Velocity', contactName: 'Kathrin Mueller', stageId: 'st_2' },
  { id: 'd3', title: 'Global Multi-Region Cloud', amount: 145000, currency: 'USD', companyName: 'GlobalRetail Inc', contactName: 'Charlotte Dubois', stageId: 'st_4' },
  { id: 'd4', title: 'Security & SAML Add-on', amount: 18000, currency: 'USD', companyName: 'Nordic Health', contactName: 'Marcus Aurelius', stageId: 'st_1' },
  { id: 'd5', title: 'Annual Support Upgrade', amount: 54000, currency: 'USD', companyName: 'Tokyo Robotics', contactName: 'Hiroshi Tanaka', stageId: 'st_5' },
];

export function KanbanBoard() {
  const [deals, setDeals] = useState<KanbanDeal[]>(SAMPLE_DEALS);

  const moveDeal = (dealId: string, targetStageId: string) => {
    setDeals((prev) =>
      prev.map((d) => (d.id === dealId ? { ...d, stageId: targetStageId } : d)),
    );
  };

  return (
    <div className="grid grid-cols-5 gap-4 overflow-x-auto pb-4">
      {DEFAULT_STAGES.map((stage) => {
        const stageDeals = deals.filter((d) => d.stageId === stage.id);
        const stageTotal = stageDeals.reduce((sum, d) => sum + d.amount, 0);

        return (
          <div
            key={stage.id}
            className={`bg-slate-50/80 rounded-2xl border border-slate-200 border-t-4 ${stage.color} p-4 flex flex-col min-h-[500px] shadow-sm`}
          >
            {/* Column Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-3">
              <div>
                <h4 className="font-bold text-slate-900 text-xs">{stage.name}</h4>
                <p className="text-[10px] text-slate-500 font-mono font-medium">
                  ${stageTotal.toLocaleString()} ({stage.probability}%)
                </p>
              </div>
              <span className="bg-slate-200 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                {stageDeals.length}
              </span>
            </div>

            {/* Cards */}
            <div className="space-y-3 flex-1">
              {stageDeals.map((deal) => (
                <div
                  key={deal.id}
                  className="bg-white rounded-xl border border-slate-200 p-3 shadow-xs hover:shadow-md transition-all space-y-2 cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <h5 className="font-bold text-xs text-slate-900 line-clamp-1">{deal.title}</h5>
                    <button className="text-slate-400 hover:text-slate-600">
                      <MoreHorizontal className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <p className="font-mono font-bold text-sm text-emerald-600">
                    ${deal.amount.toLocaleString()} {deal.currency}
                  </p>

                  <div className="pt-2 border-t border-slate-100 text-[10px] text-slate-500 space-y-1">
                    <div className="flex items-center gap-1">
                      <Building className="w-3 h-3 text-slate-400" />
                      <span>{deal.companyName}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3 text-slate-400" />
                      <span>{deal.contactName}</span>
                    </div>
                  </div>

                  {/* Stage Advance Buttons */}
                  <div className="pt-2 flex items-center justify-between gap-1 border-t border-slate-50 text-[9px]">
                    {DEFAULT_STAGES.map((st) => (
                      <button
                        key={st.id}
                        onClick={() => moveDeal(deal.id, st.id)}
                        disabled={deal.stageId === st.id}
                        className={`px-1.5 py-0.5 rounded font-bold transition-colors ${
                          deal.stageId === st.id
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                        }`}
                      >
                        {st.name.slice(0, 3)}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <button className="mt-3 w-full py-2 border border-dashed border-slate-300 hover:border-slate-400 hover:bg-white rounded-xl text-[10px] font-bold text-slate-500 flex items-center justify-center gap-1 transition-colors">
              <Plus className="w-3 h-3" /> Add Deal
            </button>
          </div>
        );
      })}
    </div>
  );
}
