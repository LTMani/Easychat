import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RbacGuard } from '../../common/guards/rbac.guard';
import { RequirePermissions } from '../../common/decorators/permissions.decorator';
import { User } from '../../common/decorators/user.decorator';
import { Permission, CreateSubscriptionDto } from '@easychat/shared';
import { BillingService } from './billing.service';
import { StripeWebhookService } from './stripe-webhook.service';

@Controller('v1/billing')
export class BillingController {
  constructor(
    private readonly billingService: BillingService,
    private readonly stripeWebhookService: StripeWebhookService
  ) {}

  @Get('plans')
  async listPlans() {
    return this.billingService.listPlans();
  }

  @Get('subscription')
  @UseGuards(JwtAuthGuard, RbacGuard)
  @RequirePermissions(Permission.BILLING_READ)
  async getSubscription(@User('organizationId') orgId: string) {
    return this.billingService.getSubscription(orgId);
  }

  @Post('subscription')
  @UseGuards(JwtAuthGuard, RbacGuard)
  @RequirePermissions(Permission.BILLING_MANAGE)
  async createSubscription(
    @User('organizationId') orgId: string,
    @Body() dto: CreateSubscriptionDto
  ) {
    return this.billingService.createSubscription(orgId, dto);
  }

  @Post('subscription/cancel')
  @UseGuards(JwtAuthGuard, RbacGuard)
  @RequirePermissions(Permission.BILLING_MANAGE)
  async cancelSubscription(@User('organizationId') orgId: string) {
    return this.billingService.cancelSubscription(orgId);
  }

  @Get('invoices')
  @UseGuards(JwtAuthGuard, RbacGuard)
  @RequirePermissions(Permission.BILLING_READ)
  async listInvoices(@User('organizationId') orgId: string) {
    return this.billingService.listInvoices(orgId);
  }

  @Post('webhook')
  async handleStripeWebhook(@Body() body: any) {
    return this.stripeWebhookService.handleStripeEvent(body);
  }
}
