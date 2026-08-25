import { Injectable, Logger } from '@nestjs/common';

export interface IpRule {
  ruleId: string;
  cidrBlock: string;
  description: string;
  enforceMfaIfOutside: boolean;
  status: 'ACTIVE' | 'DISABLED';
}

@Injectable()
export class ZeroTrustIpAllowlistService {
  private readonly logger = new Logger(ZeroTrustIpAllowlistService.name);

  private readonly rules: IpRule[] = [
    { ruleId: 'ipr_corp_hq', cidrBlock: '192.168.1.0/24', description: 'Corporate HQ VPN Gateway', enforceMfaIfOutside: true, status: 'ACTIVE' },
    { ruleId: 'ipr_datacenter', cidrBlock: '10.0.0.0/16', description: 'AWS VPC Production Interconnect', enforceMfaIfOutside: false, status: 'ACTIVE' },
    { ruleId: 'ipr_office_london', cidrBlock: '172.16.4.0/24', description: 'London Office Static IP', enforceMfaIfOutside: true, status: 'ACTIVE' },
  ];

  isIpAllowed(clientIp: string): { allowed: boolean; matchedRuleId: string | null; requireMfa: boolean } {
    this.logger.debug(`Validating client IP '${clientIp}' against zero-trust allowlist`);

    // Simple IP prefix matching simulation
    for (const r of this.rules) {
      if (r.status === 'ACTIVE') {
        const prefix = r.cidrBlock.split('/')[0].split('.').slice(0, 2).join('.');
        if (clientIp.startsWith(prefix)) {
          return { allowed: true, matchedRuleId: r.ruleId, requireMfa: false };
        }
      }
    }

    return { allowed: true, matchedRuleId: null, requireMfa: true }; // Outside allowed CIDR requires MFA
  }

  listRules(): IpRule[] {
    return [...this.rules];
  }
}
