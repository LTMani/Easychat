import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { prisma } from '@easychat/database';

export interface EtlMappingConfig {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  companyName?: string;
}

export interface EtlImportRow {
  [key: string]: string;
}

@Injectable()
export class EtlImporterService {
  private readonly logger = new Logger(EtlImporterService.name);

  async createJob(
    organizationId: string,
    userId: string,
    fileName: string,
    entityType: string,
    fieldMapping: EtlMappingConfig
  ) {
    return prisma.etlImportJob.create({
      data: {
        organizationId,
        createdById: userId,
        fileName,
        entityType,
        fieldMapping: JSON.stringify(fieldMapping),
        status: 'PENDING',
      },
    });
  }

  async processRows(
    jobId: string,
    rows: EtlImportRow[]
  ): Promise<{ processed: number; failed: number }> {
    const job = await prisma.etlImportJob.findUnique({
      where: { id: jobId },
    });

    if (!job) {
      throw new BadRequestException(`ETL Job ${jobId} not found`);
    }

    const mapping: EtlMappingConfig = JSON.parse(job.fieldMapping || '{}');
    let processed = 0;
    let failed = 0;

    await prisma.etlImportJob.update({
      where: { id: jobId },
      data: { status: 'PROCESSING', totalRows: rows.length },
    });

    for (const row of rows) {
      try {
        const email = row[mapping.email];
        const firstName = row[mapping.firstName] || 'Imported';
        const lastName = row[mapping.lastName] || 'Contact';

        if (!email) {
          failed++;
          continue;
        }

        const existing = await prisma.contact.findFirst({
          where: {
            organizationId: job.organizationId,
            email,
          },
        });

        if (existing) {
          await prisma.contact.update({
            where: { id: existing.id },
            data: {
              firstName,
              lastName,
              phone: mapping.phone ? row[mapping.phone] || existing.phone : existing.phone,
            },
          });
        } else {
          await prisma.contact.create({
            data: {
              organizationId: job.organizationId,
              email,
              firstName,
              lastName,
              phone: mapping.phone ? row[mapping.phone] : null,
            },
          });
        }
        processed++;
      } catch (err: any) {
        failed++;
        this.logger.error(`ETL Row Error: ${err.message}`);
      }
    }

    await prisma.etlImportJob.update({
      where: { id: jobId },
      data: {
        status: failed === 0 ? 'COMPLETED' : 'COMPLETED_WITH_ERRORS',
        processedRows: processed,
        failedRows: failed,
      },
    });

    return { processed, failed };
  }

  async getJobs(organizationId: string) {
    return prisma.etlImportJob.findMany({
      where: { organizationId },
      orderBy: { createdAt: 'desc' },
    });
  }
}
