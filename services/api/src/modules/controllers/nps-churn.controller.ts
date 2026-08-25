import { Controller, Get, Post, Body, Query, BadRequestException } from '@nestjs/common';
import { NpsCsatSurveyEngineService } from '../support/nps-csat-survey-engine.service';
import { ChurnRiskPredictorService } from '../support/churn-risk-predictor.service';

@Controller('v1/support/surveys')
export class NpsChurnController {
  constructor(
    private readonly npsService: NpsCsatSurveyEngineService,
    private readonly churnService: ChurnRiskPredictorService,
  ) {}

  @Post('nps/submit')
  async submitNps(@Body() body: { contactId: string; score: number; feedbackText?: string }) {
    if (!body.contactId || body.score === undefined) {
      throw new BadRequestException('contactId and score are required');
    }

    const res = this.npsService.submitNpsResponse(body.contactId, body.score, body.feedbackText);
    return {
      status: 'success',
      data: res,
    };
  }

  @Get('nps/aggregate')
  async getNpsAggregate() {
    const stats = this.npsService.calculateAggregateNps();
    return {
      status: 'success',
      data: stats,
    };
  }

  @Post('churn/evaluate')
  async evaluateChurn(
    @Body()
    body: {
      accountId: string;
      accountName: string;
      mrrAmount: number;
      openTickets: number;
      activityDeclinePercent: number;
      npsScore: number;
    },
  ) {
    const report = this.churnService.predictAccountRisk(
      body.accountId || 'acc_01',
      body.accountName || 'Acme Corp',
      body.mrrAmount || 5000,
      body.openTickets || 0,
      body.activityDeclinePercent || 0,
      body.npsScore || 9,
    );

    return {
      status: 'success',
      data: report,
    };
  }
}
