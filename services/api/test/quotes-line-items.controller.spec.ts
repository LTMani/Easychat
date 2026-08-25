import { Test, TestingModule } from '@nestjs/testing';
import { QuotesLineItemsController } from '../src/modules/controllers/quotes-line-items.controller';

describe('QuotesLineItemsController', () => {
  let controller: QuotesLineItemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuotesLineItemsController],
    }).compile();
    controller = module.get<QuotesLineItemsController>(QuotesLineItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should calculate line items, discounts, and grand totals', async () => {
    const res = await controller.createQuote({
      dealId: 'deal_1',
      title: 'Enterprise Quote',
      items: [
        { productId: 'p1', description: 'Enterprise Plan', unitPrice: 2000, quantity: 2, discountPercent: 10 },
      ],
    });

    expect(res.status).toBe('success');
    expect(res.data.subtotal).toBe(3600); // 4000 * 0.9 = 3600
    expect(res.data.grandTotal).toBeGreaterThan(3600);
  });
});
