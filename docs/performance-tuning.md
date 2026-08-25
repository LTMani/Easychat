# EasyChat CRM — High-Performance & Scalability Tuning Guide

## 1. Database Optimization (PostgreSQL)

### 1.1 Connection Pooling with PgBouncer
- Direct connections to PostgreSQL should be restricted. Use transaction-mode connection pooling (PgBouncer or Supabase Supavisor) with:
  - `default_pool_size = 25`
  - `max_client_conn = 1000`
  - `pool_mode = transaction`

### 1.2 Query Optimization Principles
- **Avoid SELECT \***: Always specify explicit `select` fields in Prisma queries to minimize network I/O and serialization overhead.
- **Keyset / Cursor Pagination**: For large dataset traversal (> 10,000 records), prefer cursor-based pagination (`take: 50, cursor: { id: lastSeenId }, skip: 1`) over offset-based pagination (`skip: 5000`).
- **Partial Indexes**: Create conditional indexes for frequently filtered subsets:
  ```sql
  CREATE INDEX idx_open_tickets ON tickets (organization_id, priority) WHERE status != 'CLOSED';
  ```

---

## 2. Redis & In-Memory Caching Strategy

### 2.1 Layered Cache Topology
1. **L1 Local Memory (Node.js)**: 60-second in-memory LRU cache for organization feature flags, IP allowlists, and SLA policy rules.
2. **L2 Redis Shared Cache**: 15-minute cached aggregations for dashboard summary counters, agent performance leaderboards, and revenue forecast snapshots.

### 2.2 Cache Invalidation Patterns
- Event-driven cache invalidation via Redis Pub/Sub when entity updates occur (`contact:updated:org_123`).
- Automatic TTL expiration prevents stale cache drift.

---

## 3. Background Job Queue Tuning (BullMQ)

### 3.1 Concurrency Sizing Guidelines
| Queue Name | Worker Concurrency | Job Nature | Bottleneck |
|---|---|---|---|
| `email-queue` | 15 | I/O-bound (SMTP/API) | Rate limits per provider |
| `webhook-queue` | 25 | I/O-bound (HTTP POST) | Target server response time |
| `sla-timer` | 5 | DB-bound | Index lookups |
| `campaign-broadcast` | 4 | Batch I/O | Provider burst quotas |
| `etl-import` | 2 | CPU/Memory-bound | CSV streaming & validation |
| `vector-embedding` | 8 | API-bound (LLM) | Embedding token limits |

### 3.2 Dead Letter Queues & Exponential Backoff
- Transient network failures retry with exponential backoff (`delay = 2^attempt * 1000ms`).
- Persistent failures after 5 attempts are routed to a Dead Letter Queue (DLQ) for engineering triage.

---

## 4. Frontend Performance (Next.js 14)

- **Server Components by Default**: Zero clientside JavaScript bundle overhead for static views.
- **Dynamic Imports (`next/dynamic`)**: Heavy client dependencies (Rich Text Editors, Chart Canvas libraries) are lazily loaded on user interaction.
- **Optimistic UI Updates**: Kanban deal moves and ticket status transitions update the client state instantly before server confirmation.
