import { z } from 'zod';

export const BpmnNodeTypeSchema = z.enum([
  'START_EVENT',
  'SERVICE_TASK',
  'EXCLUSIVE_GATEWAY',
  'PARALLEL_GATEWAY',
  'TIMER_BOUNDARY_EVENT',
  'USER_APPROVAL_TASK',
  'END_EVENT',
]);

export const BpmnNodeDefinitionSchema = z.object({
  nodeId: z.string(),
  type: BpmnNodeTypeSchema,
  label: z.string(),
  handlerService: z.string().optional(),
  conditionalExpression: z.string().optional(),
  nextNodes: z.array(z.string()),
});

export const BpmnProcessDefinitionSchema = z.object({
  processId: z.string(),
  name: z.string(),
  version: z.number().int().positive(),
  startNodeId: z.string(),
  nodes: z.record(BpmnNodeDefinitionSchema),
});

export type BpmnProcessDefinitionDto = z.infer<typeof BpmnProcessDefinitionSchema>;
