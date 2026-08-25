import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import * as crypto from 'crypto';

export type ContractStatus = 'DRAFT' | 'SENT_FOR_SIGNATURE' | 'VIEWED' | 'SIGNED' | 'DECLINED' | 'EXPIRED';

export interface SignerRecipient {
  email: string;
  name: string;
  role: 'SIGNER' | 'VIEWER' | 'APPROVER';
  order: number;
  status: 'PENDING' | 'VIEWED' | 'SIGNED' | 'DECLINED';
  signedAt?: Date;
  ipAddress?: string;
  signatureDataUrl?: string;
}

export interface ContractDocument {
  id: string;
  organizationId: string;
  title: string;
  contentHtml: string;
  documentHash: string;
  status: ContractStatus;
  recipients: SignerRecipient[];
  expiresAt: Date;
  signedAt?: Date;
  auditCertificateId?: string;
  createdAt: Date;
}

@Injectable()
export class ESignatureWorkflowService {
  private readonly logger = new Logger(ESignatureWorkflowService.name);
  private readonly documents = new Map<string, ContractDocument>();

  createContract(params: {
    organizationId: string;
    title: string;
    contentHtml: string;
    recipients: Array<{ email: string; name: string; role?: SignerRecipient['role'] }>;
    expiresInDays?: number;
  }): ContractDocument {
    const id = `cnt_${crypto.randomBytes(12).toString('hex')}`;
    const documentHash = crypto.createHash('sha256').update(params.contentHtml).digest('hex');
    const now = new Date();
    const expiresAt = new Date(now.getTime() + (params.expiresInDays || 30) * 24 * 60 * 60 * 1000);

    const recipients: SignerRecipient[] = params.recipients.map((r, index) => ({
      email: r.email.toLowerCase().trim(),
      name: r.name,
      role: r.role || 'SIGNER',
      order: index + 1,
      status: 'PENDING',
    }));

    const doc: ContractDocument = {
      id,
      organizationId: params.organizationId,
      title: params.title,
      contentHtml: params.contentHtml,
      documentHash,
      status: 'DRAFT',
      recipients,
      expiresAt,
      createdAt: now,
    };

    this.documents.set(id, doc);
    this.logger.log(`Created contract ${id} for org ${params.organizationId} with ${recipients.length} recipients`);
    return doc;
  }

  sendForSignature(contractId: string): ContractDocument {
    const doc = this.documents.get(contractId);
    if (!doc) throw new BadRequestException('Contract not found');
    if (doc.status !== 'DRAFT') throw new BadRequestException(`Cannot send contract with status ${doc.status}`);

    doc.status = 'SENT_FOR_SIGNATURE';
    this.logger.log(`Contract ${contractId} sent for signatures`);
    return doc;
  }

  recordSignature(params: {
    contractId: string;
    signerEmail: string;
    signatureDataUrl: string;
    ipAddress?: string;
  }): { contract: ContractDocument; isFullySigned: boolean } {
    const doc = this.documents.get(params.contractId);
    if (!doc) throw new BadRequestException('Contract not found');

    if (doc.status !== 'SENT_FOR_SIGNATURE' && doc.status !== 'VIEWED') {
      throw new BadRequestException(`Contract is not open for signatures (status: ${doc.status})`);
    }

    const recipient = doc.recipients.find((r) => r.email === params.signerEmail.toLowerCase().trim());
    if (!recipient) throw new BadRequestException(`Signer ${params.signerEmail} is not a recipient on this contract`);

    recipient.status = 'SIGNED';
    recipient.signedAt = new Date();
    recipient.signatureDataUrl = params.signatureDataUrl;
    recipient.ipAddress = params.ipAddress;

    const allSignersSigned = doc.recipients
      .filter((r) => r.role === 'SIGNER')
      .every((r) => r.status === 'SIGNED');

    if (allSignersSigned) {
      doc.status = 'SIGNED';
      doc.signedAt = new Date();
      doc.auditCertificateId = `cert_${crypto.randomBytes(16).toString('hex')}`;
      this.logger.log(`Contract ${doc.id} is now FULLY SIGNED. Certificate: ${doc.auditCertificateId}`);
    }

    return { contract: doc, isFullySigned: allSignersSigned };
  }

  generateAuditCertificate(contractId: string): Record<string, unknown> {
    const doc = this.documents.get(contractId);
    if (!doc || doc.status !== 'SIGNED') throw new BadRequestException('Audit certificate only available for completed contracts');

    return {
      certificateId: doc.auditCertificateId,
      documentId: doc.id,
      title: doc.title,
      documentHash: doc.documentHash,
      createdAt: doc.createdAt.toISOString(),
      completedAt: doc.signedAt?.toISOString(),
      signers: doc.recipients.map((r) => ({
        name: r.name,
        email: r.email,
        status: r.status,
        signedAt: r.signedAt?.toISOString(),
        ipAddress: r.ipAddress || 'unknown',
        verificationHash: crypto.createHash('sha256').update(`${r.email}:${r.signedAt?.toISOString()}:${doc.documentHash}`).digest('hex'),
      })),
    };
  }
}
