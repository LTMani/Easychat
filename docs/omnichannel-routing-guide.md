# EasyChat CRM — Omnichannel Architecture & Routing Engine Guide

## 1. Architectural Philosophy

Modern enterprise customer communication is highly fragmented across disparate channels. EasyChat normalizes all inbound and outbound interactions into a unified abstraction model:

```
Provider Ingest → Channel Adapter → Normalized Message → Routing Engine → Agent Workspace / AI Copilot
```

---

## 2. Channel Adapters Reference

### 2.1 WhatsApp Cloud API (Meta)
- **Ingestion**: Webhook listener receiving payload events (`messages`, `message_deliveries`, `message_reads`).
- **Media Support**: Images, audio voice notes, PDFs, location coordinates.
- **Templates**: Broadcast marketing requires Meta-approved template structures with parameter binding (`{{1}}`, `{{2}}`).

### 2.2 Inbound/Outbound Email (SMTP / IMAP / Webhooks)
- **Threading Engine**: Header parsing (`In-Reply-To`, `References`, `Message-ID`) to reconstruct conversational threads.
- **DKIM & SPF Verification**: Validation of incoming email authenticity before attachment extraction.
- **HTML Sanitization**: DOMPurify-grade cleaning to prevent malicious script execution in agent workspace.

### 2.3 Live Chat Widget (WebSocket Real-time)
- **Transport**: Persistent WebSocket connection with fallback to HTTP long-polling.
- **Presence Tracking**: Heartbeat protocol detecting visitor navigation, idle state, and active page URL.
- **Proactive Triggers**: Automated greeting popups triggered by time-on-page or cart value.

### 2.4 Voice & Telephony (Twilio / IVR)
- **TwiML Generation**: Dynamic XML response generation for IVR menu trees (`<Gather>`, `<Say>`, `<Dial>`, `<Record>`).
- **Call Session Recording**: Webhook capture of call duration, recording URLs, and speech-to-text transcriptions.

---

## 3. Intelligent Chat Routing Engine

When an inbound conversation arrives, the **Chat Routing Engine** executes a multi-stage evaluation pipeline:

### 3.1 Step 1: Customer Identification & Contact Linking
1. Lookup existing contact by E.164 phone number, email address, or social handle.
2. If no record exists, dynamically create a new contact with automatic IP/country geo-enrichment.

### 3.2 Step 2: Skill-Based Rule Matching
The engine matches conversation attributes against prioritized organization routing rules:
- **Language Matching**: Routes French inquiries to bilingual agents.
- **Channel Rules**: Routes WhatsApp VIP messages to dedicated mobile specialists.
- **Customer Tier**: Routes Enterprise accounts (LTV > $50,000) directly to assigned Customer Success Managers.

### 3.3 Step 3: Workload & Capacity Balancing
If multiple qualified agents are available, the engine applies the **Least-Busy Utilization Ratio**:

$$\text{Utilization} = \frac{\text{Active Concurrent Chats}}{\text{Max Allowed Chats}}$$

The agent with the lowest utilization percentage is selected. Ties are broken using a round-robin schedule based on the timestamp of last assigned conversation.

---

## 4. AI Copilot Real-Time Assistance

During an active conversation, background workers analyze inbound messages to assist human agents:
- **Sentiment & Urgency Scoring**: Lexical and LLM evaluation tagging messages with `POSITIVE`, `NEUTRAL`, `NEGATIVE`, or `URGENT`.
- **Entity Extraction**: Automatically extracts email addresses, phone numbers, dollar amounts, and meeting dates.
- **Smart Knowledge Base Suggestions (RAG)**: Generates 1-click answer snippets grounded in indexed help articles.
- **Auto-drafted CSAT Surveys**: Sends automated satisfaction rating requests upon conversation resolution.
