import { Test, TestingModule } from '@nestjs/testing';
import { EmailTrackingService } from '../src/modules/marketing/email-tracking.service';

describe('EmailTrackingService', () => {
  let service: EmailTrackingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmailTrackingService],
    }).compile();
    service = module.get<EmailTrackingService>(EmailTrackingService);
  });

  it('should be defined', () => expect(service).toBeDefined());

  it('should generate a one-click unsubscribe URL with a token', () => {
    const url = service.generateOneClickUnsubscribeUrl('contact_1', 'campaign_1', 'https://app.easychat.io');
    expect(url).toContain('https://app.easychat.io/unsubscribe?token=');
    expect(url.split('token=')[1]).toBeTruthy();
  });

  it('should generate a click tracking URL that includes the original URL', () => {
    const tracked = service.generateClickTrackingUrl('https://acme.com/landing', 'msg_123', 'https://track.easychat.io');
    expect(tracked).toContain('/track/click');
    expect(tracked).toContain('msg=msg_123');
    expect(tracked).toContain(encodeURIComponent('https://acme.com/landing'));
  });

  it('should generate an open tracking pixel with the message ID', () => {
    const pixel = service.generateOpenTrackingPixel('msg_abc', 'https://track.easychat.io');
    expect(pixel).toContain('<img');
    expect(pixel).toContain('msg=msg_abc');
    expect(pixel).toContain('display:none');
  });

  it('should correctly compute all email campaign metrics', () => {
    const raw = { sent: 1000, delivered: 950, opened: 430, uniqueOpened: 380, clicked: 120, uniqueClicked: 110, bounced: 50, unsubscribed: 10, spamReported: 2 };
    const metrics = service.computeCampaignMetrics(raw, 'campaign_1');
    expect(metrics.deliveryRate).toBe(95.0);
    expect(metrics.openRate).toBeCloseTo(40.0, 1);
    expect(metrics.bounceRate).toBe(5.0);
    expect(metrics.unsubscribeRate).toBeCloseTo(1.05, 1);
    expect(metrics.clickToOpenRate).toBeGreaterThan(0);
  });

  it('should return zero rates when sent count is zero', () => {
    const raw = { sent: 0, delivered: 0, opened: 0, uniqueOpened: 0, clicked: 0, uniqueClicked: 0, bounced: 0, unsubscribed: 0, spamReported: 0 };
    const metrics = service.computeCampaignMetrics(raw, 'campaign_empty');
    expect(metrics.openRate).toBe(0);
    expect(metrics.clickRate).toBe(0);
    expect(metrics.bounceRate).toBe(0);
  });
});
