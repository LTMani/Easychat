'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BookOpen, Plus, Search, Eye } from 'lucide-react';
import { NotificationBell } from '../../../components/NotificationBell';

export default function KnowledgeBasePage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: 'General',
    content: '',
  });

  const fetchArticles = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) return;
      const res = await fetch('http://localhost:4000/api/v1/support/knowledge-base/articles', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok && data.data) {
        setArticles(data.data);
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleCreateArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('accessToken');
      const res = await fetch('http://localhost:4000/api/v1/support/knowledge-base/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setShowModal(false);
        setFormData({ title: '', category: 'General', content: '' });
        fetchArticles();
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
          <h1 className="text-xl font-bold text-slate-900">Support Knowledge Base</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/tickets" className="text-sm font-medium text-slate-600 hover:text-slate-900">
            Tickets Queue
          </Link>
          <NotificationBell />
        </div>
      </header>

      <main className="max-w-6xl w-full mx-auto px-6 py-8 flex-1">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Knowledge Base Articles</h2>
            <p className="text-sm text-slate-500 mt-1">Documentation, resolution guides, and customer self-service</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-lg shadow-sm flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Publish Article</span>
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12 text-slate-500">Loading support articles...</div>
        ) : articles.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-xl border border-slate-200 text-slate-500">
            No published articles yet. Click 'Publish Article' to add documentation!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles.map((art) => (
              <div key={art.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2.5 py-0.5 text-xs font-semibold bg-blue-50 text-blue-700 rounded-md border border-blue-100">
                    {art.category}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center space-x-1">
                    <Eye className="w-3.5 h-3.5" />
                    <span>{art.viewCount} views</span>
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">{art.title}</h3>
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">{art.content}</p>
                <div className="mt-4 pt-3 border-t border-slate-100 text-[10px] text-slate-400">
                  Author: {art.author?.firstName} {art.author?.lastName} | {new Date(art.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {showModal && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl border border-slate-200 p-6 max-w-md w-full shadow-lg">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Publish Knowledge Base Article</h3>
            <form onSubmit={handleCreateArticle} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="How to configure Socket.IO WebSockets"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Category</label>
                <input
                  type="text"
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="API & Webhooks"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Content (Markdown)</label>
                <textarea
                  required
                  rows={4}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Article instructions..."
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
                  Publish Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
