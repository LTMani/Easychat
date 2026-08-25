'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Code, Key, Webhook, Plus, Copy } from 'lucide-react';
import { NotificationBell } from '../../../components/NotificationBell';

export default function DeveloperPage() {
  const [apiKeys, setApiKeys] = useState<any[]>([]);
  const [webhooks, setWebhooks] = useState<any[]>([]);
  const [keyName, setKeyName] = useState('');
  const [webhookUrl, setWebhookUrl] = useState('');
  const [createdKey, setCreatedKey] = useState<string | null>(null);

  const fetchPlatformData = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) return;
      const resKeys = await fetch('http://localhost:4000/api/v1/platform/api-keys', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const dataKeys = await resKeys.json();
      if (resKeys.ok && dataKeys.data) setApiKeys(dataKeys.data);

      const resWh = await fetch('http://localhost:4000/api/v1/platform/webhooks', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const dataWh = await resWh.json();
      if (resWh.ok && dataWh.data) setWebhooks(dataWh.data);
    } catch (err) {}
  };

  useEffect(() => {
    fetchPlatformData();
  }, []);

  const handleCreateKey = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyName.trim()) return;
    try {
      const token = localStorage.getItem('accessToken');
      const res = await fetch('http://localhost:4000/api/v1/platform/api-keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ name: keyName }),
      });
      const data = await res.json();
      if (res.ok && data.data) {
        setCreatedKey(data.data.key);
        setKeyName('');
        fetchPlatformData();
      }
    } catch (err) {}
  };

  const handleCreateWebhook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!webhookUrl.trim()) return;
    try {
      const token = localStorage.getItem('accessToken');
      const res = await fetch('http://localhost:4000/api/v1/platform/webhooks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ url: webhookUrl, events: ['lead.created', 'deal.won'] }),
      });
      if (res.ok) {
        setWebhookUrl('');
        fetchPlatformData();
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
          <h1 className="text-xl font-bold text-slate-900">Developer Portal & Integrations</h1>
        </div>
        <NotificationBell />
      </header>

      <main className="max-w-6xl w-full mx-auto px-6 py-8 flex-1 space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">REST API Keys & Webhooks Engine</h2>
          <p className="text-sm text-slate-500 mt-1">Manage public API access keys, OAuth apps, and live webhook subscriptions</p>
        </div>

        {/* API Keys Section */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-lg flex items-center space-x-2">
              <Key className="w-5 h-5 text-blue-600" />
              <span>API Keys</span>
            </h3>
          </div>

          {createdKey && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-xl text-xs text-green-900">
              <strong>Save your API Key now! It will not be shown again:</strong>
              <div className="font-mono bg-white p-2 border border-green-300 rounded mt-1 select-all">{createdKey}</div>
            </div>
          )}

          <form onSubmit={handleCreateKey} className="flex items-center space-x-3">
            <input
              type="text"
              required
              value={keyName}
              onChange={(e) => setKeyName(e.target.value)}
              placeholder="e.g. Zapier Production Key"
              className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm"
            />
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white font-semibold text-sm rounded-lg shadow-sm">
              Generate Key
            </button>
          </form>

          <div className="divide-y divide-slate-100">
            {apiKeys.map((k) => (
              <div key={k.id} className="py-3 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-900">{k.name}</span>
                  <span className="font-mono text-slate-400 ml-3">{k.prefix}...</span>
                </div>
                <span className="text-slate-400">{new Date(k.createdAt).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Webhooks Section */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-lg flex items-center space-x-2">
              <Webhook className="w-5 h-5 text-purple-600" />
              <span>Webhook Endpoints</span>
            </h3>
          </div>

          <form onSubmit={handleCreateWebhook} className="flex items-center space-x-3">
            <input
              type="url"
              required
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              placeholder="https://api.yourcompany.com/webhooks/easychat"
              className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm"
            />
            <button type="submit" className="px-4 py-2 bg-purple-600 text-white font-semibold text-sm rounded-lg shadow-sm">
              Add Endpoint
            </button>
          </form>

          <div className="divide-y divide-slate-100">
            {webhooks.map((w) => (
              <div key={w.id} className="py-3 flex items-center justify-between text-xs">
                <span className="font-mono text-slate-800">{w.url}</span>
                <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded font-mono">{w.events?.join(', ')}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
