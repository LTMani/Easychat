import { z } from 'zod';

export const TaxJurisdictionRuleSchema = z.object({
  jurisdictionCode: z.string(),
  countryCode: z.string().length(2),
  regionOrState: z.string(),
  standardTaxRatePercent: z.number().min(0).max(100),
  digitalServicesTaxRatePercent: z.number().min(0).max(100),
  economicNexusDollarThreshold: z.number().min(0),
  economicNexusTransactionThreshold: z.number().min(0),
  isReverseChargeApplicable: z.boolean(),
});

export const TaxCalculationResultSchema = z.object({
  jurisdictionCode: z.string(),
  taxableSubtotalUsd: z.number().min(0),
  effectiveTaxRatePercent: z.number().min(0),
  calculatedTaxAmountUsd: z.number().min(0),
  totalInvoiceAmountUsd: z.number().min(0),
  isTaxExempt: z.boolean(),
  reverseChargeNote: z.string().optional(),
});

export type TaxJurisdictionRuleDto = z.infer<typeof TaxJurisdictionRuleSchema>;
export type TaxCalculationResultDto = z.infer<typeof TaxCalculationResultSchema>;
