import { Injectable, Logger } from '@nestjs/common';

export interface TaxJurisdictionRule {
  jurisdictionCode: string;
  countryCode: string;
  regionOrState: string;
  standardTaxRatePercent: number;
  digitalServicesTaxRatePercent: number;
  economicNexusDollarThreshold: number;
  economicNexusTransactionThreshold: number;
  isReverseChargeApplicable: boolean;
}

export interface TaxCalculationResult {
  jurisdictionCode: string;
  taxableSubtotalUsd: number;
  effectiveTaxRatePercent: number;
  calculatedTaxAmountUsd: number;
  totalInvoiceAmountUsd: number;
  isTaxExempt: boolean;
  reverseChargeNote?: string;
}

@Injectable()
export class VatNexusCalculatorService {
  private readonly logger = new Logger(VatNexusCalculatorService.name);

  private readonly rules: TaxJurisdictionRule[] = [
    { jurisdictionCode: 'US_CA', countryCode: 'US', regionOrState: 'California', standardTaxRatePercent: 7.25, digitalServicesTaxRatePercent: 0, economicNexusDollarThreshold: 500000, economicNexusTransactionThreshold: 200, isReverseChargeApplicable: false },
    { jurisdictionCode: 'US_NY', countryCode: 'US', regionOrState: 'New York', standardTaxRatePercent: 8.875, digitalServicesTaxRatePercent: 8.875, economicNexusDollarThreshold: 500000, economicNexusTransactionThreshold: 100, isReverseChargeApplicable: false },
    { jurisdictionCode: 'US_TX', countryCode: 'US', regionOrState: 'Texas', standardTaxRatePercent: 8.25, digitalServicesTaxRatePercent: 6.6, economicNexusDollarThreshold: 500000, economicNexusTransactionThreshold: 0, isReverseChargeApplicable: false },
    { jurisdictionCode: 'EU_DE', countryCode: 'DE', regionOrState: 'Germany', standardTaxRatePercent: 19.0, digitalServicesTaxRatePercent: 19.0, economicNexusDollarThreshold: 10000, economicNexusTransactionThreshold: 0, isReverseChargeApplicable: true },
    { jurisdictionCode: 'EU_FR', countryCode: 'FR', regionOrState: 'France', standardTaxRatePercent: 20.0, digitalServicesTaxRatePercent: 20.0, economicNexusDollarThreshold: 10000, economicNexusTransactionThreshold: 0, isReverseChargeApplicable: true },
    { jurisdictionCode: 'GB_UK', countryCode: 'GB', regionOrState: 'United Kingdom', standardTaxRatePercent: 20.0, digitalServicesTaxRatePercent: 20.0, economicNexusDollarThreshold: 85000, economicNexusTransactionThreshold: 0, isReverseChargeApplicable: true },
  ];

  calculateTax(subtotalUsd: number, countryCode: string, stateOrRegion?: string, customerVatNumber?: string): TaxCalculationResult {
    this.logger.debug(`Calculating tax for $${subtotalUsd} in ${countryCode} / ${stateOrRegion}`);

    let rule = this.rules.find((r) => r.countryCode === countryCode && (!stateOrRegion || r.regionOrState.toLowerCase() === stateOrRegion.toLowerCase()));

    if (!rule) {
      rule = this.rules.find((r) => r.countryCode === countryCode) || this.rules[0];
    }

    if (customerVatNumber && rule.isReverseChargeApplicable) {
      return {
        jurisdictionCode: rule.jurisdictionCode,
        taxableSubtotalUsd: subtotalUsd,
        effectiveTaxRatePercent: 0,
        calculatedTaxAmountUsd: 0,
        totalInvoiceAmountUsd: subtotalUsd,
        isTaxExempt: true,
        reverseChargeNote: `EU Reverse Charge VAT Applied under Article 196 of Council Directive 2006/112/EC (VAT ID: ${customerVatNumber})`,
      };
    }

    const rate = rule.digitalServicesTaxRatePercent;
    const tax = parseFloat(((subtotalUsd * rate) / 100).toFixed(2));
    const total = parseFloat((subtotalUsd + tax).toFixed(2));

    return {
      jurisdictionCode: rule.jurisdictionCode,
      taxableSubtotalUsd: subtotalUsd,
      effectiveTaxRatePercent: rate,
      calculatedTaxAmountUsd: tax,
      totalInvoiceAmountUsd: total,
      isTaxExempt: false,
    };
  }

  listJurisdictionRules(): TaxJurisdictionRule[] {
    return [...this.rules];
  }
}
