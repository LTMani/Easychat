import { Module } from '@nestjs/common';
import { ConversationsController } from './conversations.controller';
import { ConversationsService } from './conversations.service';
import { ConversationIntentService } from './conversation-intent.service';
import { RealtimeModule } from '../realtime/realtime.module';

@Module({
  imports: [RealtimeModule],
  controllers: [ConversationsController],
  providers: [ConversationsService, ConversationIntentService],
  exports: [ConversationsService, ConversationIntentService],
})
export class ConversationsModule {}
