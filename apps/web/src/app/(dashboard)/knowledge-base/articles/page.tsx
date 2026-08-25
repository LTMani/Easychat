'use client';

import React, { useState } from 'react';
import { BookOpen, Search, Plus, Star, Clock, Eye, ChevronRight, FileText, Edit, Filter } from 'lucide-react';

const ARTICLES = [
  { id: 'a1', title: 'How to import contacts from a CSV file', category: 'Getting Started', status: 'PUBLISHED', views: 1842, helpful: 94, author: 'Alex M.', updatedAt: '2026-08-20', featured: true },
  { id: 'a2', title: 'Setting up WhatsApp Business API integration', category: 'Integrations', status: 'PUBLISHED', views: 1231, helpful: 88, author: 'Priya S.', updatedAt: '2026-08-18', featured: false },
  { id: 'a3', title: 'Understanding SLA policies and breach alerts', category: 'Support', status: 'PUBLISHED', views: 784, helpful: 91, author: 'Jordan B.', updatedAt: '2026-08-15', featured: false },
  { id: 'a4', title: 'Configuring SAML SSO with Okta', category: 'Security', status: 'PUBLISHED', views: 612, helpful: 96, author: 'Sam C.', updatedAt: '2026-08-12', featured: false },
  { id: 'a5', title: 'Building automation workflows with triggers', category: 'Automation', status: 'DRAFT', views: 0, helpful: 0, author: 'Emily T.', updatedAt: '2026-08-24', featured: false },
  { id: 'a6', title: 'Using the AI Copilot for conversation suggestions', category: 'AI Features', status: 'PUBLISHED', views: 2109, helpful: 97, author: 'Alex M.', updatedAt: '2026-08-22', featured: true },
];

const CATEGORIES = ['All', 'Getting Started', 'Integrations', 'Support', 'Security', 'Automation', 'AI Features'];

export default function KnowledgeBaseAdminPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'PUBLISHED' | 'DRAFT'>('ALL');

  const filtered = ARTICLES.filter((a) => {
    if (search && !a.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (category !== 'All' && a.category !== category) return false;
    if (statusFilter !== 'ALL' && a.status !== statusFilter) return false;
    return true;
  });

  const totalPublished = ARTICLES.filter((a) => a.status === 'PUBLISHED').length;
  const totalViews = ARTICLES.reduce((acc, a) => acc + a.views, 0);
  const avgHelpful = Math.round(ARTICLES.filter((a) => a.helpful > 0).reduce((acc, a) => acc + a.helpful, 0) / ARTICLES.filter((a) => a.helpful > 0).length);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
            <BookOpen className="w-7 h-7 text-blue-600" />
            Knowledge Base Article Manager
          </h1>
          <p className="text-sm text-slate-500 mt-1">Create, edit, and publish self-service help articles for customers and agents.</p>
        </div>
        <button className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-2">
          <Plus className="w-4 h-4" />New Article
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-5">
        {[
          { icon: FileText, label: 'Published Articles', value: totalPublished.toString(), color: 'text-blue-500' },
          { icon: Eye, label: 'Total Article Views', value: totalViews.toLocaleString(), color: 'text-purple-500' },
          { icon: Star, label: 'Avg Helpfulness', value: `${avgHelpful}%`, color: 'text-amber-500' },
          { icon: Clock, label: 'Articles in Draft', value: ARTICLES.filter((a) => a.status === 'DRAFT').length.toString(), color: 'text-slate-500' },
        ].map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div key={idx} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-2">
              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase"><Icon className={`w-4 h-4 ${kpi.color}`} />{kpi.label}</div>
              <p className="text-2xl font-bold text-slate-900">{kpi.value}</p>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search articles..." className="w-full pl-9 pr-4 py-2.5 text-xs border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-slate-500" />
          {(['ALL', 'PUBLISHED', 'DRAFT'] as const).map((s) => (
            <button key={s} onClick={() => setStatusFilter(s)} className={`px-3 py-1.5 text-[10px] font-bold rounded-full border transition-colors ${statusFilter === s ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}>{s}</button>
          ))}
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {CATEGORIES.map((cat) => (
          <button key={cat} onClick={() => setCategory(cat)} className={`whitespace-nowrap px-3 py-1.5 text-xs font-bold rounded-full border transition-colors ${category === cat ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}>{cat}</button>
        ))}
      </div>

      {/* Articles List */}
      <div className="space-y-3">
        {filtered.map((article) => (
          <div key={article.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 hover:border-blue-300 transition-colors">
            <div className="flex items-start gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  {article.featured && <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />}
                  <h3 className="font-bold text-slate-900 text-sm">{article.title}</h3>
                  <span className={`border px-2 py-0.5 rounded-full text-[10px] font-bold ${article.status === 'PUBLISHED' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-50 text-slate-500 border-slate-200'}`}>{article.status}</span>
                </div>
                <div className="flex items-center gap-4 text-[10px] text-slate-500 font-medium">
                  <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-bold">{article.category}</span>
                  <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{article.views.toLocaleString()} views</span>
                  {article.helpful > 0 && <span className="flex items-center gap-1"><Star className="w-3 h-3 text-amber-400" />{article.helpful}% helpful</span>}
                  <span>By {article.author}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />Updated {article.updatedAt}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 text-[10px] font-bold border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 flex items-center gap-1">
                  <Edit className="w-3 h-3" />Edit
                </button>
                <button className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
