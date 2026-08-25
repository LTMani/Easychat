import { CpqEngineService } from '../src/modules/quotes/cpq-engine.service';

describe('CpqEngineService Unit Tests', () => {
  let cpqEngine: CpqEngineService;

  beforeEach(() => {
    cpqEngine = new CpqEngineService();
  });

  it('should accurately calculate quote subtotal, discount, tax, and final total', () => {
    const items = [
      { unitPrice: 100, quantity: 2, discountPercentage: 10 }, // line subtotal 200, discount 20, net 180
      { unitPrice: 50, quantity: 4, discountPercentage: 0 },   // line subtotal 200, discount 0, net 200
    ];

    const result = cpqEngine.calculateTotals(items, 0, 10);

    expect(result.subtotal).toBe(400);
    expect(result.totalDiscount).toBe(20);
    expect(result.totalTax).toBe(38); // 10% of 380
    expect(result.finalTotal).toBe(418); // 380 + 38
  });
});
