import { Test, TestingModule } from '@nestjs/testing';
import { EmailDeliverabilityController } from '../src/modules/controllers/email-deliverability.controller';
import { EmailDeliverabilityHealthService } from '../src/modules/marketing/email-deliverability-health.service';

describe('EmailDeliverabilityController', () => {
  let controller: EmailDeliverabilityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmailDeliverabilityController],
      providers: [EmailDeliverabilityHealthService],
    }).compile();
    controller = module.get<EmailDeliverabilityController>(EmailDeliverabilityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return DNS deliverability health check for domain', async () => {
    const res = await controller.checkDomainDns('acme.com');
    expect(res.status).toBe('success');
    expect(res.data.isReadyForBroadcast).toBe(true);
    expect(res.data.records.length).toBe(4);
  });
});
