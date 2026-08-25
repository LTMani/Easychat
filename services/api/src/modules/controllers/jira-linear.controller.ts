import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { JiraConnectorService } from '../integrations/jira-connector.service';
import { LinearConnectorService } from '../integrations/linear-connector.service';

@Controller('v1/integrations/sync')
export class JiraLinearController {
  constructor(
    private readonly jiraService: JiraConnectorService,
    private readonly linearService: LinearConnectorService,
  ) {}

  @Post('jira/push-ticket')
  async pushTicketToJira(
    @Body()
    body: {
      ticketId: string;
      ticketNumber: string;
      subject: string;
      description: string;
      priority: string;
    },
  ) {
    if (!body.ticketNumber || !body.subject) {
      throw new BadRequestException('ticketNumber and subject are required');
    }

    const payload = this.jiraService.buildJiraIssueFromTicket({
      id: body.ticketId || 'tkt_01',
      ticketNumber: body.ticketNumber,
      subject: body.subject,
      description: body.description || '',
      priority: body.priority || 'MEDIUM',
    });

    return {
      status: 'success',
      data: {
        externalIssueKey: `SUP-${Math.floor(100 + Math.random() * 900)}`,
        jiraPayload: payload,
      },
    };
  }

  @Post('linear/push-ticket')
  async pushTicketToLinear(
    @Body()
    body: {
      ticketId: string;
      ticketNumber: string;
      subject: string;
      description: string;
      priority: string;
    },
  ) {
    const payload = this.linearService.buildLinearIssueFromTicket({
      id: body.ticketId || 'tkt_01',
      ticketNumber: body.ticketNumber,
      subject: body.subject,
      description: body.description || '',
      priority: body.priority || 'MEDIUM',
    });

    return {
      status: 'success',
      data: {
        linearIssueId: `lin_${Date.now()}`,
        linearPayload: payload,
      },
    };
  }
}
