'use client';

import React, { useState } from 'react';
import { Package, Plus, Search, Star, Tag, Edit, Trash2, DollarSign, Archive, Filter } from 'lucide-react';

const PRODUCTS = [
  { id: 'p1', name: 'EasyChat Starter', sku: 'ECH-STR-001', category: 'Subscription', price: 49, billingPeriod: 'MONTHLY', status: 'ACTIVE', description: 'Perfect for small teams up to 5 agents', stock: null, rating: 4.2, salesCount: 892 },
  { id: 'p2', name: 'EasyChat Pro', sku: 'ECH-PRO-001', category: 'Subscription', price: 99, billingPeriod: 'MONTHLY', status: 'ACTIVE', description: 'Full-featured CRM for growing businesses', stock: null, rating: 4.7, salesCount: 1243 },
  { id: 'p3', name: 'EasyChat Enterprise Annual', sku: 'ECH-ENT-ANN', category: 'Subscription', price: 2988, billingPeriod: 'ANNUAL', status: 'ACTIVE', description: 'Enterprise plan with annual discount, unlimited seats', stock: null, rating: 4.9, salesCount: 187 },
  { id: 'p4', name: 'Professional Implementation', sku: 'SVC-IMPL-001', category: 'Service', price: 3500, billingPeriod: 'ONE_TIME', status: 'ACTIVE', description: 'Dedicated onboarding and implementation services', stock: null, rating: 4.8, salesCount: 134 },
  { id: 'p5', name: 'API Calls Add-on (500k/mo)', sku: 'ADD-API-500K', category: 'Add-on', price: 199, billingPeriod: 'MONTHLY', status: 'ACTIVE', description: 'Additional 500,000 API calls per month', stock: null, rating: 4.3, salesCount: 67 },
  { id: 'p6', name: 'WhatsApp Number Rental', sku: 'ADD-WA-NUM', category: 'Add-on', price: 29, billingPeriod: 'MONTHLY', status: 'ACTIVE', description: 'Dedicated WhatsApp Business phone number', stock: null, rating: 4.1, salesCount: 298 },
  { id: 'p7', name: 'Legacy Basic Plan', sku: 'ECH-BAS-DEP', category: 'Subscription', price: 29, billingPeriod: 'MONTHLY', status: 'ARCHIVED', description: 'Deprecated basic plan — no longer sold', stock: null, rating: 3.8, salesCount: 412 },
];

const CATEGORIES = ['All', 'Subscription', 'Add-on', 'Service'];

const statusBadge: Record<string, string> = {
  ACTIVE: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  ARCHIVED: 'bg-slate-100 text-slate-500 border-slate-200',
  DRAFT: 'bg-amber-100 text-amber-700 border-amber-200',
};

export default function ProductCatalogPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [showArchived, setShowArchived] = useState(false);

  const filtered = PRODUCTS.filter((p) => {
    if (!showArchived && p.status === 'ARCHIVED') return false;
    if (category !== 'All' && p.category !== category) return false;
    if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.sku.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
            <Package className="w-7 h-7 text-indigo-600" />
            Product & Service Catalog
          </h1>
          <p className="text-sm text-slate-500 mt-1">Manage the products and services you quote, sell, and include in proposals.</p>
        </div>
        <button className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-2">
          <Plus className="w-4 h-4" />Add Product
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-5">
        {[
          { label: 'Active Products', value: PRODUCTS.filter((p) => p.status === 'ACTIVE').length.toString(), icon: Package, color: 'text-indigo-500' },
          { label: 'Total Revenue (Catalog)', value: '$' + PRODUCTS.filter((p) => p.status === 'ACTIVE').reduce((a, p) => a + p.salesCount * p.price, 0).toLocaleString(), icon: DollarSign, color: 'text-emerald-500' },
          { label: 'Avg Rating', value: (PRODUCTS.reduce((a, p) => a + p.rating, 0) / PRODUCTS.length).toFixed(1) + '/5', icon: Star, color: 'text-amber-500' },
          { label: 'Categories', value: '3', icon: Tag, color: 'text-blue-500' },
        ].map((s, idx) => {
          const Icon = s.icon;
          return (
            <div key={idx} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-2">
              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase"><Icon className={`w-4 h-4 ${s.color}`} />{s.label}</div>
              <p className="text-xl font-bold text-slate-900">{s.value}</p>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name or SKU..." className="w-full pl-9 pr-4 py-2.5 text-xs border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div className="flex items-center gap-2">
          {CATEGORIES.map((cat) => (
            <button key={cat} onClick={() => setCategory(cat)} className={`px-3 py-1.5 text-[10px] font-bold rounded-full border transition-colors ${category === cat ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}>{cat}</button>
          ))}
        </div>
        <button onClick={() => setShowArchived(!showArchived)} className={`px-3 py-1.5 text-[10px] font-bold rounded-full border flex items-center gap-1.5 transition-colors ${showArchived ? 'bg-slate-600 text-white border-slate-600' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'}`}>
          <Archive className="w-3 h-3" />{showArchived ? 'Hide Archived' : 'Show Archived'}
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 gap-5">
        {filtered.map((product) => (
          <div key={product.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 hover:border-indigo-300 transition-all">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-slate-900 text-sm">{product.name}</h3>
                  <span className={`border px-2 py-0.5 rounded-full text-[10px] font-bold ${statusBadge[product.status]}`}>{product.status}</span>
                </div>
                <p className="text-[10px] font-mono text-slate-400 mb-2">{product.sku}</p>
                <p className="text-xs text-slate-600 mb-3">{product.description}</p>
                <div className="flex items-center gap-4 text-[10px] text-slate-500 font-medium">
                  <span className="bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full font-bold">{product.category}</span>
                  <span className="flex items-center gap-0.5"><Star className="w-3 h-3 text-amber-400 fill-amber-400" />{product.rating}</span>
                  <span>{product.salesCount.toLocaleString()} sold</span>
                  <span className="bg-slate-100 px-2 py-0.5 rounded-full">{product.billingPeriod.replace('_', ' ')}</span>
                </div>
              </div>
              <div className="shrink-0 text-right">
                <p className="font-black text-xl text-slate-900">${product.price.toLocaleString()}</p>
                <p className="text-[10px] text-slate-500">per {product.billingPeriod === 'MONTHLY' ? 'month' : product.billingPeriod === 'ANNUAL' ? 'year' : 'one-time'}</p>
                <div className="flex items-center gap-1 mt-3">
                  <button className="p-1.5 text-slate-400 hover:text-indigo-600 rounded-lg border border-slate-200 hover:border-indigo-300 transition-colors"><Edit className="w-3.5 h-3.5" /></button>
                  <button className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg border border-slate-200 hover:border-red-300 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
