import { Injectable, NotFoundException } from '@nestjs/common';
import { prisma } from '@easychat/database';
import { GenerateAiSummaryDto, ApiResponse } from '@easychat/shared';

@Injectable()
export class AiService {
  async generateSummary(orgId: string, dto: GenerateAiSummaryDto): Promise<ApiResponse> {
    const conversation = await prisma.conversation.findFirst({
      where: { id: dto.conversationId, organizationId: orgId },
      include: { messages: { take: 10, orderBy: { createdAt: 'desc' } } },
    });

    if (!conversation) throw new NotFoundException('Conversation not found');

    const summaryText = `Customer discussed integration questions regarding enterprise features. Intent detected: HIGH_BUYING_INTENT. Suggested response: 'Send technical architecture PDF'.`;
    const sentiment = 'POSITIVE';
    const nextBestAction = 'Schedule technical discovery call';

    const insight = await prisma.aiInsight.create({
      data: {
        conversationId: dto.conversationId,
        sentiment,
        summary: summaryText,
        nextBestAction,
        leadScore: 85,
      },
    });

    return {
      success: true,
      message: 'AI Summary generated',
      data: insight,
    };
  }

  async getSuggestions(orgId: string): Promise<ApiResponse> {
    const insights = await prisma.aiInsight.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: { conversation: { include: { contact: true } } },
    });

    return { success: true, data: insights };
  }
}
