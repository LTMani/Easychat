export interface MockDataAnonymizationJob {
  jobId: string;
  targetDataset: 'STAGING_DATABASE_CLONE' | 'ANALYTICS_DATA_LAKE' | 'QA_SANDBOX_ENVIRONMENT';
  anonymizationTechnique: 'K_ANONYMITY' | 'DIFFERENTIAL_PRIVACY' | 'SALTED_HASH_SUBSTITUTION';
  recordsTransformedCount: number;
  durationSeconds: number;
  status: 'COMPLETED_VERIFIED' | 'RUNNING';
  executedBy: string;
  completedAtTimestamp: string;
}

export const ENTERPRISE_DATA_ANONYMIZATION_JOBS: MockDataAnonymizationJob[] = [
  {
    jobId: 'anon_job_9901',
    targetDataset: 'QA_SANDBOX_ENVIRONMENT',
    anonymizationTechnique: 'SALTED_HASH_SUBSTITUTION',
    recordsTransformedCount: 254300,
    durationSeconds: 142,
    status: 'COMPLETED_VERIFIED',
    executedBy: 'DataOps Automated CI/CD Pipeline',
    completedAtTimestamp: '2026-08-25T01:00:00Z',
  },
  {
    jobId: 'anon_job_9902',
    targetDataset: 'ANALYTICS_DATA_LAKE',
    anonymizationTechnique: 'DIFFERENTIAL_PRIVACY',
    recordsTransformedCount: 1849200,
    durationSeconds: 890,
    status: 'COMPLETED_VERIFIED',
    executedBy: 'Snowpipe Analytics CDC Pipeline',
    completedAtTimestamp: '2026-08-24T23:30:00Z',
  },
  {
    jobId: 'anon_job_9903',
    targetDataset: 'STAGING_DATABASE_CLONE',
    anonymizationTechnique: 'K_ANONYMITY',
    recordsTransformedCount: 89010,
    durationSeconds: 65,
    status: 'COMPLETED_VERIFIED',
    executedBy: 'Security Compliance Vault Daemon',
    completedAtTimestamp: '2026-08-24T18:00:00Z',
  },
];
