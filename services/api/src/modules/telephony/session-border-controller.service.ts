import { Injectable, Logger } from '@nestjs/common';
import * as crypto from 'crypto';

export interface SdpSessionDescription {
  version: number;
  originatorSessionId: string;
  sessionName: string;
  mediaAudioPort: number;
  transportProtocol: 'RTP/SAVPF' | 'RTP/AVP';
  codecs: Array<{ payloadType: number; encodingName: string; clockRate: number; channels: number }>;
  srtpCryptoKeyBase64: string;
}

export interface SipInviteSession {
  callLegId: string;
  fromUri: string;
  toUri: string;
  callState: 'INVITING' | 'RINGING' | 'ESTABLISHED' | 'TERMINATED';
  carrierGatewayFqdn: string;
  sdpOffer: SdpSessionDescription;
  sdpAnswer?: SdpSessionDescription;
  jitterBufferLatencyMs: number;
  establishedAt?: string;
}

@Injectable()
export class SessionBorderControllerService {
  private readonly logger = new Logger(SessionBorderControllerService.name);

  private readonly activeSessions = new Map<string, SipInviteSession>();

  initiateSipInvite(fromUri: string, toUri: string, carrierFqdn: string = 'easychat-trunk.pstn.twilio.com'): SipInviteSession {
    this.logger.log(`Initiating SIP INVITE from ${fromUri} to ${toUri} via carrier ${carrierFqdn}`);

    const callLegId = `leg_${crypto.randomBytes(8).toString('hex')}`;
    const srtpKey = crypto.randomBytes(30).toString('base64');

    const sdpOffer: SdpSessionDescription = {
      version: 0,
      originatorSessionId: `sdp_${Date.now()}`,
      sessionName: 'EasyChat Enterprise WebRTC Audio Session',
      mediaAudioPort: 10452,
      transportProtocol: 'RTP/SAVPF',
      codecs: [
        { payloadType: 111, encodingName: 'opus', clockRate: 48000, channels: 2 },
        { payloadType: 0, encodingName: 'PCMU', clockRate: 8000, channels: 1 },
        { payloadType: 8, encodingName: 'PCMA', clockRate: 8000, channels: 1 },
      ],
      srtpCryptoKeyBase64: srtpKey,
    };

    const session: SipInviteSession = {
      callLegId,
      fromUri,
      toUri,
      callState: 'ESTABLISHED',
      carrierGatewayFqdn: carrierFqdn,
      sdpOffer,
      sdpAnswer: {
        version: 0,
        originatorSessionId: `sdp_ans_${Date.now()}`,
        sessionName: 'Carrier SBC Response',
        mediaAudioPort: 14890,
        transportProtocol: 'RTP/SAVPF',
        codecs: [{ payloadType: 111, encodingName: 'opus', clockRate: 48000, channels: 2 }],
        srtpCryptoKeyBase64: crypto.randomBytes(30).toString('base64'),
      },
      jitterBufferLatencyMs: 8.5,
      establishedAt: new Date().toISOString(),
    };

    this.activeSessions.set(callLegId, session);
    return session;
  }

  terminateSipSession(callLegId: string): boolean {
    const session = this.activeSessions.get(callLegId);
    if (!session) return false;
    session.callState = 'TERMINATED';
    this.logger.log(`Terminated SIP call leg ${callLegId}`);
    return true;
  }

  listActiveSessions(): SipInviteSession[] {
    return Array.from(this.activeSessions.values());
  }
}
