import { Injectable, Logger } from '@nestjs/common';

export interface EnrichedCompanyData {
  domain: string;
  name: string;
  industry: string;
  estimatedEmployees: number;
  country: string;
  isTechStackRecognized: boolean;
  detectedTech: string[];
}

@Injectable()
export class LeadEnrichmentPipelineService {
  private readonly logger = new Logger(LeadEnrichmentPipelineService.name);

  private readonly DOMAIN_PROFILES: Record<string, Partial<EnrichedCompanyData>> = {
    'acme.com': { name: 'Acme Corporation', industry: 'Industrial & Manufacturing', estimatedEmployees: 5000, country: 'US', detectedTech: ['Salesforce', 'AWS', 'React', 'PostgreSQL'] },
    'fintechvelocity.de': { name: 'FinTech Velocity', industry: 'Financial Services & Banking', estimatedEmployees: 250, country: 'DE', detectedTech: ['Kubernetes', 'Golang', 'Next.js'] },
    'globalretail.io': { name: 'GlobalRetail Cloud', industry: 'E-Commerce & Retail', estimatedEmployees: 1200, country: 'US', detectedTech: ['Shopify Plus', 'Stripe', 'Redis'] },
  };

  enrichFromEmailDomain(email: string): EnrichedCompanyData {
    this.logger.debug(`Enriching business intelligence for lead email: ${email}`);

    const domain = email.split('@')[1]?.toLowerCase().trim() || 'unknown.com';
    const known = this.DOMAIN_PROFILES[domain];

    if (known) {
      return {
        domain,
        name: known.name || domain,
        industry: known.industry || 'Technology & Software',
        estimatedEmployees: known.estimatedEmployees || 100,
        country: known.country || 'US',
        isTechStackRecognized: true,
        detectedTech: known.detectedTech || ['Cloud Hosting'],
      };
    }

    // Default fallback intelligence
    return {
      domain,
      name: domain.split('.')[0].toUpperCase() + ' Corp',
      industry: 'General Business',
      estimatedEmployees: 50,
      country: 'US',
      isTechStackRecognized: false,
      detectedTech: ['Generic Cloud'],
    };
  }

  calculateLeadFitScore(email: string, requestedSeats: number, hasCorporateDomain: boolean): number {
    let score = 20; // Base score

    if (hasCorporateDomain && !email.endsWith('@gmail.com') && !email.endsWith('@yahoo.com')) {
      score += 35;
    }

    if (requestedSeats >= 20) {
      score += 30;
    } else if (requestedSeats >= 5) {
      score += 15;
    }

    return Math.min(100, score);
  }
}
