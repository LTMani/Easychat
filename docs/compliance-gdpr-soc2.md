# EasyChat CRM — GDPR, Privacy & SOC 2 Compliance Guide

## 1. Regulatory Framework Overview

EasyChat provides enterprise compliance tooling out of the box, aligning with major data privacy and security frameworks:
- **General Data Protection Regulation (GDPR)** — Regulation (EU) 2016/679
- **California Consumer Privacy Act (CCPA / CPRA)**
- **SOC 2 Type II Compliance** (Security, Availability, Confidentiality)
- **Health Insurance Portability and Accountability Act (HIPAA)** readiness controls

---

## 2. GDPR Data Subject Rights Implementation

### 2.1 Article 17 — Right to Erasure ("Right to be Forgotten")

When a customer submits a valid erasure request, EasyChat's automated GDPR worker processes a cascading anonymization:

1. **Contact Profile**:
   - `firstName` → `GDPR`
   - `lastName` → `Erased`
   - `email` → `erased_<id>@gdpr-erased.invalid`
   - `phone`, `avatarUrl`, custom PII fields → `NULL`
   - `tags` → Appends `erased,gdpr`
   - `unsubscribed` → Set to `TRUE`

2. **Activity Timeline**:
   - Redacts all internal notes and meeting summaries containing PII.

3. **Support Tickets**:
   - Redacts customer names and personal identifiers in ticket subjects and descriptions.

4. **Audit Certificate Generation**:
   - Produces a tamper-evident digital receipt (`cert_...`) confirming the date, time, actor, and affected record count without storing any residual PII.

### 2.2 Article 20 — Right to Data Portability

Data subjects can request a complete export of their personal data. The system generates a structured, machine-readable JSON archive containing:
- Contact Profile attributes
- Conversational message transcripts
- Support ticket interaction history
- Associated deals and quote history

---

## 3. Data Retention & Lifecycle Policies

Organizations can configure automated data retention rules based on legal requirements:

| Data Category | Default Retention | Action upon Expiry |
|---|---|---|
| Security Audit Logs | 365 Days | Compressed Cold Archive (WORM Storage) |
| Resolved Chat Transcripts | 730 Days | PII Anonymization |
| Inactive Lead Profiles | 180 Days | Soft Deletion |
| Raw Webhook Delivery Logs | 30 Days | Purge |

---

## 4. SOC 2 Type II Security Controls

- **Access Reviews**: Quarterly automated user privilege audits.
- **Change Management**: All production code deploys require peer review, automated CI test validation, and signed Git commits.
- **Vulnerability Scanning**: Continuous automated dependency auditing (`npm audit`, Trivy container scans).
- **Incident Response Testing**: Semi-annual simulated tabletop exercises testing breach notification and recovery protocols.
