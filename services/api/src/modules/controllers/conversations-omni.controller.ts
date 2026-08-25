import { Controller, Get, Post, Patch, Body, Param, Query, BadRequestException } from '@nestjs/common';
import { OmnichannelChannelManagerService } from '../omnichannel/omnichannel-channel-manager.service';
import { NlpExtractionService } from '../ai/nlp-extraction.service';

@Controller('v1/conversations')
export class ConversationsOmniController {
  constructor(
    private readonly channelManager: OmnichannelChannelManagerService,
    private readonly nlpService: NlpExtractionService,
  ) {}

  @Get()
  async listConversations(
    @Query('channel') channel?: string,
    @Query('status') status?: string,
    @Query('contactId') contactId?: string,
  ) {
    return {
      status: 'success',
      data: [],
      meta: { channel, status: status || 'OPEN', contactId },
    };
  }

  @Get(':id/messages')
  async getConversationMessages(@Param('id') id: string) {
    return {
      status: 'success',
      data: [
        {
          id: 'msg_01',
          senderType: 'CUSTOMER',
          content: 'Hello! I need assistance with our enterprise contract renewal.',
          createdAt: new Date().toISOString(),
        },
      ],
    };
  }

  @Post(':id/messages')
  async sendMessage(
    @Param('id') id: string,
    @Body()
    body: {
      content: string;
      channel: string;
      mediaType?: string;
      mediaUrl?: string;
    },
  ) {
    if (!body.content || !body.channel) {
      throw new BadRequestException('content and channel are required');
    }

    const payloadCheck = this.channelManager.validateOutboundPayload(
      body.channel,
      body.mediaType || 'TEXT',
      body.content.length,
    );

    if (!payloadCheck.isAllowed) {
      throw new BadRequestException(payloadCheck.error);
    }

    // Extract NLP entities
    const entities = this.nlpService.extractEntities(body.content);
    const intent = this.nlpService.classifyIntent(body.content);

    return {
      status: 'success',
      data: {
        messageId: `msg_${Date.now()}`,
        conversationId: id,
        channel: body.channel,
        content: body.content,
        nlp: { intent, entities },
        deliveredAt: new Date().toISOString(),
      },
    };
  }

  @Patch(':id/resolve')
  async resolveConversation(@Param('id') id: string) {
    return {
      status: 'success',
      data: {
        id,
        status: 'RESOLVED',
        resolvedAt: new Date().toISOString(),
      },
    };
  }
}
