export interface MockIncidentPlaybook {
  playbookId: string;
  incidentSeverity: 'P1_CRITICAL_OUTAGE' | 'P2_MAJOR_DEGRADATION' | 'P3_MINOR_DEFECT';
  playbookTitle: string;
  triggerConditions: string[];
  automatedMitigationSteps: string[];
  escalationRole: string;
  targetMtrMinutes: number;
}

export const ENTERPRISE_INCIDENT_PLAYBOOKS: MockIncidentPlaybook[] = [
  {
    playbookId: 'pb_01',
    incidentSeverity: 'P1_CRITICAL_OUTAGE',
    playbookTitle: 'PostgreSQL Aurora Primary DB Failover & Replica Health Restoration',
    triggerConditions: ['Synthetic DB ping latency > 2000ms for 3 consecutive probes', 'Database connection pool saturation > 98%'],
    automatedMitigationSteps: [
      'Trigger AWS RDS Aurora fast automatic failover to Multi-AZ Read Replica (us-east-1b)',
      'Flush and repopulate Redis connection pool cache',
      'Throttle non-essential background BullMQ workers to 20% concurrency',
      'Post automated status degradation update to status.easychat.io',
    ],
    escalationRole: 'VP of Platform Engineering & Principal Database Architect',
    targetMtrMinutes: 5,
  },
  {
    playbookId: 'pb_02',
    incidentSeverity: 'P1_CRITICAL_OUTAGE',
    playbookTitle: 'Global WebRTC TURN / STUN Relay Media Cluster Degradation',
    triggerConditions: ['TURN cluster packet loss > 5.0% across Frankfurt or Virginia edge', 'WebRTC MOS score drops below 3.5'],
    automatedMitigationSteps: [
      'Re-route DNS Geo-proximity traffic to secondary London & Ohio TURN clusters',
      'Force Opus codec bitrate cap to 24kbps wideband to mitigate packet loss',
      'Scale TURN EC2 ASG instances by +100% capacity',
    ],
    escalationRole: 'Principal Telephony Architect',
    targetMtrMinutes: 8,
  },
];
