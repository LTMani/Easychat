export interface MockAbExperimentRecord {
  id: string;
  experimentName: string;
  channel: 'EMAIL' | 'SMS' | 'WHATSAPP';
  totalImpressions: number;
  winningVariant: string;
  conversionLiftPercent: number;
  status: 'ACTIVE' | 'CONCLUDED';
}

export const MOCK_AB_EXPERIMENTS: MockAbExperimentRecord[] = [
  { id: 'exp_01', experimentName: 'Q3 Enterprise Product Announcement', channel: 'EMAIL', totalImpressions: 4800, winningVariant: 'Variant B: AI Copilot & WhatsApp CRM', conversionLiftPercent: 29.1, status: 'CONCLUDED' },
  { id: 'exp_02', experimentName: 'SaaS Renewal Early Benefit Discount', channel: 'EMAIL', totalImpressions: 2550, winningVariant: 'Variant 2: VIP 15% Early Renewal Benefit', conversionLiftPercent: 44.0, status: 'CONCLUDED' },
  { id: 'exp_03', experimentName: 'SMS Urgent Security Patch Notification', channel: 'SMS', totalImpressions: 1250, winningVariant: 'Variant A: Direct Link', conversionLiftPercent: 18.5, status: 'ACTIVE' },
];
