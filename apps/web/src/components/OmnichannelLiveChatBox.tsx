'use client';

import React, { useState } from 'react';
import { Send, Smile, Paperclip, CheckCheck, Bot, User, Sparkles } from 'lucide-react';

export interface ChatMessage {
  id: string;
  sender: 'CUSTOMER' | 'AGENT' | 'AI_BOT';
  text: string;
  timestamp: string;
  sentiment?: 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE' | 'URGENT';
}

const INITIAL_MESSAGES: ChatMessage[] = [
  { id: 'm1', sender: 'CUSTOMER', text: 'Hello! We are looking to upgrade our CRM plan to Enterprise with 50 seats. Can you share details on custom SLA options?', timestamp: '14:20', sentiment: 'POSITIVE' },
  { id: 'm2', sender: 'AGENT', text: 'Hi! Absolutely! Our Enterprise plan includes a guaranteed 15-minute response SLA, dedicated CSM, and custom SSO integration.', timestamp: '14:21' },
  { id: 'm3', sender: 'CUSTOMER', text: 'That sounds perfect. Can you generate a formal quote for our procurement team in Germany?', timestamp: '14:23', sentiment: 'POSITIVE' },
];

export function OmnichannelLiveChatBox() {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [aiSuggesting, setAiSuggesting] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsg: ChatMessage = {
      id: `m_${Date.now()}`,
      sender: 'AGENT',
      text: input.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prev) => [...prev, newMsg]);
    setInput('');
  };

  const insertAiTemplate = () => {
    setAiSuggesting(true);
    setTimeout(() => {
      setInput("I've drafted quote #Q-2026-089 for 50 Enterprise seats with Euro billing terms. You can review and e-sign it directly from the link below.");
      setAiSuggesting(false);
    }, 400);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col h-[520px] overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
            JV
          </div>
          <div>
            <h4 className="font-bold text-xs text-slate-900">Jonathan Vance (CTO, TechAlpha)</h4>
            <p className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live Chat • Online
            </p>
          </div>
        </div>

        <button
          onClick={insertAiTemplate}
          className="px-2.5 py-1.5 bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold text-[10px] rounded-xl flex items-center gap-1 border border-purple-200 transition-colors"
        >
          <Sparkles className="w-3 h-3 text-purple-600" />
          {aiSuggesting ? 'Generating...' : 'AI Copilot Reply'}
        </button>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/30">
        {messages.map((m) => {
          const isCustomer = m.sender === 'CUSTOMER';
          return (
            <div key={m.id} className={`flex ${isCustomer ? 'justify-start' : 'justify-end'}`}>
              <div
                className={`max-w-[75%] rounded-2xl p-3 text-xs space-y-1 shadow-xs ${
                  isCustomer
                    ? 'bg-white border border-slate-200 text-slate-800'
                    : 'bg-blue-600 text-white font-medium'
                }`}
              >
                <p>{m.text}</p>
                <div className={`flex items-center justify-end gap-1 text-[9px] ${isCustomer ? 'text-slate-400' : 'text-blue-200'}`}>
                  <span>{m.timestamp}</span>
                  {!isCustomer && <CheckCheck className="w-3 h-3" />}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Input Bar */}
      <div className="p-3 border-t border-slate-200 bg-white flex items-center gap-2">
        <button className="text-slate-400 hover:text-slate-600 p-1.5">
          <Paperclip className="w-4 h-4" />
        </button>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type message or press / for response templates..."
          className="flex-1 text-xs bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSend}
          className="p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-xs transition-colors"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
