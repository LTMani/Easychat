import { Test, TestingModule } from '@nestjs/testing';
import { IpReputationAnalyzerService } from '../src/modules/security/ip-reputation-analyzer.service';

describe('IpReputationAnalyzerService', () => {
  let service: IpReputationAnalyzerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IpReputationAnalyzerService],
    }).compile();
    service = module.get<IpReputationAnalyzerService>(IpReputationAnalyzerService);
  });

  it('should evaluate trusted private IP addresses with 0 threat score', () => {
    const res = service.analyzeIp('192.168.1.100');
    expect(res.threatScore).toBe(0);
    expect(res.actionRecommendation).toBe('ALLOW');
  });

  it('should detect high-risk proxy subnet and recommend BLOCK action', () => {
    const res = service.analyzeIp('198.51.100.25');
    expect(res.threatScore).toBeGreaterThanOrEqual(80);
    expect(res.isPublicProxy).toBe(true);
    expect(res.actionRecommendation).toBe('BLOCK');
  });

  it('should detect suspicious Tor exit nodes', () => {
    const res = service.analyzeIp('185.220.101.5');
    expect(res.threatScore).toBeGreaterThanOrEqual(80);
    expect(res.isTorExitNode).toBe(true);
    expect(res.actionRecommendation).toBe('BLOCK');
  });
});
