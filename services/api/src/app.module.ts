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
  ],
})
export class AppModule {}
