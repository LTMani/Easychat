import { Controller, Get, Post, Body, BadRequestException } from '@nestjs/common';
import { GeneralLedgerJournalService, JournalEntryLine } from '../accounting/general-ledger-journal.service';

@Controller('v1/accounting/ledger')
export class GeneralLedgerController {
  constructor(private readonly ledgerService: GeneralLedgerJournalService) {}

  @Get('transactions')
  async getTransactions() {
    const list = this.ledgerService.listTransactions();
    return {
      status: 'success',
      data: list,
    };
  }

  @Get('trial-balance')
  async getTrialBalance() {
    const report = this.ledgerService.generateTrialBalance();
    return {
      status: 'success',
      data: report,
    };
  }

  @Post('transactions/post')
  async postTransaction(
    @Body()
    body: {
      referenceNumber: string;
      description: string;
      postedBy: string;
      lines: JournalEntryLine[];
    },
  ) {
    if (!body.referenceNumber || !body.lines || body.lines.length < 2) {
      throw new BadRequestException('referenceNumber and at least 2 journal entry lines are required');
    }

    const tx = this.ledgerService.postJournalTransaction(body);
    return {
      status: 'success',
      data: tx,
    };
  }
}
