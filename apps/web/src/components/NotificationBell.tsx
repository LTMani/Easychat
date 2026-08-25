'use client';

import React, { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { useRealtime } from '../context/RealtimeContext';

export const NotificationBell: React.FC = () => {
  const { socket } = useRealtime();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) return;
      const res = await fetch('http://localhost:4000/api/v1/notifications', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok && data.data) {
        setNotifications(data.data.notifications || []);
        setUnreadCount(data.data.unreadCount || 0);
      }
    } catch (err) {}
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  useEffect(() => {
    if (!socket) return;
    socket.on('notification.created', (newNotif: any) => {
      setNotifications((prev) => [newNotif, ...prev]);
      setUnreadCount((prev) => prev + 1);
    });

    return () => {
      socket.off('notification.created');
    };
  }, [socket]);

  const markAsRead = async (id: string) => {
    try {
      const token = localStorage.getItem('accessToken');
      await fetch(`http://localhost:4000/api/v1/notifications/${id}/read`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (err) {}
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 px-1.5 py-0.5 text-[10px] font-bold text-white bg-red-600 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-xl shadow-lg z-50 overflow-hidden">
          <div className="p-3 border-b border-slate-100 font-bold text-sm text-slate-900 flex justify-between items-center">
            <span>Notifications</span>
            {unreadCount > 0 && (
              <span className="text-xs text-blue-600 font-medium">{unreadCount} new</span>
            )}
          </div>
          <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-xs text-slate-500">No notifications</div>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  onClick={() => markAsRead(n.id)}
                  className={`p-3 text-xs cursor-pointer hover:bg-slate-50 ${
                    !n.isRead ? 'bg-blue-50/50' : ''
                  }`}
                >
                  <div className="font-semibold text-slate-900">{n.title}</div>
                  <div className="text-slate-600 mt-0.5">{n.body}</div>
                  <div className="text-[10px] text-slate-400 mt-1">
                    {new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
