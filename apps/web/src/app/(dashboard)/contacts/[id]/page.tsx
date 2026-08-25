'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Customer360Workspace } from '../../../../components/customer360/Customer360Workspace';
import { NotificationBell } from '../../../../components/NotificationBell';

export default function Customer360Page({ params }: { params: { id: string } }) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchTimeline = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) return;

      const res = await fetch(`http://localhost:4000/api/v1/customer360/timeline/${params.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const resData = await res.json();
      if (res.ok && resData.data) {
        setData(resData.data);
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTimeline();
  }, [params.id]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Link href="/contacts" className="w-8 h-8 bg-blue-600 rounded-lg text-white font-bold flex items-center justify-center">
            E
          </Link>
          <h1 className="text-xl font-bold text-slate-900">Customer 360 Workspace</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/contacts" className="text-sm font-medium text-slate-600 hover:text-slate-900">
            ← Back to Contacts Grid
          </Link>
          <NotificationBell />
        </div>
      </header>

      <main className="max-w-7xl w-full mx-auto px-6 py-8 flex-1">
        {loading ? (
          <div className="text-center py-12 text-slate-500">Loading Customer 360 workspace...</div>
        ) : !data || !data.contact ? (
          <div className="text-center py-12 text-slate-500">Contact record not found.</div>
        ) : (
          <Customer360Workspace contact={data.contact} />
        )}
      </main>
    </div>
  );
}
