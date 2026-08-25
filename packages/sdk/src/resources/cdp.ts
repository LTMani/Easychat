import { EasyChatHttpClient } from '../client';

export interface StitchIdentityOptions {
  fingerprint: {
    anonymousId: string;
    ipAddress?: string;
    userAgent?: string;
    cookieHash?: string;
  };
  known?: {
    email?: string;
    phone?: string;
    externalCustomerId?: string;
  };
}

export class CdpResource {
  constructor(private readonly client: EasyChatHttpClient) {}

  async stitchIdentity(options: StitchIdentityOptions) {
    return this.client.request('/v1/cdp/identity/stitch', {
      method: 'POST',
      body: JSON.stringify(options),
    });
  }

  async trackEvent(event: {
    profileId: string;
    eventType: string;
    properties?: Record<string, any>;
    sessionDurationSeconds?: number;
  }) {
    return this.client.request('/v1/cdp/events/track', {
      method: 'POST',
      body: JSON.stringify(event),
    });
  }

  async getFunnelMetrics() {
    return this.client.request('/v1/cdp/funnel');
  }

  async scoreRfm(contactId: string, daysSinceLastOrder: number, orderCount: number, totalSpend: number) {
    return this.client.request('/v1/cdp/rfm/score', {
      method: 'POST',
      body: JSON.stringify({ contactId, daysSinceLastOrder, orderCount, totalSpend }),
    });
  }
}
