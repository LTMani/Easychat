import { z } from 'zod';

export const AgentStatusEnum = z.enum(['ONLINE', 'BUSY', 'AWAY', 'OFFLINE']);

export const AgentPresenceSchema = z.object({
  agentId: z.string().min(1),
  workspaceId: z.string().min(1),
  status: AgentStatusEnum,
  activeConversationCount: z.number().int().nonnegative(),
  maxConcurrentConversations: z.number().int().positive(),
  lastHeartbeatTimestamp: z.string(),
  isAvailableForRouting: z.boolean(),
});

export type AgentPresence = z.infer<typeof AgentPresenceSchema>;
