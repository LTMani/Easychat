import { Test, TestingModule } from '@nestjs/testing';
import { CoachingScorecardController } from '../src/modules/controllers/coaching-scorecard.controller';
import { AgentCoachingScorecardService } from '../src/modules/support/agent-coaching-scorecard.service';

describe('CoachingScorecardController', () => {
  let controller: CoachingScorecardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoachingScorecardController],
      providers: [AgentCoachingScorecardService],
    }).compile();
    controller = module.get<CoachingScorecardController>(CoachingScorecardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should calculate evaluation score and return result', async () => {
    const res = await controller.submitEvaluation({
      agentId: 'agent_alex',
      ticketId: 'tkt_01',
      greetingPolitenessScore: 20,
      empathyScore: 20,
      technicalAccuracyScore: 30,
      firstContactResolutionScore: 30,
      evaluatorNotes: 'Perfect resolution',
    });

    expect(res.status).toBe('success');
    expect(res.data.totalScore).toBe(100);
    expect(res.data.passed).toBe(true);
  });
});
