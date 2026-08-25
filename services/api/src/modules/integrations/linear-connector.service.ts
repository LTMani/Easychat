import { Injectable, Logger } from '@nestjs/common';

export interface LinearIssuePayload {
  teamId: string;
  title: string;
  description: string;
  priority: number; // 1 = Urgent, 2 = High, 3 = Normal, 4 = Low
}

@Injectable()
export class LinearConnectorService {
  private readonly logger = new Logger(LinearConnectorService.name);

  buildLinearIssueFromTicket(ticket: {
    id: string;
    ticketNumber: string;
    subject: string;
    description: string;
    priority: string;
  }, teamId: string = 'team_eng'): LinearIssuePayload {
    this.logger.debug(`Mapping EasyChat ticket ${ticket.ticketNumber} to Linear engineering issue`);

    let linearPriority = 3; // Normal
    if (ticket.priority === 'URGENT') linearPriority = 1;
    if (ticket.priority === 'HIGH') linearPriority = 2;

    return {
      teamId,
      title: `[Support ${ticket.ticketNumber}] ${ticket.subject}`,
      description: `### Customer Issue Description\n${ticket.description}\n\n**EasyChat Internal Reference:** \`${ticket.id}\``,
      priority: linearPriority,
    };
  }
}
