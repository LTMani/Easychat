# EasyChat CRM — API Reference

## Overview

EasyChat is a modern enterprise CRM platform with omnichannel communication, AI-powered automation,
and a rich developer API. This reference documents all available REST API endpoints.

**Base URL:** `https://api.easychat.io/v1`

**Authentication:** All endpoints require a Bearer token in the `Authorization` header, or an API key
in the `X-API-Key` header.

---

## Authentication

### POST /auth/login
Authenticate with email and password to receive a JWT access token.

**Request Body:**
```json
{
  "email": "admin@example.com",
  "password": "your-secure-password"
}
```

**Response:**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiJ9...",
  "refreshToken": "ech_rt_abc123...",
  "expiresIn": 3600,
  "user": { "id": "user_01", "email": "admin@example.com", "name": "Admin User" }
}
```

### POST /auth/refresh
Exchange a refresh token for a new access token.

**Request Body:**
```json
{ "refreshToken": "ech_rt_abc123..." }
```

### POST /auth/logout
Invalidate the current session token.

---

## Contacts

### GET /contacts
Retrieve a paginated list of contacts in the organization.

**Query Params:**
- `page` (number): Page number, default 1
- `limit` (number): Results per page, default 25, max 100
- `search` (string): Full-text search on name/email
- `country` (string): Filter by ISO country code
- `leadScoreMin` (number): Minimum lead score

**Response:**
```json
{
  "data": [
    { "id": "contact_01", "firstName": "John", "lastName": "Doe", "email": "john@example.com", "phone": "+15551234567", "leadScore": 74, "country": "US" }
  ],
  "meta": { "total": 1842, "page": 1, "limit": 25, "pages": 74 }
}
```

### GET /contacts/:id
Retrieve a single contact with full profile, activities, deals, and tickets.

### POST /contacts
Create a new contact.

**Required Fields:** `firstName`, `email`

**Optional Fields:** `lastName`, `phone`, `country`, `jobTitle`, `organizationName`, `lifetimeValue`, `tags`

### PATCH /contacts/:id
Update specific fields on a contact.

### DELETE /contacts/:id
Permanently delete a contact and all associated data.

---

## Deals

### GET /deals
List all deals across all pipelines. Supports filtering by pipeline, stage, assignee, and close date range.

**Query Params:**
- `pipelineId` (string): Filter by pipeline
- `stageId` (string): Filter by stage
- `assignedToId` (string): Filter by assigned agent
- `status` (string): OPEN | WON | LOST
- `closeDateFrom` (date): ISO 8601 date
- `closeDateTo` (date): ISO 8601 date

### POST /deals
Create a new deal in a pipeline stage.

**Required Fields:** `title`, `pipelineId`, `stageId`, `value`

### PATCH /deals/:id
Update deal value, stage, assignee, or expected close date.

### POST /deals/:id/stage
Move a deal to a different pipeline stage.

### GET /deals/:id/activities
List all activities (calls, emails, notes, meetings) linked to a deal.

---

## Tickets

### GET /tickets
List all support tickets. Filter by status, priority, assignee, and SLA breach status.

**Query Params:**
- `status` (string): OPEN | IN_PROGRESS | WAITING | RESOLVED | CLOSED
- `priority` (string): LOW | MEDIUM | HIGH | URGENT
- `assignedToId` (string): Agent user ID
- `slaBreached` (boolean): Return only SLA-breached tickets

### POST /tickets
Create a new support ticket.

**Required Fields:** `subject`, `priority`

### PATCH /tickets/:id
Update ticket status, priority, or assignment.

### POST /tickets/:id/reply
Add a reply message to a ticket thread.

---

## Conversations

### GET /conversations
List all CRM conversations across all channels.

**Query Params:**
- `channel` (string): EMAIL | WHATSAPP | LIVE_CHAT | PHONE | INSTAGRAM
- `status` (string): OPEN | RESOLVED | ARCHIVED
- `assignedToId` (string): Agent filter

### GET /conversations/:id
Retrieve a conversation with full message thread.

### POST /conversations/:id/messages
Send a message in a conversation.

**Request Body:**
```json
{ "content": "Hello, how can I help you today?", "channel": "WHATSAPP" }
```

### POST /conversations/:id/assign
Assign a conversation to an agent.

### POST /conversations/:id/resolve
Mark a conversation as resolved.

---

## Marketing Campaigns

### GET /marketing/campaigns
List all broadcast campaigns for the organization.

### POST /marketing/campaigns
Create a new email or WhatsApp broadcast campaign.

**Required Fields:** `name`, `content`

**Optional Fields:** `segmentQuery` (JSON criteria for contact targeting)

### POST /marketing/campaigns/:id/send
Trigger the campaign for delivery to all targeted contacts.

### GET /marketing/campaigns/:id/stats
Retrieve delivery, open, click, bounce, and unsubscribe metrics for a campaign.

---

## Leads

### GET /leads
List all leads with scores and pipeline attribution.

### POST /leads
Create a new lead for nurturing.

**Required Fields:** `title`, `email`

### POST /leads/:id/score
Trigger AI-powered lead scoring for a specific lead.

### POST /leads/:id/convert
Convert a qualified lead into a Contact + Deal pair.

---

## Reports & Analytics

### GET /reports/pivot
Run a parameterized BI pivot report.

**Query Params:**
- `entity` (string): contact | deal | ticket | conversation
- `groupBy` (string): country | assignee | stage | status | month
- `metric` (string): count | sum | avg
- `from` (date): Start date
- `to` (date): End date

### GET /reports/agent-performance
Get agent-level CSAT, response time, tickets closed, and NPS aggregations.

### GET /reports/sla-compliance
Get SLA breach rates and average response/resolution time by ticket type.

### GET /reports/revenue-forecast
Get monthly revenue forecast by pipeline stage weighted probability.

---

## System

### GET /health
System health check returning status of all core services.

**Response:**
```json
{
  "overallStatus": "HEALTHY",
  "timestamp": "2026-08-25T09:00:00.000Z",
  "checks": [
    { "service": "DATABASE", "status": "HEALTHY", "latencyMs": 3 },
    { "service": "REDIS", "status": "HEALTHY", "latencyMs": 1 },
    { "service": "EMAIL_SERVICE", "status": "HEALTHY" }
  ]
}
```

---

## Error Codes

| HTTP Code | Code String | Description |
|-----------|-------------|-------------|
| 400 | VALIDATION_ERROR | Request body failed validation |
| 401 | UNAUTHORIZED | Missing or invalid authentication token |
| 403 | FORBIDDEN | Authenticated user lacks permission |
| 404 | NOT_FOUND | Requested resource does not exist |
| 409 | CONFLICT | Resource already exists (e.g., duplicate email) |
| 422 | UNPROCESSABLE | Business logic error (e.g., lead already converted) |
| 429 | RATE_LIMITED | Too many requests — backoff and retry |
| 500 | INTERNAL_ERROR | Unexpected server error |
| 503 | SERVICE_UNAVAILABLE | Downstream service temporarily unavailable |

---

## Rate Limits

All API endpoints are subject to rate limiting:

| Tier | Requests per Minute | Burst |
|------|---------------------|-------|
| Starter | 60 | 10 |
| Pro | 300 | 50 |
| Enterprise | 1000 | 200 |

Rate limit headers are included in all responses:
- `X-RateLimit-Limit`: Total requests allowed in window
- `X-RateLimit-Remaining`: Requests remaining in current window
- `X-RateLimit-Reset`: Unix timestamp when window resets

---

## Pagination

All list endpoints support cursor and offset-based pagination.

**Offset Pagination:**
```
GET /contacts?page=3&limit=50
```

**Response Envelope:**
```json
{
  "data": [...],
  "meta": {
    "total": 4821,
    "page": 3,
    "limit": 50,
    "pages": 97,
    "hasNext": true,
    "hasPrev": true
  }
}
```

---

## Webhooks

Register webhook endpoints to receive real-time event notifications.

### POST /webhooks
Create a new webhook subscription.

```json
{
  "url": "https://your-server.com/webhook",
  "events": ["contact.created", "deal.won", "ticket.sla_breached", "conversation.resolved"]
}
```

### Webhook Payload Format
```json
{
  "event": "deal.won",
  "organizationId": "org_01HXYZ",
  "timestamp": "2026-08-25T10:30:00.000Z",
  "data": {
    "dealId": "deal_01ABC",
    "title": "Enterprise License — Acme Corp",
    "value": 49000,
    "currency": "USD"
  }
}
```

### Available Events
- `contact.created`, `contact.updated`, `contact.deleted`
- `deal.created`, `deal.stage_changed`, `deal.won`, `deal.lost`
- `ticket.created`, `ticket.assigned`, `ticket.resolved`, `ticket.sla_breached`
- `conversation.started`, `conversation.resolved`, `conversation.assigned`
- `lead.created`, `lead.scored`, `lead.converted`
- `campaign.sent`, `campaign.completed`

---

## SDK

EasyChat provides a typed TypeScript SDK for server-side API integration.

```typescript
import { EasyChatClient } from '@easychat/sdk';

const client = new EasyChatClient({ apiKey: process.env.EASYCHAT_API_KEY });

// List contacts
const contacts = await client.contacts.list({ limit: 50, country: 'US' });

// Create a deal
const deal = await client.deals.create({
  title: 'Enterprise Renewal — Acme Corp',
  pipelineId: 'pipe_main',
  stageId: 'stage_proposal',
  value: 50000,
});

// Send a message
await client.conversations.sendMessage(conversationId, {
  content: 'Thanks for reaching out! How can I help?',
});
```
