import { Injectable, Logger } from '@nestjs/common';

export interface IvrNode {
  id: string;
  type: 'GREETING' | 'MENU_OPTION' | 'QUEUE_TRANSFER' | 'HANGUP';
  promptText: string;
  dtmfDigit?: string;
  targetQueueId?: string;
}

@Injectable()
export class IvrFlowService {
  private readonly logger = new Logger(IvrFlowService.name);

  async evaluateDtmfInput(
    flowNodes: IvrNode[],
    currentNodeId: string,
    digit: string
  ): Promise<IvrNode | null> {
    this.logger.log(`Evaluating IVR DTMF digit '${digit}' from current node '${currentNodeId}'`);

    const matchingNode = flowNodes.find(
      (node) => node.dtmfDigit === digit || node.id === currentNodeId
    );

    return matchingNode || null;
  }
}
