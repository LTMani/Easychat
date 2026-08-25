export interface MockComplianceAttestationRecord {
  attestationId: string;
  auditorOrg: string;
  scopeOfAudit: string;
  securityControlsVerifiedCount: number;
  unremediatedVulnerabilitiesCount: number;
  reportIssueDate: string;
  reportExpirationDate: string;
  certificationStatus: 'CERTIFIED_UNQUALIFIED' | 'QUALIFIED' | 'REVOKED';
  digitalSignatureSha256: string;
}

export const ENTERPRISE_COMPLIANCE_ATTESTATIONS: MockComplianceAttestationRecord[] = [
  {
    attestationId: 'attest_soc2_2026',
    auditorOrg: 'Schellman & Company, LLC (AICPA Accredited)',
    scopeOfAudit: 'Security, Availability, Confidentiality, and Processing Integrity Trust Services Criteria (SOC 2 Type II)',
    securityControlsVerifiedCount: 148,
    unremediatedVulnerabilitiesCount: 0,
    reportIssueDate: '2026-06-30T00:00:00Z',
    reportExpirationDate: '2027-06-30T00:00:00Z',
    certificationStatus: 'CERTIFIED_UNQUALIFIED',
    digitalSignatureSha256: '9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b',
  },
  {
    attestationId: 'attest_hipaa_2026',
    auditorOrg: 'Coalfire Systems, Inc.',
    scopeOfAudit: 'HIPAA Security & Privacy Rules (45 CFR Part 160 and Part 164, Subparts A and C)',
    securityControlsVerifiedCount: 92,
    unremediatedVulnerabilitiesCount: 0,
    reportIssueDate: '2026-05-15T00:00:00Z',
    reportExpirationDate: '2027-05-15T00:00:00Z',
    certificationStatus: 'CERTIFIED_UNQUALIFIED',
    digitalSignatureSha256: '1f2e3d4c5b6a79887766554433221100ffeeddccbbaa99887766554433221100',
  },
  {
    attestationId: 'attest_iso27001_2026',
    auditorOrg: 'BSI Group Global Assurance',
    scopeOfAudit: 'Information Security Management System (ISMS) ISO/IEC 27001:2022',
    securityControlsVerifiedCount: 93,
    unremediatedVulnerabilitiesCount: 0,
    reportIssueDate: '2026-04-01T00:00:00Z',
    reportExpirationDate: '2029-04-01T00:00:00Z',
    certificationStatus: 'CERTIFIED_UNQUALIFIED',
    digitalSignatureSha256: 'a1b2c3d4e5f60718293a4b5c6d7e8f90123456789abcdef0123456789abcdef0',
  },
];
