import { Injectable, Logger } from '@nestjs/common';

export interface AgentWorkload {
  userId: string;
  name: string;
  skills: string[];
  maxConcurrentChats: number;
  activeChatCount: number;
  isOnline: boolean;
  status: 'AVAILABLE' | 'BUSY' | 'AWAY' | 'OFFLINE';
  lastAssignedAt?: Date;
}

export interface RoutingRule {
  id: string;
  name: string;
  priority: number;
  conditionChannel?: string;
  requiredSkills: string[];
  fallbackToRoundRobin: boolean;
}

@Injectable()
export class ChatRoutingEngineService {
  private readonly logger = new Logger(ChatRoutingEngineService.name);
  private agents = new Map<string, AgentWorkload>();

  registerAgent(agent: AgentWorkload) {
    this.agents.set(agent.userId, agent);
  }

  updateAgentStatus(userId: string, status: AgentWorkload['status'], activeChatCount?: number) {
    const a = this.agents.get(userId);
    if (a) {
      a.status = status;
      a.isOnline = status !== 'OFFLINE';
      if (activeChatCount !== undefined) a.activeChatCount = activeChatCount;
    }
  }

  findBestAgentForConversation(criteria: {
    channel: string;
    requiredSkills?: string[];
    customerLanguage?: string;
  }): { agent: AgentWorkload | null; routingStrategy: 'SKILL_MATCH' | 'LEAST_BUSY' | 'ROUND_ROBIN' | 'NONE' } {
    const availableAgents = Array.from(this.agents.values()).filter(
      (a) => a.isOnline && a.status === 'AVAILABLE' && a.activeChatCount < a.maxConcurrentChats,
    );

    if (availableAgents.length === 0) {
      return { agent: null, routingStrategy: 'NONE' };
    }

    // 1. Skill Match strategy
    if (criteria.requiredSkills && criteria.requiredSkills.length > 0) {
      const matched = availableAgents.filter((a) =>
        criteria.requiredSkills!.every((req) => a.skills.includes(req)),
      );
      if (matched.length > 0) {
        // Pick least busy among matched
        matched.sort((a, b) => (a.activeChatCount / a.maxConcurrentChats) - (b.activeChatCount / b.maxConcurrentChats));
        return { agent: matched[0], routingStrategy: 'SKILL_MATCH' };
      }
    }

    // 2. Least Busy utilization ratio
    availableAgents.sort((a, b) => {
      const utilA = a.activeChatCount / a.maxConcurrentChats;
      const utilB = b.activeChatCount / b.maxConcurrentChats;
      if (utilA === utilB) {
        const timeA = a.lastAssignedAt ? a.lastAssignedAt.getTime() : 0;
        const timeB = b.lastAssignedAt ? b.lastAssignedAt.getTime() : 0;
        return timeA - timeB; // Oldest assigned first (Round Robin tie-breaker)
      }
      return utilA - utilB;
    });

    const chosen = availableAgents[0];
    chosen.lastAssignedAt = new Date();
    chosen.activeChatCount += 1;

    return { agent: chosen, routingStrategy: 'LEAST_BUSY' };
  }

  getQueueCapacityMetrics(): { totalAgents: number; availableAgents: number; maxTotalCapacity: number; currentLoad: number; utilizationPercent: number } {
    const agents = Array.from(this.agents.values());
    const available = agents.filter((a) => a.isOnline && a.status === 'AVAILABLE');
    const maxCapacity = agents.reduce((sum, a) => sum + a.maxConcurrentChats, 0);
    const currentLoad = agents.reduce((sum, a) => sum + a.activeChatCount, 0);

    return {
      totalAgents: agents.length,
      availableAgents: available.length,
      maxTotalCapacity: maxCapacity,
      currentLoad,
      utilizationPercent: maxCapacity > 0 ? parseFloat(((currentLoad / maxCapacity) * 100).toFixed(1)) : 0,
    };
  }
}
