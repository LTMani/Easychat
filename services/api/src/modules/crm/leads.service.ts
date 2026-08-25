import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { prisma, LeadStatus as DBLeadStatus, LeadSource as DBLeadSource, DealStatus as DBDealStatus } from '@easychat/database';
import { CreateLeadDto, ApiResponse } from '@easychat/shared';

@Injectable()
export class LeadsService {
  async getLeads(orgId: string): Promise<ApiResponse> {
    const leads = await prisma.lead.findMany({
      where: { organizationId: orgId },
      orderBy: { createdAt: 'desc' },
      include: {
        assignedTo: {
          select: { id: true, email: true, firstName: true, lastName: true },
        },
        company: true,
      },
    });

    return {
      success: true,
      data: leads,
    };
  }

  async createLead(orgId: string, dto: CreateLeadDto): Promise<ApiResponse> {
    const lead = await prisma.lead.create({
      data: {
        organizationId: orgId,
        title: dto.title,
        contactName: dto.contactName,
        email: dto.email,
        phone: dto.phone,
        source: (dto.source || 'WEBSITE') as unknown as DBLeadSource,
        score: dto.score || 10,
        assignedToId: dto.assignedToId,
        companyId: dto.companyId,
      },
      include: {
        assignedTo: {
          select: { id: true, email: true, firstName: true, lastName: true },
        },
      },
    });

    await prisma.auditLog.create({
      data: {
        organizationId: orgId,
        action: 'LEAD_CREATED',
        entityType: 'Lead',
        entityId: lead.id,
      },
    });

    return {
      success: true,
      message: 'Lead created successfully',
      data: lead,
    };
  }

  async convertLead(orgId: string, userId: string, leadId: string): Promise<ApiResponse> {
    const lead = await prisma.lead.findFirst({
      where: { id: leadId, organizationId: orgId },
    });

    if (!lead) {
      throw new NotFoundException('Lead not found');
    }

    if (lead.status === DBLeadStatus.CONVERTED) {
      throw new BadRequestException('Lead has already been converted');
    }

    // 1. Create or find Contact
    const nameParts = lead.contactName.split(' ');
    const firstName = nameParts[0] || lead.contactName;
    const lastName = nameParts.slice(1).join(' ') || 'Lead';

    let contact = await prisma.contact.findFirst({
      where: { organizationId: orgId, email: lead.email },
    });

    if (!contact) {
      contact = await prisma.contact.create({
        data: {
          organizationId: orgId,
          firstName,
          lastName,
          email: lead.email,
          phone: lead.phone,
          companyId: lead.companyId,
          tags: ['Converted Lead'],
        },
      });
    }

    // 2. Find or create default Pipeline & Stage
    let pipeline = await prisma.pipeline.findFirst({
      where: { organizationId: orgId, isDefault: true },
      include: { stages: { orderBy: { position: 'asc' } } },
    });

    if (!pipeline) {
      pipeline = await prisma.pipeline.create({
        data: {
          organizationId: orgId,
          name: 'Standard Sales Pipeline',
          isDefault: true,
          stages: {
            create: [
              { name: 'Discovery', position: 1, probability: 20, color: '#0284c7' },
              { name: 'Proposal Sent', position: 2, probability: 50, color: '#eab308' },
              { name: 'Negotiation', position: 3, probability: 80, color: '#f97316' },
              { name: 'Closed Won', position: 4, probability: 100, color: '#22c55e' },
              { name: 'Closed Lost', position: 5, probability: 0, color: '#ef4444' },
            ],
          },
        },
        include: { stages: { orderBy: { position: 'asc' } } },
      });
    }

    const firstStage = pipeline.stages[0];

    // 3. Create Deal
    const deal = await prisma.deal.create({
      data: {
        organizationId: orgId,
        pipelineId: pipeline.id,
        stageId: firstStage.id,
        contactId: contact.id,
        companyId: lead.companyId,
        assignedToId: lead.assignedToId || userId,
        title: `Deal: ${lead.title}`,
        amount: 5000,
        status: DBDealStatus.OPEN,
      },
    });

    // 4. Update Lead status
    const updatedLead = await prisma.lead.update({
      where: { id: leadId },
      data: { status: DBLeadStatus.CONVERTED },
    });

    await prisma.auditLog.create({
      data: {
        organizationId: orgId,
        userId,
        action: 'LEAD_CONVERTED',
        entityType: 'Lead',
        entityId: lead.id,
        metadata: { contactId: contact.id, dealId: deal.id },
      },
    });

    return {
      success: true,
      message: 'Lead converted successfully to Contact and Deal',
      data: {
        lead: updatedLead,
        contact,
        deal,
      },
    };
  }
}
