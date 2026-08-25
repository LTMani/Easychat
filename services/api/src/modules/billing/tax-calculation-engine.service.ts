import { Injectable, Logger } from '@nestjs/common';

export interface TaxCalculationResult {
  subtotal: number;
  taxRatePercent: number;
  taxAmount: number;
  totalAmount: number;
  taxJurisdiction: string;
  isReverseChargeApplied: boolean;
}

@Injectable()
export class TaxCalculationEngineService {
  private readonly logger = new Logger(TaxCalculationEngineService.name);

  // Standard VAT/GST rates by country code
  private readonly VAT_RATES: Record<string, number> = {
    DE: 19.0, // Germany
    FR: 20.0, // France
    GB: 20.0, // United Kingdom
    IT: 22.0, // Italy
    ES: 21.0, // Spain
    SE: 25.0, // Sweden
    IN: 18.0, // India (GST)
    AU: 10.0, // Australia (GST)
    SG: 9.0,  // Singapore (GST)
    US: 0.0,  // US (Handled per state; default 0 for export)
  };

  calculateTax(subtotal: number, countryCode: string, isVatRegisteredBusiness: boolean = false): TaxCalculationResult {
    this.logger.debug(`Calculating taxes for subtotal $${subtotal} in country ${countryCode}`);

    const code = countryCode.toUpperCase();
    const isEuMember = ['DE', 'FR', 'IT', 'ES', 'SE', 'IE', 'NL'].includes(code);

    // Reverse charge applies for EU B2B with valid VAT ID outside seller country
    if (isEuMember && isVatRegisteredBusiness && code !== 'IE') {
      return {
        subtotal,
        taxRatePercent: 0,
        taxAmount: 0,
        totalAmount: subtotal,
        taxJurisdiction: `${code} (EU B2B Reverse Charge)`,
        isReverseChargeApplied: true,
      };
    }

    const rate = this.VAT_RATES[code] ?? 0;
    const taxAmount = parseFloat(((subtotal * rate) / 100).toFixed(2));
    const totalAmount = parseFloat((subtotal + taxAmount).toFixed(2));

    return {
      subtotal,
      taxRatePercent: rate,
      taxAmount,
      totalAmount,
      taxJurisdiction: `${code} Standard Rate (${rate}%)`,
      isReverseChargeApplied: false,
    };
  }
}
