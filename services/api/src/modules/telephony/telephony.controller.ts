import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RbacGuard } from '../../common/guards/rbac.guard';
import { RequirePermissions } from '../../common/decorators/permissions.decorator';
import { User } from '../../common/decorators/user.decorator';
import { Permission } from '@easychat/shared';
import { TelephonyService } from './telephony.service';

@Controller('v1/telephony')
@UseGuards(JwtAuthGuard, RbacGuard)
export class TelephonyController {
  constructor(private readonly telephonyService: TelephonyService) {}

  @Get('trunks')
  @RequirePermissions(Permission.ORG_READ)
  async listTrunks(@User('organizationId') orgId: string) {
    return this.telephonyService.listTrunks(orgId);
  }

  @Post('trunks')
  @RequirePermissions(Permission.ORG_UPDATE)
  async createTrunk(
    @User('organizationId') orgId: string,
    @Body() body: { channelConfigId: string; sipDomain: string; username: string; inboundNumber: string }
  ) {
    return this.telephonyService.createTrunk(
      orgId,
      body.channelConfigId,
      body.sipDomain,
      body.username,
      body.inboundNumber
    );
  }

  @Get('calls')
  @RequirePermissions(Permission.CONVERSATION_READ)
  async listCallLogs(@User('organizationId') orgId: string) {
    return this.telephonyService.listCallLogs(orgId);
  }
}
