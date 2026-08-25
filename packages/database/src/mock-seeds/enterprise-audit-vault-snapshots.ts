export interface MockVaultSnapshotRecord {
  snapshotId: string;
  vaultStorageTier: 'AWS_S3_GLACIER_VAULT_LOCK' | 'GCP_CLOUD_STORAGE_BUCKET_LOCK' | 'AZURE_IMMUTABLE_BLOB';
  retentionLockDurationYears: number;
  totalEncryptedBytes: number;
  sha512IntegrityChecksum: string;
  complianceCertification: 'SEC_RULE_17A_4' | 'CFTC_RULE_1_31' | 'FINRA_RULE_4511';
  lockedAtTimestamp: string;
  isLegalHoldActive: boolean;
}

export const ENTERPRISE_AUDIT_VAULT_SNAPSHOTS: MockVaultSnapshotRecord[] = [
  {
    snapshotId: 'vsnap_2025_annual',
    vaultStorageTier: 'AWS_S3_GLACIER_VAULT_LOCK',
    retentionLockDurationYears: 7,
    totalEncryptedBytes: 14892019482,
    sha512IntegrityChecksum: 'cf83e1357eefb8bdf1542850d66d8007d620e4050b5715dc83f4a921d36ce9ce47d0d13c5d85f2b0ff8318d2877eec2f63b931bd47417a81a538327af927da3e',
    complianceCertification: 'SEC_RULE_17A_4',
    lockedAtTimestamp: '2025-12-31T23:59:59Z',
    isLegalHoldActive: false,
  },
  {
    snapshotId: 'vsnap_2026_q1',
    vaultStorageTier: 'AWS_S3_GLACIER_VAULT_LOCK',
    retentionLockDurationYears: 7,
    totalEncryptedBytes: 4210958102,
    sha512IntegrityChecksum: '5c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8aef2d127de37b942baad06145e54b0c619a1f22327b2ebbcfbec78f5564afe39dcf83e1357eefb8bd',
    complianceCertification: 'FINRA_RULE_4511',
    lockedAtTimestamp: '2026-03-31T23:59:59Z',
    isLegalHoldActive: false,
  },
  {
    snapshotId: 'vsnap_2026_q2',
    vaultStorageTier: 'GCP_CLOUD_STORAGE_BUCKET_LOCK',
    retentionLockDurationYears: 7,
    totalEncryptedBytes: 5120849200,
    sha512IntegrityChecksum: '9a2feaa0c55ad015a3bf4f1b2b0b822c5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8cf83e1357eefb8bdf1542850d66d8007',
    complianceCertification: 'CFTC_RULE_1_31',
    lockedAtTimestamp: '2026-06-30T23:59:59Z',
    isLegalHoldActive: false,
  },
];
