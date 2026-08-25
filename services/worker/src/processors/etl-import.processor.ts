import { prisma } from '@easychat/database';

export interface EtlJobData {
  jobId: string;
  organizationId: string;
  rows: Array<Record<string, string>>;
}

export class EtlImportProcessor {
  async processJob(data: EtlJobData): Promise<boolean> {
    console.log(`[Worker] Processing ETL Ingestion Job ${data.jobId} (${data.rows.length} rows)`);

    await prisma.etlImportJob.update({
      where: { id: data.jobId },
      data: { status: 'PROCESSING' },
    });

    let successCount = 0;

    for (const row of data.rows) {
      if (row.email) {
        successCount++;
      }
    }

    await prisma.etlImportJob.update({
      where: { id: data.jobId },
      data: {
        status: 'COMPLETED',
        processedRows: successCount,
      },
    });

    return true;
  }
}
