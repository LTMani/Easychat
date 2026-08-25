import { SlaEvaluatorService } from '../src/modules/sla/sla-evaluator.service';

describe('SlaEvaluatorService Unit Tests', () => {
  let evaluator: SlaEvaluatorService;

  beforeEach(() => {
    evaluator = new SlaEvaluatorService();
  });

  it('should calculate correct SLA target dates for ticket priority', async () => {
    const createdAt = new Date('2026-01-01T10:00:00Z');
    const result = await evaluator.calculateTicketSla('org_123', 'URGENT', createdAt);

    expect(result.firstResponseDueAt).toBeDefined();
    expect(result.resolutionDueAt).toBeDefined();
    expect(result.firstResponseDueAt.getTime()).toBeGreaterThan(createdAt.getTime());
    expect(result.resolutionDueAt.getTime()).toBeGreaterThan(result.firstResponseDueAt.getTime());
  });

  it('should detect when SLA targets are breached', async () => {
    const pastDate = new Date(Date.now() - 1000 * 60 * 60 * 24); // 24 hours ago
    const result = await evaluator.calculateTicketSla('org_123', 'HIGH', pastDate);

    expect(result.isBreachedFirstResponse).toBe(true);
    expect(result.isBreachedResolution).toBe(true);
  });
});
