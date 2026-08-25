import { Injectable, Logger } from '@nestjs/common';
import { prisma } from '@easychat/database';
import { ApiResponse } from '@easychat/shared';
import { GraphResolverService } from './graph-resolver.service';
import { WorkflowActionsService } from './workflow-actions.service';

@Injectable()
export class WorkflowSchedulerService {
  private readonly logger = new Logger(WorkflowSchedulerService.name);

  constructor(
    private graphResolver: GraphResolverService,
    private workflowActions: WorkflowActionsService,
  ) {}

  public async processScheduledWorkflows(): Promise<ApiResponse> {
    this.logger.log('Executing automated periodic workflow scheduler check...');

    // 1. Find all active workflow rules
    const activeRules = await prisma.workflowRule.findMany({
      where: { isActive: true },
      include: {
        nodes: true,
        edges: true,
      },
    });

    const executionResults = [];

    for (const rule of activeRules) {
      try {
        const parsedNodes = rule.nodes.map((n) => ({
          id: n.id,
          type: n.nodeType as any,
          title: n.label,
          config: JSON.parse(n.config || '{}'),
        }));

        const parsedEdges = rule.edges.map((e) => ({
          id: e.id,
          sourceNodeId: e.sourceNodeId,
          targetNodeId: e.targetNodeId,
        }));

        const trace = this.graphResolver.resolveExecution(parsedNodes, parsedEdges, {
          ruleId: rule.id,
          organizationId: rule.organizationId,
          scheduledTriggerTime: new Date().toISOString(),
        });

        // Log execution to database
        const executionLog = await prisma.workflowExecution.create({
          data: {
            workflowRuleId: rule.id,
            status: 'SUCCESS',
            output: JSON.stringify(trace),
          },
        });

        executionResults.push({
          ruleId: rule.id,
          ruleName: rule.name,
          executionId: executionLog.id,
          stepCount: trace.length,
        });
      } catch (err: any) {
        this.logger.error(`Error processing workflow rule [${rule.id}]: ${err.message}`);
        await prisma.workflowExecution.create({
          data: {
            workflowRuleId: rule.id,
            status: 'FAILED',
            output: JSON.stringify({ error: err.message }),
          },
        });
      }
    }

    return {
      success: true,
      message: `Processed ${activeRules.length} scheduled workflow rules`,
      data: executionResults,
    };
  }
}
