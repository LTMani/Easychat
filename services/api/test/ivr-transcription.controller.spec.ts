import { Test, TestingModule } from '@nestjs/testing';
import { IvrTranscriptionController } from '../src/modules/controllers/ivr-transcription.controller';
import { CallTranscriptionSentimentService } from '../src/modules/telephony/call-transcription-sentiment.service';

describe('IvrTranscriptionController', () => {
  let controller: IvrTranscriptionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IvrTranscriptionController],
      providers: [CallTranscriptionSentimentService],
    }).compile();
    controller = module.get<IvrTranscriptionController>(IvrTranscriptionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should analyze call transcript lines and return overall sentiment', async () => {
    const res = await controller.analyzeCallTranscript({
      callSid: 'CA_test_9948',
      lines: [
        { speaker: 'CUSTOMER', text: 'Thank you so much for the excellent support, you guys are awesome!' },
        { speaker: 'AGENT', text: 'You are very welcome! Have a fantastic day.' },
      ],
    });

    expect(res.status).toBe('success');
    expect(res.data.overallSentiment).toBe('POSITIVE');
    expect(res.data.customerSatisfactionEstimateScore).toBeGreaterThanOrEqual(80);
  });
});
