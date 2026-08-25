import { Test, TestingModule } from '@nestjs/testing';
import { SlaCalendarBusinessHoursService, BusinessCalendarConfig } from '../src/modules/sla/sla-calendar-business-hours.service';

describe('SlaCalendarBusinessHoursService', () => {
  let service: SlaCalendarBusinessHoursService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SlaCalendarBusinessHoursService],
    }).compile();
    service = module.get<SlaCalendarBusinessHoursService>(SlaCalendarBusinessHoursService);
  });

  it('should accurately detect business hours vs weekends/holidays', () => {
    const cal: BusinessCalendarConfig = {
      timezone: 'UTC',
      startHourUtc: 9,
      endHourUtc: 17,
      workDays: [1, 2, 3, 4, 5],
      holidays: ['2026-12-25'],
    };

    const tuesdayWorking = new Date('2026-08-25T14:00:00Z');
    const sundayNonWorking = new Date('2026-08-23T14:00:00Z');
    const eveningNonWorking = new Date('2026-08-25T22:00:00Z');

    expect(service.isBusinessHour(tuesdayWorking, cal)).toBe(true);
    expect(service.isBusinessHour(sundayNonWorking, cal)).toBe(false);
    expect(service.isBusinessHour(eveningNonWorking, cal)).toBe(false);
  });
});
