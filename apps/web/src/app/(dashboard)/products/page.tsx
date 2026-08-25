'use client';

import React, { useState } from 'react';
import { Package, Plus, Trash2, Tag, DollarSign, Layers } from 'lucide-react';

export default function ProductsPage() {
  const [products, setProducts] = useState([
    { id: 'prod_1', name: 'EasyChat Enterprise Annual License', sku: 'LIC-ENT-001', unitPrice: 1200.0, currency: 'USD', description: 'Annual seat license for enterprise team access.' },
    { id: 'prod_2', name: 'Dedicated SIP Voice Trunk Add-on', sku: 'ADD-SIP-002', unitPrice: 350.0, currency: 'USD', description: 'Dedicated WebRTC SIP trunking channel.' },
  ]);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
            <Package className="w-7 h-7 text-blue-600" />
            Product Catalog & SKU Price List
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Configure product SKUs, multi-currency price lists, and default unit prices for CPQ quote generation.
          </p>
        </div>

        <button className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-2 transition-colors">
          <Plus className="w-4 h-4" />
          Add Product SKU
        </button>
      </div>

      {/* Product List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold text-[10px]">
            <tr>
              <th className="p-4">SKU Code</th>
              <th className="p-4">Product Name</th>
              <th className="p-4">Description</th>
              <th className="p-4">Unit Price</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-slate-50">
                <td className="p-4 font-mono font-bold text-blue-600 flex items-center gap-2">
                  <Tag className="w-4 h-4 text-slate-400" />
                  {p.sku}
                </td>
                <td className="p-4 font-bold text-slate-900">{p.name}</td>
                <td className="p-4 text-slate-500 max-w-xs truncate">{p.description}</td>
                <td className="p-4 font-mono font-bold text-slate-900">
                  ${p.unitPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })} {p.currency}
                </td>
                <td className="p-4 text-right">
                  <button className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
