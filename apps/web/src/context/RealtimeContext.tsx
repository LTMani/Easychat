'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface RealtimeContextType {
  socket: Socket | null;
  isConnected: boolean;
  onlineUsers: Set<string>;
}

const RealtimeContext = createContext<RealtimeContextType>({
  socket: null,
  isConnected: false,
  onlineUsers: new Set(),
});

export const RealtimeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState<Set<string>>(new Set());

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) return;

    const newSocket = io('http://localhost:4000', {
      auth: { token },
      autoConnect: true,
    });

    newSocket.on('connect', () => {
      setIsConnected(true);
    });

    newSocket.on('disconnect', () => {
      setIsConnected(false);
    });

    newSocket.on('presence.update', (data: { userId: string; status: string }) => {
      setOnlineUsers((prev) => {
        const next = new Set(prev);
        if (data.status === 'ONLINE') next.add(data.userId);
        else next.delete(data.userId);
        return next;
      });
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <RealtimeContext.Provider value={{ socket, isConnected, onlineUsers }}>
      {children}
    </RealtimeContext.Provider>
  );
};

export const useRealtime = () => useContext(RealtimeContext);
