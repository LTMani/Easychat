import { Test, TestingModule } from '@nestjs/testing';
import { CustomerSelfServicePortalService } from '../src/modules/portal/customer-self-service-portal.service';

describe('CustomerSelfServicePortalService', () => {
  let service: CustomerSelfServicePortalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomerSelfServicePortalService],
    }).compile();
    service = module.get<CustomerSelfServicePortalService>(CustomerSelfServicePortalService);
  });

  it('should create self-service ticket and recommend relevant knowledge base articles', () => {
    const res = service.createPortalTicket({
      customerEmail: 'sarah@acmecorp.com',
      customerName: 'Sarah Jenkins',
      subject: 'Critical SSO SAML Authentication Failure',
      category: 'TECHNICAL',
      priority: 'URGENT',
      description: 'Unable to authenticate users via Okta SAML 2.0 gateway.',
    });

    expect(res.ticketId).toContain('ptkt_');
    expect(res.ticketReferenceNumber).toContain('TKT-');
    expect(res.assignedQueue).toBe('QUEUE_SUPPORT_P1_CRITICAL');
    expect(res.recommendedKbArticleUrls.length).toBeGreaterThan(0);
  });
});
