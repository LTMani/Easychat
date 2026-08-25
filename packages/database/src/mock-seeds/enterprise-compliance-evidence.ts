export interface MockComplianceEvidenceRecord {
  evidenceId: string;
  framework: 'SOC2_TYPE_II' | 'HIPAA' | 'ISO_27001' | 'GDPR';
  controlNumber: string;
  controlTitle: string;
  evidenceType: 'AUTOMATED_CONFIG_AUDIT' | 'PENETRATION_TEST_REPORT' | 'ACCESS_REVIEW_LOG';
  evaluatorSystem: string;
  status: 'COMPLIANT' | 'NEEDS_REVIEW';
  lastEvaluatedAt: string;
}

export const ENTERPRISE_COMPLIANCE_EVIDENCE: MockComplianceEvidenceRecord[] = [
  {
    evidenceId: 'ev_soc2_cc6_1',
    framework: 'SOC2_TYPE_II',
    controlNumber: 'CC6.1',
    controlTitle: 'Logical Access Security & RBAC Enforcement',
    evidenceType: 'AUTOMATED_CONFIG_AUDIT',
    evaluatorSystem: 'EasyChat Soc2EvidenceCollectorService',
    status: 'COMPLIANT',
    lastEvaluatedAt: '2026-08-25T12:00:00Z',
  },
  {
    evidenceId: 'ev_soc2_cc6_6',
    framework: 'SOC2_TYPE_II',
    controlNumber: 'CC6.6',
    controlTitle: 'Boundary Protection & Network Firewall Configuration',
    evidenceType: 'AUTOMATED_CONFIG_AUDIT',
    evaluatorSystem: 'EasyChat ZeroTrustIpAllowlistService',
    status: 'COMPLIANT',
    lastEvaluatedAt: '2026-08-25T12:00:00Z',
  },
  {
    evidenceId: 'ev_hipaa_164_312_a',
    framework: 'HIPAA',
    controlNumber: '164.312(a)(1)',
    controlTitle: 'Access Control & Unique User Identification',
    evidenceType: 'ACCESS_REVIEW_LOG',
    evaluatorSystem: 'EasyChat HipaaAuditLoggerService',
    status: 'COMPLIANT',
    lastEvaluatedAt: '2026-08-25T12:00:00Z',
  },
  {
    evidenceId: 'ev_gdpr_art_32',
    framework: 'GDPR',
    controlNumber: 'Article 32',
    controlTitle: 'Security of Processing & AES-256 Envelope Encryption',
    evidenceType: 'AUTOMATED_CONFIG_AUDIT',
    evaluatorSystem: 'EasyChat EnvelopeEncryptionKmsService',
    status: 'COMPLIANT',
    lastEvaluatedAt: '2026-08-25T12:00:00Z',
  },
];
