import { EasyChatHttpClient } from '../client';

export class RealtimePresenceResource {
  constructor(private readonly client: EasyChatHttpClient) {}

  async sendHeartbeat(data: {
    agentId: string;
    workspaceId: string;
    status?: string;
    activeCount?: number;
  }) {
    return this.client.request('/v1/realtime/presence/heartbeat', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getAvailableAgents(workspaceId: string) {
    return this.client.request(`/v1/realtime/presence/workspace/${encodeURIComponent(workspaceId)}/available`);
  }

  async dispatchEvent(data: {
    workspaceId: string;
    channel: string;
    eventType: string;
    payload: Record<string, any>;
  }) {
    return this.client.request('/v1/realtime/events/dispatch', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}
