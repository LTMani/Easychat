import { Test, TestingModule } from '@nestjs/testing';
import { IpAllowlistService } from '../src/modules/security/ip-allowlist.service';

describe('IpAllowlistService', () => {
  let service: IpAllowlistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IpAllowlistService],
    }).compile();
    service = module.get<IpAllowlistService>(IpAllowlistService);
  });

  it('should be defined', () => expect(service).toBeDefined());

  it('should allow an IP that exactly matches a non-CIDR entry', () => {
    const result = (service as any).isIpInCidr('192.168.1.1', '192.168.1.1');
    expect(result).toBe(true);
  });

  it('should correctly match IP within a /24 CIDR block', () => {
    const result = (service as any).isIpInCidr('192.168.1.100', '192.168.1.0/24');
    expect(result).toBe(true);
  });

  it('should reject IP outside the CIDR block', () => {
    const result = (service as any).isIpInCidr('10.0.0.1', '192.168.1.0/24');
    expect(result).toBe(false);
  });

  it('should correctly convert an IP to integer', () => {
    const result = (service as any).ipToInt('127.0.0.1');
    expect(result).toBe(2130706433);
  });

  it('should match IP in /16 subnet', () => {
    const result = (service as any).isIpInCidr('10.10.55.200', '10.10.0.0/16');
    expect(result).toBe(true);
  });
});
