import { Test, TestingModule } from '@nestjs/testing';
import { AgentPresenceHeartbeatService } from '../src/modules/realtime/agent-presence-heartbeat.service';

describe('AgentPresenceHeartbeatService', () => {
  let service: AgentPresenceHeartbeatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AgentPresenceHeartbeatService],
    }).compile();
    service = module.get<AgentPresenceHeartbeatService>(AgentPresenceHeartbeatService);
  });

  it('should track agent presence and filter by availability for routing', () => {
    service.recordHeartbeat('agent_sarah', 'org_01', 'ONLINE', 2);
    service.recordHeartbeat('agent_rahul', 'org_01', 'BUSY', 5);

    const available = service.getAvailableAgentsForWorkspace('org_01');
    expect(available.length).toBe(1);
    expect(available[0].agentId).toBe('agent_sarah');
  });
});
