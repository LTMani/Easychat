import { Test, TestingModule } from '@nestjs/testing';
import { QueueWaitTimeForecasterService } from '../src/modules/support/queue-wait-time-forecaster.service';

describe('QueueWaitTimeForecasterService', () => {
  let service: QueueWaitTimeForecasterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QueueWaitTimeForecasterService],
    }).compile();
    service = module.get<QueueWaitTimeForecasterService>(QueueWaitTimeForecasterService);
  });

  it('should calculate Erlang C wait times and recommended agent staffing', () => {
    const res = service.calculateErlangC('VIP Support', 10, 100, 240);
    expect(res.trafficIntensityErlangs).toBeGreaterThan(0);
    expect(res.recommendedAgentStaffing).toBeGreaterThanOrEqual(res.trafficIntensityErlangs);
    expect(res.probabilityOfWaitingPercent).toBeGreaterThanOrEqual(0);
  });
});
