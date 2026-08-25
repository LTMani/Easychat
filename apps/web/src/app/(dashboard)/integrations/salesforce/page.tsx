'use client';

import React, { useState } from 'react';
import { Cloud, CheckCircle2, RefreshCw, ArrowRightLeft, Settings, ShieldCheck, Database, Zap, AlertCircle } from 'lucide-react';

const SYNC_OBJECTS = [
  { id: 'contacts', name: 'Contacts & Leads', sfObject: 'Contact / Lead', easychatCount: 4821, sfCount: 4798, syncStatus: 'IN_SYNC', lastSynced: '5 mins ago', biDirectional: true },
  { id: 'deals', name: 'Deals & Opportunities', sfObject: 'Opportunity', easychatCount: 394, sfCount: 394, syncStatus: 'IN_SYNC', lastSynced: '5 mins ago', biDirectional: true },
  { id: 'accounts', name: 'Companies & Accounts', sfObject: 'Account', easychatCount: 812, sfCount: 810, syncStatus: 'IN_SYNC', lastSynced: '12 mins ago', biDirectional: true },
  { id: 'tasks', name: 'Activities & Tasks', sfObject: 'Task / Event', easychatCount: 12430, sfCount: 12425, syncStatus: 'SYNCING', lastSynced: 'Just now', biDirectional: false },
];

const FIELD_MAPPINGS = [
  { easychatField: 'firstName', sfField: 'FirstName', type: 'String', direction: 'Two-Way' },
  { easychatField: 'lastName', sfField: 'LastName', type: 'String', direction: 'Two-Way' },
  { easychatField: 'email', sfField: 'Email', type: 'Email (Unique)', direction: 'Two-Way' },
  { easychatField: 'phone', sfField: 'Phone', type: 'Phone', direction: 'Two-Way' },
  { easychatField: 'leadScore', sfField: 'Lead_Score__c', type: 'Number', direction: 'EasyChat → SF' },
  { easychatField: 'lifetimeValue', sfField: 'LTV__c', type: 'Currency', direction: 'EasyChat → SF' },
  { easychatField: 'country', sfField: 'MailingCountry', type: 'String', direction: 'Two-Way' },
];

