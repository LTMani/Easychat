export interface MockChartOfAccount {
  accountNumber: string;
  accountName: string;
  accountClass: 'CURRENT_ASSET' | 'NON_CURRENT_ASSET' | 'CURRENT_LIABILITY' | 'LONG_TERM_LIABILITY' | 'SHAREHOLDERS_EQUITY' | 'OPERATING_REVENUE' | 'COST_OF_GOODS_SOLD' | 'OPERATING_EXPENSE';
  normalBalance: 'DEBIT' | 'CREDIT';
  description: string;
  isSubLedgerEnabled: boolean;
}

export const ENTERPRISE_GENERAL_LEDGER_CHART: MockChartOfAccount[] = [
  { accountNumber: '1010', accountName: 'Operating Cash (Silicon Valley Bank)', accountClass: 'CURRENT_ASSET', normalBalance: 'DEBIT', description: 'Primary treasury checking account for daily SaaS disbursements', isSubLedgerEnabled: false },
  { accountNumber: '1020', accountName: 'Money Market Liquidity Reserve (JPMorgan Chase)', accountClass: 'CURRENT_ASSET', normalBalance: 'DEBIT', description: 'Yield-bearing cash reserves for 6-month runway buffer', isSubLedgerEnabled: false },
  { accountNumber: '1100', accountName: 'Accounts Receivable (Trade AR)', accountClass: 'CURRENT_ASSET', normalBalance: 'DEBIT', description: 'Outstanding enterprise customer subscription invoices under ASC 606', isSubLedgerEnabled: true },
  { accountNumber: '1150', accountName: 'Allowance for Doubtful Accounts (Contra-Asset)', accountClass: 'CURRENT_ASSET', normalBalance: 'CREDIT', description: 'Estimated credit loss reserves based on historical default rates', isSubLedgerEnabled: false },
  { accountNumber: '1200', accountName: 'Prepaid Cloud Infrastructure Expenses (AWS/GCP)', accountClass: 'CURRENT_ASSET', normalBalance: 'DEBIT', description: '1-Year committed savings plan cloud prepayment amortized monthly', isSubLedgerEnabled: false },
  { accountNumber: '1500', accountName: 'Capitalized Internal-Use Software Development (ASC 350-40)', accountClass: 'NON_CURRENT_ASSET', normalBalance: 'DEBIT', description: 'Engineering payroll capitalized during application development stage', isSubLedgerEnabled: true },
  { accountNumber: '1550', accountName: 'Accumulated Amortization - Software (Contra-Asset)', accountClass: 'NON_CURRENT_ASSET', normalBalance: 'CREDIT', description: 'Straight-line 3-year amortization of capitalized platform development', isSubLedgerEnabled: false },
  { accountNumber: '2010', accountName: 'Accounts Payable (Trade AP)', accountClass: 'CURRENT_LIABILITY', normalBalance: 'CREDIT', description: 'Outstanding vendor obligations for SaaS tooling and contractors', isSubLedgerEnabled: true },
  { accountNumber: '2050', accountName: 'Accrued Employee Payroll & Commission Bonuses', accountClass: 'CURRENT_LIABILITY', normalBalance: 'CREDIT', description: 'Earned and unpaid sales commissions and engineering salaries', isSubLedgerEnabled: true },
  { accountNumber: '2100', accountName: 'Sales Tax & EU VAT Payable', accountClass: 'CURRENT_LIABILITY', normalBalance: 'CREDIT', description: 'Collected sales tax and OSS VAT awaiting state/tax authority remittance', isSubLedgerEnabled: true },
  { accountNumber: '2200', accountName: 'Unearned / Deferred SaaS Revenue (Short-Term)', accountClass: 'CURRENT_LIABILITY', normalBalance: 'CREDIT', description: 'Annual upfront subscription cash collections amortized over 12 months', isSubLedgerEnabled: true },
  { accountNumber: '3010', accountName: 'Common Stock ($0.0001 Par Value)', accountClass: 'SHAREHOLDERS_EQUITY', normalBalance: 'CREDIT', description: 'Authorized and issued voting equity shares', isSubLedgerEnabled: false },
  { accountNumber: '3020', accountName: 'Additional Paid-In Capital (APIC)', accountClass: 'SHAREHOLDERS_EQUITY', normalBalance: 'CREDIT', description: 'Venture investment received in excess of par value', isSubLedgerEnabled: false },
  { accountNumber: '3050', accountName: 'Retained Earnings / Accumulated Deficit', accountClass: 'SHAREHOLDERS_EQUITY', normalBalance: 'CREDIT', description: 'Cumulative net operational profit and loss across fiscal years', isSubLedgerEnabled: false },
  { accountNumber: '4010', accountName: 'Enterprise Committed Subscription Revenue', accountClass: 'OPERATING_REVENUE', normalBalance: 'CREDIT', description: 'ASC 606 recognized revenue for annual agent seats and platform fees', isSubLedgerEnabled: true },
  { accountNumber: '4020', accountName: 'Professional Services & Implementation Revenue', accountClass: 'OPERATING_REVENUE', normalBalance: 'CREDIT', description: 'One-time onboarding, migration, and custom integration fees', isSubLedgerEnabled: true },
  { accountNumber: '4030', accountName: 'Telephony & WebRTC Carrier Usage Revenue', accountClass: 'OPERATING_REVENUE', normalBalance: 'CREDIT', description: 'Metered per-minute PSTN voice termination and SMS/WhatsApp pass-through', isSubLedgerEnabled: true },
  { accountNumber: '5010', accountName: 'Hosting & Cloud Datacenter Costs (AWS/GCP/Fly.io)', accountClass: 'COST_OF_GOODS_SOLD', normalBalance: 'DEBIT', description: 'Direct compute, PostgreSQL Aurora, Redis ElastiCache, and CDN bandwidth', isSubLedgerEnabled: false },
  { accountNumber: '5020', accountName: 'Telephony Carrier Termination Interchange Fees', accountClass: 'COST_OF_GOODS_SOLD', normalBalance: 'DEBIT', description: 'Twilio, Telnyx, Bandwidth wholesale SIP trunk termination charges', isSubLedgerEnabled: false },
  { accountNumber: '5030', accountName: 'Customer Support Engineering Payroll', accountClass: 'COST_OF_GOODS_SOLD', normalBalance: 'DEBIT', description: 'Salaries and benefits for 24/7 VIP Tier 3 customer support engineers', isSubLedgerEnabled: true },
  { accountNumber: '6010', accountName: 'Research & Development (R&D) Engineering Payroll', accountClass: 'OPERATING_EXPENSE', normalBalance: 'DEBIT', description: 'Core product engineering, AI model tuning, and platform architecture', isSubLedgerEnabled: true },
  { accountNumber: '6100', accountName: 'Sales & Marketing (S&M) Advertising Spend', accountClass: 'OPERATING_EXPENSE', normalBalance: 'DEBIT', description: 'Google Search Ads, LinkedIn B2B campaigns, and partner commissions', isSubLedgerEnabled: true },
  { accountNumber: '6200', accountName: 'General & Administrative (G&A) Legal & Audit Fees', accountClass: 'OPERATING_EXPENSE', normalBalance: 'DEBIT', description: 'SOC 2 Type II attestation, HIPAA compliance audits, and legal counsel', isSubLedgerEnabled: true },
];
