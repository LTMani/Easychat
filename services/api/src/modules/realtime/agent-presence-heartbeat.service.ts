import { Injectable, Logger } from '@nestjs/common';

export type AgentStatus = 'ONLINE' | 'BUSY' | 'AWAY' | 'OFFLINE';

export interface AgentPresenceRecord {
  agentId: string;
  workspaceId: string;
  status: AgentStatus;
  activeConversationCount: number;
  maxConcurrentConversations: number;
  lastHeartbeatTimestamp: string;
  isAvailableForRouting: boolean;
}

@Injectable()
export class AgentPresenceHeartbeatService {
  private readonly logger = new Logger(AgentPresenceHeartbeatService.name);

  private readonly presenceStore = new Map<string, AgentPresenceRecord>();

  recordHeartbeat(agentId: string, workspaceId: string, status: AgentStatus = 'ONLINE', activeCount: number = 0): AgentPresenceRecord {
    this.logger.debug(`Recording presence heartbeat for agent ${agentId} (${status})`);

    const record: AgentPresenceRecord = {
      agentId,
      workspaceId,
      status,
      activeConversationCount: activeCount,
      maxConcurrentConversations: 5,
      lastHeartbeatTimestamp: new Date().toISOString(),
      isAvailableForRouting: status === 'ONLINE' && activeCount < 5,
    };

    this.presenceStore.set(agentId, record);
    return record;
  }

  getAvailableAgentsForWorkspace(workspaceId: string): AgentPresenceRecord[] {
    return Array.from(this.presenceStore.values()).filter(
      (r) => r.workspaceId === workspaceId && r.isAvailableForRouting,
    );
  }

  getAgentPresence(agentId: string): AgentPresenceRecord | null {
    return this.presenceStore.get(agentId) || null;
  }
}
