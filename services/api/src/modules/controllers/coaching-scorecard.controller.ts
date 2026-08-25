import { Controller, Get, Post, Body, Param, Query, BadRequestException } from '@nestjs/common';
import { AgentCoachingScorecardService, CoachingRubricEvaluation } from '../support/agent-coaching-scorecard.service';

@Controller('v1/support/qa-coaching')
export class CoachingScorecardController {
  constructor(private readonly coachingService: AgentCoachingScorecardService) {}

  @Post('evaluations')
  async submitEvaluation(@Body() body: CoachingRubricEvaluation) {
    const scored = this.coachingService.calculateEvaluationScore(body);
    return {
      status: 'success',
      data: {
        evaluationId: `qa_${Date.now()}`,
        ...body,
        totalScore: scored.totalScore,
        passed: scored.passed,
        createdAt: new Date().toISOString(),
      },
    };
  }

  @Get('scorecards/:agentId')
  async getAgentScorecard(@Param('agentId') agentId: string) {
    const summary = this.coachingService.summarizeAgentScorecard(agentId, [
      {
        agentId,
        ticketId: 'tkt_01',
        greetingPolitenessScore: 20,
        empathyScore: 19,
        technicalAccuracyScore: 28,
        firstContactResolutionScore: 25,
        evaluatorNotes: 'Excellent support response',
      },
    ]);

    return {
      status: 'success',
      data: summary,
    };
  }
}
