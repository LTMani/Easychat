# EasyChat CRM — Architecture Decision Records (ADR)

## ADR 001 — Monorepo Structure with npm Workspaces

**Status:** Accepted  
**Date:** 2026-01-10

### Context
EasyChat requires multiple deployable services (API, worker, web) and shared packages.
A monorepo approach ensures consistent versioning, shared tooling, and easier cross-package refactoring.

### Decision
Use npm workspaces to manage a monorepo with the following structure:
- `apps/web` — Next.js 14 frontend dashboard
- `services/api` — NestJS REST API
- `services/worker` — BullMQ background job processor
- `packages/database` — Prisma schema + generated client
- `packages/shared` — Zod schemas, TypeScript types, event contracts
- `packages/auth` — JWT helpers and RBAC utilities
- `packages/sdk` — Public TypeScript SDK

### Consequences
✅ Single `npm install` at root manages all dependencies  
✅ TypeScript project references enable incremental builds  
✅ Shared packages avoid code duplication across services  
⚠️ Build order must be respected: `packages/*` → `services/*` → `apps/*`  
⚠️ Turborepo or Nx may be needed at scale for cache-aware builds

---

## ADR 002 — PostgreSQL as Primary Database

**Status:** Accepted  
**Date:** 2026-01-10

### Context
EasyChat stores relational CRM data: contacts, deals, tickets, conversations, messages, organizations.
The data model has many-to-many relationships and requires transactional guarantees.

### Decision
Use PostgreSQL 15+ as the primary database via Prisma ORM.

### Rationale
- ACID transactions for deal state machines and ticket escalation
- Full-text search via `pg_trgm` for contact search
- JSONB columns for flexible custom field storage
- Row-level security possible for multi-tenant isolation
- Excellent Node.js support via Prisma client

### Alternatives Considered
- **MySQL**: Less feature-rich JSON support, no full-text search extensions
- **MongoDB**: Flexible schema but no ACID cross-collection transactions
- **CockroachDB**: Distributed SQL but complex setup for early stage

### Consequences
✅ Strong consistency for financial and CRM data  
✅ Rich query capabilities including window functions and CTEs  
⚠️ Vertical scaling limits — consider read replicas beyond 10k RPS

---

## ADR 003 — BullMQ for Background Job Processing

**Status:** Accepted  
**Date:** 2026-01-15

### Context
Several CRM operations are time-consuming and should not block HTTP responses:
- Sending broadcast campaigns to thousands of contacts
- Webhook delivery with retry logic
- ETL imports processing large CSV files
- AI sentiment scoring for messages
- SLA timer evaluation

### Decision
Use BullMQ backed by Redis for all background job processing.

### Rationale
- Persistent job queues survive service restarts
- Priority queues for urgent jobs (SLA timers vs. analytics)
- Concurrency control per queue
- Retry with exponential backoff built-in
- Job progress tracking and result storage

### Queue Design
| Queue | Concurrency | Priority | Retry |
|-------|-------------|----------|-------|
| `email-queue` | 10 | Normal | 3 |
| `webhook-queue` | 20 | High | 5 |
| `sla-timer` | 5 | Critical | 0 |
| `campaign-broadcast` | 3 | Normal | 2 |
| `etl-import` | 2 | Low | 1 |
| `vector-embedding` | 5 | Low | 3 |
| `report-export` | 2 | Normal | 1 |
| `notification-queue` | 15 | High | 2 |

### Consequences
✅ Decoupled, scalable job processing  
✅ Dead letter queues for failed job investigation  
⚠️ Redis must be highly available — use Redis Sentinel or Redis Cluster  
⚠️ Job idempotency must be handled at the application layer

---

## ADR 004 — Multi-LLM AI Strategy

**Status:** Accepted  
**Date:** 2026-02-01

### Context
EasyChat uses AI for sentiment analysis, lead scoring, conversation routing, knowledge base
search (RAG), and email template generation. Different models have different cost/quality tradeoffs.

### Decision
Implement a model routing strategy:
- **GPT-4o** — complex reasoning, contract analysis, customer segmentation
- **GPT-3.5-turbo** — fast sentiment scoring, routine classification
- **Claude 3.5 Haiku** — large context processing (long email threads)
- **Gemini 1.5 Flash** — batch processing, knowledge base Q&A
- **text-embedding-3-small** — vector embeddings for RAG

