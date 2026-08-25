'use client';

import React, { useState } from 'react';
import { Phone, PhoneOff, Mic, MicOff, Volume2, Delete, User, Globe } from 'lucide-react';

export default function WebRtcSoftphonePage() {
  const [dialedNumber, setDialedNumber] = useState('+1 (415) 555-0192');
  const [inCall, setInCall] = useState(false);
  const [muted, setMuted] = useState(false);

  const KEYPAD = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'];

  const handleDigit = (digit: string) => {
    setDialedNumber((prev) => prev + digit);
  };

  return (
    <div className="p-8 max-w-md mx-auto space-y-6">
      <div className="text-center space-y-1">
        <h1 className="text-xl font-bold text-slate-900">WebRTC Agent Softphone</h1>
        <p className="text-xs text-emerald-600 font-bold flex items-center justify-center gap-1">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> SIP Gateway Connected
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 space-y-6">
        {/* Dialed Number Display */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center space-y-1">
          <p className="font-mono text-xl font-black text-slate-900 tracking-wider">
            {dialedNumber || 'Enter Number'}
          </p>
          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
            {inCall ? '02:45 • In Call with Jonathan Vance' : 'Caller ID: +1 (415) 555-0100'}
          </p>
        </div>

        {/* Keypad Grid */}
        <div className="grid grid-cols-3 gap-3">
          {KEYPAD.map((key) => (
            <button
              key={key}
              onClick={() => handleDigit(key)}
              className="h-14 rounded-2xl bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-800 font-bold text-lg flex items-center justify-center transition-colors shadow-xs"
            >
              {key}
            </button>
          ))}
        </div>

        {/* Call Action Bar */}
        <div className="flex items-center justify-center gap-4 pt-2">
          {inCall && (
            <button
              onClick={() => setMuted(!muted)}
              className={`p-4 rounded-2xl border transition-colors ${
                muted ? 'bg-amber-100 border-amber-300 text-amber-800' : 'bg-slate-100 border-slate-200 text-slate-700'
              }`}
            >
              {muted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>
          )}

          {!inCall ? (
            <button
              onClick={() => setInCall(true)}
              className="p-5 rounded-3xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30 transition-transform active:scale-95"
            >
              <Phone className="w-6 h-6" />
            </button>
          ) : (
            <button
              onClick={() => setInCall(false)}
              className="p-5 rounded-3xl bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/30 transition-transform active:scale-95"
            >
              <PhoneOff className="w-6 h-6" />
            </button>
          )}

          <button
            onClick={() => setDialedNumber('')}
            className="p-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors"
          >
            <Delete className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
