import { Injectable } from '@nestjs/common';
import { prisma } from '@easychat/database';
import { CreateCustomFieldDto, ApiResponse } from '@easychat/shared';

@Injectable()
export class EnterpriseService {
  async getAuditLogs(orgId: string): Promise<ApiResponse> {
    const logs = await prisma.auditLog.findMany({
      where: { organizationId: orgId },
      orderBy: { createdAt: 'desc' },
      take: 100,
      include: {
        user: { select: { id: true, email: true, firstName: true, lastName: true } },
      },
    });

    return { success: true, data: logs };
  }

  async getCustomFields(orgId: string): Promise<ApiResponse> {
    const fields = await prisma.customFieldDefinition.findMany({
      where: { organizationId: orgId },
      orderBy: { createdAt: 'asc' },
    });
    return { success: true, data: fields };
  }

  async createCustomField(orgId: string, dto: CreateCustomFieldDto): Promise<ApiResponse> {
    const field = await prisma.customFieldDefinition.create({
      data: {
        organizationId: orgId,
        entityType: dto.entityType,
        fieldKey: dto.fieldKey,
        label: dto.label,
        dataType: dto.dataType || 'STRING',
        isRequired: dto.isRequired || false,
        options: JSON.stringify(dto.options || []),
      },
    });

    return { success: true, message: 'Custom field defined successfully', data: field };
  }
}
