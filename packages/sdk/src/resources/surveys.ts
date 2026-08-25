import { EasyChatHttpClient } from '../client';

export class SurveysResource {
  constructor(private readonly client: EasyChatHttpClient) {}

  async submitNps(contactId: string, score: number, feedbackText?: string) {
    return this.client.request('/v1/support/surveys/nps/submit', {
      method: 'POST',
      body: JSON.stringify({ contactId, score, feedbackText }),
    });
  }

  async getAggregateNps() {
    return this.client.request('/v1/support/surveys/nps/aggregate');
  }

  async evaluateChurnRisk(account: {
    accountId: string;
    accountName: string;
    mrrAmount: number;
    openTickets: number;
    activityDeclinePercent: number;
    npsScore: number;
  }) {
    return this.client.request('/v1/support/surveys/churn/evaluate', {
      method: 'POST',
      body: JSON.stringify(account),
    });
  }
}
