export interface MockRetentionScheduleRecord {
  scheduleId: string;
  name: string;
  storageTarget: 'S3_GLACIER_DEEP_ARCHIVE' | 'GCP_ARCHIVE' | 'AZURE_BLOB_COOL';
  cronExpression: string;
  nextExecutionTime: string;
  recordsPurgedLastCycle: number;
  recordsArchivedLastCycle: number;
  status: 'ACTIVE' | 'PAUSED';
}

export const ENTERPRISE_AUDIT_RETENTION_SCHEDULES: MockRetentionScheduleRecord[] = [
  {
    scheduleId: 'sched_hipaa_phi_daily',
    name: 'Daily HIPAA PHI Archive Job',
    storageTarget: 'S3_GLACIER_DEEP_ARCHIVE',
    cronExpression: '0 2 * * *',
    nextExecutionTime: '2026-08-26T02:00:00Z',
    recordsPurgedLastCycle: 0,
    recordsArchivedLastCycle: 1420,
    status: 'ACTIVE',
  },
  {
    scheduleId: 'sched_soc2_access_weekly',
    name: 'Weekly SOC 2 Access Log Merkle Rooting',
    storageTarget: 'GCP_ARCHIVE',
    cronExpression: '0 3 * * 0',
    nextExecutionTime: '2026-08-30T03:00:00Z',
    recordsPurgedLastCycle: 0,
    recordsArchivedLastCycle: 9850,
    status: 'ACTIVE',
  },
  {
    scheduleId: 'sched_gdpr_purge_nightly',
    name: 'Nightly GDPR Article 17 Erasure Enforcer',
    storageTarget: 'S3_GLACIER_DEEP_ARCHIVE',
    cronExpression: '0 4 * * *',
    nextExecutionTime: '2026-08-26T04:00:00Z',
    recordsPurgedLastCycle: 18,
    recordsArchivedLastCycle: 0,
    status: 'ACTIVE',
  },
  {
    scheduleId: 'sched_transcripts_monthly',
    name: 'Monthly Closed Chat Transcript Coldline Staging',
    storageTarget: 'AZURE_BLOB_COOL',
    cronExpression: '0 5 1 * *',
    nextExecutionTime: '2026-09-01T05:00:00Z',
    recordsPurgedLastCycle: 0,
    recordsArchivedLastCycle: 34200,
    status: 'ACTIVE',
  },
];
