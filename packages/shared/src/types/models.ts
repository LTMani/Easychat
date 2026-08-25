import type {
  ContactCreatedEvent,
  ContactUpdatedEvent,
  DealCreatedEvent,
  DealStageChangedEvent,
  DealWonEvent,
  DealLostEvent,
  TicketCreatedEvent,
  TicketSlaBreachedEvent,
  LeadCreatedEvent,
  LeadScoredEvent,
  CampaignChannel,
  SentimentLabel,
  AutomationTrigger,
  AutomationActionType,
} from './events';

// ─── Contact ──────────────────────────────────────────────────────────────────

export interface Contact {
  id: string;
  organizationId: string;
  firstName: string;
  lastName?: string;
  email?: string;
  phone?: string;
  country?: string;
  jobTitle?: string;
  organizationName?: string;
  avatarUrl?: string;
  leadScore: number;
  lifetimeValue: number;
  tags: string[];
  unsubscribed: boolean;
  emailBounced: boolean;
  source: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Deal ─────────────────────────────────────────────────────────────────────

export interface Deal {
  id: string;
  organizationId: string;
  title: string;
  value: number;
  currency: string;
  status: 'OPEN' | 'WON' | 'LOST';
  pipelineId: string;
  stageId: string;
  probability?: number;
  contactId?: string;
  assignedToId?: string;
  expectedCloseDate?: string;
  closedAt?: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Ticket ───────────────────────────────────────────────────────────────────

export interface Ticket {
  id: string;
  organizationId: string;
  subject: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  status: 'OPEN' | 'IN_PROGRESS' | 'WAITING' | 'RESOLVED' | 'CLOSED';
  channel: string;
  contactId?: string;
  assignedToId?: string;
  tags: string[];
  firstResponseAt?: string;
  resolvedAt?: string;
  closedAt?: string;
  slaBreachedAt?: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Conversation ─────────────────────────────────────────────────────────────

export interface Conversation {
  id: string;
  organizationId: string;
  inboxId: string;
  channel: string;
  status: 'OPEN' | 'RESOLVED' | 'ARCHIVED';
  contactId?: string;
  lastMessageAt: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Message ──────────────────────────────────────────────────────────────────

export interface Message {
  id: string;
  conversationId: string;
  content: string;
  senderType: 'CONTACT' | 'AGENT' | 'BOT';
  senderId: string;
  attachmentUrls: string[];
  sentiment?: SentimentLabel;
  replyToMessageId?: string;
  deliveredAt?: string;
  readAt?: string;
  createdAt: string;
}

// ─── Lead ─────────────────────────────────────────────────────────────────────

export interface Lead {
  id: string;
  organizationId: string;
  title: string;
  email?: string;
  phone?: string;
  contactName?: string;
  source: string;
  score: number;
  notes?: string;
  convertedAt?: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Pipeline ─────────────────────────────────────────────────────────────────

export interface Pipeline {
  id: string;
  organizationId: string;
  name: string;
  currency: string;
  stages: PipelineStage[];
  createdAt: string;
}

export interface PipelineStage {
  id: string;
  pipelineId: string;
  name: string;
  position: number;
  probability: number;
  color?: string;
}

// ─── User & Member ────────────────────────────────────────────────────────────

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: string;
}

export interface OrganizationMember {
  id: string;
  userId: string;
  organizationId: string;
  role: 'OWNER' | 'ADMIN' | 'AGENT' | 'VIEWER';
  joinedAt: string;
  user: User;
}

// ─── Organization ─────────────────────────────────────────────────────────────

export interface Organization {
  id: string;
  name: string;
  logoUrl?: string;
  website?: string;
  timezone: string;
  defaultCurrency: string;
  supportEmail?: string;
  plan: string;
  seatsUsed: number;
  seatsTotal: number;
  createdAt: string;
}

// ─── Campaign ─────────────────────────────────────────────────────────────────

export interface BroadcastCampaign {
  id: string;
  organizationId: string;
  name: string;
  content: string;
  channel: CampaignChannel;
  status: string;
  sentCount: number;
  sentAt?: string;
  createdAt: string;
}

// ─── Webhook ──────────────────────────────────────────────────────────────────

export interface Webhook {
  id: string;
  organizationId: string;
  url: string;
  events: string[];
  isActive: boolean;
  secret?: string;
  createdAt: string;
}

// ─── Automation ───────────────────────────────────────────────────────────────

export interface WorkflowRule {
  id: string;
  organizationId: string;
  name: string;
  trigger: AutomationTrigger;
  conditions: WorkflowCondition[];
  actions: WorkflowAction[];
  isEnabled: boolean;
  executionCount: number;
  lastTriggeredAt?: string;
  createdAt: string;
}

export interface WorkflowCondition {
  field: string;
  operator: 'EQUALS' | 'NOT_EQUALS' | 'CONTAINS' | 'GREATER_THAN' | 'LESS_THAN' | 'IS_SET' | 'IS_NOT_SET';
  value: unknown;
}

export interface WorkflowAction {
  type: AutomationActionType;
  config: Record<string, unknown>;
}

// ─── Report Types ─────────────────────────────────────────────────────────────

export interface PivotReportRow {
  label: string;
  value: number;
  percentage?: number;
  children?: PivotReportRow[];
}

export interface AgentPerformanceRow {
  agentId: string;
  agentName: string;
  ticketsClosed: number;
  avgResponseTimeMinutes: number;
  csatScore: number;
  npsScore: number;
  dealsWon: number;
}

export interface SlaComplianceRow {
  slaPolicyName: string;
  totalTickets: number;
  breachedCount: number;
  complianceRate: number;
  avgResolutionMinutes: number;
}

export interface RevenueForecastRow {
  month: string;
  pipeline: string;
  expectedRevenue: number;
  weightedRevenue: number;
  openDeals: number;
}

// ─── Re-export Event Types ────────────────────────────────────────────────────

export type {
  ContactCreatedEvent,
  ContactUpdatedEvent,
  DealCreatedEvent,
  DealStageChangedEvent,
  DealWonEvent,
  DealLostEvent,
  TicketCreatedEvent,
  TicketSlaBreachedEvent,
  LeadCreatedEvent,
  LeadScoredEvent,
};
