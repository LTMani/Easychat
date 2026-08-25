import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { WebRtcSoftphoneGatewayService } from '../telephony/webrtc-softphone-gateway.service';

@Controller('v1/telephony/softphone')
export class SoftphoneTelephonyController {
  constructor(private readonly softphoneService: WebRtcSoftphoneGatewayService) {}

  @Post('token')
  async getAgentVoiceToken(
    @Body()
    body: {
      agentId: string;
      allowedNumbers?: string[];
    },
  ) {
    if (!body.agentId) throw new BadRequestException('agentId is required');

    const token = this.softphoneService.mintAgentVoiceToken(
      body.agentId,
      body.allowedNumbers,
    );

    return {
      status: 'success',
      data: token,
    };
  }
}
