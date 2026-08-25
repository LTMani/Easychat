import { Module } from '@nestjs/common';
import { WebhooksController } from './webhooks.controller';
import { WebhooksDispatcherService } from './webhooks-dispatcher.service';

@Module({
  controllers: [WebhooksController],
  providers: [WebhooksDispatcherService],
  exports: [WebhooksDispatcherService],
})
export class WebhooksModule {}
