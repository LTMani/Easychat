import { Injectable, Logger } from '@nestjs/common';
import * as crypto from 'crypto';

export interface RealtimeWorkspaceEvent {
  eventId: string;
  workspaceId: string;
  channel: 'CONVERSATIONS' | 'TELEPHONY' | 'DEALS' | 'PRESENCE' | 'AUDIT';
  eventType: string;
  payload: Record<string, any>;
  timestamp: string;
}

@Injectable()
export class WebsocketEventDispatcherService {
  private readonly logger = new Logger(WebsocketEventDispatcherService.name);

  dispatchWorkspaceEvent(
    workspaceId: string,
    channel: RealtimeWorkspaceEvent['channel'],
    eventType: string,
    payload: Record<string, any>,
  ): RealtimeWorkspaceEvent {
    this.logger.debug(`Dispatching event ${eventType} on channel ${channel} to workspace ${workspaceId}`);

    const event: RealtimeWorkspaceEvent = {
      eventId: `evt_${crypto.randomBytes(8).toString('hex')}`,
      workspaceId,
      channel,
      eventType,
      payload,
      timestamp: new Date().toISOString(),
    };

    return event;
  }
}
