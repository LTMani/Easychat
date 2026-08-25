import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ConversationsService } from './conversations.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RbacGuard } from '../../common/guards/rbac.guard';
import { RequirePermissions } from '../../common/decorators/permissions.decorator';
import { CurrentUser } from '../../common/decorators/user.decorator';
import { Permission, CreateConversationDto, SendMessageDto, UserSessionPayload } from '@easychat/shared';

@ApiTags('Conversations & Realtime')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RbacGuard)
@Controller('conversations')
export class ConversationsController {
  constructor(private readonly conversationsService: ConversationsService) {}

  @Get()
  @RequirePermissions(Permission.CONVERSATION_READ)
  @ApiOperation({ summary: 'Get list of active conversations for current user' })
  async getMyConversations(@CurrentUser() user: UserSessionPayload) {
    return this.conversationsService.getMyConversations(user.organizationId, user.userId);
  }

  @Post()
  @RequirePermissions(Permission.CONVERSATION_CREATE)
  @ApiOperation({ summary: 'Create new direct or group conversation' })
  async createConversation(@CurrentUser() user: UserSessionPayload, @Body() dto: CreateConversationDto) {
    return this.conversationsService.createConversation(user.organizationId, user.userId, dto);
  }

  @Get(':id/messages')
  @RequirePermissions(Permission.CONVERSATION_READ)
  @ApiOperation({ summary: 'Get message history for a conversation' })
  async getMessages(@CurrentUser() user: UserSessionPayload, @Param('id') conversationId: string) {
    return this.conversationsService.getMessages(conversationId, user.userId);
  }

  @Post('messages')
  @RequirePermissions(Permission.CONVERSATION_REPLY)
  @ApiOperation({ summary: 'Send message in conversation' })
  async sendMessage(@CurrentUser() user: UserSessionPayload, @Body() dto: SendMessageDto) {
    return this.conversationsService.sendMessage(user.organizationId, user.userId, dto);
  }
}
