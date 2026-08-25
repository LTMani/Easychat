import { EasyChatHttpClient } from '../client/http-client';
import { WarehouseStreamingBatchDto } from '@easychat/shared';

export class WarehouseCdcClient {
  constructor(private readonly http: EasyChatHttpClient) {}

  async listBatches(): Promise<WarehouseStreamingBatchDto[]> {
    const res = await this.http.get<{ status: string; data: WarehouseStreamingBatchDto[] }>('/v1/analytics/cdc/batches');
    return res.data;
  }

  async streamBatch(targetWarehouse: string, tableName: string, events: Array<Record<string, any>>): Promise<WarehouseStreamingBatchDto> {
    const res = await this.http.post<{ status: string; data: WarehouseStreamingBatchDto }>('/v1/analytics/cdc/stream', { targetWarehouse, tableName, events });
    return res.data;
  }
}
