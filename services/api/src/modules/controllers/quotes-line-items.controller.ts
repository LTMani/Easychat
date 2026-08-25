import { Controller, Get, Post, Patch, Body, Param, Query, BadRequestException } from '@nestjs/common';

export interface QuoteLineItem {
  productId: string;
  description: string;
  unitPrice: number;
  quantity: number;
  discountPercent?: number;
}

@Controller('v1/quotes')
export class QuotesLineItemsController {
  @Get()
  async listQuotes(@Query('dealId') dealId?: string) {
    return {
      status: 'success',
      data: [],
      meta: { dealId },
    };
  }

  @Post()
  async createQuote(
    @Body()
    body: {
      dealId: string;
      title: string;
      items: QuoteLineItem[];
      currency?: string;
    },
  ) {
    if (!body.items || body.items.length === 0) {
      throw new BadRequestException('At least 1 quote line item is required');
    }

    let subtotal = 0;
    const computedItems = body.items.map((item) => {
      const discount = item.discountPercent ? item.discountPercent / 100 : 0;
      const lineTotal = item.unitPrice * item.quantity * (1 - discount);
      subtotal += lineTotal;
      return { ...item, lineTotal: parseFloat(lineTotal.toFixed(2)) };
    });

    const taxAmount = parseFloat((subtotal * 0.19).toFixed(2)); // Default 19% VAT
    const grandTotal = parseFloat((subtotal + taxAmount).toFixed(2));

    return {
      status: 'success',
      data: {
        id: `q_${Date.now()}`,
        quoteNumber: `Q-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        dealId: body.dealId,
        title: body.title,
        currency: body.currency || 'USD',
        status: 'DRAFT',
        subtotal: parseFloat(subtotal.toFixed(2)),
        taxAmount,
        grandTotal,
        items: computedItems,
        createdAt: new Date().toISOString(),
      },
    };
  }
}
