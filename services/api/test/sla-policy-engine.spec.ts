import { Test, TestingModule } from '@nestjs/testing';
import { SlaPolicyEngineService } from '../src/modules/sla/sla-policy-engine.service';

describe('SlaPolicyEngineService', () => {
  let service: SlaPolicyEngineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SlaPolicyEngineService],
    }).compile();
    service = module.get<SlaPolicyEngineService>(SlaPolicyEngineService);
  });

  it('should detect business hours correctly', () => {
    // Monday at 10:00 AM UTC
    const mondayMorning = new Date('2026-08-24T10:00:00Z');
    expect(service.isWithinBusinessHours(mondayMorning)).toBe(true);

    // Sunday at 10:00 AM UTC
    const sundayMorning = new Date('2026-08-23T10:00:00Z');
    expect(service.isWithinBusinessHours(sundayMorning)).toBe(false);
  });

  it('should calculate deadlines without business hour restriction', () => {
    const created = new Date('2026-08-24T10:00:00Z');
    const result = service.calculateDeadlines(created, 60, 240, false);

    expect(result.firstResponseDeadline.getTime()).toBe(created.getTime() + 60 * 60 * 1000);
    expect(result.resolutionDeadline.getTime()).toBe(created.getTime() + 240 * 60 * 1000);
  });

  it('should evaluate SLA breach state', () => {
    const created = new Date('2026-08-24T10:00:00Z');
    const now = new Date('2026-08-24T12:00:00Z'); // 120 mins later

    const evalResult = service.evaluateTicketSla(created, null, null, 30, 240, now);
    expect(evalResult.isFirstResponseBreached).toBe(true); // 120 > 30
    expect(evalResult.isResolutionBreached).toBe(false); // 120 < 240
  });
});
