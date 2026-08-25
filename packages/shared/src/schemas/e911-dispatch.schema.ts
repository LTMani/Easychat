import { z } from 'zod';

export const DispatchablePhysicalAddressSchema = z.object({
  civicStreet: z.string(),
  unitSuiteFloor: z.string(),
  city: z.string(),
  stateOrProvince: z.string(),
  postalCode: z.string(),
  countryIso: z.string().length(2),
  latitude: z.number(),
  longitude: z.number(),
});

export const E911EmergencyRegistrationSchema = z.object({
  registrationId: z.string(),
  phoneNumberE164: z.string(),
  agentName: z.string(),
  workspaceId: z.string(),
  physicalLocation: DispatchablePhysicalAddressSchema,
  psapRoutingZone: z.string(),
  fccComplianceStatus: z.enum(['VALIDATED_KARIS_LAW_RAY_BAUMS', 'PENDING_VALIDATION', 'REJECTED']),
  lastValidatedTimestamp: z.string(),
});

export type E911EmergencyRegistrationDto = z.infer<typeof E911EmergencyRegistrationSchema>;
