import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AutomationService } from './automation.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/user.decorator';
import { CreateWorkflowRuleDto, UserSessionPayload } from '@easychat/shared';

@ApiTags('Automation Engine')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('automation/workflows')
export class AutomationController {
  constructor(private readonly autoService: AutomationService) {}

  @Get()
  @ApiOperation({ summary: 'Get workflow automation rules' })
  async getWorkflows(@CurrentUser() user: UserSessionPayload) {
    return this.autoService.getWorkflows(user.organizationId);
  }

  @Post()
  @ApiOperation({ summary: 'Create new workflow rule' })
  async createWorkflow(@CurrentUser() user: UserSessionPayload, @Body() dto: CreateWorkflowRuleDto) {
    return this.autoService.createWorkflow(user.organizationId, user.userId, dto);
  }

  @Post(':id/execute')
  @ApiOperation({ summary: 'Trigger test execution of workflow rule' })
  async triggerExecution(@CurrentUser() user: UserSessionPayload, @Param('id') id: string, @Body() payload: any) {
    return this.autoService.triggerExecution(user.organizationId, id, payload);
  }
}
