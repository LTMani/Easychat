import { Test, TestingModule } from '@nestjs/testing';
import { UnsubscribeLinkSignerService } from '../src/modules/marketing/unsubscribe-link-signer.service';

describe('UnsubscribeLinkSignerService', () => {
  let service: UnsubscribeLinkSignerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UnsubscribeLinkSignerService],
    }).compile();
    service = module.get<UnsubscribeLinkSignerService>(UnsubscribeLinkSignerService);
  });

  it('should generate signed unsubscribe URL and verify HMAC signature', () => {
    const url = service.generateSignedLink('customer@acme.com', 'camp_q3_announcement');
    expect(url).toContain('https://app.easychat.io/unsubscribe');
    expect(url).toContain('email=customer%40acme.com');

    // Extract signature param
    const sig = new URL(url).searchParams.get('sig')!;
    expect(service.verifySignature('customer@acme.com', 'camp_q3_announcement', sig)).toBe(true);
    expect(service.verifySignature('other@acme.com', 'camp_q3_announcement', sig)).toBe(false);
  });
});
