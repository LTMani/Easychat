# EasyChat CRM — User Guide

## Table of Contents
1. [Getting Started](#getting-started)
2. [Contacts](#contacts)
3. [Deals & Pipelines](#deals--pipelines)
4. [Support Tickets](#support-tickets)
5. [Conversations & Inbox](#conversations--inbox)
6. [Marketing Campaigns](#marketing-campaigns)
7. [Reports & Analytics](#reports--analytics)
8. [Automation Workflows](#automation-workflows)
9. [Knowledge Base](#knowledge-base)
10. [Team Management](#team-management)
11. [Integrations](#integrations)
12. [Settings & Security](#settings--security)

---

## Getting Started

### What is EasyChat CRM?
EasyChat is an enterprise omnichannel CRM platform that unifies customer communications from email, WhatsApp, live chat, phone, and social media into a single intelligent workspace. It combines contact management, deal tracking, support ticketing, and AI-powered automation.

### First Login
1. Accept your invitation email and click the **Join Team** button
2. Set your password (minimum 12 characters, at least one symbol)
3. Enable two-factor authentication (required for enterprise plans)
4. Complete your profile: name, avatar, role, and working timezone

### Navigation
The sidebar is organized into these main sections:
- **Conversations** — Unified inbox for all channels
- **CRM** — Contacts, deals, leads, and activities
- **Support** — Tickets, SLA policies, escalations
- **Marketing** — Campaigns, segments, A/B tests
- **Analytics** — Reports, dashboards, forecasts
- **Settings** — Organization, team, integrations, security

---

## Contacts

### Creating a Contact
1. Navigate to **CRM → Contacts**
2. Click **+ New Contact**
3. Fill in the required fields:
   - **First Name** (required)
   - Email, phone, company name (optional)
4. Assign tags, country, and source
5. Click **Save Contact**

### Importing Contacts via CSV
1. Go to **CRM → Contacts → Import**
2. Download the CSV template
3. Fill in your data with columns: First Name, Last Name, Email, Phone, Country, Company, Tags
4. Upload the CSV file
5. Map CSV columns to CRM fields
6. Review the preview and click **Start Import**
7. A background job processes rows and reports results

### Contact Lead Score
EasyChat automatically scores contacts (0–100) based on:
- Email engagement history
- Open deals and their value
- Support ticket history
- Website visit frequency (if analytics integrated)
- Social media engagement

A score of 70+ indicates a high-potential lead ready for outreach.

### Merging Duplicate Contacts
1. Open either of the duplicate contacts
2. Click **Actions → Find Duplicates**
3. Review the matched records
4. Click **Merge** and select the primary record to retain
5. All activities, deals, and tickets transfer to the primary record

---

## Deals & Pipelines

### Understanding Pipelines
A **Pipeline** represents your sales process as a sequence of stages.
EasyChat comes with a default pipeline: **Prospecting → Qualification → Proposal → Negotiation → Closed Won/Lost**

You can create multiple pipelines for different product lines or regions.

### Moving a Deal Through Stages
1. Open the deal from the **CRM → Deals → Kanban** view
2. Drag the deal card to the new stage column, OR
3. Open the deal and click **Move to Stage**
4. Each move is recorded in the activity timeline

### Deal Probability
Each stage has a default win probability (0–100%). When you move a deal to a stage, the probability updates automatically. You can override this manually.

**Weighted pipeline value** = Sum of (Deal Value × Stage Probability) across all open deals

### Winning and Losing Deals
- **Mark Won**: Opens a confirmation modal, sets status to WON, records the closed date
- **Mark Lost**: Prompts for a loss reason, sets status to LOST for reporting

---

## Support Tickets

### Ticket Lifecycle
```
Created → Open → In Progress → Waiting (for customer) → Resolved → Closed
```

### SLA Policies
EasyChat monitors two SLA metrics per ticket:
1. **First Response Time**: Time from ticket creation to first agent reply
2. **Resolution Time**: Time from creation to resolved status

When a ticket is created, the matching SLA policy is applied based on the ticket's priority and channel.

**SLA breach alerts** are sent via:
- In-app notification to the assigned agent and their manager
- Email notification if configured
- WhatsApp alert if telephony integration is active

### Ticket Assignment
Tickets are assigned automatically via:
1. **Round-robin**: Rotates across all available agents in the inbox
2. **Least-loaded**: Assigns to the agent with the fewest open tickets
3. **Keyword routing**: Routes based on keywords in the ticket subject
4. **Manual**: Agent or admin assigns directly

---

## Conversations & Inbox

### Channels Supported
| Channel | Inbound | Outbound | Real-time |
|---------|---------|----------|-----------|
| Email | ✅ | ✅ | ❌ |
| WhatsApp Business | ✅ | ✅ | ✅ |
| Live Chat (widget) | ✅ | ✅ | ✅ |
| SMS | ✅ | ✅ | ❌ |
| Instagram DM | ✅ | ✅ | ✅ |
| Facebook Messenger | ✅ | ✅ | ✅ |
| Phone (IVR + Voice) | ✅ | ✅ | ✅ |

### AI Copilot Suggestions
When AI Copilot is enabled (Enterprise plan), the assistant:
- Suggests reply templates based on conversation context
- Detects customer sentiment in real time (Positive/Neutral/Negative/Urgent)
- Extracts entities (emails, phone numbers, dates) from messages
- Recommends knowledge base articles relevant to the conversation
- Auto-drafts CSAT surveys at conversation resolution

---

## Marketing Campaigns

### Creating an Email Campaign
1. Go to **Marketing → Campaigns → New Campaign**
2. Select **Email** as the channel
3. Choose a template or write HTML from scratch
4. Configure the target segment (by country, lead score, tags, LTV)
5. Preview the email and run a test send to yourself
6. Schedule the send or click **Send Now**

### WhatsApp Broadcast Rules
WhatsApp only allows pre-approved message templates for broadcast campaigns.
EasyChat includes a built-in template library. Custom templates must be submitted to Meta for approval before use.

### A/B Testing
1. Go to **Marketing → A/B Tests → New Test**
2. Create 2–4 variants with different subject lines or content
3. Set the traffic split (e.g., 40/40/20)
4. Set the evaluation window (24–48 hours recommended)
5. The winning variant (by click rate) is automatically sent to the remaining audience

---

## Reports & Analytics

### Available Report Types
- **Conversation Summary**: Volume, response time, channel breakdown
- **Ticket SLA Compliance**: Breach rate, resolution time by priority
- **Agent Performance Leaderboard**: CSAT, tickets closed, response time
- **Sales Revenue Forecast**: Weighted pipeline by stage and month
- **Lead Funnel Analysis**: Conversion rates across lead → contact → deal
- **Campaign Performance**: Delivery, open, click, bounce, and unsubscribe rates
- **Geographic Distribution**: Contact and revenue by country and region
- **CSAT & NPS Trends**: Satisfaction scores over time by team and channel

### Exporting Reports
All reports can be exported as CSV, PDF, or Excel.
1. Open any report
2. Click the **Export** button (top right)
3. Select format
4. A background job generates the file and emails you the download link

---

## Automation Workflows

### Workflow Triggers Available
- Contact Created
- Deal Stage Changed
- Ticket Created
- SLA Breached
- Lead Score Updated
- Conversation Started

### Workflow Actions Available
- Send Email (using a template)
- Send WhatsApp Message
- Create Task for an Agent
- Update a Field Value
- Assign to Specific Agent
- Add a Tag to the Entity
- Trigger External Webhook

### Example Workflow: Notify Manager When High-Value Lead Arrives
**Trigger**: Lead Scored  
**Conditions**: score > 80  
**Actions**: Send email to sales manager → Create task "Call lead within 2 hours" → Add tag "hot-lead"

---

## Knowledge Base

### Article Visibility
Articles can be:
- **Internal Only**: Visible only to agents inside EasyChat
- **Public**: Published to the customer-facing help center
- **Draft**: Not yet visible to anyone

### Linking Articles to Tickets
When resolving a ticket, type `/kb` in the reply box to search for relevant articles and attach them to your reply. This is automatically logged in the ticket activity.

---

## Team Management

### Roles & Permissions
| Feature | OWNER | ADMIN | AGENT | VIEWER |
|---------|-------|-------|-------|--------|
| Manage billing | ✅ | ❌ | ❌ | ❌ |
| Invite members | ✅ | ✅ | ❌ | ❌ |
| Configure SSO/SAML | ✅ | ✅ | ❌ | ❌ |
| Access all conversations | ✅ | ✅ | ❌ | ❌ |
| Manage assigned tickets | ✅ | ✅ | ✅ | ❌ |
| View reports | ✅ | ✅ | ✅ | ✅ |

### Inviting a Team Member
1. Go to **Settings → Team → Members**
2. Click **Invite Member**
3. Enter their email and select a role
4. Click **Send Invitation**

The invited user receives an email and must accept within 7 days.

---

## Settings & Security

### IP Allowlist
Restrict API and dashboard access to known IP addresses or CIDR ranges.
1. Go to **Settings → Security → IP Allowlist**
2. Click **+ Add Rule**
3. Enter CIDR (e.g., `192.168.1.0/24`) and a label
4. Enable the rule

> ⚠️ If you lock yourself out, contact your organization Owner or EasyChat support.

### GDPR Data Erasure
For GDPR right-to-erasure requests:
1. Go to **CRM → Contacts** and find the contact
2. Click **Actions → Request Erasure**
3. Confirm the erasure — this anonymizes all PII across contact records, messages, and activities
4. A GDPR erasure log entry is created with your user ID and timestamp

### Two-Factor Authentication
1. Go to **Profile → Security → 2FA**
2. Click **Enable 2FA**
3. Scan the QR code with Google Authenticator or Authy
4. Enter the 6-digit code to confirm
5. Save your backup codes in a secure location
