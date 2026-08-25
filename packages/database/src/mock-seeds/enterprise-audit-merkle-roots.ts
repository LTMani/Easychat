export interface MockMerkleRootRecord {
  rootRecordId: string;
  merkleTreeDepth: number;
  totalLeafNodes: number;
  rootHashSha256: string;
  epochStartDate: string;
  epochEndDate: string;
  isPublishedToTransparencyLog: boolean;
  transparencyLogUrl: string;
}

export const ENTERPRISE_AUDIT_MERKLE_ROOTS: MockMerkleRootRecord[] = [
  {
    rootRecordId: 'mroot_epoch_2025_q3',
    merkleTreeDepth: 18,
    totalLeafNodes: 142850,
    rootHashSha256: '4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b',
    epochStartDate: '2025-07-01T00:00:00Z',
    epochEndDate: '2025-09-30T23:59:59Z',
    isPublishedToTransparencyLog: true,
    transparencyLogUrl: 'https://transparency.easychat.io/roots/2025_q3.json',
  },
  {
    rootRecordId: 'mroot_epoch_2025_q4',
    merkleTreeDepth: 18,
    totalLeafNodes: 189420,
    rootHashSha256: 'b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9',
    epochStartDate: '2025-10-01T00:00:00Z',
    epochEndDate: '2025-12-31T23:59:59Z',
    isPublishedToTransparencyLog: true,
    transparencyLogUrl: 'https://transparency.easychat.io/roots/2025_q4.json',
  },
  {
    rootRecordId: 'mroot_epoch_2026_q1',
    merkleTreeDepth: 19,
    totalLeafNodes: 224100,
    rootHashSha256: 'c0535e4be2b79ffd93291305436bf889314e4a3faec05ecffcbb7ef31ad96191',
    epochStartDate: '2026-01-01T00:00:00Z',
    epochEndDate: '2026-03-31T23:59:59Z',
    isPublishedToTransparencyLog: true,
    transparencyLogUrl: 'https://transparency.easychat.io/roots/2026_q1.json',
  },
];
