import { Test, TestingModule } from '@nestjs/testing';
import { ChatRoutingEngineService, AgentWorkload } from '../src/modules/omnichannel/chat-routing-engine.service';

describe('ChatRoutingEngineService', () => {
  let service: ChatRoutingEngineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatRoutingEngineService],
    }).compile();
    service = module.get<ChatRoutingEngineService>(ChatRoutingEngineService);
  });

  it('should route to skill matched agent first', () => {
    const agentGeneral: AgentWorkload = {
      userId: 'u1',
      name: 'General Agent',
      skills: ['GENERAL_SUPPORT'],
      maxConcurrentChats: 5,
      activeChatCount: 1,
      isOnline: true,
      status: 'AVAILABLE',
    };

    const agentBilling: AgentWorkload = {
      userId: 'u2',
      name: 'Billing Specialist',
      skills: ['BILLING', 'PAYMENTS'],
      maxConcurrentChats: 5,
      activeChatCount: 2,
      isOnline: true,
      status: 'AVAILABLE',
    };

    service.registerAgent(agentGeneral);
    service.registerAgent(agentBilling);

    const match = service.findBestAgentForConversation({
      channel: 'LIVE_CHAT',
      requiredSkills: ['BILLING'],
    });

    expect(match.routingStrategy).toBe('SKILL_MATCH');
    expect(match.agent?.userId).toBe('u2');
  });

  it('should route to least busy agent when no skills required', () => {
    const agentBusy: AgentWorkload = {
      userId: 'u1',
      name: 'Busy Agent',
      skills: [],
      maxConcurrentChats: 10,
      activeChatCount: 8, // 80%
      isOnline: true,
      status: 'AVAILABLE',
    };

    const agentFree: AgentWorkload = {
      userId: 'u2',
      name: 'Free Agent',
      skills: [],
      maxConcurrentChats: 10,
      activeChatCount: 2, // 20%
      isOnline: true,
      status: 'AVAILABLE',
    };

    service.registerAgent(agentBusy);
    service.registerAgent(agentFree);

    const match = service.findBestAgentForConversation({ channel: 'WHATSAPP' });
    expect(match.routingStrategy).toBe('LEAST_BUSY');
    expect(match.agent?.userId).toBe('u2');
  });
});
