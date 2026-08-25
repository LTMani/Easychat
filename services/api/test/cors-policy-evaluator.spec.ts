import { Test, TestingModule } from '@nestjs/testing';
import { CorsPolicyEvaluatorService } from '../src/modules/security/cors-policy-evaluator.service';

describe('CorsPolicyEvaluatorService', () => {
  let service: CorsPolicyEvaluatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CorsPolicyEvaluatorService],
    }).compile();
    service = module.get<CorsPolicyEvaluatorService>(CorsPolicyEvaluatorService);
  });

  it('should allow valid origin in policy and deny unlisted origin', () => {
    service.setPolicy({
      organizationId: 'org_acme',
      allowedOrigins: ['https://acme.com', '*.acme.io'],
      allowCredentials: true,
      maxAgeSeconds: 86400,
    });

    expect(service.isOriginAllowed('org_acme', 'https://acme.com')).toBe(true);
    expect(service.isOriginAllowed('org_acme', 'https://app.acme.io')).toBe(true);
    expect(service.isOriginAllowed('org_acme', 'https://malicious.com')).toBe(false);
  });
});
