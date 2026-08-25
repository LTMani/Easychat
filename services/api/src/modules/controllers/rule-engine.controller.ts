import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { DynamicRuleAstEvaluatorService, AstRuleGroupNode } from '../automation/dynamic-rule-ast-evaluator.service';
import { OmnichannelTemplateRendererService } from '../automation/omnichannel-template-renderer.service';

@Controller('v1/automation/rules')
export class RuleEngineController {
  constructor(
    private readonly ruleService: DynamicRuleAstEvaluatorService,
    private readonly templateService: OmnichannelTemplateRendererService,
  ) {}

  @Post('evaluate')
  async evaluateRule(
    @Body()
    body: {
      ruleGroup: AstRuleGroupNode;
      contextData: Record<string, any>;
    },
  ) {
    if (!body.ruleGroup || !body.contextData) {
      throw new BadRequestException('ruleGroup and contextData are required');
    }

    const result = this.ruleService.evaluateRuleGroup(body.ruleGroup, body.contextData);
    return {
      status: 'success',
      data: result,
    };
  }

  @Post('templates/render')
  async renderTemplate(
    @Body()
    body: {
      rawTemplate: string;
      variables: Record<string, any>;
      fallbackDefaults?: Record<string, string>;
    },
  ) {
    if (!body.rawTemplate || !body.variables) {
      throw new BadRequestException('rawTemplate and variables are required');
    }

    const result = this.templateService.renderTemplate(body.rawTemplate, body.variables, body.fallbackDefaults);
    return {
      status: 'success',
      data: result,
    };
  }
}
