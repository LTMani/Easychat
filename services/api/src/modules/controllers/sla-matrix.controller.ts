import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { SlaEscalationMatrixService } from '../sla/sla-escalation-matrix.service';

@Controller('v1/support/sla-matrix')
export class SlaMatrixController {
  constructor(private readonly matrixService: SlaEscalationMatrixService) {}

  @Post('evaluate')
  async evaluateSla(
    @Body()
    body: {
      ticketId: string;
      elapsedMinutes: number;
      targetMinutes: number;
    },
  ) {
    if (!body.ticketId || body.elapsedMinutes === undefined || !body.targetMinutes) {
      throw new BadRequestException('ticketId, elapsedMinutes, and targetMinutes are required');
    }

    const status = this.matrixService.evaluateTicketSla(
      body.ticketId,
      body.elapsedMinutes,
      body.targetMinutes,
    );

    return {
      status: 'success',
      data: status,
    };
  }
}
