export interface MockRetentionIndexEntry {
  indexId: string;
  partitionKey: string;
  sourceTable: string;
  recordCount: number;
  oldestRecordTimestamp: string;
  newestRecordTimestamp: string;
  checksumSha256: string;
  archivalStatus: 'ONLINE_HOT' | 'TIERED_WARM' | 'ARCHIVED_COLD';
}

export const ENTERPRISE_AUDIT_RETENTION_INDICES: MockRetentionIndexEntry[] = [
  {
    indexId: 'idx_part_2025_q1',
    partitionKey: '2025-Q1-PARTITION',
    sourceTable: 'ChatTranscript',
    recordCount: 42000,
    oldestRecordTimestamp: '2025-01-01T00:00:00Z',
    newestRecordTimestamp: '2025-03-31T23:59:59Z',
    checksumSha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    archivalStatus: 'ARCHIVED_COLD',
  },
  {
    indexId: 'idx_part_2025_q2',
    partitionKey: '2025-Q2-PARTITION',
    sourceTable: 'ChatTranscript',
    recordCount: 54000,
    oldestRecordTimestamp: '2025-04-01T00:00:00Z',
    newestRecordTimestamp: '2025-06-30T23:59:59Z',
    checksumSha256: 'a8f5f167f44f4964e6c998dee827110c9a2feaa0c55ad015a3bf4f1b2b0b822c',
    archivalStatus: 'ARCHIVED_COLD',
  },
  {
    indexId: 'idx_part_2025_q3',
    partitionKey: '2025-Q3-PARTITION',
    sourceTable: 'ChatTranscript',
    recordCount: 68000,
    oldestRecordTimestamp: '2025-07-01T00:00:00Z',
    newestRecordTimestamp: '2025-09-30T23:59:59Z',
    checksumSha256: 'b45c22789a1c149afbf4c8996fb92427ef2d127de37b942baad06145e54b0c61',
    archivalStatus: 'TIERED_WARM',
  },
  {
    indexId: 'idx_part_2025_q4',
    partitionKey: '2025-Q4-PARTITION',
    sourceTable: 'ChatTranscript',
    recordCount: 89000,
    oldestRecordTimestamp: '2025-10-01T00:00:00Z',
    newestRecordTimestamp: '2025-12-31T23:59:59Z',
    checksumSha256: 'c77f88a91c149afbf4c8996fb92427195c6f884f48641d02b4d121d3fd328cb0',
    archivalStatus: 'TIERED_WARM',
  },
  {
    indexId: 'idx_part_2026_q1',
    partitionKey: '2026-Q1-PARTITION',
    sourceTable: 'ChatTranscript',
    recordCount: 114000,
    oldestRecordTimestamp: '2026-01-01T00:00:00Z',
    newestRecordTimestamp: '2026-03-31T23:59:59Z',
    checksumSha256: 'd9911c44298fc1c149afbf4c8996fb92cf83e1357eefb8bdf1542850d66d8007',
    archivalStatus: 'ONLINE_HOT',
  },
];
