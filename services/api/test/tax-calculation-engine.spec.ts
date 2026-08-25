import { Test, TestingModule } from '@nestjs/testing';
import { TaxCalculationEngineService } from '../src/modules/billing/tax-calculation-engine.service';

describe('TaxCalculationEngineService', () => {
  let service: TaxCalculationEngineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaxCalculationEngineService],
    }).compile();
    service = module.get<TaxCalculationEngineService>(TaxCalculationEngineService);
  });

  it('should calculate 19% VAT for Germany', () => {
    const result = service.calculateTax(100, 'DE', false);
    expect(result.taxRatePercent).toBe(19);
    expect(result.taxAmount).toBe(19);
    expect(result.totalAmount).toBe(119);
    expect(result.isReverseChargeApplied).toBe(false);
  });

  it('should apply 0% VAT reverse charge for valid EU B2B customer outside Ireland', () => {
    const result = service.calculateTax(500, 'DE', true);
    expect(result.taxRatePercent).toBe(0);
    expect(result.taxAmount).toBe(0);
    expect(result.totalAmount).toBe(500);
    expect(result.isReverseChargeApplied).toBe(true);
  });
});
