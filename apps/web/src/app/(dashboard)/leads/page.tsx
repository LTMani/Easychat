'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Target, Plus, ArrowRight, CheckCircle } from 'lucide-react';
import { NotificationBell } from '../../../components/NotificationBell';

export default function LeadsPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    contactName: '',
    email: '',
    phone: '',
    source: 'WEBSITE',
  });

  const fetchLeads = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) return;
      const res = await fetch('http://localhost:4000/api/v1/crm/leads', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok && data.data) {
        setLeads(data.data);
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleCreateLead = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('accessToken');
      const res = await fetch('http://localhost:4000/api/v1/crm/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setShowModal(false);
        setFormData({ title: '', contactName: '', email: '', phone: '', source: 'WEBSITE' });
        fetchLeads();
      }
    } catch (err) {}
  };

  const handleConvertLead = async (leadId: string) => {
    try {
      const token = localStorage.getItem('accessToken');
      const res = await fetch(`http://localhost:4000/api/v1/crm/leads/${leadId}/convert`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        alert('Lead successfully converted into Contact and Deal!');
        fetchLeads();
      }
    } catch (err) {}
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Link href="/" className="w-8 h-8 bg-blue-600 rounded-lg text-white font-bold flex items-center justify-center">
            E
          </Link>
          <h1 className="text-xl font-bold text-slate-900">Sales Leads & Qualification</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/contacts" className="text-sm font-medium text-slate-600 hover:text-slate-900">
            Contacts
          </Link>
          <Link href="/deals" className="text-sm font-medium text-slate-600 hover:text-slate-900">
            Deals
          </Link>
          <NotificationBell />
        </div>
      </header>

      <main className="max-w-6xl w-full mx-auto px-6 py-8 flex-1">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Leads Management</h2>
            <p className="text-sm text-slate-500 mt-1">Incoming lead sources, qualification scores, and deal conversion</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-lg shadow-sm flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Lead</span>
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12 text-slate-500">Loading leads...</div>
        ) : leads.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-xl border border-slate-200 text-slate-500">
            No leads recorded yet. Click 'Add Lead' to log a new sales inquiry!
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm divide-y divide-slate-100">
            {leads.map((lead) => (
              <div key={lead.id} className="p-4 flex items-center justify-between hover:bg-slate-50">
                <div>
                  <div className="flex items-center space-x-3">
                    <span className="font-bold text-slate-900 text-base">{lead.title}</span>
                    <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                      Score: {lead.score}
                    </span>
                    <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-slate-100 text-slate-600">
                      {lead.source}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    Contact: <span className="font-semibold text-slate-700">{lead.contactName}</span> ({lead.email})
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-md uppercase ${
                      lead.status === 'CONVERTED'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-50 text-yellow-800 border border-yellow-200'
                    }`}
                  >
                    {lead.status}
                  </span>

                  {lead.status !== 'CONVERTED' && (
                    <button
                      onClick={() => handleConvertLead(lead.id)}
                      className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white font-semibold text-xs rounded-lg shadow-sm flex items-center space-x-1"
                    >
                      <span>Convert to Deal</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {showModal && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl border border-slate-200 p-6 max-w-md w-full shadow-lg">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Create New Sales Lead</h3>
            <form onSubmit={handleCreateLead} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Lead Title / Interest</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enterprise License Inquiry"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Contact Name</label>
                <input
                  type="text"
                  required
                  value={formData.contactName}
                  onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                  placeholder="John Smith"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Work Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@company.com"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Lead Source</label>
                <select
                  value={formData.source}
                  onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                >
                  <option value="WEBSITE">Website</option>
                  <option value="CHAT">Live Chat</option>
                  <option value="REFERRAL">Referral</option>
                  <option value="COLD_OUTREACH">Cold Outreach</option>
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
                  Save Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
