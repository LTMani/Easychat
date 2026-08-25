import { PipelineVelocityService } from '../src/modules/crm/pipeline-velocity.service';

describe('PipelineVelocityService Unit Tests', () => {
  let velocityService: PipelineVelocityService;

  beforeEach(() => {
    velocityService = new PipelineVelocityService();
  });

  it('should calculate pipeline velocity metric correctly', async () => {
    const result = await velocityService.calculateVelocity('org_1', 'pip_1');
    expect(result.pipelineId).toBe('pip_1');
    expect(result.averageSalesCycleDays).toBe(30);
    expect(typeof result.pipelineVelocityPerDay).toBe('number');
  });
});
