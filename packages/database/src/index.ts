import { PrismaClient } from '@prisma/client';

export * from '@prisma/client';
export {
  SystemRole as SystemRoleName,
  MemberStatus,
  ConversationType,
  MessageType,
  NotificationType,
  PresenceStatus,
  MessageReceiptStatus,
  LeadStatus,
  LeadSource,
  DealStatus,
  ActivityType,
  TaskStatus,
  TicketPriority,
  TicketStatus,
  WorkflowTriggerType,
  WorkflowActionType,
  CustomFieldDataType,
} from '@easychat/shared';

export * from './query-helpers';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

