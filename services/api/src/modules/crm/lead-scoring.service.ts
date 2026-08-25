import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { prisma } from '@easychat/database';

export interface LeadScoringResult {
  leadId: string;
  email: string;
  score: number;
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
  signals: string[];
}

@Injectable()
export class LeadScoringService {
  private readonly logger = new Logger(LeadScoringService.name);

  async scoreLead(organizationId: string, leadId: string): Promise<LeadScoringResult> {
    const lead = await prisma.lead.findFirst({
      where: { id: leadId, organizationId },
    });

    if (!lead) throw new BadRequestException(`Lead ${leadId} not found`);

    this.logger.log(`Scoring lead ${lead.email} for org ${organizationId}`);

    let score = 0;
    const signals: string[] = [];

    if (lead.source === 'WEBSITE') { score += 20; signals.push('Organic website inquiry (+20)'); }
    if (lead.source === 'REFERRAL') { score += 30; signals.push('Referral lead (+30)'); }
    if (lead.title?.toLowerCase().includes('director') || lead.title?.toLowerCase().includes('cto') || lead.title?.toLowerCase().includes('vp')) {
      score += 20;
      signals.push('Senior decision-maker title (+20)');
    }

    const grade = score >= 80 ? 'A' : score >= 60 ? 'B' : score >= 40 ? 'C' : score >= 20 ? 'D' : 'F';

    await prisma.lead.update({ where: { id: leadId }, data: { score } });

    return { leadId, email: lead.email, score, grade, signals };
  }

  async batchScoreLeads(organizationId: string): Promise<{ scored: number; averageScore: number }> {
    const leads = await prisma.lead.findMany({ where: { organizationId }, select: { id: true } });
    let totalScore = 0;

    for (const lead of leads) {
      try {
        const result = await this.scoreLead(organizationId, lead.id);
        totalScore += result.score;
      } catch (_) {}
    }

    return { scored: leads.length, averageScore: leads.length > 0 ? parseFloat((totalScore / leads.length).toFixed(2)) : 0 };
  }
}
