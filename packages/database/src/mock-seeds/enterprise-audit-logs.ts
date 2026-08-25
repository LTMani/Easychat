export interface MockAuditLogRecord {
  id: string;
  timestamp: string;
  actor: string;
  actorRole: string;
  ipAddress: string;
  userAgent: string;
  action: string;
  resource: string;
  resourceId: string;
  changes: Record<string, { before: any; after: any }>;
  complianceCategory: 'HIPAA_PHI' | 'SOC2_ACCESS' | 'GDPR_PORTABILITY' | 'FINANCIAL_SOX';
  tamperProofHash: string;
}

export const ENTERPRISE_MOCK_AUDIT_LOGS: MockAuditLogRecord[] = [
  {
    id: 'aud_9901',
    timestamp: '2026-08-25T14:20:00Z',
    actor: 'admin@easychat.io',
    actorRole: 'SUPER_ADMIN',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    action: 'ORGANIZATION_SECURITY_POLICY_UPDATE',
    resource: 'Organization',
    resourceId: 'org_enterprise_01',
    changes: {
      mfaRequired: { before: false, after: true },
      sessionTimeoutMinutes: { before: 120, after: 30 },
      ipAllowlist: { before: [], after: ['192.168.1.0/24', '10.0.0.0/16'] },
    },
    complianceCategory: 'SOC2_ACCESS',
    tamperProofHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
  },
  {
    id: 'aud_9902',
    timestamp: '2026-08-25T13:45:12Z',
    actor: 'sarah.jenkins@easychat.io',
    actorRole: 'SALES_REP',
    ipAddress: '10.0.4.22',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    action: 'DEAL_DISCOUNT_APPROVED',
    resource: 'Opportunity',
    resourceId: 'opp_acme_corp_expansion',
    changes: {
      discountPercent: { before: 0, after: 15 },
      approvedBy: { before: null, after: 'rahul.varma@easychat.io' },
      contractTermMonths: { before: 12, after: 36 },
    },
    complianceCategory: 'FINANCIAL_SOX',
    tamperProofHash: 'a8f5f167f44f4964e6c998dee827110c',
  },
  {
    id: 'aud_9903',
    timestamp: '2026-08-25T12:30:00Z',
    actor: 'dr.varma@healthcare.org',
    actorRole: 'CLINICAL_DIRECTOR',
    ipAddress: '172.16.0.45',
    userAgent: 'EasyChat-Hospital-Portal/2.4',
    action: 'PHI_PRESCRIPTION_RECORD_ACCESSED',
    resource: 'PatientRecord',
    resourceId: 'patient_rec_88192',
    changes: {
      accessReason: { before: null, after: 'ROUTINE_TRIAGE_CONSULT' },
      fieldsViewed: { before: [], after: ['medications', 'allergies', 'lab_results'] },
    },
    complianceCategory: 'HIPAA_PHI',
    tamperProofHash: 'b45c22789a1c149afbf4c8996fb92427',
  },
  {
    id: 'aud_9904',
    timestamp: '2026-08-25T11:15:00Z',
    actor: 'gdpr-compliance@easychat.io',
    actorRole: 'DPO_AGENT',
    ipAddress: '10.0.8.10',
    userAgent: 'EasyChat-GDPR-Worker/1.0',
    action: 'GDPR_ARTICLE_17_RIGHT_TO_ERASURE_PROCESSED',
    resource: 'Contact',
    resourceId: 'c_eu_citizen_4412',
    changes: {
      anonymizedFields: { before: ['email', 'phone', 'name'], after: ['[DELETED_GDPR_A17]'] },
      retentionExemption: { before: null, after: 'TAX_INVOICE_ARCHIVE_5_YEARS' },
    },
    complianceCategory: 'GDPR_PORTABILITY',
    tamperProofHash: 'c77f88a91c149afbf4c8996fb9242719',
  },
  {
    id: 'aud_9905',
    timestamp: '2026-08-25T10:00:00Z',
    actor: 'david.chen@easychat.io',
    actorRole: 'SUPPORT_AGENT',
    ipAddress: '192.168.1.105',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    action: 'TICKET_SLA_BREACH_OVERRIDE',
    resource: 'SupportTicket',
    resourceId: 'TKT-1245',
    changes: {
      slaTargetMinutes: { before: 15, after: 60 },
      overrideJustification: { before: null, after: 'CUSTOMER_REQUESTED_DELAYED_CALLBACK' },
    },
    complianceCategory: 'SOC2_ACCESS',
    tamperProofHash: 'd9911c44298fc1c149afbf4c8996fb92',
  },
];
