import { ConversationsService } from '../modules/conversations/conversations.service';
import { RealtimeGateway } from '../modules/realtime/realtime.gateway';
import { ConversationType } from '@easychat/shared';

describe('ConversationsService Unit Tests', () => {
  let service: ConversationsService;
  let mockGateway: Partial<RealtimeGateway>;

  beforeEach(() => {
    mockGateway = {
      broadcastNewMessage: jest.fn(),
      broadcastNotification: jest.fn(),
    };
    service = new ConversationsService(mockGateway as RealtimeGateway);
  });

  it('should instantiate ConversationsService cleanly', () => {
    expect(service).toBeDefined();
  });
});
