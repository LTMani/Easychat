import { ConversationIntentService } from '../src/modules/conversations/conversation-intent.service';

describe('ConversationIntentService', () => {
  let service: ConversationIntentService;

  beforeEach(() => {
    service = new ConversationIntentService();
  });

  it('should detect PURCHASE_INTENT and suggest CREATE_LEAD and CREATE_DEAL actions', () => {
    const res = service.analyzeMessageIntent('I want to purchase your enterprise plan for 50 users.');
    expect(res.success).toBe(true);
    expect(res.data?.intent).toBe('PURCHASE_INTENT');
    expect(res.data?.suggestedActions.length).toBeGreaterThanOrEqual(2);
    expect(res.data?.suggestedActions[0].actionType).toBe('CREATE_LEAD');
  });

  it('should detect SUPPORT_ISSUE and suggest CREATE_TICKET action', () => {
    const res = service.analyzeMessageIntent('Our API webhook signature verification is not working and throwing errors.');
    expect(res.success).toBe(true);
    expect(res.data?.intent).toBe('SUPPORT_ISSUE');
    expect(res.data?.suggestedActions[0].actionType).toBe('CREATE_TICKET');
  });
});
