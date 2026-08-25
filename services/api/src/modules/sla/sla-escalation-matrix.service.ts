import { Injectable, Logger } from '@nestjs/common';

export type SlaUrgencyLevel = 'NORMAL' | 'WARNING_50_PCT' | 'CRITICAL_80_PCT' | 'BREACHED';

export interface SlaEscalationStatus {
  ticketId: string;
  minutesRemaining: number;
  urgencyLevel: SlaUrgencyLevel;
  escalatedToRole?: string;
  autoActionTaken?: string;
}

@Injectable()
export class SlaEscalationMatrixService {
  private readonly logger = new Logger(SlaEscalationMatrixService.name);

  evaluateTicketSla(ticketId: string, elapsedMinutes: number, targetMinutes: number): SlaEscalationStatus {
    const remaining = Math.max(0, targetMinutes - elapsedMinutes);
    const elapsedRatio = elapsedMinutes / targetMinutes;

    if (elapsedRatio >= 1.0) {
      return {
        ticketId,
        minutesRemaining: 0,
        urgencyLevel: 'BREACHED',
        escalatedToRole: 'VP_OF_CUSTOMER_SUCCESS',
        autoActionTaken: 'Reassigned to Emergency SWAT Team & Notified Account Executive',
      };
    } else if (elapsedRatio >= 0.8) {
      return {
        ticketId,
        minutesRemaining: remaining,
        urgencyLevel: 'CRITICAL_80_PCT',
        escalatedToRole: 'SUPPORT_TEAM_LEAD',
        autoActionTaken: 'Triggered PagerDuty High-Priority Incident to Team Lead',
      };
    } else if (elapsedRatio >= 0.5) {
      return {
        ticketId,
        minutesRemaining: remaining,
        urgencyLevel: 'WARNING_50_PCT',
        escalatedToRole: 'SENIOR_SUPPORT_AGENT',
        autoActionTaken: 'Promoted Ticket Queue Position to Top Priority',
      };
    }

    return {
      ticketId,
      minutesRemaining: remaining,
      urgencyLevel: 'NORMAL',
    };
  }
}
