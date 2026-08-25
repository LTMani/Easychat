import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { OrganizationsModule } from './modules/organizations/organizations.module';
import { RealtimeModule } from './modules/realtime/realtime.module';
import { ConversationsModule } from './modules/conversations/conversations.module';
import { NotificationsModule } from './modules/notifications/notifications.module';

@Module({
  imports: [
    AuthModule,
    OrganizationsModule,
    RealtimeModule,
    ConversationsModule,
    NotificationsModule,
  ],
})
export class AppModule {}
