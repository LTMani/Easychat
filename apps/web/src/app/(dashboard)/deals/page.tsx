'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { DollarSign, Plus, MoveRight, CheckCircle2, XCircle } from 'lucide-react';
import { NotificationBell } from '../../../components/NotificationBell';

export default function DealsPage() {
  const [pipeline, setPipeline] = useState<any>(null);
  const [deals, setDeals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    stageId: '',
  });

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) return;

      const [pipesRes, dealsRes] = await Promise.all([
        fetch('http://localhost:4000/api/v1/crm/pipelines', {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch('http://localhost:4000/api/v1/crm/deals', {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const pipesData = await pipesRes.json();
      const dealsData = await dealsRes.json();

      if (pipesRes.ok && pipesData.data?.[0]) {
        setPipeline(pipesData.data[0]);
      }
      if (dealsRes.ok && dealsData.data) {
        setDeals(dealsData.data);
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateDeal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pipeline) return;

    try {
      const token = localStorage.getItem('accessToken');
      const res = await fetch('http://localhost:4000/api/v1/crm/deals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          pipelineId: pipeline.id,
          stageId: formData.stageId || pipeline.stages?.[0]?.id,
          title: formData.title,
          amount: parseFloat(formData.amount || '0'),
        }),
      });

      if (res.ok) {
        setShowModal(false);
        setFormData({ title: '', amount: '', stageId: '' });
        fetchData();
      }
    } catch (err) {}
  };

  const handleMoveStage = async (dealId: string, currentStageId: string) => {
    if (!pipeline || !pipeline.stages) return;
    const stages = pipeline.stages;
    const currentIndex = stages.findIndex((s: any) => s.id === currentStageId);
    if (currentIndex < 0 || currentIndex >= stages.length - 1) return;

    const nextStage = stages[currentIndex + 1];

    try {
      const token = localStorage.getItem('accessToken');
      const res = await fetch(`http://localhost:4000/api/v1/crm/deals/${dealId}/stage`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          stageId: nextStage.id,
        }),
      });

      if (res.ok) {
        fetchData();
      }
    } catch (err) {}
  };

  const totalPipelineValue = deals.reduce((acc, d) => acc + (Number(d.amount) || 0), 0);

  return (
    <div className="h-screen bg-slate-50 flex flex-col">
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Link href="/" className="w-8 h-8 bg-blue-600 rounded-lg text-white font-bold flex items-center justify-center">
            E
          </Link>
          <h1 className="text-xl font-bold text-slate-900">Deals & Sales Pipeline Kanban</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/contacts" className="text-sm font-medium text-slate-600 hover:text-slate-900">
            Contacts
          </Link>
          <Link href="/leads" className="text-sm font-medium text-slate-600 hover:text-slate-900">
            Leads
          </Link>
          <NotificationBell />
        </div>
      </header>

      <div className="px-6 py-4 bg-white border-b border-slate-200 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            {pipeline?.name || 'Standard Sales Pipeline'}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Total Pipeline Value: <span className="font-bold text-green-600">${totalPipelineValue.toLocaleString()}</span> ({deals.length} Active Deals)
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-lg shadow-sm flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>New Deal</span>
        </button>
      </div>

      {/* Interactive Kanban Board */}
      <div className="flex-1 p-6 overflow-x-auto">
        {loading ? (
          <div className="text-center py-12 text-slate-500">Loading sales pipeline...</div>
        ) : (
          <div className="flex space-x-6 h-full min-w-max">
            {pipeline?.stages?.map((stage: any) => {
              const stageDeals = deals.filter((d) => d.stageId === stage.id);
              const stageTotal = stageDeals.reduce((acc, d) => acc + (Number(d.amount) || 0), 0);

              return (
                <div key={stage.id} className="w-80 bg-slate-100/70 rounded-xl p-4 flex flex-col h-full border border-slate-200">
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-200">
                    <div className="flex items-center space-x-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: stage.color || '#0284c7' }}
                      />
                      <span className="font-bold text-slate-900 text-sm">{stage.name}</span>
                      <span className="px-2 py-0.5 bg-slate-200 text-slate-700 text-xs font-semibold rounded-full">
                        {stageDeals.length}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-slate-600">${stageTotal.toLocaleString()}</span>
                  </div>

                  <div className="flex-1 overflow-y-auto space-y-3">
                    {stageDeals.length === 0 ? (
                      <div className="p-4 text-center text-xs text-slate-400 border border-dashed border-slate-200 rounded-lg">
                        No deals in stage
                      </div>
                    ) : (
                      stageDeals.map((deal) => (
                        <div
                          key={deal.id}
                          className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
                        >
                          <div className="font-bold text-slate-900 text-sm mb-1">{deal.title}</div>
                          <div className="text-lg font-extrabold text-green-600 mb-2">
                            ${(Number(deal.amount) || 0).toLocaleString()} <span className="text-xs font-normal text-slate-400">{deal.currency || 'USD'}</span>
                          </div>

                          {deal.contact && (
                            <div className="text-xs text-slate-500 mb-3">
                              Contact: {deal.contact.firstName} {deal.contact.lastName}
                            </div>
                          )}

                          <div className="flex justify-end pt-2 border-t border-slate-100">
                            <button
                              onClick={() => handleMoveStage(deal.id, stage.id)}
                              className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center space-x-1"
                            >
                              <span>Next Stage</span>
                              <MoveRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl border border-slate-200 p-6 max-w-md w-full shadow-lg">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Create New Deal</h3>
            <form onSubmit={handleCreateDeal} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Deal Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Acme Corp SaaS License"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Deal Amount ($)</label>
                <input
                  type="number"
                  required
                  min={0}
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  placeholder="12000"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Pipeline Stage</label>
                <select
                  value={formData.stageId}
                  onChange={(e) => setFormData({ ...formData, stageId: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                >
                  {pipeline?.stages?.map((s: any) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.probability}%)
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm"
                >
                  Create Deal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
