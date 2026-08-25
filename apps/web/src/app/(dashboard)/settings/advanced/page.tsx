'use client';

import React, { useState } from 'react';
import { Settings, Globe, Lock, Bell, Database, Palette, Save, Building } from 'lucide-react';

const TIMEZONES = ['UTC', 'America/New_York', 'America/Chicago', 'America/Los_Angeles', 'America/Toronto', 'Europe/London', 'Europe/Berlin', 'Europe/Paris', 'Asia/Kolkata', 'Asia/Singapore', 'Asia/Tokyo', 'Australia/Sydney'];
const CURRENCIES = ['USD', 'EUR', 'GBP', 'INR', 'SGD', 'AUD', 'CAD', 'JPY', 'BRL', 'MXN'];
const LANGUAGES = ['English (US)', 'English (UK)', 'German', 'French', 'Spanish', 'Portuguese', 'Hindi', 'Japanese'];

type Tab = 'GENERAL' | 'NOTIFICATIONS' | 'SECURITY' | 'DATA' | 'APPEARANCE';

export default function OrganizationSettingsAdvancedPage() {
  const [activeTab, setActiveTab] = useState<Tab>('GENERAL');
  const [settings, setSettings] = useState({
    orgName: 'Acme Corporation',
    supportEmail: 'support@acme.com',
    website: 'https://acme.com',
    timezone: 'America/New_York',
    currency: 'USD',
    language: 'English (US)',
    emailNotifications: true,
    slaBreach: true,
    newLead: true,
    dealWon: true,
    twoFactorRequired: false,
    sessionTimeout: '8',
    dataRetentionDays: '365',
    theme: 'LIGHT',
    accentColor: '#2563eb',
  });

  const handleChange = (key: string, value: unknown) => setSettings((prev) => ({ ...prev, [key]: value }));

  const TABS: { id: Tab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'GENERAL', label: 'General', icon: Building },
    { id: 'NOTIFICATIONS', label: 'Notifications', icon: Bell },
    { id: 'SECURITY', label: 'Security', icon: Lock },
    { id: 'DATA', label: 'Data & Privacy', icon: Database },
    { id: 'APPEARANCE', label: 'Appearance', icon: Palette },
  ];

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div className="flex items-center gap-3 border-b border-slate-200 pb-6">
        <Settings className="w-7 h-7 text-blue-600" />
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Organization Settings</h1>
          <p className="text-sm text-slate-500">Manage your workspace preferences, security policies, and notification rules.</p>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Sidebar Tabs */}
        <nav className="w-48 shrink-0 space-y-1">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-xs font-bold rounded-xl text-left transition-colors ${activeTab === tab.id ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                <Icon className="w-4 h-4" />{tab.label}
              </button>
            );
          })}
        </nav>

        {/* Settings Panel */}
        <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5">
          {activeTab === 'GENERAL' && (
            <>
              <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2"><Globe className="w-4 h-4 text-blue-500" />General Settings</h3>
              {[
                { label: 'Organization Name', key: 'orgName', type: 'text', placeholder: 'Your company name' },
                { label: 'Support Email Address', key: 'supportEmail', type: 'email', placeholder: 'support@yourcompany.com' },
                { label: 'Website URL', key: 'website', type: 'url', placeholder: 'https://yourcompany.com' },
              ].map(({ label, key, type, placeholder }) => (
                <div key={key}>
                  <label className="block text-xs font-bold text-slate-700 mb-1">{label}</label>
                  <input type={type} value={(settings as any)[key]} onChange={(e) => handleChange(key, e.target.value)} placeholder={placeholder} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              ))}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Timezone</label>
                  <select value={settings.timezone} onChange={(e) => handleChange('timezone', e.target.value)} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:ring-2 focus:ring-blue-500">
                    {TIMEZONES.map((tz) => <option key={tz}>{tz}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Default Currency</label>
                  <select value={settings.currency} onChange={(e) => handleChange('currency', e.target.value)} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:ring-2 focus:ring-blue-500">
                    {CURRENCIES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
            </>
          )}

          {activeTab === 'NOTIFICATIONS' && (
            <>
              <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2"><Bell className="w-4 h-4 text-amber-500" />Notification Preferences</h3>
              <p className="text-xs text-slate-500">Control which events trigger notifications for all team members.</p>
              <div className="space-y-3">
                {[
                  { key: 'emailNotifications', label: 'Email Notifications', desc: 'Send email alerts for critical events' },
                  { key: 'slaBreach', label: 'SLA Breach Alerts', desc: 'Alert when a ticket breaches its SLA target' },
                  { key: 'newLead', label: 'New Lead Assignments', desc: 'Notify agents when a lead is assigned to them' },
                  { key: 'dealWon', label: 'Deal Won Announcements', desc: 'Broadcast to Slack/email when a deal is closed won' },
                ].map(({ key, label, desc }) => (
                  <div key={key} className="flex items-center justify-between border border-slate-100 rounded-xl p-4">
                    <div>
                      <p className="text-xs font-bold text-slate-900">{label}</p>
                      <p className="text-[10px] text-slate-500">{desc}</p>
                    </div>
                    <button onClick={() => handleChange(key, !(settings as any)[key])} className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${(settings as any)[key] ? 'bg-blue-600' : 'bg-slate-200'}`}>
                      <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${(settings as any)[key] ? 'translate-x-4' : 'translate-x-1'}`} />
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === 'SECURITY' && (
            <>
              <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2"><Lock className="w-4 h-4 text-red-500" />Security Policies</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between border border-slate-100 rounded-xl p-4">
                  <div>
                    <p className="text-xs font-bold text-slate-900">Require 2FA for All Members</p>
                    <p className="text-[10px] text-slate-500">Force two-factor authentication for every account in this organization</p>
                  </div>
                  <button onClick={() => handleChange('twoFactorRequired', !settings.twoFactorRequired)} className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${settings.twoFactorRequired ? 'bg-red-600' : 'bg-slate-200'}`}>
                    <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${settings.twoFactorRequired ? 'translate-x-4' : 'translate-x-1'}`} />
                  </button>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Session Timeout (hours)</label>
                  <select value={settings.sessionTimeout} onChange={(e) => handleChange('sessionTimeout', e.target.value)} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:ring-2 focus:ring-blue-500">
                    {['1', '2', '4', '8', '24', '168'].map((h) => <option key={h} value={h}>{h === '168' ? '1 week' : `${h} hour${h === '1' ? '' : 's'}`}</option>)}
                  </select>
                </div>
              </div>
            </>
          )}

          {activeTab === 'DATA' && (
            <>
              <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2"><Database className="w-4 h-4 text-purple-500" />Data & Privacy</h3>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Audit Log Retention (days)</label>
                <select value={settings.dataRetentionDays} onChange={(e) => handleChange('dataRetentionDays', e.target.value)} className="w-48 border border-slate-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:ring-2 focus:ring-blue-500">
                  {['90', '180', '365', '730'].map((d) => <option key={d}>{d}</option>)}
                </select>
              </div>
            </>
          )}

          {activeTab === 'APPEARANCE' && (
            <>
              <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2"><Palette className="w-4 h-4 text-indigo-500" />Appearance</h3>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">Theme</label>
                <div className="flex gap-3">
                  {['LIGHT', 'DARK', 'SYSTEM'].map((t) => (
                    <button key={t} onClick={() => handleChange('theme', t)} className={`px-4 py-2 text-xs font-bold rounded-xl border transition-colors ${settings.theme === t ? 'bg-blue-600 text-white border-blue-600' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}>{t}</button>
                  ))}
                </div>
              </div>
            </>
          )}

          <div className="pt-4 border-t border-slate-100">
            <button className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl flex items-center gap-2 transition-colors">
              <Save className="w-3.5 h-3.5" />Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
