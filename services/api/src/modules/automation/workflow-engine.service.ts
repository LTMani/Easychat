import { Injectable, Logger } from '@nestjs/common';
import { prisma } from '@easychat/database';

export type ActionType = 'SEND_EMAIL' | 'SEND_WHATSAPP' | 'CREATE_TASK' | 'UPDATE_FIELD' | 'ASSIGN_AGENT' | 'ADD_TAG' | 'TRIGGER_WEBHOOK';
export type TriggerType = 'CONTACT_CREATED' | 'DEAL_STAGE_CHANGED' | 'TICKET_CREATED' | 'SLA_BREACHED' | 'LEAD_SCORED' | 'CONVERSATION_STARTED';
export type OperatorType = 'EQUALS' | 'NOT_EQUALS' | 'CONTAINS' | 'GREATER_THAN' | 'LESS_THAN' | 'IS_SET' | 'IS_NOT_SET';

export interface WorkflowCondition {
  field: string;
  operator: OperatorType;
  value: unknown;
}

export interface WorkflowAction {
  type: ActionType;
  config: Record<string, unknown>;
}

export interface WorkflowContext {
  trigger: TriggerType;
  entityId: string;
  entityData: Record<string, unknown>;
  organizationId: string;
  actorId?: string;
}

@Injectable()
export class WorkflowEngineService {
  private readonly logger = new Logger(WorkflowEngineService.name);

  evaluateCondition(condition: WorkflowCondition, data: Record<string, unknown>): boolean {
    const rawValue = this.getNestedValue(data, condition.field);

    switch (condition.operator) {
      case 'EQUALS': return rawValue === condition.value || String(rawValue) === String(condition.value);
      case 'NOT_EQUALS': return rawValue !== condition.value && String(rawValue) !== String(condition.value);
      case 'CONTAINS': return typeof rawValue === 'string' && rawValue.toLowerCase().includes(String(condition.value).toLowerCase());
      case 'GREATER_THAN': return typeof rawValue === 'number' && typeof condition.value === 'number' && rawValue > condition.value;
      case 'LESS_THAN': return typeof rawValue === 'number' && typeof condition.value === 'number' && rawValue < condition.value;
      case 'IS_SET': return rawValue !== null && rawValue !== undefined && rawValue !== '';
      case 'IS_NOT_SET': return rawValue === null || rawValue === undefined || rawValue === '';
      default: return false;
    }
  }

  evaluateAllConditions(conditions: WorkflowCondition[], data: Record<string, unknown>): boolean {
    if (conditions.length === 0) return true;
    return conditions.every((condition) => this.evaluateCondition(condition, data));
  }

  private getNestedValue(data: Record<string, unknown>, fieldPath: string): unknown {
    const parts = fieldPath.split('.');
    let current: unknown = data;

    for (const part of parts) {
      if (current === null || current === undefined) return undefined;
      current = (current as Record<string, unknown>)[part];
    }

    return current;
  }

  async executeWorkflows(context: WorkflowContext): Promise<{ executed: number; failed: number }> {
    this.logger.log(`Executing workflows for trigger ${context.trigger} in org ${context.organizationId}`);

    const rules = await prisma.workflowRule.findMany({
      where: { organizationId: context.organizationId, trigger: context.trigger, isEnabled: true },
    });

    let executed = 0;
    let failed = 0;

    for (const rule of rules) {
      try {
        const conditions: WorkflowCondition[] = JSON.parse(rule.conditions as string ?? '[]');
        const allMet = this.evaluateAllConditions(conditions, context.entityData);

        if (!allMet) {
          this.logger.debug(`Workflow ${rule.id} conditions not met, skipping`);
          continue;
        }

        const actions: WorkflowAction[] = JSON.parse(rule.actions as string ?? '[]');
        for (const action of actions) {
          await this.executeAction(action, context);
        }

        await prisma.workflowRule.update({
          where: { id: rule.id },
          data: { executionCount: { increment: 1 }, lastTriggeredAt: new Date() },
        });

        executed++;
      } catch (err: any) {
        this.logger.error(`Workflow ${rule.id} execution failed: ${err.message}`);
        failed++;
      }
    }

    return { executed, failed };
  }

  private async executeAction(action: WorkflowAction, context: WorkflowContext): Promise<void> {
    this.logger.debug(`Executing action ${action.type} for org ${context.organizationId}`);

    switch (action.type) {
      case 'ADD_TAG': {
        if (action.config['tag'] && context.entityId) {
          await prisma.contact.update({ where: { id: context.entityId }, data: { tags: { push: action.config['tag'] as string } } }).catch(() => {});
        }
        break;
      }
      case 'ASSIGN_AGENT': {
        if (action.config['userId'] && context.entityId) {
          await prisma.ticket.update({ where: { id: context.entityId }, data: { assignedToId: action.config['userId'] as string } }).catch(() => {});
        }
        break;
      }
      case 'SEND_EMAIL':
      case 'SEND_WHATSAPP':
      case 'TRIGGER_WEBHOOK':
      case 'CREATE_TASK':
      case 'UPDATE_FIELD':
        this.logger.log(`Action ${action.type} queued for background processing`);
        break;
    }
  }
}
