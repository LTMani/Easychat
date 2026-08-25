'use client';

import React from 'react';
import { PhoneForwarded, Globe, Shield, Wifi, CheckCircle2, Server, ArrowRight } from 'lucide-react';

const SESSIONS = [
  { id: 'leg_9901', from: 'sip:agent.sarah@easychat.io', to: 'sip:+14155550192@pstn.twilio.com', carrier: 'TWILIO_ELASTIC_SIP', codec: 'Opus HD (48kHz)', latency: '8.5ms', state: 'ESTABLISHED' },
  { id: 'leg_9902', from: 'sip:agent.rahul@easychat.io', to: 'sip:+442079460912@sip.fra.telnyx.com', carrier: 'TELNYX_MISSION_CONTROL', codec: 'Opus HD (48kHz)', latency: '14.2ms', state: 'ESTABLISHED' },
  { id: 'leg_9903', from: 'sip:agent.david@easychat.io', to: 'sip:+18005550100@ot.bandwidth.com', carrier: 'BANDWIDTH_COMMUNICATIONS', codec: 'G.711 u-law', latency: '18.0ms', state: 'ESTABLISHED' },
];

export default function SbcGatewayPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 shadow-sm">
            <PhoneForwarded className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Session Border Controller (SBC) Gateway</h1>
            <p className="text-sm text-slate-500 mt-1">Multi-carrier SIP trunking, SRTP media encryption, and SDP codec negotiation ladder.</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2 text-xs font-bold text-emerald-900 shadow-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" /> SRTP TLS 1.3 Media Encryption Enforced
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-50 border-b border-slate-100 text-[10px] font-bold uppercase text-slate-500">
            <tr>
              <th className="p-4">SIP Call Leg ID</th>
              <th className="p-4">Originator (From)</th>
              <th className="p-4">Destination (To)</th>
              <th className="p-4">Carrier Trunk</th>
              <th className="p-4">Negotiated Codec</th>
              <th className="p-4">Latency</th>
              <th className="p-4 text-right">Call State</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {SESSIONS.map((s) => (
              <tr key={s.id} className="hover:bg-slate-50">
                <td className="p-4 font-mono font-bold text-indigo-600">{s.id}</td>
                <td className="p-4 font-mono text-slate-900">{s.from}</td>
                <td className="p-4 font-mono text-slate-700">{s.to}</td>
                <td className="p-4 font-bold text-slate-800">{s.carrier}</td>
                <td className="p-4 font-mono text-indigo-700">{s.codec}</td>
                <td className="p-4 font-mono text-emerald-600 font-bold">{s.latency}</td>
                <td className="p-4 text-right">
                  <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {s.state}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
