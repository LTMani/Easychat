'use client';

import React, { useState } from 'react';
import { User, Building, Phone, Mail, FileText, CheckSquare, DollarSign, Calendar, Clock, Plus, Tag, ArrowRight, MessageSquare, ShieldCheck, Pin } from 'lucide-react';

export interface Customer360WorkspaceProps {
  contact: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    jobTitle?: string;
    tags?: string;
    company?: {
      name: string;
      industry?: string;
      employeeCount?: number;
    };
    deals?: Array<{
      id: string;
      title: string;
      amount: number;
      stage: { name: string; color: string };
    }>;
    tasks?: Array<{
      id: string;
      title: string;
      status: string;
      assignedTo: { firstName: string; lastName: string };
    }>;
    documents?: Array<{
      id: string;
      fileName: string;
      fileSize: number;
      createdAt: string;
    }>;
  };
}

export function Customer360Workspace({ contact }: Customer360WorkspaceProps) {
  const [activeTab, setActiveTab] = useState<'TIMELINE' | 'DEALS' | 'TASKS' | 'DOCUMENTS' | 'NOTES'>('TIMELINE');
  const [noteContent, setNoteContent] = useState('');
  const [notes, setNotes] = useState<Array<{ id: string; author: string; content: string; date: string; pinned: boolean }>>([
    {
      id: 'note-1',
      author: 'System Admin',
      content: 'Customer is requesting Okta SAML 2.0 integration setup guide for 500-seat deployment.',
      date: '2 hours ago',
      pinned: true,
    },
  ]);

  const parsedTags: string[] = (() => {
    try {
      return typeof contact.tags === 'string' ? JSON.parse(contact.tags) : contact.tags || [];
    } catch {
      return [];
    }
  })();

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteContent.trim()) return;

    setNotes([
      {
        id: `note-${Date.now()}`,
        author: 'Current Agent',
        content: noteContent,
        date: 'Just now',
        pinned: false,
      },
      ...notes,
    ]);
    setNoteContent('');
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col space-y-6 p-6">
      {/* Customer Header Summary Card */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-full bg-blue-600 text-white font-black text-xl flex items-center justify-center shadow-md">
            {contact.firstName.charAt(0)}
          </div>
          <div>
            <div className="flex items-center space-x-3">
              <h2 className="text-xl font-bold text-slate-900">
                {contact.firstName} {contact.lastName}
              </h2>
              <span className="px-2.5 py-0.5 text-[10px] font-extrabold bg-blue-50 text-blue-700 border border-blue-200 rounded-full uppercase">
                Customer 360 Profile
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {contact.jobTitle || 'Decision Maker'} {contact.company?.name ? `at ${contact.company.name}` : ''}
            </p>
            <div className="flex items-center space-x-2 mt-2">
              {parsedTags.map((tag) => (
                <span key={tag} className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[10px] font-bold rounded">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Contact Actions */}
        <div className="flex items-center space-x-3">
          <div className="text-right text-xs">
            <div className="text-slate-400">Primary Email</div>
            <div className="font-bold text-slate-900">{contact.email}</div>
          </div>
          <div className="text-right text-xs border-l border-slate-200 pl-3">
            <div className="text-slate-400">Phone Number</div>
            <div className="font-bold text-slate-900">{contact.phone || '+1-555-0192'}</div>
          </div>
        </div>
      </div>

      {/* Tabs Toolbar */}
      <div className="flex items-center space-x-2 border-b border-slate-200 pb-2 text-xs font-bold text-slate-600">
        {(['TIMELINE', 'DEALS', 'TASKS', 'DOCUMENTS', 'NOTES'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === tab ? 'bg-blue-600 text-white shadow-sm' : 'hover:bg-slate-100 text-slate-600'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Main Tab Content */}
      <div className="min-h-[300px]">
        {activeTab === 'TIMELINE' && (
          <div className="space-y-4">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-700">Unified Relationship History</h4>
            <div className="relative border-l-2 border-slate-200 ml-4 pl-6 space-y-6">
              <div className="relative">
                <div className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-blue-600 border-2 border-white" />
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-slate-900">WhatsApp Discussion Initiated</span>
                    <span className="text-slate-400">10:42 AM</span>
                  </div>
                  <p className="text-xs text-slate-600">Requested 15-minute meeting regarding enterprise proposal SLA terms.</p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-green-500 border-2 border-white" />
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-slate-900">Sales Deal Moved to Negotiation Stage</span>
                    <span className="text-slate-400">Yesterday</span>
                  </div>
                  <p className="text-xs text-slate-600">Deal value $125,000 advanced with 80% probability forecast.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'NOTES' && (
          <div className="space-y-4">
            <form onSubmit={handleAddNote} className="space-y-2">
              <textarea
                rows={3}
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                placeholder="Add a customer note..."
                className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg shadow-sm"
              >
                Post Customer Note
              </button>
            </form>

            <div className="space-y-3">
              {notes.map((n) => (
                <div key={n.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900 flex items-center space-x-1">
                      {n.pinned && <Pin className="w-3 h-3 text-amber-500 fill-amber-500" />}
                      <span>{n.author}</span>
                    </span>
                    <span className="text-[10px] text-slate-400">{n.date}</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">{n.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
