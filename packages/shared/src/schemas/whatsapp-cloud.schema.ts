import { z } from 'zod';

export const WhatsAppIncomingMessageSchema = z.object({
  wamId: z.string(),
  fromPhoneNumber: z.string(),
  senderName: z.string(),
  messageType: z.enum(['TEXT', 'IMAGE', 'DOCUMENT', 'INTERACTIVE_BUTTON_REPLY', 'LOCATION']),
  textBody: z.string().optional(),
  mediaUrl: z.string().url().optional(),
  interactiveButtonId: z.string().optional(),
  timestampEpochSeconds: z.number().int().positive(),
});

export const WhatsAppMessageDeliveryReceiptSchema = z.object({
  messageId: z.string(),
  recipientPhone: z.string(),
  templateName: z.string().optional(),
  status: z.enum(['SENT', 'DELIVERED', 'READ', 'FAILED']),
  metaGraphMessageId: z.string(),
  dispatchedAtIso: z.string(),
});

export type WhatsAppIncomingMessageDto = z.infer<typeof WhatsAppIncomingMessageSchema>;
export type WhatsAppMessageDeliveryReceiptDto = z.infer<typeof WhatsAppMessageDeliveryReceiptSchema>;
