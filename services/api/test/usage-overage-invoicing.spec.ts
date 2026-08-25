import { Test, TestingModule } from '@nestjs/testing';
import { UsageOverageInvoicingService } from '../src/modules/billing/usage-overage-invoicing.service';

describe('UsageOverageInvoicingService', () => {
  let service: UsageOverageInvoicingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsageOverageInvoicingService],
    }).compile();
    service = module.get<UsageOverageInvoicingService>(UsageOverageInvoicingService);
  });

  it('should calculate tiered usage overage fees accurately', () => {
    const inv = service.calculateOverages(
      15000, 10000, // 5,000 extra MAU @ $0.05 = $250
      12000, 10000, // 2,000 extra WA @ $0.015 = $30
      1500, 1000,   // 500 extra Mins @ $0.02 = $10
    );

    expect(inv.mauContactsOverageFee).toBe(250);
    expect(inv.whatsappConversationsOverageFee).toBe(30);
    expect(inv.telephonyMinutesOverageFee).toBe(10);
    expect(inv.totalOverageFee).toBe(290);
  });
});
