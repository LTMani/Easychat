'use client';

import React, { useState } from 'react';
import { PhoneCall, Play, PhoneForwarded, PhoneOff, Plus, Check, Settings2, Trash2 } from 'lucide-react';

export interface IvrFlowNode {
  id: string;
  title: string;
  type: 'GATHER_DTMF' | 'ROUTE_QUEUE' | 'HANGUP' | 'PLAY_AUDIO';
  prompt: string;
  digit?: string;
  targetQueue?: string;
}

const INITIAL_NODES: IvrFlowNode[] = [
  { id: 'n1', title: 'Main Greeting Menu', type: 'GATHER_DTMF', prompt: 'Press 1 for Sales inquiries, Press 2 for Technical Support, or stay on the line for an operator.' },
  { id: 'n2', title: 'Route to Direct Sales', type: 'ROUTE_QUEUE', prompt: 'Connecting you to our Enterprise Sales team...', digit: '1', targetQueue: 'sales_tier_1' },
  { id: 'n3', title: 'Route to Support Queue', type: 'ROUTE_QUEUE', prompt: 'Transferring to Technical Support...', digit: '2', targetQueue: 'support_vip' },
  { id: 'n4', title: 'After-Hours Voicemail', type: 'HANGUP', prompt: 'Our offices are currently closed. Please leave a voicemail after the tone.', digit: '0' },
];

export function VisualIvrFlowEditor() {
  const [nodes, setNodes] = useState<IvrFlowNode[]>(INITIAL_NODES);
  const [selectedNodeId, setSelectedNodeId] = useState<string>('n1');

  const selectedNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

  const updatePrompt = (newPrompt: string) => {
    setNodes((prev) =>
      prev.map((n) => (n.id === selectedNodeId ? { ...n, prompt: newPrompt } : n)),
    );
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[520px]">
      <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <PhoneCall className="w-5 h-5 text-blue-600" />
          <h3 className="font-bold text-slate-900 text-sm">Visual IVR Telephony Call Flow Editor</h3>
        </div>
        <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded-full">
          Twilio Voice Active
        </span>
      </div>

      <div className="flex-1 grid grid-cols-3 divide-x divide-slate-100">
        {/* Visual Node Flow Tree */}
        <div className="col-span-2 p-6 bg-slate-50/30 overflow-y-auto space-y-4">
          {nodes.map((node) => {
            const isSelected = node.id === selectedNodeId;
            return (
              <div
                key={node.id}
                onClick={() => setSelectedNodeId(node.id)}
                className={`p-4 rounded-xl border-2 transition-all cursor-pointer space-y-2 ${
                  isSelected
                    ? 'border-blue-600 bg-white shadow-md'
                    : 'border-slate-200 bg-white/80 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {node.digit && (
                      <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-mono font-bold text-xs flex items-center justify-center">
                        {node.digit}
                      </span>
                    )}
                    <h4 className="font-bold text-xs text-slate-900">{node.title}</h4>
                  </div>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                    {node.type}
                  </span>
                </div>
                <p className="text-xs text-slate-600 italic">"{node.prompt}"</p>
                {node.targetQueue && (
                  <p className="text-[10px] text-blue-600 font-mono font-bold flex items-center gap-1">
                    <PhoneForwarded className="w-3 h-3" /> Target Queue: {node.targetQueue}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Node Property Inspector */}
        <div className="p-6 bg-white space-y-4">
          <h4 className="font-bold text-xs text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-1.5">
            <Settings2 className="w-4 h-4 text-slate-500" /> Node Properties
          </h4>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Node Title</label>
              <input
                value={selectedNode.title}
                disabled
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 font-medium"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Text-to-Speech Prompt (Polly)</label>
              <textarea
                rows={4}
                value={selectedNode.prompt}
                onChange={(e) => updatePrompt(e.target.value)}
                className="w-full border border-slate-200 rounded-xl p-3 text-slate-800 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
