export interface MockAuditSignature {
  signatureId: string;
  auditRecordId: string;
  hmacDigestSha256: string;
  signingKeyId: string;
  signatureStatus: 'VERIFIED' | 'TAMPERED';
  signedTimestamp: string;
}

export const ENTERPRISE_AUDIT_SIGNATURES: MockAuditSignature[] = [
  {
    signatureId: 'sig_001',
    auditRecordId: 'aud_9901',
    hmacDigestSha256: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
    signingKeyId: 'kms_key_sig_v1',
    signatureStatus: 'VERIFIED',
    signedTimestamp: '2026-08-25T14:20:01Z',
  },
  {
    signatureId: 'sig_002',
    auditRecordId: 'aud_9902',
    hmacDigestSha256: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
    signingKeyId: 'kms_key_sig_v1',
    signatureStatus: 'VERIFIED',
    signedTimestamp: '2026-08-25T13:45:13Z',
  },
  {
    signatureId: 'sig_003',
    auditRecordId: 'aud_9903',
    hmacDigestSha256: '4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a',
    signingKeyId: 'kms_key_sig_v1',
    signatureStatus: 'VERIFIED',
    signedTimestamp: '2026-08-25T12:30:01Z',
  },
  {
    signatureId: 'sig_004',
    auditRecordId: 'aud_9904',
    hmacDigestSha256: 'ef2d127de37b942baad06145e54b0c619a1f22327b2ebbcfbec78f5564afe39d',
    signingKeyId: 'kms_key_sig_v1',
    signatureStatus: 'VERIFIED',
    signedTimestamp: '2026-08-25T11:15:01Z',
  },
];
