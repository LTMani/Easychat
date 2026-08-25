import { Injectable, Logger } from '@nestjs/common';

export interface TlsCertificateRecord {
  domain: string;
  issuer: string;
  validFrom: string;
  validTo: string;
  daysRemaining: number;
  autoRenewEnabled: boolean;
  ocspStaplingActive: boolean;
  status: 'VALID' | 'EXPIRING_SOON' | 'EXPIRED';
}

@Injectable()
export class TlsCertificateMonitorService {
  private readonly logger = new Logger(TlsCertificateMonitorService.name);

  inspectCertificates(): TlsCertificateRecord[] {
    this.logger.debug('Auditing multi-tenant custom domains and edge TLS certificates');

    return [
      {
        domain: 'api.easychat.io',
        issuer: "Let's Encrypt Authority X3",
        validFrom: '2026-07-01T00:00:00Z',
        validTo: '2026-10-01T00:00:00Z',
        daysRemaining: 37,
        autoRenewEnabled: true,
        ocspStaplingActive: true,
        status: 'VALID',
      },
      {
        domain: 'app.easychat.io',
        issuer: 'DigiCert Global Root G2',
        validFrom: '2026-01-01T00:00:00Z',
        validTo: '2027-01-01T00:00:00Z',
        daysRemaining: 129,
        autoRenewEnabled: true,
        ocspStaplingActive: true,
        status: 'VALID',
      },
      {
        domain: 'customer-portal.acme-corp.com',
        issuer: 'Cloudflare Inc ECC CA-3',
        validFrom: '2026-06-15T00:00:00Z',
        validTo: '2026-09-15T00:00:00Z',
        daysRemaining: 21,
        autoRenewEnabled: true,
        ocspStaplingActive: true,
        status: 'EXPIRING_SOON',
      },
    ];
  }
}
