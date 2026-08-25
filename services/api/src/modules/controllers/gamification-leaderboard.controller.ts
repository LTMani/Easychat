import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { AgentLeaderboardGamificationService } from '../gamification/agent-leaderboard-gamification.service';

@Controller('v1/gamification')
export class GamificationLeaderboardController {
  constructor(private readonly gamificationService: AgentLeaderboardGamificationService) {}

  @Get('leaderboard')
  async getLeaderboard() {
    return {
      status: 'success',
      data: [
        { rank: 1, agentName: 'Sarah Jenkins', totalXp: 14500, level: 13, streakDays: 24, badges: ['SPEED_DEMON', 'CSAT_CHAMPION', 'PERFECT_STREAK'] },
        { rank: 2, agentName: 'Alex Mercer', totalXp: 12200, level: 12, streakDays: 18, badges: ['SPEED_DEMON', 'CSAT_CHAMPION'] },
        { rank: 3, agentName: 'Priya Sharma', totalXp: 9800, level: 10, streakDays: 12, badges: ['NIGHT_OWL'] },
        { rank: 4, agentName: 'Sam Chen', totalXp: 7400, level: 9, streakDays: 8, badges: ['CSAT_CHAMPION'] },
      ],
    };
  }

  @Post('award-xp')
  async awardXp(
    @Body()
    body: {
      agentId: string;
      resolutionTimeMinutes: number;
      csatRating?: number;
    },
  ) {
    const result = this.gamificationService.awardTicketResolutionXp(
      1000, // mock current XP
      body.resolutionTimeMinutes || 10,
      body.csatRating,
    );

    return {
      status: 'success',
      data: result,
    };
  }
}
