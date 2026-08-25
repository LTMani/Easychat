import { Test, TestingModule } from '@nestjs/testing';
import { ESignatureWorkflowService } from '../src/modules/contracts/e-signature-workflow.service';

describe('ESignatureWorkflowService', () => {
  let service: ESignatureWorkflowService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ESignatureWorkflowService],
    }).compile();
    service = module.get<ESignatureWorkflowService>(ESignatureWorkflowService);
  });

  it('should create a contract with SHA-256 integrity hash', () => {
    const doc = service.createContract({
      organizationId: 'org1',
      title: 'Master Services Agreement',
      contentHtml: '<h1>Agreement</h1><p>Terms and conditions...</p>',
      recipients: [{ email: 'client@acme.com', name: 'Client Name' }],
    });

    expect(doc.id).toBeDefined();
    expect(doc.status).toBe('DRAFT');
    expect(doc.documentHash).toHaveLength(64);
    expect(doc.recipients).toHaveLength(1);
  });

  it('should process multi-step signature and generate audit cert upon completion', () => {
    const doc = service.createContract({
      organizationId: 'org1',
      title: 'Service Order #101',
      contentHtml: '<p>Standard contract</p>',
      recipients: [{ email: 'signer@test.com', name: 'Signer One' }],
    });

    service.sendForSignature(doc.id);
    const { contract, isFullySigned } = service.recordSignature({
      contractId: doc.id,
      signerEmail: 'signer@test.com',
      signatureDataUrl: 'data:image/png;base64,mockSignatureData',
      ipAddress: '192.168.1.10',
    });

    expect(isFullySigned).toBe(true);
    expect(contract.status).toBe('SIGNED');
    expect(contract.auditCertificateId).toBeDefined();

    const cert = service.generateAuditCertificate(doc.id);
    expect(cert.certificateId).toBe(contract.auditCertificateId);
  });
});
