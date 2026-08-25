import { Test, TestingModule } from '@nestjs/testing';
import { TlsCertificateMonitorService } from '../src/modules/security/tls-certificate-monitor.service';

describe('TlsCertificateMonitorService', () => {
  let service: TlsCertificateMonitorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TlsCertificateMonitorService],
    }).compile();
    service = module.get<TlsCertificateMonitorService>(TlsCertificateMonitorService);
  });

  it('should inspect TLS certificates across multi-tenant domains', () => {
    const certs = service.inspectCertificates();
    expect(certs.length).toBeGreaterThanOrEqual(3);
    const expiring = certs.find((c) => c.status === 'EXPIRING_SOON');
    expect(expiring).toBeDefined();
    expect(expiring?.domain).toContain('customer-portal');
  });
});
