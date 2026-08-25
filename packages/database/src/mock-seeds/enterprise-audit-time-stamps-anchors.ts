export interface MockTimestampAnchorRecord {
  anchorId: string;
  merkleEpochId: string;
  publicBlockchainAnchorTxId: string;
  network: 'ETHEREUM_MAINNET' | 'BITCOIN_OP_RETURN' | 'POLYGON_POS';
  blockNumber: number;
  confirmedAtUtc: string;
}

export const ENTERPRISE_AUDIT_TIME_STAMPS_ANCHORS: MockTimestampAnchorRecord[] = [
  {
    anchorId: 'anchor_eth_01',
    merkleEpochId: 'mroot_epoch_2025_q3',
    publicBlockchainAnchorTxId: '0x4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b',
    network: 'ETHEREUM_MAINNET',
    blockNumber: 20489100,
    confirmedAtUtc: '2025-10-01T00:05:00Z',
  },
  {
    anchorId: 'anchor_eth_02',
    merkleEpochId: 'mroot_epoch_2025_q4',
    publicBlockchainAnchorTxId: '0xb94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9',
    network: 'ETHEREUM_MAINNET',
    blockNumber: 21104800,
    confirmedAtUtc: '2026-01-01T00:05:00Z',
  },
  {
    anchorId: 'anchor_eth_03',
    merkleEpochId: 'mroot_epoch_2026_q1',
    publicBlockchainAnchorTxId: '0xc0535e4be2b79ffd93291305436bf889314e4a3faec05ecffcbb7ef31ad96191',
    network: 'ETHEREUM_MAINNET',
    blockNumber: 21849200,
    confirmedAtUtc: '2026-04-01T00:05:00Z',
  },
];
