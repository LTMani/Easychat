import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { OrganizationsModule } from './modules/organizations/organizations.module';
import { RealtimeModule } from './modules/realtime/realtime.module';
import { ConversationsModule } from './modules/conversations/conversations.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { CrmModule } from './modules/crm/crm.module';
import { Customer360Module } from './modules/customer360/customer360.module';
import { SupportModule } from './modules/support/support.module';
import { AutomationModule } from './modules/automation/automation.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { AiModule } from './modules/ai/ai.module';
import { PlatformModule } from './modules/platform/platform.module';
import { EnterpriseModule } from './modules/enterprise/enterprise.module';
import { ChannelsModule } from './modules/channels/channels.module';
import { ReportsModule } from './modules/reports/reports.module';
import { SearchModule } from './modules/search/search.module';
import { SlaModule } from './modules/sla/sla.module';
import { BillingModule } from './modules/billing/billing.module';
import { AuditModule } from './modules/audit/audit.module';
import { WebhooksModule } from './modules/webhooks/webhooks.module';
import { TelephonyModule } from './modules/telephony/telephony.module';
import { CsatModule } from './modules/csat/csat.module';
import { QuotesModule } from './modules/quotes/quotes.module';
import { EtlModule } from './modules/etl/etl.module';
import { CustomFieldsModule } from './modules/custom-fields/custom-fields.module';
import { SsoModule } from './modules/sso/sso.module';
import { IntegrationsModule } from './modules/integrations/integrations.module';
import { MarketingModule } from './modules/marketing/marketing.module';
import { ProductsModule } from './modules/products/products.module';

@Module({
  imports: [
    AuthModule,
    OrganizationsModule,
    RealtimeModule,
    ConversationsModule,
    NotificationsModule,
    CrmModule,
    Customer360Module,
    SupportModule,
    AutomationModule,
    AnalyticsModule,
    AiModule,
    PlatformModule,
    EnterpriseModule,
    ChannelsModule,
    ReportsModule,
    SearchModule,
    SlaModule,
    BillingModule,
    AuditModule,
    WebhooksModule,
    TelephonyModule,
    CsatModule,
    QuotesModule,
    EtlModule,
    CustomFieldsModule,
    SsoModule,
    IntegrationsModule,
    MarketingModule,
    ProductsModule,
  ],
})
export class AppModule {}
