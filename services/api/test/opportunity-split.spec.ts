import { Test, TestingModule } from '@nestjs/testing';
import { OpportunitySplitService } from '../src/modules/crm/opportunity-split.service';

describe('OpportunitySplitService', () => {
  let service: OpportunitySplitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OpportunitySplitService],
    }).compile();
    service = module.get<OpportunitySplitService>(OpportunitySplitService);
  });

  it('should allocate revenue credits correctly for valid 100% split', () => {
    const res = service.calculateSplits(100000, [
      { agentId: 'rep_1', splitPercentage: 70, role: 'PRIMARY_CLOSER' },
      { agentId: 'rep_2', splitPercentage: 30, role: 'OVERLAY_ENGINEER' },
    ]);

    expect(res.isValid).toBe(true);
    expect(res.allocations[0].allocatedAmount).toBe(70000);
    expect(res.allocations[1].allocatedAmount).toBe(30000);
  });

  it('should reject split configuration not summing to 100%', () => {
    const res = service.calculateSplits(100000, [
      { agentId: 'rep_1', splitPercentage: 60, role: 'PRIMARY_CLOSER' },
      { agentId: 'rep_2', splitPercentage: 20, role: 'OVERLAY_ENGINEER' },
    ]);

    expect(res.isValid).toBe(false);
    expect(res.errorMessage).toContain('100%');
  });
});
