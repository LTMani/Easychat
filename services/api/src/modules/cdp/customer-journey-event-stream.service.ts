import { Injectable, Logger } from '@nestjs/common';

export interface CustomerJourneyEvent {
  eventId: string;
  profileId: string;
  eventType: 'PAGE_VIEW' | 'FORM_SUBMIT' | 'PRICING_VIEWED' | 'CHECKOUT_STARTED' | 'TICKET_FILED' | 'CHAT_INITIATED';
  properties: Record<string, any>;
  sessionDurationSeconds: number;
  timestamp: string;
}

export interface JourneyFunnelMetrics {
  totalUniqueVisitors: number;
  pricingPageViews: number;
  checkoutStartedCount: number;
  completedSignups: number;
  dropOffRatePercent: number;
}

@Injectable()
export class CustomerJourneyEventStreamService {
  private readonly logger = new Logger(CustomerJourneyEventStreamService.name);

  private readonly eventStore: CustomerJourneyEvent[] = [];

  ingestEvent(event: CustomerJourneyEvent): { stored: boolean; totalEvents: number } {
    this.logger.debug(`Ingesting journey event '${event.eventType}' for profile ${event.profileId}`);
    this.eventStore.push(event);
    return { stored: true, totalEvents: this.eventStore.length };
  }

  getEventsByProfile(profileId: string): CustomerJourneyEvent[] {
    return this.eventStore.filter((e) => e.profileId === profileId);
  }

  calculateFunnelMetrics(): JourneyFunnelMetrics {
    const total = this.eventStore.length || 1;
    const pricingViews = this.eventStore.filter((e) => e.eventType === 'PRICING_VIEWED').length;
    const checkoutStarted = this.eventStore.filter((e) => e.eventType === 'CHECKOUT_STARTED').length;
    const completed = this.eventStore.filter((e) => e.eventType === 'FORM_SUBMIT').length;

    const dropOff = pricingViews > 0 ? parseFloat((((pricingViews - completed) / pricingViews) * 100).toFixed(1)) : 0;

    return {
      totalUniqueVisitors: new Set(this.eventStore.map((e) => e.profileId)).size,
      pricingPageViews: pricingViews,
      checkoutStartedCount: checkoutStarted,
      completedSignups: completed,
      dropOffRatePercent: Math.max(0, dropOff),
    };
  }
}
