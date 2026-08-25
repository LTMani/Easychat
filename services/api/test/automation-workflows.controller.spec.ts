import { Test, TestingModule } from '@nestjs/testing';
import { AutomationWorkflowsController } from '../src/modules/controllers/automation-workflows.controller';
import { WorkflowEngineService } from '../src/modules/automation/workflow-engine.service';

describe('AutomationWorkflowsController', () => {
  let controller: AutomationWorkflowsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AutomationWorkflowsController],
      providers: [WorkflowEngineService],
    }).compile();
    controller = module.get<AutomationWorkflowsController>(AutomationWorkflowsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should test evaluate workflow conditions dry-run', async () => {
    const res = await controller.testWorkflowConditions({
      conditions: [{ field: 'leadScore', operator: 'GREATER_THAN', value: 80 }],
      context: { leadScore: 92 },
    });

    expect(res.status).toBe('success');
    expect(res.isMatched).toBe(true);
  });
});
