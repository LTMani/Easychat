import { Injectable, NotFoundException } from '@nestjs/common';
import { prisma } from '@easychat/database';
import { CreateLeadDto, ApiResponse, LeadStatus } from '@easychat/shared';

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
        source: dto.source || 'WEBSITE',
        status: LeadStatus.NEW,
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

    const names = lead.contactName.split(' ');
    const firstName = names[0] || 'Lead';
    const lastName = names.slice(1).join(' ') || 'Customer';

    const contact = await prisma.contact.create({
      data: {
        organizationId: orgId,
        firstName,
        lastName,
        email: lead.email,
        phone: lead.phone,
        tags: JSON.stringify(['Converted Lead']),
      },
    });

    let pipeline = await prisma.pipeline.findFirst({
      where: { organizationId: orgId, isDefault: true },
      include: { stages: { orderBy: { position: 'asc' } } },
    });

    if (!pipeline || pipeline.stages.length === 0) {
      pipeline = await prisma.pipeline.create({
        data: {
          organizationId: orgId,
          name: 'Standard Sales Pipeline',
          isDefault: true,
          stages: {
            create: [
              { name: 'Discovery', position: 1, probability: 20 },
              { name: 'Proposal', position: 2, probability: 50 },
              { name: 'Negotiation', position: 3, probability: 80 },
              { name: 'Closed Won', position: 4, probability: 100 },
            ],
          },
        },
        include: { stages: { orderBy: { position: 'asc' } } },
      });
    }

    const firstStage = pipeline.stages[0];

    const deal = await prisma.deal.create({
      data: {
        organizationId: orgId,
        pipelineId: pipeline.id,
        stageId: firstStage.id,
        contactId: contact.id,
        assignedToId: userId,
        title: `Deal: ${lead.title}`,
        amount: 5000,
        currency: 'USD',
        status: 'OPEN',
      },
    });

    await prisma.lead.update({
      where: { id: leadId },
      data: {
        status: LeadStatus.CONVERTED,
      },
    });

    await prisma.auditLog.create({
      data: {
        organizationId: orgId,
        userId,
        action: 'LEAD_CONVERTED',
        entityType: 'Lead',
        entityId: leadId,
      },
    });

    return {
      success: true,
      message: 'Lead converted into Contact and Deal successfully',
      data: {
        contactId: contact.id,
        dealId: deal.id,
      },
    };
  }
}
