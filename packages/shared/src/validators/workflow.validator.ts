import { z } from 'zod';

export const WorkflowTriggerEnum = z.enum([
  'CONTACT_CREATED',
  'CONTACT_UPDATED',
  'DEAL_CREATED',
  'DEAL_STAGE_CHANGED',
  'DEAL_WON',
  'DEAL_LOST',
  'TICKET_CREATED',
  'TICKET_UPDATED',
  'SLA_BREACHED',
  'LEAD_SCORED',
  'CONVERSATION_STARTED',
  'FORM_SUBMITTED',
]);

export const ConditionOperatorEnum = z.enum([
  'EQUALS',
  'NOT_EQUALS',
  'CONTAINS',
  'DOES_NOT_CONTAIN',
  'GREATER_THAN',
  'LESS_THAN',
  'IS_SET',
  'IS_NOT_SET',
  'IN_LIST',
]);

export const WorkflowActionTypeEnum = z.enum([
  'SEND_EMAIL',
  'SEND_WHATSAPP',
  'CREATE_TASK',
  'UPDATE_FIELD',
  'ASSIGN_AGENT',
  'ADD_TAG',
  'REMOVE_TAG',
  'TRIGGER_WEBHOOK',
  'SEND_SLACK_ALERT',
  'ESCALATE_TICKET',
]);

export const WorkflowConditionSchema = z.object({
  field: z.string().min(1),
  operator: ConditionOperatorEnum,
  value: z.any().optional(),
});

export const WorkflowActionSchema = z.object({
  type: WorkflowActionTypeEnum,
  config: z.record(z.any()),
  order: z.number().int().optional(),
});

export const CreateWorkflowSchema = z.object({
  name: z.string().min(2).max(150),
  description: z.string().max(500).optional(),
  trigger: WorkflowTriggerEnum,
  conditions: z.array(WorkflowConditionSchema).default([]),
  actions: z.array(WorkflowActionSchema).min(1, 'Workflow must contain at least one action'),
  isEnabled: z.boolean().default(true),
});

export type CreateWorkflowInput = z.infer<typeof CreateWorkflowSchema>;
export const UpdateWorkflowSchema = CreateWorkflowSchema.partial();
export type UpdateWorkflowInput = z.infer<typeof UpdateWorkflowSchema>;
