export interface MockSoc2CriteriaEvidence {
  criteriaId: string;
  trustServiceCategory: 'SECURITY' | 'AVAILABILITY' | 'CONFIDENTIALITY' | 'PROCESSING_INTEGRITY' | 'PRIVACY';
  principleDescription: string;
  auditTestProcedure: string;
  testResult: 'TEST_PASSED_NO_EXCEPTIONS' | 'EXCEPTION_NOTED';
  auditorInitials: string;
  testExecutionTimestamp: string;
}

export const ENTERPRISE_AUDIT_SOC2_CRITERIA_EVIDENCE: MockSoc2CriteriaEvidence[] = [
  {
    criteriaId: 'soc2_sec_cc6_1',
    trustServiceCategory: 'SECURITY',
    principleDescription: 'The entity implements logical access security software, infrastructure, and architectures over protected assets.',
    auditTestProcedure: 'Sampled 50 user logins across 30 days to verify MFA enforcement and least-privilege role boundaries.',
    testResult: 'TEST_PASSED_NO_EXCEPTIONS',
    auditorInitials: 'SJ (Lead Auditor)',
    testExecutionTimestamp: '2026-08-25T10:00:00Z',
  },
  {
    criteriaId: 'soc2_sec_cc6_3',
    trustServiceCategory: 'SECURITY',
    principleDescription: 'The entity authorizes, modifies, or removes access to data, software, and functions based on changes to roles and responsibilities.',
    auditTestProcedure: 'Inspected deprovisioning webhook logs to verify that terminated employee sessions expire within 5 minutes.',
    testResult: 'TEST_PASSED_NO_EXCEPTIONS',
    auditorInitials: 'RV (Senior Associate)',
    testExecutionTimestamp: '2026-08-25T11:00:00Z',
  },
  {
    criteriaId: 'soc2_avail_a1_2',
    trustServiceCategory: 'AVAILABILITY',
    principleDescription: 'The entity authorizes, designs, develops or acquires, implements, operates, approves, maintains, and monitors environmental protections and disaster recovery.',
    auditTestProcedure: 'Reviewed automated Multi-AZ PostgreSQL failover drill logs and RTO/RPO achievement metrics.',
    testResult: 'TEST_PASSED_NO_EXCEPTIONS',
    auditorInitials: 'DC (Systems Auditor)',
    testExecutionTimestamp: '2026-08-25T12:00:00Z',
  },
  {
    criteriaId: 'soc2_conf_c1_1',
    trustServiceCategory: 'CONFIDENTIALITY',
    principleDescription: 'The entity identifies and maintains confidential information to meet the entity’s objectives related to confidentiality.',
    auditTestProcedure: 'Inspected AES-256-GCM envelope encryption and KMS master key wrapping across customer communication transcripts.',
    testResult: 'TEST_PASSED_NO_EXCEPTIONS',
    auditorInitials: 'ET (Security Analyst)',
    testExecutionTimestamp: '2026-08-25T13:00:00Z',
  },
];
