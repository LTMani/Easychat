'use client';

import React, { useState } from 'react';
import { Key, Shield, CheckCircle2, XCircle, Copy, Plus, Clock, Trash2 } from 'lucide-react';

const SSO_PROVIDERS = [
  { id: 'okta', name: 'Okta', icon: '🔵', connected: true, users: 28 },
  { id: 'azure', name: 'Microsoft Azure AD', icon: '🟦', connected: false, users: 0 },
  { id: 'gsuite', name: 'Google Workspace', icon: '🟥', connected: false, users: 0 },
  { id: 'onelogin', name: 'OneLogin', icon: '🟩', connected: false, users: 0 },
];

const SAML_CONFIG = {
  entityId: 'https://app.easychat.io/saml/metadata',
  acsUrl: 'https://app.easychat.io/saml/acs',
  sloUrl: 'https://app.easychat.io/saml/slo',
  signingCert: '-----BEGIN CERTIFICATE-----\nMIIDrTCCApWgAwIBAgIUYzJ...(truncated)\n-----END CERTIFICATE-----',
};

export default function SsoConfigurationPage() {
  const [activeProvider, setActiveProvider] = useState<string | null>('okta');
  const [twoFaRequired, setTwoFaRequired] = useState(true);
  const [justInTimeProvisioning, setJustInTimeProvisioning] = useState(true);
  const [scimEnabled, setScimEnabled] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (key: string, value: string) => {
    navigator.clipboard.writeText(value);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div className="flex items-center gap-3 border-b border-slate-200 pb-6">
        <Shield className="w-7 h-7 text-blue-600" />
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">SSO & Identity Provider Configuration</h1>
          <p className="text-sm text-slate-500">Configure SAML 2.0 / OIDC single sign-on and enforce organizational authentication policies.</p>
        </div>
      </div>

      {/* Provider Cards */}
      <div className="grid grid-cols-4 gap-4">
        {SSO_PROVIDERS.map((provider) => (
          <button key={provider.id} onClick={() => setActiveProvider(provider.id)} className={`bg-white rounded-2xl border p-4 text-left space-y-2 transition-all ${activeProvider === provider.id ? 'border-blue-500 shadow-md' : 'border-slate-200 hover:border-blue-300'}`}>
            <div className="flex items-center justify-between">
              <span className="text-2xl">{provider.icon}</span>
              {provider.connected ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <XCircle className="w-4 h-4 text-slate-300" />}
            </div>
            <p className="font-bold text-xs text-slate-900">{provider.name}</p>
            <p className="text-[10px] text-slate-500">{provider.connected ? `${provider.users} users synced` : 'Not connected'}</p>
          </button>
        ))}
      </div>

      {/* SAML Configuration */}
      {activeProvider === 'okta' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5">
          <h3 className="font-bold text-slate-900 flex items-center gap-2"><Key className="w-4 h-4 text-blue-500" />SAML 2.0 Configuration — Okta</h3>

          {Object.entries(SAML_CONFIG).map(([key, value]) => (
            <div key={key}>
              <label className="block text-xs font-bold text-slate-700 mb-1 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</label>
              <div className="flex items-center gap-2">
                <input readOnly value={value} className="flex-1 border border-slate-200 rounded-xl px-4 py-2 text-xs font-mono text-slate-700 bg-slate-50 outline-none" />
                <button onClick={() => handleCopy(key, value)} className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-500">
                  {copied === key ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          ))}

          <div className="pt-4 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-700 mb-3">Okta Metadata URL (paste from your Okta dashboard)</h4>
            <div className="flex items-center gap-2">
              <input placeholder="https://your-org.okta.com/app/.../sso/saml/metadata" className="flex-1 border border-slate-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:ring-2 focus:ring-blue-500" />
              <button className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition-colors">Import</button>
            </div>
          </div>
        </div>
      )}

      {/* Policy Toggles */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <h3 className="font-bold text-slate-900 flex items-center gap-2"><Shield className="w-4 h-4 text-red-500" />Authentication Policies</h3>
        {[
          { key: 'twoFaRequired', value: twoFaRequired, setter: setTwoFaRequired, label: 'Require Two-Factor Authentication', desc: 'Force 2FA for all members who sign in without SSO' },
          { key: 'jit', value: justInTimeProvisioning, setter: setJustInTimeProvisioning, label: 'Just-in-Time User Provisioning', desc: 'Auto-create user accounts on first SSO sign-in' },
          { key: 'scim', value: scimEnabled, setter: setScimEnabled, label: 'Enable SCIM User Sync', desc: 'Sync user accounts and groups from your Identity Provider via SCIM 2.0' },
        ].map(({ key, value, setter, label, desc }) => (
          <div key={key} className="flex items-center justify-between border border-slate-100 rounded-xl p-4">
            <div>
              <p className="text-xs font-bold text-slate-900">{label}</p>
              <p className="text-[10px] text-slate-500">{desc}</p>
            </div>
            <button onClick={() => setter(!value)} className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${value ? 'bg-blue-600' : 'bg-slate-200'}`}>
              <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${value ? 'translate-x-4' : 'translate-x-1'}`} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
