import { EasyChatHttpClient } from '../client';

export class CallQualityResource {
  constructor(private readonly client: EasyChatHttpClient) {}

  async evaluateMos(telemetry: {
    callId: string;
    packetLossPercent: number;
    jitterMs: number;
    roundTripTimeMs: number;
    audioCodec: string;
  }) {
    return this.client.request('/v1/telephony/webrtc/evaluate-mos', {
      method: 'POST',
      body: JSON.stringify(telemetry),
    });
  }

  async getTurnCredentials(userId?: string) {
    const q = userId ? `?userId=${encodeURIComponent(userId)}` : '';
    return this.client.request(`/v1/telephony/webrtc/turn/credentials${q}`);
  }

  async getTurnNodes() {
    return this.client.request('/v1/telephony/webrtc/turn/nodes');
  }
}
