import { Module } from '@nestjs/common';
import { ChannelsService } from './channels.service';
import { ChannelsController } from './channels.controller';
import { WhatsAppBusinessService } from './whatsapp-business.service';
import { WhatsAppCloudApiService } from './whatsapp-cloud-api.service';
import { EmailSmtpService } from './email-smtp.service';
import { TwilioSmsService } from './twilio-sms.service';

@Module({
  controllers: [ChannelsController],
  providers: [ChannelsService, WhatsAppBusinessService, WhatsAppCloudApiService, EmailSmtpService, TwilioSmsService],
  exports: [ChannelsService, WhatsAppBusinessService, WhatsAppCloudApiService, EmailSmtpService, TwilioSmsService],
})
export class ChannelsModule {}
