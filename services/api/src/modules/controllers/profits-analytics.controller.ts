import { Controller, Get, Post, Body } from '@nestjs/common';
import { ProfitMarginCalculatorService } from '../analytics/profit-margin-calculator.service';

@Controller('v1/analytics/profits')
export class ProfitsAnalyticsController {
  constructor(private readonly profitService: ProfitMarginCalculatorService) {}

  @Get('summary')
  async getProfitSummary() {
    // 2026 Q3 P&L
    const pl = this.profitService.calculateProfitLoss(
      1850000, // $1.85M Gross Revenue
      385000,  // $385k COGS
      420000,  // $420k Sales & Marketing
      350000,  // $350k R&D
      180000,  // $180k G&A
    );

    const unitEcon = this.profitService.calculateUnitEconomics(
      420000, // Marketing Spend
      350,    // New Customers
      480,    // ARPA
      0.018,  // 1.8% Churn
      79.2,   // 79.2% Gross Margin
    );

    return {
      status: 'success',
      data: {
        profitLoss: pl,
        unitEconomics: unitEcon,
        monthlyTrend: [
          { month: 'Apr 2026', revenue: 480000, cogs: 105000, opex: 270000, netProfit: 105000 },
          { month: 'May 2026', revenue: 540000, cogs: 115000, opex: 290000, netProfit: 135000 },
          { month: 'Jun 2026', revenue: 610000, cogs: 125000, opex: 310000, netProfit: 175000 },
          { month: 'Jul 2026', revenue: 680000, cogs: 138000, opex: 330000, netProfit: 212000 },
          { month: 'Aug 2026', revenue: 760000, cogs: 152000, opex: 350000, netProfit: 258000 },
          { month: 'Sep 2026 (Est)', revenue: 850000, cogs: 168000, opex: 370000, netProfit: 312000 },
        ],
      },
    };
  }
}
