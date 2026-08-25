import { Injectable, Logger } from '@nestjs/common';

export interface HistoricalRevenueDataPoint {
  period: string; // e.g. '2026-01'
  revenue: number;
  dealCount: number;
}

export interface ForecastProjection {
  period: string;
  projectedRevenue: number;
  confidenceLowerBound: number;
  confidenceUpperBound: number;
  growthRatePercent: number;
}

@Injectable()
export class ForecastingMlService {
  private readonly logger = new Logger(ForecastingMlService.name);

  computeLinearTrend(data: HistoricalRevenueDataPoint[]): { slope: number; intercept: number; r2: number } {
    if (data.length < 2) return { slope: 0, intercept: data[0]?.revenue || 0, r2: 0 };

    const n = data.length;
    let sumX = 0;
    let sumY = 0;
    let sumXY = 0;
    let sumXX = 0;

    for (let i = 0; i < n; i++) {
      const x = i;
      const y = data[i].revenue;
      sumX += x;
      sumY += y;
      sumXY += x * y;
      sumXX += x * x;
    }

    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;

    // Calculate coefficient of determination (R2)
    const yMean = sumY / n;
    let totalVar = 0;
    let explainedVar = 0;

    for (let i = 0; i < n; i++) {
      const y = data[i].revenue;
      const yPred = slope * i + intercept;
      totalVar += Math.pow(y - yMean, 2);
      explainedVar += Math.pow(yPred - yMean, 2);
    }

    const r2 = totalVar === 0 ? 1 : Math.min(1.0, Math.max(0.0, explainedVar / totalVar));

    return { slope, intercept, r2: parseFloat(r2.toFixed(3)) };
  }

  generateForecast(historicalData: HistoricalRevenueDataPoint[], futurePeriodsCount: number = 3): ForecastProjection[] {
    this.logger.debug(`Generating ${futurePeriodsCount}-period revenue forecast from ${historicalData.length} data points`);

    const { slope, intercept } = this.computeLinearTrend(historicalData);
    const lastRevenue = historicalData[historicalData.length - 1]?.revenue || 100000;
    const projections: ForecastProjection[] = [];

    for (let i = 1; i <= futurePeriodsCount; i++) {
      const t = historicalData.length + i - 1;
      const rawPrediction = Math.max(0, slope * t + intercept);
      const margin = rawPrediction * 0.12 * Math.sqrt(i);

      const growthRate = lastRevenue > 0 ? parseFloat((((rawPrediction - lastRevenue) / lastRevenue) * 100).toFixed(1)) : 0;

      projections.push({
        period: `Forecast +${i}M`,
        projectedRevenue: Math.round(rawPrediction),
        confidenceLowerBound: Math.round(Math.max(0, rawPrediction - margin)),
        confidenceUpperBound: Math.round(rawPrediction + margin),
        growthRatePercent: growthRate,
      });
    }

    return projections;
  }
}
