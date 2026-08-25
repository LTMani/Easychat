import { Controller, Get, Post, Patch, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { OrganizationsService } from './organizations.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RbacGuard } from '../../common/guards/rbac.guard';
import { RequirePermissions } from '../../common/decorators/permissions.decorator';
import { CurrentUser } from '../../common/decorators/user.decorator';
import { Permission, InviteMemberDto, CreateTeamDto, UpdateRoleDto, UserSessionPayload } from '@easychat/shared';

@ApiTags('Organizations & Teams')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RbacGuard)
@Controller('organizations')
export class OrganizationsController {
  constructor(private readonly orgsService: OrganizationsService) {}

  @Get('me')
  @RequirePermissions(Permission.ORG_READ)
  @ApiOperation({ summary: 'Get current user organization details' })
  async getMyOrganization(@CurrentUser() user: UserSessionPayload) {
    return this.orgsService.getOrganizationDetails(user.organizationId);
  }

  @Post('members/invite')
  @RequirePermissions(Permission.ORG_MANAGE_MEMBERS)
  @ApiOperation({ summary: 'Invite new member to organization' })
  async inviteMember(@CurrentUser() user: UserSessionPayload, @Body() dto: InviteMemberDto) {
    return this.orgsService.inviteMember(user.organizationId, dto);
  }

  @Patch('members/:id/role')
  @RequirePermissions(Permission.ORG_MANAGE_ROLES)
  @ApiOperation({ summary: 'Update organization member role' })
  async updateRole(
    @CurrentUser() user: UserSessionPayload,
    @Param('id') memberId: string,
    @Body() dto: UpdateRoleDto,
  ) {
    return this.orgsService.updateMemberRole(user.organizationId, memberId, dto.role);
  }

  @Get('teams')
  @RequirePermissions(Permission.TEAM_READ)
  @ApiOperation({ summary: 'List organization teams' })
  async getTeams(@CurrentUser() user: UserSessionPayload) {
    return this.orgsService.getTeams(user.organizationId);
  }

  @Post('teams')
  @RequirePermissions(Permission.TEAM_CREATE)
  @ApiOperation({ summary: 'Create new team within organization' })
  async createTeam(@CurrentUser() user: UserSessionPayload, @Body() dto: CreateTeamDto) {
    return this.orgsService.createTeam(user.organizationId, dto);
  }
}
