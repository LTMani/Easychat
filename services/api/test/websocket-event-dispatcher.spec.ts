import { Test, TestingModule } from '@nestjs/testing';
import { WebsocketEventDispatcherService } from '../src/modules/realtime/websocket-event-dispatcher.service';

describe('WebsocketEventDispatcherService', () => {
  let service: WebsocketEventDispatcherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebsocketEventDispatcherService],
    }).compile();
    service = module.get<WebsocketEventDispatcherService>(WebsocketEventDispatcherService);
  });

  it('should format and dispatch multiplexed workspace events with timestamp and ID', () => {
    const event = service.dispatchWorkspaceEvent('org_01', 'CONVERSATIONS', 'MESSAGE_RECEIVED', {
      conversationId: 'conv_123',
      text: 'Hello',
    });

    expect(event.eventId).toContain('evt_');
    expect(event.workspaceId).toBe('org_01');
    expect(event.channel).toBe('CONVERSATIONS');
    expect(event.eventType).toBe('MESSAGE_RECEIVED');
  });
});
