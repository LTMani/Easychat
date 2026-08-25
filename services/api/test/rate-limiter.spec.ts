import { Test, TestingModule } from '@nestjs/testing';
import { RateLimiterService } from '../src/modules/security/rate-limiter.service';

describe('RateLimiterService', () => {
  let service: RateLimiterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RateLimiterService],
    }).compile();
    service = module.get<RateLimiterService>(RateLimiterService);
  });

  it('should be defined', () => expect(service).toBeDefined());

  it('should allow the first request for any key', async () => {
    const result = await service.checkLimit('org_1', '/api/contacts', 60);
    expect(result.allowed).toBe(true);
    expect(result.remaining).toBe(59);
  });

  it('should decrement remaining count with each request', async () => {
    await service.checkLimit('org_2', '/api/deals', 10);
    await service.checkLimit('org_2', '/api/deals', 10);
    const result = await service.checkLimit('org_2', '/api/deals', 10);
    expect(result.remaining).toBe(7);
  });

  it('should block requests that exceed the limit', async () => {
    for (let i = 0; i < 5; i++) await service.checkLimit('org_3', '/api/auth/login', 5);
    const result = await service.checkLimit('org_3', '/api/auth/login', 5);
    expect(result.allowed).toBe(false);
    expect(result.remaining).toBe(0);
  });

  it('should clear window when explicitly reset', async () => {
    await service.checkLimit('org_4', '/api/reports', 3);
    await service.clearWindowForTesting('org_4', '/api/reports');
    const result = await service.checkLimit('org_4', '/api/reports', 3);
    expect(result.allowed).toBe(true);
    expect(result.remaining).toBe(2);
  });

  it('should isolate rate limit windows by organization', async () => {
    for (let i = 0; i < 5; i++) await service.checkLimit('org_5', '/api/test', 5);
    const result = await service.checkLimit('org_6', '/api/test', 5);
    expect(result.allowed).toBe(true);
    expect(result.remaining).toBe(4);
  });
});
