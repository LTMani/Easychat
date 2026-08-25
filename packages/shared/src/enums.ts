export enum SystemRole {
  OWNER = 'OWNER',
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  SALES_REP = 'SALES_REP',
  SUPPORT_AGENT = 'SUPPORT_AGENT',
  MEMBER = 'MEMBER',
}

export enum Permission {
  // Organization Permissions
  ORG_READ = 'org:read',
  ORG_UPDATE = 'org:update',
  ORG_DELETE = 'org:delete',
  ORG_MANAGE_MEMBERS = 'org:manage_members',
  ORG_MANAGE_ROLES = 'org:manage_roles',

  // Team Permissions
  TEAM_CREATE = 'team:create',
  TEAM_READ = 'team:read',
  TEAM_UPDATE = 'team:update',
  TEAM_DELETE = 'team:delete',

  // Customer / Contact Permissions
  CUSTOMER_CREATE = 'customer:create',
  CUSTOMER_READ = 'customer:read',
  CUSTOMER_UPDATE = 'customer:update',
  CUSTOMER_DELETE = 'customer:delete',

  // Conversation Permissions
  CONVERSATION_CREATE = 'conversation:create',
  CONVERSATION_READ = 'conversation:read',
  CONVERSATION_REPLY = 'conversation:reply',
  CONVERSATION_DELETE = 'conversation:delete',

  // Deal / Pipeline Permissions
  DEAL_CREATE = 'deal:create',
  DEAL_READ = 'deal:read',
  DEAL_UPDATE = 'deal:update',
  DEAL_DELETE = 'deal:delete',

  // Ticket & SLA Permissions
  TICKET_CREATE = 'ticket:create',
  TICKET_READ = 'ticket:read',
  TICKET_UPDATE = 'ticket:update',
  TICKET_DELETE = 'ticket:delete',
  SLA_MANAGE = 'sla:manage',

  // Billing & Subscriptions
  BILLING_READ = 'billing:read',
  BILLING_MANAGE = 'billing:manage',

  // AI & Workflow Engine
  AI_MANAGE = 'ai:manage',
  WORKFLOW_MANAGE = 'workflow:manage',

  // Audit & Security Logs
  AUDIT_READ = 'audit:read',
}

export enum MemberStatus {
  INVITED = 'INVITED',
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
}

export enum ConversationType {
  DIRECT = 'DIRECT',
  GROUP = 'GROUP',
  CUSTOMER_SUPPORT = 'CUSTOMER_SUPPORT',
}

export enum MessageType {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
  FILE = 'FILE',
  SYSTEM = 'SYSTEM',
  AUDIO = 'AUDIO',
}

export enum NotificationType {
  MENTION = 'MENTION',
  NEW_MESSAGE = 'NEW_MESSAGE',
  ASSIGNMENT = 'ASSIGNMENT',
  SYSTEM = 'SYSTEM',
  SLA_BREACH = 'SLA_BREACH',
}

export enum PresenceStatus {
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
  AWAY = 'AWAY',
}

export enum MessageReceiptStatus {
  DELIVERED = 'DELIVERED',
  READ = 'READ',
}

export enum LeadStatus {
  NEW = 'NEW',
  CONTACTED = 'CONTACTED',
  QUALIFIED = 'QUALIFIED',
  UNQUALIFIED = 'UNQUALIFIED',
  CONVERTED = 'CONVERTED',
}

export enum LeadSource {
  WEBSITE = 'WEBSITE',
  REFERRAL = 'REFERRAL',
  CHAT = 'CHAT',
  COLD_OUTREACH = 'COLD_OUTREACH',
  SOCIAL = 'SOCIAL',
  OTHER = 'OTHER',
}

export enum DealStatus {
  OPEN = 'OPEN',
  WON = 'WON',
  LOST = 'LOST',
}

export enum ActivityType {
  CALL = 'CALL',
  MEETING = 'MEETING',
  EMAIL = 'EMAIL',
  NOTE = 'NOTE',
  TASK = 'TASK',
}

export enum TaskStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export enum TicketPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  URGENT = 'URGENT',
}

export enum TicketStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  RESOLVED = 'RESOLVED',
  CLOSED = 'CLOSED',
}

