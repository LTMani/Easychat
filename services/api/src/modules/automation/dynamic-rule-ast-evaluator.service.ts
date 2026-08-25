import { Injectable, Logger } from '@nestjs/common';

export type RuleOperator =
  | 'EQUALS'
  | 'NOT_EQUALS'
  | 'CONTAINS'
  | 'DOES_NOT_CONTAIN'
  | 'GREATER_THAN'
  | 'LESS_THAN'
  | 'IN_LIST'
  | 'MATCHES_REGEX';

export interface AstConditionNode {
  field: string;
  operator: RuleOperator;
  value: any;
}

export interface AstRuleGroupNode {
  logicalCombinator: 'AND' | 'OR';
  conditions: Array<AstConditionNode | AstRuleGroupNode>;
}

export interface AstEvaluationResult {
  isMatched: boolean;
  matchedConditionsCount: number;
  evaluatedNodesCount: number;
  trace: string[];
}

@Injectable()
export class DynamicRuleAstEvaluatorService {
  private readonly logger = new Logger(DynamicRuleAstEvaluatorService.name);

  evaluateRuleGroup(group: AstRuleGroupNode, contextData: Record<string, any>): AstEvaluationResult {
    const trace: string[] = [];
    let matchedCount = 0;
    let totalNodes = 0;

    const evalNode = (node: AstConditionNode | AstRuleGroupNode): boolean => {
      totalNodes++;
      if ('logicalCombinator' in node) {
        if (node.logicalCombinator === 'AND') {
          return node.conditions.every((c) => evalNode(c));
        } else {
          return node.conditions.some((c) => evalNode(c));
        }
      }

      // Single Condition evaluation
      const actualValue = contextData[node.field];
      const targetValue = node.value;
      let matched = false;

      switch (node.operator) {
        case 'EQUALS':
          matched = actualValue === targetValue;
          break;
        case 'NOT_EQUALS':
          matched = actualValue !== targetValue;
          break;
        case 'CONTAINS':
          matched = typeof actualValue === 'string' && actualValue.toLowerCase().includes(String(targetValue).toLowerCase());
          break;
        case 'GREATER_THAN':
          matched = Number(actualValue) > Number(targetValue);
          break;
        case 'LESS_THAN':
          matched = Number(actualValue) < Number(targetValue);
          break;
        case 'IN_LIST':
          matched = Array.isArray(targetValue) && targetValue.includes(actualValue);
          break;
        case 'MATCHES_REGEX':
          matched = new RegExp(targetValue, 'i').test(String(actualValue));
          break;
        default:
          matched = false;
      }

      if (matched) matchedCount++;
      trace.push(`Field '${node.field}' (${actualValue}) ${node.operator} ${targetValue} -> ${matched ? 'PASS' : 'FAIL'}`);
      return matched;
    };

    const isMatched = evalNode(group);

    return {
      isMatched,
      matchedConditionsCount: matchedCount,
      evaluatedNodesCount: totalNodes,
      trace,
    };
  }
}
