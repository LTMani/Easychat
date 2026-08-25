export interface MockDataRetentionPolicy {
  policyId: string;
  dataType: 'CHAT_TRANSCRIPTS' | 'VOICE_RECORDINGS' | 'AUDIT_LOGS' | 'CUSTOMER_PII' | 'PAYMENT_METADATA';
  retentionDays: number;
  archiveStorageClass: 'AWS_S3_GLACIER_INSTANT' | 'GCP_COLDLINE' | 'HARD_PURGE';
  complianceStandard: 'HIPAA' | 'GDPR_ARTICLE_5' | 'SOC2_CRITERIA_CC6' | 'SOX_SECTION_802';
  autoPurgeEnabled: boolean;
}

export const ENTERPRISE_DATA_RETENTION_POLICIES: MockDataRetentionPolicy[] = [
  {
    policyId: 'ret_chat_transcripts',
    dataType: 'CHAT_TRANSCRIPTS',
    retentionDays: 365,
    archiveStorageClass: 'AWS_S3_GLACIER_INSTANT',
    complianceStandard: 'SOC2_CRITERIA_CC6',
    autoPurgeEnabled: true,
  },
  {
    policyId: 'ret_voice_audio_recordings',
    dataType: 'VOICE_RECORDINGS',
    retentionDays: 180,
    archiveStorageClass: 'GCP_COLDLINE',
    complianceStandard: 'HIPAA',
    autoPurgeEnabled: true,
  },
  {
    policyId: 'ret_security_audit_logs',
    dataType: 'AUDIT_LOGS',
    retentionDays: 2555, // 7 Years for SOX/HIPAA audit compliance
    archiveStorageClass: 'AWS_S3_GLACIER_INSTANT',
    complianceStandard: 'SOX_SECTION_802',
    autoPurgeEnabled: false,
  },
  {
    policyId: 'ret_gdpr_customer_pii',
    dataType: 'CUSTOMER_PII',
    retentionDays: 90,
    archiveStorageClass: 'HARD_PURGE',
    complianceStandard: 'GDPR_ARTICLE_5',
    autoPurgeEnabled: true,
  },
];
