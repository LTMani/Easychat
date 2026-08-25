import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ChannelsService } from './channels.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RbacGuard } from '../../common/guards/rbac.guard';
import { CurrentUser } from '../../common/decorators/user.decorator';
import { UserSessionPayload } from '@easychat/shared';

@ApiTags('Omnichannel Integrations')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RbacGuard)
@Controller('channels')
export class ChannelsController {
  constructor(private readonly channelsService: ChannelsService) {}

  @Get()
  @ApiOperation({ summary: 'Get list of configured omnichannel adapters' })
  async getChannels(@CurrentUser() user: UserSessionPayload) {
    return this.channelsService.getChannels(user.organizationId);
  }

  @Post()
  @ApiOperation({ summary: 'Configure new channel adapter' })
  async createChannel(
    @CurrentUser() user: UserSessionPayload,
    @Body() body: { name: string; type: string; credentials: any },
  ) {
    return this.channelsService.createChannel(user.organizationId, body.name, body.type, body.credentials);
  }

  @Post(':id/webhook')
  @ApiOperation({ summary: 'Process incoming channel webhook' })
  async processWebhook(@Param('id') id: string, @Body() payload: any) {
    return this.channelsService.processIncomingWebhook(id, 'INCOMING_MESSAGE', payload);
  }
}
