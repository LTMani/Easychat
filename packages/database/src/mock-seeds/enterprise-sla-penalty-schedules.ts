export interface MockSlaPenaltyCredit {
  tierCode: string;
  uptimeRangeDescription: string;
  minUptimePercent: number;
  maxUptimePercent: number;
  serviceCreditPercentageOfMonthlyBill: number;
  contractualRemedy: 'BILLING_CREDIT_AUTOMATIC' | 'TERMINATION_FOR_CAUSE_RIGHT';
}

export const ENTERPRISE_SLA_PENALTY_SCHEDULES: MockSlaPenaltyCredit[] = [
  { tierCode: 'SLA_TIER_A', uptimeRangeDescription: '99.90% to 99.98% (Minor Downtime Breach)', minUptimePercent: 99.90, maxUptimePercent: 99.98, serviceCreditPercentageOfMonthlyBill: 10, contractualRemedy: 'BILLING_CREDIT_AUTOMATIC' },
  { tierCode: 'SLA_TIER_B', uptimeRangeDescription: '99.00% to 99.89% (Moderate Downtime Breach)', minUptimePercent: 99.00, maxUptimePercent: 99.89, serviceCreditPercentageOfMonthlyBill: 25, contractualRemedy: 'BILLING_CREDIT_AUTOMATIC' },
  { tierCode: 'SLA_TIER_C', uptimeRangeDescription: '95.00% to 98.99% (Severe Downtime Breach)', minUptimePercent: 95.00, maxUptimePercent: 98.99, serviceCreditPercentageOfMonthlyBill: 50, contractualRemedy: 'BILLING_CREDIT_AUTOMATIC' },
  { tierCode: 'SLA_TIER_D', uptimeRangeDescription: 'Below 95.00% (Catastrophic Outage Breach)', minUptimePercent: 0.00, maxUptimePercent: 94.99, serviceCreditPercentageOfMonthlyBill: 100, contractualRemedy: 'TERMINATION_FOR_CAUSE_RIGHT' },
];
