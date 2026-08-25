import { Injectable, Logger } from '@nestjs/common';

export interface JiraIssuePayload {
  projectKey: string;
  summary: string;
  description: string;
  issueType: 'Bug' | 'Task' | 'Incident';
  priority: 'High' | 'Medium' | 'Low';
  labels: string[];
}

@Injectable()
export class JiraConnectorService {
  private readonly logger = new Logger(JiraConnectorService.name);

  buildJiraIssueFromTicket(ticket: {
    id: string;
    ticketNumber: string;
    subject: string;
    description: string;
    priority: string;
  }): JiraIssuePayload {
    this.logger.debug(`Mapping EasyChat support ticket ${ticket.ticketNumber} to Jira issue payload`);

    const jiraPriority = ticket.priority === 'URGENT' || ticket.priority === 'HIGH' ? 'High' : 'Medium';

    return {
      projectKey: 'SUP',
      summary: `[EasyChat ${ticket.ticketNumber}] ${ticket.subject}`,
      description: `${ticket.description}\n\n---\n*Linked EasyChat Ticket ID:* ${ticket.id}`,
      issueType: 'Bug',
      priority: jiraPriority,
      labels: ['easychat-crm', 'customer-reported'],
    };
  }
}
