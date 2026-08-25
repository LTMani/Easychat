import { Injectable, NotFoundException } from '@nestjs/common';
import { prisma, TaskStatus as DBTaskStatus } from '@easychat/database';
import { CreateTaskDto, UpdateTaskStatusDto, CreateCustomerDocumentDto, LinkConversationCrmDto, ApiResponse, Customer360TimelineItem } from '@easychat/shared';

@Injectable()
export class Customer360Service {
  async getTimeline(orgId: string, contactId: string): Promise<ApiResponse> {
    const contact = await prisma.contact.findFirst({
      where: { id: contactId, organizationId: orgId },
      include: {
        company: true,
        deals: { include: { stage: true } },
        activities: { include: { user: true } },
        tasks: { include: { assignedTo: true } },
        documents: { include: { uploadedBy: true } },
      },
    });

    if (!contact) {
      throw new NotFoundException('Contact not found');
    }

    // Build unified chronological timeline stream
    const items: Customer360TimelineItem[] = [];

    // 1. Activities (Notes, Calls, Meetings)
    contact.activities.forEach((act) => {
      items.push({
        id: act.id,
        type: 'ACTIVITY',
        title: `${act.type}: ${act.title}`,
        description: act.notes || undefined,
        timestamp: act.createdAt.toISOString(),
        actor: act.user as any,
      });
    });

    // 2. Tasks
    contact.tasks.forEach((tsk) => {
      items.push({
        id: tsk.id,
        type: 'TASK',
        title: `Task (${tsk.status}): ${tsk.title}`,
        description: tsk.description || undefined,
        timestamp: tsk.createdAt.toISOString(),
        actor: tsk.assignedTo as any,
      });
    });

    // 3. Documents
    contact.documents.forEach((doc) => {
      items.push({
        id: doc.id,
        type: 'DOCUMENT',
        title: `Uploaded Document: ${doc.fileName}`,
        description: `Size: ${(doc.fileSize / 1024).toFixed(1)} KB`,
        timestamp: doc.createdAt.toISOString(),
        actor: doc.uploadedBy as any,
      });
    });

    // Sort timeline chronologically descending
    items.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    return {
      success: true,
      data: {
        contact,
        timeline: items,
      },
    };
  }

  async createTask(orgId: string, userId: string, dto: CreateTaskDto): Promise<ApiResponse> {
    const task = await prisma.task.create({
      data: {
        organizationId: orgId,
        assignedToId: dto.assignedToId || userId,
        contactId: dto.contactId,
        dealId: dto.dealId,
        title: dto.title,
        description: dto.description,
        dueAt: dto.dueAt ? new Date(dto.dueAt) : undefined,
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
        userId,
        action: 'TASK_CREATED',
        entityType: 'Task',
        entityId: task.id,
      },
    });

    return {
      success: true,
      message: 'Task created successfully',
      data: task,
    };
  }

  async updateTaskStatus(orgId: string, taskId: string, dto: UpdateTaskStatusDto): Promise<ApiResponse> {
    const task = await prisma.task.findFirst({
      where: { id: taskId, organizationId: orgId },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    const updated = await prisma.task.update({
      where: { id: taskId },
      data: {
        status: dto.status as unknown as DBTaskStatus,
        completedAt: dto.status === 'COMPLETED' ? new Date() : null,
      },
    });

    return {
      success: true,
      message: 'Task status updated',
      data: updated,
    };
  }

  async uploadDocument(orgId: string, userId: string, dto: CreateCustomerDocumentDto): Promise<ApiResponse> {
    const doc = await prisma.customerDocument.create({
      data: {
        organizationId: orgId,
        uploadedById: userId,
        contactId: dto.contactId,
        companyId: dto.companyId,
        fileName: dto.fileName,
        fileUrl: dto.fileUrl,
        fileSize: dto.fileSize,
        mimeType: dto.mimeType,
      },
      include: {
        uploadedBy: {
          select: { id: true, email: true, firstName: true, lastName: true },
        },
      },
    });

    return {
      success: true,
      message: 'Document registered successfully',
      data: doc,
    };
  }

  async linkConversationToCrm(orgId: string, dto: LinkConversationCrmDto): Promise<ApiResponse> {
    const conversation = await prisma.conversation.findFirst({
      where: { id: dto.conversationId, organizationId: orgId },
    });

    if (!conversation) {
      throw new NotFoundException('Conversation not found');
    }

    const updated = await prisma.conversation.update({
      where: { id: dto.conversationId },
      data: {
        contactId: dto.contactId,
        dealId: dto.dealId,
      },
      include: {
        contact: true,
        deal: true,
      },
    });

    return {
      success: true,
      message: 'Conversation linked to CRM successfully',
      data: updated,
    };
  }
}
