# EasyChat CRM — Security & RBAC Permission Matrix

## Role Overview

- **OWNER**: Full administrative control over organization, billing, team members, roles, and settings.
- **ADMIN**: Organization administration, user management, and configuration.
- **MANAGER**: Team oversight, deal approval, support escalation, and reporting.
- **SALES_REP**: Lead management, deal pipeline execution, customer communication.
- **SUPPORT_AGENT**: Ticket management, customer support conversations, SLA response.
- **MEMBER**: Standard team member access to assigned conversations and contacts.

## Permission Matrix

| Permission | OWNER | ADMIN | MANAGER | SALES_REP | SUPPORT_AGENT | MEMBER |
|---|---|---|---|---|---|---|
| `org:read` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `org:update` | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| `org:manage_members` | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| `org:manage_roles` | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| `team:create` | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| `team:read` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `team:update` | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| `customer:create` | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ |
| `customer:read` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `customer:update` | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ |
| `conversation:create`| ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| `conversation:read`  | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `conversation:reply` | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| `deal:create` | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ |
| `deal:read` | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ |
| `deal:update` | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ |
| `ticket:create` | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ |
| `ticket:read` | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ |
| `ticket:update` | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ |
| `audit:read` | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
