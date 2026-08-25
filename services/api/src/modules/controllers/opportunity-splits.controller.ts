import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { OpportunitySplitService, RepSplitEntry } from '../crm/opportunity-split.service';

@Controller('v1/deals/splits')
export class OpportunitySplitsController {
  constructor(private readonly splitService: OpportunitySplitService) {}

  @Post('calculate')
  async calculateRevenueSplits(
    @Body()
    body: {
      dealAmount: number;
      splits: RepSplitEntry[];
    },
  ) {
    if (!body.dealAmount || !body.splits) {
      throw new BadRequestException('dealAmount and splits array are required');
    }

    const result = this.splitService.calculateSplits(body.dealAmount, body.splits);
    return {
      status: result.isValid ? 'success' : 'error',
      data: result,
    };
  }
}
