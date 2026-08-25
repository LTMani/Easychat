import { Injectable, Logger } from '@nestjs/common';

export interface TenantCorsPolicy {
  organizationId: string;
  allowedOrigins: string[];
  allowCredentials: boolean;
  maxAgeSeconds: number;
}

@Injectable()
export class CorsPolicyEvaluatorService {
  private readonly logger = new Logger(CorsPolicyEvaluatorService.name);
  private policyMap = new Map<string, TenantCorsPolicy>();

  setPolicy(policy: TenantCorsPolicy) {
    this.policyMap.set(policy.organizationId, policy);
  }

  isOriginAllowed(organizationId: string, requestOrigin: string): boolean {
    if (!requestOrigin) return false;

    const policy = this.policyMap.get(organizationId);
    if (!policy) {
      // Default safe origins
      return requestOrigin.endsWith('.easychat.io') || requestOrigin.startsWith('http://localhost:');
    }

    const cleanOrigin = requestOrigin.toLowerCase().trim();

    return policy.allowedOrigins.some((pattern) => {
      if (pattern === '*') return true;
      if (pattern.startsWith('*.')) {
        const domainSuffix = pattern.slice(2);
        return cleanOrigin.endsWith(domainSuffix);
      }
      return cleanOrigin === pattern.toLowerCase();
    });
  }
}