export default function SalesforceIntegrationPage() {
  const [isConnected, setIsConnected] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'MAPPING' | 'LOGS'>('OVERVIEW');

  const handleSyncAll = () => {
    setSyncing(true);
    setTimeout(() => setSyncing(false), 2000);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shadow-sm">
            <Cloud className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Salesforce CRM Integration</h1>
              <span className="bg-emerald-100 text-emerald-800 border border-emerald-200 text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Connected to Production Org
              </span>
            </div>
            <p className="text-sm text-slate-500 mt-1">Bi-directional real-time data sync between EasyChat and Salesforce Lightning.</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSyncAll}
            disabled={syncing}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-2 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${syncing ? 'animate-spin' : ''}`} />
            {syncing ? 'Syncing...' : 'Sync Now'}
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-5">
        {[
          { label: 'Synced Contacts', value: '4,821', desc: '99.5% match rate', icon: Database, color: 'text-blue-500' },
          { label: 'Synced Opportunities', value: '394', desc: '$14.2M pipeline value', icon: ArrowRightLeft, color: 'text-emerald-500' },
          { label: 'Sync Frequency', value: 'Real-Time', desc: 'Webhook streaming', icon: Zap, color: 'text-amber-500' },
          { label: 'OAuth Token Status', value: 'Active', desc: 'Auto-refreshed daily', icon: ShieldCheck, color: 'text-purple-500' },
        ].map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div key={idx} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-2">
              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase">
                <Icon className={`w-4 h-4 ${kpi.color}`} />
                {kpi.label}
              </div>
              <p className="text-2xl font-bold text-slate-900">{kpi.value}</p>
              <p className="text-xs text-slate-500">{kpi.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200">
        {(['OVERVIEW', 'MAPPING', 'LOGS'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-colors ${
              activeTab === tab
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            {tab === 'OVERVIEW' && 'Object Sync Status'}
            {tab === 'MAPPING' && 'Field Mapping Matrix'}
            {tab === 'LOGS' && 'Sync Activity Logs'}
          </button>
        ))}
      </div>

      {/* Tab: Overview */}
      {activeTab === 'OVERVIEW' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 border-b border-slate-100 text-[10px] font-bold uppercase text-slate-500">
              <tr>
                <th className="p-4">Entity</th>
                <th className="p-4">Salesforce Object</th>
                <th className="p-4">EasyChat Records</th>
                <th className="p-4">Salesforce Records</th>
                <th className="p-4">Direction</th>
                <th className="p-4">Status</th>
                <th className="p-4">Last Synced</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {SYNC_OBJECTS.map((obj) => (
                <tr key={obj.id} className="hover:bg-slate-50">
                  <td className="p-4 font-bold text-slate-900">{obj.name}</td>
                  <td className="p-4 font-mono text-slate-600">{obj.sfObject}</td>
                  <td className="p-4">{obj.easychatCount.toLocaleString()}</td>
                  <td className="p-4">{obj.sfCount.toLocaleString()}</td>
                  <td className="p-4">
                    <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full text-[10px] font-bold">
                      {obj.biDirectional ? 'Two-Way ⇄' : 'One-Way →'}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="bg-emerald-100 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full text-[10px] font-bold">
                      {obj.syncStatus}
                    </span>
                  </td>
                  <td className="p-4 text-slate-500">{obj.lastSynced}</td>
                  <td className="p-4">
                    <button className="text-blue-600 hover:text-blue-800 font-bold">Re-sync</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab: Field Mapping */}
      {activeTab === 'MAPPING' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Contact & Lead Field Mappings</h3>
              <p className="text-xs text-slate-500">Configure how EasyChat contact attributes translate to Salesforce Contact fields.</p>
            </div>
            <button className="px-3 py-1.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50">
              + Add Custom Mapping
            </button>
          </div>
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 border-b border-slate-100 text-[10px] font-bold uppercase text-slate-500">
              <tr>
                <th className="p-4">EasyChat Field</th>
                <th className="p-4">Salesforce Field API Name</th>
                <th className="p-4">Data Type</th>
                <th className="p-4">Sync Direction</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {FIELD_MAPPINGS.map((m, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="p-4 font-mono font-bold text-slate-900">{m.easychatField}</td>
                  <td className="p-4 font-mono text-blue-600">{m.sfField}</td>
                  <td className="p-4 text-slate-500">{m.type}</td>
                  <td className="p-4">
                    <span className="bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-full text-[10px] font-bold">
                      {m.direction}
                    </span>
                  </td>
                  <td className="p-4">
                    <button className="text-slate-400 hover:text-slate-600">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab: Logs */}
      {activeTab === 'LOGS' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <h3 className="font-bold text-slate-900 text-sm">Recent Sync Batches</h3>
          <div className="space-y-3">
            {[
              { time: '14:32:10', event: 'Contact batch update (45 records)', status: 'SUCCESS', latency: '420ms' },
              { time: '14:30:00', event: 'Opportunity stage change: Deal #491 → Closed Won', status: 'SUCCESS', latency: '210ms' },
              { time: '14:15:22', event: 'Lead conversion: Lead #102 → Contact + Opportunity', status: 'SUCCESS', latency: '580ms' },
              { time: '14:00:00', event: 'Full sync reconciliation', status: 'SUCCESS', latency: '3,410ms' },
            ].map((log, i) => (
              <div key={i} className="flex items-center justify-between border border-slate-100 rounded-xl p-4 text-xs">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-slate-400">{log.time}</span>
                  <span className="font-bold text-slate-900">{log.event}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-mono text-slate-400">{log.latency}</span>
                  <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full text-[10px] font-bold">
                    {log.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
