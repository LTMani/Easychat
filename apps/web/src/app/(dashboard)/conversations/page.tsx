'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Send, Plus, Search, MessageSquare, Users, Circle, Paperclip } from 'lucide-react';
import { RealtimeProvider, useRealtime } from '../../../context/RealtimeContext';
import { NotificationBell } from '../../../components/NotificationBell';

function ChatWorkspace() {
  const { socket, onlineUsers } = useRealtime();
  const [conversations, setConversations] = useState<any[]>([]);
  const [activeConv, setActiveConv] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [inputText, setInputText] = useState('');
  const [typingUsers, setTypingUsers] = useState<Set<string>>(new Set());
  const [showNewModal, setShowNewModal] = useState(false);
  const [orgMembers, setOrgMembers] = useState<any[]>([]);
  const [selectedMemberId, setSelectedMemberId] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const fetchConversations = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) return;
      const res = await fetch('http://localhost:4000/api/v1/conversations', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok && data.data) {
        setConversations(data.data);
        if (data.data.length > 0 && !activeConv) {
          setActiveConv(data.data[0]);
        }
      }
    } catch (err) {}
  };

  const fetchOrgMembers = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const res = await fetch('http://localhost:4000/api/v1/organizations/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok && data.data) {
        setOrgMembers(data.data.members || []);
      }
    } catch (err) {}
  };

  const fetchMessages = async (convId: string) => {
    try {
      const token = localStorage.getItem('accessToken');
      const res = await fetch(`http://localhost:4000/api/v1/conversations/${convId}/messages`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok && data.data) {
        setMessages(data.data);
      }
    } catch (err) {}
  };

  useEffect(() => {
    fetchConversations();
    fetchOrgMembers();
  }, []);

  useEffect(() => {
    if (activeConv) {
      fetchMessages(activeConv.id);
      if (socket) {
        socket.emit('join.conversation', { conversationId: activeConv.id });
      }
    }
  }, [activeConv, socket]);

  useEffect(() => {
    if (!socket) return;

    socket.on('message.sent', (newMsg: any) => {
      if (activeConv && newMsg.conversationId === activeConv.id) {
        setMessages((prev) => [...prev, newMsg]);
      }
      fetchConversations();
    });

    socket.on('typing.start', (data: { conversationId: string; email: string }) => {
      if (activeConv && data.conversationId === activeConv.id) {
        setTypingUsers((prev) => new Set(prev).add(data.email));
      }
    });

    socket.on('typing.stop', (data: { conversationId: string; userId: string }) => {
      if (activeConv && data.conversationId === activeConv.id) {
        setTypingUsers((prev) => {
          const next = new Set(prev);
          next.delete(data.userId);
          return next;
        });
      }
    });

    return () => {
      socket.off('message.sent');
      socket.off('typing.start');
      socket.off('typing.stop');
    };
  }, [socket, activeConv]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeConv) return;

    const content = inputText;
    setInputText('');

    try {
      const token = localStorage.getItem('accessToken');
      await fetch('http://localhost:4000/api/v1/conversations/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          conversationId: activeConv.id,
          content,
        }),
      });
    } catch (err) {}
  };

  const handleCreateDirectChat = async () => {
    if (!selectedMemberId) return;
    try {
      const token = localStorage.getItem('accessToken');
      const res = await fetch('http://localhost:4000/api/v1/conversations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          type: 'DIRECT',
          participantUserIds: [selectedMemberId],
        }),
      });

      const data = await res.json();
      if (res.ok && data.data) {
        setShowNewModal(false);
        setConversations((prev) => [data.data, ...prev]);
        setActiveConv(data.data);
      }
    } catch (err) {}
  };

  return (
    <div className="h-screen flex flex-col bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Link href="/" className="w-8 h-8 bg-blue-600 rounded-lg text-white font-bold flex items-center justify-center">
            E
          </Link>
          <span className="font-bold text-lg text-slate-900">EasyChat Core — Realtime Workspace</span>
        </div>
        <div className="flex items-center space-x-4">
          <NotificationBell />
          <Link href="/settings/organization" className="text-sm font-medium text-slate-600 hover:text-slate-900">
            Settings
          </Link>
        </div>
      </header>

      {/* Main Workspace Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-80 bg-white border-r border-slate-200 flex flex-col">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-bold text-slate-900 text-sm uppercase tracking-wider">Conversations</h2>
            <button
              onClick={() => setShowNewModal(true)}
              className="p-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {conversations.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-500">No active conversations. Start one!</div>
            ) : (
              conversations.map((conv) => {
                const otherParticipant = conv.participants?.find((p: any) => p.user?.id !== activeConv?.createdById)?.user;
                const title = conv.title || (otherParticipant ? `${otherParticipant.firstName} ${otherParticipant.lastName}` : 'Direct Chat');
                const isActive = activeConv?.id === conv.id;

                return (
                  <div
                    key={conv.id}
                    onClick={() => setActiveConv(conv)}
                    className={`p-4 cursor-pointer hover:bg-slate-50 flex items-center space-x-3 ${
                      isActive ? 'bg-blue-50/60 border-l-4 border-blue-600' : ''
                    }`}
                  >
                    <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-700 font-bold flex items-center justify-center relative">
                      {title.charAt(0)}
                      {otherParticipant && onlineUsers.has(otherParticipant.id) && (
                        <Circle className="w-3 h-3 text-green-500 fill-green-500 absolute bottom-0 right-0 border-2 border-white rounded-full" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm text-slate-900 truncate">{title}</div>
                      <div className="text-xs text-slate-500 truncate">
                        {conv.messages?.[0]?.content || 'No messages yet'}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Chat Message Panel */}
        <div className="flex-1 flex flex-col bg-slate-50">
          {activeConv ? (
            <>
              {/* Active Conversation Header */}
              <div className="px-6 py-4 bg-white border-b border-slate-200 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">
                    {activeConv.title || 'Conversation'}
                  </h3>
                  <div className="text-xs text-slate-500">
                    {activeConv.participants?.map((p: any) => p.user?.firstName).join(', ')}
                  </div>
                </div>
                <span className="px-2.5 py-1 text-xs font-semibold uppercase bg-slate-100 text-slate-600 rounded-md">
                  {activeConv.type}
                </span>
              </div>

              {/* Message Feed */}
              <div className="flex-1 p-6 overflow-y-auto space-y-4">
                {messages.map((msg) => {
                  return (
                    <div key={msg.id} className="flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                        {msg.sender?.firstName?.charAt(0) || 'U'}
                      </div>
                      <div className="bg-white border border-slate-200 p-3 rounded-xl max-w-xl shadow-sm">
                        <div className="flex items-center justify-between space-x-4 mb-1">
                          <span className="font-bold text-xs text-slate-900">
                            {msg.sender?.firstName} {msg.sender?.lastName}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <p className="text-sm text-slate-700 leading-relaxed">{msg.content}</p>
                      </div>
                    </div>
                  );
                })}
                {typingUsers.size > 0 && (
                  <div className="text-xs text-slate-400 italic">Someone is typing...</div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Composer */}
              <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-slate-200 flex items-center space-x-3">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Type a message or trigger CRM action..."
                  className="flex-1 px-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="p-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-sm"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
              <MessageSquare className="w-12 h-12 mb-3 text-slate-300" />
              <p className="text-sm">Select a conversation to begin messaging</p>
            </div>
          )}
        </div>
      </div>

      {/* New Conversation Modal */}
      {showNewModal && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl border border-slate-200 p-6 max-w-sm w-full shadow-lg">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Start New Conversation</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Select Team Member</label>
                <select
                  value={selectedMemberId}
                  onChange={(e) => setSelectedMemberId(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                >
                  <option value="">-- Choose Member --</option>
                  {orgMembers.map((m: any) => (
                    <option key={m.user.id} value={m.user.id}>
                      {m.user.firstName} {m.user.lastName} ({m.user.email})
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowNewModal(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateDirectChat}
                  className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm"
                >
                  Start Chat
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ConversationsPage() {
  return (
    <RealtimeProvider>
      <ChatWorkspace />
    </RealtimeProvider>
  );
}
