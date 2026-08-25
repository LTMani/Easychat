import { Test, TestingModule } from '@nestjs/testing';
import { AiCustomerSupportBotService } from '../src/modules/ai/ai-customer-support-bot.service';

describe('AiCustomerSupportBotService', () => {
  let service: AiCustomerSupportBotService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AiCustomerSupportBotService],
    }).compile();
    service = module.get<AiCustomerSupportBotService>(AiCustomerSupportBotService);
  });

  it('should accurately answer pricing queries using knowledge base grounding', () => {
    const res = service.processCustomerMessage('How much does the Enterprise plan cost?', {
      organizationId: 'org_test',
      conversationHistory: [],
    });

    expect(res.messageText).toContain('$249/month');
    expect(res.citations.length).toBeGreaterThan(0);
    expect(res.confidenceScore).toBeGreaterThan(0.7);
  });

  it('should invoke ticket status lookup tool when ticket number is mentioned', () => {
    const res = service.processCustomerMessage('Can you check the status of ticket TKT-2026-1001?', {
      organizationId: 'org_test',
      conversationHistory: [],
    });

    expect(res.intent).toBe('TICKET_STATUS_INQUIRY');
    expect(res.toolInvoked?.name).toBe('getTicketStatus');
    expect(res.messageText).toContain('IN PROGRESS');
  });

  it('should escalate to human agent when customer requests human help', () => {
    const res = service.processCustomerMessage('I want to speak with a human manager immediately', {
      organizationId: 'org_test',
      conversationHistory: [],
    });

    expect(res.requiresHumanEscalation).toBe(true);
    expect(res.intent).toBe('HUMAN_AGENT_ESCALATION');
    expect(res.toolInvoked?.name).toBe('escalateToHumanAgent');
  });
});
