import { Test, TestingModule } from '@nestjs/testing';
import { CsvDataImportStreamService } from '../src/modules/data-import/csv-data-import-stream.service';

describe('CsvDataImportStreamService', () => {
  let service: CsvDataImportStreamService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CsvDataImportStreamService],
    }).compile();
    service = module.get<CsvDataImportStreamService>(CsvDataImportStreamService);
  });

  it('should parse valid CSV text and return structured records', () => {
    const csv = `firstName,lastName,email,phone\nSarah,Jenkins,sarah@acme.com,+14155550192\nAlex,Mercer,alex@acme.com,+14155550193`;
    const res = service.parseCsvText(csv, ['email', 'firstName']);

    expect(res.totalRows).toBe(2);
    expect(res.validRowsCount).toBe(2);
    expect(res.parsedRecords[0].email).toBe('sarah@acme.com');
  });

  it('should flag rows missing required columns', () => {
    const csv = `firstName,email\nSarah,sarah@acme.com\nMissingEmail,`;
    const res = service.parseCsvText(csv, ['email']);

    expect(res.validRowsCount).toBe(1);
    expect(res.invalidRowsCount).toBe(1);
    expect(res.errors[0].row).toBe(3);
  });
});
