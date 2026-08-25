'use client';

import React, { useState } from 'react';
import { Zap, Play, Plus, ArrowRight, Settings, Trash2, CheckCircle2, AlertCircle, RefreshCw, Database, Mail, Bell, Split } from 'lucide-react';

export interface WorkflowNodeData {
  id: string;
  type: 'TRIGGER' | 'CONDITION' | 'ACTION' | 'DELAY' | 'BRANCH';
  title: string;
  subtitle: string;
  iconType: string;
  config: Record<string, any>;
  position: { x: number; y: number };
}

export function WorkflowCanvas() {
  const [nodes, setNodes] = useState<WorkflowNodeData[]>([
    {
      id: 'node-1',
      type: 'TRIGGER',
      title: 'Incoming Chat Message',
      subtitle: 'Triggers when a customer sends a message on WhatsApp or LiveChat',
      iconType: 'zap',
      config: { channel: 'ALL', keyword: '' },
      position: { x: 50, y: 100 },
    },
    {
      id: 'node-2',
      type: 'CONDITION',
      title: 'Lead Score >= 80?',
      subtitle: 'Evaluates if customer lead score qualifies for VIP routing',
      iconType: 'split',
      config: { attribute: 'leadScore', operator: 'GREATER_EQUAL', value: '80' },
      position: { x: 50, y: 240 },
    },
    {
      id: 'node-3',
      type: 'ACTION',
      title: 'Assign to Sales Team & Create Ticket',
      subtitle: 'Routes ticket with URGENT priority and notifies sales agent on Slack',
      iconType: 'mail',
      config: { actionType: 'CREATE_TICKET', priority: 'URGENT' },
      position: { x: 50, y: 380 },
    },
  ]);

  const [selectedNode, setSelectedNode] = useState<WorkflowNodeData | null>(nodes[0]);
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionLogs, setExecutionLogs] = useState<string[]>([]);

  const handleAddNode = (type: WorkflowNodeData['type']) => {
    const newNode: WorkflowNodeData = {
      id: `node-${Date.now()}`,
      type,
      title: type === 'ACTION' ? 'Send Webhook Alert' : type === 'CONDITION' ? 'Check Deal Amount' : 'Delay 15 Minutes',
      subtitle: 'Configurable automation step node',
      iconType: type === 'ACTION' ? 'mail' : 'settings',
      config: {},
      position: { x: 50, y: nodes.length * 140 + 100 },
    };

    setNodes([...nodes, newNode]);
    setSelectedNode(newNode);
  };

  const handleRemoveNode = (id: string) => {
    setNodes(nodes.filter((n) => n.id !== id));
    if (selectedNode?.id === id) {
      setSelectedNode(null);
    }
  };

  const handleRunTestExecution = () => {
    setIsExecuting(true);
    setExecutionLogs(['[0.00s] Execution Started', '[0.05s] Event Evaluated: Message Received']);

    setTimeout(() => {
      setExecutionLogs((prev) => [...prev, '[0.20s] Condition Evaluated: Lead Score (85 >= 80) -> TRUE']);
    }, 400);

    setTimeout(() => {
      setExecutionLogs((prev) => [...prev, '[0.45s] Action Executed: Ticket TICK-10092 Created']);
      setExecutionLogs((prev) => [...prev, '[0.50s] Execution Finished: SUCCESS']);
      setIsExecuting(false);
    }, 900);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[650px]">
      {/* Canvas Toolbar */}
      <div className="px-6 py-3 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <Zap className="w-5 h-5 text-amber-400" />
          <span className="font-bold text-sm">Visual Workflow Rule Engine</span>
          <span className="px-2.5 py-0.5 text-[10px] font-extrabold bg-blue-600 text-white rounded-full uppercase">
            Active Graph
          </span>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => handleAddNode('CONDITION')}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg flex items-center space-x-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Condition</span>
          </button>
          <button
            onClick={() => handleAddNode('ACTION')}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg flex items-center space-x-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Action</span>
          </button>
          <button
            onClick={handleRunTestExecution}
            disabled={isExecuting}
            className="px-4 py-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-bold rounded-lg shadow-sm flex items-center space-x-1.5"
          >
            <Play className="w-3.5 h-3.5" />
            <span>{isExecuting ? 'Running...' : 'Run Test'}</span>
          </button>
        </div>
      </div>

      {/* Main Graph & Inspector Grid */}
      <div className="flex-1 flex overflow-hidden">
        {/* Node Graph Area */}
        <div className="flex-1 bg-slate-50 p-8 overflow-y-auto relative">
          <div className="max-w-xl mx-auto space-y-4">
            {nodes.map((node, index) => {
              const isSelected = selectedNode?.id === node.id;
              return (
                <React.Fragment key={node.id}>
                  <div
                    onClick={() => setSelectedNode(node)}
                    className={`p-5 bg-white rounded-xl border-2 shadow-sm cursor-pointer transition-all ${
                      isSelected ? 'border-blue-600 ring-2 ring-blue-500/20' : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-white text-xs ${
                            node.type === 'TRIGGER'
                              ? 'bg-amber-500'
                              : node.type === 'CONDITION'
                              ? 'bg-purple-600'
                              : 'bg-blue-600'
                          }`}
                        >
                          {node.type === 'TRIGGER' ? <Zap className="w-4 h-4" /> : node.type === 'CONDITION' ? <Split className="w-4 h-4" /> : <Mail className="w-4 h-4" />}
                        </div>
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                            {node.type}
                          </span>
                          <h4 className="font-bold text-sm text-slate-900">{node.title}</h4>
                        </div>
                      </div>

                      {nodes.length > 1 && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveNode(node.id);
                          }}
                          className="text-slate-400 hover:text-red-600 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-2">{node.subtitle}</p>
                  </div>

                  {index < nodes.length - 1 && (
                    <div className="flex justify-center my-2">
                      <div className="flex flex-col items-center">
                        <div className="w-0.5 h-6 bg-blue-500" />
                        <div className="w-2 h-2 rounded-full bg-blue-600" />
                      </div>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Node Configuration Inspector Sidebar */}
        <div className="w-80 bg-white border-l border-slate-200 p-5 flex flex-col justify-between overflow-y-auto">
          {selectedNode ? (
            <div className="space-y-4">
              <div className="pb-3 border-b border-slate-100">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600">{selectedNode.type} NODE</span>
                <h3 className="font-bold text-base text-slate-900 mt-0.5">{selectedNode.title}</h3>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Step Label</label>
                <input
                  type="text"
                  value={selectedNode.title}
                  onChange={(e) => {
                    const updated = { ...selectedNode, title: e.target.value };
                    setSelectedNode(updated);
                    setNodes(nodes.map((n) => (n.id === updated.id ? updated : n)));
                  }}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Step Description</label>
                <textarea
                  rows={2}
                  value={selectedNode.subtitle}
                  onChange={(e) => {
                    const updated = { ...selectedNode, subtitle: e.target.value };
                    setSelectedNode(updated);
                    setNodes(nodes.map((n) => (n.id === updated.id ? updated : n)));
                  }}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              {/* Execution Tracing Output Box */}
              <div className="pt-4 border-t border-slate-100">
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-700 mb-2">Execution Logs</h4>
                <div className="bg-slate-900 text-slate-200 p-3 rounded-lg font-mono text-[11px] space-y-1 h-36 overflow-y-auto">
                  {executionLogs.length === 0 ? (
                    <span className="text-slate-500">Click 'Run Test' above to trace rule execution</span>
                  ) : (
                    executionLogs.map((log, i) => (
                      <div key={i} className="text-emerald-400">{log}</div>
                    ))
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-slate-400 text-xs text-center py-12">Select a node from graph to configure parameters</div>
          )}
        </div>
      </div>
    </div>
  );
}
