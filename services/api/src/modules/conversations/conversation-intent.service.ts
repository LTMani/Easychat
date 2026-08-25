import { Injectable } from '@nestjs/common';
import { ApiResponse } from '@easychat/shared';

export interface SuggestedCrmAction {
  actionType: 'CREATE_LEAD' | 'CREATE_DEAL' | 'CREATE_TICKET' | 'UPDATE_DEAL_STAGE' | 'ASSIGN_AGENT';
  title: string;
  description: string;
  confidenceScore: number;
  payload: Record<string, any>;
}

@Injectable()
export class ConversationIntentService {
  public analyzeMessageIntent(text: string, contactId?: string): ApiResponse<{ intent: string; suggestedActions: SuggestedCrmAction[] }> {
    const lower = text.toLowerCase();
    const actions: SuggestedCrmAction[] = [];

    let intent = 'GENERAL_INQUIRY';

    if (lower.includes('enterprise plan') || lower.includes('pricing') || lower.includes('buy') || lower.includes('proposal')) {
      intent = 'PURCHASE_INTENT';
      actions.push({
        actionType: 'CREATE_LEAD',
        title: 'Create High-Intent Sales Lead',
        description: 'Customer expressed interest in enterprise plan pricing.',
        confidenceScore: 0.95,
        payload: {
          title: 'Enterprise Plan Purchase Inquiry',
          source: 'LIVE_CHAT',
          score: 85,
        },
      });

      actions.push({
        actionType: 'CREATE_DEAL',
        title: 'Open Sales Deal in Pipeline',
        description: 'Initiate $50,000 enterprise pipeline deal in Discovery stage.',
        confidenceScore: 0.88,
        payload: {
          title: 'Enterprise Deployment Deal',
          amount: 50000,
        },
      });
    } else if (lower.includes('error') || lower.includes('broken') || lower.includes('not working') || lower.includes('bug') || lower.includes('signature')) {
      intent = 'SUPPORT_ISSUE';
      actions.push({
        actionType: 'CREATE_TICKET',
        title: 'Create Urgent Support Ticket',
        description: 'Customer reported technical integration issue.',
        confidenceScore: 0.92,
        payload: {
          subject: 'Technical Integration Failure',
          priority: 'URGENT',
        },
      });
    }

    return {
      success: true,
      data: {
        intent,
        suggestedActions: actions,
      },
    };
  }
}
