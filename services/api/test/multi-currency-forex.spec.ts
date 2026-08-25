import { Test, TestingModule } from '@nestjs/testing';
import { MultiCurrencyForexService } from '../src/modules/billing/multi-currency-forex.service';

describe('MultiCurrencyForexService', () => {
  let service: MultiCurrencyForexService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MultiCurrencyForexService],
    }).compile();
    service = module.get<MultiCurrencyForexService>(MultiCurrencyForexService);
  });

  it('should convert USD to INR with FX spread applied', () => {
    const res = service.convertCurrency(100, 'USD', 'INR', 1.0); // $100 * 83.45 * 1.01
    expect(res.convertedAmount).toBeGreaterThan(8300);
    expect(res.rateBundle.targetCurrency).toBe('INR');
    expect(res.rateBundle.spreadPercent).toBe(1.0);
  });
});
