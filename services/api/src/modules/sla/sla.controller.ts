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
import { Permission, CreateSlaPolicyDto, CreateTicketQueueDto } from '@easychat/shared';
import { SlaPolicyService } from './sla-policy.service';
import { SlaEvaluatorService } from './sla-evaluator.service';

@Controller('v1/sla')
@UseGuards(JwtAuthGuard, RbacGuard)
export class SlaController {
  constructor(
    private readonly slaPolicyService: SlaPolicyService,
    private readonly slaEvaluatorService: SlaEvaluatorService
  ) {}

  @Get('policies')
  @RequirePermissions(Permission.TICKET_READ)
  async listPolicies(@User('organizationId') orgId: string) {
    return this.slaPolicyService.listPolicies(orgId);
  }

  @Post('policies')
  @RequirePermissions(Permission.SLA_MANAGE)
  async createPolicy(
    @User('organizationId') orgId: string,
    @Body() dto: CreateSlaPolicyDto
  ) {
    return this.slaPolicyService.createPolicy(orgId, dto);
  }

  @Delete('policies/:id')
  @RequirePermissions(Permission.SLA_MANAGE)
  async deletePolicy(
    @User('organizationId') orgId: string,
    @Param('id') id: string
  ) {
    return this.slaPolicyService.deletePolicy(orgId, id);
  }

  @Get('queues')
  @RequirePermissions(Permission.TICKET_READ)
  async listQueues(@User('organizationId') orgId: string) {
    return this.slaPolicyService.listQueues(orgId);
  }

  @Post('queues')
  @RequirePermissions(Permission.SLA_MANAGE)
  async createQueue(
    @User('organizationId') orgId: string,
    @Body() dto: CreateTicketQueueDto
  ) {
    return this.slaPolicyService.createQueue(orgId, dto);
  }

  @Get('breaches')
  @RequirePermissions(Permission.TICKET_READ)
  async getBreachLogs(@User('organizationId') orgId: string) {
    return this.slaPolicyService.getBreachLogs(orgId);
  }

  @Post('evaluate')
  @RequirePermissions(Permission.SLA_MANAGE)
  async evaluateBreaches(@User('organizationId') orgId: string) {
    const breaches = await this.slaEvaluatorService.evaluateAllOpenBreaches(orgId);
    return { evaluated: true, breachCount: breaches };
  }
}
