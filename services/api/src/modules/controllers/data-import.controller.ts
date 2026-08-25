import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { CsvDataImportStreamService } from '../data-import/csv-data-import-stream.service';

@Controller('v1/data-import')
export class DataImportController {
  constructor(private readonly csvService: CsvDataImportStreamService) {}

  @Post('csv/preview')
  async previewCsv(
    @Body()
    body: {
      csvContent: string;
      requiredColumns?: string[];
    },
  ) {
    if (!body.csvContent) {
      throw new BadRequestException('csvContent is required');
    }

    const result = this.csvService.parseCsvText(
      body.csvContent,
      body.requiredColumns || ['email'],
    );

    return {
      status: 'success',
      data: result,
    };
  }
}
