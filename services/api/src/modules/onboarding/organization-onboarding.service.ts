import { Injectable, Logger } from '@nestjs/common';
import { prisma } from '@easychat/database';

export interface OnboardingStep {
  id: string;
  label: string;
  description: string;
  completed: boolean;
  completedAt?: string;
}

export interface OnboardingProgress {
  organizationId: string;
  completedSteps: number;
  totalSteps: number;
  percentComplete: number;
  steps: OnboardingStep[];
}

@Injectable()
export class OrganizationOnboardingService {
  private readonly logger = new Logger(OrganizationOnboardingService.name);

  private readonly ONBOARDING_STEPS = [
    { id: 'SETUP_PROFILE', label: 'Set up Organization Profile', description: 'Add your company name, logo, and primary timezone.' },
    { id: 'INVITE_TEAM', label: 'Invite Team Members', description: 'Add at least one agent or admin to your workspace.' },
    { id: 'CONNECT_CHANNEL', label: 'Connect a Communication Channel', description: 'Connect email, WhatsApp, or live chat to start receiving conversations.' },
    { id: 'CREATE_PIPELINE', label: 'Configure a Sales Pipeline', description: 'Define stages for your sales process.' },
    { id: 'SETUP_SLA', label: 'Set Up an SLA Policy', description: 'Configure first response and resolution time targets.' },
    { id: 'ADD_CONTACTS', label: 'Import Contacts', description: 'Import your existing customer database via CSV or ETL.' },
    { id: 'FIRST_CONVERSATION', label: 'Handle Your First Conversation', description: 'Reply to an incoming support or sales conversation.' },
    { id: 'ENABLE_AUTOMATION', label: 'Enable a Workflow Automation', description: 'Set up an auto-routing or auto-reply rule.' },
  ];

  async getOnboardingProgress(organizationId: string): Promise<OnboardingProgress> {
    this.logger.log(`Fetching onboarding progress for org ${organizationId}`);

    const org = await prisma.organization.findUnique({ where: { id: organizationId } });
    const memberCount = await prisma.organizationMember.count({ where: { organizationId } });
    const channelCount = await prisma.channelConfig.count({ where: { organizationId } });
    const pipelineCount = await prisma.pipeline.count({ where: { organizationId } });
    const contactCount = await prisma.contact.count({ where: { organizationId } });
    const conversationCount = await prisma.conversation.count({ where: { organizationId } });

    const stepResults: OnboardingStep[] = this.ONBOARDING_STEPS.map((step) => {
      let completed = false;

      switch (step.id) {
        case 'SETUP_PROFILE': completed = !!(org?.name); break;
        case 'INVITE_TEAM': completed = memberCount > 1; break;
        case 'CONNECT_CHANNEL': completed = channelCount > 0; break;
        case 'CREATE_PIPELINE': completed = pipelineCount > 0; break;
        case 'ADD_CONTACTS': completed = contactCount > 0; break;
        case 'FIRST_CONVERSATION': completed = conversationCount > 0; break;
        case 'SETUP_SLA': completed = false; break;
        case 'ENABLE_AUTOMATION': completed = false; break;
      }

      return { id: step.id, label: step.label, description: step.description, completed };
    });

    const completedSteps = stepResults.filter((s) => s.completed).length;

    return {
      organizationId,
      completedSteps,
      totalSteps: stepResults.length,
      percentComplete: parseFloat(((completedSteps / stepResults.length) * 100).toFixed(1)),
      steps: stepResults,
    };
  }
}
