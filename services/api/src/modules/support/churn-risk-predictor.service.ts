import { Injectable, Logger } from '@nestjs/common';

export interface AccountChurnHealth {
  accountId: string;
  accountName: string;
  mrrAmount: number;
  openUrgentTicketsCount: number;
  loginFrequencyDeclinePercent: number;
  npsScore: number;
  churnRiskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  suggestedRetentionAction: string;
}

@Injectable()
export class ChurnRiskPredictorService {
  private readonly logger = new Logger(ChurnRiskPredictorService.name);

  predictAccountRisk(
    accountId: string,
    accountName: string,
    mrrAmount: number,
    openTickets: number,
    activityDeclinePercent: number,
    npsScore: number,
  ): AccountChurnHealth {
    let risk: AccountChurnHealth['churnRiskLevel'] = 'LOW';
    let action = 'Maintain standard quarterly business review';

    if (openTickets >= 3 || activityDeclinePercent >= 50 || npsScore <= 5) {
      risk = 'CRITICAL';
      action = 'Assign Senior VP of Customer Success immediately and schedule emergency triage';
    } else if (openTickets >= 2 || activityDeclinePercent >= 25 || npsScore <= 7) {
      risk = 'HIGH';
      action = 'Trigger executive outreach call and offer custom technical training';
    } else if (activityDeclinePercent >= 15) {
      risk = 'MEDIUM';
      action = 'Send product feature re-engagement newsletter';
    }

    return {
      accountId,
      accountName,
      mrrAmount,
      openUrgentTicketsCount: openTickets,
      loginFrequencyDeclinePercent: activityDeclinePercent,
      npsScore,
      churnRiskLevel: risk,
      suggestedRetentionAction: action,
    };
  }
}
