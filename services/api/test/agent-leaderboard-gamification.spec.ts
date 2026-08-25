import { Test, TestingModule } from '@nestjs/testing';
import { AgentLeaderboardGamificationService } from '../src/modules/gamification/agent-leaderboard-gamification.service';

describe('AgentLeaderboardGamificationService', () => {
  let service: AgentLeaderboardGamificationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AgentLeaderboardGamificationService],
    }).compile();
    service = module.get<AgentLeaderboardGamificationService>(AgentLeaderboardGamificationService);
  });

  it('should calculate level progression from XP points', () => {
    expect(service.calculateLevel(0)).toBe(1);
    expect(service.calculateLevel(500)).toBe(3);
    expect(service.calculateLevel(2500)).toBe(6);
  });

  it('should award bonus XP for fast resolution and 5-star rating', () => {
    const res = service.awardTicketResolutionXp(100, 4, 5); // 4 min resolution, 5 stars
    expect(res.earnedXp).toBe(130); // 50 base + 30 fast + 50 five-star
    expect(res.newXp).toBe(230);
  });
});
