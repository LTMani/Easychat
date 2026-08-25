import { Controller, Get, Post, Body, BadRequestException } from '@nestjs/common';
import { CannedResponseMacroService } from '../support/canned-response-macro.service';

@Controller('v1/support/canned-macros')
export class CannedMacrosController {
  constructor(private readonly macroService: CannedResponseMacroService) {}

  @Get('templates')
  async getTemplates() {
    return {
      status: 'success',
      data: [
        { id: 'm_01', name: 'Issue Resolved Greeting', category: 'Support', template: 'Hi {{customerName}}, your ticket #{{ticketNumber}} has been successfully resolved.' },
        { id: 'm_02', name: 'SLA Escalation Notice', category: 'Escalation', template: 'Hello {{customerName}}, our engineering lead has been assigned to ticket #{{ticketNumber}}.' },
        { id: 'm_03', name: 'Demo Booking Invitation', category: 'Sales', template: 'Hi {{customerName}}, please pick a time for your product walkthrough here: {{calendarLink}}' },
      ],
    };
  }

  @Post('interpolate')
  async interpolate(
    @Body()
    body: {
      template: string;
      variables: Record<string, string | number>;
    },
  ) {
    if (!body.template) throw new BadRequestException('template is required');

    const result = this.macroService.interpolateTemplate(
      body.template,
      body.variables || {},
    );

    return {
      status: 'success',
      data: { renderedText: result },
    };
  }
}
