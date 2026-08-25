'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Send, Plus, Search, MessageSquare, Users, Circle, Paperclip, ChevronRight, User, DollarSign, CheckSquare, Clock, X } from 'lucide-react';
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
  const [showCrmDrawer, setShowCrmDrawer] = useState(true);
  const [orgMembers, setOrgMembers] = useState<any[]>([]);
  const [selectedMemberId, setSelectedMemberId] = useState('');
  const [newConvTitle, setNewConvTitle] = useState('');
  const [taskTitle, setTaskTitle] = useState('');
  const [showTaskForm, setShowTaskForm] = useState(false);
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

  const handleCreateConversation = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('accessToken');
      const targetUserId = selectedMemberId || orgMembers[0]?.user?.id;
      if (!targetUserId) return;

      const res = await fetch('http://localhost:4000/api/v1/conversations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          type: 'DIRECT',
          title: newConvTitle || 'Direct Conversation',
          participantUserIds: [targetUserId],
        }),
      });

      const resData = await res.json();
      if (res.ok && resData.data) {
        setShowNewModal(false);
        setNewConvTitle('');
        setSelectedMemberId('');
        await fetchConversations();
        setActiveConv(resData.data);
      }
    } catch (err) {}
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeConv) return;

    const content = inputText;
    setInputText('');

    try {
      const token = localStorage.getItem('accessToken');
      const res = await fetch('http://localhost:4000/api/v1/conversations/messages', {
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

      const resData = await res.json();
      if (res.ok && resData.data) {
        setMessages((prev) => [...prev, resData.data]);
        fetchConversations();
      }
    } catch (err) {}
  };

  const handleCreateTaskFromChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;

    try {
      const token = localStorage.getItem('accessToken');
      const res = await fetch('http://localhost:4000/api/v1/customer360/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: taskTitle,
          assignedToId: orgMembers[0]?.user?.id,
          contactId: activeConv?.contactId,
        }),
      });

      if (res.ok) {
        setTaskTitle('');
        setShowTaskForm(false);
        alert('Follow-up task created directly from conversation!');
      }
    } catch (err) {}
  };

  const otherParticipant = activeConv?.participants?.find((p: any) => p.user?.id !== activeConv?.createdById)?.user;

  return (
    <div className="h-screen flex flex-col bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Link href="/" className="w-8 h-8 bg-blue-600 rounded-lg text-white font-bold flex items-center justify-center">
            E
          </Link>
          <span className="font-bold text-lg text-slate-900">EasyChat CRM — Conversation-First Operating System</span>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/deals" className="text-sm font-medium text-slate-600 hover:text-slate-900">
            Deals
          </Link>
          <Link href="/contacts" className="text-sm font-medium text-slate-600 hover:text-slate-900">
            Contacts
          </Link>
          <NotificationBell />
        </div>
      </header>

      {/* Main Workspace Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-72 bg-white border-r border-slate-200 flex flex-col">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-bold text-slate-900 text-sm uppercase tracking-wider">Conversations</h2>
            <button
              onClick={() => setShowNewModal(true)}
              className="p-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg flex items-center space-x-1 font-semibold text-xs transition-colors"
              title="Start New Conversation"
            >
              <Plus className="w-4 h-4" />
              <span>New</span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {conversations.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-500">
                No active conversations. Click <b>+ New</b> above to start a chat!
              </div>
            ) : (
              conversations.map((conv) => {
                const partner = conv.participants?.find((p: any) => p.user?.id !== conv?.createdById)?.user;
                const title = conv.title || (partner ? `${partner.firstName} ${partner.lastName}` : 'Direct Chat');
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
                      {partner && onlineUsers.has(partner.id) && (
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
        <div className="flex-1 flex flex-col bg-slate-50 min-w-0">
          {activeConv ? (
            <>
              {/* Active Conversation Header */}
              <div className="px-6 py-3 bg-white border-b border-slate-200 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">
                    {activeConv.title || (otherParticipant ? `${otherParticipant.firstName} ${otherParticipant.lastName}` : 'Conversation')}
                  </h3>
                  <div className="text-xs text-slate-500">
                    {activeConv.participants?.map((p: any) => p.user?.firstName).join(', ')}
                  </div>
                </div>
                <button
                  onClick={() => setShowCrmDrawer(!showCrmDrawer)}
                  className="px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100"
                >
                  {showCrmDrawer ? 'Hide CRM Context' : 'Show CRM Context'}
                </button>
              </div>

              {/* Message Feed */}
              <div className="flex-1 p-6 overflow-y-auto space-y-4">
                {messages.map((msg) => (
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
                          {new Date(msg.createdAt || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-sm text-slate-700 leading-relaxed">{msg.content}</p>
                    </div>
                  </div>
                ))}
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
              <p className="text-sm">Select a conversation or click <b>+ New</b> to start a chat</p>
            </div>
          )}
        </div>

        {/* Conversation-to-CRM Action Drawer (Phase 4 Customer 360 Feature) */}
        {activeConv && showCrmDrawer && (
          <div className="w-80 bg-white border-l border-slate-200 p-5 flex flex-col overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <span className="font-bold text-xs uppercase tracking-wider text-slate-700">Customer 360 Context</span>
              <span className="px-2 py-0.5 text-[10px] font-bold bg-green-50 text-green-700 rounded border border-green-200">
                Live CRM
              </span>
            </div>

            {/* Customer Profile Card */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-6">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center">
                  {otherParticipant?.firstName?.charAt(0) || 'C'}
                </div>
                <div>
                  <div className="font-bold text-sm text-slate-900">
                    {otherParticipant ? `${otherParticipant.firstName} ${otherParticipant.lastName}` : 'Customer Contact'}
                  </div>
                  <div className="text-xs text-slate-500">{otherParticipant?.email || 'customer@company.com'}</div>
                </div>
              </div>
            </div>

            {/* CRM Actions */}
            <div className="space-y-4">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-700">Quick CRM Actions</h4>

              <button
                onClick={() => setShowTaskForm(!showTaskForm)}
                className="w-full p-2.5 text-left border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-semibold text-slate-700 flex items-center justify-between"
              >
                <span className="flex items-center space-x-2">
                  <CheckSquare className="w-4 h-4 text-blue-600" />
                  <span>Create Follow-up Task</span>
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              {showTaskForm && (
                <form onSubmit={handleCreateTaskFromChat} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <input
                    type="text"
                    required
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                    placeholder="e.g., Send enterprise proposal PDF"
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs"
                  />
                  <button
                    type="submit"
                    className="w-full py-1.5 bg-blue-600 text-white font-semibold text-xs rounded-lg shadow-sm"
                  >
                    Save Task
                  </button>
                </form>
              )}

              <Link
                href="/deals"
                className="w-full p-2.5 text-left border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-semibold text-slate-700 flex items-center justify-between block"
              >
                <span className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  <span>Attach to Sales Deal</span>
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Start New Conversation Modal */}
      {showNewModal && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl border border-slate-200 p-6 max-w-md w-full shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-900">Start New Conversation</h3>
              <button
                type="button"
                onClick={() => setShowNewModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateConversation} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Conversation Title / Topic</label>
                <input
                  type="text"
                  required
                  value={newConvTitle}
                  onChange={(e) => setNewConvTitle(e.target.value)}
                  placeholder="e.g., Enterprise Client Discussion"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Select Participant</label>
                <select
                  value={selectedMemberId}
                  onChange={(e) => setSelectedMemberId(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                >
                  <option value="">Select team member...</option>
                  {orgMembers.map((m: any) => (
                    <option key={m.user?.id || m.id} value={m.user?.id}>
                      {m.user?.firstName} {m.user?.lastName} ({m.user?.email})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end space-x-3 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowNewModal(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm"
                >
                  Start Chat
                </button>
              </div>
            </form>
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
