import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { prisma } from '@easychat/database';

export interface CreateCustomFieldDto {
  entityType: 'CONTACT' | 'COMPANY' | 'LEAD' | 'DEAL' | 'TICKET';
  fieldKey: string;
  label: string;
  dataType: 'STRING' | 'NUMBER' | 'BOOLEAN' | 'DATE' | 'SELECT';
  isRequired?: boolean;
  options?: string[];
}

@Injectable()
export class CustomFieldsService {
  async getFields(organizationId: string, entityType?: string) {
    return prisma.customFieldDefinition.findMany({
      where: {
        organizationId,
        ...(entityType ? { entityType } : {}),
      },
    });
  }

  async createField(organizationId: string, dto: CreateCustomFieldDto) {
    const existing = await prisma.customFieldDefinition.findFirst({
      where: {
        organizationId,
        entityType: dto.entityType,
        fieldKey: dto.fieldKey,
      },
    });

    if (existing) {
      throw new BadRequestException(
        `Field key '${dto.fieldKey}' already exists for entity '${dto.entityType}'`
      );
    }

    return prisma.customFieldDefinition.create({
      data: {
        organizationId,
        entityType: dto.entityType,
        fieldKey: dto.fieldKey,
        label: dto.label,
        dataType: dto.dataType,
        isRequired: dto.isRequired || false,
        options: JSON.stringify(dto.options || []),
      },
    });
  }

  async deleteField(organizationId: string, id: string) {
    const field = await prisma.customFieldDefinition.findFirst({
      where: { id, organizationId },
    });

    if (!field) {
      throw new NotFoundException(`Custom field ${id} not found`);
    }

    return prisma.customFieldDefinition.delete({
      where: { id },
    });
  }

  async setFieldValue(
    definitionId: string,
    contactId: string,
    value: string
  ) {
    const existing = await prisma.customFieldValue.findFirst({
      where: { definitionId, contactId },
    });

    if (existing) {
      return prisma.customFieldValue.update({
        where: { id: existing.id },
        data: { value },
      });
    }

    return prisma.customFieldValue.create({
      data: {
        definitionId,
        contactId,
        value,
      },
    });
  }
}
