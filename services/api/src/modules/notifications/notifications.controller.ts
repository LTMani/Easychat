import { Controller, Get, Patch, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { NotificationsService } from './notifications.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/user.decorator';
import { UserSessionPayload } from '@easychat/shared';

@ApiTags('Notifications')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  @ApiOperation({ summary: 'Get in-app notifications for current user' })
  async getMyNotifications(@CurrentUser() user: UserSessionPayload) {
    return this.notificationsService.getMyNotifications(user.userId);
  }

  @Patch(':id/read')
  @ApiOperation({ summary: 'Mark notification as read' })
  async markAsRead(@CurrentUser() user: UserSessionPayload, @Param('id') notificationId: string) {
    return this.notificationsService.markAsRead(notificationId, user.userId);
  }
}
