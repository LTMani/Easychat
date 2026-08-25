'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function OrganizationSettingsPage() {
  const [orgData, setOrgData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('MEMBER');
  const [inviteLoading, setInviteLoading] = useState(false);

  const fetchOrganization = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        window.location.href = '/login';
        return;
      }

      const res = await fetch('http://localhost:4000/api/v1/organizations/me', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to load organization');
      setOrgData(data.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrganization();
  }, []);

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setInviteLoading(true);
    try {
      const token = localStorage.getItem('accessToken');
      const res = await fetch('http://localhost:4000/api/v1/organizations/members/invite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email: inviteEmail, role: inviteRole }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to invite member');

      setInviteEmail('');
      alert('Member invited successfully!');
      fetchOrganization();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setInviteLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Link href="/" className="w-8 h-8 bg-blue-600 rounded-lg text-white font-bold flex items-center justify-center">
            E
          </Link>
          <h1 className="text-xl font-bold text-slate-900">Organization Settings</h1>
        </div>
        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = '/login';
          }}
          className="text-sm font-medium text-slate-600 hover:text-red-600"
        >
          Sign Out
        </button>
      </header>

      <main className="max-w-6xl w-full mx-auto px-6 py-8 flex-1">
        {loading ? (
          <div className="text-center py-12 text-slate-500">Loading organization details...</div>
        ) : error ? (
          <div className="p-4 bg-red-50 text-red-700 rounded-lg">{error}</div>
        ) : (
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">{orgData.name}</h2>
                <p className="text-sm text-slate-500 mt-1">Slug: {orgData.slug} | Created: {new Date(orgData.createdAt).toLocaleDateString()}</p>
              </div>
              <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-full border border-green-200">
                Active Workspace
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Team Members</h3>
                <div className="divide-y divide-slate-100">
                  {orgData.members?.map((member: any) => (
                    <div key={member.id} className="py-3 flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-slate-900">
                          {member.user.firstName} {member.user.lastName}
                        </div>
                        <div className="text-xs text-slate-500">{member.user.email}</div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="px-2.5 py-0.5 text-xs font-medium bg-blue-50 text-blue-700 rounded-md border border-blue-100">
                          {member.role}
                        </span>
                        <span className="text-xs font-medium text-slate-500 uppercase">
                          {member.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Invite Team Member</h3>
                <form onSubmit={handleInvite} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                      placeholder="teammate@company.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Role Assignment</label>
                    <select
                      value={inviteRole}
                      onChange={(e) => setInviteRole(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="ADMIN">Admin</option>
                      <option value="MANAGER">Manager</option>
                      <option value="SALES_REP">Sales Rep</option>
                      <option value="SUPPORT_AGENT">Support Agent</option>
                      <option value="MEMBER">Member</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    disabled={inviteLoading}
                    className="w-full py-2 px-4 bg-blue-600 text-white font-semibold text-sm rounded-lg hover:bg-blue-700 shadow-sm disabled:opacity-50"
                  >
                    {inviteLoading ? 'Sending Invite...' : 'Send Invitation'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
