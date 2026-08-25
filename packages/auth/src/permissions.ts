import { SystemRole, Permission } from '@easychat/shared';

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
    Permission.CONVERSATION_CREATE,
    Permission.CONVERSATION_READ,
    Permission.CONVERSATION_REPLY,
    Permission.DEAL_CREATE,
    Permission.DEAL_READ,
    Permission.DEAL_UPDATE,
    Permission.TICKET_CREATE,
    Permission.TICKET_READ,
    Permission.TICKET_UPDATE,
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
