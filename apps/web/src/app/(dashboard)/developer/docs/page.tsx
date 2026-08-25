'use client';

import React, { useState } from 'react';
import { Book, Code, Terminal, Copy, CheckCircle2, ChevronRight, Layers, Key } from 'lucide-react';

const ENDPOINTS = [
  { method: 'GET', path: '/v1/contacts', tag: 'Contacts', desc: 'Retrieve paginated contacts with search and custom field filters.' },
  { method: 'POST', path: '/v1/contacts', tag: 'Contacts', desc: 'Create a new CRM contact record with automatic geo-enrichment.' },
  { method: 'GET', path: '/v1/deals', tag: 'Deals', desc: 'List opportunities with weighted pipeline stage calculations.' },
  { method: 'POST', path: '/v1/deals', tag: 'Deals', desc: 'Create a deal and trigger automated assignment rules.' },
  { method: 'GET', path: '/v1/tickets', tag: 'Tickets', desc: 'Query support tickets with SLA deadline compliance indicators.' },
  { method: 'POST', path: '/v1/conversations/:id/messages', tag: 'Conversations', desc: 'Dispatch an outbound message across Email, WhatsApp, or SMS.' },
];

export default function DeveloperDocsPage() {
  const [selectedEndpoint, setSelectedEndpoint] = useState(ENDPOINTS[0]);
  const [copiedCode, setCopiedCode] = useState(false);

  const sampleSnippet = `import { EasyChatClient } from '@easychat/sdk';

const client = new EasyChatClient({
  apiKey: process.env.EASYCHAT_API_KEY,
});

// Fetch contacts
const response = await client.contacts.list({
  limit: 25,
  country: 'US',
  leadScoreMin: 70,
});

console.log(\`Found \${response.meta.total} high-value contacts\`);
console.log(response.data);`;

  const handleCopy = () => {
    navigator.clipboard.writeText(sampleSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shadow-sm">
            <Code className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Interactive REST API & SDK Reference</h1>
            <p className="text-sm text-slate-500 mt-1">Explore all EasyChat CRM endpoints, request schemas, and typed TypeScript SDK snippets.</p>
          </div>
        </div>

        <button
          onClick={handleCopy}
          className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-2 transition-colors"
        >
          {copiedCode ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          {copiedCode ? 'Copied Code!' : 'Copy SDK Example'}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-8">
        {/* Endpoints Sidebar */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 space-y-2">
          <p className="text-[10px] font-bold text-slate-400 uppercase px-2 mb-2">API Endpoints</p>
          {ENDPOINTS.map((ep, i) => (
            <button
              key={i}
              onClick={() => setSelectedEndpoint(ep)}
              className={`w-full text-left p-3 rounded-xl transition-all border ${
                selectedEndpoint.path === ep.path && selectedEndpoint.method === ep.method
                  ? 'border-blue-500 bg-blue-50/50 shadow-sm'
                  : 'border-transparent hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${ep.method === 'GET' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'}`}>
                  {ep.method}
                </span>
                <span className="font-mono text-xs font-bold text-slate-900 truncate">{ep.path}</span>
              </div>
              <p className="text-[10px] text-slate-500 line-clamp-1">{ep.desc}</p>
            </button>
          ))}
        </div>

        {/* Endpoint Details & Code Snippets */}
        <div className="col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
            <div className="flex items-center gap-3">
              <span className={`text-xs font-mono font-bold px-2 py-1 rounded-lg ${selectedEndpoint.method === 'GET' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'}`}>
                {selectedEndpoint.method}
              </span>
              <span className="font-mono font-bold text-base text-slate-900">{selectedEndpoint.path}</span>
            </div>
            <p className="text-xs text-slate-600">{selectedEndpoint.desc}</p>

            <div className="pt-4 border-t border-slate-100 space-y-3">
              <h4 className="text-xs font-bold text-slate-900 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-slate-500" /> TypeScript SDK Snippet
              </h4>
              <pre className="bg-slate-900 text-slate-100 font-mono text-xs rounded-xl p-4 overflow-x-auto leading-relaxed">
                <code>{sampleSnippet}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
