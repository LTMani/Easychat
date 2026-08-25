'use client';

import React, { useState } from 'react';
import { Beaker, Play, Copy, CheckCircle2, XCircle, Clock, Send } from 'lucide-react';

const SAMPLE_ENDPOINTS = [
  { method: 'GET', path: '/v1/contacts', description: 'List all contacts' },
  { method: 'GET', path: '/v1/contacts/:id', description: 'Get contact by ID' },
  { method: 'POST', path: '/v1/contacts', description: 'Create a new contact' },
  { method: 'GET', path: '/v1/deals', description: 'List all deals in pipelines' },
  { method: 'POST', path: '/v1/deals', description: 'Create a new deal' },
  { method: 'GET', path: '/v1/tickets', description: 'List all support tickets' },
  { method: 'POST', path: '/v1/conversations/:id/messages', description: 'Send a message' },
  { method: 'GET', path: '/v1/reports/pivot', description: 'Fetch BI pivot report' },
  { method: 'POST', path: '/v1/leads/:id/score', description: 'Score a lead' },
  { method: 'GET', path: '/v1/products', description: 'List product catalog' },
];

export default function DeveloperPlaygroundPage() {
  const [selectedEndpoint, setSelectedEndpoint] = useState(SAMPLE_ENDPOINTS[0]);
  const [apiKey, setApiKey] = useState('ech_test_•••••••••••••••••••••');
  const [baseUrl] = useState('https://api.easychat.io');
  const [responseData, setResponseData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleRun = () => {
    setLoading(true);
    setTimeout(() => {
      setResponseData(JSON.stringify({
        status: 200,
        data: { id: 'sample_001', name: 'John Doe', email: 'john@example.com', organizationId: 'org_demo' },
        meta: { timestamp: new Date().toISOString(), requestId: `req_${Math.random().toString(36).slice(2, 10)}` },
      }, null, 2));
      setStatus('success');
      setLoading(false);
    }, 800);
  };

  const methodColor: Record<string, string> = {
    GET: 'bg-emerald-100 text-emerald-700',
    POST: 'bg-blue-100 text-blue-700',
    PATCH: 'bg-amber-100 text-amber-700',
    DELETE: 'bg-red-100 text-red-700',
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
            <Beaker className="w-7 h-7 text-blue-600" />
            Developer API Playground & Testing Console
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Test EasyChat CRM REST API endpoints with your API key directly from the browser.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Endpoint Selector */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden lg:col-span-1">
          <div className="p-4 border-b border-slate-100">
            <h3 className="text-xs font-bold text-slate-700 uppercase">Available Endpoints</h3>
          </div>
          <div className="divide-y divide-slate-100">
            {SAMPLE_ENDPOINTS.map((ep, idx) => (
              <button
                key={idx}
                onClick={() => { setSelectedEndpoint(ep); setResponseData(null); setStatus('idle'); }}
                className={`w-full text-left px-4 py-3 hover:bg-slate-50 transition-colors ${selectedEndpoint.path === ep.path ? 'bg-blue-50' : ''}`}
              >
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded font-bold text-[9px] uppercase ${methodColor[ep.method] || 'bg-slate-100 text-slate-600'}`}>{ep.method}</span>
                  <span className="font-mono text-xs text-slate-700 font-bold">{ep.path}</span>
                </div>
                <p className="text-[10px] text-slate-400 mt-0.5 pl-10">{ep.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Request Panel */}
        <div className="lg:col-span-2 space-y-5">
          {/* Auth */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-3">
            <h3 className="text-xs font-bold text-slate-700 uppercase flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-blue-500" />
              Request Configuration
            </h3>
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">API Key</label>
              <input value={apiKey} onChange={(e) => setApiKey(e.target.value)} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-mono outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-slate-100 rounded-xl px-4 py-2.5 font-mono text-xs text-slate-700 flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded font-bold text-[9px] uppercase ${methodColor[selectedEndpoint.method]}`}>{selectedEndpoint.method}</span>
                {baseUrl}{selectedEndpoint.path}
              </div>
              <button onClick={handleRun} disabled={loading} className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl flex items-center gap-2 disabled:opacity-50 transition-colors">
                {loading ? <Clock className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                {loading ? 'Running...' : 'Run Request'}
              </button>
            </div>
          </div>

          {/* Response Panel */}
          {responseData && (
            <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
              <div className="p-4 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {status === 'success' ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <XCircle className="w-4 h-4 text-red-400" />}
                  <span className="text-xs font-bold text-slate-300 uppercase">Response — 200 OK</span>
                </div>
                <button className="text-slate-500 hover:text-slate-300 p-1">
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
              <pre className="p-5 text-emerald-300 text-xs font-mono overflow-x-auto">{responseData}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