export enum SlaBreachType {
  FIRST_RESPONSE = 'FIRST_RESPONSE',
  NEXT_RESPONSE = 'NEXT_RESPONSE',
  RESOLUTION = 'RESOLUTION',
}

export enum QueueRoutingStrategy {
  ROUND_ROBIN = 'ROUND_ROBIN',
  LOAD_BALANCED = 'LOAD_BALANCED',
  SKILL_BASED = 'SKILL_BASED',
}

export enum SubscriptionBillingCycle {
  MONTHLY = 'MONTHLY',
  YEARLY = 'YEARLY',
}

export enum SubscriptionStatus {
  ACTIVE = 'ACTIVE',
  PAST_DUE = 'PAST_DUE',
  CANCELED = 'CANCELED',
  TRIALING = 'TRIALING',
}

export enum WorkflowTriggerType {
  LEAD_CREATED = 'LEAD_CREATED',
  DEAL_STAGE_CHANGED = 'DEAL_STAGE_CHANGED',
  TICKET_CREATED = 'TICKET_CREATED',
  MESSAGE_RECEIVED = 'MESSAGE_RECEIVED',
  SLA_BREACHED = 'SLA_BREACHED',
  CSAT_SUBMITTED = 'CSAT_SUBMITTED',
}

export enum WorkflowActionType {
  SEND_NOTIFICATION = 'SEND_NOTIFICATION',
  ASSIGN_USER = 'ASSIGN_USER',
  CREATE_TASK = 'CREATE_TASK',
  UPDATE_STATUS = 'UPDATE_STATUS',
  TRIGGER_WEBHOOK = 'TRIGGER_WEBHOOK',
  SEND_EMAIL_TEMPLATE = 'SEND_EMAIL_TEMPLATE',
}

export enum CustomFieldDataType {
  STRING = 'STRING',
  NUMBER = 'NUMBER',
  BOOLEAN = 'BOOLEAN',
  DATE = 'DATE',
  SELECT = 'SELECT',
}

export enum AuditAction {
  USER_REGISTERED = 'USER_REGISTERED',
  USER_LOGGED_IN = 'USER_LOGGED_IN',
  USER_LOGGED_OUT = 'USER_LOGGED_OUT',
  PASSWORD_CHANGED = 'PASSWORD_CHANGED',
  PASSWORD_RESET_REQUESTED = 'PASSWORD_RESET_REQUESTED',
  ORG_CREATED = 'ORG_CREATED',
  ORG_UPDATED = 'ORG_UPDATED',
  MEMBER_INVITED = 'MEMBER_INVITED',
  MEMBER_ROLE_UPDATED = 'MEMBER_ROLE_UPDATED',
  MEMBER_REMOVED = 'MEMBER_REMOVED',
  TEAM_CREATED = 'TEAM_CREATED',
  TEAM_UPDATED = 'TEAM_UPDATED',
  CONVERSATION_CREATED = 'CONVERSATION_CREATED',
  MESSAGE_SENT = 'MESSAGE_SENT',
  CONTACT_CREATED = 'CONTACT_CREATED',
  LEAD_CREATED = 'LEAD_CREATED',
  LEAD_CONVERTED = 'LEAD_CONVERTED',
  DEAL_CREATED = 'DEAL_CREATED',
  DEAL_STAGE_UPDATED = 'DEAL_STAGE_UPDATED',
  TASK_CREATED = 'TASK_CREATED',
  TASK_COMPLETED = 'TASK_COMPLETED',
  DOCUMENT_UPLOADED = 'DOCUMENT_UPLOADED',
  TICKET_CREATED = 'TICKET_CREATED',
  TICKET_RESOLVED = 'TICKET_RESOLVED',
  SLA_POLICY_CREATED = 'SLA_POLICY_CREATED',
  SLA_BREACH_LOGGED = 'SLA_BREACH_LOGGED',
  BILLING_SUBSCRIPTION_UPDATED = 'BILLING_SUBSCRIPTION_UPDATED',
  ARTICLE_PUBLISHED = 'ARTICLE_PUBLISHED',
  WORKFLOW_CREATED = 'WORKFLOW_CREATED',
  WORKFLOW_EXECUTED = 'WORKFLOW_EXECUTED',
  API_KEY_GENERATED = 'API_KEY_GENERATED',
  WEBHOOK_CREATED = 'WEBHOOK_CREATED',
}
