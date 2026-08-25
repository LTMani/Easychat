export interface MockDisasterRecoveryDrill {
  drillId: string;
  scenarioName: string;
  simulatedOutageType: 'REGIONAL_AWS_OUTAGE' | 'PRIMARY_DB_CRASH' | 'REDIS_CLUSTER_SPLIT_BRAIN' | 'SIP_CARRIER_TRUNK_DROP';
  targetRecoveryTimeObjectiveMinutes: number; // RTO
  actualRecoveryTimeAchievedMinutes: number;
  targetRecoveryPointObjectiveMinutes: number; // RPO
  actualRecoveryPointAchievedMinutes: number;
  failoverStatus: 'PASSED_ZERO_DATA_LOSS' | 'PASSED_ACCEPTABLE_FAILOVER' | 'FAILED';
  drillExecutionDate: string;
  leadArchitect: string;
}

export const ENTERPRISE_DISASTER_RECOVERY_DRILLS: MockDisasterRecoveryDrill[] = [
  {
    drillId: 'dr_drill_2026_q1',
    scenarioName: 'Primary US-East PostgreSQL Multi-AZ Standby Automatic Promotion',
    simulatedOutageType: 'PRIMARY_DB_CRASH',
    targetRecoveryTimeObjectiveMinutes: 5,
    actualRecoveryTimeAchievedMinutes: 1.8,
    targetRecoveryPointObjectiveMinutes: 0,
    actualRecoveryPointAchievedMinutes: 0,
    failoverStatus: 'PASSED_ZERO_DATA_LOSS',
    drillExecutionDate: '2026-02-15T02:00:00Z',
    leadArchitect: 'Sarah Jenkins',
  },
  {
    drillId: 'dr_drill_2026_q2',
    scenarioName: 'US-East to EU-Central Geo-DNS Edge Cluster Traffic Drain',
    simulatedOutageType: 'REGIONAL_AWS_OUTAGE',
    targetRecoveryTimeObjectiveMinutes: 10,
    actualRecoveryTimeAchievedMinutes: 3.4,
    targetRecoveryPointObjectiveMinutes: 1,
    actualRecoveryPointAchievedMinutes: 0,
    failoverStatus: 'PASSED_ZERO_DATA_LOSS',
    drillExecutionDate: '2026-05-18T03:00:00Z',
    leadArchitect: 'Alexander Vance',
  },
  {
    drillId: 'dr_drill_2026_q3',
    scenarioName: 'Primary WebRTC SIP Trunk Failover to Secondary Carrier Relay',
    simulatedOutageType: 'SIP_CARRIER_TRUNK_DROP',
    targetRecoveryTimeObjectiveMinutes: 2,
    actualRecoveryTimeAchievedMinutes: 0.6,
    targetRecoveryPointObjectiveMinutes: 0,
    actualRecoveryPointAchievedMinutes: 0,
    failoverStatus: 'PASSED_ZERO_DATA_LOSS',
    drillExecutionDate: '2026-08-10T04:00:00Z',
    leadArchitect: 'Eleanor Thorne',
  },
];
