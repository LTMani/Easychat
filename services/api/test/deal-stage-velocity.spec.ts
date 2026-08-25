import { Test, TestingModule } from '@nestjs/testing';
import { DealStageVelocityService } from '../src/modules/crm/deal-stage-velocity.service';

describe('DealStageVelocityService', () => {
  let service: DealStageVelocityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DealStageVelocityService],
    }).compile();
    service = module.get<DealStageVelocityService>(DealStageVelocityService);
  });

  it('should calculate pipeline stage durations and detect bottleneck stages', () => {
    const res = service.calculatePipelineVelocity('pipe_101');
    expect(res.stages.length).toBe(5);
    expect(res.overallAverageSalesCycleDays).toBeGreaterThan(0);
    expect(res.bottleneckWarning).toContain('Proposal');
  });
});
