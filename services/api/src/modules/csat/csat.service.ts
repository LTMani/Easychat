import { Injectable, NotFoundException } from '@nestjs/common';
import { prisma } from '@easychat/database';
import { SubmitCsatDto } from '@easychat/shared';

@Injectable()
export class CsatService {
  async getSurveys(organizationId: string) {
    return prisma.csatSurvey.findMany({
      where: { organizationId },
      include: {
        _count: {
          select: { responses: true },
        },
      },
    });
  }

  async createSurvey(organizationId: string, title: string, question: string) {
    return prisma.csatSurvey.create({
      data: {
        organizationId,
        title,
        question,
      },
    });
  }

  async submitResponse(dto: SubmitCsatDto) {
    const ticket = await prisma.ticket.findUnique({
      where: { id: dto.ticketId },
    });

    if (!ticket) {
      throw new NotFoundException(`Ticket ${dto.ticketId} not found`);
    }

    return prisma.csatResponse.create({
      data: {
        surveyId: dto.surveyId,
        ticketId: dto.ticketId,
        contactId: ticket.contactId || '',
        agentId: ticket.assignedToId || null,
        rating: dto.rating,
        feedback: dto.feedback || null,
      },
    });
  }

  async getSurveyMetrics(organizationId: string) {
    const responses = await prisma.csatResponse.findMany({
      where: {
        survey: { organizationId },
      },
    });

    if (responses.length === 0) {
      return {
        totalResponses: 0,
        averageRating: 0,
        csatScorePercentage: 0,
      };
    }

    const totalRating = responses.reduce((acc, r) => acc + r.rating, 0);
    const positiveCount = responses.filter((r) => r.rating >= 4).length;

    return {
      totalResponses: responses.length,
      averageRating: parseFloat((totalRating / responses.length).toFixed(2)),
      csatScorePercentage: parseFloat(((positiveCount / responses.length) * 100).toFixed(1)),
    };
  }
}
