import { Injectable, NotFoundException } from '@nestjs/common';
import { prisma } from '@easychat/database';
import { CreateSlaPolicyDto, CreateTicketQueueDto } from '@easychat/shared';

@Injectable()
export class SlaPolicyService {
  async listPolicies(organizationId: string) {
    return prisma.slaPolicy.findMany({
      where: { organizationId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createPolicy(organizationId: string, dto: CreateSlaPolicyDto) {
    if (dto.isDefault) {
      await prisma.slaPolicy.updateMany({
        where: { organizationId, priority: dto.priority },
        data: { isDefault: false },
      });
    }

    return prisma.slaPolicy.create({
      data: {
        organizationId,
        name: dto.name,
        description: dto.description,
        priority: dto.priority,
        firstResponseMinutes: dto.firstResponseMinutes,
        nextResponseMinutes: dto.nextResponseMinutes,
        resolutionMinutes: dto.resolutionMinutes,
        isDefault: dto.isDefault,
      },
    });
  }

  async getPolicyById(organizationId: string, id: string) {
    const policy = await prisma.slaPolicy.findFirst({
      where: { id, organizationId },
    });

    if (!policy) {
      throw new NotFoundException(`SLA Policy ${id} not found`);
    }

    return policy;
  }

  async deletePolicy(organizationId: string, id: string) {
    await this.getPolicyById(organizationId, id);
    return prisma.slaPolicy.delete({
      where: { id },
    });
  }

  async listQueues(organizationId: string) {
    return prisma.ticketQueue.findMany({
      where: { organizationId },
      include: {
        team: true,
        members: {
          include: {
            user: true,
          },
        },
      },
    });
  }

  async createQueue(organizationId: string, dto: CreateTicketQueueDto) {
    const queue = await prisma.ticketQueue.create({
      data: {
        organizationId,
        name: dto.name,
        description: dto.description,
        teamId: dto.teamId,
        strategy: dto.strategy,
      },
    });

    if (dto.memberIds && dto.memberIds.length > 0) {
      await prisma.ticketQueueMember.createMany({
        data: dto.memberIds.map((userId) => ({
          queueId: queue.id,
          userId,
        })),
      });
    }

    return this.listQueues(organizationId);
  }

  async getBreachLogs(organizationId: string) {
    return prisma.slaBreachLog.findMany({
      where: {
        slaPolicy: {
          organizationId,
        },
      },
      include: {
        slaPolicy: true,
        ticket: true,
      },
      orderBy: { breachedAt: 'desc' },
      take: 100,
    });
  }
}
