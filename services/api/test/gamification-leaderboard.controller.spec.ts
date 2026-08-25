import { Test, TestingModule } from '@nestjs/testing';
import { GamificationLeaderboardController } from '../src/modules/controllers/gamification-leaderboard.controller';
import { AgentLeaderboardGamificationService } from '../src/modules/gamification/agent-leaderboard-gamification.service';

describe('GamificationLeaderboardController', () => {
  let controller: GamificationLeaderboardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GamificationLeaderboardController],
      providers: [AgentLeaderboardGamificationService],
    }).compile();
    controller = module.get<GamificationLeaderboardController>(GamificationLeaderboardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return agent leaderboard rankings', async () => {
    const res = await controller.getLeaderboard();
    expect(res.status).toBe('success');
    expect(res.data.length).toBeGreaterThanOrEqual(4);
    expect(res.data[0].rank).toBe(1);
  });
});
