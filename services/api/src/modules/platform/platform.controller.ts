import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { PlatformService } from './platform.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/user.decorator';
import { CreateApiKeyDto, CreateWebhookEndpointDto, UserSessionPayload } from '@easychat/shared';

@ApiTags('Developer Platform & Webhooks')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('platform')
export class PlatformController {
  constructor(private readonly platformService: PlatformService) {}

  @Get('api-keys')
  @ApiOperation({ summary: 'Get REST API keys' })
  async getApiKeys(@CurrentUser() user: UserSessionPayload) {
    return this.platformService.getApiKeys(user.organizationId);
  }

  @Post('api-keys')
  @ApiOperation({ summary: 'Generate new REST API key' })
  async createApiKey(@CurrentUser() user: UserSessionPayload, @Body() dto: CreateApiKeyDto) {
    return this.platformService.createApiKey(user.organizationId, user.userId, dto);
  }

  @Get('webhooks')
  @ApiOperation({ summary: 'Get webhook endpoints' })
  async getWebhooks(@CurrentUser() user: UserSessionPayload) {
    return this.platformService.getWebhooks(user.organizationId);
  }

  @Post('webhooks')
  @ApiOperation({ summary: 'Register new webhook endpoint' })
  async createWebhook(@CurrentUser() user: UserSessionPayload, @Body() dto: CreateWebhookEndpointDto) {
    return this.platformService.createWebhook(user.organizationId, dto);
  }
}
