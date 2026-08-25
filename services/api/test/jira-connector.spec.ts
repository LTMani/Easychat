import { Test, TestingModule } from '@nestjs/testing';
import { JiraConnectorService } from '../src/modules/integrations/jira-connector.service';

describe('JiraConnectorService', () => {
  let service: JiraConnectorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JiraConnectorService],
    }).compile();
    service = module.get<JiraConnectorService>(JiraConnectorService);
  });

  it('should map EasyChat support ticket to Jira bug issue payload', () => {
    const payload = service.buildJiraIssueFromTicket({
      id: 'tkt_991',
      ticketNumber: 'TKT-2026-991',
      subject: 'SSO Login Certificate Failure',
      description: 'Customer cannot authenticate with Okta',
      priority: 'URGENT',
    });

    expect(payload.projectKey).toBe('SUP');
    expect(payload.summary).toContain('TKT-2026-991');
    expect(payload.priority).toBe('High');
    expect(payload.labels).toContain('easychat-crm');
  });
});
