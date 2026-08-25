import { Injectable, Logger } from '@nestjs/common';

export interface SalesAgentCapacity {
  agentId: string;
  agentName: string;
  territory: string;
  activeLeadsAssigned: number;
  maxLeadCapacity: number;
  isAvailable: boolean;
}

@Injectable()
export class LeadRoundRobinDistributorService {
  private readonly logger = new Logger(LeadRoundRobinDistributorService.name);

  private readonly agents: SalesAgentCapacity[] = [
    { agentId: 'u_rahul', agentName: 'Rahul Varma', territory: 'NORTH_AMERICA', activeLeadsAssigned: 12, maxLeadCapacity: 25, isAvailable: true },
    { agentId: 'u_sarah', agentName: 'Sarah Jenkins', territory: 'NORTH_AMERICA', activeLeadsAssigned: 14, maxLeadCapacity: 25, isAvailable: true },
    { agentId: 'u_david', agentName: 'David Chen', territory: 'EMEA', activeLeadsAssigned: 8, maxLeadCapacity: 20, isAvailable: true },
  ];

  private currentIndex = 0;

  assignLeadToAgent(leadId: string, leadTerritory: string = 'NORTH_AMERICA'): { assignedAgent: SalesAgentCapacity; leadId: string } {
    const eligible = this.agents.filter((a) => a.isAvailable && a.activeLeadsAssigned < a.maxLeadCapacity && a.territory === leadTerritory);

    if (eligible.length === 0) {
      // Fallback to any available agent
      const fallback = this.agents.find((a) => a.isAvailable) || this.agents[0];
      fallback.activeLeadsAssigned++;
      return { assignedAgent: fallback, leadId };
    }

    const assigned = eligible[this.currentIndex % eligible.length];
    this.currentIndex++;
    assigned.activeLeadsAssigned++;

    this.logger.log(`Round-robin assigned lead ${leadId} to agent ${assigned.agentName}`);
    return { assignedAgent: assigned, leadId };
  }

  getAgentCapacities(): SalesAgentCapacity[] {
    return [...this.agents];
  }
}
