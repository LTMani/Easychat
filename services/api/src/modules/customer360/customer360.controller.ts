import { Controller, Get, Post, Patch, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Customer360Service } from './customer360.service';
import { CustomerTimelineService } from './customer-timeline.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RbacGuard } from '../../common/guards/rbac.guard';
import { RequirePermissions } from '../../common/decorators/permissions.decorator';
import { CurrentUser } from '../../common/decorators/user.decorator';
import { Permission, CreateTaskDto, UpdateTaskStatusDto, CreateCustomerDocumentDto, LinkConversationCrmDto, UserSessionPayload } from '@easychat/shared';

@ApiTags('Customer 360 & Tasks')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RbacGuard)
@Controller('customer360')
export class Customer360Controller {
  constructor(
    private readonly c360Service: Customer360Service,
    private readonly timelineService: CustomerTimelineService
  ) {}

  @Get('timeline/:contactId')
  @RequirePermissions(Permission.CUSTOMER_READ)
  @ApiOperation({ summary: 'Get Customer 360 unified activity timeline' })
  async getTimeline(@CurrentUser() user: UserSessionPayload, @Param('contactId') contactId: string) {
    return this.timelineService.getCustomerTimeline(user.organizationId, contactId);
  }

  @Post('tasks')
  @RequirePermissions(Permission.CUSTOMER_UPDATE)
  @ApiOperation({ summary: 'Create sales or support task' })
  async createTask(@CurrentUser() user: UserSessionPayload, @Body() dto: CreateTaskDto) {
    return this.c360Service.createTask(user.organizationId, user.userId, dto);
  }

  @Patch('tasks/:id/status')
  @RequirePermissions(Permission.CUSTOMER_UPDATE)
  @ApiOperation({ summary: 'Update task status' })
  async updateTaskStatus(
    @CurrentUser() user: UserSessionPayload,
    @Param('id') taskId: string,
    @Body() dto: UpdateTaskStatusDto,
  ) {
    return this.c360Service.updateTaskStatus(user.organizationId, taskId, dto);
  }

  @Post('documents')
  @RequirePermissions(Permission.CUSTOMER_UPDATE)
  @ApiOperation({ summary: 'Register customer document attachment' })
  async uploadDocument(@CurrentUser() user: UserSessionPayload, @Body() dto: CreateCustomerDocumentDto) {
    return this.c360Service.uploadDocument(user.organizationId, user.userId, dto);
  }

  @Post('conversations/link')
  @RequirePermissions(Permission.CONVERSATION_REPLY)
  @ApiOperation({ summary: 'Link conversation to Contact or Deal' })
  async linkConversation(@CurrentUser() user: UserSessionPayload, @Body() dto: LinkConversationCrmDto) {
    return this.c360Service.linkConversationToCrm(user.organizationId, dto);
  }
}
