'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, Sparkles, ArrowRight, UserCheck, ShieldCheck } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('admin@easychat.io');
  const [password, setPassword] = useState('AdminPass123!');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // 1. Try to authenticate against local API server
      try {
        const res = await fetch('http://localhost:4000/api/v1/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });

        if (res.ok) {
          const data = await res.json();
          localStorage.setItem('accessToken', data.data?.accessToken || 'demo_token');
          localStorage.setItem('refreshToken', data.data?.refreshToken || 'demo_refresh_token');
          localStorage.setItem('userName', 'Rahul Varma');
          localStorage.setItem('userEmail', email);
          window.location.href = '/';
          return;
        }
      } catch (networkErr) {
        // Backend API is offline, fall through to local demo auth fallback
      }

      // 2. Demo fallback authentication for local evaluation
      if (email.trim() && password.trim()) {
        localStorage.setItem('accessToken', `demo_at_${Date.now()}`);
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userName', email.includes('admin') ? 'Rahul Varma (Admin)' : 'Sarah Jenkins (Sales Rep)');
        window.location.href = '/';
        return;
      }

      throw new Error('Please enter valid email and password');
    } catch (err: any) {
      setError(err.message || 'Failed to authenticate');
    } finally {
      setLoading(false);
    }
  };

  const setDemoUser = (userEmail: string, userPass: string) => {
    setEmail(userEmail);
    setPassword(userPass);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200/80 p-8 shadow-xl space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#6366f1] to-[#8b5cf6] flex items-center justify-center text-white font-black text-2xl mx-auto shadow-md shadow-indigo-500/20">
            E
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Sign in to EasyChat CRM</h2>
          <p className="text-xs text-slate-500">Access your omnichannel customer workspace</p>
        </div>

        {error && (
          <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Work Email Address
            </label>
            <div className="relative">
              <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-8 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                placeholder="user@organization.com"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold text-slate-700">
                Password
              </label>
              <a href="#" className="text-[10px] font-bold text-indigo-600 hover:underline">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-8 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 text-xs font-bold text-white bg-[#4f46e5] hover:bg-indigo-500 rounded-xl shadow-md shadow-indigo-500/20 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? 'Authenticating...' : 'Sign In to Workspace'}
            {!loading && <ArrowRight className="w-4 h-4" />}
          </button>
        </form>

        {/* 1-Click Quick Demo Login Shortcuts */}
        <div className="pt-3 border-t border-slate-100 space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 text-center">
            Quick 1-Click Demo Profiles
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={() => setDemoUser('admin@easychat.io', 'AdminPass123!')}
              className="p-2.5 bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 rounded-xl text-left font-bold text-slate-800 text-[11px] transition-colors"
            >
              👑 Rahul Varma (Admin)
            </button>
            <button
              type="button"
              onClick={() => setDemoUser('sarah.jenkins@easychat.io', 'UserPass123!')}
              className="p-2.5 bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 rounded-xl text-left font-bold text-slate-800 text-[11px] transition-colors"
            >
              💼 Sarah (Sales Rep)
            </button>
          </div>
        </div>

        {/* Register Organization Workspace Link */}
        <div className="pt-2 border-t border-slate-100 flex flex-col items-center gap-1.5 text-xs text-slate-500 text-center">
          <p>
            Don't have a workspace?{' '}
            <Link href="/register" className="font-bold text-indigo-600 hover:underline">
              Register New Organization →
            </Link>
          </p>
          <Link href="/" className="text-[11px] text-slate-400 hover:text-slate-600 font-medium">
            Or bypass login and explore live dashboard →
          </Link>
        </div>
      </div>
    </div>
  );
}
