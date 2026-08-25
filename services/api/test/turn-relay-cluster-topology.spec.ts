import { Test, TestingModule } from '@nestjs/testing';
import { TurnRelayClusterTopologyService } from '../src/modules/telephony/turn-relay-cluster-topology.service';

describe('TurnRelayClusterTopologyService', () => {
  let service: TurnRelayClusterTopologyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TurnRelayClusterTopologyService],
    }).compile();
    service = module.get<TurnRelayClusterTopologyService>(TurnRelayClusterTopologyService);
  });

  it('should generate HMAC time-windowed ephemeral TURN credentials', () => {
    const creds = service.generateEphemeralTurnToken('user_agent_123', 3600);
    expect(creds.username).toContain('user_agent_123');
    expect(creds.credentialToken.length).toBeGreaterThan(10);
    expect(creds.turnUris.length).toBeGreaterThanOrEqual(3);
  });
});
