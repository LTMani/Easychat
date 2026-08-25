# EasyChat CRM — Engineering Troubleshooting Runbook

## 1. High-Priority Operational Runbooks

### 1.1 Runbook: PostgreSQL Database Connection Pool Exhaustion
**Symptoms**: HTTP 500 error spikes, `PrismaClientInitializationError: Timed out fetching a connection from the pool`.

**Triage Steps**:
1. Check active database connections via terminal / psql:
   ```sql
   SELECT count(*), state FROM pg_stat_activity GROUP BY state;
   ```
2. Verify PgBouncer connection pool saturation:
   ```bash
   SHOW POOLS;
   SHOW CLIENTS;
   ```
3. Terminate idle-in-transaction connections older than 5 minutes:
   ```sql
   SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE state = 'idle in transaction' AND state_change < current_timestamp - INTERVAL '5 minutes';
   ```
4. Restart application worker pods gracefully with rolling deployment.

---

### 1.2 Runbook: BullMQ Queue Backlog & Job Failure Spikes
**Symptoms**: Delayed webhook delivery, queued outbound emails backing up in Redis.

**Triage Steps**:
1. Check Redis memory usage:
   ```bash
   redis-cli INFO memory
   ```
2. Inspect failed jobs count in the BullMQ queue:
   ```bash
   node -e "const { Queue } = require('bullmq'); const q = new Queue('webhook-queue'); q.getFailedCount().then(console.log);"
   ```
3. Scale up background worker container instances from 2 to 6 replicas.
4. Retry failed jobs from the Dead Letter Queue (DLQ).

---

### 1.3 Runbook: Webhook HMAC Signature Mismatch Alert
**Symptoms**: Downstream customer webhooks failing signature verification.

**Triage Steps**:
1. Verify customer endpoint is computing HMAC over raw UTF-8 request body bytes (not re-serialized JSON).
2. Confirm the signing secret matches the active secret in **Developer → Webhooks**.
3. Verify timestamp clock drift is within the 300-second allowable replay window.

---

### 1.4 Runbook: WhatsApp Cloud API Rate Limit (HTTP 429)
**Symptoms**: Outbound marketing broadcasts paused with error `(#130429) Rate limit hit`.

**Triage Steps**:
1. EasyChat worker automatically backs off and pauses the broadcast queue for 60 seconds.
2. In Meta Business Manager, review WhatsApp Tier Status (Tier 1: 1k/day, Tier 2: 10k/day, Tier 3: 100k/day).
3. If Tier upgrade is pending, contact Meta Business Support to request a messaging limit increase.
