import { SystemRole, Permission } from '@easychat/shared';

export interface UserSecurityContext {
  userId: string;
  organizationId: string;
  role: SystemRole;
  teamIds: string[];
  permissions: Permission[];
}

export interface ResourceAccessRequest {
  resourceType: string;
  resourceOwnerId?: string;
  resourceTeamId?: string;
  organizationId: string;
  action: string;
}

export const ROLE_PERMISSIONS: Record<SystemRole, Permission[]> = {
  [SystemRole.OWNER]: Object.values(Permission),
  [SystemRole.ADMIN]: Object.values(Permission),
  [SystemRole.MANAGER]: [
    Permission.ORG_READ,
    Permission.TEAM_READ,
    Permission.TEAM_UPDATE,
    Permission.CUSTOMER_CREATE,
    Permission.CUSTOMER_READ,
    Permission.CUSTOMER_UPDATE,
    Permission.CUSTOMER_DELETE,
    Permission.CONVERSATION_CREATE,
    Permission.CONVERSATION_READ,
    Permission.CONVERSATION_REPLY,
    Permission.CONVERSATION_DELETE,
    Permission.DEAL_CREATE,
    Permission.DEAL_READ,
    Permission.DEAL_UPDATE,
    Permission.DEAL_DELETE,
    Permission.TICKET_CREATE,
    Permission.TICKET_READ,
    Permission.TICKET_UPDATE,
    Permission.TICKET_DELETE,
    Permission.SLA_MANAGE,
    Permission.BILLING_READ,
    Permission.WORKFLOW_MANAGE,
    Permission.AUDIT_READ,
  ],
  [SystemRole.SALES_REP]: [
    Permission.ORG_READ,
    Permission.TEAM_READ,
    Permission.CUSTOMER_CREATE,
    Permission.CUSTOMER_READ,
    Permission.CUSTOMER_UPDATE,
    Permission.CONVERSATION_CREATE,
    Permission.CONVERSATION_READ,
    Permission.CONVERSATION_REPLY,
    Permission.DEAL_CREATE,
    Permission.DEAL_READ,
    Permission.DEAL_UPDATE,
  ],
  [SystemRole.SUPPORT_AGENT]: [
    Permission.ORG_READ,
    Permission.TEAM_READ,
    Permission.CUSTOMER_READ,
    Permission.CONVERSATION_CREATE,
    Permission.CONVERSATION_READ,
    Permission.CONVERSATION_REPLY,
    Permission.TICKET_CREATE,
    Permission.TICKET_READ,
    Permission.TICKET_UPDATE,
  ],
  [SystemRole.MEMBER]: [
    Permission.ORG_READ,
    Permission.TEAM_READ,
    Permission.CUSTOMER_READ,
    Permission.CONVERSATION_READ,
  ],
};

export function getPermissionsForRole(role: SystemRole): Permission[] {
  return ROLE_PERMISSIONS[role] || [];
}

export function hasPermission(userPermissions: Permission[], requiredPermission: Permission): boolean {
  return userPermissions.includes(requiredPermission);
}

export function evaluateAbacPolicy(
  context: UserSecurityContext,
  request: ResourceAccessRequest
): boolean {
  // Cross-tenant access is strictly denied
  if (context.organizationId !== request.organizationId) {
    return false;
  }

  // Owner and Admin have unrestricted access within the tenant
  if (context.role === SystemRole.OWNER || context.role === SystemRole.ADMIN) {
    return true;
  }

  // Check if resource is assigned to user's team
  if (request.resourceTeamId && context.teamIds.includes(request.resourceTeamId)) {
    return true;
  }

  // Check direct ownership
  if (request.resourceOwnerId && request.resourceOwnerId === context.userId) {
    return true;
  }

  return false;
}
