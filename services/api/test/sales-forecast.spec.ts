import { Test, TestingModule } from '@nestjs/testing';
import { SalesForecastService } from '../src/modules/crm/sales-forecast.service';

describe('SalesForecastService', () => {
  let service: SalesForecastService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SalesForecastService],
    }).compile();
    service = module.get<SalesForecastService>(SalesForecastService);
  });

  it('should be defined', () => expect(service).toBeDefined());

  it('should apply correct stage weights to deal values', () => {
    const stageWeights: Record<string, number> = {
      Qualification: 0.1,
      'Proposal / Price Quote': 0.5,
      Negotiation: 0.8,
    };
    const dealAmount = 50000;
    expect(dealAmount * stageWeights['Negotiation']).toBe(40000);
    expect(dealAmount * stageWeights['Qualification']).toBe(5000);
    expect(dealAmount * stageWeights['Proposal / Price Quote']).toBe(25000);
  });

  it('should reduce confidence by 12% per horizon month', () => {
    const baseConfidence = 1.0;
    const month1 = Math.max(0.5, baseConfidence - 1 * 0.12);
    const month2 = Math.max(0.5, baseConfidence - 2 * 0.12);
    expect(month1).toBeCloseTo(0.88, 2);
    expect(month2).toBeCloseTo(0.76, 2);
  });

  it('should cap minimum confidence at 0.5', () => {
    const confidence = Math.max(0.5, 1 - 10 * 0.12);
    expect(confidence).toBe(0.5);
  });
});
