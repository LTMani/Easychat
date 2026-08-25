import { z } from 'zod';

export const SignatureFieldAnchorSchema = z.object({
  fieldId: z.string(),
  recipientEmail: z.string().email(),
  fieldType: z.enum(['SIGNATURE', 'INITIALS', 'DATE_SIGNED', 'TEXT_INPUT', 'CHECKBOX']),
  pageNumber: z.number().int().positive(),
  xCoordinatePercent: z.number().min(0).max(100),
  yCoordinatePercent: z.number().min(0).max(100),
  isMandatory: z.boolean(),
  value: z.string().optional(),
  signedAtIso: z.string().optional(),
});

export const ESignEnvelopeSchema = z.object({
  envelopeId: z.string(),
  documentTitle: z.string(),
  sourceFileSha256: z.string(),
  recipients: z.array(z.object({
    name: z.string(),
    email: z.string().email(),
    role: z.enum(['SIGNER', 'VIEWER', 'APPROVER']),
    signingOrder: z.number().int().positive(),
    status: z.enum(['SENT', 'DELIVERED', 'SIGNED', 'DECLINED']),
  })),
  signatureFields: z.array(SignatureFieldAnchorSchema),
  status: z.enum(['DRAFT', 'SENT', 'COMPLETED', 'DECLINED', 'VOIDED']),
  createdAtIso: z.string(),
  completedAtIso: z.string().optional(),
});

export type ESignEnvelopeDto = z.infer<typeof ESignEnvelopeSchema>;
