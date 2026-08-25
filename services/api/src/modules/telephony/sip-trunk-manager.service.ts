import { Injectable, Logger } from '@nestjs/common';
import * as crypto from 'crypto';

export interface SipTrunkConfig {
  trunkId: string;
  trunkName: string;
  sipDomain: string;
  primaryProxy: string;
  failoverProxy: string;
  supportedCodecs: Array<'G711_ULAW' | 'G711_ALAW' | 'OPUS' | 'G729'>;
  maxConcurrentChannels: number;
  activeChannels: number;
  status: 'ONLINE' | 'DEGRADED' | 'OFFLINE';
}

@Injectable()
export class SipTrunkManagerService {
  private readonly logger = new Logger(SipTrunkManagerService.name);

  private readonly trunks = new Map<string, SipTrunkConfig>([
    [
      'trunk_na_east',
      {
        trunkId: 'trunk_na_east',
        trunkName: 'US East Tier 1 Carrier Trunk',
        sipDomain: 'sip.na-east.easychat.io',
        primaryProxy: 'sip1.us-east.carrier.net:5060',
        failoverProxy: 'sip2.us-east.carrier.net:5060',
        supportedCodecs: ['OPUS', 'G711_ULAW'],
        maxConcurrentChannels: 500,
        activeChannels: 42,
        status: 'ONLINE',
      },
    ],
    [
      'trunk_eu_west',
      {
        trunkId: 'trunk_eu_west',
        trunkName: 'EU West Frankfurt Gateway',
        sipDomain: 'sip.eu-west.easychat.io',
        primaryProxy: 'sip1.fra.carrier.de:5060',
        failoverProxy: 'sip2.fra.carrier.de:5060',
        supportedCodecs: ['G711_ALAW', 'OPUS'],
        maxConcurrentChannels: 250,
        activeChannels: 18,
        status: 'ONLINE',
      },
    ],
  ]);

  registerTrunk(trunk: Omit<SipTrunkConfig, 'trunkId' | 'activeChannels' | 'status'>): SipTrunkConfig {
    const trunkId = `trunk_${crypto.randomBytes(6).toString('hex')}`;
    const newTrunk: SipTrunkConfig = {
      ...trunk,
      trunkId,
      activeChannels: 0,
      status: 'ONLINE',
    };
    this.trunks.set(trunkId, newTrunk);
    return newTrunk;
  }

  listTrunks(): SipTrunkConfig[] {
    return Array.from(this.trunks.values());
  }

  getTrunk(trunkId: string): SipTrunkConfig | null {
    return this.trunks.get(trunkId) || null;
  }
}
