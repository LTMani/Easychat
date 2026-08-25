import { Injectable } from '@nestjs/common';

export type AstOperator =
  | 'EQUALS'
  | 'NOT_EQUALS'
  | 'CONTAINS'
  | 'STARTS_WITH'
  | 'ENDS_WITH'
  | 'GREATER_THAN'
  | 'GREATER_EQUAL'
  | 'LESS_THAN'
  | 'LESS_EQUAL'
  | 'IN'
  | 'NOT_IN';

export interface AstConditionNode {
  attributePath: string;
  operator: AstOperator;
  expectedValue: any;
}

export interface AstGroupNode {
  logic: 'AND' | 'OR';
  conditions: (AstConditionNode | AstGroupNode)[];
}

@Injectable()
export class AstEvaluatorService {
  public evaluate(group: AstGroupNode, context: Record<string, any>): boolean {
    if (!group || !group.conditions || group.conditions.length === 0) {
      return true;
    }

    if (group.logic === 'AND') {
      return group.conditions.every((child) => this.evaluateNode(child, context));
    } else {
      return group.conditions.some((child) => this.evaluateNode(child, context));
    }
  }

  private evaluateNode(node: AstConditionNode | AstGroupNode, context: Record<string, any>): boolean {
    if ('logic' in node) {
      return this.evaluate(node as AstGroupNode, context);
    }
    return this.evaluateCondition(node as AstConditionNode, context);
  }

  private evaluateCondition(cond: AstConditionNode, context: Record<string, any>): boolean {
    const actualValue = this.resolvePath(context, cond.attributePath);
    const expected = cond.expectedValue;

    switch (cond.operator) {
      case 'EQUALS':
        return actualValue === expected;
      case 'NOT_EQUALS':
        return actualValue !== expected;
      case 'CONTAINS':
        return typeof actualValue === 'string' && actualValue.toLowerCase().includes(String(expected).toLowerCase());
      case 'STARTS_WITH':
        return typeof actualValue === 'string' && actualValue.toLowerCase().startsWith(String(expected).toLowerCase());
      case 'ENDS_WITH':
        return typeof actualValue === 'string' && actualValue.toLowerCase().endsWith(String(expected).toLowerCase());
      case 'GREATER_THAN':
        return Number(actualValue) > Number(expected);
      case 'GREATER_EQUAL':
        return Number(actualValue) >= Number(expected);
      case 'LESS_THAN':
        return Number(actualValue) < Number(expected);
      case 'LESS_EQUAL':
        return Number(actualValue) <= Number(expected);
      case 'IN':
        return Array.isArray(expected) && expected.includes(actualValue);
      case 'NOT_IN':
        return Array.isArray(expected) && !expected.includes(actualValue);
      default:
        return false;
    }
  }

  private resolvePath(obj: any, path: string): any {
    if (!obj || !path) return undefined;
    const parts = path.split('.');
    let curr = obj;
    for (const part of parts) {
      if (curr === null || curr === undefined) return undefined;
      curr = curr[part];
    }
    return curr;
  }
}
