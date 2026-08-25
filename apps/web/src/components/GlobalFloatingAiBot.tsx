'use client';

import React, { useState } from 'react';
import { Bot, X, Sparkles, Send, CheckCircle2, LifeBuoy, ChevronDown, MessageSquare } from 'lucide-react';

export interface FloatingChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  citation?: string;
  toolUsed?: string;
  isEscalated?: boolean;
}

const PRESET_QUERIES = [
  'What are your pricing plans?',
  'Check ticket #TKT-1245 status',
  'What is the Enterprise SLA?',
  'I need to talk to a human agent',
];

export function GlobalFloatingAiBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<FloatingChatMessage[]>([
    {
      id: 'm_init',
      sender: 'bot',
      text: 'Hi there! 👋 I am the **EasyChat AI Assistant**. How can I help you today? Ask about pricing, support tickets, SLAs, or connect with our live team.',
      timestamp: 'Just now',
    },
  ]);

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    const userMsg: FloatingChatMessage = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let botResponse: FloatingChatMessage;
      const lower = query.toLowerCase();

      if (lower.includes('price') || lower.includes('cost') || lower.includes('plan') || lower.includes('pricing')) {
        botResponse = {
          id: `bot_${Date.now()}`,
          sender: 'bot',
          text: 'Here are our verified pricing plans:\n- **Starter**: $49/mo (up to 5 seats)\n- **Professional**: $99/mo (up to 20 seats, WhatsApp & SMS)\n- **Enterprise**: $249/mo (Unlimited seats, dedicated CSM, 15m SLA)\n\nWould you like me to prepare an official quote for your organization?',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          citation: 'Source: Official Pricing Matrix',
          toolUsed: 'RAG Grounding: Pricing Matrix',
        };
      } else if (lower.includes('tkt-') || lower.includes('ticket')) {
        botResponse = {
          id: `bot_${Date.now()}`,
          sender: 'bot',
          text: 'I checked **#TKT-1245 (Payment gateway error)**: It is currently marked **HIGH PRIORITY** and assigned to Senior Engineer Sarah Jenkins. Estimated resolution is within 30 minutes.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          citation: 'Source: Live Ticket Database',
          toolUsed: 'Tool Executed: getTicketStatus("TKT-1245")',
        };
      } else if (lower.includes('sla') || lower.includes('guarantee')) {
        botResponse = {
          id: `bot_${Date.now()}`,
          sender: 'bot',
          text: 'Our SLA commitments:\n- **Enterprise Tier**: **15-minute guaranteed first response** for Critical issues & **99.9% uptime**.\n- **Pro Tier**: 60-minute first response.\n- **Starter**: Next business day support.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          citation: 'Source: Service Level Agreement Addendum',
          toolUsed: 'RAG Grounding: SLA Engine',
        };
      } else if (lower.includes('human') || lower.includes('agent') || lower.includes('person') || lower.includes('talk')) {
        botResponse = {
          id: `bot_${Date.now()}`,
          sender: 'bot',
          text: 'Understood! I am escalating your session to **Senior Support Agent Sarah Jenkins**. An agent will connect to this chat in ~1 minute.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          citation: 'Source: Live Agent Queue Dispatcher',
          toolUsed: 'Tool Executed: escalateToHumanAgent()',
          isEscalated: true,
        };
      } else {
        botResponse = {
          id: `bot_${Date.now()}`,
          sender: 'bot',
          text: 'I am here to help! You can ask about our CRM features, support tickets, pricing tiers, or request a live specialist.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          citation: 'Source: EasyChat Grounding Model',
        };
      }

      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-4 py-3.5 rounded-full shadow-xl shadow-indigo-500/30 transition-all hover:scale-105"
        >
          <div className="relative">
            <Bot className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-indigo-600 animate-pulse" />
          </div>
          <span className="text-xs font-bold tracking-tight">AI Assistant</span>
        </button>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xl overflow-hidden flex flex-col w-[380px] h-[520px] animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="p-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center font-bold">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-xs leading-none">EasyChat AI Assistant</h3>
                <p className="text-[10px] text-indigo-100 mt-1 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Grounded RAG Copilot
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-3 bg-slate-50/50">
            {messages.map((m) => {
              const isBot = m.sender === 'bot';
              return (
                <div key={m.id} className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-[88%] space-y-1 ${isBot ? 'text-slate-800' : 'text-white'}`}>
                    <div
                      className={`p-3 rounded-2xl text-xs leading-relaxed ${
                        isBot
                          ? 'bg-white border border-slate-200/80 text-slate-800 shadow-2xs'
                          : 'bg-[#4f46e5] text-white font-medium'
                      }`}
                    >
                      <p className="whitespace-pre-line">{m.text}</p>
                    </div>

                    {isBot && m.toolUsed && (
                      <div className="flex items-center gap-1 text-[9px] font-mono font-bold text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-md w-fit">
                        <Sparkles className="w-2.5 h-2.5 text-purple-600" /> {m.toolUsed}
                      </div>
                    )}

                    {isBot && m.citation && (
                      <p className="text-[9px] text-slate-400 font-mono flex items-center gap-1">
                        <CheckCircle2 className="w-2.5 h-2.5 text-emerald-500" /> {m.citation}
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
              <div className="flex items-center gap-1 text-xs text-slate-400 font-medium italic pl-1">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.4s]" />
                <span className="text-[10px] ml-1 text-slate-500 font-sans">Thinking...</span>
              </div>
            )}
          </div>

          {/* Preset Questions Slider */}
          <div className="p-2 border-t border-slate-100 bg-white flex items-center gap-1 overflow-x-auto whitespace-nowrap scrollbar-none">
            {PRESET_QUERIES.map((q, i) => (
              <button
                key={i}
                onClick={() => handleSend(q)}
                className="text-[10px] font-bold bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-700 px-2.5 py-1 rounded-full transition-colors shrink-0"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <div className="p-2.5 border-t border-slate-200 bg-white flex items-center gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask AI anything..."
              className="flex-1 text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
            />
            <button
              onClick={() => handleSend()}
              className="p-2 bg-[#4f46e5] hover:bg-indigo-500 text-white rounded-xl shadow-xs transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
