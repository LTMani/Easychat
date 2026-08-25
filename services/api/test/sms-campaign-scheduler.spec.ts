import { Test, TestingModule } from '@nestjs/testing';
import { SmsCampaignSchedulerService } from '../src/modules/marketing/sms-campaign-scheduler.service';

describe('SmsCampaignSchedulerService', () => {
  let service: SmsCampaignSchedulerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SmsCampaignSchedulerService],
    }).compile();
    service = module.get<SmsCampaignSchedulerService>(SmsCampaignSchedulerService);
  });

  it('should calculate 1 SMS segment for short message <= 160 chars', () => {
    expect(service.calculateSmsSegments('Hello, your ticket has been resolved!')).toBe(1);
  });

  it('should calculate multiple SMS segments for long message > 160 chars', () => {
    const longMsg = 'A'.repeat(320);
    expect(service.calculateSmsSegments(longMsg)).toBe(3); // 320 / 153 = 2.09 -> 3 segments
  });

  it('should detect standard STOP opt-out keywords', () => {
    expect(service.isOptOutKeyword('STOP')).toBe(true);
    expect(service.isOptOutKeyword('unsubscribe')).toBe(true);
    expect(service.isOptOutKeyword('Hello')).toBe(false);
  });

  it('should plan SMS broadcast batches and duration', () => {
    const plan = service.planSmsBroadcast({
      campaignId: 'c1',
      recipients: Array(500).fill('+15551234567'),
      messageText: 'Special promotion 20% off!',
      throttleRatePerSecond: 25,
    });

    expect(plan.totalMessages).toBe(500);
    expect(plan.estimatedDurationSeconds).toBe(20); // 500 / 25 = 20s
    expect(plan.batchCount).toBe(5); // 500 / 100 = 5
  });
});
