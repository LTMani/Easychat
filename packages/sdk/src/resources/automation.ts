import { EasyChatHttpClient } from '../client';

export class AutomationResource {
  constructor(private readonly client: EasyChatHttpClient) {}

  async getDeadLetterQueue() {
    return this.client.request('/v1/automation/dlq/pending');
  }

  async replayDeadLetter(messageId: string) {
    return this.client.request('/v1/automation/dlq/replay', {
      method: 'POST',
      body: JSON.stringify({ messageId }),
    });
  }

  async enrollDrip(contactId: string, campaignId?: string) {
    return this.client.request('/v1/automation/drip/enroll', {
      method: 'POST',
      body: JSON.stringify({ contactId, campaignId }),
    });
  }

  async assignLeadRoundRobin(leadId: string, territory?: string) {
    return this.client.request('/v1/automation/leads/assign-round-robin', {
      method: 'POST',
      body: JSON.stringify({ leadId, territory }),
    });
  }
}
