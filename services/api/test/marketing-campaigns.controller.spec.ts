import { Test, TestingModule } from '@nestjs/testing';
import { MarketingCampaignsController } from '../src/modules/controllers/marketing-campaigns.controller';
import { AbTestingService } from '../src/modules/marketing/ab-testing.service';
import { SmsCampaignSchedulerService } from '../src/modules/marketing/sms-campaign-scheduler.service';

describe('MarketingCampaignsController', () => {
  let controller: MarketingCampaignsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MarketingCampaignsController],
      providers: [AbTestingService, SmsCampaignSchedulerService],
    }).compile();
    controller = module.get<MarketingCampaignsController>(MarketingCampaignsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create multi-variant A/B experiment', async () => {
    const res = await controller.createAbTest({
      name: 'Q3 Enterprise Announcement',
      variants: [
        { id: 'v1', name: 'Variant A', weightPercent: 50, subjectLine: '3x Speed' },
        { id: 'v2', name: 'Variant B', weightPercent: 50, subjectLine: 'AI Copilot' },
      ],
    });

    expect(res.status).toBe('success');
    expect(res.data.status).toBe('RUNNING');
  });
});
