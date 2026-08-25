import { z } from 'zod';

export const SdpCodecSchema = z.object({
  payloadType: z.number().int(),
  encodingName: z.string(),
  clockRate: z.number().int(),
  channels: z.number().int(),
});

export const SdpSessionDescriptionSchema = z.object({
  version: z.number().int(),
  originatorSessionId: z.string(),
  sessionName: z.string(),
  mediaAudioPort: z.number().int().positive(),
  transportProtocol: z.enum(['RTP/SAVPF', 'RTP/AVP']),
  codecs: z.array(SdpCodecSchema),
  srtpCryptoKeyBase64: z.string(),
});

export const SipInviteSessionSchema = z.object({
  callLegId: z.string(),
  fromUri: z.string(),
  toUri: z.string(),
  callState: z.enum(['INVITING', 'RINGING', 'ESTABLISHED', 'TERMINATED']),
  carrierGatewayFqdn: z.string(),
  sdpOffer: SdpSessionDescriptionSchema,
  sdpAnswer: SdpSessionDescriptionSchema.optional(),
  jitterBufferLatencyMs: z.number(),
  establishedAt: z.string().optional(),
});

export type SipInviteSessionDto = z.infer<typeof SipInviteSessionSchema>;
