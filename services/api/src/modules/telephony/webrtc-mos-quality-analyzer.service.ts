import { Injectable, Logger } from '@nestjs/common';

export interface WebRtcCallTelemetry {
  callId: string;
  packetLossPercent: number;
  jitterMs: number;
  roundTripTimeMs: number;
  audioCodec: 'OPUS_HD' | 'G711_ULAW' | 'G711_ALAW';
}

export interface MosQualityEvaluation {
  callId: string;
  rFactor: number;        // 0 - 100
  mosScore: number;       // 1.0 - 4.5 (ITU-T G.107 standard)
  qualityRating: 'EXCELLENT' | 'GOOD' | 'FAIR' | 'POOR' | 'UNACCEPTABLE';
  degradationFactors: string[];
}

@Injectable()
export class WebRtcMosQualityAnalyzerService {
  private readonly logger = new Logger(WebRtcMosQualityAnalyzerService.name);

  calculateMosScore(telemetry: WebRtcCallTelemetry): MosQualityEvaluation {
    this.logger.debug(`Evaluating WebRTC call audio quality for call ${telemetry.callId}`);

    const degradations: string[] = [];

    // Basic R-factor baseline calculation based on ITU-T E-model
    let r0 = 93.2; // Theoretical maximum for wideband Opus

    // Effective latency impairment (Id)
    const effectiveLatency = telemetry.roundTripTimeMs / 2 + telemetry.jitterMs * 2;
    let id = 0;
    if (effectiveLatency > 150) {
      id = 0.024 * effectiveLatency + 0.11 * (effectiveLatency - 150);
      degradations.push(`HIGH_LATENCY: Effective one-way delay is ${effectiveLatency.toFixed(0)}ms (>150ms)`);
    } else {
      id = 0.024 * effectiveLatency;
    }

    // Packet loss equipment impairment (Ie)
    const p = telemetry.packetLossPercent;
    let ie = 0;
    if (telemetry.audioCodec === 'OPUS_HD') {
      ie = 10 + 25 * (p / (p + 15)); // Opus packet loss concealment resilience
    } else {
      ie = 15 + 35 * (p / (p + 10)); // G.711 legacy degradation
    }

    if (p > 2.0) {
      degradations.push(`PACKET_LOSS: Packet loss is ${p.toFixed(1)}% (>2.0%)`);
    }
    if (telemetry.jitterMs > 30) {
      degradations.push(`HIGH_JITTER: Jitter buffer expanded to ${telemetry.jitterMs}ms (>30ms)`);
    }

    const rFactor = Math.max(0, Math.min(100, r0 - id - ie));

    // Convert R-factor to MOS (ITU-T G.107 formula)
    let mos = 1.0;
    if (rFactor > 0 && rFactor < 100) {
      mos = 1 + 0.035 * rFactor + rFactor * (rFactor - 60) * (100 - rFactor) * 7e-6;
    } else if (rFactor >= 100) {
      mos = 4.5;
    }

    mos = Math.max(1.0, Math.min(4.5, parseFloat(mos.toFixed(2))));

    let rating: MosQualityEvaluation['qualityRating'] = 'GOOD';
    if (mos >= 4.2) rating = 'EXCELLENT';
    else if (mos >= 3.8) rating = 'GOOD';
    else if (mos >= 3.4) rating = 'FAIR';
    else if (mos >= 2.8) rating = 'POOR';
    else rating = 'UNACCEPTABLE';

    return {
      callId: telemetry.callId,
      rFactor: parseFloat(rFactor.toFixed(1)),
      mosScore: mos,
      qualityRating: rating,
      degradationFactors: degradations,
    };
  }
}
