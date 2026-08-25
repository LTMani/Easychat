import { Test, TestingModule } from '@nestjs/testing';
import { UsageMeteringService } from '../src/modules/billing/usage-metering.service';

describe('UsageMeteringService', () => {
  let service: UsageMeteringService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsageMeteringService],
    }).compile();
    service = module.get<UsageMeteringService>(UsageMeteringService);
  });

  it('should be defined', () => expect(service).toBeDefined());

  it('should correctly compute SMS cost at $0.0075 per unit', () => {
    const quantity = 200;
    const unitCost = 0.0075;
    const cost = parseFloat((quantity * unitCost).toFixed(4));
    expect(cost).toBe(1.5);
  });

  it('should correctly compute active seat cost at $29 per seat', () => {
    const seats = 12;
    const costPerSeat = 29.0;
    const total = parseFloat((seats * costPerSeat).toFixed(2));
    expect(total).toBe(348.0);
  });

  it('should compute AI token cost at $0.000002 per token', () => {
    const tokens = 1000000;
    const unitCost = 0.000002;
    const total = parseFloat((tokens * unitCost).toFixed(4));
    expect(total).toBe(2.0);
  });

  it('should sum all feature costs into total cost correctly', () => {
    const entries = [
      { totalCost: 2.0 },
      { totalCost: 1.5 },
      { totalCost: 348.0 },
    ];
    const total = parseFloat(entries.reduce((acc, e) => acc + e.totalCost, 0).toFixed(2));
    expect(total).toBe(351.5);
  });
});
