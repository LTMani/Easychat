export interface MockSystemSecurityBaseline {
  baselineId: string;
  componentName: string;
  cisBenchmarkStandard: string;
  lastHardeningAuditDate: string;
  complianceScorePercent: number;
  unremediatedFindingsCount: number;
  signedAttestationBy: string;
}

export const ENTERPRISE_AUDIT_SYSTEM_BASELINES: MockSystemSecurityBaseline[] = [
  {
    baselineId: 'base_k8s_cluster',
    componentName: 'Amazon EKS Production Kubernetes Clusters',
    cisBenchmarkStandard: 'CIS Kubernetes Benchmark v1.8.0 Level 2',
    lastHardeningAuditDate: '2026-08-01T00:00:00Z',
    complianceScorePercent: 99.2,
    unremediatedFindingsCount: 0,
    signedAttestationBy: 'Chief Information Security Officer',
  },
  {
    baselineId: 'base_postgresql_rds',
    componentName: 'Amazon RDS PostgreSQL 16 Multi-AZ Database',
    cisBenchmarkStandard: 'CIS PostgreSQL 16 Benchmark v1.0.0 Level 1',
    lastHardeningAuditDate: '2026-08-05T00:00:00Z',
    complianceScorePercent: 100.0,
    unremediatedFindingsCount: 0,
    signedAttestationBy: 'Principal Database Reliability Engineer',
  },
  {
    baselineId: 'base_redis_cache',
    componentName: 'Redis ElastiCache TLS In-Transit Cluster',
    cisBenchmarkStandard: 'CIS Redis Benchmark v1.0.0',
    lastHardeningAuditDate: '2026-08-10T00:00:00Z',
    complianceScorePercent: 98.5,
    unremediatedFindingsCount: 0,
    signedAttestationBy: 'Lead Infrastructure Architect',
  },
  {
    baselineId: 'base_turn_relays',
    componentName: 'Global WebRTC TURN Coturn Relay Nodes',
    cisBenchmarkStandard: 'CIS Linux Server Benchmark v1.0.0 Level 2',
    lastHardeningAuditDate: '2026-08-12T00:00:00Z',
    complianceScorePercent: 99.8,
    unremediatedFindingsCount: 0,
    signedAttestationBy: 'Telephony Network Operations Lead',
  },
];
