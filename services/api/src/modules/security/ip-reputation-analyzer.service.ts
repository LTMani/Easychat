import { Injectable, Logger } from '@nestjs/common';

export interface IpThreatAssessment {
  ip: string;
  threatScore: number; // 0 - 100
  isTorExitNode: boolean;
  isPublicProxy: boolean;
  isKnownVpn: boolean;
  actionRecommendation: 'ALLOW' | 'CHALLENGE_CAPTCHA' | 'BLOCK';
}

@Injectable()
export class IpReputationAnalyzerService {
  private readonly logger = new Logger(IpReputationAnalyzerService.name);

  // Mock high-risk ranges / known malicious IP subsets
  private readonly BLOCKED_SUBNETS = ['198.51.100.', '203.0.113.', '192.0.2.'];
  private readonly SUSPICIOUS_IPS = new Set(['185.220.101.5', '185.220.101.6', '45.154.255.10']);

  analyzeIp(ip: string): IpThreatAssessment {
    this.logger.debug(`Evaluating security reputation score for IP: ${ip}`);

    let threatScore = 0;
    let isTorExitNode = false;
    let isPublicProxy = false;
    let isKnownVpn = false;

    if (this.BLOCKED_SUBNETS.some((sub) => ip.startsWith(sub))) {
      threatScore = 95;
      isPublicProxy = true;
    } else if (this.SUSPICIOUS_IPS.has(ip)) {
      threatScore = 85;
      isTorExitNode = true;
    } else if (ip.startsWith('10.') || ip.startsWith('192.168.') || ip === '127.0.0.1') {
      threatScore = 0; // Trusted private network
    } else {
      threatScore = 5; // Low background baseline
    }

    let actionRecommendation: IpThreatAssessment['actionRecommendation'] = 'ALLOW';
    if (threatScore >= 80) {
      actionRecommendation = 'BLOCK';
    } else if (threatScore >= 40) {
      actionRecommendation = 'CHALLENGE_CAPTCHA';
    }

    return {
      ip,
      threatScore,
      isTorExitNode,
      isPublicProxy,
      isKnownVpn,
      actionRecommendation,
    };
  }
}
