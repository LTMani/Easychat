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

  // Ticket Permissions
  TICKET_CREATE = 'ticket:create',
  TICKET_READ = 'ticket:read',
  TICKET_UPDATE = 'ticket:update',
  TICKET_DELETE = 'ticket:delete',

  // Audit Logs
  AUDIT_READ = 'audit:read',
}

export enum MemberStatus {
  INVITED = 'INVITED',
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
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
}
