import { Module } from '@nestjs/common';
import { TicketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';
import { KnowledgeBaseController } from './knowledge-base.controller';
import { KnowledgeBaseService } from './knowledge-base.service';

@Module({
  controllers: [TicketsController, KnowledgeBaseController],
  providers: [TicketsService, KnowledgeBaseService],
  exports: [TicketsService, KnowledgeBaseService],
})
export class SupportModule {}
