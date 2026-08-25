export interface MockGdprRopaRecord {
  ropaId: string;
  processingActivityName: string;
  dataController: string;
  dataProcessor?: string;
  lawfulBasis: 'ARTICLE_6_1_B_CONTRACT' | 'ARTICLE_6_1_F_LEGITIMATE_INTERESTS' | 'ARTICLE_6_1_C_LEGAL_OBLIGATION' | 'ARTICLE_6_1_A_CONSENT';
  dataCategories: string[];
  dataSubjectTypes: string[];
  retentionPeriodMonths: number;
  securityMeasures: string[];
  crossBorderTransferMechanism: 'EU_STANDARD_CONTRACTUAL_CLAUSES' | 'EU_US_DATA_PRIVACY_FRAMEWORK' | 'ADEQUACY_DECISION';
}

export const ENTERPRISE_GDPR_ROPA_ACTIVITIES: MockGdprRopaRecord[] = [
  {
    ropaId: 'ropa_01',
    processingActivityName: 'Customer Support Omnichannel Interaction Transcripts',
    dataController: 'EasyChat Enterprise Customer (Tenant)',
    dataProcessor: 'EasyChat CRM Inc. (Sub-processor: AWS / Twilio)',
    lawfulBasis: 'ARTICLE_6_1_B_CONTRACT',
    dataCategories: ['Customer Full Name', 'Business Email', 'IP Address', 'Chat Transcript Messages', 'Audio Call Recordings'],
    dataSubjectTypes: ['End-user Customers', 'Prospects', 'Customer Support Agents'],
    retentionPeriodMonths: 24,
    securityMeasures: ['AES-256-GCM Envelope Encryption', 'TLS 1.3 in transit', 'HMAC SHA-256 Audit Trail', 'Role-Based Access Control'],
    crossBorderTransferMechanism: 'EU_STANDARD_CONTRACTUAL_CLAUSES',
  },
  {
    ropaId: 'ropa_02',
    processingActivityName: 'Enterprise SaaS Billing, Invoicing & Tax Compliance',
    dataController: 'EasyChat CRM Inc.',
    dataProcessor: 'Stripe Inc. / Avalara Inc.',
    lawfulBasis: 'ARTICLE_6_1_C_LEGAL_OBLIGATION',
    dataCategories: ['Company Legal Entity Name', 'Billing Address', 'VAT Identification Number', 'Payment Transaction Receipts'],
    dataSubjectTypes: ['Enterprise Account Controllers', 'Authorized Billing Signers'],
    retentionPeriodMonths: 84, // 7-year statutory tax retention
    securityMeasures: ['PCI-DSS Level 1 Tokenization', 'KMS Master Key Wrapping', 'Read-Only Auditor Logging'],
    crossBorderTransferMechanism: 'EU_US_DATA_PRIVACY_FRAMEWORK',
  },
  {
    ropaId: 'ropa_03',
    processingActivityName: 'AI Copilot RAG Knowledge Grounding & Ticket Triage',
    dataController: 'EasyChat Enterprise Customer (Tenant)',
    dataProcessor: 'EasyChat AI Inference Engine (Isolated VPC)',
    lawfulBasis: 'ARTICLE_6_1_F_LEGITIMATE_INTERESTS',
    dataCategories: ['Knowledge Base Articles', 'Ticket Subject Lines', 'Anonymized Conversation Turns'],
    dataSubjectTypes: ['End-user Customers', 'Support Agents'],
    retentionPeriodMonths: 12,
    securityMeasures: ['Zero-Data-Retention Vendor SLAs', 'Automated PII Masking Pre-processor', 'Vector Embeddings Isolation'],
    crossBorderTransferMechanism: 'EU_STANDARD_CONTRACTUAL_CLAUSES',
  },
];
