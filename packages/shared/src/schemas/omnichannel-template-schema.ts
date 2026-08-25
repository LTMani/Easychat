import { z } from 'zod';

export const ChannelTypeEnum = z.enum(['EMAIL', 'SMS', 'WHATSAPP', 'IN_APP_CHAT', 'PUSH_NOTIFICATION']);

export const OmnichannelTemplateSchema = z.object({
  templateId: z.string().min(1),
  name: z.string().min(1),
  channel: ChannelTypeEnum,
  subject: z.string().optional(),
  bodyTemplate: z.string().min(1),
  variables: z.array(z.string()),
  category: z.enum(['MARKETING', 'TRANSACTIONAL', 'ALERT', 'SURVEY']),
  isActive: z.boolean().default(true),
});

export type OmnichannelTemplate = z.infer<typeof OmnichannelTemplateSchema>;
