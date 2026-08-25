import { z } from 'zod';

export const JournalEntryLineSchema = z.object({
  accountId: z.string().min(1),
  accountName: z.string().min(1),
  accountType: z.enum(['ASSET', 'LIABILITY', 'EQUITY', 'REVENUE', 'EXPENSE']),
  debitUsd: z.number().min(0),
  creditUsd: z.number().min(0),
  memo: z.string().default(''),
});

export const JournalTransactionSchema = z.object({
  transactionId: z.string(),
  entryDateIso: z.string(),
  referenceNumber: z.string(),
  description: z.string(),
  lines: z.array(JournalEntryLineSchema).min(2),
  totalDebitUsd: z.number().positive(),
  totalCreditUsd: z.number().positive(),
  isBalanced: z.boolean(),
  postedBy: z.string(),
  tamperProofSha256: z.string(),
});

export type JournalEntryLineDto = z.infer<typeof JournalEntryLineSchema>;
export type JournalTransactionDto = z.infer<typeof JournalTransactionSchema>;
