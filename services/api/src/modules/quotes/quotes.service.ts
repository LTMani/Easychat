import { Injectable, NotFoundException } from '@nestjs/common';
import { prisma } from '@easychat/database';
import { CreateQuoteDto } from '@easychat/shared';
import { CpqEngineService } from './cpq-engine.service';

@Injectable()
export class QuotesService {
  constructor(private readonly cpqEngine: CpqEngineService) {}

  async listQuotesForDeal(dealId: string) {
    return prisma.dealQuote.findMany({
      where: { dealId },
      include: {
        lineItems: {
          include: { product: true },
        },
      },
    });
  }

  async createQuote(userId: string, dto: CreateQuoteDto) {
    const calc = this.cpqEngine.calculateTotals(
      dto.lineItems.map((item) => ({
        unitPrice: item.unitPrice,
        quantity: item.quantity,
        discountPercentage: item.discount,
      }))
    );

    const quoteNumber = `QT-${Date.now().toString().substring(5)}`;

    return prisma.dealQuote.create({
      data: {
        dealId: dto.dealId,
        createdById: userId,
        quoteNumber,
        totalAmount: calc.finalTotal,
        taxAmount: calc.totalTax,
        discountAmount: calc.totalDiscount,
        validUntil: new Date(dto.validUntil),
        notes: dto.notes || null,
        lineItems: {
          create: dto.lineItems.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            discount: item.discount,
            totalPrice: item.unitPrice * item.quantity * (1 - item.discount / 100),
          })),
        },
      },
      include: {
        lineItems: {
          include: { product: true },
        },
      },
    });
  }
}
