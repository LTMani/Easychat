# EasyChat CRM — High-Level Architecture Overview

## Overview

EasyChat CRM is a conversation-first Customer Relationship Management platform.
Its core architecture philosophy is **Conversation ® Context ® Action**.

## Architecture Pattern

EasyChat CRM starts as a **Modular Monolith** in TypeScript / Node.js.
Modular monolith design ensures low operational overhead and fast velocity while maintaining strict domain boundary isolation.

```
                  ┌────────────────────────┐
                  │ Next.js Web App        │
                  │ (apps/web)             │
                  └───────────┬────────────┘
                              │ HTTP / REST
                  ┌───────────▼────────────┐
                  │ NestJS API Gateway     │
                  │ (services/api)         │
                  └───────────┬────────────┘
                              │
          ┌───────────────────┼───────────────────┐
          │                   │                   │
  ┌───────▼──────┐    ┌───────▼──────┐    ┌───────▼──────┐
  │ Auth Module  │    │  Org Module  │    │ Shared DB    │
  │ (@easychat/  │    │ (services/   │    │ (@easychat/  │
  │ auth)        │    │ api/orgs)    │    │ database)    │
  └──────────────┘    └──────────────┘    └───────┬──────┘
                                                  │
                                          ┌───────▼──────┐
                                          │ PostgreSQL   │
                                          │ & Redis      │
                                          └──────────────┘
```

## Recommended Repository Layout

- `apps/`: Web frontend (`apps/web`) and admin apps.
- `services/`: Backend services (`services/api`, future `realtime`, `notification`, `automation`, `analytics`).
- `packages/`: Shared libraries (`packages/shared`, `packages/database`, `packages/auth`, `packages/permissions`).
- `infrastructure/`: Containerization (`docker-compose.yml`), proxy, and deployment configs.
- `docs/`: System documentation, architecture decision records (ADRs), API specs, security matrix.
