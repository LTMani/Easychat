import { Module } from '@nestjs/common';
import { AutomationController } from './automation.controller';
import { AutomationService } from './automation.service';
import { AstEvaluatorService } from './engine/ast-evaluator.service';
import { GraphResolverService } from './engine/graph-resolver.service';
import { WorkflowActionsService } from './engine/workflow-actions.service';
import { WorkflowSchedulerService } from './engine/workflow-scheduler.service';
import { WorkflowActionExecutorService } from './engine/workflow-action-executor.service';

@Module({
  controllers: [AutomationController],
  providers: [
    AutomationService,
    AstEvaluatorService,
    GraphResolverService,
    WorkflowActionsService,
    WorkflowSchedulerService,
    WorkflowActionExecutorService,
  ],
  exports: [
    AutomationService,
    AstEvaluatorService,
    GraphResolverService,
    WorkflowActionsService,
    WorkflowSchedulerService,
    WorkflowActionExecutorService,
  ],
})
export class AutomationModule {}
