'use client';

import React, { useState } from 'react';
import { CheckSquare, Clock, AlertCircle, User, Plus, Filter, Calendar } from 'lucide-react';

const PRIORITIES = ['LOW', 'MEDIUM', 'HIGH', 'URGENT'];
const STATUSES = ['PENDING', 'IN_PROGRESS', 'COMPLETED', 'OVERDUE'];

const SAMPLE_TASKS = [
  { id: 't1', title: 'Follow up on contract renewal with Acme Corp', priority: 'HIGH', status: 'PENDING', dueDate: '2026-08-27', assignee: 'Alex Mercer', contactName: 'Sarah Johnson' },
  { id: 't2', title: 'Schedule product demo with new enterprise prospect', priority: 'URGENT', status: 'IN_PROGRESS', dueDate: '2026-08-26', assignee: 'Priya Sharma', contactName: 'Mike Chen' },
  { id: 't3', title: 'Send updated proposal to GlobalTech Ltd', priority: 'MEDIUM', status: 'PENDING', dueDate: '2026-08-30', assignee: 'Jordan Blake', contactName: 'Lisa Park' },
  { id: 't4', title: 'Onboard new customer: TechStartup Inc.', priority: 'HIGH', status: 'IN_PROGRESS', dueDate: '2026-08-28', assignee: 'Sam Chen', contactName: 'David Kim' },
  { id: 't5', title: 'Quarterly business review with Enterprise client', priority: 'LOW', status: 'COMPLETED', dueDate: '2026-08-20', assignee: 'Alex Mercer', contactName: 'Emma Wilson' },
];

export default function TasksPage() {
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [priorityFilter, setPriorityFilter] = useState<string>('ALL');

  const filtered = SAMPLE_TASKS.filter((t) => {
    if (statusFilter !== 'ALL' && t.status !== statusFilter) return false;
    if (priorityFilter !== 'ALL' && t.priority !== priorityFilter) return false;
    return true;
  });

  const priorityColor: Record<string, string> = {
    LOW: 'bg-slate-100 text-slate-600 border-slate-200',
    MEDIUM: 'bg-blue-50 text-blue-700 border-blue-200',
    HIGH: 'bg-amber-50 text-amber-700 border-amber-200',
    URGENT: 'bg-red-50 text-red-700 border-red-200',
  };

  const statusIcon: Record<string, React.ReactNode> = {
    PENDING: <Clock className="w-3.5 h-3.5 text-slate-400" />,
    IN_PROGRESS: <AlertCircle className="w-3.5 h-3.5 text-blue-500" />,
    COMPLETED: <CheckSquare className="w-3.5 h-3.5 text-emerald-500" />,
    OVERDUE: <AlertCircle className="w-3.5 h-3.5 text-red-500" />,
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
            <CheckSquare className="w-7 h-7 text-blue-600" />
            Task Manager & CRM Activity Planner
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage follow-ups, demos, and CRM activity tasks across the sales team.
          </p>
        </div>
        <button className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Create Task
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-slate-500" />
          <span className="text-xs font-bold text-slate-600">Status:</span>
          {['ALL', ...STATUSES].map((s) => (
            <button key={s} onClick={() => setStatusFilter(s)} className={`px-3 py-1.5 text-[10px] font-bold rounded-full border transition-colors ${statusFilter === s ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}>{s}</button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-600">Priority:</span>
          {['ALL', ...PRIORITIES].map((p) => (
            <button key={p} onClick={() => setPriorityFilter(p)} className={`px-3 py-1.5 text-[10px] font-bold rounded-full border transition-colors ${priorityFilter === p ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}>{p}</button>
          ))}
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {filtered.map((task) => (
          <div key={task.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 hover:border-blue-300 transition-colors">
            <div className="flex items-start gap-4">
              <div className="mt-0.5">{statusIcon[task.status]}</div>
              <div className="flex-1 min-w-0">
                <p className={`font-bold text-sm ${task.status === 'COMPLETED' ? 'line-through text-slate-400' : 'text-slate-900'}`}>{task.title}</p>
                <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                  <span className={`border px-2 py-0.5 rounded-full text-[10px] font-bold ${priorityColor[task.priority]}`}>{task.priority}</span>
                  <span className="flex items-center gap-1 text-[10px] text-slate-500 font-medium"><User className="w-3 h-3" />{task.assignee}</span>
                  <span className="flex items-center gap-1 text-[10px] text-slate-500 font-medium"><Calendar className="w-3 h-3" />Due: {task.dueDate}</span>
                  <span className="text-[10px] text-slate-400">re: {task.contactName}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
