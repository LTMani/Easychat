import { Injectable, Logger } from '@nestjs/common';
import * as crypto from 'crypto';

export interface TurnServerNode {
  nodeId: string;
  region: 'US_EAST' | 'US_WEST' | 'EU_CENTRAL' | 'AP_SOUTHEAST';
  turnUri: string;
  stunUri: string;
  loadPercent: number;
  health: 'HEALTHY' | 'DEGRADED';
}

export interface EphemeralTurnCredential {
  username: string;
  credentialToken: string;
  turnUris: string[];
  expiresAtIso: string;
}

@Injectable()
export class TurnRelayClusterTopologyService {
  private readonly logger = new Logger(TurnRelayClusterTopologyService.name);
  private readonly turnAuthSecret = 'webrtc_turn_ephemeral_token_secret_2026';

  private readonly clusterNodes: TurnServerNode[] = [
    { nodeId: 'turn_iad_01', region: 'US_EAST', turnUri: 'turn:turn-iad.na.easychat.io:3478', stunUri: 'stun:stun-iad.na.easychat.io:3478', loadPercent: 34, health: 'HEALTHY' },
    { nodeId: 'turn_fra_01', region: 'EU_CENTRAL', turnUri: 'turn:turn-fra.eu.easychat.io:3478', stunUri: 'stun:stun-fra.eu.easychat.io:3478', loadPercent: 28, health: 'HEALTHY' },
    { nodeId: 'turn_sin_01', region: 'AP_SOUTHEAST', turnUri: 'turn:turn-sin.ap.easychat.io:3478', stunUri: 'stun:stun-sin.ap.easychat.io:3478', loadPercent: 19, health: 'HEALTHY' },
  ];

  generateEphemeralTurnToken(userId: string, ttlSeconds: number = 86400): EphemeralTurnCredential {
    const unixExpiry = Math.floor(Date.now() / 1000) + ttlSeconds;
    const username = `${unixExpiry}:${userId}`;
    const token = crypto.createHmac('sha1', this.turnAuthSecret).update(username).digest('base64');

    return {
      username,
      credentialToken: token,
      turnUris: this.clusterNodes.map((n) => n.turnUri),
      expiresAtIso: new Date(unixExpiry * 1000).toISOString(),
    };
  }

  getClusterNodes(): TurnServerNode[] {
    return [...this.clusterNodes];
  }
}
