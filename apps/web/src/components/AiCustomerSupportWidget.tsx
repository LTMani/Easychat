'use client';

import React, { useState } from 'react';
import { Bot, Send, User, Sparkles, ShieldCheck, CheckCircle2, LifeBuoy, ArrowRight, X } from 'lucide-react';

export interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  citation?: string;
  toolUsed?: string;
  isEscalated?: boolean;
}

const PRESET_QUESTIONS = [
  'How much does the Enterprise plan cost?',
  'What are your SLA response guarantees?',
  'How do I connect WhatsApp Cloud API?',
  'Can you check status of ticket TKT-2026-1001?',
  'I want to speak with a human manager',
];

export function AiCustomerSupportWidget() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'bot',
      text: 'Hello! 👋 I am the **EasyChat AI Assistant**. How can I help you today? You can ask about pricing, ticket updates, SLA guarantees, or channel setups.',
      timestamp: 'Just now',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let botResponse: ChatMessage;
      const lower = query.toLowerCase();

      if (lower.includes('price') || lower.includes('cost') || lower.includes('plan') || lower.includes('enterprise')) {
        botResponse = {
          id: `bot_${Date.now()}`,
          sender: 'bot',
          text: 'Our pricing plans are:\n- **Starter**: $49/mo (up to 5 seats, Live Chat & Email)\n- **Professional**: $99/mo (up to 20 seats, WhatsApp & SMS, 60m SLA)\n- **Enterprise**: $249/mo or $2,988/yr (unlimited seats, dedicated CSM, 15m SLA, SAML SSO)\n\nWould you like me to generate a tailored quote for your team?',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          citation: 'Source: Official Pricing Matrix (Verified)',
          toolUsed: 'Knowledge Base Grounding (RAG)',
        };
      } else if (lower.includes('tkt-') || lower.includes('ticket')) {
        botResponse = {
          id: `bot_${Date.now()}`,
          sender: 'bot',
          text: 'I looked up ticket **TKT-2026-1001**: It is currently **IN PROGRESS** with Senior Engineer Sarah Jenkins. The estimated resolution is within 45 minutes under your Enterprise 15m SLA.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          citation: 'Source: Live Support Database',
          toolUsed: 'Tool Executed: getTicketStatus("TKT-2026-1001")',
        };
      } else if (lower.includes('sla') || lower.includes('guarantee') || lower.includes('response')) {
        botResponse = {
          id: `bot_${Date.now()}`,
          sender: 'bot',
          text: 'EasyChat SLA guarantees:\n- **Enterprise VIP**: **15-minute first response** for Critical/Urgent priority with **99.9% uptime** guarantee.\n- **Professional**: **60-minute first response**.\n- **Starter**: Standard business-day support.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          citation: 'Source: Enterprise SLA Policy Addendum',
          toolUsed: 'Knowledge Base Grounding (RAG)',
        };
      } else if (lower.includes('whatsapp') || lower.includes('waba')) {
        botResponse = {
          id: `bot_${Date.now()}`,
          sender: 'bot',
          text: 'To connect WhatsApp Cloud API:\n1. Obtain your **Phone Number ID** & **WABA ID** from Meta Developer Portal.\n2. Navigate to **Settings → Channels → WhatsApp** in EasyChat.\n3. Paste credentials and click **Verify & Save** to activate incoming webhooks.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          citation: 'Source: WhatsApp Cloud API Integration Runbook',
          toolUsed: 'Knowledge Base Grounding (RAG)',
        };
      } else if (lower.includes('human') || lower.includes('agent') || lower.includes('manager') || lower.includes('speak')) {
        botResponse = {
          id: `bot_${Date.now()}`,
          sender: 'bot',
          text: 'I understand! Transferring you directly to our **Senior Tier 1 Support Team**. An agent will join this chat in less than 2 minutes.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          citation: 'Live Dispatcher',
          toolUsed: 'Tool Executed: escalateToHumanAgent(priority="URGENT")',
          isEscalated: true,
        };
      } else {
        botResponse = {
          id: `bot_${Date.now()}`,
          sender: 'bot',
          text: `Thank you for reaching out! I can assist you with pricing plans, ticket lookups, channel integrations, or transfer you to a specialist. What would you like to check?`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          citation: 'EasyChat Grounding Model',
        };
      }

      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden flex flex-col h-[560px] max-w-md w-full">
      {/* Bot Header */}
      <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center font-bold">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-sm leading-none">EasyChat AI Assistant</h3>
            <p className="text-[10px] text-blue-100 mt-1 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Grounded RAG Copilot • Active
            </p>
          </div>
        </div>

        <span className="text-[10px] bg-white/20 font-bold px-2 py-0.5 rounded-full text-white/90 font-mono">
          v2.4
        </span>
      </div>

      {/* Messages Container */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/50">
        {messages.map((m) => {
          const isBot = m.sender === 'bot';
          return (
            <div key={m.id} className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}>
              <div className={`max-w-[85%] space-y-1.5 ${isBot ? 'text-slate-800' : 'text-white'}`}>
                <div
                  className={`p-3.5 rounded-2xl text-xs leading-relaxed shadow-xs ${
                    isBot
                      ? 'bg-white border border-slate-200 text-slate-800'
                      : 'bg-blue-600 text-white font-medium'
                  }`}
                >
                  <p className="whitespace-pre-line">{m.text}</p>
                </div>

                {isBot && m.toolUsed && (
                  <div className="flex items-center gap-1 text-[9px] font-mono font-bold text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-md w-fit">
                    <Sparkles className="w-3 h-3 text-purple-600" /> {m.toolUsed}
                  </div>
                )}

                {isBot && m.citation && (
                  <p className="text-[9px] text-slate-400 font-mono flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500" /> {m.citation}
                  </p>
                )}

                {m.isEscalated && (
                  <div className="p-2 bg-emerald-50 border border-emerald-200 rounded-xl text-[10px] text-emerald-800 font-bold flex items-center gap-1.5">
                    <LifeBuoy className="w-3.5 h-3.5 text-emerald-600" /> Human Agent Connected: Sarah Jenkins
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium italic pl-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce" />
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce [animation-delay:0.2s]" />
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce [animation-delay:0.4s]" />
            <span className="text-[11px] font-sans ml-1 text-slate-500">AI searching knowledge base...</span>
          </div>
        )}
      </div>

      {/* Preset Suggestion Chips */}
      <div className="p-2 border-t border-slate-100 bg-white flex items-center gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-none">
        {PRESET_QUESTIONS.map((q, i) => (
          <button
            key={i}
            onClick={() => handleSend(q)}
            className="text-[10px] font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded-full transition-colors shrink-0"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <div className="p-3 border-t border-slate-200 bg-white flex items-center gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask AI anything about plans, tickets, or integrations..."
          className="flex-1 text-xs bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 outline-none focus:ring-2 focus:ring-blue-500 font-medium"
        />
        <button
          onClick={() => handleSend()}
          className="p-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-xs transition-colors"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
