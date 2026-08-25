import { Injectable, Logger } from '@nestjs/common';
import * as crypto from 'crypto';

export interface WarehouseStreamingBatch {
  batchId: string;
  targetWarehouse: 'SNOWFLAKE_SNOWPIPE' | 'GOOGLE_BIGQUERY_STORAGE_WRITE' | 'DATABRICKS_DELTA_LAKE';
  tableName: string;
  recordsCount: number;
  bytesTransferred: number;
  compressionRatio: number;
  durationMs: number;
  status: 'COMMITTED' | 'STREAMING';
  checksumSha256: string;
  streamedAtIso: string;
}

@Injectable()
export class WarehouseSnowpipeStreamerService {
  private readonly logger = new Logger(WarehouseSnowpipeStreamerService.name);

  private readonly streamLog: WarehouseStreamingBatch[] = [];

  streamEventsToLakehouse(
    targetWarehouse: WarehouseStreamingBatch['targetWarehouse'],
    tableName: string,
    events: Array<Record<string, any>>,
  ): WarehouseStreamingBatch {
    this.logger.log(`Streaming ${events.length} CDC records into ${targetWarehouse} / ${tableName}`);

    const batchId = `sbatch_${crypto.randomBytes(8).toString('hex')}`;
    const rawJson = JSON.stringify(events);
    const hash = crypto.createHash('sha256').update(rawJson).digest('hex');

    const batch: WarehouseStreamingBatch = {
      batchId,
      targetWarehouse,
      tableName,
      recordsCount: events.length,
      bytesTransferred: Buffer.byteLength(rawJson),
      compressionRatio: 0.28, // Snappy Parquet compression simulation
      durationMs: 85,
      status: 'COMMITTED',
      checksumSha256: hash,
      streamedAtIso: new Date().toISOString(),
    };

    this.streamLog.push(batch);
    return batch;
  }

  listRecentBatches(): WarehouseStreamingBatch[] {
    return [...this.streamLog];
  }
}
