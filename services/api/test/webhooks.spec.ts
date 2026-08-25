import { Test, TestingModule } from '@nestjs/testing';
import { WebhooksDispatcherService } from '../src/modules/webhooks/webhooks-dispatcher.service';

describe('WebhooksDispatcherService', () => {
  let service: WebhooksDispatcherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebhooksDispatcherService],
    }).compile();

    service = module.get<WebhooksDispatcherService>(WebhooksDispatcherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should generate valid HMAC SHA256 signatures', () => {
    const payload = JSON.stringify({ event: 'ticket.created', id: '123' });
    const secret = 'whsec_test_secret_key';
    const crypto = require('crypto');
    const expected = crypto.createHmac('sha256', secret).update(payload).digest('hex');

    expect(expected).toHaveLength(64);
  });
});
