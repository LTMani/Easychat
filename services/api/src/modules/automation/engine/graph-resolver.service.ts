import { Injectable } from '@nestjs/common';
import { AstEvaluatorService, AstGroupNode } from './ast-evaluator.service';

export interface WorkflowGraphNode {
  id: string;
  type: 'TRIGGER' | 'CONDITION' | 'ACTION' | 'DELAY' | 'BRANCH';
  title: string;
  config: Record<string, any>;
  astRule?: AstGroupNode;
}

export interface WorkflowGraphEdge {
  id: string;
  sourceNodeId: string;
  targetNodeId: string;
  conditionBranch?: 'TRUE' | 'FALSE';
}

export interface ExecutionTraceStep {
  nodeId: string;
  nodeTitle: string;
  type: string;
  status: 'EXECUTED' | 'SKIPPED' | 'FAILED';
  inputContext: any;
  outputResult?: any;
  timestamp: string;
}

@Injectable()
export class GraphResolverService {
  constructor(private astEvaluator: AstEvaluatorService) {}

  public resolveExecution(
    nodes: WorkflowGraphNode[],
    edges: WorkflowGraphEdge[],
    initialContext: Record<string, any>,
  ): ExecutionTraceStep[] {
    const trace: ExecutionTraceStep[] = [];
    const triggerNode = nodes.find((n) => n.type === 'TRIGGER');
    if (!triggerNode) return trace;

    let currentNode: WorkflowGraphNode | undefined = triggerNode;
    let context = { ...initialContext };

    while (currentNode) {
      const step: ExecutionTraceStep = {
        nodeId: currentNode.id,
        nodeTitle: currentNode.title,
        type: currentNode.type,
        status: 'EXECUTED',
        inputContext: { ...context },
        timestamp: new Date().toISOString(),
      };

      if (currentNode.type === 'CONDITION' && currentNode.astRule) {
        const passed = this.astEvaluator.evaluate(currentNode.astRule, context);
        step.outputResult = { conditionPassed: passed };
        trace.push(step);

        const edge = edges.find(
          (e) => e.sourceNodeId === currentNode?.id && e.conditionBranch === (passed ? 'TRUE' : 'FALSE'),
        );
        currentNode = edge ? nodes.find((n) => n.id === edge.targetNodeId) : undefined;
      } else {
        step.outputResult = { actionTriggered: true };
        trace.push(step);

        const nextEdge = edges.find((e) => e.sourceNodeId === currentNode?.id);
        currentNode = nextEdge ? nodes.find((n) => n.id === nextEdge.targetNodeId) : undefined;
      }
    }

    return trace;
  }
}
