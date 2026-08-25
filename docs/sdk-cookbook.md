# EasyChat CRM — TypeScript SDK Cookbook & Code Recipes

## 1. Installation & Initialization

```bash
npm install @easychat/sdk
```

### Initializing with API Key
```typescript
import { EasyChatClient } from '@easychat/sdk';

const client = new EasyChatClient({
  apiKey: process.env.EASYCHAT_API_KEY,
  timeout: 15000,
  retries: 3,
});
```

---

## 2. Practical Code Recipes

### Recipe 1: Fetching High-Value Prospects with Pagination
```typescript
async function fetchHighValueProspects() {
  let page = 1;
  const highValueContacts = [];

  while (true) {
    const response = await client.contacts.list({
      page,
      limit: 50,
      leadScoreMin: 75,
      country: 'US',
    });

    highValueContacts.push(...response.data);

    if (!response.meta.hasNext) break;
    page++;
  }

  console.log(`Retrieved ${highValueContacts.length} high-value prospects.`);
  return highValueContacts;
}
```

### Recipe 2: Creating a Deal and Logging Initial Activity
```typescript
async function createOpportunity(contactId: string, title: string, amount: number) {
  // 1. Create the deal in Proposal stage
  const deal = await client.deals.create({
    title,
    pipelineId: 'pipe_enterprise',
    stageId: 'stage_proposal',
    value: amount,
    currency: 'USD',
    contactId,
    probability: 60,
  });

  // 2. Send follow-up email via conversation
  await client.conversations.sendMessage(contactId, {
    content: `Hi there! I've prepared our proposal for ${title} ($${amount.toLocaleString()}). Looking forward to discussing!`,
    channel: 'EMAIL',
  });

  return deal;
}
```

### Recipe 3: Webhook HMAC Signature Verification
```typescript
import * as crypto from 'crypto';

export function verifyEasyChatWebhook(
  rawPayload: string,
  signatureHeader: string,
  secret: string,
): boolean {
  const expectedSignature = `sha256=${crypto
    .createHmac('sha256', secret)
    .update(rawPayload)
    .digest('hex')}`;

  return crypto.timingSafeEqual(
    Buffer.from(signatureHeader),
    Buffer.from(expectedSignature),
  );
}
```

### Recipe 4: Triggering Right-to-Erasure (GDPR)
```typescript
async function processGdprDeletion(contactId: string) {
  const contact = await client.contacts.get(contactId);
  console.log(`Initiating erasure for ${contact.firstName} ${contact.lastName}`);

  await client.contacts.delete(contactId);
  console.log('Contact record queued for Article 17 cascading erasure.');
}
```

### Recipe 5: Running a BI Pivot Aggregation Query
```typescript
async function getRegionalRevenueReport() {
  const report = await client.reports.pivot({
    entity: 'deal',
    groupBy: 'country',
    metric: 'sum',
    from: '2026-01-01T00:00:00Z',
    to: '2026-12-31T23:59:59Z',
  });

  console.log('Regional Revenue Summary:', report);
  return report;
}
```
