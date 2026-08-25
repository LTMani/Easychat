import { BillingService } from '../src/modules/billing/billing.service';

describe('BillingService Unit Tests', () => {
  let billingService: BillingService;

  beforeEach(() => {
    billingService = new BillingService();
  });

  it('should list available subscription plans', async () => {
    const plans = await billingService.listPlans();
    expect(Array.isArray(plans)).toBe(true);
    expect(plans.length).toBeGreaterThan(0);
  });
});
