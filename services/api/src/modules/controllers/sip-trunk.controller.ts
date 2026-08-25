import { Controller, Get, Post, Body, Param, Query, BadRequestException } from '@nestjs/common';
import { SipTrunkManagerService, SipTrunkConfig } from '../telephony/sip-trunk-manager.service';
import { PstnE164ValidatorService } from '../telephony/pstn-e164-validator.service';

@Controller('v1/telephony/trunks')
export class SipTrunkController {
  constructor(
    private readonly trunkService: SipTrunkManagerService,
    private readonly validatorService: PstnE164ValidatorService,
  ) {}

  @Get()
  async listTrunks() {
    const trunks = this.trunkService.listTrunks();
    return {
      status: 'success',
      data: trunks,
    };
  }

  @Post('validate-e164')
  async validateNumber(@Body('phoneNumber') phoneNumber: string) {
    if (!phoneNumber) throw new BadRequestException('phoneNumber is required');
    const result = this.validatorService.validateAndNormalizeE164(phoneNumber);
    return {
      status: 'success',
      data: result,
    };
  }
}
