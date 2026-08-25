export interface MockPortalFaq {
  faqId: string;
  category: 'BILLING' | 'INTEGRATIONS' | 'SLA' | 'TELEPHONY' | 'SECURITY';
  question: string;
  answerMarkdown: string;
  views: number;
  helpfulCount: number;
}

export const ENTERPRISE_PORTAL_FAQS: MockPortalFaq[] = [
  {
    faqId: 'faq_01',
    category: 'SLA',
    question: 'What is the guaranteed response time for Priority 1 critical outages?',
    answerMarkdown: 'EasyChat guarantees a 15-minute first response time for all Priority 1 outages 24/7/365 under our Enterprise Master Services Agreement.',
    views: 4520,
    helpfulCount: 382,
  },
  {
    faqId: 'faq_02',
    category: 'INTEGRATIONS',
    question: 'How do I authenticate the HubSpot CRM bi-directional sync?',
    answerMarkdown: 'Navigate to Settings > Integrations > HubSpot and authorize via OAuth 2.0. Ensure contact and deal read/write scopes are selected.',
    views: 3100,
    helpfulCount: 245,
  },
  {
    faqId: 'faq_03',
    category: 'SECURITY',
    question: 'Where can I download the SOC 2 Type II audit report?',
    answerMarkdown: 'Enterprise workspace administrators can download our audited SOC 2 Type II report directly from the Security & Compliance Vault.',
    views: 2840,
    helpfulCount: 210,
  },
  {
    faqId: 'faq_04',
    category: 'TELEPHONY',
    question: 'Which codecs are supported for in-browser WebRTC voice calling?',
    answerMarkdown: 'We natively support Opus HD wideband audio with automatic dynamic bitrates and G.711 u-law/a-law for PSTN carrier interconnects.',
    views: 1980,
    helpfulCount: 175,
  },
];
