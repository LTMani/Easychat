import { Injectable } from '@nestjs/common';

export interface LineItemCalculationInput {
  unitPrice: number;
  quantity: number;
  discountPercentage?: number;
  taxRatePercentage?: number;
}

export interface QuoteTotalCalculationResult {
  subtotal: number;
  totalDiscount: number;
  totalTax: number;
  finalTotal: number;
}

@Injectable()
export class CpqEngineService {
  /**
   * CPQ (Configure, Price, Quote) discount and tax calculation engine
   */
  calculateTotals(
    items: LineItemCalculationInput[],
    globalDiscountPercentage: number = 0,
    defaultTaxRatePercentage: number = 10
  ): QuoteTotalCalculationResult {
    let subtotal = 0;
    let totalDiscount = 0;

    for (const item of items) {
      const lineSubtotal = item.unitPrice * item.quantity;
      const lineDiscountPct = item.discountPercentage || globalDiscountPercentage;
      const lineDiscountAmount = (lineSubtotal * lineDiscountPct) / 100;

      subtotal += lineSubtotal;
      totalDiscount += lineDiscountAmount;
    }

    const netAmount = subtotal - totalDiscount;
    const totalTax = (netAmount * defaultTaxRatePercentage) / 100;
    const finalTotal = netAmount + totalTax;

    return {
      subtotal: parseFloat(subtotal.toFixed(2)),
      totalDiscount: parseFloat(totalDiscount.toFixed(2)),
      totalTax: parseFloat(totalTax.toFixed(2)),
      finalTotal: parseFloat(finalTotal.toFixed(2)),
    };
  }
}
