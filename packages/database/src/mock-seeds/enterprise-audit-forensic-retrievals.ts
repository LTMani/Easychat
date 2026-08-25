export interface MockForensicRetrievalRequest {
  requestId: string;
  requesterOrg: string;
  auditScope: 'SOC2_TYPE_II_EVALUATION' | 'HIPAA_OCR_AUDIT' | 'GDPR_SUPERVISORY_AUTHORITY' | 'LEGAL_SUBPOENA';
  dateRangeStart: string;
  dateRangeEnd: string;
  totalRecordsExported: number;
  cryptographicSignature: string;
  status: 'COMPLETED_ENCRYPTED_DELIVERY' | 'IN_PROGRESS';
  deliveredToSftpServer: string;
}

export const ENTERPRISE_AUDIT_FORENSIC_RETRIEVALS: MockForensicRetrievalRequest[] = [
  {
    requestId: 'retrieval_soc2_2026_q2',
    requesterOrg: 'Schellman & Company, LLC',
    auditScope: 'SOC2_TYPE_II_EVALUATION',
    dateRangeStart: '2026-01-01T00:00:00Z',
    dateRangeEnd: '2026-06-30T23:59:59Z',
    totalRecordsExported: 489200,
    cryptographicSignature: '4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b',
    status: 'COMPLETED_ENCRYPTED_DELIVERY',
    deliveredToSftpServer: 'sftp.schellman-audits.com:/vault/incoming/easychat_2026.enc',
  },
  {
    requestId: 'retrieval_hipaa_ocr_2026',
    requesterOrg: 'US Dept of Health and Human Services (OCR)',
    auditScope: 'HIPAA_OCR_AUDIT',
    dateRangeStart: '2026-03-01T00:00:00Z',
    dateRangeEnd: '2026-05-31T23:59:59Z',
    totalRecordsExported: 142100,
    cryptographicSignature: 'b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9',
    status: 'COMPLETED_ENCRYPTED_DELIVERY',
    deliveredToSftpServer: 'sftp.hhs.gov:/compliance/easychat_phi_audit_2026.enc',
  },
];
