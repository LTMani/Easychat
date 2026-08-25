import { Test, TestingModule } from '@nestjs/testing';
import { ConversationsOmniController } from '../src/modules/controllers/conversations-omni.controller';
import { OmnichannelChannelManagerService } from '../src/modules/omnichannel/omnichannel-channel-manager.service';
import { NlpExtractionService } from '../src/modules/ai/nlp-extraction.service';

describe('ConversationsOmniController', () => {
  let controller: ConversationsOmniController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConversationsOmniController],
      providers: [OmnichannelChannelManagerService, NlpExtractionService],
    }).compile();
    controller = module.get<ConversationsOmniController>(ConversationsOmniController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should validate and dispatch outbound message with NLP intent classification', async () => {
    const res = await controller.sendMessage('conv_123', {
      content: 'Can you please provide volume pricing for 50 seats?',
      channel: 'LIVE_CHAT',
    });

    expect(res.status).toBe('success');
    expect(res.data.nlp.intent).toBeDefined();
  });
});
