import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { prisma } from '@easychat/database';
import { CreateSubscriptionDto } from '@easychat/shared';

@Injectable()
export class BillingService {
  async getSubscription(organizationId: string) {
    const sub = await prisma.subscription.findFirst({
      where: { organizationId },
      include: {
        plan: true,
        invoices: {
          take: 10,
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!sub) {
      // Fallback default free/starter tier initialization
      const starterPlan = await prisma.subscriptionPlan.findFirst({
        where: { code: 'STARTER' },
      });

      if (!starterPlan) {
        return null;
      }

      return prisma.subscription.create({
        data: {
          organizationId,
          planId: starterPlan.id,
          status: 'ACTIVE',
          billingCycle: 'MONTHLY',
          currentPeriodStart: new Date(),
          currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        },
        include: { plan: true },
      });
    }

    return sub;
  }

  async listPlans() {
    let plans = await prisma.subscriptionPlan.findMany({
      where: { isActive: true },
    });

    if (plans.length === 0) {
      // Seed plans if none exist
      plans = await Promise.all([
        prisma.subscriptionPlan.create({
          data: {
            name: 'Starter Plan',
            code: 'STARTER',
            description: 'Essential CRM & Live Chat features for small teams.',
            priceMonthly: 29.0,
            priceYearly: 290.0,
            maxSeats: 3,
            maxContacts: 1000,
            maxWorkflows: 5,
            features: JSON.stringify(['CRM Basics', 'Live Chat Inbox', '5 Automated Workflows']),
          },
        }),
        prisma.subscriptionPlan.create({
          data: {
            name: 'Professional Plan',
            code: 'PRO',
            description: 'Advanced Automation, SLA Engine, and AI Assistant.',
            priceMonthly: 79.0,
            priceYearly: 790.0,
            maxSeats: 10,
            maxContacts: 10000,
            maxWorkflows: 25,
            features: JSON.stringify(['Omnichannel Inbox', 'SLA Engine', 'AI Insight Engine', '25 Automated Workflows']),
          },
        }),
        prisma.subscriptionPlan.create({
          data: {
            name: 'Enterprise Plan',
            code: 'ENTERPRISE',
            description: 'Unlimited Scale, Dedicated Telephony SIP, and Custom Security.',
            priceMonthly: 249.0,
            priceYearly: 2490.0,
            maxSeats: 100,
            maxContacts: 100000,
            maxWorkflows: 500,
            features: JSON.stringify(['Dedicated SIP Voice', 'Custom Webhooks', 'Unlimited AI RAG', '24/7 Dedicated Support']),
          },
        }),
      ]);
    }

    return plans;
  }

  async createSubscription(organizationId: string, dto: CreateSubscriptionDto) {
    const plan = await prisma.subscriptionPlan.findUnique({
      where: { code: dto.planCode },
    });

    if (!plan) {
      throw new NotFoundException(`Plan with code ${dto.planCode} not found`);
    }

    const existing = await prisma.subscription.findFirst({
      where: { organizationId },
    });

    const now = new Date();
    const periodEnd = dto.billingCycle === 'YEARLY'
      ? new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000)
      : new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

    if (existing) {
      return prisma.subscription.update({
        where: { id: existing.id },
        data: {
          planId: plan.id,
          billingCycle: dto.billingCycle,
          status: 'ACTIVE',
          currentPeriodStart: now,
          currentPeriodEnd: periodEnd,
        },
        include: { plan: true },
      });
    }

    return prisma.subscription.create({
      data: {
        organizationId,
        planId: plan.id,
        billingCycle: dto.billingCycle,
        status: 'ACTIVE',
        currentPeriodStart: now,
        currentPeriodEnd: periodEnd,
      },
      include: { plan: true },
    });
  }

  async cancelSubscription(organizationId: string) {
    const sub = await prisma.subscription.findFirst({
      where: { organizationId },
    });

    if (!sub) {
      throw new NotFoundException('Active subscription not found');
    }

    return prisma.subscription.update({
      where: { id: sub.id },
      data: { cancelAtPeriodEnd: true },
    });
  }

  async listInvoices(organizationId: string) {
    return prisma.subscriptionInvoice.findMany({
      where: { organizationId },
      orderBy: { createdAt: 'desc' },
    });
  }
}
