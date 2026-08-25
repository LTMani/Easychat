export interface MockSoc2EvidenceSnapshot {
  evidenceId: string;
  controlReference: string;
  trustServiceCategory: 'SECURITY' | 'AVAILABILITY' | 'CONFIDENTIALITY';
  auditorVerificationProcedure: string;
  automatedTelemetryMetric: string;
  isPassingWithoutExceptions: boolean;
  collectedAtIso: string;
  witnessKeyFingerprint: string;
}

export const ENTERPRISE_SOC2_CONTROL_EVIDENCE_SNAPSHOTS: MockSoc2EvidenceSnapshot[] = [
  { evidenceId: 'ev_soc2_cc61', controlReference: 'CC6.1 - Logical Access Security', trustServiceCategory: 'SECURITY', auditorVerificationProcedure: 'Sampled 100 identity provider user sessions across 90 days to verify WebAuthn FIDO2 MFA enforcement.', automatedTelemetryMetric: '100% MFA Enforcement (0 Exceptions)', isPassingWithoutExceptions: true, collectedAtIso: '2026-08-25T10:00:00Z', witnessKeyFingerprint: 'SHA256:4a5e1e4baab89f3a32518a88c31bc87f' },
  { evidenceId: 'ev_soc2_cc66', controlReference: 'CC6.6 - Network Perimeter Isolation', trustServiceCategory: 'SECURITY', auditorVerificationProcedure: 'Automated VPC security group audit inspecting ingress/egress rules on PostgreSQL Aurora and Redis.', automatedTelemetryMetric: '0 Open Public Database Ports (VPC Private Subnet)', isPassingWithoutExceptions: true, collectedAtIso: '2026-08-25T11:00:00Z', witnessKeyFingerprint: 'SHA256:b94d27b9934d3e08a52e52d7da7dabfa' },
  { evidenceId: 'ev_soc2_a12', controlReference: 'A1.2 - Disaster Recovery & High Availability', trustServiceCategory: 'AVAILABILITY', auditorVerificationProcedure: 'Simulated AZ outage drill verifying automated standby database promotion and DNS failover within 60s.', automatedTelemetryMetric: 'RTO: 1.8 mins / RPO: 0 seconds', isPassingWithoutExceptions: true, collectedAtIso: '2026-08-25T12:00:00Z', witnessKeyFingerprint: 'SHA256:c0535e4be2b79ffd93291305436bf889' },
  { evidenceId: 'ev_soc2_c11', controlReference: 'C1.1 - Data Encryption at Rest & In Transit', trustServiceCategory: 'CONFIDENTIALITY', auditorVerificationProcedure: 'Inspected AES-256-GCM envelope encryption and KMS master key wrapping across all tenant database shards.', automatedTelemetryMetric: '100% AES-256-GCM / TLS 1.3 Strict', isPassingWithoutExceptions: true, collectedAtIso: '2026-08-25T13:00:00Z', witnessKeyFingerprint: 'SHA256:d1e2f3a4b5c6d7e8f90123456789abcd' },
];
