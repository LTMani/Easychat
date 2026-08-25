import { Test, TestingModule } from '@nestjs/testing';
import { IvrFlowBuilderService, IvrFlow } from '../src/modules/telephony/ivr-flow-builder.service';

describe('IvrFlowBuilderService', () => {
  let service: IvrFlowBuilderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IvrFlowBuilderService],
    }).compile();
    service = module.get<IvrFlowBuilderService>(IvrFlowBuilderService);
  });

  it('should navigate IVR flow based on DTMF digit keypress', () => {
    const flow: IvrFlow = {
      id: 'flow_1',
      name: 'Main Menu',
      rootNodeId: 'node_welcome',
      nodes: {
        node_welcome: {
          id: 'node_welcome',
          type: 'GATHER_DTMF',
          promptText: 'Press 1 for Sales, Press 2 for Support',
          dtmfOptions: { '1': 'node_sales', '2': 'node_support' },
        },
        node_sales: {
          id: 'node_sales',
          type: 'ROUTE_QUEUE',
          promptText: 'Transferring to Sales representative',
          targetQueue: 'sales_queue',
        },
        node_support: {
          id: 'node_support',
          type: 'ROUTE_QUEUE',
          promptText: 'Transferring to Support engineer',
          targetQueue: 'support_queue',
        },
      },
    };

    const res = service.executeNode(flow, 'node_welcome', '1');
    expect(res.nextNodeId).toBe('node_sales');
    expect(res.action).toBe('ROUTE_QUEUE');
    expect(res.prompt).toContain('Sales representative');
  });
});
