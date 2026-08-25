'use client';

import React, { useState } from 'react';
import { Phone, PhoneCall, Mic, MicOff, Volume2, ShieldCheck, User, Settings, Play } from 'lucide-react';

export default function TelephonyPage() {
  const [dialNumber, setDialNumber] = useState('');
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const callLogs = [
    { id: '1', caller: '+1 (555) 234-5678', callee: 'Sales Queue', duration: '4m 12s', direction: 'INBOUND', status: 'COMPLETED', time: '10 mins ago' },
    { id: '2', caller: 'Agent Alex', callee: '+1 (555) 987-6543', duration: '2m 45s', direction: 'OUTBOUND', status: 'COMPLETED', time: '1 hour ago' },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
            <Phone className="w-7 h-7 text-blue-600" />
            Telephony & WebRTC Voice Trunking
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage SIP trunks, inbound IVR call trees, WebRTC softphone dialer, and call recordings.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Softphone Dialer Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-blue-600" />
              WebRTC Softphone Dialer
            </h3>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          </div>

          <div className="bg-slate-900 text-white rounded-xl p-4 text-center space-y-2">
            <div className="text-[10px] uppercase font-bold text-slate-400">SIP Status: CONNECTED</div>
            <div className="text-2xl font-mono font-bold tracking-widest min-h-[36px]">
              {dialNumber || 'Enter Number'}
            </div>
            {isCallActive && (
              <div className="text-xs text-emerald-400 font-bold animate-bounce">
                Call in Progress (00:42)
              </div>
            )}
          </div>

          {/* Keypad */}
          <div className="grid grid-cols-3 gap-3">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map((digit) => (
              <button
                key={digit}
                onClick={() => setDialNumber((prev) => prev + digit)}
                className="py-3 bg-slate-50 hover:bg-slate-100 text-slate-800 font-bold text-lg rounded-xl border border-slate-200 transition-colors"
              >
                {digit}
              </button>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`p-3 rounded-xl border transition-colors ${
                isMuted ? 'bg-amber-50 border-amber-300 text-amber-700' : 'bg-slate-100 border-slate-200 text-slate-600'
              }`}
            >
              {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setIsCallActive(!isCallActive)}
              className={`flex-1 py-3 rounded-xl font-bold text-sm text-white shadow transition-colors flex items-center justify-center gap-2 ${
                isCallActive ? 'bg-red-600 hover:bg-red-500' : 'bg-emerald-600 hover:bg-emerald-500'
              }`}
            >
              <PhoneCall className="w-4 h-4" />
              <span>{isCallActive ? 'End Call' : 'Call Now'}</span>
            </button>

            <button
              onClick={() => setDialNumber('')}
              className="px-3 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs rounded-xl"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Call Logs Table */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="font-bold text-slate-900 text-base">Recent Voice Call Logs</h3>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold text-[10px]">
                <tr>
                  <th className="p-4">Direction</th>
                  <th className="p-4">Caller</th>
                  <th className="p-4">Callee</th>
                  <th className="p-4">Duration</th>
                  <th className="p-4">Time</th>
                  <th className="p-4 text-right">Recording</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {callLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50">
                    <td className="p-4">
                      <span
                        className={`px-2 py-0.5 font-bold text-[10px] rounded ${
                          log.direction === 'INBOUND'
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : 'bg-purple-50 text-purple-700 border border-purple-200'
                        }`}
                      >
                        {log.direction}
                      </span>
                    </td>
                    <td className="p-4 font-bold text-slate-900">{log.caller}</td>
                    <td className="p-4">{log.callee}</td>
                    <td className="p-4 font-mono">{log.duration}</td>
                    <td className="p-4 text-slate-400">{log.time}</td>
                    <td className="p-4 text-right">
                      <button className="px-2.5 py-1 bg-slate-900 text-white font-bold text-[10px] rounded-lg inline-flex items-center gap-1.5 hover:bg-slate-800">
                        <Play className="w-3 h-3" /> Play
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
