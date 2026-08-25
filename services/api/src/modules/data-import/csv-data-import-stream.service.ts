import { Injectable, Logger } from '@nestjs/common';

export interface CsvImportRow {
  rowNumber: number;
  data: Record<string, string>;
  isValid: boolean;
  errors: string[];
}

export interface CsvImportResult {
  totalRows: number;
  validRowsCount: number;
  invalidRowsCount: number;
  parsedRecords: Array<Record<string, string>>;
  errors: Array<{ row: number; reason: string }>;
}

@Injectable()
export class CsvDataImportStreamService {
  private readonly logger = new Logger(CsvDataImportStreamService.name);

  parseCsvText(csvText: string, requiredColumns: string[] = ['email']): CsvImportResult {
    this.logger.debug(`Parsing raw CSV text stream with ${csvText.length} characters`);

    const lines = csvText.split(/\r?\n/).filter((l) => l.trim().length > 0);
    if (lines.length === 0) {
      return { totalRows: 0, validRowsCount: 0, invalidRowsCount: 0, parsedRecords: [], errors: [] };
    }

    const header = lines[0].split(',').map((h) => h.trim().replace(/^["']|["']$/g, ''));
    const parsedRecords: Array<Record<string, string>> = [];
    const errors: Array<{ row: number; reason: string }> = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map((v) => v.trim().replace(/^["']|["']$/g, ''));
      const record: Record<string, string> = {};

      header.forEach((col, idx) => {
        record[col] = values[idx] || '';
      });

      // Validation
      let isValid = true;
      for (const req of requiredColumns) {
        if (!record[req]) {
          errors.push({ row: i + 1, reason: `Missing required column value: '${req}'` });
          isValid = false;
        }
      }

      if (isValid) {
        parsedRecords.push(record);
      }
    }

    return {
      totalRows: lines.length - 1,
      validRowsCount: parsedRecords.length,
      invalidRowsCount: errors.length,
      parsedRecords,
      errors,
    };
  }
}
