import { Controller, Get, Post, Patch, Delete, Body, Param, Query, BadRequestException } from '@nestjs/common';
import { WorkflowEngineService } from '../automation/workflow-engine.service';

@Controller('v1/automation/workflows')
export class AutomationWorkflowsController {
  constructor(private readonly engineService: WorkflowEngineService) {}

  @Get()
  async listWorkflows() {
    return {
      status: 'success',
      data: [
        {
          id: 'wf_101',
          name: 'Notify Manager on High-Value Lead',
          trigger: 'LEAD_SCORED',
          isEnabled: true,
          executionCount: 142,
          lastTriggeredAt: '12 mins ago',
        },
      ],
    };
  }

  @Post()
  async createWorkflow(@Body() body: any) {
    if (!body.name || !body.trigger) {
      throw new BadRequestException('name and trigger are required');
    }

    return {
      status: 'success',
      data: {
        id: `wf_${Date.now()}`,
        ...body,
        isEnabled: body.isEnabled ?? true,
        executionCount: 0,
        createdAt: new Date().toISOString(),
      },
    };
  }

  @Post('test-conditions')
  async testWorkflowConditions(
    @Body()
    body: {
      conditions: Array<{ field: string; operator: any; value: any }>;
      context: Record<string, any>;
    },
  ) {
    const isMatched = this.engineService.evaluateConditions(body.conditions || [], body.context || {});
    return {
      status: 'success',
      isMatched,
    };
  }
}
