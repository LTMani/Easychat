import { Injectable, Logger } from '@nestjs/common';

export interface DripCampaignStep {
  stepNumber: number;
  delayHours: number;
  channel: 'EMAIL' | 'SMS' | 'WHATSAPP';
  templateSubject: string;
}

export interface DripSequenceEnrollment {
  enrollmentId: string;
  contactId: string;
  campaignId: string;
  currentStepIndex: number;
  enrolledAt: string;
  nextExecutionAt: string;
  status: 'ACTIVE' | 'COMPLETED' | 'UNSUBSCRIBED';
}

@Injectable()
export class DripCampaignSchedulerService {
  private readonly logger = new Logger(DripCampaignSchedulerService.name);

  enrollContactInDrip(contactId: string, campaignId: string = 'drip_onboarding_7day'): DripSequenceEnrollment {
    this.logger.debug(`Enrolling contact ${contactId} into drip sequence ${campaignId}`);

    const now = new Date();
    const nextExec = new Date(now.getTime() + 24 * 3600 * 1000).toISOString(); // 24 hours later

    return {
      enrollmentId: `enr_${Math.random().toString(36).substring(2, 10)}`,
      contactId,
      campaignId,
      currentStepIndex: 0,
      enrolledAt: now.toISOString(),
      nextExecutionAt: nextExec,
      status: 'ACTIVE',
    };
  }
}
