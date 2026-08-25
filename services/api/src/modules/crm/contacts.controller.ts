import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ContactsService } from './contacts.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RbacGuard } from '../../common/guards/rbac.guard';
import { RequirePermissions } from '../../common/decorators/permissions.decorator';
import { CurrentUser } from '../../common/decorators/user.decorator';
import { Permission, CreateContactDto, CreateCompanyDto, UserSessionPayload } from '@easychat/shared';

@ApiTags('CRM — Contacts & Companies')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RbacGuard)
@Controller('crm')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Get('contacts')
  @RequirePermissions(Permission.CUSTOMER_READ)
  @ApiOperation({ summary: 'Get list of contacts' })
  async getContacts(@CurrentUser() user: UserSessionPayload) {
    return this.contactsService.getContacts(user.organizationId);
  }

  @Post('contacts')
  @RequirePermissions(Permission.CUSTOMER_CREATE)
  @ApiOperation({ summary: 'Create new customer contact' })
  async createContact(@CurrentUser() user: UserSessionPayload, @Body() dto: CreateContactDto) {
    return this.contactsService.createContact(user.organizationId, dto);
  }

  @Get('companies')
  @RequirePermissions(Permission.CUSTOMER_READ)
  @ApiOperation({ summary: 'Get list of customer companies' })
  async getCompanies(@CurrentUser() user: UserSessionPayload) {
    return this.contactsService.getCompanies(user.organizationId);
  }

  @Post('companies')
  @RequirePermissions(Permission.CUSTOMER_CREATE)
  @ApiOperation({ summary: 'Create new company record' })
  async createCompany(@CurrentUser() user: UserSessionPayload, @Body() dto: CreateCompanyDto) {
    return this.contactsService.createCompany(user.organizationId, dto);
  }
}
