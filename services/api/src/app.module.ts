import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { OrganizationsModule } from './modules/organizations/organizations.module';
import { RealtimeModule } from './modules/realtime/realtime.module';
import { ConversationsModule } from './modules/conversations/conversations.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { CrmModule } from './modules/crm/crm.module';
import { Customer360Module } from './modules/customer360/customer360.module';

@Module({
  imports: [
    AuthModule,
    OrganizationsModule,
    RealtimeModule,
    ConversationsModule,
    NotificationsModule,
    CrmModule,
    Customer360Module,
  ],
})
export class AppModule {}
