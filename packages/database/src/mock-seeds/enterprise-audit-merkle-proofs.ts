export interface MockMerkleProofEntry {
  leafHash: string;
  auditRecordId: string;
  merkleRoot: string;
  auditPath: Array<{ position: 'LEFT' | 'RIGHT'; hash: string }>;
  verified: boolean;
}

export const ENTERPRISE_AUDIT_MERKLE_PROOFS: MockMerkleProofEntry[] = [
  {
    leafHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    auditRecordId: 'aud_9901',
    merkleRoot: '4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b',
    auditPath: [
      { position: 'RIGHT', hash: 'a8f5f167f44f4964e6c998dee827110c9a2feaa0c55ad015a3bf4f1b2b0b822c' },
      { position: 'LEFT', hash: 'b45c22789a1c149afbf4c8996fb92427ef2d127de37b942baad06145e54b0c61' },
    ],
    verified: true,
  },
  {
    leafHash: 'a8f5f167f44f4964e6c998dee827110c9a2feaa0c55ad015a3bf4f1b2b0b822c',
    auditRecordId: 'aud_9902',
    merkleRoot: '4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b',
    auditPath: [
      { position: 'LEFT', hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855' },
      { position: 'LEFT', hash: 'b45c22789a1c149afbf4c8996fb92427ef2d127de37b942baad06145e54b0c61' },
    ],
    verified: true,
  },
];
