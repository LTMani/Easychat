import { Injectable, Logger } from '@nestjs/common';

export interface ProfitLossStatement {
  period: string;
  grossRevenue: number;
  costOfGoodsSold: number; // Cloud hosting, telephony minutes, WhatsApp fees
  grossProfit: number;
  grossMarginPercent: number;
  salesAndMarketingOpEx: number;
  researchAndDevelopmentOpEx: number;
  generalAndAdministrativeOpEx: number;
  ebitda: number;
  netProfit: number;
  netMarginPercent: number;
}

export interface UnitEconomicsMetrics {
  customerAcquisitionCost: number;
  averageRevenuePerAccount: number;
  customerLifetimeValue: number;
  ltvToCacRatio: number;
  cacPaybackMonths: number;
  grossMarginPercent: number;
}

@Injectable()
export class ProfitMarginCalculatorService {
  private readonly logger = new Logger(ProfitMarginCalculatorService.name);

  calculateProfitLoss(
    grossRevenue: number,
    cogs: number,
    smOpEx: number,
    rdOpEx: number,
    gaOpEx: number,
  ): ProfitLossStatement {
    this.logger.debug(`Calculating P&L statement for Gross Revenue $${grossRevenue}`);

    const grossProfit = Math.max(0, grossRevenue - cogs);
    const grossMarginPercent = grossRevenue > 0 ? parseFloat(((grossProfit / grossRevenue) * 100).toFixed(1)) : 0;

    const totalOpEx = smOpEx + rdOpEx + gaOpEx;
    const ebitda = grossProfit - totalOpEx;
    const taxes = ebitda > 0 ? ebitda * 0.15 : 0; // 15% estimated corporate tax
    const netProfit = ebitda - taxes;
    const netMarginPercent = grossRevenue > 0 ? parseFloat(((netProfit / grossRevenue) * 100).toFixed(1)) : 0;

    return {
      period: 'Q3-2026',
      grossRevenue: parseFloat(grossRevenue.toFixed(2)),
      costOfGoodsSold: parseFloat(cogs.toFixed(2)),
      grossProfit: parseFloat(grossProfit.toFixed(2)),
      grossMarginPercent,
      salesAndMarketingOpEx: parseFloat(smOpEx.toFixed(2)),
      researchAndDevelopmentOpEx: parseFloat(rdOpEx.toFixed(2)),
      generalAndAdministrativeOpEx: parseFloat(gaOpEx.toFixed(2)),
      ebitda: parseFloat(ebitda.toFixed(2)),
      netProfit: parseFloat(netProfit.toFixed(2)),
      netMarginPercent,
    };
  }

  calculateUnitEconomics(
    totalMarketingSpend: number,
    newCustomersAcquired: number,
    monthlyArpa: number,
    monthlyChurnRate: number = 0.02,
    grossMarginPercent: number = 78.5,
  ): UnitEconomicsMetrics {
    const cac = newCustomersAcquired > 0 ? totalMarketingSpend / newCustomersAcquired : 0;
    const monthlyGrossMargin = (monthlyArpa * grossMarginPercent) / 100;
    const ltv = monthlyChurnRate > 0 ? monthlyGrossMargin / monthlyChurnRate : 0;
    const ltvToCacRatio = cac > 0 ? parseFloat((ltv / cac).toFixed(2)) : 0;
    const cacPaybackMonths = monthlyGrossMargin > 0 ? parseFloat((cac / monthlyGrossMargin).toFixed(1)) : 0;

    return {
      customerAcquisitionCost: Math.round(cac),
      averageRevenuePerAccount: Math.round(monthlyArpa),
      customerLifetimeValue: Math.round(ltv),
      ltvToCacRatio,
      cacPaybackMonths,
      grossMarginPercent,
    };
  }
}
