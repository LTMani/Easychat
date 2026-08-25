import { Module } from '@nestjs/common';
import { TelephonyController } from './telephony.controller';
import { TelephonyService } from './telephony.service';
import { IvrFlowService } from './ivr-flow.service';

@Module({
  controllers: [TelephonyController],
  providers: [TelephonyService, IvrFlowService],
  exports: [TelephonyService, IvrFlowService],
})
export class TelephonyModule {}
