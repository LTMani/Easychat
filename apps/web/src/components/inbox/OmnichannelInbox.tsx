'use client';

import React, { useState } from 'react';
import { MessageSquare, Mail, Phone, Globe, Tag, Send, CheckCircle2, Bookmark, Paperclip, Search, Filter } from 'lucide-react';

export interface ChannelMessage {
  id: string;
  channel: 'WHATSAPP' | 'EMAIL' | 'LIVECHAT' | 'SMS';
  senderName: string;
  senderEmail: string;
  subject?: string;
  content: string;
  timestamp: string;
  unread: boolean;
}

export function OmnichannelInbox() {
  const [messages, setMessages] = useState<ChannelMessage[]>([
    {
      id: 'msg-1',
      channel: 'WHATSAPP',
      senderName: 'Sarah Jenkins',
      senderEmail: 'sarah.jenkins@acmecorp.com',
      content: 'Can we schedule a 15-minute call tomorrow to review the 500-seat enterprise proposal SLA?',
      timestamp: '10:42 AM',
      unread: true,
    },
    {
      id: 'msg-2',
      channel: 'EMAIL',
      senderName: 'David Chen',
      senderEmail: 'david.chen@techflow.io',
      subject: 'Re: Webhook HMAC SHA-256 Signature Verification',
      content: 'Thank you for sending the updated HMAC configuration documentation. Our engineering team verified the signature headers successfully.',
      timestamp: '9:15 AM',
      unread: false,
    },
    {
      id: 'msg-3',
      channel: 'LIVECHAT',
      senderName: 'Emily Watson',
      senderEmail: 'emily.watson@globalscale.org',
      content: 'Hi! Is SAML 2.0 Single Sign-On included in the Enterprise Tier plan?',
      timestamp: 'Yesterday',
      unread: false,
    },
  ]);

  const [activeChannel, setActiveChannel] = useState<'ALL' | 'WHATSAPP' | 'EMAIL' | 'LIVECHAT'>('ALL');
  const [selectedMsg, setSelectedMsg] = useState<ChannelMessage>(messages[0]);
  const [replyText, setReplyText] = useState('');
  const [cannedShortcut, setCannedShortcut] = useState('');

  const filtered = messages.filter((m) => (activeChannel === 'ALL' ? true : m.channel === activeChannel));

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedMsg) return;

    alert(`Reply sent via ${selectedMsg.channel} adapter to ${selectedMsg.senderEmail}!`);
    setReplyText('');
  };

  const applyCannedMacro = (text: string) => {
    setReplyText(text);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex h-[620px]">
      {/* Left Channel List Sidebar */}
      <div className="w-80 border-r border-slate-200 flex flex-col bg-slate-50">
        <div className="p-4 border-b border-slate-200 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-sm">Omnichannel Inbox</h3>
            <span className="px-2 py-0.5 text-[10px] font-bold bg-blue-100 text-blue-700 rounded-full">
              {messages.filter((m) => m.unread).length} Unread
            </span>
          </div>

          {/* Channel Filters */}
          <div className="flex items-center space-x-1 bg-slate-200/60 p-1 rounded-lg text-xs font-semibold text-slate-600">
            <button
              onClick={() => setActiveChannel('ALL')}
              className={`flex-1 py-1 text-center rounded-md ${activeChannel === 'ALL' ? 'bg-white text-slate-900 shadow-sm' : ''}`}
            >
              All
            </button>
            <button
              onClick={() => setActiveChannel('WHATSAPP')}
              className={`flex-1 py-1 text-center rounded-md ${activeChannel === 'WHATSAPP' ? 'bg-white text-slate-900 shadow-sm' : ''}`}
            >
              WhatsApp
            </button>
            <button
              onClick={() => setActiveChannel('EMAIL')}
              className={`flex-1 py-1 text-center rounded-md ${activeChannel === 'EMAIL' ? 'bg-white text-slate-900 shadow-sm' : ''}`}
            >
              Email
            </button>
            <button
              onClick={() => setActiveChannel('LIVECHAT')}
              className={`flex-1 py-1 text-center rounded-md ${activeChannel === 'LIVECHAT' ? 'bg-white text-slate-900 shadow-sm' : ''}`}
            >
              LiveChat
            </button>
          </div>
        </div>

        {/* Message Thread List */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-200">
          {filtered.map((msg) => {
            const isSelected = selectedMsg?.id === msg.id;
            return (
              <div
                key={msg.id}
                onClick={() => setSelectedMsg(msg)}
                className={`p-4 cursor-pointer hover:bg-white transition-colors ${
                  isSelected ? 'bg-white border-l-4 border-blue-600 shadow-sm' : ''
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-slate-900 text-xs truncate">{msg.senderName}</span>
                  <span className="text-[10px] text-slate-400">{msg.timestamp}</span>
                </div>
                <div className="flex items-center space-x-2 mb-1">
                  <span
                    className={`px-1.5 py-0.5 text-[9px] font-extrabold rounded uppercase ${
                      msg.channel === 'WHATSAPP'
                        ? 'bg-emerald-100 text-emerald-800'
                        : msg.channel === 'EMAIL'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-purple-100 text-purple-800'
                    }`}
                  >
                    {msg.channel}
                  </span>
                  {msg.subject && <span className="text-xs font-semibold text-slate-700 truncate">{msg.subject}</span>}
                </div>
                <p className="text-xs text-slate-500 line-clamp-2">{msg.content}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Message Viewer & Composer */}
      <div className="flex-1 flex flex-col bg-white">
        {selectedMsg ? (
          <>
            <div className="p-6 border-b border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                  {selectedMsg.channel} CHANNEL THREAD
                </span>
                <h3 className="font-bold text-lg text-slate-900 mt-0.5">{selectedMsg.senderName}</h3>
                <p className="text-xs text-slate-500">{selectedMsg.senderEmail}</p>
              </div>
            </div>

            <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-50/50">
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-100 pb-2">
                  <span>Received via {selectedMsg.channel} Adapter</span>
                  <span>{selectedMsg.timestamp}</span>
                </div>
                {selectedMsg.subject && <h4 className="font-bold text-sm text-slate-900">{selectedMsg.subject}</h4>}
                <p className="text-sm text-slate-700 leading-relaxed">{selectedMsg.content}</p>
              </div>
            </div>

            {/* Quick Macro Snippet Shortcuts */}
            <div className="px-6 py-2 bg-slate-100 border-t border-slate-200 flex items-center space-x-2 text-xs">
              <span className="font-bold text-slate-500 uppercase text-[10px]">Canned Macros:</span>
              <button
                onClick={() => applyCannedMacro('Hi Sarah, I would be happy to schedule a call! What time works best for you tomorrow?')}
                className="px-2.5 py-1 bg-white hover:bg-slate-200 text-slate-700 rounded border border-slate-300 font-medium"
              >
                #ScheduleCall
              </button>
              <button
                onClick={() => applyCannedMacro('Hello! Yes, SAML 2.0 SSO is included in our Enterprise Tier plan. I have attached the Okta setup guide.')}
                className="px-2.5 py-1 bg-white hover:bg-slate-200 text-slate-700 rounded border border-slate-300 font-medium"
              >
                #SAMLDoc
              </button>
            </div>

            {/* Reply Composer */}
            <form onSubmit={handleSendReply} className="p-4 bg-white border-t border-slate-200 flex items-center space-x-3">
              <input
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder={`Type response to send via ${selectedMsg.channel}...`}
                className="flex-1 px-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-sm flex items-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>Send</span>
              </button>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-slate-400 text-sm">Select a message to view thread</div>
        )}
      </div>
    </div>
  );
}
