import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { prisma, ConversationType as DBConversationType, MessageType as DBMessageType, NotificationType as DBNotificationType } from '@easychat/database';
import { CreateConversationDto, SendMessageDto, ApiResponse, MessagePayload } from '@easychat/shared';
import { RealtimeGateway } from '../realtime/realtime.gateway';

@Injectable()
export class ConversationsService {
  constructor(private readonly realtimeGateway: RealtimeGateway) {}

  async createConversation(orgId: string, userId: string, dto: CreateConversationDto): Promise<ApiResponse> {
    const participantIds = Array.from(new Set([userId, ...dto.participantUserIds]));

    const conversation = await prisma.conversation.create({
      data: {
        organizationId: orgId,
        type: dto.type as unknown as DBConversationType,
        title: dto.title,
        description: dto.description,
        createdById: userId,
        participants: {
          create: participantIds.map((pId) => ({
            userId: pId,
            role: pId === userId ? 'OWNER' : 'MEMBER',
          })),
        },
      },
      include: {
        participants: {
          include: {
            user: {
              select: { id: true, email: true, firstName: true, lastName: true, avatarUrl: true },
            },
          },
        },
      },
    });

    return {
      success: true,
      message: 'Conversation created successfully',
      data: conversation,
    };
  }

  async getMyConversations(orgId: string, userId: string): Promise<ApiResponse> {
    const conversations = await prisma.conversation.findMany({
      where: {
        organizationId: orgId,
        participants: {
          some: { userId },
        },
      },
      orderBy: { lastMessageAt: 'desc' },
      include: {
        participants: {
          include: {
            user: {
              select: { id: true, email: true, firstName: true, lastName: true, avatarUrl: true },
            },
          },
        },
        messages: {
          take: 1,
          orderBy: { createdAt: 'desc' },
          include: {
            sender: {
              select: { id: true, email: true, firstName: true, lastName: true, avatarUrl: true },
            },
          },
        },
      },
    });

    return {
      success: true,
      data: conversations,
    };
  }

  async getMessages(conversationId: string, userId: string): Promise<ApiResponse> {
    const participant = await prisma.conversationParticipant.findUnique({
      where: {
        conversationId_userId: { conversationId, userId },
      },
    });

    if (!participant) {
      throw new ForbiddenException('You are not a participant in this conversation');
    }

    const messages = await prisma.message.findMany({
      where: { conversationId },
      orderBy: { createdAt: 'asc' },
      include: {
        sender: {
          select: { id: true, email: true, firstName: true, lastName: true, avatarUrl: true },
        },
        attachments: true,
      },
    });

    // Update lastReadAt
    await prisma.conversationParticipant.update({
      where: { id: participant.id },
      data: { lastReadAt: new Date() },
    });

    return {
      success: true,
      data: messages,
    };
  }

  async sendMessage(orgId: string, userId: string, dto: SendMessageDto): Promise<ApiResponse> {
    const participant = await prisma.conversationParticipant.findUnique({
      where: {
        conversationId_userId: { conversationId: dto.conversationId, userId },
      },
    });

    if (!participant) {
      throw new ForbiddenException('You are not a participant in this conversation');
    }

    const message = await prisma.message.create({
      data: {
        conversationId: dto.conversationId,
        senderId: userId,
        content: dto.content,
        type: (dto.type || 'TEXT') as unknown as DBMessageType,
        replyToId: dto.replyToId,
        attachments: dto.attachments && dto.attachments.length > 0 ? {
          create: dto.attachments.map((att) => ({
            fileName: att.fileName,
            fileUrl: att.fileUrl,
            fileSize: att.fileSize,
            mimeType: att.mimeType,
          })),
        } : undefined,
      },
      include: {
        sender: {
          select: { id: true, email: true, firstName: true, lastName: true, avatarUrl: true },
        },
        attachments: true,
      },
    });

    await prisma.conversation.update({
      where: { id: dto.conversationId },
      data: { lastMessageAt: new Date() },
    });

    // Broadcast message via WebSockets
    this.realtimeGateway.broadcastNewMessage(dto.conversationId, message as unknown as MessagePayload);

    // Notify other participants
    const otherParticipants = await prisma.conversationParticipant.findMany({
      where: {
        conversationId: dto.conversationId,
        userId: { not: userId },
      },
    });

    for (const p of otherParticipants) {
      const notif = await prisma.notification.create({
        data: {
          organizationId: orgId,
          userId: p.userId,
          type: DBNotificationType.NEW_MESSAGE,
          title: `New message from ${message.sender.firstName}`,
          body: message.content.substring(0, 100),
          link: `/conversations?id=${dto.conversationId}`,
        },
      });

      this.realtimeGateway.broadcastNotification(p.userId, notif as any);
    }

    return {
      success: true,
      message: 'Message sent successfully',
      data: message,
    };
  }
}
