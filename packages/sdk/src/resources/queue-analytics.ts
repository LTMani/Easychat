import { EasyChatHttpClient } from '../client';

export class QueueAnalyticsResource {
  constructor(private readonly client: EasyChatHttpClient) {}

  async calculateErlangC(params: {
    queueName: string;
    agents: number;
    arrivalRatePerHour: number;
    ahtSeconds: number;
  }) {
    return this.client.request('/v1/support/queue-analytics/erlang-c', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  }

  async analyzeSentiment(params: {
    conversationId: string;
    turns: Array<{ speaker: string; text: string }>;
  }) {
    return this.client.request('/v1/support/queue-analytics/sentiment/analyze', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  }
}
