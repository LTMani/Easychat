export interface MockKmsAuditRecord {
  id: string;
  kekVersion: string;
  operation: 'DEK_GENERATION' | 'KEY_ROTATION' | 'FIELD_DECRYPTION' | 'KEY_REVOCATION';
  actorService: string;
  status: 'SUCCESS' | 'FAILED';
  latencyMs: number;
  timestamp: string;
}

export const ENTERPRISE_KMS_AUDIT_LEDGER: MockKmsAuditRecord[] = [
  {
    id: 'kms_op_9901',
    kekVersion: 'kek_v2_2026',
    operation: 'DEK_GENERATION',
    actorService: 'services/api/IdentityResolutionService',
    status: 'SUCCESS',
    latencyMs: 3.4,
    timestamp: '2026-08-25T14:45:00Z',
  },
  {
    id: 'kms_op_9902',
    kekVersion: 'kek_v2_2026',
    operation: 'KEY_ROTATION',
    actorService: 'services/worker/KmsRotationCron',
    status: 'SUCCESS',
    latencyMs: 12.8,
    timestamp: '2026-08-25T00:00:00Z',
  },
  {
    id: 'kms_op_9903',
    kekVersion: 'kek_v2_2026',
    operation: 'FIELD_DECRYPTION',
    actorService: 'services/api/HipaaAuditLoggerService',
    status: 'SUCCESS',
    latencyMs: 2.1,
    timestamp: '2026-08-25T14:10:00Z',
  },
];
