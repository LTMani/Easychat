export interface MockForensicHashRecord {
  recordHashId: string;
  blockHeight: number;
  previousBlockHash: string;
  currentBlockHash: string;
  totalTransactionsHashed: number;
  witnessSignature: string;
  timestamp: string;
}

export const ENTERPRISE_AUDIT_FORENSIC_HASHES: MockForensicHashRecord[] = [
  {
    recordHashId: 'blk_0001',
    blockHeight: 1,
    previousBlockHash: '0000000000000000000000000000000000000000000000000000000000000000',
    currentBlockHash: '4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b',
    totalTransactionsHashed: 1000,
    witnessSignature: 'sig_witness_kms_v1_001',
    timestamp: '2026-08-25T00:00:00Z',
  },
  {
    recordHashId: 'blk_0002',
    blockHeight: 2,
    previousBlockHash: '4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b',
    currentBlockHash: 'b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9',
    totalTransactionsHashed: 1250,
    witnessSignature: 'sig_witness_kms_v1_002',
    timestamp: '2026-08-25T01:00:00Z',
  },
  {
    recordHashId: 'blk_0003',
    blockHeight: 3,
    previousBlockHash: 'b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9',
    currentBlockHash: 'c0535e4be2b79ffd93291305436bf889314e4a3faec05ecffcbb7ef31ad96191',
    totalTransactionsHashed: 980,
    witnessSignature: 'sig_witness_kms_v1_003',
    timestamp: '2026-08-25T02:00:00Z',
  },
  {
    recordHashId: 'blk_0004',
    blockHeight: 4,
    previousBlockHash: 'c0535e4be2b79ffd93291305436bf889314e4a3faec05ecffcbb7ef31ad96191',
    currentBlockHash: 'd1e2f3a4b5c6d7e8f90123456789abcdef0123456789abcdef0123456789abcdef',
    totalTransactionsHashed: 1420,
    witnessSignature: 'sig_witness_kms_v1_004',
    timestamp: '2026-08-25T03:00:00Z',
  },
];
