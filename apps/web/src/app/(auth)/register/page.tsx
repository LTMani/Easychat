'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Building2, User, Mail, Lock, Sparkles, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: 'Rahul Varma',
    email: 'rahul.varma@acme.com',
    organizationName: 'Acme Global Technologies',
    workspaceSlug: 'acme-global',
    password: 'Password123!',
    teamSize: '20-50',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // 1. Try to register with backend API
      try {
        const names = formData.fullName.trim().split(' ');
        const firstName = names[0] || 'Admin';
        const lastName = names.slice(1).join(' ') || 'User';

        const res = await fetch('http://localhost:4000/api/v1/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            firstName,
            lastName,
            email: formData.email,
            password: formData.password,
            organizationName: formData.organizationName,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          localStorage.setItem('accessToken', data.data?.accessToken || 'reg_token');
          localStorage.setItem('refreshToken', data.data?.refreshToken || 'reg_refresh');
          localStorage.setItem('userName', formData.fullName);
          localStorage.setItem('userEmail', formData.email);
          window.location.href = '/';
          return;
        }
      } catch (backendErr) {
        // Backend API offline, fallback to local workspace registration
      }

      // 2. Demo fallback registration
      if (formData.email && formData.password) {
        localStorage.setItem('accessToken', `demo_reg_${Date.now()}`);
        localStorage.setItem('userName', formData.fullName);
        localStorage.setItem('userEmail', formData.email);
        localStorage.setItem('orgName', formData.organizationName);
        window.location.href = '/';
        return;
      }

      throw new Error('Please fill in all required fields');
    } catch (err: any) {
      setError(err.message || 'Failed to create workspace');
    } finally {
      setLoading(false);
    }
  };

  const handleAutoFill = () => {
    setFormData({
      fullName: 'Rahul Varma',
      email: 'rahul.varma@acmecorp.com',
      organizationName: 'Acme Enterprise Solutions',
      workspaceSlug: 'acme-corp',
      password: 'EnterpriseSecure2026!',
      teamSize: '50-200',
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] px-4 py-12">
      <div className="max-w-lg w-full bg-white rounded-3xl border border-slate-200/80 p-8 shadow-xl space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#6366f1] to-[#8b5cf6] flex items-center justify-center text-white font-black text-2xl mx-auto shadow-md shadow-indigo-500/20">
            E
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Create your CRM Workspace</h2>
          <p className="text-xs text-slate-500">Get started with omnichannel chat, sales pipelines, and AI copilot</p>
        </div>

        {error && (
          <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full pl-8 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                  placeholder="Rahul Varma"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Work Email
              </label>
              <div className="relative">
                <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-8 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                  placeholder="rahul@acme.com"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Company / Organization Name
            </label>
            <div className="relative">
              <Building2 className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={formData.organizationName}
                onChange={(e) => setFormData({ ...formData, organizationName: e.target.value, workspaceSlug: e.target.value.toLowerCase().replace(/[^a-z0-9]/g, '-') })}
                className="w-full pl-8 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                placeholder="Acme Global Corporation"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Workspace Domain
              </label>
              <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-mono text-slate-600">
                <span className="text-indigo-600 font-bold truncate max-w-[90px]">{formData.workspaceSlug || 'acme'}</span>
                <span className="text-slate-400 text-[11px]">.easychat.io</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Team Size
              </label>
              <select
                value={formData.teamSize}
                onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-indigo-500 font-medium text-slate-700"
              >
                <option value="1-10">1 - 10 employees</option>
                <option value="20-50">20 - 50 employees</option>
                <option value="50-200">50 - 200 employees</option>
                <option value="200+">200+ Enterprise</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                minLength={8}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full pl-8 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                placeholder="••••••••••••"
              />
            </div>
            <p className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-500" /> Must be at least 8 characters with 1 special symbol
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 text-xs font-bold text-white bg-[#4f46e5] hover:bg-indigo-500 rounded-xl shadow-md shadow-indigo-500/20 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? 'Creating Workspace...' : 'Create CRM Workspace'}
            {!loading && <ArrowRight className="w-4 h-4" />}
          </button>
        </form>

        {/* 1-Click Quick Auto-Fill Demo */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          <button
            type="button"
            onClick={handleAutoFill}
            className="text-[11px] font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 bg-indigo-50 px-2.5 py-1 rounded-lg"
          >
            <Sparkles className="w-3.5 h-3.5" /> Auto-fill Sample Data
          </button>

          <div className="text-slate-500 text-xs">
            Already have an account?{' '}
            <Link href="/login" className="font-bold text-indigo-600 hover:underline">
              Sign In →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
