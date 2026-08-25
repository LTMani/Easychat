export interface MockSoc2CriteriaFullItem {
  criteriaCode: string;
  tscTrustCategory: string;
  principleFocus: string;
  sampleTestProcedure: string;
  auditFrequency: string;
  leadAssessorInitials: string;
}

export const ENTERPRISE_SOC2_CRITERIA_FULL_MATRIX: MockSoc2CriteriaFullItem[] = [
  { criteriaCode: 'CC1.1', tscTrustCategory: 'Control Environment', principleFocus: 'COSO Principle 1: Commitment to integrity and ethical values', sampleTestProcedure: 'Review signed employee code of conduct attestations upon hiring.', auditFrequency: 'ANNUAL', leadAssessorInitials: 'SJ' },
  { criteriaCode: 'CC2.1', tscTrustCategory: 'Communication and Information', principleFocus: 'COSO Principle 13: High-quality internal communications', sampleTestProcedure: 'Inspect automated Slack security notification channels and incident paging triggers.', auditFrequency: 'CONTINUOUS_AUTOMATED', leadAssessorInitials: 'RV' },
  { criteriaCode: 'CC3.1', tscTrustCategory: 'Risk Assessment', principleFocus: 'COSO Principle 6: Specifies suitable objectives and risks', sampleTestProcedure: 'Inspect annual penetration testing reports and vulnerability remediation SLAs.', auditFrequency: 'SEMI_ANNUAL', leadAssessorInitials: 'DC' },
  { criteriaCode: 'CC4.1', tscTrustCategory: 'Monitoring Activities', principleFocus: 'COSO Principle 16: Selects, develops, and performs evaluations', sampleTestProcedure: 'Inspect synthetic uptime probes, Datadog dashboards, and Sentry alert monitors.', auditFrequency: 'CONTINUOUS_AUTOMATED', leadAssessorInitials: 'ET' },
  { criteriaCode: 'CC5.1', tscTrustCategory: 'Control Activities', principleFocus: 'COSO Principle 10: Selects and develops control activities', sampleTestProcedure: 'Verify segregation of duties between code committers and production release approvers.', auditFrequency: 'CONTINUOUS_AUTOMATED', leadAssessorInitials: 'SJ' },
  { criteriaCode: 'CC6.1', tscTrustCategory: 'Logical Access', principleFocus: 'Logical access security software and infrastructure', sampleTestProcedure: 'Verify 100% MFA adoption across IdP and AWS IAM SSO accounts.', auditFrequency: 'CONTINUOUS_AUTOMATED', leadAssessorInitials: 'RV' },
  { criteriaCode: 'CC7.1', tscTrustCategory: 'System Operations', principleFocus: 'Vulnerability management and anomaly detection', sampleTestProcedure: 'Audit container registry vulnerability scanning and automated Dependabot alerts.', auditFrequency: 'CONTINUOUS_AUTOMATED', leadAssessorInitials: 'DC' },
  { criteriaCode: 'CC8.1', tscTrustCategory: 'Change Management', principleFocus: 'Authorized changes to infrastructure and codebases', sampleTestProcedure: 'Inspect GitHub pull request branch protections requiring at least 2 approvals.', auditFrequency: 'CONTINUOUS_AUTOMATED', leadAssessorInitials: 'ET' },
  { criteriaCode: 'CC9.1', tscTrustCategory: 'Risk Mitigation', principleFocus: 'Business disruption and vendor risk mitigation', sampleTestProcedure: 'Inspect third-party vendor SOC 2 reports (AWS, Twilio, Stripe, Supabase).', auditFrequency: 'ANNUAL', leadAssessorInitials: 'SJ' },
];
