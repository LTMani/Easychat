export interface MockPriceBookEntry {
  sku: string;
  name: string;
  category: 'CORE_SEAT' | 'ADD_ON_MODULE' | 'USAGE_PACK' | 'PROFESSIONAL_SERVICES';
  billingFrequency: 'MONTHLY' | 'ANNUAL' | 'ONE_TIME';
  listPriceUsd: number;
  minQuantity: number;
  maxDiscountPercentAllowed: number;
  volumeTierDiscounts: Array<{ minSeats: number; maxSeats: number; discountPercent: number }>;
}

export const ENTERPRISE_CPQ_PRICE_BOOKS: MockPriceBookEntry[] = [
  {
    sku: 'SKU_SEAT_ENTERPRISE',
    name: 'EasyChat Enterprise Agent Seat',
    category: 'CORE_SEAT',
    billingFrequency: 'ANNUAL',
    listPriceUsd: 2490.0,
    minQuantity: 5,
    maxDiscountPercentAllowed: 25,
    volumeTierDiscounts: [
      { minSeats: 5, maxSeats: 19, discountPercent: 0 },
      { minSeats: 20, maxSeats: 49, discountPercent: 10 },
      { minSeats: 50, maxSeats: 99, discountPercent: 15 },
      { minSeats: 100, maxSeats: 9999, discountPercent: 25 },
    ],
  },
  {
    sku: 'SKU_SEAT_PRO',
    name: 'EasyChat Professional Agent Seat',
    category: 'CORE_SEAT',
    billingFrequency: 'ANNUAL',
    listPriceUsd: 990.0,
    minQuantity: 1,
    maxDiscountPercentAllowed: 15,
    volumeTierDiscounts: [
      { minSeats: 1, maxSeats: 9, discountPercent: 0 },
      { minSeats: 10, maxSeats: 29, discountPercent: 8 },
      { minSeats: 30, maxSeats: 999, discountPercent: 15 },
    ],
  },
  {
    sku: 'SKU_MOD_AI_COPILOT',
    name: 'Grounded AI Copilot & Semantic Vector Engine',
    category: 'ADD_ON_MODULE',
    billingFrequency: 'ANNUAL',
    listPriceUsd: 4800.0,
    minQuantity: 1,
    maxDiscountPercentAllowed: 20,
    volumeTierDiscounts: [{ minSeats: 1, maxSeats: 1, discountPercent: 0 }],
  },
  {
    sku: 'SKU_MOD_SIP_TRUNKING',
    name: 'Dedicated WebRTC SIP Carrier Trunking Gateway',
    category: 'ADD_ON_MODULE',
    billingFrequency: 'ANNUAL',
    listPriceUsd: 3600.0,
    minQuantity: 1,
    maxDiscountPercentAllowed: 15,
    volumeTierDiscounts: [{ minSeats: 1, maxSeats: 1, discountPercent: 0 }],
  },
  {
    sku: 'SKU_SVC_ONBOARDING_VIP',
    name: 'White-Glove Enterprise Implementation & Data Migration',
    category: 'PROFESSIONAL_SERVICES',
    billingFrequency: 'ONE_TIME',
    listPriceUsd: 7500.0,
    minQuantity: 1,
    maxDiscountPercentAllowed: 10,
    volumeTierDiscounts: [{ minSeats: 1, maxSeats: 1, discountPercent: 0 }],
  },
];
