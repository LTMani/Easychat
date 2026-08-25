import { Controller, Get, Post, Body, BadRequestException } from '@nestjs/common';
import { SessionBorderControllerService } from '../telephony/session-border-controller.service';

@Controller('v1/telephony/sbc')
export class SbcTelephonyController {
  constructor(private readonly sbcService: SessionBorderControllerService) {}

  @Get('sessions')
  async listSessions() {
    const list = this.sbcService.listActiveSessions();
    return {
      status: 'success',
      data: list,
    };
  }

  @Post('invite')
  async initiateInvite(
    @Body()
    body: {
      fromUri: string;
      toUri: string;
      carrierFqdn?: string;
    },
  ) {
    if (!body.fromUri || !body.toUri) {
      throw new BadRequestException('fromUri and toUri are required');
    }

    const session = this.sbcService.initiateSipInvite(body.fromUri, body.toUri, body.carrierFqdn);
    return {
      status: 'success',
      data: session,
    };
  }
}
