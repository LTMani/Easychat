export interface MockQuoteInventoryItem {
  id: string;
  quoteNumber: string;
  customerCompany: string;
  subtotal: number;
  taxAmount: number;
  grandTotal: number;
  currency: string;
  status: 'DRAFT' | 'SENT' | 'ACCEPTED' | 'REJECTED';
  lineItemCount: number;
}

export const MOCK_QUOTES_INVENTORY: MockQuoteInventoryItem[] = [
  { id: 'q_inv_01', quoteNumber: 'Q-2026-0089', customerCompany: 'TechAlpha Corporation', subtotal: 35858.4, taxAmount: 0.0, grandTotal: 35858.4, currency: 'USD', status: 'SENT', lineItemCount: 3 },
  { id: 'q_inv_02', quoteNumber: 'Q-2026-0090', customerCompany: 'Bavaria Automotive GmbH', subtotal: 125000.0, taxAmount: 23750.0, grandTotal: 148750.0, currency: 'EUR', status: 'ACCEPTED', lineItemCount: 4 },
  { id: 'q_inv_03', quoteNumber: 'Q-2026-0091', customerCompany: 'Mumbai Tech Logistics', subtotal: 42000.0, taxAmount: 7560.0, grandTotal: 49560.0, currency: 'USD', status: 'ACCEPTED', lineItemCount: 2 },
  { id: 'q_inv_04', quoteNumber: 'Q-2026-0092', customerCompany: 'Paris Retail Group', subtotal: 67000.0, taxAmount: 13400.0, grandTotal: 80400.0, currency: 'EUR', status: 'DRAFT', lineItemCount: 3 },
  { id: 'q_inv_05', quoteNumber: 'Q-2026-0093', customerCompany: 'Singapore Investments Ltd', subtotal: 210000.0, taxAmount: 18900.0, grandTotal: 228900.0, currency: 'USD', status: 'SENT', lineItemCount: 5 },
];
