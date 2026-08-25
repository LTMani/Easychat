import { Test, TestingModule } from '@nestjs/testing';
import { DealsCrmController } from '../src/modules/controllers/deals-crm.controller';
import { DealRotationService } from '../src/modules/crm/deal-rotation.service';
import { PipelineAnalyticsService } from '../src/modules/crm/pipeline-analytics.service';

describe('DealsCrmController', () => {
  let controller: DealsCrmController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DealsCrmController],
      providers: [DealRotationService, PipelineAnalyticsService],
    }).compile();
    controller = module.get<DealsCrmController>(DealsCrmController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should rotate deal owner based on round-robin strategy', async () => {
    const res = await controller.rotateDealOwner('deal_1', {
      availableAgentIds: ['u1', 'u2', 'u3'],
      strategy: 'ROUND_ROBIN',
    });

    expect(res.status).toBe('success');
    expect(res.data.assignedAgentId).toBeDefined();
  });
});
