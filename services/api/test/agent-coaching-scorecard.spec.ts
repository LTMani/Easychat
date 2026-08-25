import { Test, TestingModule } from '@nestjs/testing';
import { AgentCoachingScorecardService } from '../src/modules/support/agent-coaching-scorecard.service';

describe('AgentCoachingScorecardService', () => {
  let service: AgentCoachingScorecardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AgentCoachingScorecardService],
    }).compile();
    service = module.get<AgentCoachingScorecardService>(AgentCoachingScorecardService);
  });

  it('should evaluate rubric scores and mark passed if >=80', () => {
    const evaluation = service.calculateEvaluationScore({
      agentId: 'agent_1',
      ticketId: 'tkt_01',
      greetingPolitenessScore: 20,
      empathyScore: 18,
      technicalAccuracyScore: 28,
      firstContactResolutionScore: 25,
      evaluatorNotes: 'Great resolution and tone',
    });

    expect(evaluation.totalScore).toBe(91);
    expect(evaluation.passed).toBe(true);
  });

  it('should assign TOP_PERFORMER performance band for average >= 90', () => {
    const summary = service.summarizeAgentScorecard('agent_1', [
      {
        agentId: 'agent_1',
        ticketId: 'tkt_01',
        greetingPolitenessScore: 20,
        empathyScore: 20,
        technicalAccuracyScore: 28,
        firstContactResolutionScore: 26,
        evaluatorNotes: '',
      },
    ]);

    expect(summary.performanceBand).toBe('TOP_PERFORMER');
    expect(summary.overallScorePercent).toBeGreaterThanOrEqual(90);
  });
});
