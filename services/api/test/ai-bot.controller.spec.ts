import { Test, TestingModule } from '@nestjs/testing';
import { AiBotController } from '../src/modules/controllers/ai-bot.controller';
import { AiCustomerSupportBotService } from '../src/modules/ai/ai-customer-support-bot.service';

describe('AiBotController', () => {
  let controller: AiBotController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AiBotController],
      providers: [AiCustomerSupportBotService],
    }).compile();
    controller = module.get<AiBotController>(AiBotController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should respond to customer inquiry with accurate data and citations', async () => {
    const res = await controller.respondToCustomer({
      message: 'What are your SLA guarantees for enterprise?',
    });

    expect(res.status).toBe('success');
    expect(res.data.messageText).toContain('15-minute first response');
    expect(res.data.citations.length).toBeGreaterThan(0);
  });
});
