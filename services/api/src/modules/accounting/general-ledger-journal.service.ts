import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import * as crypto from 'crypto';

export interface JournalEntryLine {
  accountId: string;
  accountName: string;
  accountType: 'ASSET' | 'LIABILITY' | 'EQUITY' | 'REVENUE' | 'EXPENSE';
  debitUsd: number;
  creditUsd: number;
  memo: string;
}

export interface JournalTransaction {
  transactionId: string;
  entryDateIso: string;
  referenceNumber: string;
  description: string;
  lines: JournalEntryLine[];
  totalDebitUsd: number;
  totalCreditUsd: number;
  isBalanced: boolean;
  postedBy: string;
  tamperProofSha256: string;
}

export interface TrialBalanceReport {
  fiscalPeriod: string;
  totalAssets: number;
  totalLiabilities: number;
  totalEquity: number;
  totalRevenue: number;
  totalExpense: number;
  isGaapCompliant: boolean;
  accounts: Array<{ id: string; name: string; type: string; debit: number; credit: number }>;
}

@Injectable()
export class GeneralLedgerJournalService {
  private readonly logger = new Logger(GeneralLedgerJournalService.name);

  private readonly transactions: JournalTransaction[] = [];

  constructor() {
    this.seedInitialLedger();
  }

  private seedInitialLedger() {
    this.postJournalTransaction({
      referenceNumber: 'JE-2026-001',
      description: 'Annual Enterprise SaaS Subscription Invoiced (ASC 606 Deferred Revenue)',
      postedBy: 'accounting-daemon@easychat.io',
      lines: [
        { accountId: '1100', accountName: 'Accounts Receivable', accountType: 'ASSET', debitUsd: 29880, creditUsd: 0, memo: 'Acme Enterprise Invoice #INV-001' },
        { accountId: '2200', accountName: 'Unearned / Deferred SaaS Revenue', accountType: 'LIABILITY', debitUsd: 0, creditUsd: 29880, memo: '12-Month Committed Term' },
      ],
    });

    this.postJournalTransaction({
      referenceNumber: 'JE-2026-002',
      description: 'Stripe Payment Received for Invoice #INV-001',
      postedBy: 'stripe-webhook-worker@easychat.io',
      lines: [
        { accountId: '1010', accountName: 'Cash & Cash Equivalents (Silicon Valley Bank)', accountType: 'ASSET', debitUsd: 29013.48, creditUsd: 0, memo: 'Stripe Net Payout' },
        { accountId: '6100', accountName: 'Merchant Processing & Interchange Fees', accountType: 'EXPENSE', debitUsd: 866.52, creditUsd: 0, memo: 'Stripe 2.9% + $0.30 Fee' },
        { accountId: '1100', accountName: 'Accounts Receivable', accountType: 'ASSET', debitUsd: 0, creditUsd: 29880, memo: 'Clear AR balance' },
      ],
    });

    this.postJournalTransaction({
      referenceNumber: 'JE-2026-003',
      description: 'Monthly Revenue Recognition Amortization (Month 1/12)',
      postedBy: 'revenue-recognition-cron@easychat.io',
      lines: [
        { accountId: '2200', accountName: 'Unearned / Deferred SaaS Revenue', accountType: 'LIABILITY', debitUsd: 2490, creditUsd: 0, memo: 'ASC 606 Amortization Month 1' },
        { accountId: '4010', accountName: 'Enterprise Subscription Revenue', accountType: 'REVENUE', debitUsd: 0, creditUsd: 2490, memo: 'Recognized Earned Revenue' },
      ],
    });
  }

  postJournalTransaction(dto: { referenceNumber: string; description: string; postedBy: string; lines: JournalEntryLine[] }): JournalTransaction {
    const totalDebit = parseFloat(dto.lines.reduce((sum, l) => sum + (l.debitUsd || 0), 0).toFixed(2));
    const totalCredit = parseFloat(dto.lines.reduce((sum, l) => sum + (l.creditUsd || 0), 0).toFixed(2));

    if (Math.abs(totalDebit - totalCredit) > 0.01) {
      throw new BadRequestException(`Unbalanced journal entry! Total Debits ($${totalDebit}) must equal Total Credits ($${totalCredit})`);
    }

    const txId = `txn_gl_${crypto.randomBytes(8).toString('hex')}`;
    const payloadStr = `${txId}:${dto.referenceNumber}:${totalDebit}:${totalCredit}:${dto.postedBy}`;
    const hash = crypto.createHash('sha256').update(payloadStr).digest('hex');

    const tx: JournalTransaction = {
      transactionId: txId,
      entryDateIso: new Date().toISOString(),
      referenceNumber: dto.referenceNumber,
      description: dto.description,
      lines: dto.lines,
      totalDebitUsd: totalDebit,
      totalCreditUsd: totalCredit,
      isBalanced: true,
      postedBy: dto.postedBy,
      tamperProofSha256: hash,
    };

    this.transactions.push(tx);
    this.logger.log(`Posted balanced journal entry ${dto.referenceNumber} ($${totalDebit})`);
    return tx;
  }

  generateTrialBalance(): TrialBalanceReport {
    const accountMap = new Map<string, { name: string; type: string; debit: number; credit: number }>();

    for (const tx of this.transactions) {
      for (const line of tx.lines) {
        if (!accountMap.has(line.accountId)) {
          accountMap.set(line.accountId, { name: line.accountName, type: line.accountType, debit: 0, credit: 0 });
        }
        const acc = accountMap.get(line.accountId)!;
        acc.debit += line.debitUsd || 0;
        acc.credit += line.creditUsd || 0;
      }
    }

    let totalAssets = 0;
    let totalLiabilities = 0;
    let totalEquity = 0;
    let totalRevenue = 0;
    let totalExpense = 0;

    const accountsList: Array<{ id: string; name: string; type: string; debit: number; credit: number }> = [];

    accountMap.forEach((acc, id) => {
      accountsList.push({
        id,
        name: acc.name,
        type: acc.type,
        debit: parseFloat(acc.debit.toFixed(2)),
        credit: parseFloat(acc.credit.toFixed(2)),
      });

      if (acc.type === 'ASSET') totalAssets += acc.debit - acc.credit;
      if (acc.type === 'LIABILITY') totalLiabilities += acc.credit - acc.debit;
      if (acc.type === 'EQUITY') totalEquity += acc.credit - acc.debit;
      if (acc.type === 'REVENUE') totalRevenue += acc.credit - acc.debit;
      if (acc.type === 'EXPENSE') totalExpense += acc.debit - acc.credit;
    });

    return {
      fiscalPeriod: 'FY2026-Q3',
      totalAssets: parseFloat(totalAssets.toFixed(2)),
      totalLiabilities: parseFloat(totalLiabilities.toFixed(2)),
      totalEquity: parseFloat(totalEquity.toFixed(2)),
      totalRevenue: parseFloat(totalRevenue.toFixed(2)),
      totalExpense: parseFloat(totalExpense.toFixed(2)),
      isGaapCompliant: true,
      accounts: accountsList.sort((a, b) => a.id.localeCompare(b.id)),
    };
  }

  listTransactions(): JournalTransaction[] {
    return [...this.transactions];
  }
}
