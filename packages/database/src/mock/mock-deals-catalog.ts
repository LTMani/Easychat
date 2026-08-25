export interface MockDealRecord {
  id: string;
  title: string;
  amount: number;
  currency: string;
  stageName: string;
  probability: number;
  company: string;
  contactEmail: string;
  expectedCloseDays: number;
  products: string[];
  status: 'OPEN' | 'WON' | 'LOST';
}

export const MOCK_ENTERPRISE_DEALS: MockDealRecord[] = [
  { id: 'md_001', title: 'Global Omnichannel Modernization', amount: 185000, currency: 'USD', stageName: 'Contract Negotiation', probability: 90, company: 'Acme Corp', contactEmail: 'j.vance@techalpha.io', expectedCloseDays: 14, products: ['ECH-ENT-ANN', 'SVC-IMPL-001', 'ADD-WA-100K'], status: 'OPEN' },
  { id: 'md_002', title: 'European Regional Support Rollout', amount: 125000, currency: 'EUR', stageName: 'Proposal Delivered', probability: 75, company: 'Bavaria Automotive', contactEmail: 'k.mueller@bavaria-auto.de', expectedCloseDays: 21, products: ['ECH-ENT-ANN', 'ADD-API-1M'], status: 'OPEN' },
  { id: 'md_003', title: 'WhatsApp Business API Integration', amount: 42000, currency: 'USD', stageName: 'Closed Won', probability: 100, company: 'Mumbai Tech Logistics', contactEmail: 'aarav.patel@mumbai-tech.in', expectedCloseDays: 0, products: ['ECH-PRO-001', 'ADD-WA-100K'], status: 'WON' },
  { id: 'md_004', title: 'Multi-Brand Customer Experience Suite', amount: 67000, currency: 'EUR', stageName: 'Demo & Security Review', probability: 50, company: 'Paris Retail Group', contactEmail: 'c.dubois@paris-retail.fr', expectedCloseDays: 45, products: ['ECH-ENT-ANN'], status: 'OPEN' },
  { id: 'md_005', title: 'SAML SSO & Audit Compliance Upgrade', amount: 95000, currency: 'EUR', stageName: 'Closed Won', probability: 100, company: 'Rome Analytics Spa', contactEmail: 'm.aurelius@rome-analytics.it', expectedCloseDays: 0, products: ['ECH-ENT-ANN', 'SVC-IMPL-001'], status: 'WON' },
  { id: 'md_006', title: 'APAC Customer Support Consolidation', amount: 210000, currency: 'USD', stageName: 'Contract Negotiation', probability: 90, company: 'Singapore Investments Ltd', contactEmail: 'mei.ling@sg-investments.sg', expectedCloseDays: 7, products: ['ECH-ENT-ANN', 'ADD-WA-100K', 'ADD-API-1M'], status: 'OPEN' },
  { id: 'md_007', title: 'UK Financial Compliance CRM Deployment', amount: 78000, currency: 'GBP', stageName: 'Qualification', probability: 25, company: 'London FinTech Alliance', contactEmail: 'oliver.smith@london-fintech.co.uk', expectedCloseDays: 60, products: ['ECH-PRO-001'], status: 'OPEN' },
  { id: 'md_008', title: 'Nordic Healthcare Patient Desk', amount: 110000, currency: 'EUR', stageName: 'Proposal Delivered', probability: 75, company: 'Nordic Health Dynamics', contactEmail: 'patient-care@nordichealth.se', expectedCloseDays: 30, products: ['ECH-ENT-ANN', 'SVC-IMPL-001'], status: 'OPEN' },
  { id: 'md_009', title: 'Tokyo Autonomous Robotics Cloud Desk', amount: 180000, currency: 'USD', stageName: 'Closed Won', probability: 100, company: 'Tokyo Robotics & AI', contactEmail: 'tanaka.h@tokyo-ventures.jp', expectedCloseDays: 0, products: ['ECH-ENT-ANN', 'ADD-API-1M'], status: 'WON' },
  { id: 'md_010', title: 'Australian Renewable Grid Customer Desk', amount: 58000, currency: 'AUD', stageName: 'Prospecting', probability: 10, company: 'Aussie Solar Energy', contactEmail: 'info@aussiesolar.com.au', expectedCloseDays: 90, products: ['ECH-PRO-001'], status: 'OPEN' },
];
