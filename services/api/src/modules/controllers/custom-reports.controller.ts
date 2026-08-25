import { Controller, Get, Post, Body, Query, BadRequestException } from '@nestjs/common';
import { BiPivotEngineService } from '../bi/bi-pivot-engine.service';

@Controller('v1/reports/custom')
export class CustomReportsController {
  constructor(private readonly biService: BiPivotEngineService) {}

  @Get('definitions')
  async listReportDefinitions() {
    return {
      status: 'success',
      data: [
        { id: 'rep_1', name: 'Monthly Executive Pipeline Velocity', type: 'PIVOT', entity: 'DEAL' },
        { id: 'rep_2', name: 'Agent CSAT vs SLA Response Time', type: 'SCATTER', entity: 'TICKET' },
        { id: 'rep_3', name: 'Omnichannel Inbound Channel Distribution', type: 'BAR', entity: 'CONVERSATION' },
      ],
    };
  }

  @Post('execute')
  async executeReport(@Body() body: { reportId?: string; dimensions: string[]; metrics: string[] }) {
    if (!body.dimensions || !body.metrics) {
      throw new BadRequestException('dimensions and metrics are required');
    }

    return {
      status: 'success',
      data: {
        headers: [...body.dimensions, ...body.metrics],
        rows: [
          ['Enterprise Direct', 'North America', 1240000, 18],
          ['Enterprise Direct', 'EMEA', 890000, 12],
          ['SMB Inbound', 'Global', 450000, 42],
        ],
        generatedAt: new Date().toISOString(),
      },
    };
  }
}
