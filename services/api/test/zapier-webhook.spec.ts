import { Test, TestingModule } from '@nestjs/testing';
import { ZapierWebhookService } from '../src/modules/integrations/zapier-webhook.service';

describe('ZapierWebhookService', () => {
  let service: ZapierWebhookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ZapierWebhookService],
    }).compile();
    service = module.get<ZapierWebhookService>(ZapierWebhookService);
  });

  it('should generate sample data for contact.created', () => {
    const data: any = service.generateSampleData('contact.created');
    expect(Array.isArray(data)).toBe(true);
    expect(data[0].email).toBe('jane.doe@example.com');
  });

  it('should generate sample data for deal.won', () => {
    const data: any = service.generateSampleData('deal.won');
    expect(Array.isArray(data)).toBe(true);
    expect(data[0].value).toBe(48000);
  });

  it('should format Zapier contact response payload', () => {
    const formatted = service.formatZapierContactResponse({
      id: 'c_1',
      firstName: 'John',
      lastName: 'Smith',
      email: 'john@example.com',
      organizationName: 'Acme',
      leadScore: 90,
      createdAt: new Date(),
    });

    expect(formatted.id).toBe('c_1');
    expect(formatted.firstName).toBe('John');
    expect(formatted.company).toBe('Acme');
  });
});
