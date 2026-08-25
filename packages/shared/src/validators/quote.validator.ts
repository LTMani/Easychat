import { z } from 'zod';

export const QuoteItemSchema = z.object({
  productId: z.string().optional(),
  name: z.string().min(1).max(200),
  sku: z.string().optional(),
  unitPrice: z.number().min(0),
  quantity: z.number().int().min(1).default(1),
  discountPercent: z.number().min(0).max(100).default(0),
  taxPercent: z.number().min(0).max(100).default(0),
  description: z.string().max(1000).optional(),
});

export const CreateQuoteSchema = z.object({
  dealId: z.string().cuid().optional(),
  contactId: z.string().cuid().optional(),
  title: z.string().min(2).max(200),
  currency: z.string().length(3).default('USD'),
  items: z.array(QuoteItemSchema).min(1, 'Quote must have at least one line item'),
  notes: z.string().max(2000).optional(),
  terms: z.string().max(5000).optional(),
  expiresAt: z.string().datetime().optional(),
});

export type CreateQuoteInput = z.infer<typeof CreateQuoteSchema>;
