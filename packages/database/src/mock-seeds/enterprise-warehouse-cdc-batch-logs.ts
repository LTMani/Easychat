export interface MockWarehouseCdcBatch {
  batchId: string;
  destinationWarehouse: 'SNOWFLAKE_ENTERPRISE' | 'BIGQUERY_ANALYTICS' | 'DATABRICKS_LAKEHOUSE';
  sourceCdcStream: 'CONTACTS_CDC' | 'CONVERSATION_EVENTS_CDC' | 'PAYMENT_TRANSACTIONS_CDC';
  recordsProcessed: number;
  uncompressedBytes: number;
  snappyCompressedBytes: number;
  executionDurationMs: number;
  committedStatus: 'SUCCESS_COMMITTED' | 'RETRY_BUFFERED';
}

export const ENTERPRISE_WAREHOUSE_CDC_BATCH_LOGS: MockWarehouseCdcBatch[] = [
  { batchId: 'cdc_batch_sf_901', destinationWarehouse: 'SNOWFLAKE_ENTERPRISE', sourceCdcStream: 'CONVERSATION_EVENTS_CDC', recordsProcessed: 48920, uncompressedBytes: 18492019, snappyCompressedBytes: 5120849, executionDurationMs: 84, committedStatus: 'SUCCESS_COMMITTED' },
  { batchId: 'cdc_batch_bq_902', destinationWarehouse: 'BIGQUERY_ANALYTICS', sourceCdcStream: 'CONTACTS_CDC', recordsProcessed: 12400, uncompressedBytes: 4210958, snappyCompressedBytes: 1180492, executionDurationMs: 62, committedStatus: 'SUCCESS_COMMITTED' },
  { batchId: 'cdc_batch_db_903', destinationWarehouse: 'DATABRICKS_LAKEHOUSE', sourceCdcStream: 'PAYMENT_TRANSACTIONS_CDC', recordsProcessed: 3150, uncompressedBytes: 1048576, snappyCompressedBytes: 294801, executionDurationMs: 41, committedStatus: 'SUCCESS_COMMITTED' },
];
