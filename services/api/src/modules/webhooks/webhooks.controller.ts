import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RbacGuard } from '../../common/guards/rbac.guard';
import { RequirePermissions } from '../../common/decorators/permissions.decorator';
import { User } from '../../common/decorators/user.decorator';
import { Permission } from '@easychat/shared';
import { WebhooksDispatcherService } from './webhooks-dispatcher.service';

@Controller('v1/webhooks')
@UseGuards(JwtAuthGuard, RbacGuard)
export class WebhooksController {
  constructor(
    private readonly webhooksService: WebhooksDispatcherService
  ) {}

  @Get('endpoints')
  @RequirePermissions(Permission.ORG_READ)
  async listEndpoints(@User('organizationId') orgId: string) {
    return this.webhooksService.listEndpoints(orgId);
  }

  @Post('endpoints')
  @RequirePermissions(Permission.ORG_UPDATE)
  async createEndpoint(
    @User('organizationId') orgId: string,
    @Body() body: { url: string; events: string[] }
  ) {
    return this.webhooksService.createEndpoint(orgId, body.url, body.events);
  }

  @Delete('endpoints/:id')
  @RequirePermissions(Permission.ORG_UPDATE)
  async deleteEndpoint(
    @User('organizationId') orgId: string,
    @Param('id') id: string
  ) {
    return this.webhooksService.deleteEndpoint(orgId, id);
  }
}
