export interface MockRegionalTelemetryRecord {
  id: string;
  region: 'US_EAST_1' | 'EU_CENTRAL_1' | 'AP_SOUTHEAST_1';
  timestamp: string;
  requestsPerSecond: number;
  p95LatencyMs: number;
  activeSockets: number;
  databaseConnections: number;
  cpuUtilizationPercent: number;
  memoryUtilizationPercent: number;
}

export const ENTERPRISE_MULTI_REGION_METRICS: MockRegionalTelemetryRecord[] = [
  {
    id: 'reg_metric_01',
    region: 'US_EAST_1',
    timestamp: '2026-08-25T14:45:00Z',
    requestsPerSecond: 1240,
    p95LatencyMs: 28.5,
    activeSockets: 3840,
    databaseConnections: 18,
    cpuUtilizationPercent: 42.5,
    memoryUtilizationPercent: 54.2,
  },
  {
    id: 'reg_metric_02',
    region: 'EU_CENTRAL_1',
    timestamp: '2026-08-25T14:45:00Z',
    requestsPerSecond: 890,
    p95LatencyMs: 34.2,
    activeSockets: 2150,
    databaseConnections: 12,
    cpuUtilizationPercent: 36.8,
    memoryUtilizationPercent: 48.0,
  },
  {
    id: 'reg_metric_03',
    region: 'AP_SOUTHEAST_1',
    timestamp: '2026-08-25T14:45:00Z',
    requestsPerSecond: 540,
    p95LatencyMs: 48.0,
    activeSockets: 1420,
    databaseConnections: 8,
    cpuUtilizationPercent: 28.4,
    memoryUtilizationPercent: 41.5,
  },
];
