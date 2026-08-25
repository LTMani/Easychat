import { z } from 'zod';

// ─── Pagination ──────────────────────────────────────────────────────────────

export const PaginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(100).default(25),
});

export type Pagination = z.infer<typeof PaginationSchema>;

export const PaginatedResponseSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z.object({
    data: z.array(itemSchema),
    meta: z.object({
      total: z.number().int(),
      page: z.number().int(),
      limit: z.number().int(),
      pages: z.number().int(),
      hasNext: z.boolean(),
      hasPrev: z.boolean(),
    }),
  });

// ─── Contact Schemas ──────────────────────────────────────────────────────────

export const CreateContactSchema = z.object({
  firstName: z.string().min(1).max(100),
  lastName: z.string().max(100).optional(),
  email: z.string().email().optional(),
  phone: z.string().max(30).optional(),
  country: z.string().length(2).toUpperCase().optional(),
  jobTitle: z.string().max(200).optional(),
  organizationName: z.string().max(200).optional(),
  lifetimeValue: z.number().nonnegative().optional(),
  leadScore: z.number().int().min(0).max(100).optional(),
  tags: z.array(z.string()).default([]),
  notes: z.string().max(5000).optional(),
  source: z.enum(['MANUAL', 'IMPORT', 'API', 'FORM', 'WHATSAPP', 'REFERRAL']).default('MANUAL'),
});

export type CreateContactDto = z.infer<typeof CreateContactSchema>;

export const UpdateContactSchema = CreateContactSchema.partial();
export type UpdateContactDto = z.infer<typeof UpdateContactSchema>;

export const ContactFilterSchema = z.object({
  search: z.string().optional(),
  country: z.string().optional(),
  leadScoreMin: z.coerce.number().optional(),
  leadScoreMax: z.coerce.number().optional(),
  lifetimeValueMin: z.coerce.number().optional(),
  tags: z.array(z.string()).optional(),
  source: z.string().optional(),
  unsubscribed: z.coerce.boolean().optional(),
  emailBounced: z.coerce.boolean().optional(),
});

export type ContactFilterDto = z.infer<typeof ContactFilterSchema>;

// ─── Deal Schemas ─────────────────────────────────────────────────────────────

export const CreateDealSchema = z.object({
  title: z.string().min(1).max(200),
  pipelineId: z.string().cuid(),
  stageId: z.string().cuid(),
  value: z.number().nonnegative(),
  currency: z.string().length(3).toUpperCase().default('USD'),
  contactId: z.string().cuid().optional(),
  assignedToId: z.string().cuid().optional(),
  expectedCloseDate: z.string().datetime().optional(),
  description: z.string().max(5000).optional(),
  probability: z.number().min(0).max(100).optional(),
});

export type CreateDealDto = z.infer<typeof CreateDealSchema>;

export const UpdateDealSchema = CreateDealSchema.partial();
export type UpdateDealDto = z.infer<typeof UpdateDealSchema>;

export const MoveDealSchema = z.object({
  stageId: z.string().cuid(),
  position: z.number().int().nonnegative().optional(),
});

export type MoveDealDto = z.infer<typeof MoveDealSchema>;

// ─── Ticket Schemas ───────────────────────────────────────────────────────────

export const TicketPriorityEnum = z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']);
export const TicketStatusEnum = z.enum(['OPEN', 'IN_PROGRESS', 'WAITING', 'RESOLVED', 'CLOSED']);

export const CreateTicketSchema = z.object({
  subject: z.string().min(1).max(300),
  priority: TicketPriorityEnum.default('MEDIUM'),
  description: z.string().max(10000).optional(),
  contactId: z.string().cuid().optional(),
  tags: z.array(z.string()).default([]),
  assignedToId: z.string().cuid().optional(),
  channel: z.enum(['EMAIL', 'WHATSAPP', 'LIVE_CHAT', 'PHONE', 'PORTAL']).default('EMAIL'),
});

export type CreateTicketDto = z.infer<typeof CreateTicketSchema>;

export const UpdateTicketSchema = z.object({
  subject: z.string().min(1).max(300).optional(),
  status: TicketStatusEnum.optional(),
  priority: TicketPriorityEnum.optional(),
  assignedToId: z.string().cuid().optional(),
  tags: z.array(z.string()).optional(),
});

export type UpdateTicketDto = z.infer<typeof UpdateTicketSchema>;

// ─── Conversation Schemas ─────────────────────────────────────────────────────

export const SendMessageSchema = z.object({
  content: z.string().min(1).max(10000),
  channel: z.enum(['EMAIL', 'WHATSAPP', 'LIVE_CHAT', 'PHONE', 'INSTAGRAM', 'FACEBOOK']).optional(),
  attachmentUrls: z.array(z.string().url()).default([]),
  replyToMessageId: z.string().cuid().optional(),
});

