import { Module } from '@nestjs/common';
import { MarketingController } from './marketing.controller';
import { CampaignExecutorService } from './campaign-executor.service';
import { EmailTemplateRendererService } from './email-template-renderer.service';

@Module({
  controllers: [MarketingController],
  providers: [CampaignExecutorService, EmailTemplateRendererService],
  exports: [CampaignExecutorService, EmailTemplateRendererService],
})
export class MarketingModule {}
