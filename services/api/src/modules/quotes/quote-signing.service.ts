import { Injectable, Logger, NotFoundException, BadRequestException } from '@nestjs/common';
import { prisma } from '@easychat/database';

export interface SignQuoteDto {
  signerName: string;
  signerEmail: string;
  signatureImageBase64: string;
  ipAddress: string;
}

@Injectable()
export class QuoteSigningService {
  private readonly logger = new Logger(QuoteSigningService.name);

  async getPublicQuote(quoteId: string) {
    const quote = await prisma.dealQuote.findUnique({
      where: { id: quoteId },
      include: {
        lineItems: true,
        deal: {
          include: {
            contact: true,
            company: true,
          },
        },
      },
    });

    if (!quote) {
      throw new NotFoundException(`Quote ${quoteId} not found`);
    }

    return quote;
  }

  async signQuote(quoteId: string, dto: SignQuoteDto) {
    const quote = await this.getPublicQuote(quoteId);

    if (quote.status === 'ACCEPTED' || quote.status === 'REJECTED') {
      throw new BadRequestException(`Quote ${quoteId} is already ${quote.status}`);
    }

    this.logger.log(`Quote ${quote.quoteNumber} digitally signed by ${dto.signerName} (${dto.signerEmail}) from IP ${dto.ipAddress}`);

    const updatedQuote = await prisma.dealQuote.update({
      where: { id: quoteId },
      data: {
        status: 'ACCEPTED',
      },
    });

    if (quote.dealId) {
      await prisma.deal.update({
        where: { id: quote.dealId },
        data: { status: 'WON' },
      });
    }

    return {
      success: true,
      quoteNumber: updatedQuote.quoteNumber,
      signedAt: new Date().toISOString(),
      signerName: dto.signerName,
    };
  }
}
