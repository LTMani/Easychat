'use client';

import React, { useState } from 'react';
import { PhoneCall, Play, Pause, Smile, Frown, Meh, Sparkles, Clock, User, ShieldCheck } from 'lucide-react';

const TRANSCRIPT_LINES = [
  { id: '1', speaker: 'AGENT', time: '00:02', text: 'Thank you for calling EasyChat Enterprise Support. My name is Sarah, how may I assist you today?', sentiment: 'NEUTRAL' },
  { id: '2', speaker: 'CUSTOMER', time: '00:09', text: 'Hi Sarah, our webhook verification endpoint was failing HMAC validation after our security upgrade.', sentiment: 'CONCERNED' },
  { id: '3', speaker: 'AGENT', time: '00:18', text: 'I completely understand. Let me check your developer portal signature secret. It appears the payload was using SHA-256 with base64 encoding.', sentiment: 'POSITIVE' },
  { id: '4', speaker: 'CUSTOMER', time: '00:32', text: 'Oh excellent! Updating our HMAC verifier to base64 immediately fixed it. Thank you so much for the swift help, you are awesome!', sentiment: 'POSITIVE' },
  { id: '5', speaker: 'AGENT', time: '00:41', text: 'You are very welcome Jonathan! Glad we could get it resolved in under 2 minutes. Have a fantastic day!', sentiment: 'POSITIVE' },
];

export default function CallTranscriptsPage() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 shadow-sm">
            <PhoneCall className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Call Recording & Sentiment NLP</h1>
            <p className="text-sm text-slate-500 mt-1">Dual-channel speech transcription with automatic sentiment trajectory analysis.</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2 text-xs font-bold text-emerald-800 shadow-xs">
          <Smile className="w-4 h-4 text-emerald-600" /> Overall Sentiment: POSITIVE (95% CSAT)
        </div>
      </div>

      {/* Audio Player Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center shadow-sm transition-colors"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            </button>
            <div>
              <h4 className="font-bold text-slate-900 text-xs">Call #CA_994821 • Customer: Jonathan Vance (Acme Corp)</h4>
              <p className="text-[11px] text-slate-500">Duration: 00:48 • Agent: Sarah Jenkins • Queue: Tier 1 VIP</p>
            </div>
          </div>

          <span className="text-xs font-mono font-bold text-slate-400">00:48 / 00:48</span>
        </div>

        {/* Waveform graphic placeholder */}
        <div className="w-full bg-slate-100 h-8 rounded-xl flex items-center gap-1 px-3 overflow-hidden">
          {[40, 60, 20, 80, 95, 30, 70, 85, 45, 65, 90, 35, 75, 50, 85, 95, 40, 25, 80, 100, 60, 45, 75, 90].map((h, i) => (
            <div
              key={i}
              className="flex-1 bg-blue-500 rounded-full transition-all"
              style={{ height: `${h}%`, opacity: i < 12 ? 1 : 0.4 }}
            />
          ))}
        </div>
      </div>

      {/* Synchronous Transcript Stream */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <h3 className="font-bold text-slate-900 text-sm">Synchronous Dialogue Transcript</h3>

        <div className="space-y-3 divide-y divide-slate-100">
          {TRANSCRIPT_LINES.map((line) => {
            const isAgent = line.speaker === 'AGENT';
            return (
              <div key={line.id} className="pt-3 first:pt-0 flex items-start gap-4 text-xs">
                <span className="font-mono text-slate-400 text-[11px] mt-0.5">{line.time}</span>
                <span className={`font-bold px-2 py-0.5 rounded-md text-[10px] uppercase font-mono ${
                  isAgent ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-800'
                }`}>
                  {line.speaker}
                </span>
                <p className="flex-1 text-slate-800 leading-relaxed font-medium">{line.text}</p>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                  line.sentiment === 'POSITIVE' ? 'bg-emerald-100 text-emerald-800' :
                  line.sentiment === 'CONCERNED' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-600'
                }`}>
                  {line.sentiment === 'POSITIVE' ? <Smile className="w-3 h-3 text-emerald-600" /> : <Meh className="w-3 h-3" />}
                  {line.sentiment}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
