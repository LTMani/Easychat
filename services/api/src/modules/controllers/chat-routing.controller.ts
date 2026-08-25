import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ChatRoutingEngineService } from '../omnichannel/chat-routing-engine.service';

@Controller('v1/routing')
export class ChatRoutingController {
  constructor(private readonly service: ChatRoutingEngineService) {}

  @Get('capacity')
  async getQueueCapacity() {
    return {
      status: 'success',
      data: this.service.getQueueCapacityMetrics(),
    };
  }

  @Post('route')
  async routeConversation(@Body() body: { channel: string; requiredSkills?: string[] }) {
    const result = this.service.findBestAgentForConversation(body);
    return {
      status: 'success',
      data: result,
    };
  }
}
