import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { GdprDataPortabilityService } from '../gdpr/gdpr-data-portability.service';

@Controller('v1/compliance/gdpr/portability')
export class GdprPortabilityController {
  constructor(private readonly gdprService: GdprDataPortabilityService) {}

  @Post('export')
  async exportCustomerData(
    @Body()
    body: {
      contactId: string;
      email: string;
      firstName: string;
      lastName?: string;
    },
  ) {
    if (!body.email || !body.firstName) {
      throw new BadRequestException('email and firstName are required');
    }

    const archive = this.gdprService.buildPortabilityBundle({
      id: body.contactId || 'c_101',
      email: body.email,
      firstName: body.firstName,
      lastName: body.lastName,
    });

    return {
      status: 'success',
      data: archive,
    };
  }
}
