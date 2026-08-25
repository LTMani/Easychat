import { Injectable, Logger } from '@nestjs/common';

export interface ExchangeRateBundle {
  baseCurrency: string;
  targetCurrency: string;
  midMarketRate: number;
  customerEffectiveRate: number;
  spreadPercent: number;
  timestamp: string;
}

@Injectable()
export class MultiCurrencyForexService {
  private readonly logger = new Logger(MultiCurrencyForexService.name);

  private readonly baseUsdRates: Record<string, number> = {
    USD: 1.0,
    EUR: 0.92,
    GBP: 0.79,
    INR: 83.45,
    JPY: 154.20,
    CAD: 1.36,
    AUD: 1.52,
    SGD: 1.35,
  };

  convertCurrency(
    amount: number,
    fromCurrency: string = 'USD',
    toCurrency: string = 'INR',
    spreadPercent: number = 0.75, // 0.75% FX spread
  ): { convertedAmount: number; rateBundle: ExchangeRateBundle } {
    const fromRate = this.baseUsdRates[fromCurrency.toUpperCase()] || 1.0;
    const toRate = this.baseUsdRates[toCurrency.toUpperCase()] || 1.0;

    const midMarket = toRate / fromRate;
    const customerRate = midMarket * (1 + spreadPercent / 100);
    const converted = amount * customerRate;

    return {
      convertedAmount: parseFloat(converted.toFixed(2)),
      rateBundle: {
        baseCurrency: fromCurrency.toUpperCase(),
        targetCurrency: toCurrency.toUpperCase(),
        midMarketRate: parseFloat(midMarket.toFixed(4)),
        customerEffectiveRate: parseFloat(customerRate.toFixed(4)),
        spreadPercent,
        timestamp: new Date().toISOString(),
      },
    };
  }
}
