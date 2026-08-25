import { Controller, Post, Get, Body, Param, BadRequestException } from '@nestjs/common';
import { AgentPresenceHeartbeatService, AgentStatus } from '../realtime/agent-presence-heartbeat.service';
import { WebsocketEventDispatcherService, RealtimeWorkspaceEvent } from '../realtime/websocket-event-dispatcher.service';

@Controller('v1/realtime')
export class RealtimePresenceController {
  constructor(
    private readonly presenceService: AgentPresenceHeartbeatService,
    private readonly eventDispatcher: WebsocketEventDispatcherService,
  ) {}

  @Post('presence/heartbeat')
  async sendHeartbeat(
    @Body()
    body: {
      agentId: string;
      workspaceId: string;
      status?: AgentStatus;
      activeCount?: number;
    },
  ) {
    if (!body.agentId || !body.workspaceId) {
      throw new BadRequestException('agentId and workspaceId are required');
    }

    const res = this.presenceService.recordHeartbeat(body.agentId, body.workspaceId, body.status, body.activeCount);
    return {
      status: 'success',
      data: res,
    };
  }

  @Get('presence/workspace/:workspaceId/available')
  async getAvailableAgents(@Param('workspaceId') workspaceId: string) {
    const list = this.presenceService.getAvailableAgentsForWorkspace(workspaceId);
    return {
      status: 'success',
      data: list,
    };
  }

  @Post('events/dispatch')
  async dispatchEvent(
    @Body()
    body: {
      workspaceId: string;
      channel: RealtimeWorkspaceEvent['channel'];
      eventType: string;
      payload: Record<string, any>;
    },
  ) {
    if (!body.workspaceId || !body.channel || !body.eventType) {
      throw new BadRequestException('workspaceId, channel, and eventType are required');
    }

    const event = this.eventDispatcher.dispatchWorkspaceEvent(body.workspaceId, body.channel, body.eventType, body.payload);
    return {
      status: 'success',
      data: event,
    };
  }
}
