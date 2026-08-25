export interface MockArchiveIndexRecord {
  archiveIndexId: string;
  sourceEntityType: 'TICKETS' | 'CONVERSATIONS' | 'PAYMENT_TRANSACTIONS' | 'SECURITY_EVENTS';
  recordsArchivedCount: number;
  compressedSizeBytes: number;
  encryptionAlgorithm: 'AES_256_GCM_ENVELOPE';
  kekIdentifier: string;
  archiveStorageUri: string;
  archiveTimestamp: string;
}

export const ENTERPRISE_AUDIT_RETENTION_ARCHIVES: MockArchiveIndexRecord[] = [
  {
    archiveIndexId: 'arch_2025_tickets_q3',
    sourceEntityType: 'TICKETS',
    recordsArchivedCount: 84200,
    compressedSizeBytes: 18492019,
    encryptionAlgorithm: 'AES_256_GCM_ENVELOPE',
    kekIdentifier: 'kek_v2_2026',
    archiveStorageUri: 's3://easychat-cold-archive-us-east-1/tickets/2025_q3.parquet.enc',
    archiveTimestamp: '2025-10-01T00:00:00Z',
  },
  {
    archiveIndexId: 'arch_2025_tickets_q4',
    sourceEntityType: 'TICKETS',
    recordsArchivedCount: 95400,
    compressedSizeBytes: 21094819,
    encryptionAlgorithm: 'AES_256_GCM_ENVELOPE',
    kekIdentifier: 'kek_v2_2026',
    archiveStorageUri: 's3://easychat-cold-archive-us-east-1/tickets/2025_q4.parquet.enc',
    archiveTimestamp: '2026-01-01T00:00:00Z',
  },
  {
    archiveIndexId: 'arch_2026_tickets_q1',
    sourceEntityType: 'TICKETS',
    recordsArchivedCount: 112000,
    compressedSizeBytes: 24891028,
    encryptionAlgorithm: 'AES_256_GCM_ENVELOPE',
    kekIdentifier: 'kek_v2_2026',
    archiveStorageUri: 's3://easychat-cold-archive-us-east-1/tickets/2026_q1.parquet.enc',
    archiveTimestamp: '2026-04-01T00:00:00Z',
  },
  {
    archiveIndexId: 'arch_2026_tickets_q2',
    sourceEntityType: 'TICKETS',
    recordsArchivedCount: 128500,
    compressedSizeBytes: 28491029,
    encryptionAlgorithm: 'AES_256_GCM_ENVELOPE',
    kekIdentifier: 'kek_v2_2026',
    archiveStorageUri: 's3://easychat-cold-archive-us-east-1/tickets/2026_q2.parquet.enc',
    archiveTimestamp: '2026-07-01T00:00:00Z',
  },
];
