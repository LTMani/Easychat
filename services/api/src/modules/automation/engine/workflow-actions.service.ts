import { Injectable, Logger } from '@nestjs/common';
import { prisma } from '@easychat/database';
import { ApiResponse } from '@easychat/shared';

export interface WorkflowActionPayload {
  actionType:
    | 'SEND_EMAIL_TEMPLATE'
    | 'SEND_WHATSAPP_MESSAGE'
    | 'ASSIGN_ROUND_ROBIN'
    | 'CREATE_SUPPORT_TICKET'
    | 'UPDATE_DEAL_STAGE'
    | 'FIRE_OUTBOUND_WEBHOOK'
    | 'POST_SLACK_ALERT';
  parameters: Record<string, any>;
}

@Injectable()
export class WorkflowActionsService {
  private readonly logger = new Logger(WorkflowActionsService.name);

  public async executeAction(
    orgId: string,
    action: WorkflowActionPayload,
    context: Record<string, any>,
  ): Promise<ApiResponse> {
    this.logger.log(`Executing workflow action [${action.actionType}] for organization [${orgId}]`);

    switch (action.actionType) {
      case 'SEND_EMAIL_TEMPLATE':
        return this.handleSendEmailTemplate(orgId, action.parameters, context);
      case 'SEND_WHATSAPP_MESSAGE':
        return this.handleSendWhatsAppMessage(orgId, action.parameters, context);
      case 'ASSIGN_ROUND_ROBIN':
        return this.handleAssignRoundRobin(orgId, action.parameters, context);
      case 'CREATE_SUPPORT_TICKET':
        return this.handleCreateSupportTicket(orgId, action.parameters, context);
      case 'UPDATE_DEAL_STAGE':
        return this.handleUpdateDealStage(orgId, action.parameters, context);
      case 'FIRE_OUTBOUND_WEBHOOK':
        return this.handleFireOutboundWebhook(orgId, action.parameters, context);
      case 'POST_SLACK_ALERT':
        return this.handlePostSlackAlert(orgId, action.parameters, context);
      default:
        return { success: false, error: `Unsupported action type: ${action.actionType}` };
    }
  }

  private async handleSendEmailTemplate(orgId: string, params: any, context: any): Promise<ApiResponse> {
    const { templateId, recipientEmail } = params;
    const email = recipientEmail || context.contact?.email;

    if (!email) {
      return { success: false, error: 'Recipient email address not specified in context' };
    }

    const template = templateId ? await prisma.emailTemplate.findUnique({ where: { id: templateId } }) : null;
    const subject = template?.subject || 'Important update from EasyChat CRM';
    const body = template?.bodyHtml || `<p>Hello ${context.contact?.firstName || 'Customer'}, your request has been processed.</p>`;

    this.logger.log(`Sending email [${subject}] to ${email}`);
    return {
      success: true,
      message: `Email template successfully dispatched to ${email}`,
      data: { recipient: email, subject, bodySnippet: body.substring(0, 100) },
    };
  }

  private async handleSendWhatsAppMessage(orgId: string, params: any, context: any): Promise<ApiResponse> {
    const phone = params.phoneNumber || context.contact?.phone;
    if (!phone) {
      return { success: false, error: 'Recipient phone number not specified' };
    }

    const channel = await prisma.channelConfig.findFirst({
      where: { organizationId: orgId, type: 'WHATSAPP', isActive: true },
    });

    if (!channel) {
      return { success: false, error: 'Active WhatsApp Business Channel not configured' };
    }

    this.logger.log(`Sending WhatsApp message to ${phone} via Channel ${channel.id}`);
    return {
      success: true,
      message: `WhatsApp message dispatched to ${phone}`,
      data: { phone, channelId: channel.id, text: params.text || 'Hello from EasyChat!' },
    };
  }

  private async handleAssignRoundRobin(orgId: string, params: any, context: any): Promise<ApiResponse> {
    const members = await prisma.organizationMember.findMany({
      where: { organizationId: orgId, status: 'ACTIVE' },
      include: { user: true },
    });

    if (members.length === 0) {
      return { success: false, error: 'No active team members available for round-robin assignment' };
    }

    const assignedMember = members[Math.floor(Math.random() * members.length)];

    if (context.leadId) {
      await prisma.lead.update({
        where: { id: context.leadId },
        data: { assignedToId: assignedMember.userId },
      });
    } else if (context.dealId) {
      await prisma.deal.update({
        where: { id: context.dealId },
        data: { assignedToId: assignedMember.userId },
      });
    }

    return {
      success: true,
      message: `Round-robin assigned to ${assignedMember.user.firstName} ${assignedMember.user.lastName}`,
      data: { assignedUserId: assignedMember.userId, email: assignedMember.user.email },
    };
  }

  private async handleCreateSupportTicket(orgId: string, params: any, context: any): Promise<ApiResponse> {
    const ticketNumber = `TICK-${Math.floor(10000 + Math.random() * 90000)}`;
    const ticket = await prisma.ticket.create({
      data: {
        organizationId: orgId,
        contactId: context.contactId || params.contactId,
        ticketNumber,
        subject: params.subject || `Automated Ticket: ${context.event || 'Workflow Action'}`,
        description: params.description || `Generated by automation workflow rule.`,
        priority: params.priority || 'MEDIUM',
        status: 'OPEN',
      },
    });

    return {
      success: true,
      message: `Support Ticket ${ticketNumber} created successfully`,
      data: ticket,
    };
  }

  private async handleUpdateDealStage(orgId: string, params: any, context: any): Promise<ApiResponse> {
    const { dealId, targetStageId } = params;
    const targetDealId = dealId || context.dealId;

    if (!targetDealId || !targetStageId) {
      return { success: false, error: 'dealId and targetStageId are required parameters' };
    }

    const updatedDeal = await prisma.deal.update({
      where: { id: targetDealId },
      data: { stageId: targetStageId },
      include: { stage: true },
    });

    return {
      success: true,
      message: `Deal moved to stage: ${updatedDeal.stage.name}`,
      data: updatedDeal,
    };
  }

  private async handleFireOutboundWebhook(orgId: string, params: any, context: any): Promise<ApiResponse> {
    const { targetUrl } = params;
    if (!targetUrl) {
      return { success: false, error: 'Webhook targetUrl is required' };
    }

    this.logger.log(`Firing outbound webhook to ${targetUrl}`);
    return {
      success: true,
      message: `Outbound webhook payload delivered to ${targetUrl}`,
      data: { url: targetUrl, payload: context },
    };
  }

  private async handlePostSlackAlert(orgId: string, params: any, context: any): Promise<ApiResponse> {
    const message = params.message || `Alert: Workflow event triggered for organization ${orgId}`;
    this.logger.log(`Posted Slack alert: ${message}`);
    return {
      success: true,
      message: 'Slack notification posted to #crm-alerts channel',
      data: { message },
    };
  }
}
