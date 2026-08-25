import { Test, TestingModule } from '@nestjs/testing';
import { ZeroTrustIpAllowlistService } from '../src/modules/security/zero-trust-ip-allowlist.service';

describe('ZeroTrustIpAllowlistService', () => {
  let service: ZeroTrustIpAllowlistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ZeroTrustIpAllowlistService],
    }).compile();
    service = module.get<ZeroTrustIpAllowlistService>(ZeroTrustIpAllowlistService);
  });

  it('should allow trusted subnet IPs without requiring step-up MFA', () => {
    const res = service.isIpAllowed('192.168.1.150');
    expect(res.allowed).toBe(true);
    expect(res.requireMfa).toBe(false);
    expect(res.matchedRuleId).toBe('ipr_corp_hq');
  });

  it('should require step-up MFA for untrusted remote IPs', () => {
    const res = service.isIpAllowed('203.0.113.45');
    expect(res.allowed).toBe(true);
    expect(res.requireMfa).toBe(true);
  });
});
