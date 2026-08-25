import { z } from 'zod';

export const RuleOperatorEnum = z.enum([
  'EQUALS',
  'NOT_EQUALS',
  'CONTAINS',
  'DOES_NOT_CONTAIN',
  'GREATER_THAN',
  'LESS_THAN',
  'IN_LIST',
  'MATCHES_REGEX',
]);

export const AstConditionNodeSchema: z.ZodType<any> = z.lazy(() =>
  z.object({
    field: z.string().min(1),
    operator: RuleOperatorEnum,
    value: z.any(),
  }),
);

export const AstRuleGroupNodeSchema: z.ZodType<any> = z.lazy(() =>
  z.object({
    logicalCombinator: z.enum(['AND', 'OR']),
    conditions: z.array(z.union([AstConditionNodeSchema, AstRuleGroupNodeSchema])),
  }),
);

export type AstConditionNode = z.infer<typeof AstConditionNodeSchema>;
export type AstRuleGroupNode = z.infer<typeof AstRuleGroupNodeSchema>;
