import { Injectable, NotFoundException } from '@nestjs/common';
import { prisma } from '@easychat/database';
import { CreateWorkflowRuleDto, ApiResponse } from '@easychat/shared';

@Injectable()
export class AutomationService {
  async getWorkflows(orgId: string): Promise<ApiResponse> {
    const rules = await prisma.workflowRule.findMany({
      where: { organizationId: orgId },
      orderBy: { createdAt: 'desc' },
      include: {
        createdBy: { select: { id: true, email: true, firstName: true, lastName: true } },
        executions: { take: 5, orderBy: { executedAt: 'desc' } },
      },
    });
    return { success: true, data: rules };
  }

  async createWorkflow(orgId: string, userId: string, dto: CreateWorkflowRuleDto): Promise<ApiResponse> {
    const rule = await prisma.workflowRule.create({
      data: {
        organizationId: orgId,
        createdById: userId,
        name: dto.name,
        triggerType: dto.triggerType,
        actionType: dto.actionType,
        config: JSON.stringify(dto.config || {}),
      },
      include: {
        createdBy: { select: { id: true, email: true, firstName: true, lastName: true } },
      },
    });

    await prisma.auditLog.create({
      data: { organizationId: orgId, userId, action: 'WORKFLOW_CREATED', entityType: 'WorkflowRule', entityId: rule.id },
    });

    return { success: true, message: 'Workflow rule created', data: rule };
  }

  async triggerExecution(orgId: string, ruleId: string, payload: any): Promise<ApiResponse> {
    const rule = await prisma.workflowRule.findFirst({ where: { id: ruleId, organizationId: orgId } });
    if (!rule) throw new NotFoundException('Workflow rule not found');

    const execution = await prisma.workflowExecution.create({
      data: {
        workflowRuleId: ruleId,
        status: 'SUCCESS',
        output: JSON.stringify({ triggeredAt: new Date().toISOString(), payload }),
      },
    });

    return { success: true, message: 'Workflow executed', data: execution };
  }
}
