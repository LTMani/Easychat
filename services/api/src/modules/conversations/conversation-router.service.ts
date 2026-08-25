import { Injectable, Logger } from '@nestjs/common';
import { prisma } from '@easychat/database';

export interface ConversationRoutingDecision {
  conversationId: string;
  assignedUserId: string | null;
  routingStrategy: 'LEAST_ACTIVE' | 'MANUAL';
  reason: string;
}

@Injectable()
export class ConversationRouterService {
  private readonly logger = new Logger(ConversationRouterService.name);

  async routeConversation(organizationId: string, conversationId: string): Promise<ConversationRoutingDecision> {
    this.logger.log(`Routing conversation ${conversationId} for org ${organizationId}`);

    const conversation = await prisma.conversation.findFirst({
      where: { id: conversationId, organizationId },
    });

    if (!conversation) {
      return { conversationId, assignedUserId: null, routingStrategy: 'MANUAL', reason: 'Conversation not found.' };
    }

    const agents = await prisma.organizationMember.findMany({
      where: { organizationId },
      select: { userId: true },
    });

    if (agents.length === 0) {
      return { conversationId, assignedUserId: null, routingStrategy: 'MANUAL', reason: 'No available agents.' };
    }

    const agentLoads = await Promise.all(
      agents.map(async (a) => {
        const openCount = await prisma.conversation.count({
          where: { organizationId, status: 'OPEN', participants: { some: { userId: a.userId } } },
        });
        return { agentId: a.userId, openCount };
      })
    );

    agentLoads.sort((a, b) => a.openCount - b.openCount);
    const selectedAgent = agentLoads[0];

    await prisma.conversationParticipant.create({
      data: { conversationId, userId: selectedAgent.agentId, role: 'AGENT' },
    });

    return {
      conversationId,
      assignedUserId: selectedAgent.agentId,
      routingStrategy: 'LEAST_ACTIVE',
      reason: `Assigned to agent with ${selectedAgent.openCount} open conversations.`,
    };
  }
}
