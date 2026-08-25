import { Test, TestingModule } from '@nestjs/testing';
import { LeadRoundRobinDistributorService } from '../src/modules/automation/lead-round-robin-distributor.service';

describe('LeadRoundRobinDistributorService', () => {
  let service: LeadRoundRobinDistributorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LeadRoundRobinDistributorService],
    }).compile();
    service = module.get<LeadRoundRobinDistributorService>(LeadRoundRobinDistributorService);
  });

  it('should distribute leads evenly across eligible territory agents', () => {
    const res1 = service.assignLeadToAgent('lead_01', 'NORTH_AMERICA');
    const res2 = service.assignLeadToAgent('lead_02', 'NORTH_AMERICA');

    expect(res1.assignedAgent).toBeDefined();
    expect(res2.assignedAgent).toBeDefined();
    expect(res1.assignedAgent.agentId).not.toBe(res2.assignedAgent.agentId);
  });
});
