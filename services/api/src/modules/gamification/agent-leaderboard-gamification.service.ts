import { Injectable, Logger } from '@nestjs/common';

export interface AgentBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  xpReward: number;
}

export interface AgentGamificationProfile {
  agentId: string;
  totalXp: number;
  level: number;
  currentStreakDays: number;
  badges: string[];
}

@Injectable()
export class AgentLeaderboardGamificationService {
  private readonly logger = new Logger(AgentLeaderboardGamificationService.name);

  readonly BADGES: Record<string, AgentBadge> = {
    SPEED_DEMON: { id: 'SPEED_DEMON', name: 'Speed Demon', description: 'Resolved 10 tickets in under 5 minutes', icon: '⚡', xpReward: 500 },
    CSAT_CHAMPION: { id: 'CSAT_CHAMPION', name: 'CSAT Champion', description: 'Maintained 100% 5-star CSAT for a full week', icon: '⭐', xpReward: 1000 },
    NIGHT_OWL: { id: 'NIGHT_OWL', name: 'Night Owl', description: 'Handled 50 after-hours emergency tickets', icon: '🦉', xpReward: 750 },
    PERFECT_STREAK: { id: 'PERFECT_STREAK', name: 'Unstoppable', description: 'Maintained a 30-day active resolution streak', icon: '🔥', xpReward: 2000 },
  };

  calculateLevel(totalXp: number): number {
    return Math.floor(Math.sqrt(totalXp / 100)) + 1;
  }

  awardTicketResolutionXp(currentXp: number, resolutionTimeMinutes: number, csatRating?: number): { newXp: number; earnedXp: number; newLevel: number } {
    let earned = 50; // Base resolution XP

    if (resolutionTimeMinutes <= 10) earned += 30;
    if (csatRating === 5) earned += 50;

    const newXp = currentXp + earned;
    const newLevel = this.calculateLevel(newXp);

    return { newXp, earnedXp: earned, newLevel };
  }
}
