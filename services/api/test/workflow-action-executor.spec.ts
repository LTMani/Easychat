import { Test, TestingModule } from '@nestjs/testing';
import { WorkflowActionExecutorService } from '../src/modules/automation/engine/workflow-action-executor.service';

describe('WorkflowActionExecutorService', () => {
  let service: WorkflowActionExecutorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkflowActionExecutorService],
    }).compile();

    service = module.get<WorkflowActionExecutorService>(WorkflowActionExecutorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should execute SEND_EMAIL action cleanly', async () => {
    const action = {
      actionType: 'SEND_EMAIL' as const,
      targetEntityId: 'ent_123',
      parameters: { recipientEmail: 'test@client.com' },
    };

    const res = await service.executeAction('org_123', action);

    expect(res.success).toBe(true);
    expect(res.resultSummary).toContain('test@client.com');
  });
});
