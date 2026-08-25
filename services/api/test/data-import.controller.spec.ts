import { Test, TestingModule } from '@nestjs/testing';
import { DataImportController } from '../src/modules/controllers/data-import.controller';
import { CsvDataImportStreamService } from '../src/modules/data-import/csv-data-import-stream.service';

describe('DataImportController', () => {
  let controller: DataImportController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DataImportController],
      providers: [CsvDataImportStreamService],
    }).compile();
    controller = module.get<DataImportController>(DataImportController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should parse and preview CSV content', async () => {
    const res = await controller.previewCsv({
      csvContent: `email,firstName\nsarah@acme.com,Sarah`,
      requiredColumns: ['email'],
    });

    expect(res.status).toBe('success');
    expect(res.data.validRowsCount).toBe(1);
  });
});
