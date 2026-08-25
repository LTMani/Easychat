import { Test, TestingModule } from '@nestjs/testing';
import { WebRtcMosQualityAnalyzerService } from '../src/modules/telephony/webrtc-mos-quality-analyzer.service';

describe('WebRtcMosQualityAnalyzerService', () => {
  let service: WebRtcMosQualityAnalyzerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebRtcMosQualityAnalyzerService],
    }).compile();
    service = module.get<WebRtcMosQualityAnalyzerService>(WebRtcMosQualityAnalyzerService);
  });

  it('should score pristine Opus audio calls as EXCELLENT MOS > 4.2', () => {
    const res = service.calculateMosScore({
      callId: 'call_pristine_01',
      packetLossPercent: 0.1,
      jitterMs: 4,
      roundTripTimeMs: 45,
      audioCodec: 'OPUS_HD',
    });

    expect(res.mosScore).toBeGreaterThanOrEqual(4.2);
    expect(res.qualityRating).toBe('EXCELLENT');
    expect(res.degradationFactors.length).toBe(0);
  });

  it('should detect degraded calls with high packet loss and jitter', () => {
    const res = service.calculateMosScore({
      callId: 'call_degraded_02',
      packetLossPercent: 8.5,
      jitterMs: 75,
      roundTripTimeMs: 380,
      audioCodec: 'G711_ULAW',
    });

    expect(res.mosScore).toBeLessThan(3.5);
    expect(res.degradationFactors.length).toBeGreaterThan(0);
  });
});
