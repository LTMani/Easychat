import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RbacGuard } from '../../common/guards/rbac.guard';
import { RequirePermissions } from '../../common/decorators/permissions.decorator';
import { User } from '../../common/decorators/user.decorator';
import { Permission } from '@easychat/shared';
import { SamlSsoService, CreateSamlSsoConfigDto } from './saml-sso.service';

@Controller('v1/sso')
export class SsoController {
  constructor(private readonly ssoService: SamlSsoService) {}

  @Get('config')
  @UseGuards(JwtAuthGuard, RbacGuard)
  @RequirePermissions(Permission.ORG_READ)
  async getConfig(@User('organizationId') orgId: string) {
    return this.ssoService.getConfig(orgId);
  }

  @Post('config')
  @UseGuards(JwtAuthGuard, RbacGuard)
  @RequirePermissions(Permission.ORG_UPDATE)
  async saveConfig(
    @User('organizationId') orgId: string,
    @Body() dto: CreateSamlSsoConfigDto
  ) {
    return this.ssoService.saveConfig(orgId, dto);
  }

  @Post('config/toggle')
  @UseGuards(JwtAuthGuard, RbacGuard)
  @RequirePermissions(Permission.ORG_UPDATE)
  async toggleSso(
    @User('organizationId') orgId: string,
    @Body() body: { isEnabled: boolean }
  ) {
    return this.ssoService.toggleSso(orgId, body.isEnabled);
  }

  @Post('saml/consume/:orgId')
  async consumeSamlResponse(
    @Param('orgId') orgId: string,
    @Body() body: { SAMLResponse: string }
  ) {
    return this.ssoService.validateSamlResponse(orgId, body.SAMLResponse);
  }
}
