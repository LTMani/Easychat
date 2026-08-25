import { Injectable, Logger } from '@nestjs/common';
import { prisma } from '@easychat/database';

export interface SubscriptionPlan {
  id: string;
  name: 'STARTER' | 'PRO' | 'ENTERPRISE';
  monthlyPrice: number;
  annualPrice: number;
  maxSeats: number;
  features: string[];
}

export interface UpgradeQuote {
  fromPlan: string;
  toPlan: string;
  monthlyCost: number;
  annualCost: number;
  annualSavings: number;
  prorationCredit: number;
  effectiveDate: string;
}

@Injectable()
export class SubscriptionService {
  private readonly logger = new Logger(SubscriptionService.name);

  readonly PLANS: SubscriptionPlan[] = [
    {
      id: 'starter',
      name: 'STARTER',
      monthlyPrice: 49,
      annualPrice: 39,
      maxSeats: 5,
      features: ['Email + Chat channels', 'Basic CRM', 'Contact management', 'Community support', '5GB storage', '10k API calls/month'],
    },
    {
      id: 'pro',
      name: 'PRO',
      monthlyPrice: 99,
      annualPrice: 79,
      maxSeats: 25,
      features: ['All channels (Email, WhatsApp, Chat, SMS)', 'Full CRM suite', 'Sales pipeline + Deals', 'Custom reports + BI', 'Priority support', '50GB storage', '100k API calls/month', 'Workflow automation'],
    },
    {
      id: 'enterprise',
      name: 'ENTERPRISE',
      monthlyPrice: 299,
      annualPrice: 249,
      maxSeats: -1, // unlimited
      features: ['Unlimited seats', 'All channels + IVR telephony', 'Complete CRM + CDP', 'AI copilot + sentiment analysis', 'SAML SSO + 2FA enforcement', 'IP allowlisting', 'Dedicated CSM', 'SLA guarantee (99.9%)', 'Unlimited storage', 'Unlimited API calls', 'Custom contract + invoicing'],
    },
  ];

  getPlanByName(name: string): SubscriptionPlan | undefined {
    return this.PLANS.find((p) => p.name === name.toUpperCase());
  }

  calculateUpgradeQuote(fromPlanName: string, toPlanName: string, seats: number, daysRemainingInBillingCycle: number): UpgradeQuote {
    const fromPlan = this.getPlanByName(fromPlanName);
    const toPlan = this.getPlanByName(toPlanName);

    if (!fromPlan || !toPlan) throw new Error(`Invalid plan upgrade: ${fromPlanName} → ${toPlanName}`);

    const monthlyCost = toPlan.monthlyPrice * seats;
    const annualCost = toPlan.annualPrice * seats * 12;
    const annualSavings = monthlyCost * 12 - annualCost;

    const dailyCurrentRate = (fromPlan.monthlyPrice * seats) / 30;
    const prorationCredit = parseFloat((dailyCurrentRate * daysRemainingInBillingCycle).toFixed(2));

    const effectiveDate = new Date();
    effectiveDate.setDate(effectiveDate.getDate() + 1);

    return {
      fromPlan: fromPlan.name,
      toPlan: toPlan.name,
      monthlyCost,
      annualCost,
      annualSavings: parseFloat(annualSavings.toFixed(2)),
      prorationCredit,
      effectiveDate: effectiveDate.toISOString().split('T')[0],
    };
  }

  async getCurrentSubscription(organizationId: string): Promise<{ plan: string; seats: number; billingCycle: string; renewalDate: string } | null> {
    this.logger.log(`Fetching subscription for org ${organizationId}`);

    const org = await prisma.organization.findUnique({
      where: { id: organizationId },
      select: { id: true, plan: true },
    });

    if (!org) return null;

    const seats = await prisma.organizationMember.count({ where: { organizationId } });

    return { plan: org.plan ?? 'STARTER', seats, billingCycle: 'MONTHLY', renewalDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] };
  }

  isFeatureAvailableOnPlan(planName: string, featureKey: string): boolean {
    const plan = this.getPlanByName(planName);
    if (!plan) return false;

    const featureMap: Record<string, string[]> = {
      ai_copilot: ['ENTERPRISE'],
      saml_sso: ['ENTERPRISE'],
      telephony: ['ENTERPRISE'],
      ip_allowlist: ['ENTERPRISE'],
      bi_reports: ['PRO', 'ENTERPRISE'],
      workflow_automation: ['PRO', 'ENTERPRISE'],
      whatsapp_cloud: ['PRO', 'ENTERPRISE'],
      custom_fields: ['PRO', 'ENTERPRISE'],
      api_access: ['PRO', 'ENTERPRISE'],
    };

    const allowedPlans = featureMap[featureKey];
    return allowedPlans ? allowedPlans.includes(plan.name) : true;
  }
}
