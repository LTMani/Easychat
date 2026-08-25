import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ESignatureWorkflowService } from '../contracts/e-signature-workflow.service';

@Controller('v1/contracts')
export class ContractsController {
  constructor(private readonly service: ESignatureWorkflowService) {}

  @Post()
  async createContract(@Body() body: any) {
    const doc = this.service.createContract(body);
    return { status: 'success', data: doc };
  }

  @Post(':id/send')
  async sendForSignature(@Param('id') id: string) {
    const doc = this.service.sendForSignature(id);
    return { status: 'success', data: doc };
  }

  @Post(':id/sign')
  async recordSignature(
    @Param('id') id: string,
    @Body() body: { signerEmail: string; signatureDataUrl: string; ipAddress?: string },
  ) {
    const result = this.service.recordSignature({
      contractId: id,
      signerEmail: body.signerEmail,
      signatureDataUrl: body.signatureDataUrl,
      ipAddress: body.ipAddress,
    });
    return { status: 'success', data: result };
  }

  @Get(':id/certificate')
  async getAuditCertificate(@Param('id') id: string) {
    const cert = this.service.generateAuditCertificate(id);
    return { status: 'success', data: cert };
  }
}
