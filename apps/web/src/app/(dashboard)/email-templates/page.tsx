'use client';

import React from 'react';
import { EmailTemplateDesigner } from '../../../components/email/EmailTemplateDesigner';

export default function EmailTemplatesPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Email Template Designer</h1>
        <p className="text-sm text-slate-500 mt-1">
          Design HTML email templates with dynamic customer placeholders and live previews.
        </p>
      </div>

      <EmailTemplateDesigner />
    </div>
  );
}
