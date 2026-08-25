export interface MockAgentSkillProfile {
  agentId: string;
  fullName: string;
  email: string;
  department: 'CUSTOMER_SUCCESS' | 'ENTERPRISE_SALES' | 'TIER_3_ENGINEERING' | 'BILLING_OPERATIONS';
  spokenLanguages: Array<{ language: string; proficiency: 'NATIVE' | 'FLUENT' | 'WORKING' }>;
  technicalSkills: string[];
  maxConcurrencyLimit: number;
  certifications: string[];
  averageCsatLast90Days: number;
  totalResolvedTickets: number;
}

export const ENTERPRISE_AGENT_SKILLS: MockAgentSkillProfile[] = [
  {
    agentId: 'u_sarah_01',
    fullName: 'Sarah Jenkins',
    email: 'sarah.jenkins@easychat.io',
    department: 'TIER_3_ENGINEERING',
    spokenLanguages: [
      { language: 'English', proficiency: 'NATIVE' },
      { language: 'Spanish', proficiency: 'FLUENT' },
    ],
    technicalSkills: ['WebRTC SIP', 'Okta SAML 2.0', 'PostgreSQL Optimization', 'Stripe Webhooks'],
    maxConcurrencyLimit: 6,
    certifications: ['AWS Certified Solutions Architect', 'SOC 2 Lead Implementer', 'Zendesk Master'],
    averageCsatLast90Days: 4.96,
    totalResolvedTickets: 1842,
  },
  {
    agentId: 'u_rahul_02',
    fullName: 'Rahul Varma',
    email: 'rahul.varma@easychat.io',
    department: 'ENTERPRISE_SALES',
    spokenLanguages: [
      { language: 'English', proficiency: 'NATIVE' },
      { language: 'Hindi', proficiency: 'NATIVE' },
      { language: 'German', proficiency: 'WORKING' },
    ],
    technicalSkills: ['CPQ Pricing Engine', 'Salesforce Enterprise CDC', 'HubSpot OAuth Sync', 'Contract E-Signature'],
    maxConcurrencyLimit: 4,
    certifications: ['Salesforce Certified Administrator', 'HubSpot Solutions Partner'],
    averageCsatLast90Days: 4.92,
    totalResolvedTickets: 1250,
  },
  {
    agentId: 'u_david_03',
    fullName: 'David Chen',
    email: 'david.chen@easychat.io',
    department: 'CUSTOMER_SUCCESS',
    spokenLanguages: [
      { language: 'English', proficiency: 'NATIVE' },
      { language: 'Mandarin', proficiency: 'NATIVE' },
    ],
    technicalSkills: ['HIPAA PHI Audit Logging', 'GDPR Article 17 Erasure', 'Erlang C Queueing Theory'],
    maxConcurrencyLimit: 5,
    certifications: ['Certified Information Privacy Professional (CIPP/E)', 'HIPAA Compliance Officer'],
    averageCsatLast90Days: 4.88,
    totalResolvedTickets: 1590,
  },
  {
    agentId: 'u_emily_04',
    fullName: 'Emily Thorne',
    email: 'emily.thorne@easychat.io',
    department: 'BILLING_OPERATIONS',
    spokenLanguages: [
      { language: 'English', proficiency: 'NATIVE' },
      { language: 'French', proficiency: 'FLUENT' },
    ],
    technicalSkills: ['ASC 606 Revenue Recognition', 'Stripe Billing API', 'Dispute Mitigation', 'TaxJar VAT Engine'],
    maxConcurrencyLimit: 5,
    certifications: ['Certified Public Accountant (CPA)', 'Stripe Certified Billing Professional'],
    averageCsatLast90Days: 4.95,
    totalResolvedTickets: 980,
  },
];
