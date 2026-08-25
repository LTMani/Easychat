import { Injectable, NotFoundException } from '@nestjs/common';
import { prisma, DealStatus as DBDealStatus } from '@easychat/database';
import { CreateDealDto, UpdateDealStageDto, ApiResponse } from '@easychat/shared';

@Injectable()
export class DealsService {
  async getPipelines(orgId: string): Promise<ApiResponse> {
    let pipelines = await prisma.pipeline.findMany({
      where: { organizationId: orgId },
      include: {
        stages: { orderBy: { position: 'asc' } },
      },
    });

    if (pipelines.length === 0) {
      const defaultPipeline = await prisma.pipeline.create({
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
      pipelines = [defaultPipeline];
    }

    return {
      success: true,
      data: pipelines,
    };
  }

  async getDeals(orgId: string, pipelineId?: string): Promise<ApiResponse> {
    const deals = await prisma.deal.findMany({
      where: {
        organizationId: orgId,
        pipelineId: pipelineId ? pipelineId : undefined,
      },
      include: {
        stage: true,
        contact: true,
        company: true,
        assignedTo: {
          select: { id: true, email: true, firstName: true, lastName: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return {
      success: true,
      data: deals,
    };
  }

  async createDeal(orgId: string, dto: CreateDealDto): Promise<ApiResponse> {
    const deal = await prisma.deal.create({
      data: {
        organizationId: orgId,
        pipelineId: dto.pipelineId,
        stageId: dto.stageId,
        title: dto.title,
        amount: dto.amount,
        currency: dto.currency || 'USD',
        contactId: dto.contactId,
        companyId: dto.companyId,
        assignedToId: dto.assignedToId,
        expectedCloseDate: dto.expectedCloseDate ? new Date(dto.expectedCloseDate) : undefined,
      },
      include: {
        stage: true,
        contact: true,
        company: true,
      },
    });

    await prisma.auditLog.create({
      data: {
        organizationId: orgId,
        action: 'DEAL_CREATED',
        entityType: 'Deal',
        entityId: deal.id,
      },
    });

    return {
      success: true,
      message: 'Deal created successfully',
      data: deal,
    };
  }

  async updateDealStage(orgId: string, dealId: string, dto: UpdateDealStageDto): Promise<ApiResponse> {
    const deal = await prisma.deal.findFirst({
      where: { id: dealId, organizationId: orgId },
    });

    if (!deal) {
      throw new NotFoundException('Deal not found');
    }

    const updated = await prisma.deal.update({
      where: { id: dealId },
      data: {
        stageId: dto.stageId,
        status: dto.status ? (dto.status as unknown as DBDealStatus) : deal.status,
        winLossReason: dto.winLossReason,
      },
      include: {
        stage: true,
        contact: true,
        company: true,
      },
    });

    await prisma.auditLog.create({
      data: {
        organizationId: orgId,
        action: 'DEAL_STAGE_UPDATED',
        entityType: 'Deal',
        entityId: deal.id,
        metadata: { stageId: dto.stageId, status: dto.status },
      },
    });

    return {
      success: true,
      message: 'Deal stage updated successfully',
      data: updated,
    };
  }
}
