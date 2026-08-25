import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { verifyToken } from '@easychat/auth';
import { prisma, PresenceStatus } from '@easychat/database';
import { MessagePayload, NotificationPayload } from '@easychat/shared';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class RealtimeGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private activeSockets: Map<string, string> = new Map(); // socketId -> userId

  async handleConnection(client: Socket) {
    try {
      const token = client.handshake.auth?.token || client.handshake.query?.token;
      if (!token) {
        client.disconnect();
        return;
      }

      const secret = process.env.JWT_SECRET || 'super-secret-jwt-key-easychat-crm-2026-production-change-me';
      const payload = verifyToken(token as string, secret);
      client.data.user = payload;
      this.activeSockets.set(client.id, payload.userId);

      // Join organization room and user personal room
      if (payload.organizationId) {
        client.join(`org:${payload.organizationId}`);
      }
      client.join(`user:${payload.userId}`);

      // Update presence
      await prisma.userPresence.upsert({
        where: { userId: payload.userId },
        update: { status: PresenceStatus.ONLINE, lastActiveAt: new Date() },
        create: { userId: payload.userId, status: PresenceStatus.ONLINE },
      });

      this.server.to(`org:${payload.organizationId}`).emit('presence.update', {
        userId: payload.userId,
        status: 'ONLINE',
      });
    } catch (err) {
      client.disconnect();
    }
  }

  async handleDisconnect(client: Socket) {
    const userId = this.activeSockets.get(client.id);
    if (userId) {
      this.activeSockets.delete(client.id);
      await prisma.userPresence.update({
        where: { userId },
        data: { status: PresenceStatus.OFFLINE, lastActiveAt: new Date() },
      }).catch(() => {});

      const orgId = client.data?.user?.organizationId;
      if (orgId) {
        this.server.to(`org:${orgId}`).emit('presence.update', {
          userId,
          status: 'OFFLINE',
        });
      }
    }
  }

  @SubscribeMessage('join.conversation')
  handleJoinConversation(@ConnectedSocket() client: Socket, @MessageBody() data: { conversationId: string }) {
    client.join(`conversation:${data.conversationId}`);
    return { status: 'joined', conversationId: data.conversationId };
  }

  @SubscribeMessage('leave.conversation')
  handleLeaveConversation(@ConnectedSocket() client: Socket, @MessageBody() data: { conversationId: string }) {
    client.leave(`conversation:${data.conversationId}`);
    return { status: 'left', conversationId: data.conversationId };
  }

  @SubscribeMessage('typing.start')
  handleTypingStart(@ConnectedSocket() client: Socket, @MessageBody() data: { conversationId: string }) {
    const user = client.data.user;
    client.to(`conversation:${data.conversationId}`).emit('typing.start', {
      conversationId: data.conversationId,
      userId: user.userId,
      email: user.email,
    });
  }

  @SubscribeMessage('typing.stop')
  handleTypingStop(@ConnectedSocket() client: Socket, @MessageBody() data: { conversationId: string }) {
    const user = client.data.user;
    client.to(`conversation:${data.conversationId}`).emit('typing.stop', {
      conversationId: data.conversationId,
      userId: user.userId,
    });
  }

  broadcastNewMessage(conversationId: string, message: MessagePayload) {
    this.server.to(`conversation:${conversationId}`).emit('message.sent', message);
  }

  broadcastNotification(userId: string, notification: NotificationPayload) {
    this.server.to(`user:${userId}`).emit('notification.created', notification);
  }
}
