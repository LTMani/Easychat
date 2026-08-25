'use client';

import React, { useState } from 'react';
import { Mail, Layout, Code, Eye, Plus, Save, Trash2, CheckCircle2 } from 'lucide-react';

export function EmailTemplateDesigner() {
  const [templateName, setTemplateName] = useState('Enterprise Proposal Follow-up');
  const [subject, setSubject] = useState('Follow-up: EasyChat CRM Enterprise Proposal for {{company.name}}');
  const [bodyHtml, setBodyHtml] = useState(
    `<p>Hi {{contact.firstName}},</p>\n<p>Thank you for taking the time to discuss <strong>{{company.name}}</strong>'s customer operations requirements today.</p>\n<p>As discussed, our Enterprise plan includes:</p>\n<ul>\n  <li>Omnichannel Messaging (WhatsApp, LiveChat, Email, SMS)</li>\n  <li>Visual Automation Workflow Engine</li>\n  <li>Unified Customer 360 Activity Stream</li>\n</ul>\n<p>Best regards,<br/>EasyChat Team</p>`
  );

  const [activeTab, setActiveTab] = useState<'DESIGN' | 'PREVIEW' | 'VARIABLES'>('DESIGN');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleInsertVariable = (variable: string) => {
    setBodyHtml((prev) => prev + ` ${variable} `);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const previewHtml = bodyHtml
    .replace(/{{contact.firstName}}/g, 'Sarah')
    .replace(/{{company.name}}/g, 'Acme Corporation')
    .replace(/{{deal.amount}}/g, '$125,000');

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[640px]">
      {/* Designer Toolbar */}
      <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <Mail className="w-5 h-5 text-blue-400" />
          <span className="font-bold text-sm">WYSIWYG Email Template Designer</span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setActiveTab('DESIGN')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${activeTab === 'DESIGN' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300'}`}
          >
            Design
          </button>
          <button
            onClick={() => setActiveTab('PREVIEW')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${activeTab === 'PREVIEW' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300'}`}
          >
            Preview
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-1.5 bg-green-600 hover:bg-green-700 text-white font-bold text-xs rounded-lg shadow-sm flex items-center space-x-1.5"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{savedSuccess ? 'Saved!' : 'Save Template'}</span>
          </button>
        </div>
      </div>

      {/* Main Designer Content */}
      <div className="flex-1 flex overflow-hidden">
        {activeTab === 'DESIGN' ? (
          <div className="flex-1 flex overflow-hidden">
            {/* HTML Editor */}
            <div className="flex-1 p-6 flex flex-col space-y-4 overflow-y-auto">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Template Title</label>
                <input
                  type="text"
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-semibold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Email Subject</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-semibold text-slate-900"
                />
              </div>

              <div className="flex-1 flex flex-col">
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">HTML Body Content</label>
                <textarea
                  value={bodyHtml}
                  onChange={(e) => setBodyHtml(e.target.value)}
                  className="flex-1 w-full p-4 font-mono text-xs border border-slate-300 rounded-xl bg-slate-900 text-slate-100"
                />
              </div>
            </div>

            {/* Variables Side Panel */}
            <div className="w-64 bg-slate-50 border-l border-slate-200 p-5 space-y-4">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-700">Dynamic Variable Tags</h4>
              <p className="text-xs text-slate-500">Click a variable tag to insert into template body:</p>
              <div className="space-y-2">
                {[
                  '{{contact.firstName}}',
                  '{{contact.lastName}}',
                  '{{contact.email}}',
                  '{{company.name}}',
                  '{{deal.amount}}',
                  '{{user.firstName}}',
                ].map((v) => (
                  <button
                    key={v}
                    onClick={() => handleInsertVariable(v)}
                    className="w-full text-left px-3 py-2 bg-white hover:bg-blue-50 border border-slate-200 rounded-lg text-xs font-mono text-blue-600 font-bold shadow-sm transition-colors"
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Live Rendered Email Preview */
          <div className="flex-1 bg-slate-100 p-8 overflow-y-auto flex justify-center">
            <div className="bg-white max-w-2xl w-full rounded-xl border border-slate-200 shadow-md overflow-hidden flex flex-col">
              <div className="p-4 bg-slate-50 border-b border-slate-200 text-xs space-y-1">
                <div><span className="font-bold text-slate-500">Subject:</span> {subject.replace(/{{company.name}}/g, 'Acme Corporation')}</div>
                <div><span className="font-bold text-slate-500">To:</span> sarah.jenkins@acmecorp.com</div>
              </div>
              <div className="p-8 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: previewHtml }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
