'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { LifeBuoy, Plus, AlertCircle, Clock, CheckCircle, MessageSquare } from 'lucide-react';
import { NotificationBell } from '../../../components/NotificationBell';

export default function TicketsPage() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [activeTicket, setActiveTicket] = useState<any>(null);
  const [commentText, setCommentText] = useState('');
  const [isInternalNote, setIsInternalNote] = useState(false);
  const [formData, setFormData] = useState({
    subject: '',
    description: '',
    priority: 'MEDIUM',
  });

  const fetchTickets = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) return;
      const res = await fetch('http://localhost:4000/api/v1/support/tickets', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok && data.data) {
        setTickets(data.data);
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('accessToken');
      const res = await fetch('http://localhost:4000/api/v1/support/tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setShowModal(false);
        setFormData({ subject: '', description: '', priority: 'MEDIUM' });
        fetchTickets();
      }
    } catch (err) {}
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeTicket || !commentText.trim()) return;

    try {
      const token = localStorage.getItem('accessToken');
      const res = await fetch('http://localhost:4000/api/v1/support/tickets/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ticketId: activeTicket.id,
          content: commentText,
          isInternal: isInternalNote,
        }),
      });

      if (res.ok) {
        setCommentText('');
        fetchTickets();
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
          <h1 className="text-xl font-bold text-slate-900">Support Desk & SLA Engine</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/knowledge-base" className="text-sm font-medium text-slate-600 hover:text-slate-900">
            Knowledge Base
          </Link>
          <NotificationBell />
        </div>
      </header>

      <main className="max-w-6xl w-full mx-auto px-6 py-8 flex-1">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Support Tickets Queue</h2>
            <p className="text-sm text-slate-500 mt-1">Priority routing, SLA breach detection, and agent assignment</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-lg shadow-sm flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Create Ticket</span>
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12 text-slate-500">Loading support queue...</div>
        ) : tickets.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-xl border border-slate-200 text-slate-500">
            No active support tickets. All customer requests are resolved!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm divide-y divide-slate-100">
              {tickets.map((ticket) => (
                <div
                  key={ticket.id}
                  onClick={() => setActiveTicket(ticket)}
                  className={`p-4 cursor-pointer hover:bg-slate-50 flex items-center justify-between ${
                    activeTicket?.id === ticket.id ? 'bg-blue-50/60 border-l-4 border-blue-600' : ''
                  }`}
                >
                  <div>
                    <div className="flex items-center space-x-3">
                      <span className="font-mono text-xs font-bold text-slate-400">{ticket.ticketNumber}</span>
                      <span className="font-bold text-slate-900 text-base">{ticket.subject}</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-1">{ticket.description}</p>
                  </div>

                  <div className="flex items-center space-x-3">
                    {ticket.isSlaBreached && (
                      <span className="px-2 py-0.5 text-[10px] font-bold bg-red-50 text-red-600 border border-red-200 rounded flex items-center space-x-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>SLA Breach</span>
                      </span>
                    )}
                    <span
                      className={`px-2.5 py-0.5 text-xs font-semibold uppercase rounded ${
                        ticket.priority === 'URGENT'
                          ? 'bg-red-100 text-red-700'
                          : ticket.priority === 'HIGH'
                          ? 'bg-orange-100 text-orange-700'
                          : 'bg-blue-50 text-blue-700'
                      }`}
                    >
                      {ticket.priority}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Ticket Details & Comments Sidebar */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
              {activeTicket ? (
                <>
                  <div className="pb-4 border-b border-slate-100 mb-4">
                    <span className="font-mono text-xs text-slate-400">{activeTicket.ticketNumber}</span>
                    <h3 className="font-bold text-slate-900 text-lg mt-0.5">{activeTicket.subject}</h3>
                    <p className="text-xs text-slate-600 mt-2 bg-slate-50 p-3 rounded-lg border border-slate-100">
                      {activeTicket.description}
                    </p>
                  </div>

                  {/* Thread Comments */}
                  <div className="flex-1 overflow-y-auto space-y-3 mb-4 max-h-60">
                    {activeTicket.comments?.map((c: any) => (
                      <div
                        key={c.id}
                        className={`p-3 rounded-lg text-xs border ${
                          c.isInternal ? 'bg-amber-50 border-amber-200 text-amber-900' : 'bg-slate-50 border-slate-200 text-slate-800'
                        }`}
                      >
                        <div className="flex items-center justify-between font-bold mb-1">
                          <span>{c.user?.firstName} {c.user?.lastName} {c.isInternal ? '(Internal Note)' : ''}</span>
                          <span className="text-[10px] font-normal text-slate-400">
                            {new Date(c.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <p>{c.content}</p>
                      </div>
                    ))}
                  </div>

                  {/* Add Comment Form */}
                  <form onSubmit={handleAddComment} className="space-y-2 pt-2 border-t border-slate-100">
                    <textarea
                      required
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder="Write response or internal agent note..."
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                      rows={2}
                    />
                    <div className="flex items-center justify-between">
                      <label className="flex items-center space-x-1.5 text-xs text-slate-600">
                        <input
                          type="checkbox"
                          checked={isInternalNote}
                          onChange={(e) => setIsInternalNote(e.target.checked)}
                          className="rounded text-blue-600"
                        />
                        <span>Internal Note</span>
                      </label>
                      <button
                        type="submit"
                        className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg shadow-sm"
                      >
                        Send Note
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-slate-400 text-xs">
                  Select a ticket from queue to view conversation thread
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {showModal && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl border border-slate-200 p-6 max-w-md w-full shadow-lg">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Create Support Ticket</h3>
            <form onSubmit={handleCreateTicket} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Subject</label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. Cannot access API webhooks"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Priority</label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                >
                  <option value="URGENT">Urgent (15-min SLA)</option>
                  <option value="HIGH">High (2-hour SLA)</option>
                  <option value="MEDIUM">Medium (8-hour SLA)</option>
                  <option value="LOW">Low (24-hour SLA)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Description</label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Provide problem details..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                />
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
                  Create Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
