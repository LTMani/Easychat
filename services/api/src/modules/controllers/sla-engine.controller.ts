import { Controller, Post, Body } from '@nestjs/common';
import { SlaPolicyEngineService } from '../sla/sla-policy-engine.service';

@Controller('v1/sla')
export class SlaEngineController {
  constructor(private readonly service: SlaPolicyEngineService) {}

  @Post('calculate-deadlines')
  async calculateDeadlines(
    @Body()
    body: {
      createdAt: string;
      firstResponseMinutes: number;
      resolutionMinutes: number;
      businessHoursOnly?: boolean;
    },
  ) {
    const deadlines = this.service.calculateDeadlines(
      new Date(body.createdAt),
      body.firstResponseMinutes,
      body.resolutionMinutes,
      body.businessHoursOnly,
    );
    return {
      status: 'success',
      data: deadlines,
    };
  }
}
