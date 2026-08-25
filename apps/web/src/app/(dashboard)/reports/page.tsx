'use client';

import React from 'react';
import { ReportBuilder } from '../../../components/analytics/ReportBuilder';

export default function CustomReportsPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Custom Reports & Analytics Engine</h1>
        <p className="text-sm text-slate-500 mt-1">
          Build pivot tables, filter revenue metrics, and export executive analytics data.
        </p>
      </div>

      <ReportBuilder />
    </div>
  );
}
