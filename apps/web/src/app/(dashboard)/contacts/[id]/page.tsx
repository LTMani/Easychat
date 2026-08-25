'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { User, Activity, Clock, CheckSquare, FileText, DollarSign, Mail, Phone, Building } from 'lucide-react';
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
          <h1 className="text-xl font-bold text-slate-900">Customer 360 Profile & Timeline</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/contacts" className="text-sm font-medium text-slate-600 hover:text-slate-900">
            Back to Contacts
          </Link>
          <NotificationBell />
        </div>
      </header>

      <main className="max-w-6xl w-full mx-auto px-6 py-8 flex-1">
        {loading ? (
          <div className="text-center py-12 text-slate-500">Loading Customer 360 timeline...</div>
        ) : !data ? (
          <div className="text-center py-12 text-slate-500">Contact record not found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Customer Profile Left Sidebar */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-center">
                <div className="w-16 h-16 bg-blue-600 text-white font-bold text-2xl rounded-full flex items-center justify-center mx-auto mb-3">
                  {data.contact?.firstName?.charAt(0)}
                </div>
                <h2 className="text-xl font-bold text-slate-900">
                  {data.contact?.firstName} {data.contact?.lastName}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">{data.contact?.jobTitle || 'Customer Contact'}</p>

                <div className="mt-4 pt-4 border-t border-slate-100 text-left space-y-2 text-xs">
                  <div className="flex items-center space-x-2 text-slate-600">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span>{data.contact?.email}</span>
                  </div>
                  {data.contact?.phone && (
                    <div className="flex items-center space-x-2 text-slate-600">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      <span>{data.contact?.phone}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Active Deals Summary */}
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-sm text-slate-900 mb-3 flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  <span>Associated Deals ({data.contact?.deals?.length || 0})</span>
                </h3>
                <div className="space-y-2">
                  {data.contact?.deals?.map((deal: any) => (
                    <div key={deal.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                      <div className="font-semibold text-xs text-slate-900">{deal.title}</div>
                      <div className="text-xs font-bold text-green-600 mt-0.5">${deal.amount?.toLocaleString()}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Unified 360 Timeline Stream Right Area */}
            <div className="md:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-lg text-slate-900 mb-6 flex items-center space-x-2">
                <Activity className="w-5 h-5 text-blue-600" />
                <span>Unified Customer 360 Activity Stream</span>
              </h3>

              {data.timeline?.length === 0 ? (
                <div className="py-12 text-center text-xs text-slate-400">
                  No activity recorded yet for this customer.
                </div>
              ) : (
                <div className="relative border-l-2 border-slate-200 ml-4 space-y-6">
                  {data.timeline?.map((item: any) => (
                    <div key={item.id} className="relative pl-6">
                      <div className="absolute -left-2.5 top-1.5 w-5 h-5 rounded-full bg-blue-600 border-2 border-white flex items-center justify-center text-white text-[10px]">
                        •
                      </div>
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-xs text-slate-900">{item.title}</span>
                          <span className="text-[10px] text-slate-400">
                            {new Date(item.timestamp).toLocaleString()}
                          </span>
                        </div>
                        {item.description && (
                          <p className="text-xs text-slate-600 leading-relaxed mt-1">{item.description}</p>
                        )}
                        {item.actor && (
                          <div className="text-[10px] text-slate-400 mt-2">
                            Logged by: {item.actor.firstName} {item.actor.lastName}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
