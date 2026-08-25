export interface MockRfc3161TimestampToken {
  tokenId: string;
  hashAlgorithm: 'SHA-256' | 'SHA-512';
  hashedMessageSha256: string;
  tsaAuthorityName: string;
  genTimeUtc: string;
  accuracyMicros: number;
  tsaCertificateSerial: string;
  tsaSignatureHex: string;
}

export const ENTERPRISE_AUDIT_TIME_STAMPS: MockRfc3161TimestampToken[] = [
  {
    tokenId: 'tst_rfc3161_001',
    hashAlgorithm: 'SHA-256',
    hashedMessageSha256: '4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b',
    tsaAuthorityName: 'DigiCert Qualified Timestamping Authority',
    genTimeUtc: '2026-08-25T14:00:00.124502Z',
    accuracyMicros: 500,
    tsaCertificateSerial: '03429810A8BF2',
    tsaSignatureHex: '3045022100a8f5f167f44f4964e6c998dee827110c9a2feaa0c55ad015a3bf4f1b2b0b822c0220',
  },
  {
    tokenId: 'tst_rfc3161_002',
    hashAlgorithm: 'SHA-256',
    hashedMessageSha256: 'b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9',
    tsaAuthorityName: 'Sectigo Trusted Timestamping Service',
    genTimeUtc: '2026-08-25T14:15:00.089201Z',
    accuracyMicros: 500,
    tsaCertificateSerial: '08192410BCDF9',
    tsaSignatureHex: '30440220b45c22789a1c149afbf4c8996fb92427ef2d127de37b942baad06145e54b0c610220',
  },
  {
    tokenId: 'tst_rfc3161_003',
    hashAlgorithm: 'SHA-256',
    hashedMessageSha256: 'c0535e4be2b79ffd93291305436bf889314e4a3faec05ecffcbb7ef31ad96191',
    tsaAuthorityName: 'GlobalSign Timestamping CA',
    genTimeUtc: '2026-08-25T14:30:00.045100Z',
    accuracyMicros: 500,
    tsaCertificateSerial: '09482010CCDE1',
    tsaSignatureHex: '3045022100c77f88a91c149afbf4c8996fb92427195c6f884f48641d02b4d121d3fd328cb00220',
  },
];
