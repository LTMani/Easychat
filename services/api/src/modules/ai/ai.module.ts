import { Module } from '@nestjs/common';
import { AiController } from './ai.controller';
import { AiService } from './ai.service';
import { SentimentAnalyzerService } from './sentiment-analyzer.service';

@Module({
  controllers: [AiController],
  providers: [AiService, SentimentAnalyzerService],
  exports: [AiService, SentimentAnalyzerService],
})
export class AiModule {}
