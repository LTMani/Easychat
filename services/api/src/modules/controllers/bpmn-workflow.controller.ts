import { Controller, Get, Post, Body, Param, BadRequestException } from '@nestjs/common';
import { BpmnExecutionEngineService } from '../workflow/bpmn-execution-engine.service';

@Controller('v1/workflow/bpmn')
export class BpmnWorkflowController {
  constructor(private readonly bpmnService: BpmnExecutionEngineService) {}

  @Get('processes')
  async listProcesses() {
    const list = this.bpmnService.listProcesses();
    return {
      status: 'success',
      data: list,
    };
  }

  @Post('processes/:processId/start')
  async startProcess(
    @Param('processId') processId: string,
    @Body('variables') variables: Record<string, any>,
  ) {
    if (!processId) throw new BadRequestException('processId is required');
    const instance = this.bpmnService.startProcessInstance(processId, variables || {});
    return {
      status: 'success',
      data: instance,
    };
  }

  @Get('instances/:instanceId')
  async getInstance(@Param('instanceId') instanceId: string) {
    const instance = this.bpmnService.getInstance(instanceId);
    if (!instance) throw new BadRequestException('Instance not found');
    return {
      status: 'success',
      data: instance,
    };
  }
}
