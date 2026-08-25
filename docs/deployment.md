# EasyChat CRM — Deployment & Infrastructure Guide

## Overview

This guide covers deploying EasyChat in production environments including Docker Compose,
Kubernetes (GKE / EKS), and bare-metal server setups with PostgreSQL, Redis, and S3-compatible storage.

---

## Prerequisites

- Node.js 20.x LTS
- npm 10.x
- Docker 24.x
- PostgreSQL 15+
- Redis 7.x
- S3-compatible storage (AWS S3, Google Cloud Storage, MinIO)

---

## Environment Variables

### API Service (`services/api/.env`)

```env
DATABASE_URL="postgresql://easychat:secret@db:5432/easychat_production"
REDIS_URL="redis://redis:6379"

# JWT Authentication
JWT_SECRET="your-256-bit-secret-key-here"
JWT_EXPIRES_IN="1h"
JWT_REFRESH_EXPIRES_IN="30d"

# AI Services
OPENAI_API_KEY="sk-your-openai-key"
ANTHROPIC_API_KEY="sk-ant-your-key"
GOOGLE_AI_API_KEY="your-google-ai-key"

# Email (SMTP)
SMTP_HOST="smtp.sendgrid.net"
SMTP_PORT=587
SMTP_USER="apikey"
SMTP_PASS="your-sendgrid-api-key"
SMTP_FROM_ADDRESS="noreply@easychat.io"

# WhatsApp Cloud API
WHATSAPP_TOKEN="your-meta-access-token"
WHATSAPP_PHONE_ID="your-phone-number-id"
WHATSAPP_VERIFY_TOKEN="your-webhook-verify-token"

# Twilio (Telephony)
TWILIO_ACCOUNT_SID="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
TWILIO_AUTH_TOKEN="your-twilio-auth-token"
TWILIO_PHONE_NUMBER="+15550001234"

# Storage
S3_BUCKET="easychat-uploads-production"
S3_REGION="us-east-1"
S3_ACCESS_KEY="AKIAIOSFODNN7EXAMPLE"
S3_SECRET_KEY="wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
S3_ENDPOINT="https://s3.amazonaws.com"

# Salesforce
SALESFORCE_CLIENT_ID="your-sf-client-id"
SALESFORCE_CLIENT_SECRET="your-sf-client-secret"
SALESFORCE_REFRESH_TOKEN="your-sf-refresh-token"

# HubSpot
HUBSPOT_API_KEY="your-hubspot-key"

# Stripe (Billing)
STRIPE_SECRET_KEY="sk_live_your-stripe-key"
STRIPE_WEBHOOK_SECRET="whsec_your-webhook-secret"

# Application
NODE_ENV="production"
PORT=3000
CORS_ORIGINS="https://app.easychat.io"
```

### Web App (`apps/web/.env.local`)

```env
NEXT_PUBLIC_API_URL="https://api.easychat.io"
NEXTAUTH_URL="https://app.easychat.io"
NEXTAUTH_SECRET="your-nextauth-secret"
NEXT_PUBLIC_POSTHOG_KEY="phc_your-key"
```

---

## Docker Compose (Development)

```yaml
version: '3.9'

services:
  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: easychat_dev
      POSTGRES_USER: easychat
      POSTGRES_PASSWORD: secret
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  redis:
    image: redis:7-alpine
    command: redis-server --appendonly yes
    volumes:
      - redis_data:/data
    ports:
      - "6379:6379"

  api:
    build:
      context: .
      dockerfile: services/api/Dockerfile
    environment:
      DATABASE_URL: "postgresql://easychat:secret@db:5432/easychat_dev"
      REDIS_URL: "redis://redis:6379"
      NODE_ENV: development
    ports:
      - "3000:3000"
    depends_on:
      - db
      - redis
    volumes:
      - ./services/api:/app/services/api
      - /app/node_modules

  worker:
    build:
      context: .
      dockerfile: services/worker/Dockerfile
    environment:
      DATABASE_URL: "postgresql://easychat:secret@db:5432/easychat_dev"
      REDIS_URL: "redis://redis:6379"
      NODE_ENV: development
    depends_on:
      - db
      - redis

  web:
    build:
      context: .
      dockerfile: apps/web/Dockerfile
    environment:
      NEXT_PUBLIC_API_URL: "http://api:3000"
    ports:
      - "4000:4000"
    depends_on:
      - api

volumes:
  postgres_data:
  redis_data:
```

---

## Kubernetes Deployment

### Namespace & ConfigMap

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: easychat-production
---
apiVersion: v1
kind: ConfigMap
metadata:
  name: easychat-config
  namespace: easychat-production
data:
  NODE_ENV: "production"
  PORT: "3000"
