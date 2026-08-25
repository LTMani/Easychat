import { Controller, Get, Post, Body, Query, BadRequestException } from '@nestjs/common';
import { QueueWaitTimeForecasterService } from '../support/queue-wait-time-forecaster.service';
import { ConversationSentimentTimelineService } from '../support/conversation-sentiment-timeline.service';

@Controller('v1/support/queue-analytics')
export class QueueAnalyticsController {
  constructor(
    private readonly queueService: QueueWaitTimeForecasterService,
    private readonly sentimentService: ConversationSentimentTimelineService,
  ) {}

  @Post('erlang-c')
  async calculateErlang(
    @Body()
    body: {
      queueName: string;
      agents: number;
      arrivalRatePerHour: number;
      ahtSeconds: number;
    },
  ) {
    const result = this.queueService.calculateErlangC(
      body.queueName || 'General Support',
      body.agents || 8,
      body.arrivalRatePerHour || 120,
      body.ahtSeconds || 180,
    );
    return {
      status: 'success',
      data: result,
    };
  }

  @Post('sentiment/analyze')
  async analyzeSentiment(
    @Body()
    body: {
      conversationId: string;
      turns: Array<{ speaker: 'CUSTOMER' | 'AGENT' | 'AI_BOT'; text: string }>;
    },
  ) {
    if (!body.conversationId || !body.turns) {
      throw new BadRequestException('conversationId and turns are required');
    }

    const result = this.sentimentService.analyzeTranscript(body.conversationId, body.turns);
    return {
      status: 'success',
      data: result,
    };
  }
}
