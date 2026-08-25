'use client';

import React, { useState } from 'react';
import { Laptop, Smartphone, ShieldCheck, Trash2, LogOut, CheckCircle2, Globe, Clock } from 'lucide-react';

const SESSIONS = [
  { id: 'sess_1', device: 'Chrome on Windows 11', type: 'DESKTOP', ip: '192.168.1.10', location: 'San Francisco, US', isCurrent: true, lastActive: 'Active Now', expires: 'In 24 hours' },
  { id: 'sess_2', device: 'Safari on iPhone 15 Pro', type: 'MOBILE', ip: '172.56.21.9', location: 'San Jose, US', isCurrent: false, lastActive: '45 mins ago', expires: 'In 23 hours' },
  { id: 'sess_3', device: 'Firefox on macOS Sonoma', type: 'DESKTOP', ip: '10.0.4.55', location: 'Frankfurt, DE', isCurrent: false, lastActive: 'Yesterday', expires: 'In 3 days' },
];

export default function SessionManagementPage() {
  const [sessions, setSessions] = useState(SESSIONS);

  const revokeSession = (id: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== id));
  };

  const revokeAllOthers = () => {
    setSessions((prev) => prev.filter((s) => s.isCurrent));
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 shadow-sm">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Active User Sessions & Devices</h1>
            <p className="text-sm text-slate-500 mt-1">Review authenticated browser sessions, IP locations, and remotely terminate suspicious logins.</p>
          </div>
        </div>

        <button
          onClick={revokeAllOthers}
          className="px-4 py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-2 transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" /> Sign Out All Other Devices
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm divide-y divide-slate-100">
        {sessions.map((sess) => (
          <div key={sess.id} className="p-5 flex items-center justify-between hover:bg-slate-50">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-slate-100 text-slate-600">
                {sess.type === 'MOBILE' ? <Smartphone className="w-5 h-5" /> : <Laptop className="w-5 h-5" />}
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-slate-900 text-sm">{sess.device}</h4>
                  {sess.isCurrent && (
                    <span className="bg-emerald-100 text-emerald-800 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      This Device (Current)
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1 font-mono">
                    <Globe className="w-3 h-3 text-slate-400" /> {sess.ip} ({sess.location})
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" /> {sess.lastActive}
                  </span>
                </div>
              </div>
            </div>

            {!sess.isCurrent && (
              <button
                onClick={() => revokeSession(sess.id)}
                className="px-3 py-1.5 border border-red-200 text-red-600 hover:bg-red-50 text-xs font-bold rounded-xl flex items-center gap-1"
              >
                <Trash2 className="w-3 h-3" /> Revoke Session
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
