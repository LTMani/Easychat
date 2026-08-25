import { Controller, Get, Post, Body, Query, BadRequestException } from '@nestjs/common';
import { WebRtcMosQualityAnalyzerService, WebRtcCallTelemetry } from '../telephony/webrtc-mos-quality-analyzer.service';
import { TurnRelayClusterTopologyService } from '../telephony/turn-relay-cluster-topology.service';

@Controller('v1/telephony/webrtc')
export class WebrtcTelemetryController {
  constructor(
    private readonly mosService: WebRtcMosQualityAnalyzerService,
    private readonly turnService: TurnRelayClusterTopologyService,
  ) {}

  @Post('evaluate-mos')
  async evaluateMos(@Body() body: WebRtcCallTelemetry) {
    if (!body.callId) throw new BadRequestException('callId is required');
    const result = this.mosService.calculateMosScore(body);
    return {
      status: 'success',
      data: result,
    };
  }

  @Get('turn/credentials')
  async getTurnCredentials(@Query('userId') userId: string) {
    const creds = this.turnService.generateEphemeralTurnToken(userId || 'agent_default');
    return {
      status: 'success',
      data: creds,
    };
  }

  @Get('turn/nodes')
  async getTurnNodes() {
    const nodes = this.turnService.getClusterNodes();
    return {
      status: 'success',
      data: nodes,
    };
  }
}
