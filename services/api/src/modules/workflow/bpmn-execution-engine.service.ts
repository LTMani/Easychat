import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import * as crypto from 'crypto';

export type BpmnNodeType =
  | 'START_EVENT'
  | 'SERVICE_TASK'
  | 'EXCLUSIVE_GATEWAY'
  | 'PARALLEL_GATEWAY'
  | 'TIMER_BOUNDARY_EVENT'
  | 'USER_APPROVAL_TASK'
  | 'END_EVENT';

export interface BpmnNodeDefinition {
  nodeId: string;
  type: BpmnNodeType;
  label: string;
  handlerService?: string;
  conditionalExpression?: string;
  nextNodes: string[];
}

export interface BpmnProcessDefinition {
  processId: string;
  name: string;
  version: number;
  startNodeId: string;
  nodes: Record<string, BpmnNodeDefinition>;
}

export interface BpmnExecutionInstance {
  instanceId: string;
  processId: string;
  currentNodeId: string;
  executionState: 'RUNNING' | 'WAITING_APPROVAL' | 'COMPLETED' | 'FAILED';
  variables: Record<string, any>;
  auditTrail: Array<{ nodeId: string; executedAt: string; status: string }>;
}

@Injectable()
export class BpmnExecutionEngineService {
  private readonly logger = new Logger(BpmnExecutionEngineService.name);

  private readonly processes = new Map<string, BpmnProcessDefinition>();
  private readonly instances = new Map<string, BpmnExecutionInstance>();

  constructor() {
    this.seedDefaultBpmnProcesses();
  }

  private seedDefaultBpmnProcesses() {
    const leadProcess: BpmnProcessDefinition = {
      processId: 'proc_lead_qualification_v1',
      name: 'Automated VIP Lead Triage & Executive Handoff',
      version: 1,
      startNodeId: 'start_01',
      nodes: {
        start_01: { nodeId: 'start_01', type: 'START_EVENT', label: 'Inbound Lead Created', nextNodes: ['enrich_task_02'] },
        enrich_task_02: { nodeId: 'enrich_task_02', type: 'SERVICE_TASK', label: 'Clearbit & ZoomInfo Firmographic Enrichment', handlerService: 'LeadEnrichmentService', nextNodes: ['gw_vip_03'] },
        gw_vip_03: { nodeId: 'gw_vip_03', type: 'EXCLUSIVE_GATEWAY', label: 'Is Deal > $50k or Employees > 500?', nextNodes: ['vip_route_04', 'standard_route_05'] },
        vip_route_04: { nodeId: 'vip_route_04', type: 'SERVICE_TASK', label: 'Assign Dedicated VP Account Executive & Slack VIP Alert', handlerService: 'VipSalesRouterService', nextNodes: ['end_06'] },
        standard_route_05: { nodeId: 'standard_route_05', type: 'SERVICE_TASK', label: 'Round-Robin Distribute to Inbound SDR Pool', handlerService: 'RoundRobinDistributorService', nextNodes: ['end_06'] },
        end_06: { nodeId: 'end_06', type: 'END_EVENT', label: 'Lead Onboarded to Pipeline', nextNodes: [] },
      },
    };

    this.processes.set(leadProcess.processId, leadProcess);
  }

  startProcessInstance(processId: string, initialVariables: Record<string, any>): BpmnExecutionInstance {
    const proc = this.processes.get(processId);
    if (!proc) throw new BadRequestException(`BPMN Process '${processId}' not found`);

    const instanceId = `inst_${crypto.randomBytes(8).toString('hex')}`;
    const instance: BpmnExecutionInstance = {
      instanceId,
      processId,
      currentNodeId: proc.startNodeId,
      executionState: 'RUNNING',
      variables: { ...initialVariables },
      auditTrail: [{ nodeId: proc.startNodeId, executedAt: new Date().toISOString(), status: 'STARTED' }],
    };

    // Auto-advance
    this.advanceInstance(instance, proc);
    this.instances.set(instanceId, instance);
    return instance;
  }

  private advanceInstance(inst: BpmnExecutionInstance, proc: BpmnProcessDefinition) {
    let current = proc.nodes[inst.currentNodeId];

    while (current && current.type !== 'END_EVENT' && current.type !== 'USER_APPROVAL_TASK') {
      if (current.type === 'EXCLUSIVE_GATEWAY') {
        const isVip = (inst.variables.dealAmount || 0) >= 50000 || (inst.variables.employeeCount || 0) >= 500;
        const nextId = isVip ? current.nextNodes[0] : current.nextNodes[1] || current.nextNodes[0];
        inst.currentNodeId = nextId;
      } else {
        inst.currentNodeId = current.nextNodes[0];
      }

      inst.auditTrail.push({ nodeId: inst.currentNodeId, executedAt: new Date().toISOString(), status: 'EXECUTED' });
      current = proc.nodes[inst.currentNodeId];
    }

    if (current && current.type === 'END_EVENT') {
      inst.executionState = 'COMPLETED';
    }
  }

  getInstance(instanceId: string): BpmnExecutionInstance | null {
    return this.instances.get(instanceId) || null;
  }

  listProcesses(): BpmnProcessDefinition[] {
    return Array.from(this.processes.values());
  }
}
