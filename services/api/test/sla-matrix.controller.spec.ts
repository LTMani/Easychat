import { Test, TestingModule } from '@nestjs/testing';
import { SlaMatrixController } from '../src/modules/controllers/sla-matrix.controller';
import { SlaEscalationMatrixService } from '../src/modules/sla/sla-escalation-matrix.service';

describe('SlaMatrixController', () => {
  let controller: SlaMatrixController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SlaMatrixController],
      providers: [SlaEscalationMatrixService],
    }).compile();
    controller = module.get<SlaMatrixController>(SlaMatrixController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should evaluate ticket SLA threshold status', async () => {
    const res = await controller.evaluateSla({
      ticketId: 'tkt_1001',
      elapsedMinutes: 55,
      targetMinutes: 60,
    });

    expect(res.status).toBe('success');
    expect(res.data.urgencyLevel).toBe('CRITICAL_80_PCT');
  });
});
