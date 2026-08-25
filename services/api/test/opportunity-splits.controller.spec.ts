import { Test, TestingModule } from '@nestjs/testing';
import { OpportunitySplitsController } from '../src/modules/controllers/opportunity-splits.controller';
import { OpportunitySplitService } from '../src/modules/crm/opportunity-split.service';

describe('OpportunitySplitsController', () => {
  let controller: OpportunitySplitsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OpportunitySplitsController],
      providers: [OpportunitySplitService],
    }).compile();
    controller = module.get<OpportunitySplitsController>(OpportunitySplitsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should calculate revenue splits across reps', async () => {
    const res = await controller.calculateRevenueSplits({
      dealAmount: 100000,
      splits: [
        { repId: 'rep_1', repName: 'Sarah Jenkins', splitPercentage: 70, role: 'PRIMARY_CLOSER' },
        { repId: 'rep_2', repName: 'Alex Mercer', splitPercentage: 30, role: 'SOLUTIONS_ARCHITECT' },
      ],
    });

    expect(res.status).toBe('success');
    expect(res.data.splits[0].allocatedAmount).toBe(70000);
    expect(res.data.splits[1].allocatedAmount).toBe(30000);
  });
});
