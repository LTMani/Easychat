export interface MockAuditRetentionCertificate {
  certificateId: string;
  vaultId: string;
  coverageStartDate: string;
  coverageEndDate: string;
  totalAuditEntriesHashed: number;
  rootMerkleTreeSha256: string;
  attestationAuthority: string;
  isImmutableLocked: boolean;
  issuedAtTimestamp: string;
}

export const ENTERPRISE_AUDIT_RETENTION_CERTIFICATES: MockAuditRetentionCertificate[] = [
  {
    certificateId: 'cert_merkle_2025_q3',
    vaultId: 'vault_soc2_audits_2025',
    coverageStartDate: '2025-07-01T00:00:00Z',
    coverageEndDate: '2025-09-30T23:59:59Z',
    totalAuditEntriesHashed: 142850,
    rootMerkleTreeSha256: '4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b',
    attestationAuthority: 'EasyChat Automated Cryptographic Vault System',
    isImmutableLocked: true,
    issuedAtTimestamp: '2025-10-01T00:00:00Z',
  },
  {
    certificateId: 'cert_merkle_2025_q4',
    vaultId: 'vault_soc2_audits_2025',
    coverageStartDate: '2025-10-01T00:00:00Z',
    coverageEndDate: '2025-12-31T23:59:59Z',
    totalAuditEntriesHashed: 189420,
    rootMerkleTreeSha256: 'b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9',
    attestationAuthority: 'EasyChat Automated Cryptographic Vault System',
    isImmutableLocked: true,
    issuedAtTimestamp: '2026-01-01T00:00:00Z',
  },
  {
    certificateId: 'cert_merkle_2026_q1',
    vaultId: 'vault_soc2_audits_2026',
    coverageStartDate: '2026-01-01T00:00:00Z',
    coverageEndDate: '2026-03-31T23:59:59Z',
    totalAuditEntriesHashed: 224100,
    rootMerkleTreeSha256: 'c0535e4be2b79ffd93291305436bf889314e4a3faec05ecffcbb7ef31ad96191',
    attestationAuthority: 'EasyChat Automated Cryptographic Vault System',
    isImmutableLocked: true,
    issuedAtTimestamp: '2026-04-01T00:00:00Z',
  },
];
