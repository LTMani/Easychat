import { Controller, Post, Body } from '@nestjs/common';
import { BiPivotEngineService, PivotAggregationRequest } from '../bi/bi-pivot-engine.service';

@Controller('v1/analytics/pivot')
export class BiPivotController {
  constructor(private readonly service: BiPivotEngineService) {}

  @Post()
  async generatePivotTable(@Body() body: PivotAggregationRequest) {
    const table = this.service.buildPivotTable(body);
    return {
      status: 'success',
      data: table,
    };
  }
}
