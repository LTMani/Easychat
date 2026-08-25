import { Test, TestingModule } from '@nestjs/testing';
import { DripCampaignSchedulerService } from '../src/modules/automation/drip-campaign-scheduler.service';

describe('DripCampaignSchedulerService', () => {
  let service: DripCampaignSchedulerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DripCampaignSchedulerService],
    }).compile();
    service = module.get<DripCampaignSchedulerService>(DripCampaignSchedulerService);
  });

  it('should enroll customer in 7-day onboarding drip sequence', () => {
    const res = service.enrollContactInDrip('c_john_99', 'drip_enterprise_onboarding');
    expect(res.enrollmentId).toContain('enr_');
    expect(res.status).toBe('ACTIVE');
    expect(res.currentStepIndex).toBe(0);
  });
});
