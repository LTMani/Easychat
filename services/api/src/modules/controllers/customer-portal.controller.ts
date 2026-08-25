import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { CustomerSelfServicePortalService, SelfServiceTicketRequest } from '../portal/customer-self-service-portal.service';

@Controller('v1/portal')
export class CustomerPortalController {
  constructor(private readonly portalService: CustomerSelfServicePortalService) {}

  @Post('tickets/submit')
  async submitTicket(@Body() body: SelfServiceTicketRequest) {
    if (!body.customerEmail || !body.subject || !body.description) {
      throw new BadRequestException('customerEmail, subject, and description are required');
    }

    const result = this.portalService.createPortalTicket(body);
    return {
      status: 'success',
      data: result,
    };
  }
}
