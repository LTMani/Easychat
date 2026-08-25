import { Controller, Get, Post, Body, Query, BadRequestException } from '@nestjs/common';
import { HipaaAuditLoggerService } from '../security/hipaa-audit-logger.service';
import { Soc2EvidenceCollectorService } from '../security/soc2-evidence-collector.service';
import { TlsCertificateMonitorService } from '../security/tls-certificate-monitor.service';

@Controller('v1/security')
export class SecurityAuditController {
  constructor(
    private readonly hipaaService: HipaaAuditLoggerService,
    private readonly soc2Service: Soc2EvidenceCollectorService,
    private readonly tlsService: TlsCertificateMonitorService,
  ) {}

  @Get('soc2/evidence')
  async getSoc2Evidence() {
    const data = this.soc2Service.collectEvidenceReport();
    return {
      status: 'success',
      data,
    };
  }

  @Get('tls/certificates')
  async getTlsCertificates() {
    const data = this.tlsService.inspectCertificates();
    return {
      status: 'success',
      data,
    };
  }

  @Get('hipaa/audits')
  async getHipaaAudits(@Query('patientContactId') patientContactId?: string) {
    const data = this.hipaaService.getAuditHistory(patientContactId);
    return {
      status: 'success',
      data,
    };
  }

  @Post('hipaa/log')
  async logHipaaEvent(
    @Body()
    body: {
      actorUserId: string;
      actorRole: string;
      patientContactId: string;
      action: any;
      fieldsAccessed: string[];
      ipAddress: string;
      userAgent: string;
    },
  ) {
    if (!body.actorUserId || !body.patientContactId || !body.action) {
      throw new BadRequestException('actorUserId, patientContactId, and action are required');
    }

    const event = this.hipaaService.logPhiAccess(
      body.actorUserId,
      body.actorRole || 'AGENT',
      body.patientContactId,
      body.action,
      body.fieldsAccessed || ['medical_history'],
      body.ipAddress || '127.0.0.1',
      body.userAgent || 'EasyChat-Web/1.0',
    );

    return {
      status: 'success',
      data: event,
    };
  }
}
