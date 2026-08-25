import { AstEvaluatorService, AstGroupNode } from '../src/modules/automation/engine/ast-evaluator.service';

describe('AST Evaluator Service', () => {
  let evaluator: AstEvaluatorService;

  beforeEach(() => {
    evaluator = new AstEvaluatorService();
  });

  it('should evaluate GREATER_EQUAL condition correctly', () => {
    const rule: AstGroupNode = {
      logic: 'AND',
      conditions: [
        {
          attributePath: 'leadScore',
          operator: 'GREATER_EQUAL',
          expectedValue: 80,
        },
      ],
    };

    expect(evaluator.evaluate(rule, { leadScore: 85 })).toBe(true);
    expect(evaluator.evaluate(rule, { leadScore: 70 })).toBe(false);
  });

  it('should evaluate CONTAINS condition case-insensitively', () => {
    const rule: AstGroupNode = {
      logic: 'AND',
      conditions: [
        {
          attributePath: 'contact.email',
          operator: 'CONTAINS',
          expectedValue: 'acmecorp.com',
        },
      ],
    };

    expect(evaluator.evaluate(rule, { contact: { email: 'sarah.jenkins@AcmeCorp.com' } })).toBe(true);
  });
});
