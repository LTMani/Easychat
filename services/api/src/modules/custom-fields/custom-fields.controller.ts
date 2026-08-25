import { Controller, Get, Post, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RbacGuard } from '../../common/guards/rbac.guard';
import { RequirePermissions } from '../../common/decorators/permissions.decorator';
import { User } from '../../common/decorators/user.decorator';
import { Permission } from '@easychat/shared';
import { CustomFieldsService, CreateCustomFieldDto } from './custom-fields.service';

@Controller('v1/custom-fields')
@UseGuards(JwtAuthGuard, RbacGuard)
export class CustomFieldsController {
  constructor(private readonly customFieldsService: CustomFieldsService) {}

  @Get()
  @RequirePermissions(Permission.ORG_READ)
  async getFields(
    @User('organizationId') orgId: string,
    @Query('entityType') entityType?: string
  ) {
    return this.customFieldsService.getFields(orgId, entityType);
  }

  @Post()
  @RequirePermissions(Permission.ORG_UPDATE)
  async createField(
    @User('organizationId') orgId: string,
    @Body() dto: CreateCustomFieldDto
  ) {
    return this.customFieldsService.createField(orgId, dto);
  }

  @Delete(':id')
  @RequirePermissions(Permission.ORG_UPDATE)
  async deleteField(
    @User('organizationId') orgId: string,
    @Param('id') id: string
  ) {
    return this.customFieldsService.deleteField(orgId, id);
  }
}
