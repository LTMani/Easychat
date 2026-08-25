import { z } from 'zod';

export const WarehouseStreamingBatchSchema = z.object({
  batchId: z.string(),
  targetWarehouse: z.enum(['SNOWFLAKE_SNOWPIPE', 'GOOGLE_BIGQUERY_STORAGE_WRITE', 'DATABRICKS_DELTA_LAKE']),
  tableName: z.string(),
  recordsCount: z.number().int().positive(),
  bytesTransferred: z.number().int().positive(),
  compressionRatio: z.number().min(0).max(1),
  durationMs: z.number().positive(),
  status: z.enum(['COMMITTED', 'STREAMING']),
  checksumSha256: z.string(),
  streamedAtIso: z.string(),
});

export type WarehouseStreamingBatchDto = z.infer<typeof WarehouseStreamingBatchSchema>;
