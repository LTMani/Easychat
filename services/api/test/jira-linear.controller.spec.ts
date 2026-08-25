import { Test, TestingModule } from '@nestjs/testing';
import { JiraLinearController } from '../src/modules/controllers/jira-linear.controller';
import { JiraConnectorService } from '../src/modules/integrations/jira-connector.service';
import { LinearConnectorService } from '../src/modules/integrations/linear-connector.service';

describe('JiraLinearController', () => {
  let controller: JiraLinearController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JiraLinearController],
      providers: [JiraConnectorService, LinearConnectorService],
    }).compile();
    controller = module.get<JiraLinearController>(JiraLinearController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should push ticket to Jira with external issue key', async () => {
    const res = await controller.pushTicketToJira({
      ticketId: 'tkt_01',
      ticketNumber: 'TKT-2026-001',
      subject: 'Critical login bug',
      description: 'Customer cannot log in',
      priority: 'URGENT',
    });

    expect(res.status).toBe('success');
    expect(res.data.externalIssueKey).toContain('SUP-');
  });
});
