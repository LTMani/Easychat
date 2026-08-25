import { Injectable, Logger } from '@nestjs/common';

export interface CoachingRubricEvaluation {
  agentId: string;
  ticketId: string;
  greetingPolitenessScore: number; // 0-20
  empathyScore: number; // 0-20
  technicalAccuracyScore: number; // 0-30
  firstContactResolutionScore: number; // 0-30
  evaluatorNotes: string;
}

export interface AgentScorecardSummary {
  agentId: string;
  totalEvaluations: number;
  overallScorePercent: number;
  performanceBand: 'TOP_PERFORMER' | 'PROFICIENT' | 'NEEDS_COACHING';
}

@Injectable()
export class AgentCoachingScorecardService {
  private readonly logger = new Logger(AgentCoachingScorecardService.name);

  calculateEvaluationScore(evalDoc: CoachingRubricEvaluation): { totalScore: number; passed: boolean } {
    const total = evalDoc.greetingPolitenessScore +
      evalDoc.empathyScore +
      evalDoc.technicalAccuracyScore +
      evalDoc.firstContactResolutionScore;

    return {
      totalScore: Math.min(100, Math.max(0, total)),
      passed: total >= 80,
    };
  }

  summarizeAgentScorecard(agentId: string, evaluations: CoachingRubricEvaluation[]): AgentScorecardSummary {
    this.logger.debug(`Summarizing QA coaching score for agent ${agentId} across ${evaluations.length} evaluations`);

    if (evaluations.length === 0) {
      return { agentId, totalEvaluations: 0, overallScorePercent: 0, performanceBand: 'NEEDS_COACHING' };
    }

    const scores = evaluations.map((e) => this.calculateEvaluationScore(e).totalScore);
    const avg = Math.round(scores.reduce((s, val) => s + val, 0) / scores.length);

    let performanceBand: AgentScorecardSummary['performanceBand'] = 'PROFICIENT';
    if (avg >= 90) performanceBand = 'TOP_PERFORMER';
    else if (avg < 75) performanceBand = 'NEEDS_COACHING';

    return {
      agentId,
      totalEvaluations: evaluations.length,
      overallScorePercent: avg,
      performanceBand,
    };
  }
}
