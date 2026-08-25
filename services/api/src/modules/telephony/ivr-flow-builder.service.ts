import { Injectable, Logger } from '@nestjs/common';

export interface IvrNode {
  id: string;
  type: 'PLAY_AUDIO' | 'GATHER_DTMF' | 'ROUTE_QUEUE' | 'HANGUP';
  promptText: string;
  dtmfOptions?: Record<string, string>; // digit -> targetNodeId
  targetQueue?: string;
}

export interface IvrFlow {
  id: string;
  name: string;
  rootNodeId: string;
  nodes: Record<string, IvrNode>;
}

@Injectable()
export class IvrFlowBuilderService {
  private readonly logger = new Logger(IvrFlowBuilderService.name);

  executeNode(flow: IvrFlow, currentNodeId: string, dtmfDigit?: string): { nextNodeId?: string; action: string; prompt: string } {
    this.logger.debug(`Executing IVR node ${currentNodeId} in flow ${flow.name}`);

    const node = flow.nodes[currentNodeId];
    if (!node) return { action: 'HANGUP', prompt: 'An error occurred. Goodbye.' };

    if (node.type === 'GATHER_DTMF' && dtmfDigit && node.dtmfOptions) {
      const nextId = node.dtmfOptions[dtmfDigit];
      if (nextId && flow.nodes[nextId]) {
        return {
          nextNodeId: nextId,
          action: flow.nodes[nextId].type,
          prompt: flow.nodes[nextId].promptText,
        };
      }
    }

    return {
      nextNodeId: currentNodeId,
      action: node.type,
      prompt: node.promptText,
    };
  }
}
