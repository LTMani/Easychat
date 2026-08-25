export interface MockBillingInvoice {
  invoiceId: string;
  invoiceNumber: string;
  customerAccountId: string;
  customerName: string;
  billingPeriodStart: string;
  billingPeriodEnd: string;
  subtotalUsd: number;
  taxUsd: number;
  totalUsd: number;
  status: 'PAID' | 'OPEN' | 'VOID' | 'UNCOLLECTIBLE';
  currency: string;
  lineItems: Array<{ sku: string; description: string; quantity: number; unitPriceUsd: number; amountUsd: number }>;
}

export const ENTERPRISE_BILLING_INVOICES: MockBillingInvoice[] = [
  {
    invoiceId: 'inv_9901_2026',
    invoiceNumber: 'INV-2026-0801',
    customerAccountId: 'acc_ent_01',
    customerName: 'Apex Global Financial Technologies',
    billingPeriodStart: '2026-08-01T00:00:00Z',
    billingPeriodEnd: '2026-08-31T23:59:59Z',
    subtotalUsd: 24900.0,
    taxUsd: 1992.0,
    totalUsd: 26892.0,
    status: 'PAID',
    currency: 'USD',
    lineItems: [
      { sku: 'SKU_SEAT_ENTERPRISE', description: 'Enterprise Seats (Annual Committed)', quantity: 10, unitPriceUsd: 2490.0, amountUsd: 24900.0 },
    ],
  },
  {
    invoiceId: 'inv_9902_2026',
    invoiceNumber: 'INV-2026-0802',
    customerAccountId: 'acc_ent_02',
    customerName: 'BioHealth Integrated Systems',
    billingPeriodStart: '2026-08-01T00:00:00Z',
    billingPeriodEnd: '2026-08-31T23:59:59Z',
    subtotalUsd: 14850.0,
    taxUsd: 0.0,
    totalUsd: 14850.0,
    status: 'PAID',
    currency: 'USD',
    lineItems: [
      { sku: 'SKU_SEAT_PRO', description: 'Professional Seats (Annual Committed)', quantity: 15, unitPriceUsd: 990.0, amountUsd: 14850.0 },
    ],
  },
  {
    invoiceId: 'inv_9903_2026',
    invoiceNumber: 'INV-2026-0803',
    customerAccountId: 'acc_ent_03',
    customerName: 'Nexus Cloud Telecommunications Ltd',
    billingPeriodStart: '2026-08-01T00:00:00Z',
    billingPeriodEnd: '2026-08-31T23:59:59Z',
    subtotalUsd: 29880.0,
    taxUsd: 5976.0,
    totalUsd: 35856.0,
    status: 'PAID',
    currency: 'USD',
    lineItems: [
      { sku: 'SKU_SEAT_ENTERPRISE', description: 'Enterprise Seats (Annual Committed)', quantity: 12, unitPriceUsd: 2490.0, amountUsd: 29880.0 },
    ],
  },
];