```

### API Deployment

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: easychat-api
  namespace: easychat-production
spec:
  replicas: 3
  selector:
    matchLabels:
      app: easychat-api
  template:
    metadata:
      labels:
        app: easychat-api
    spec:
      containers:
        - name: api
          image: gcr.io/your-project/easychat-api:latest
          ports:
            - containerPort: 3000
          envFrom:
            - secretRef:
                name: easychat-secrets
            - configMapRef:
                name: easychat-config
          resources:
            requests:
              memory: "512Mi"
              cpu: "250m"
            limits:
              memory: "1Gi"
              cpu: "1000m"
          livenessProbe:
            httpGet:
              path: /health
              port: 3000
            initialDelaySeconds: 30
            periodSeconds: 10
          readinessProbe:
            httpGet:
              path: /health
              port: 3000
            initialDelaySeconds: 15
            periodSeconds: 5
---
apiVersion: v1
kind: Service
metadata:
  name: easychat-api-svc
  namespace: easychat-production
spec:
  selector:
    app: easychat-api
  ports:
    - protocol: TCP
      port: 80
      targetPort: 3000
  type: ClusterIP
```

### Horizontal Pod Autoscaler

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: easychat-api-hpa
  namespace: easychat-production
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: easychat-api
  minReplicas: 3
  maxReplicas: 20
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70
    - type: Resource
      resource:
        name: memory
        target:
          type: Utilization
          averageUtilization: 80
```

---

## Database Migration

Before deploying a new version, always run Prisma migrations:

```bash
# In production
npx prisma migrate deploy --schema=packages/database/prisma/schema.prisma

# Generate Prisma client
npx prisma generate --schema=packages/database/prisma/schema.prisma
```

### Migration Safety Checklist

- [ ] Run `prisma migrate diff` to review changes before deployment
- [ ] Back up the database before any destructive migration
- [ ] Test migrations against a staging environment copy first
- [ ] Monitor active connections during migration
- [ ] Have a rollback plan ready if migration fails

---

## CI/CD Pipeline

EasyChat uses GitHub Actions for continuous integration and deployment.

### Pull Request Checks

Every PR triggers:
1. **Type checking**: `tsc --noEmit` across all workspaces
2. **Linting**: ESLint with strict rules
3. **Unit tests**: All `*.spec.ts` files via Jest
4. **Build verification**: `next build` for web, `tsc` for API and worker

### Production Deployment

On push to `main`:
1. Build Docker images for `api`, `worker`, and `web`
2. Push images to container registry (GCR / ECR)
3. Run `prisma migrate deploy` on production database
4. Rolling update Kubernetes deployments
5. Smoke test health endpoints
6. Notify Slack on success or failure

---

## Monitoring & Observability

### Prometheus Metrics

The API service exposes Prometheus metrics at `/metrics`:
- `http_request_duration_seconds` — request latency histogram
- `http_requests_total` — request count by route and status code
- `active_conversations_total` — real-time open conversation count
- `queue_jobs_pending` — BullMQ pending job count per queue
- `database_query_duration_seconds` — Prisma query latency

### Alerting Rules

```yaml
- alert: HighErrorRate
  expr: rate(http_requests_total{status=~"5.."}[5m]) > 0.05
  for: 2m
  labels:
    severity: critical
  annotations:
    summary: "API error rate above 5%"

- alert: SlowDatabase
  expr: histogram_quantile(0.95, database_query_duration_seconds_bucket) > 2
  for: 5m
  labels:
    severity: warning
  annotations:
    summary: "95th percentile DB query time above 2 seconds"
```

---

## Backup & Disaster Recovery

### Daily Database Backup

```bash
#!/bin/bash
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
pg_dump $DATABASE_URL | gzip > /backups/easychat_${TIMESTAMP}.sql.gz
aws s3 cp /backups/easychat_${TIMESTAMP}.sql.gz s3://easychat-backups/postgresql/
find /backups -name "*.gz" -mtime +7 -delete
```

### Recovery Time Objectives

| Scenario | RTO | RPO |
|----------|-----|-----|
| Single pod failure | < 30s (K8s auto-restart) | 0 |
| Node failure | < 2m (HPA reschedule) | 0 |
| Database failure | < 15m (replica failover) | < 1min |
| Full datacenter failure | < 4h (multi-region failover) | < 15min |

---

## Security Hardening

1. **Secrets Management**: Use Kubernetes Secrets or Vault — never store secrets in environment files committed to git
2. **Network Policies**: Restrict pod-to-pod communication using Kubernetes NetworkPolicy
3. **TLS Termination**: Terminate TLS at the ingress controller (Nginx or Traefik)
4. **IP Allowlisting**: Configure organization-level IP allowlists via the EasyChat dashboard
5. **Rate Limiting**: Global API rate limiting enforced at the nginx ingress layer
6. **CORS**: Configure `CORS_ORIGINS` to only allow your trusted frontend domains
7. **Audit Logging**: All administrative actions are immutably logged in `AuditLog`
8. **GDPR Compliance**: Use the built-in GDPR erasure endpoint for data deletion requests
