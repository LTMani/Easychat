import { Test, TestingModule } from '@nestjs/testing';
import { WorkflowEngineService, WorkflowCondition } from '../src/modules/automation/workflow-engine.service';

describe('WorkflowEngineService', () => {
  let service: WorkflowEngineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkflowEngineService],
    }).compile();
    service = module.get<WorkflowEngineService>(WorkflowEngineService);
  });

  it('should be defined', () => expect(service).toBeDefined());

  const testData = { score: 85, priority: 'HIGH', stage: { name: 'Closed Won' }, email: 'jane@example.com', phone: null };

  it('should evaluate EQUALS condition correctly', () => {
    const cond: WorkflowCondition = { field: 'priority', operator: 'EQUALS', value: 'HIGH' };
    expect(service.evaluateCondition(cond, testData)).toBe(true);
  });

  it('should evaluate GREATER_THAN condition correctly', () => {
    const cond: WorkflowCondition = { field: 'score', operator: 'GREATER_THAN', value: 75 };
    expect(service.evaluateCondition(cond, testData)).toBe(true);
  });

  it('should evaluate LESS_THAN condition correctly', () => {
    const cond: WorkflowCondition = { field: 'score', operator: 'LESS_THAN', value: 100 };
    expect(service.evaluateCondition(cond, testData)).toBe(true);
  });

  it('should evaluate nested field path with dot notation', () => {
    const cond: WorkflowCondition = { field: 'stage.name', operator: 'EQUALS', value: 'Closed Won' };
    expect(service.evaluateCondition(cond, testData)).toBe(true);
  });

  it('should evaluate IS_SET for non-null value', () => {
    const cond: WorkflowCondition = { field: 'email', operator: 'IS_SET', value: null };
    expect(service.evaluateCondition(cond, testData)).toBe(true);
  });

  it('should evaluate IS_NOT_SET for null value', () => {
    const cond: WorkflowCondition = { field: 'phone', operator: 'IS_NOT_SET', value: null };
    expect(service.evaluateCondition(cond, testData)).toBe(true);
  });

  it('should evaluate CONTAINS condition on string field', () => {
    const cond: WorkflowCondition = { field: 'email', operator: 'CONTAINS', value: 'example.com' };
    expect(service.evaluateCondition(cond, testData)).toBe(true);
  });

  it('should return true when there are no conditions (unconditional workflow)', () => {
    const result = service.evaluateAllConditions([], testData);
    expect(result).toBe(true);
  });

  it('should return false if any condition fails in AND evaluation', () => {
    const conditions: WorkflowCondition[] = [
      { field: 'score', operator: 'GREATER_THAN', value: 75 },
      { field: 'priority', operator: 'EQUALS', value: 'LOW' }, // This fails
    ];
    expect(service.evaluateAllConditions(conditions, testData)).toBe(false);
  });

  it('should return true if all conditions pass', () => {
    const conditions: WorkflowCondition[] = [
      { field: 'score', operator: 'GREATER_THAN', value: 75 },
      { field: 'priority', operator: 'EQUALS', value: 'HIGH' },
    ];
    expect(service.evaluateAllConditions(conditions, testData)).toBe(true);
  });
});
