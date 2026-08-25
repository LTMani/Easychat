import './globals.css';
import React from 'react';

export const metadata = {
  title: 'EasyChat CRM — Conversation-First Customer Relationship Management',
  description: 'Manage customers, leads, deals, tickets and automation starting directly from conversations.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}
