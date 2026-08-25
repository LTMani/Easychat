import { Injectable, Logger } from '@nestjs/common';
import * as crypto from 'crypto';

export interface WebRtcSessionToken {
  identity: string;
  token: string;
  expiresInSeconds: number;
  allowedOutboundCallerIds: string[];
}

@Injectable()
export class WebRtcSoftphoneGatewayService {
  private readonly logger = new Logger(WebRtcSoftphoneGatewayService.name);

  mintAgentVoiceToken(agentId: string, allowedNumbers: string[] = ['+14155550192']): WebRtcSessionToken {
    this.logger.debug(`Minting WebRTC softphone voice session token for agent ${agentId}`);

    const randomSecret = crypto.randomBytes(32).toString('hex');
    const token = `ech_rtc_${Buffer.from(`${agentId}:${Date.now()}:${randomSecret}`).toString('base64url')}`;

    return {
      identity: agentId,
      token,
      expiresInSeconds: 3600, // 1 hour voice session
      allowedOutboundCallerIds: allowedNumbers,
    };
  }
}
