import { Test, TestingModule } from '@nestjs/testing';
import { SoftphoneTelephonyController } from '../src/modules/controllers/softphone-telephony.controller';
import { WebRtcSoftphoneGatewayService } from '../src/modules/telephony/webrtc-softphone-gateway.service';

describe('SoftphoneTelephonyController', () => {
  let controller: SoftphoneTelephonyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SoftphoneTelephonyController],
      providers: [WebRtcSoftphoneGatewayService],
    }).compile();
    controller = module.get<SoftphoneTelephonyController>(SoftphoneTelephonyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should generate agent WebRTC voice session token', async () => {
    const res = await controller.getAgentVoiceToken({ agentId: 'agent_priya' });
    expect(res.status).toBe('success');
    expect(res.data.identity).toBe('agent_priya');
    expect(res.data.token).toContain('ech_rtc_');
  });
});
