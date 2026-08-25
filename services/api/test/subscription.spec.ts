import { Test, TestingModule } from '@nestjs/testing';
import { SubscriptionService } from '../src/modules/billing/subscription.service';

describe('SubscriptionService', () => {
  let service: SubscriptionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubscriptionService],
    }).compile();
    service = module.get<SubscriptionService>(SubscriptionService);
  });

  it('should be defined', () => expect(service).toBeDefined());

  it('should return STARTER plan for "starter" name lookup', () => {
    const plan = service.getPlanByName('starter');
    expect(plan).toBeDefined();
    expect(plan?.name).toBe('STARTER');
    expect(plan?.monthlyPrice).toBe(49);
  });

  it('should return ENTERPRISE plan with unlimited seats', () => {
    const plan = service.getPlanByName('ENTERPRISE');
    expect(plan?.maxSeats).toBe(-1);
  });

  it('should return undefined for unknown plan name', () => {
    const plan = service.getPlanByName('INVALID');
    expect(plan).toBeUndefined();
  });

  it('should calculate upgrade quote from PRO to ENTERPRISE', () => {
    const quote = service.calculateUpgradeQuote('PRO', 'ENTERPRISE', 10, 15);
    expect(quote.toPlan).toBe('ENTERPRISE');
    expect(quote.monthlyCost).toBe(2990);
    expect(quote.annualSavings).toBeGreaterThan(0);
    expect(quote.prorationCredit).toBeGreaterThan(0);
  });

  it('should correctly gate ai_copilot to ENTERPRISE only', () => {
    expect(service.isFeatureAvailableOnPlan('ENTERPRISE', 'ai_copilot')).toBe(true);
    expect(service.isFeatureAvailableOnPlan('PRO', 'ai_copilot')).toBe(false);
    expect(service.isFeatureAvailableOnPlan('STARTER', 'ai_copilot')).toBe(false);
  });

  it('should allow bi_reports for both PRO and ENTERPRISE', () => {
    expect(service.isFeatureAvailableOnPlan('PRO', 'bi_reports')).toBe(true);
    expect(service.isFeatureAvailableOnPlan('ENTERPRISE', 'bi_reports')).toBe(true);
    expect(service.isFeatureAvailableOnPlan('STARTER', 'bi_reports')).toBe(false);
  });

  it('should return true for unknown feature keys (default-allow)', () => {
    expect(service.isFeatureAvailableOnPlan('STARTER', 'unknown_feature_xyz')).toBe(true);
  });
});