### Consequences
✅ Cost optimization by routing to cheapest model that meets quality bar  
✅ Fallback to secondary model if primary is unavailable  
⚠️ Vendor lock-in risk — mitigated by abstraction layer in `ai-orchestrator.service.ts`  
⚠️ Multiple API keys and rate limits to manage

---

## ADR 005 — Feature Flag Strategy

**Status:** Accepted  
**Date:** 2026-02-15

### Context
EasyChat ships features incrementally. Enterprise customers need feature flags to control
which capabilities are available on their plan.

### Decision
Implement feature flags at two levels:
1. **Plan-based flags**: Baked into the subscription plan metadata
2. **Organization overrides**: Allow individual org feature unlocks

Flag categories:
- `ai_copilot` — AI assistant in conversations
- `whatsapp_cloud` — WhatsApp Business API channel
- `saml_sso` — SAML 2.0 / enterprise SSO
- `advanced_automation` — Workflow builder with custom triggers
- `bi_reports` — BI pivot reports and custom dashboards
- `telephony` — VoIP calling and IVR
- `api_access` — REST API and SDK
- `custom_fields` — Dynamic custom field builder
- `cdp_timeline` — Customer data platform timeline view
- `gdpr_tools` — GDPR erasure and data export

### Consequences
✅ Gradual feature rollout without code deploys  
✅ A/B testing foundation for feature experiments  
⚠️ Feature flag checks must not add significant latency — cache flags per org

---

## ADR 006 — GDPR & Data Privacy

**Status:** Accepted  
**Date:** 2026-03-01

### Context
EasyChat stores personal data (name, email, phone) for EU customers, requiring GDPR compliance.

### Decision
- **Right to Erasure (Art. 17)**: `GdprErasureService.eraseContactData()` anonymizes all PII
- **Data Portability (Art. 20)**: Export all contact data as JSON within 30 days
- **Audit Trail**: All data modifications logged in `AuditLog` with actor, timestamp, and IP
- **Data Retention**: Configurable retention policies per entity type
- **Consent Tracking**: Unsubscribe state tracked on `Contact.unsubscribed` field
- **IP Anonymization**: Store only /24 subnet for analytics, never full IP in reporting

### Consequences
✅ Regulatory compliance for EU customers  
✅ Trust signal for enterprise sales  
⚠️ Erasure must cascade across all related records — tested in integration tests

---

## ADR 007 — API Authentication Strategy

**Status:** Accepted  
**Date:** 2026-03-10

### Context
EasyChat needs to support both interactive (browser) and programmatic (server-to-server) API access.

### Decision
Two authentication modes:
1. **JWT Bearer Tokens**: For browser sessions. Short-lived (1h) with refresh token rotation (30d)
2. **API Keys**: For server-to-server. SHA-256 hashed in database, prefix stored for identification

RBAC roles:
- `OWNER`: Full access, billing management, org deletion
- `ADMIN`: Full CRM access, member management
- `AGENT`: Access to assigned conversations, tickets, and deals
- `VIEWER`: Read-only access to reports and contacts

### Consequences
✅ Stateless JWT authentication scales horizontally  
✅ API keys suitable for CI/CD and server integrations  
⚠️ Token refresh race conditions mitigated by short overlap window

---

## ADR 008 — Multi-Channel Architecture

**Status:** Accepted  
**Date:** 2026-04-01

### Context
Enterprise customers communicate with their customers across email, WhatsApp, live chat,
Instagram, Facebook Messenger, and phone. EasyChat needs a unified inbox.

### Decision
Model all communications as `Conversation` + `Message` regardless of channel.
Channel-specific adapters normalize messages before storage:
- `EmailChannelAdapter` — SMTP/IMAP integration
- `WhatsAppCloudApiService` — Meta WhatsApp Cloud API
- `LiveChatChannelAdapter` — WebSocket-based real-time chat
- `TwilioSmsAdapter` — SMS via Twilio
- `TwilioVoiceAdapter` — Voice calls and IVR

Each `Inbox` has a configured channel type. Conversations are associated with an inbox.

### Consequences
✅ Unified conversation view regardless of channel  
✅ Cross-channel analytics in a single query  
⚠️ Channel-specific message types (buttons, carousels) stored in `metadata` JSONB column
