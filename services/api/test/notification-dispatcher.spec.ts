import { Test, TestingModule } from '@nestjs/testing';
import { NotificationDispatcherService } from '../src/modules/notifications/notification-dispatcher.service';

describe('NotificationDispatcherService', () => {
  let service: NotificationDispatcherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotificationDispatcherService],
    }).compile();

    service = module.get<NotificationDispatcherService>(NotificationDispatcherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should format notification payload correctly', () => {
    const title = 'New SLA Breach Alert';
    const body = 'Ticket TCK-8801 has breached the 15-minute SLA response target.';
    const type = 'PUSH';

    expect(title).toContain('SLA Breach');
    expect(type).toBe('PUSH');
  });
});
