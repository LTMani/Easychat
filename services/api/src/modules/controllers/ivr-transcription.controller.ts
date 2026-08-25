import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { CallTranscriptionSentimentService } from '../telephony/call-transcription-sentiment.service';

@Controller('v1/telephony/transcriptions')
export class IvrTranscriptionController {
  constructor(private readonly sentimentService: CallTranscriptionSentimentService) {}

  @Post('analyze')
  async analyzeCallTranscript(
    @Body()
    body: {
      callSid: string;
      lines: Array<{ speaker: 'CUSTOMER' | 'AGENT'; text: string }>;
    },
  ) {
    if (!body.lines || body.lines.length === 0) {
      throw new BadRequestException('lines array is required');
    }

    const analysis = this.sentimentService.analyzeFullCall(body.lines);
    return {
      status: 'success',
      data: {
        callSid: body.callSid || 'CA_sample',
        ...analysis,
      },
    };
  }
}