export type SendMessageDto = z.infer<typeof SendMessageSchema>;

// ─── Lead Schemas ─────────────────────────────────────────────────────────────

export const CreateLeadSchema = z.object({
  title: z.string().min(1).max(200),
  email: z.string().email().optional(),
  phone: z.string().max(30).optional(),
  contactName: z.string().max(200).optional(),
  source: z.enum(['WEBSITE', 'LINKEDIN', 'REFERRAL', 'COLD_OUTREACH', 'EVENT', 'INBOUND', 'PARTNER']).default('WEBSITE'),
  score: z.number().int().min(0).max(100).optional(),
  notes: z.string().max(5000).optional(),
});

export type CreateLeadDto = z.infer<typeof CreateLeadSchema>;

// ─── Campaign Schemas ─────────────────────────────────────────────────────────

export const CreateCampaignSchema = z.object({
  name: z.string().min(1).max(200),
  content: z.string().min(1),
  channel: z.enum(['EMAIL', 'WHATSAPP', 'SMS']).default('EMAIL'),
  subject: z.string().max(200).optional(),
  segmentQuery: z.record(z.unknown()).optional(),
  scheduledAt: z.string().datetime().optional(),
});

export type CreateCampaignDto = z.infer<typeof CreateCampaignSchema>;

// ─── Report Schemas ───────────────────────────────────────────────────────────

export const ReportQuerySchema = z.object({
  entity: z.enum(['contact', 'deal', 'ticket', 'conversation', 'lead']),
  groupBy: z.enum(['country', 'assignee', 'stage', 'status', 'month', 'source', 'priority', 'channel']),
  metric: z.enum(['count', 'sum', 'avg']),
  field: z.string().optional(),
  from: z.string().datetime().optional(),
  to: z.string().datetime().optional(),
});

export type ReportQueryDto = z.infer<typeof ReportQuerySchema>;

// ─── Webhook Schemas ──────────────────────────────────────────────────────────

export const WebhookEventEnum = z.enum([
  'contact.created', 'contact.updated', 'contact.deleted',
  'deal.created', 'deal.stage_changed', 'deal.won', 'deal.lost',
  'ticket.created', 'ticket.assigned', 'ticket.resolved', 'ticket.sla_breached',
  'conversation.started', 'conversation.resolved', 'conversation.assigned',
  'lead.created', 'lead.scored', 'lead.converted',
  'campaign.sent', 'campaign.completed',
]);

export const CreateWebhookSchema = z.object({
  url: z.string().url(),
  events: z.array(WebhookEventEnum).min(1),
  secret: z.string().min(16).optional(),
  isActive: z.boolean().default(true),
});

export type CreateWebhookDto = z.infer<typeof CreateWebhookSchema>;

// ─── API Key Schemas ──────────────────────────────────────────────────────────

export const CreateApiKeySchema = z.object({
  name: z.string().min(1).max(100),
  permissions: z.array(z.enum(['contacts:read', 'contacts:write', 'deals:read', 'deals:write', 'tickets:read', 'tickets:write', 'conversations:read', 'conversations:write', 'reports:read', 'campaigns:write', 'admin'])).min(1),
  expiresAt: z.string().datetime().optional(),
});

export type CreateApiKeyDto = z.infer<typeof CreateApiKeySchema>;

// ─── Segment Schemas ──────────────────────────────────────────────────────────

export const SegmentCriteriaSchema = z.object({
  countries: z.array(z.string().length(2)).optional(),
  lifetimeValueMin: z.number().nonnegative().optional(),
  lifetimeValueMax: z.number().nonnegative().optional(),
  leadScoreMin: z.number().int().min(0).max(100).optional(),
  tags: z.array(z.string()).optional(),
  hasOpenDeals: z.boolean().optional(),
  unsubscribed: z.literal(false).optional(),
  emailBounced: z.literal(false).optional(),
});

export type SegmentCriteriaDto = z.infer<typeof SegmentCriteriaSchema>;

// ─── Organization Schemas ─────────────────────────────────────────────────────

export const UpdateOrganizationSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  logoUrl: z.string().url().optional(),
  timezone: z.string().optional(),
  defaultCurrency: z.string().length(3).toUpperCase().optional(),
  supportEmail: z.string().email().optional(),
  website: z.string().url().optional(),
});

export type UpdateOrganizationDto = z.infer<typeof UpdateOrganizationSchema>;

// ─── Invitation Schemas ───────────────────────────────────────────────────────

export const InviteMemberSchema = z.object({
  email: z.string().email(),
  role: z.enum(['ADMIN', 'AGENT', 'VIEWER']),
  name: z.string().max(200).optional(),
});

export type InviteMemberDto = z.infer<typeof InviteMemberSchema>;
