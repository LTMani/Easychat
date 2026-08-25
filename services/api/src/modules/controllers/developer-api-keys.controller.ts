import { Controller, Get, Post, Delete, Body, Param, Query, BadRequestException } from '@nestjs/common';
import * as crypto from 'crypto';

@Controller('v1/developer/api-keys')
export class DeveloperApiKeysController {
  @Get()
  async listApiKeys(@Query('orgId') orgId: string) {
    return {
      status: 'success',
      data: [
        {
          id: 'key_101',
          name: 'Production Server Integration',
          prefix: 'ech_live_••••',
          permissions: ['contacts:read', 'deals:write', 'tickets:read'],
          createdAt: '2026-08-15T00:00:00Z',
          lastUsedAt: '5 mins ago',
        },
      ],
    };
  }

  @Post()
  async createApiKey(
    @Body()
    body: {
      name: string;
      permissions: string[];
      expiresInDays?: number;
    },
  ) {
    if (!body.name) throw new BadRequestException('name is required');

    const rawSecret = `ech_live_${crypto.randomBytes(24).toString('hex')}`;
    const prefix = rawSecret.slice(0, 12);
    const keyHash = crypto.createHash('sha256').update(rawSecret).digest('hex');

    return {
      status: 'success',
      data: {
        id: `key_${Date.now()}`,
        name: body.name,
        prefix,
        apiKey: rawSecret, // Only revealed on creation
        permissions: body.permissions || ['*'],
        createdAt: new Date().toISOString(),
      },
    };
  }

  @Delete(':id')
  async revokeApiKey(@Param('id') id: string) {
    return {
      status: 'success',
      message: `API key ${id} has been permanently revoked.`,
    };
  }
}
