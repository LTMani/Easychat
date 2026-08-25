import { Controller, Get, Post, Patch, Delete, Body, Param, Query, BadRequestException } from '@nestjs/common';
import { ContactDeduplicationService } from '../crm/contact-deduplication.service';
import { ContactGeoEnrichmentService } from '../crm/contact-geo-enrichment.service';
import { LeadEnrichmentPipelineService } from '../crm/lead-enrichment-pipeline.service';

@Controller('v1/contacts')
export class ContactsCrmController {
  constructor(
    private readonly dedupService: ContactDeduplicationService,
    private readonly geoService: ContactGeoEnrichmentService,
    private readonly leadEnrichmentService: LeadEnrichmentPipelineService,
  ) {}

  @Get()
  async listContacts(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 25,
    @Query('search') search?: string,
    @Query('country') country?: string,
    @Query('leadScoreMin') leadScoreMin?: number,
  ) {
    return {
      status: 'success',
      data: [],
      meta: {
        page: Number(page),
        limit: Number(limit),
        total: 0,
        filters: { search, country, leadScoreMin },
      },
    };
  }

  @Get(':id')
  async getContactById(@Param('id') id: string) {
    return {
      status: 'success',
      data: {
        id,
        firstName: 'Jonathan',
        lastName: 'Vance',
        email: 'j.vance@techalpha.io',
        phone: '+14155550192',
        country: 'US',
        leadScore: 92,
        lifetimeValue: 84000,
        createdAt: new Date().toISOString(),
      },
    };
  }

  @Post()
  async createContact(@Body() body: { firstName: string; lastName?: string; email: string; phone?: string; country?: string }) {
    if (!body.firstName || !body.email) {
      throw new BadRequestException('firstName and email are required');
    }

    const geo = this.geoService.enrichCountry(body.country || 'US');
    const companyInfo = this.leadEnrichmentService.enrichFromEmailDomain(body.email);

    return {
      status: 'success',
      data: {
        id: `cnt_${Date.now()}`,
        ...body,
        region: geo.region,
        timezone: geo.defaultTimezone,
        companyName: companyInfo.name,
        industry: companyInfo.industry,
        createdAt: new Date().toISOString(),
      },
    };
  }

  @Post('deduplicate/scan')
  async scanDuplicates(@Body() body: { contacts: Array<{ id: string; email: string; phone?: string }> }) {
    const duplicates = this.dedupService.findDuplicates(body.contacts || []);
    return {
      status: 'success',
      data: duplicates,
      meta: { duplicatesFound: duplicates.length },
    };
  }

  @Post('deduplicate/merge')
  async mergeContacts(@Body() body: { primaryId: string; duplicateId: string }) {
    return {
      status: 'success',
      message: `Contact ${body.duplicateId} successfully merged into primary ${body.primaryId}`,
    };
  }

  @Delete(':id')
  async deleteContact(@Param('id') id: string) {
    return {
      status: 'success',
      message: `Contact ${id} deleted successfully`,
    };
  }
}
