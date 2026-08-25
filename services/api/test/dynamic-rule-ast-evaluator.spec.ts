import { Test, TestingModule } from '@nestjs/testing';
import { DynamicRuleAstEvaluatorService, AstRuleGroupNode } from '../src/modules/automation/dynamic-rule-ast-evaluator.service';

describe('DynamicRuleAstEvaluatorService', () => {
  let service: DynamicRuleAstEvaluatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DynamicRuleAstEvaluatorService],
    }).compile();
    service = module.get<DynamicRuleAstEvaluatorService>(DynamicRuleAstEvaluatorService);
  });

  it('should evaluate nested AND/OR condition groups successfully', () => {
    const rule: AstRuleGroupNode = {
      logicalCombinator: 'AND',
      conditions: [
        { field: 'country', operator: 'EQUALS', value: 'US' },
        { field: 'dealAmount', operator: 'GREATER_THAN', value: 10000 },
        {
          logicalCombinator: 'OR',
          conditions: [
            { field: 'leadSource', operator: 'EQUALS', value: 'ORGANIC' },
            { field: 'isVip', operator: 'EQUALS', value: true },
          ],
        },
      ],
    };

    const contextMatch = { country: 'US', dealAmount: 25000, leadSource: 'ORGANIC', isVip: false };
    const res1 = service.evaluateRuleGroup(rule, contextMatch);
    expect(res1.isMatched).toBe(true);

    const contextFail = { country: 'GB', dealAmount: 5000, leadSource: 'ADS', isVip: false };
    const res2 = service.evaluateRuleGroup(rule, contextFail);
    expect(res2.isMatched).toBe(false);
  });
});
