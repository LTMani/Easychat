import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AiCustomerSupportBotService, BotContext } from './ai-customer-support-bot.service';

@Controller('v1/ai/bot')
export class AiBotController {
  constructor(private readonly botService: AiCustomerSupportBotService) {}

  @Post('respond')
  async respondToCustomer(
    @Body()
    body: {
      message: string;
      customerName?: string;
      customerEmail?: string;
      organizationId?: string;
      history?: Array<{ role: 'user' | 'assistant' | 'system'; content: string }>;
    },
  ) {
    if (!body.message) {
      throw new BadRequestException('message is required');
    }

    const context: BotContext = {
      customerName: body.customerName,
      customerEmail: body.customerEmail,
      organizationId: body.organizationId || 'org_default',
      conversationHistory: body.history || [],
    };

    const reply = this.botService.processCustomerMessage(body.message, context);

    return {
      status: 'success',
      data: reply,
    };
  }
}
