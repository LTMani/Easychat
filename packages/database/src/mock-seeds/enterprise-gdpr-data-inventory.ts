export interface MockGdprDataProcessingActivity {
  activityId: string;
  businessProcess: string;
  dataController: string;
  dataProtectionOfficer: string;
  categoriesOfPersonalData: string[];
  categoriesOfDataSubjects: string[];
  legalBasisForProcessing: 'CONSENT' | 'CONTRACTUAL_NECESSITY' | 'LEGAL_OBLIGATION' | 'LEGITIMATE_INTERESTS';
  recipientsOfData: string[];
  internationalTransfers: Array<{ countryCode: string; transferMechanism: 'EU_US_DATA_PRIVACY_FRAMEWORK' | 'STANDARD_CONTRACTUAL_CLAUSES' }>;
  retentionPeriodDescription: string;
  technicalSecurityMeasures: string[];
}

export const ENTERPRISE_GDPR_DATA_INVENTORY: MockGdprDataProcessingActivity[] = [
  {
    activityId: 'gdpr_ropa_01',
    businessProcess: 'Omnichannel Customer Support & Live Chat Ticketing',
    dataController: 'EasyChat Inc. & Subscribing Enterprise Tenants',
    dataProtectionOfficer: 'privacy@easychat.io',
    categoriesOfPersonalData: ['Full Name', 'Work Email Address', 'Phone Number', 'IP Address', 'Chat Message History'],
    categoriesOfDataSubjects: ['Customer Support Seekers', 'Workspace Agents', 'Enterprise Admins'],
    legalBasisForProcessing: 'CONTRACTUAL_NECESSITY',
    recipientsOfData: ['Internal Support Desk', 'Regional WebRTC Edge Gateways', 'Tier 3 Engineering'],
    internationalTransfers: [
      { countryCode: 'US', transferMechanism: 'EU_US_DATA_PRIVACY_FRAMEWORK' },
      { countryCode: 'GB', transferMechanism: 'STANDARD_CONTRACTUAL_CLAUSES' },
    ],
    retentionPeriodDescription: 'Chat transcripts retained for 365 days unless Article 17 erasure requested.',
    technicalSecurityMeasures: ['TLS 1.3 In-Transit Encryption', 'AES-256-GCM At-Rest Encryption', 'RBAC Least Privilege'],
  },
  {
    activityId: 'gdpr_ropa_02',
    businessProcess: 'Enterprise CPQ Billing & Subscription Invoicing',
    dataController: 'EasyChat Global Finance Operations',
    dataProtectionOfficer: 'dpo@easychat.io',
    categoriesOfPersonalData: ['Billing Contact Name', 'Corporate Tax ID', 'Billing Address', 'Payment Transaction ID'],
    categoriesOfDataSubjects: ['Enterprise Account Billing Contacts'],
    legalBasisForProcessing: 'LEGAL_OBLIGATION',
    recipientsOfData: ['Stripe Inc. (PCI-DSS Level 1)', 'Accounts Receivable Desk'],
    internationalTransfers: [
      { countryCode: 'US', transferMechanism: 'EU_US_DATA_PRIVACY_FRAMEWORK' },
    ],
    retentionPeriodDescription: 'Financial transaction records retained for 7 years under statutory tax code obligations.',
    technicalSecurityMeasures: ['PCI-DSS Tokenization', 'KMS Master KEK HSM Wrapping', 'Immutable Audit Signatures'],
  },
  {
    activityId: 'gdpr_ropa_03',
    businessProcess: 'WebRTC Telephony Call Quality & MOS Telemetry',
    dataController: 'EasyChat Telephony Infrastructure Team',
    dataProtectionOfficer: 'privacy@easychat.io',
    categoriesOfPersonalData: ['Caller Phone Number', 'Recipient Phone Number', 'IP Address', 'Jitter/Packet Loss Telemetry'],
    categoriesOfDataSubjects: ['Voice Call Participants'],
    legalBasisForProcessing: 'LEGITIMATE_INTERESTS',
    recipientsOfData: ['Regional TURN Relay Clusters', 'Voice Quality NOC'],
    internationalTransfers: [
      { countryCode: 'DE', transferMechanism: 'STANDARD_CONTRACTUAL_CLAUSES' },
      { countryCode: 'SG', transferMechanism: 'STANDARD_CONTRACTUAL_CLAUSES' },
    ],
    retentionPeriodDescription: 'Packet loss and latency metrics aggregated anonymously after 30 days.',
    technicalSecurityMeasures: ['SRTP Voice Stream Encryption', 'HMAC Ephemeral Tokens', 'Geo-DNS Boundary Enclosure'],
  },
  {
    activityId: 'gdpr_ropa_04',
    businessProcess: 'AI Copilot RAG Semantic Vector Indexing',
    dataController: 'EasyChat AI Core Systems',
    dataProtectionOfficer: 'ai-governance@easychat.io',
    categoriesOfPersonalData: ['Public Knowledge Base Text', 'Redacted Help Articles', 'Support Resolution Guides'],
    categoriesOfDataSubjects: ['Public Knowledge Base Authors'],
    legalBasisForProcessing: 'LEGITIMATE_INTERESTS',
    recipientsOfData: ['Semantic Vector Engine', 'Cross-Encoder Reranker'],
    internationalTransfers: [
      { countryCode: 'US', transferMechanism: 'EU_US_DATA_PRIVACY_FRAMEWORK' },
    ],
    retentionPeriodDescription: 'Vector embeddings updated dynamically upon knowledge article revision.',
    technicalSecurityMeasures: ['DLP Automated PII Masking', 'Zero-Data-Retention LLM API Agreements', 'Cosine Similarity Isolation'],
  },
];
