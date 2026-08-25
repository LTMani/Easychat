# EasyChat CRM - Enterprise Database ERD & Schema Specification

This document provides a detailed technical reference for the EasyChat CRM relational database architecture (managed via Prisma ORM).

## Core Data Domains

### 1. User & Multi-Tenant Organization Domain
- `users`: Core authentication identity records with hashed passwords, 2FA secrets, timezone, and locale.
- `organizations`: Multi-tenant isolation boundary with subscription tier metadata and limits.
- `organization_members`: Junction table mapping users to tenant organizations with assigned SystemRole (`OWNER`, `ADMIN`, `MANAGER`, `SALES_REP`, `SUPPORT_AGENT`, `MEMBER`).
- `teams` & `team_members`: Departmental grouping within organizations for ticket queue assignments and deal pipelines.

### 2. Omnichannel Communication Domain
- `channel_configs`: Credentials and configuration settings for WhatsApp Cloud API, Twilio WebRTC Voice SIP, Telegram, and SMTP/IMAP Email channels.
- `conversations`: Unified thread containing cross-channel activity history.
- `messages`: Individual message entries supporting text, audio, images, files, and reply threading.
- `telephony_trunks` & `voice_call_sessions`: WebRTC SIP trunks and call session duration logs.

### 3. CRM & Customer 360 CDP Domain
- `contacts`: Unified customer profile with lifetime value (LTV), lead score, and tag assignments.
- `companies`: B2B accounts with revenue metrics, domain, and employee count.
- `leads` & `lead_scoring_rules`: Dynamic scoring criteria evaluating incoming leads.
- `pipelines` & `pipeline_stages`: Configurable sales Kanban stages with win probability weighting.
- `deals`, `deal_quotes`, `deal_quote_line_items`: Opportunity tracking and CPQ quote generation.

### 4. Helpdesk, SLA & Ticket Queue Domain
- `sla_policies`: First response and resolution time targets configured by ticket priority (`URGENT`, `HIGH`, `MEDIUM`, `LOW`).
- `sla_breach_logs`: Immutable audit log capturing SLA target breaches.
- `ticket_queues` & `ticket_queue_members`: Round-robin, load-balanced, or skill-based ticket routing queues.
- `tickets` & `ticket_comments`: Support cases with internal notes and SLA target timestamps.
- `csat_surveys` & `csat_responses`: Post-resolution customer satisfaction survey collector.

### 5. Automation, Billing & Security Domain
- `workflow_rules`, `workflow_nodes`, `workflow_edges`: Visual flowchart execution graph structures.
- `subscription_plans`, `subscriptions`, `subscription_invoices`: Stripe subscription state and usage-based metering.
- `audit_logs` & `security_logs`: SOC2 compliant audit stream and authentication security event log.
- `webhook_endpoints` & `webhook_events`: HMAC SHA256 signed event delivery logs.

## Indexing & Performance Design
- All multi-tenant queries enforce `organizationId` index scanning.
- Unique constraints on `[organizationId, userId]`, `[organizationId, shortcut]`, and `[organizationId, entityType, fieldKey]`.
