'use client';

import React from 'react';
import { OmnichannelInbox } from '../../../components/inbox/OmnichannelInbox';

export default function OmnichannelInboxPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Omnichannel Shared Inbox</h1>
        <p className="text-sm text-slate-500 mt-1">
          Unified messaging stream across WhatsApp Business, Email Ingestion, LiveChat, and SMS.
        </p>
      </div>

      <OmnichannelInbox />
    </div>
  );
}
