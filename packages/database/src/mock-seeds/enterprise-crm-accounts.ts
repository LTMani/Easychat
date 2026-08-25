export interface MockCrmAccount {
  id: string;
  name: string;
  domain: string;
  industry: 'FINANCIAL_SERVICES' | 'HEALTHCARE' | 'ECOMMERCE' | 'TELECOMMUNICATIONS' | 'ENTERPRISE_SOFTWARE';
  annualRevenueUsd: number;
  employeeCount: number;
  tier: 'ENTERPRISE' | 'STRATEGIC' | 'GROWTH';
  healthScore: number; // 0 - 100
  primaryContact: {
    name: string;
    email: string;
    phone: string;
    role: string;
  };
  billingAddress: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  customMetadata: Record<string, any>;
}

export const ENTERPRISE_CRM_ACCOUNTS: MockCrmAccount[] = [
  {
    id: 'acc_ent_01',
    name: 'Apex Global Financial Technologies',
    domain: 'apexglobal.com',
    industry: 'FINANCIAL_SERVICES',
    annualRevenueUsd: 145000000,
    employeeCount: 1400,
    tier: 'ENTERPRISE',
    healthScore: 94,
    primaryContact: {
      name: 'Alexander Sterling',
      email: 'a.sterling@apexglobal.com',
      phone: '+1 (212) 555-0199',
      role: 'Chief Information Officer',
    },
    billingAddress: {
      street: '100 Wall Street, 38th Floor',
      city: 'New York',
      state: 'NY',
      postalCode: '10005',
      country: 'United States',
    },
    customMetadata: {
      dedicatedCsm: 'Sarah Jenkins',
      samlSsoEnabled: true,
      slaTier: 'ENTERPRISE_15MIN',
    },
  },
  {
    id: 'acc_ent_02',
    name: 'BioHealth Integrated Systems',
    domain: 'biohealth-systems.org',
    industry: 'HEALTHCARE',
    annualRevenueUsd: 89000000,
    employeeCount: 820,
    tier: 'ENTERPRISE',
    healthScore: 91,
    primaryContact: {
      name: 'Dr. Aris Thorne',
      email: 'athorne@biohealth-systems.org',
      phone: '+1 (617) 555-0142',
      role: 'VP of Clinical Informatics',
    },
    billingAddress: {
      street: '450 Longwood Avenue',
      city: 'Boston',
      state: 'MA',
      postalCode: '02115',
      country: 'United States',
    },
    customMetadata: {
      hipaaBaaSigned: true,
      dedicatedCsm: 'Rahul Varma',
      auditLedgerStreaming: true,
    },
  },
  {
    id: 'acc_ent_03',
    name: 'Nexus Cloud Telecommunications Ltd',
    domain: 'nexus-telecom.co.uk',
    industry: 'TELECOMMUNICATIONS',
    annualRevenueUsd: 210000000,
    employeeCount: 2200,
    tier: 'STRATEGIC',
    healthScore: 88,
    primaryContact: {
      name: 'Eleanor Vance',
      email: 'e.vance@nexus-telecom.co.uk',
      phone: '+44 20 7946 0880',
      role: 'Director of Carrier Operations',
    },
    billingAddress: {
      street: '25 Bank Street, Canary Wharf',
      city: 'London',
      state: 'Greater London',
      postalCode: 'E14 5JP',
      country: 'United Kingdom',
    },
    customMetadata: {
      sipTrunkGateways: ['turn_fra_01', 'turn_iad_01'],
      webrtcOpusHdEnabled: true,
    },
  },
  {
    id: 'acc_ent_04',
    name: 'OmniVanguard Logistics & Supply Chain',
    domain: 'omnivanguard.de',
    industry: 'ENTERPRISE_SOFTWARE',
    annualRevenueUsd: 64000000,
    employeeCount: 540,
    tier: 'GROWTH',
    healthScore: 96,
    primaryContact: {
      name: 'Klaus Reinhardt',
      email: 'kreinhardt@omnivanguard.de',
      phone: '+49 30 555 0192',
      role: 'Head of Global IT',
    },
    billingAddress: {
      street: 'Potsdamer Platz 1',
      city: 'Berlin',
      state: 'Berlin',
      postalCode: '10785',
      country: 'Germany',
    },
    customMetadata: {
      gdprDpoContact: 'dpo@omnivanguard.de',
      euDataResidencyEnforced: true,
    },
  },
];
