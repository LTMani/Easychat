import { Injectable, Logger } from '@nestjs/common';
import { prisma } from '@easychat/database';

export interface ImportTemplate {
  name: string;
  entity: 'CONTACT' | 'LEAD' | 'DEAL';
  fieldMappings: Array<{ csvColumn: string; crmField: string; required: boolean; transform?: string }>;
}

export interface ImportValidationResult {
  rowIndex: number;
  isValid: boolean;
  errors: string[];
  data: Record<string, unknown>;
}

export interface BulkImportResult {
  importId: string;
  totalRows: number;
  successCount: number;
  failureCount: number;
  errors: Array<{ row: number; message: string }>;
  duration: number;
}

@Injectable()
export class BulkImportService {
  private readonly logger = new Logger(BulkImportService.name);

  readonly CONTACT_IMPORT_TEMPLATE: ImportTemplate = {
    name: 'Contact Import',
    entity: 'CONTACT',
    fieldMappings: [
      { csvColumn: 'First Name', crmField: 'firstName', required: true },
      { csvColumn: 'Last Name', crmField: 'lastName', required: false },
      { csvColumn: 'Email', crmField: 'email', required: false },
      { csvColumn: 'Phone', crmField: 'phone', required: false },
      { csvColumn: 'Country', crmField: 'country', required: false, transform: 'UPPERCASE' },
      { csvColumn: 'Job Title', crmField: 'jobTitle', required: false },
      { csvColumn: 'Company', crmField: 'organizationName', required: false },
      { csvColumn: 'Lifetime Value', crmField: 'lifetimeValue', required: false, transform: 'PARSE_FLOAT' },
      { csvColumn: 'Tags', crmField: 'tags', required: false, transform: 'SPLIT_COMMA' },
    ],
  };

  readonly LEAD_IMPORT_TEMPLATE: ImportTemplate = {
    name: 'Lead Import',
    entity: 'LEAD',
    fieldMappings: [
      { csvColumn: 'Title', crmField: 'title', required: true },
      { csvColumn: 'Email', crmField: 'email', required: false },
      { csvColumn: 'Phone', crmField: 'phone', required: false },
      { csvColumn: 'Contact Name', crmField: 'contactName', required: false },
      { csvColumn: 'Source', crmField: 'source', required: false, transform: 'UPPERCASE' },
      { csvColumn: 'Score', crmField: 'score', required: false, transform: 'PARSE_INT' },
    ],
  };

  transformField(value: string, transform?: string): unknown {
    if (!transform || value === undefined || value === null) return value;

    switch (transform) {
      case 'UPPERCASE': return value.toUpperCase().trim();
      case 'LOWERCASE': return value.toLowerCase().trim();
      case 'PARSE_FLOAT': {
        const cleaned = value.replace(/[$,\s]/g, '');
        const parsed = parseFloat(cleaned);
        return isNaN(parsed) ? 0 : parsed;
      }
      case 'PARSE_INT': {
        const parsed = parseInt(value, 10);
        return isNaN(parsed) ? 0 : parsed;
      }
      case 'SPLIT_COMMA': return value.split(',').map((v) => v.trim()).filter(Boolean);
      default: return value;
    }
  }

  validateRow(row: Record<string, string>, template: ImportTemplate): ImportValidationResult {
    const errors: string[] = [];
    const data: Record<string, unknown> = {};

    for (const mapping of template.fieldMappings) {
      const rawValue = row[mapping.csvColumn];

      if (mapping.required && (!rawValue || rawValue.trim() === '')) {
        errors.push(`Required field '${mapping.csvColumn}' is missing or empty`);
        continue;
      }

      if (!rawValue) continue;

      if (mapping.crmField === 'email' && rawValue && !rawValue.includes('@')) {
        errors.push(`Invalid email address: ${rawValue}`);
        continue;
      }

      data[mapping.crmField] = this.transformField(rawValue, mapping.transform);
    }

    return { rowIndex: 0, isValid: errors.length === 0, errors, data };
  }

  parseCsvLine(line: string): string[] {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        if (inQuotes && line[i + 1] === '"') { current += '"'; i++; }
        else { inQuotes = !inQuotes; }
      } else if (char === ',' && !inQuotes) {
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }

    result.push(current.trim());
    return result;
  }

  async processContactImport(organizationId: string, rows: Array<Record<string, string>>): Promise<BulkImportResult> {
    this.logger.log(`Processing contact import of ${rows.length} rows for org ${organizationId}`);
    const start = Date.now();

    const importId = `import_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const errors: Array<{ row: number; message: string }> = [];
    let successCount = 0;

    for (let i = 0; i < rows.length; i++) {
      const validation = this.validateRow(rows[i], this.CONTACT_IMPORT_TEMPLATE);

      if (!validation.isValid) {
        errors.push({ row: i + 1, message: validation.errors.join('; ') });
        continue;
      }

      try {
        await prisma.contact.create({
          data: {
            organizationId,
            firstName: validation.data['firstName'] as string,
            lastName: validation.data['lastName'] as string | undefined,
            email: validation.data['email'] as string | undefined,
            phone: validation.data['phone'] as string | undefined,
            country: validation.data['country'] as string | undefined,
            jobTitle: validation.data['jobTitle'] as string | undefined,
            lifetimeValue: validation.data['lifetimeValue'] as number | undefined,
            source: 'IMPORT',
          },
        });
        successCount++;
      } catch (err: any) {
        errors.push({ row: i + 1, message: err.message });
      }
    }

    return {
      importId,
      totalRows: rows.length,
      successCount,
      failureCount: errors.length,
      errors,
      duration: Date.now() - start,
    };
  }
}
