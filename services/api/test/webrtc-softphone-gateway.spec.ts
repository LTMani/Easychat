import { Test, TestingModule } from '@nestjs/testing';
import { WebRtcSoftphoneGatewayService } from '../src/modules/telephony/webrtc-softphone-gateway.service';

describe('WebRtcSoftphoneGatewayService', () => {
  let service: WebRtcSoftphoneGatewayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebRtcSoftphoneGatewayService],
    }).compile();
    service = module.get<WebRtcSoftphoneGatewayService>(WebRtcSoftphoneGatewayService);
  });

  it('should mint valid WebRTC voice token for agent identity', () => {
    const token = service.mintAgentVoiceToken('agent_sarah', ['+14155550192']);
    expect(token.identity).toBe('agent_sarah');
    expect(token.token).toContain('ech_rtc_');
    expect(token.allowedOutboundCallerIds).toContain('+14155550192');
  });
});
