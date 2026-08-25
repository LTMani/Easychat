'use client';

import React, { useState } from 'react';
import { BookOpen, GitBranch, History, Eye, CheckCircle2, Edit3, Plus } from 'lucide-react';

export default function KnowledgeBaseManagerPage() {
  const [articles, setArticles] = useState([
    { id: 'art_101', title: 'Setting up WebRTC SIP Voice Trunks', version: 3, isPublished: true, views: 1240, category: 'Telephony', updatedAt: '2026-08-22' },
    { id: 'art_102', title: 'Configuring Zapier Webhook Dispatches', version: 1, isPublished: false, views: 0, category: 'Integrations', updatedAt: '2026-08-25' },
  ]);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
            <BookOpen className="w-7 h-7 text-blue-600" />
            Knowledge Base Article & Version Manager
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage help center documentation, draft revisions, version histories, and SEO slugs.
          </p>
        </div>

        <button className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-2 transition-colors">
          <Plus className="w-4 h-4" />
          Create New Article Draft
        </button>
      </div>

      {/* Article List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold text-[10px]">
            <tr>
              <th className="p-4">Article Title</th>
              <th className="p-4">Category</th>
              <th className="p-4">Active Version</th>
              <th className="p-4">Total Views</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {articles.map((art) => (
              <tr key={art.id} className="hover:bg-slate-50">
                <td className="p-4 font-bold text-slate-900 flex items-center gap-2">
                  <Edit3 className="w-4 h-4 text-blue-600" />
                  {art.title}
                </td>
                <td className="p-4">
                  <span className="px-2 py-0.5 bg-slate-100 font-bold text-[10px] rounded uppercase">
                    {art.category}
                  </span>
                </td>
                <td className="p-4 font-mono font-bold text-slate-700 flex items-center gap-1">
                  <GitBranch className="w-3.5 h-3.5 text-purple-600" />
                  v{art.version}
                </td>
                <td className="p-4 font-mono flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5 text-slate-400" />
                  {art.views}
                </td>
                <td className="p-4">
                  <span
                    className={`px-2.5 py-1 font-bold text-[10px] rounded-full uppercase ${
                      art.isPublished
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}
                  >
                    {art.isPublished ? 'PUBLISHED' : 'DRAFT'}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button className="text-blue-600 hover:text-blue-700 font-bold flex items-center gap-1 justify-end ml-auto">
                    <History className="w-3.5 h-3.5" />
                    Version Log
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
