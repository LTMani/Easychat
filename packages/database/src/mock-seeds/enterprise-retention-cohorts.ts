export interface MockCohortRetentionRow {
  cohortMonth: string;
  newCustomersAcquired: number;
  initialMrr: number;
  retentionPercentages: number[]; // Month 0 to Month 12 retention %
  netRevenueRetentionPercent: number; // NRR %
  cacPaybackMonths: number;
}

export const ENTERPRISE_RETENTION_COHORTS: MockCohortRetentionRow[] = [
  {
    cohortMonth: '2025-08',
    newCustomersAcquired: 142,
    initialMrr: 42600,
    retentionPercentages: [100, 96, 94, 92, 91, 90, 89, 88, 88, 87, 86, 86, 85],
    netRevenueRetentionPercent: 128,
    cacPaybackMonths: 7.2,
  },
  {
    cohortMonth: '2025-09',
    newCustomersAcquired: 156,
    initialMrr: 48900,
    retentionPercentages: [100, 97, 95, 93, 92, 91, 90, 89, 89, 88, 87, 86],
    netRevenueRetentionPercent: 131,
    cacPaybackMonths: 6.8,
  },
  {
    cohortMonth: '2025-10',
    newCustomersAcquired: 168,
    initialMrr: 54200,
    retentionPercentages: [100, 98, 96, 94, 93, 92, 91, 91, 90, 89, 88],
    netRevenueRetentionPercent: 134,
    cacPaybackMonths: 6.5,
  },
  {
    cohortMonth: '2025-11',
    newCustomersAcquired: 180,
    initialMrr: 61500,
    retentionPercentages: [100, 98, 96, 95, 94, 93, 92, 92, 91, 90],
    netRevenueRetentionPercent: 136,
    cacPaybackMonths: 6.1,
  },
  {
    cohortMonth: '2025-12',
    newCustomersAcquired: 210,
    initialMrr: 74800,
    retentionPercentages: [100, 99, 97, 96, 95, 94, 94, 93, 92],
    netRevenueRetentionPercent: 140,
    cacPaybackMonths: 5.8,
  },
  {
    cohortMonth: '2026-01',
    newCustomersAcquired: 225,
    initialMrr: 82100,
    retentionPercentages: [100, 99, 98, 97, 96, 95, 95, 94],
    netRevenueRetentionPercent: 142,
    cacPaybackMonths: 5.4,
  },
];
