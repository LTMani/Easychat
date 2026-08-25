export interface MockDeepChainBlock {
  blockHeight: number;
  blockHashSha256: string;
  parentHashSha256: string;
  merkleRootHash: string;
  transactionsHashedCount: number;
  sealedTimestampIso: string;
  kmsWitnessSignature: string;
  hardwareSecurityModuleId: string;
}

export const ENTERPRISE_AUDIT_FORENSIC_DEEP_CHAIN: MockDeepChainBlock[] = [
  { blockHeight: 101, blockHashSha256: '4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b', parentHashSha256: '0000000000000000000000000000000000000000000000000000000000000000', merkleRootHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', transactionsHashedCount: 12500, sealedTimestampIso: '2026-08-01T00:00:00Z', kmsWitnessSignature: 'sig_kms_hsm_secp256k1_001', hardwareSecurityModuleId: 'cloudhsm-us-east-1-cluster-a' },
  { blockHeight: 102, blockHashSha256: 'b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9', parentHashSha256: '4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b', merkleRootHash: 'a8f5f167f44f4964e6c998dee827110c9a2feaa0c55ad015a3bf4f1b2b0b822c', transactionsHashedCount: 14200, sealedTimestampIso: '2026-08-02T00:00:00Z', kmsWitnessSignature: 'sig_kms_hsm_secp256k1_002', hardwareSecurityModuleId: 'cloudhsm-us-east-1-cluster-a' },
  { blockHeight: 103, blockHashSha256: 'c0535e4be2b79ffd93291305436bf889314e4a3faec05ecffcbb7ef31ad96191', parentHashSha256: 'b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9', merkleRootHash: 'b45c22789a1c149afbf4c8996fb92427ef2d127de37b942baad06145e54b0c61', transactionsHashedCount: 15800, sealedTimestampIso: '2026-08-03T00:00:00Z', kmsWitnessSignature: 'sig_kms_hsm_secp256k1_003', hardwareSecurityModuleId: 'cloudhsm-us-east-1-cluster-a' },
  { blockHeight: 104, blockHashSha256: 'd1e2f3a4b5c6d7e8f90123456789abcdef0123456789abcdef0123456789abcdef', parentHashSha256: 'c0535e4be2b79ffd93291305436bf889314e4a3faec05ecffcbb7ef31ad96191', merkleRootHash: 'c77f88a91c149afbf4c8996fb92427195c6f884f48641d02b4d121d3fd328cb0', transactionsHashedCount: 16400, sealedTimestampIso: '2026-08-04T00:00:00Z', kmsWitnessSignature: 'sig_kms_hsm_secp256k1_004', hardwareSecurityModuleId: 'cloudhsm-us-east-1-cluster-a' },
  { blockHeight: 105, blockHashSha256: 'fa70df7192840192830192840192830192840192830192840192830192840192', parentHashSha256: 'd1e2f3a4b5c6d7e8f90123456789abcdef0123456789abcdef0123456789abcdef', merkleRootHash: 'd9911c44298fc1c149afbf4c8996fb92cf83e1357eefb8bdf1542850d66d8007', transactionsHashedCount: 18900, sealedTimestampIso: '2026-08-05T00:00:00Z', kmsWitnessSignature: 'sig_kms_hsm_secp256k1_005', hardwareSecurityModuleId: 'cloudhsm-us-east-1-cluster-a' },
];
