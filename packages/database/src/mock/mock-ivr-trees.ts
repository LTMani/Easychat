export interface MockIvrMenuOption {
  digit: string;
  label: string;
  action: 'ROUTE_SALES' | 'ROUTE_SUPPORT' | 'ROUTE_BILLING' | 'AFTER_HOURS' | 'REPLAY';
  targetQueue: string;
}

export interface MockIvrTreeConfig {
  flowId: string;
  companyName: string;
  welcomePrompt: string;
  businessHoursStartUtc: string;
  businessHoursEndUtc: string;
  options: MockIvrMenuOption[];
}

export const MOCK_IVR_TREES: MockIvrTreeConfig[] = [
  {
    flowId: 'ivr_acme_main',
    companyName: 'Acme Global Corporation',
    welcomePrompt: 'Thank you for calling Acme Global. Press 1 for Enterprise Sales, 2 for Technical Support, 3 for Billing Operations.',
    businessHoursStartUtc: '08:00',
    businessHoursEndUtc: '20:00',
    options: [
      { digit: '1', label: 'Enterprise Sales', action: 'ROUTE_SALES', targetQueue: 'sales_na_tier1' },
      { digit: '2', label: 'Technical Support', action: 'ROUTE_SUPPORT', targetQueue: 'support_vip_urgent' },
      { digit: '3', label: 'Billing Operations', action: 'ROUTE_BILLING', targetQueue: 'finance_billing' },
      { digit: '0', label: 'Operator Assistance', action: 'ROUTE_SUPPORT', targetQueue: 'support_general' },
    ],
  },
  {
    flowId: 'ivr_fintech_eu',
    companyName: 'FinTech Velocity GmbH',
    welcomePrompt: 'Willkommen bei FinTech Velocity. Für Vertrieb drücken Sie die 1, für technischen Support die 2.',
    businessHoursStartUtc: '07:00',
    businessHoursEndUtc: '18:00',
    options: [
      { digit: '1', label: 'Vertrieb (Sales)', action: 'ROUTE_SALES', targetQueue: 'sales_eu_dach' },
      { digit: '2', label: 'Support & Sicherheit', action: 'ROUTE_SUPPORT', targetQueue: 'support_eu_tier2' },
    ],
  },
];
