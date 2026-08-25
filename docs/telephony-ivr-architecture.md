# EasyChat CRM — Telephony & Voice IVR Architecture

## 1. Architectural Overview

EasyChat delivers enterprise-grade programmable voice telephony with dual DTMF menu trees, real-time call queue management, dual-channel audio recording, and automated S3 cold-storage archival.

### 1.1 Inbound Voice Call Flow (Twilio Integration)
```
[Customer Phone Call] 
       │
       ▼
[Twilio Voice Gateway] ── (Webhook POST) ──► [EasyChat API: /v1/telephony/ivr/voice-inbound]
                                                    │
                                                    ▼
                                         [IvrFlowBuilderService]
                                                    │
                                                    ▼
[TwiML Response (Text-to-Speech / Gather DTMF)] ◄───┘
```

### 1.2 Interactive Voice Response (IVR) Execution
- **TTS Engine**: Amazon Polly neural voices (`Polly.Joanna` for US English, `Polly.Marlene` for German, `Polly.Celine` for French).
- **DTMF Digit Gathering**: Configurable timeout (default: 10s) with automatic fallback to secondary queues or operators.
- **Skill-Based Routing**: Inbound callers are assigned to appropriate agent groups (`sales_na_tier1`, `support_vip_urgent`) based on menu selections and caller ID recognition.

---

## 2. Call Recording & Audio Archival

### 2.1 Webhook Ingestion & Deduplication
When a voice call concludes, Twilio emits a `RecordingStatusCallback` webhook to `/v1/telephony/recordings/webhook`.

### 2.2 S3 Cold-Storage Archival
1. Format: MP3 / WAV 64kbps dual-channel.
2. Storage Key Pattern: `recordings/{YYYY-MM-DD}/{CustomerPhone}_{CallSid}.mp3`.
3. Encryption: Server-Side Encryption with AWS KMS (SSE-KMS).
4. Lifecycle Rules: Moved to Glacier Flexible Retrieval after 90 days (retained for 7 years for compliance).
