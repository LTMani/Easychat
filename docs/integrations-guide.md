# EasyChat CRM — Third-Party Integrations Guide

## Overview

EasyChat integrates seamlessly with leading cloud platforms to automate enterprise workflows, bidirectional CRM synchronization, communication channels, and payment processing.

---

## 1. Salesforce Lightning Integration

### 1.1 Synchronization Topology
- **Contacts & Leads**: Bidirectional sync matching on primary email address. Changes in either EasyChat or Salesforce reflect in under 5 seconds.
- **Opportunities & Deals**: Maps EasyChat pipeline stages to Salesforce Opportunity stages. Value, currency, and expected close dates are maintained in sync.
- **Account Aggregation**: Companies created in EasyChat automatically link to Salesforce Parent Accounts.

### 1.2 Setup Instructions
1. Navigate to **Integrations → Salesforce** in your EasyChat Dashboard.
2. Click **Connect to Salesforce** to initiate OAuth 2.0 Web Server flow.
3. Grant permissions for `api`, `refresh_token`, and `offline_access`.
4. Configure field mapping rules in the mapping matrix tab.
5. Trigger initial reconciliation sync.

---

## 2. HubSpot CRM Integration

### 2.1 Supported Entities
- Contacts (`contacts`)
- Companies (`companies`)
- Deals & Pipelines (`deals`)
- Service Tickets (`tickets`)

### 2.2 Conflict Resolution Policies
- **Most Recent Edit Wins (Default)**: Compares record updated timestamps; the newest revision overwrites older state.
- **EasyChat Master**: Prevents external modifications from altering customer profile data.
- **HubSpot Master**: EasyChat operates in read-only mirror mode for contact records.

---

## 3. Zapier App Connector

EasyChat provides an official Zapier connector supporting triggers and actions:

### Triggers (Instant Webhooks)
- `Contact Created` / `Contact Updated`
- `Deal Won` / `Deal Stage Changed`
- `Ticket Created` / `SLA Breached`
- `Conversation Started` / `Message Received`

### Actions
- `Create or Update Contact`
- `Create Deal in Pipeline`
- `Send Omnichannel Message`
- `Create Support Ticket`

---

## 4. Slack Workspace Notifications

Receive real-time Slack notifications across dedicated channels:
- `#sales-wins`: Interactive Block Kit cards announcing closed-won deals with revenue numbers.
- `#support-alerts`: High-priority SLA breach alerts with 1-click links to ticket resolution.
- `#leads-inbound`: Instant alerts when AI scores an incoming lead above 80 points.

### Interactive Slash Commands
- `/easychat contact <email>`: Look up customer profile, open deals, and recent tickets directly within Slack.
- `/easychat deal create <name> <value>`: Quickly log a sales opportunity from a Slack conversation.

---

## 5. Stripe Billing & Usage Metering

- Synchronizes customer subscription status, active seats, and invoice payment states.
- Automatically updates Contact lifetime value (`lifetimeValue`) when invoices are paid.
- Handles Stripe webhooks: `invoice.payment_succeeded`, `customer.subscription.updated`, `customer.subscription.deleted`.
