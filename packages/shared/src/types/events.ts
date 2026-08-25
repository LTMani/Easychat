// ─── CRM Domain Event Types ───────────────────────────────────────────────────

export type CrmEventType =
  | 'contact.created'
  | 'contact.updated'
  | 'contact.deleted'
  | 'contact.merged'
  | 'contact.tagged'
  | 'deal.created'
  | 'deal.updated'
  | 'deal.stage_changed'
  | 'deal.won'
  | 'deal.lost'
  | 'deal.assigned'
  | 'ticket.created'
  | 'ticket.updated'
  | 'ticket.assigned'
  | 'ticket.resolved'
  | 'ticket.closed'
  | 'ticket.sla_breached'
  | 'ticket.escalated'
  | 'conversation.started'
  | 'conversation.resolved'
  | 'conversation.archived'
  | 'conversation.assigned'
  | 'message.received'
  | 'message.sent'
  | 'message.delivered'
  | 'message.read'
  | 'lead.created'
  | 'lead.scored'
  | 'lead.converted'
  | 'campaign.created'
  | 'campaign.sent'
  | 'campaign.completed'
  | 'campaign.bounced'
  | 'organization.updated'
  | 'member.invited'
  | 'member.joined'
  | 'member.removed'
  | 'api_key.created'
  | 'api_key.revoked'
  | 'webhook.created'
  | 'webhook.deleted'
  | 'workflow.triggered'
  | 'workflow.completed'
  | 'workflow.failed';

// ─── Base Event Envelope ──────────────────────────────────────────────────────

export interface CrmEvent<T = unknown> {
  eventId: string;
  type: CrmEventType;
  organizationId: string;
  actorId: string;
  timestamp: string;
  data: T;
  version: number;
}

// ─── Specific Event Data Types ────────────────────────────────────────────────

export interface ContactCreatedEvent {
  contactId: string;
  email?: string;
  firstName: string;
  lastName?: string;
  source: string;
}

export interface ContactUpdatedEvent {
  contactId: string;
  changedFields: Record<string, { before: unknown; after: unknown }>;
}

export interface DealCreatedEvent {
  dealId: string;
  title: string;
  value: number;
  currency: string;
  pipelineId: string;
  stageId: string;
  contactId?: string;
}

export interface DealStageChangedEvent {
  dealId: string;
  title: string;
  fromStageId: string;
  fromStageName: string;
  toStageId: string;
  toStageName: string;
  value: number;
}

export interface DealWonEvent {
  dealId: string;
  title: string;
  value: number;
  currency: string;
  closedAt: string;
  assignedToId?: string;
}

export interface DealLostEvent {
  dealId: string;
  title: string;
  value: number;
  lostReason?: string;
  closedAt: string;
}

export interface TicketCreatedEvent {
  ticketId: string;
  subject: string;
  priority: string;
  channel: string;
  contactId?: string;
}

export interface TicketSlaBreachedEvent {
  ticketId: string;
  subject: string;
  breachType: string;
  targetMinutes: number;
  actualMinutes: number;
  assignedToId?: string;
}

export interface TicketEscalatedEvent {
  ticketId: string;
  fromUserId: string;
  toUserId: string;
  reason: string;
}

export interface ConversationStartedEvent {
  conversationId: string;
  channel: string;
  contactId?: string;
  inboxId: string;
}

export interface MessageReceivedEvent {
  messageId: string;
  conversationId: string;
  channel: string;
  content: string;
  senderId: string;
  senderType: 'CONTACT' | 'AGENT' | 'BOT';
}

export interface LeadCreatedEvent {
  leadId: string;
  title: string;
  email?: string;
  source: string;
}

export interface LeadScoredEvent {
  leadId: string;
  previousScore: number;
  newScore: number;
  scoreSignals: Record<string, number>;
}

export interface LeadConvertedEvent {
  leadId: string;
  contactId: string;
  dealId?: string;
  convertedAt: string;
}

export interface WorkflowTriggeredEvent {
  workflowId: string;
  workflowName: string;
  triggerEntityId: string;
  triggerEntityType: string;
}

