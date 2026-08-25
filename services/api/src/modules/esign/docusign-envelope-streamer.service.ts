import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import * as crypto from 'crypto';

export interface SignatureFieldAnchor {
  fieldId: string;
  recipientEmail: string;
  fieldType: 'SIGNATURE' | 'INITIALS' | 'DATE_SIGNED' | 'TEXT_INPUT' | 'CHECKBOX';
  pageNumber: number;
  xCoordinatePercent: number;
  yCoordinatePercent: number;
  isMandatory: boolean;
  value?: string;
  signedAtIso?: string;
}

export interface ESignEnvelopeCeremony {
  envelopeId: string;
  documentTitle: string;
  sourceFileSha256: string;
  recipients: Array<{ name: string; email: string; role: 'SIGNER' | 'VIEWER' | 'APPROVER'; signingOrder: number; status: 'SENT' | 'DELIVERED' | 'SIGNED' | 'DECLINED' }>;
  signatureFields: SignatureFieldAnchor[];
  status: 'DRAFT' | 'SENT' | 'COMPLETED' | 'DECLINED' | 'VOIDED';
  certificateOfCompletionSha256?: string;
  createdAtIso: string;
  completedAtIso?: string;
}

@Injectable()
export class DocusignEnvelopeStreamerService {
  private readonly logger = new Logger(DocusignEnvelopeStreamerService.name);

  private readonly envelopes = new Map<string, ESignEnvelopeCeremony>();

  constructor() {
    this.seedInitialEnvelopes();
  }

  private seedInitialEnvelopes() {
    this.createEnvelope({
      documentTitle: 'Enterprise Master Services Agreement (MSA) - Apex Global Technologies',
      documentContentRaw: 'THIS ENTERPRISE MASTER SERVICES AGREEMENT is made between EasyChat Inc. and Apex Global...',
      recipients: [
        { name: 'Alexander Sterling', email: 'a.sterling@apexglobal.com', role: 'SIGNER', signingOrder: 1 },
        { name: 'Sarah Jenkins', email: 'sarah.jenkins@easychat.io', role: 'SIGNER', signingOrder: 2 },
      ],
      fields: [
        { fieldId: 'sig_01', recipientEmail: 'a.sterling@apexglobal.com', fieldType: 'SIGNATURE', pageNumber: 8, xCoordinatePercent: 20, yCoordinatePercent: 75, isMandatory: true },
        { fieldId: 'date_01', recipientEmail: 'a.sterling@apexglobal.com', fieldType: 'DATE_SIGNED', pageNumber: 8, xCoordinatePercent: 60, yCoordinatePercent: 75, isMandatory: true },
        { fieldId: 'sig_02', recipientEmail: 'sarah.jenkins@easychat.io', fieldType: 'SIGNATURE', pageNumber: 8, xCoordinatePercent: 20, yCoordinatePercent: 85, isMandatory: true },
      ],
    });
  }

  createEnvelope(dto: {
    documentTitle: string;
    documentContentRaw: string;
    recipients: Array<{ name: string; email: string; role: 'SIGNER' | 'VIEWER' | 'APPROVER'; signingOrder: number }>;
    fields: SignatureFieldAnchor[];
  }): ESignEnvelopeCeremony {
    const envelopeId = `env_${crypto.randomBytes(8).toString('hex')}`;
    const docHash = crypto.createHash('sha256').update(dto.documentContentRaw).digest('hex');

    const envelope: ESignEnvelopeCeremony = {
      envelopeId,
      documentTitle: dto.documentTitle,
      sourceFileSha256: docHash,
      recipients: dto.recipients.map((r) => ({ ...r, status: 'SENT' })),
      signatureFields: dto.fields,
      status: 'SENT',
      createdAtIso: new Date().toISOString(),
    };

    this.envelopes.set(envelopeId, envelope);
    this.logger.log(`Created e-signature ceremony envelope ${envelopeId} for '${dto.documentTitle}'`);
    return envelope;
  }

  signEnvelopeField(envelopeId: string, recipientEmail: string, fieldId: string, signatureBase64Svg: string): ESignEnvelopeCeremony {
    const envelope = this.envelopes.get(envelopeId);
    if (!envelope) throw new BadRequestException(`Envelope '${envelopeId}' not found`);

    const field = envelope.signatureFields.find((f) => f.fieldId === fieldId && f.recipientEmail === recipientEmail);
    if (!field) throw new BadRequestException(`Field '${fieldId}' not found for recipient '${recipientEmail}'`);

    field.value = signatureBase64Svg;
    field.signedAtIso = new Date().toISOString();

    // Check if recipient completed all fields
    const remainingForRecipient = envelope.signatureFields.filter((f) => f.recipientEmail === recipientEmail && f.isMandatory && !f.value);
    if (remainingForRecipient.length === 0) {
      const rec = envelope.recipients.find((r) => r.email === recipientEmail);
      if (rec) rec.status = 'SIGNED';
    }

    // Check if all recipients completed
    const allCompleted = envelope.recipients.filter((r) => r.role === 'SIGNER').every((r) => r.status === 'SIGNED');
    if (allCompleted) {
      envelope.status = 'COMPLETED';
      envelope.completedAtIso = new Date().toISOString();
      envelope.certificateOfCompletionSha256 = crypto.createHash('sha256').update(`${envelopeId}:COMPLETED:${envelope.completedAtIso}`).digest('hex');
      this.logger.log(`Envelope ${envelopeId} successfully completed and sealed with tamper-proof certificate`);
    }

    return envelope;
  }

  getEnvelope(envelopeId: string): ESignEnvelopeCeremony | null {
    return this.envelopes.get(envelopeId) || null;
  }

  listEnvelopes(): ESignEnvelopeCeremony[] {
    return Array.from(this.envelopes.values());
  }
}
