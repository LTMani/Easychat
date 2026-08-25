import { TicketsService } from '../modules/support/tickets.service';
import { KnowledgeBaseService } from '../modules/support/knowledge-base.service';

describe('Support Services Unit Tests', () => {
  let ticketsService: TicketsService;
  let kbService: KnowledgeBaseService;

  beforeEach(() => {
    ticketsService = new TicketsService();
    kbService = new KnowledgeBaseService();
  });

  it('should instantiate TicketsService and KnowledgeBaseService correctly', () => {
    expect(ticketsService).toBeDefined();
    expect(kbService).toBeDefined();
  });
});
