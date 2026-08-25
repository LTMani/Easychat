export interface MockWebhookDeliveryLog {
  deliveryId: string;
  endpointUrl: string;
  event: string;
  attemptNumber: number;
  httpStatusCode: number;
  responseBodySnippet: string;
  durationMs: number;
  status: 'DELIVERED' | 'FAILED' | 'RETRY_SCHEDULED';
  timestamp: string;
}

export const ENTERPRISE_WEBHOOK_DELIVERY_LOGS: MockWebhookDeliveryLog[] = [
  {
    deliveryId: 'dlv_9901',
    endpointUrl: 'https://hooks.zapier.com/hooks/catch/91823/abcde/',
    event: 'lead.created',
    attemptNumber: 1,
    httpStatusCode: 200,
    responseBodySnippet: '{"status":"success"}',
    durationMs: 142,
    status: 'DELIVERED',
    timestamp: '2026-08-25T14:48:00Z',
  },
  {
    deliveryId: 'dlv_9902',
    endpointUrl: 'https://api.hubapi.com/crm/v3/objects/contacts/sync',
    event: 'contact.updated',
    attemptNumber: 1,
    httpStatusCode: 200,
    responseBodySnippet: '{"status":"ok"}',
    durationMs: 98,
    status: 'DELIVERED',
    timestamp: '2026-08-25T14:42:00Z',
  },
  {
    deliveryId: 'dlv_9903',
    endpointUrl: 'https://salesforce-event-relay.enterprise.org/cdc',
    event: 'opportunity.stage_changed',
    attemptNumber: 1,
    httpStatusCode: 200,
    responseBodySnippet: '{"received":true}',
    durationMs: 185,
    status: 'DELIVERED',
    timestamp: '2026-08-25T14:35:00Z',
  },
  {
    deliveryId: 'dlv_9904',
    endpointUrl: 'https://unstable-webhook.customer-corp.com/events',
    event: 'ticket.created',
    attemptNumber: 2,
    httpStatusCode: 504,
    responseBodySnippet: 'Gateway Timeout',
    durationMs: 5000,
    status: 'RETRY_SCHEDULED',
    timestamp: '2026-08-25T14:30:00Z',
  },
];