export interface WorkflowCompletedEvent {
  workflowId: string;
  workflowName: string;
  executionId: string;
  actionsExecuted: number;
  durationMs: number;
}

// ─── Queue Job Types ──────────────────────────────────────────────────────────

export interface EmailQueueJob {
  to: string;
  subject: string;
  htmlContent: string;
  textContent?: string;
  from?: string;
  replyTo?: string;
  organizationId: string;
  campaignId?: string;
  contactId?: string;
}

export interface WebhookQueueJob {
  webhookId: string;
  webhookUrl: string;
  event: CrmEventType;
  payload: CrmEvent;
  retryCount: number;
}

export interface SlaTimerJob {
  ticketId: string;
  organizationId: string;
  slaPolicyId: string;
  evaluateAt: string;
}

export interface EtlImportJob {
  organizationId: string;
  fileUrl: string;
  mappings: Record<string, string>;
  importId: string;
  totalRows: number;
  processedRows: number;
}

export interface CampaignBroadcastJob {
  campaignId: string;
  organizationId: string;
  batchNumber: number;
  totalBatches: number;
  contactIds: string[];
}

export interface VectorEmbeddingJob {
  entityType: 'CONTACT' | 'TICKET' | 'KNOWLEDGE_ARTICLE';
  entityId: string;
  text: string;
  organizationId: string;
}

export interface ReportExportJob {
  reportId: string;
  organizationId: string;
  requestedByUserId: string;
  format: 'CSV' | 'PDF' | 'EXCEL';
  query: Record<string, unknown>;
}

export interface NotificationJob {
  recipientUserId: string;
  type: 'EMAIL' | 'PUSH' | 'IN_APP' | 'SMS';
  title: string;
  body: string;
  data?: Record<string, unknown>;
}

// ─── Common Domain Types ──────────────────────────────────────────────────────

export type ContactSource = 'MANUAL' | 'IMPORT' | 'API' | 'FORM' | 'WHATSAPP' | 'REFERRAL';
export type DealStatus = 'OPEN' | 'WON' | 'LOST';
export type TicketPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
export type TicketStatus = 'OPEN' | 'IN_PROGRESS' | 'WAITING' | 'RESOLVED' | 'CLOSED';
export type ConversationChannel = 'EMAIL' | 'WHATSAPP' | 'LIVE_CHAT' | 'PHONE' | 'INSTAGRAM' | 'FACEBOOK';
export type ConversationStatus = 'OPEN' | 'RESOLVED' | 'ARCHIVED';
export type MemberRole = 'OWNER' | 'ADMIN' | 'AGENT' | 'VIEWER';
export type LeadSource = 'WEBSITE' | 'LINKEDIN' | 'REFERRAL' | 'COLD_OUTREACH' | 'EVENT' | 'INBOUND' | 'PARTNER';
export type CampaignChannel = 'EMAIL' | 'WHATSAPP' | 'SMS';
export type CampaignStatus = 'DRAFT' | 'SCHEDULED' | 'SENDING' | 'SENT' | 'FAILED' | 'PAUSED';
export type SentimentLabel = 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE' | 'URGENT';
export type AutomationTrigger = 'CONTACT_CREATED' | 'DEAL_STAGE_CHANGED' | 'TICKET_CREATED' | 'SLA_BREACHED' | 'LEAD_SCORED' | 'CONVERSATION_STARTED';
export type AutomationActionType = 'SEND_EMAIL' | 'SEND_WHATSAPP' | 'CREATE_TASK' | 'UPDATE_FIELD' | 'ASSIGN_AGENT' | 'ADD_TAG' | 'TRIGGER_WEBHOOK';

// ─── API Response Types ───────────────────────────────────────────────────────

export interface ApiResponse<T> {
  data: T;
  meta?: {
    requestId: string;
    timestamp: string;
    version: string;
  };
}

export interface ApiError {
  statusCode: number;
  code: string;
  message: string;
  details?: Record<string, unknown>;
  requestId: string;
  timestamp: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    pages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}
