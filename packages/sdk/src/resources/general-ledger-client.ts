import { EasyChatHttpClient } from '../client/http-client';
import { JournalTransactionDto, JournalEntryLineDto } from '@easychat/shared';

export class GeneralLedgerClient {
  constructor(private readonly http: EasyChatHttpClient) {}

  async listTransactions(): Promise<JournalTransactionDto[]> {
    const res = await this.http.get<{ status: string; data: JournalTransactionDto[] }>('/v1/accounting/ledger/transactions');
    return res.data;
  }

  async getTrialBalance(): Promise<any> {
    const res = await this.http.get<{ status: string; data: any }>('/v1/accounting/ledger/trial-balance');
    return res.data;
  }

  async postTransaction(params: { referenceNumber: string; description: string; postedBy: string; lines: JournalEntryLineDto[] }): Promise<JournalTransactionDto> {
    const res = await this.http.post<{ status: string; data: JournalTransactionDto }>('/v1/accounting/ledger/transactions/post', params);
    return res.data;
  }
}
