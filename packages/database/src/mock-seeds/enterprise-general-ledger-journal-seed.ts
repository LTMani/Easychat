export interface MockJournalEntrySeed {
  journalNumber: string;
  postingDate: string;
  sourceModule: 'STRIPE_BILLING' | 'ASC606_AMORTIZATION' | 'PAYROLL_DISBURSEMENT' | 'AWS_CLOUD_COGS';
  debitAccount: string;
  creditAccount: string;
  amountUsd: number;
  memoDescription: string;
}

export const ENTERPRISE_GENERAL_LEDGER_JOURNAL_SEED: MockJournalEntrySeed[] = [
  { journalNumber: 'JE-2026-101', postingDate: '2026-08-01', sourceModule: 'STRIPE_BILLING', debitAccount: '1010 (Cash - SVB)', creditAccount: '2200 (Deferred Revenue)', amountUsd: 148900.00, memoDescription: 'Apex Global Annual SaaS Advance Collection' },
  { journalNumber: 'JE-2026-102', postingDate: '2026-08-01', sourceModule: 'STRIPE_BILLING', debitAccount: '6100 (Merchant Processing Fees)', creditAccount: '1010 (Cash - SVB)', amountUsd: 4318.10, memoDescription: 'Stripe 2.9% Interchange & Settlement Fee' },
  { journalNumber: 'JE-2026-103', postingDate: '2026-08-15', sourceModule: 'PAYROLL_DISBURSEMENT', debitAccount: '6010 (R&D Engineering Payroll)', creditAccount: '1010 (Cash - SVB)', amountUsd: 215000.00, memoDescription: 'Bi-monthly engineering team salary disbursement' },
  { journalNumber: 'JE-2026-104', postingDate: '2026-08-15', sourceModule: 'PAYROLL_DISBURSEMENT', debitAccount: '5030 (Support Engineering Payroll)', creditAccount: '1010 (Cash - SVB)', amountUsd: 65000.00, memoDescription: '24/7 Tier 3 Customer Support team payroll' },
  { journalNumber: 'JE-2026-105', postingDate: '2026-08-20', sourceModule: 'AWS_CLOUD_COGS', debitAccount: '5010 (Cloud Datacenter COGS)', creditAccount: '2010 (Accounts Payable)', amountUsd: 38450.00, memoDescription: 'AWS Aurora PostgreSQL & ElastiCache monthly invoice' },
  { journalNumber: 'JE-2026-106', postingDate: '2026-08-25', sourceModule: 'ASC606_AMORTIZATION', debitAccount: '2200 (Deferred Revenue)', creditAccount: '4010 (Committed Subscription Revenue)', amountUsd: 12408.33, memoDescription: 'Monthly ASC 606 revenue recognition for Apex Global' },
];
