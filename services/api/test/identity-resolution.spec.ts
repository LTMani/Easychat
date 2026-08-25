import { Test, TestingModule } from '@nestjs/testing';
import { IdentityResolutionService } from '../src/modules/cdp/identity-resolution.service';

describe('IdentityResolutionService', () => {
  let service: IdentityResolutionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IdentityResolutionService],
    }).compile();
    service = module.get<IdentityResolutionService>(IdentityResolutionService);
  });

  it('should stitch anonymous cookie fingerprint with email deterministically', () => {
    const res1 = service.stitchVisitorIdentity({
      anonymousId: 'anon_cookie_123',
      ipAddress: '192.168.1.1',
      userAgent: 'Mozilla/5.0',
      cookieHash: 'hash_abc',
      timestamp: '2026-08-25T10:00:00Z',
    });

    expect(res1.canonicalProfileId).toBeDefined();
    expect(res1.confidenceScore).toBe(0.75);

    // Later visitor fills in email form
    const res2 = service.stitchVisitorIdentity(
      {
        anonymousId: 'anon_cookie_123',
        ipAddress: '192.168.1.1',
        userAgent: 'Mozilla/5.0',
        cookieHash: 'hash_abc',
        timestamp: '2026-08-25T10:05:00Z',
      },
      { email: 'sarah@acme.com' },
    );

    expect(res2.canonicalProfileId).toBe(res1.canonicalProfileId);
    expect(res2.knownIdentifiers.email).toBe('sarah@acme.com');
    expect(res2.confidenceScore).toBe(1.0);
  });
});
