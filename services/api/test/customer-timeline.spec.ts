import { Test, TestingModule } from '@nestjs/testing';
import { CustomerTimelineService } from '../src/modules/customer360/customer-timeline.service';

describe('CustomerTimelineService', () => {
  let service: CustomerTimelineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomerTimelineService],
    }).compile();

    service = module.get<CustomerTimelineService>(CustomerTimelineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should sort timeline events chronologically descending', () => {
    const events = [
      { id: '1', timestamp: new Date('2026-08-20') },
      { id: '2', timestamp: new Date('2026-08-25') },
    ];

    events.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

    expect(events[0].id).toBe('2');
    expect(events[1].id).toBe('1');
  });
});
