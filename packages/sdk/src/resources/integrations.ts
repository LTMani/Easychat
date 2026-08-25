export interface IntegrationStatus {
  provider: 'SALESFORCE' | 'HUBSPOT' | 'ZAPIER' | 'SLACK' | 'STRIPE' | 'TWILIO';
  isConnected: boolean;
  lastSyncedAt?: string;
  recordCounts?: Record<string, number>;
  errorMessage?: string;
}

export class IntegrationsResource {
  constructor(private readonly fetcher: (path: string, options?: RequestInit) => Promise<any>) {}

  async list(): Promise<IntegrationStatus[]> {
    return this.fetcher('/v1/integrations');
  }

  async getStatus(provider: IntegrationStatus['provider']): Promise<IntegrationStatus> {
    return this.fetcher(`/v1/integrations/${provider.toLowerCase()}/status`);
  }

  async configureSalesforce(config: {
    instanceUrl: string;
    clientId: string;
    clientSecret: string;
    refreshToken: string;
  }): Promise<{ success: boolean }> {
    return this.fetcher('/v1/integrations/salesforce/configure', {
      method: 'POST',
      body: JSON.stringify(config),
    });
  }

  async triggerSalesforceSync(entityType?: 'CONTACT' | 'DEAL' | 'ACCOUNT'): Promise<{ queued: boolean; jobId: string }> {
    return this.fetcher('/v1/integrations/salesforce/sync', {
      method: 'POST',
      body: JSON.stringify({ entityType }),
    });
  }

  async configureHubSpot(config: { portalId: string; accessToken: string }): Promise<{ success: boolean }> {
    return this.fetcher('/v1/integrations/hubspot/configure', {
      method: 'POST',
      body: JSON.stringify(config),
    });
  }

  async triggerHubSpotSync(): Promise<{ queued: boolean; jobId: string }> {
    return this.fetcher('/v1/integrations/hubspot/sync', {
      method: 'POST',
    });
  }

  async configureSlack(config: { webhookUrl: string; channelMapping?: Record<string, string> }): Promise<{ success: boolean }> {
    return this.fetcher('/v1/integrations/slack/configure', {
      method: 'POST',
      body: JSON.stringify(config),
    });
  }

  async testSlackNotification(channel?: string): Promise<{ success: boolean }> {
    return this.fetcher('/v1/integrations/slack/test', {
      method: 'POST',
      body: JSON.stringify({ channel }),
    });
  }
}
