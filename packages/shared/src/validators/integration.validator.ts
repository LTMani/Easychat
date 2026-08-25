import { z } from 'zod';

export const IntegrationProviderEnum = z.enum([
  'SALESFORCE',
  'HUBSPOT',
  'ZAPIER',
  'SLACK',
  'STRIPE',
  'TWILIO',
  'META_WHATSAPP',
  'SENDGRID',
]);

export const ConfigureSalesforceSchema = z.object({
  instanceUrl: z.string().url(),
  clientId: z.string().min(10),
  clientSecret: z.string().min(10),
  refreshToken: z.string().min(10),
  syncContacts: z.boolean().default(true),
  syncDeals: z.boolean().default(true),
  syncAccounts: z.boolean().default(true),
  biDirectional: z.boolean().default(true),
});

export const ConfigureHubSpotSchema = z.object({
  portalId: z.string().min(3),
  accessToken: z.string().min(10),
  syncContacts: z.boolean().default(true),
  syncDeals: z.boolean().default(true),
  syncCompanies: z.boolean().default(true),
});

export const ConfigureSlackSchema = z.object({
  webhookUrl: z.string().url(),
  channelMapping: z.record(z.string()).optional(),
  notifyOnDealWon: z.boolean().default(true),
  notifyOnSlaBreach: z.boolean().default(true),
});

export const ConfigureTwilioSchema = z.object({
  accountSid: z.string().startsWith('AC'),
  authToken: z.string().min(16),
  phoneNumber: z.string().min(8),
  enableVoiceIvr: z.boolean().default(false),
  enableSms: z.boolean().default(true),
});
