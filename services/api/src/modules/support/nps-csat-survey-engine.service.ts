import { Injectable, Logger } from '@nestjs/common';
import * as crypto from 'crypto';

export interface NpsSurveyResponse {
  responseId: string;
  contactId: string;
  score: number; // 0 - 10
  category: 'PROMOTER' | 'PASSIVE' | 'DETRACTOR';
  feedbackText: string;
  submittedAt: string;
}

export interface NpsAggregateScore {
  totalResponses: number;
  promoterCount: number;
  passiveCount: number;
  detractorCount: number;
  netPromoterScore: number; // -100 to +100
}

@Injectable()
export class NpsCsatSurveyEngineService {
  private readonly logger = new Logger(NpsCsatSurveyEngineService.name);

  private readonly surveyResponses: NpsSurveyResponse[] = [];

  submitNpsResponse(contactId: string, score: number, feedbackText: string = ''): NpsSurveyResponse {
    let category: NpsSurveyResponse['category'] = 'PASSIVE';
    if (score >= 9) category = 'PROMOTER';
    else if (score <= 6) category = 'DETRACTOR';

    const entry: NpsSurveyResponse = {
      responseId: `nps_${crypto.randomBytes(8).toString('hex')}`,
      contactId,
      score,
      category,
      feedbackText,
      submittedAt: new Date().toISOString(),
    };

    this.surveyResponses.push(entry);
    return entry;
  }

  calculateAggregateNps(): NpsAggregateScore {
    const total = this.surveyResponses.length || 1;
    const promoters = this.surveyResponses.filter((r) => r.category === 'PROMOTER').length;
    const passives = this.surveyResponses.filter((r) => r.category === 'PASSIVE').length;
    const detractors = this.surveyResponses.filter((r) => r.category === 'DETRACTOR').length;

    const nps = Math.round(((promoters - detractors) / total) * 100);

    return {
      totalResponses: this.surveyResponses.length,
      promoterCount: promoters,
      passiveCount: passives,
      detractorCount: detractors,
      netPromoterScore: nps,
    };
  }
}
