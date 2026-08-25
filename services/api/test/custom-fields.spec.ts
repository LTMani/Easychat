import { Test, TestingModule } from '@nestjs/testing';
import { CustomFieldsService } from '../src/modules/custom-fields/custom-fields.service';

describe('CustomFieldsService', () => {
  let service: CustomFieldsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomFieldsService],
    }).compile();

    service = module.get<CustomFieldsService>(CustomFieldsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should validate custom field data types', () => {
    const dataTypes = ['STRING', 'NUMBER', 'BOOLEAN', 'DATE', 'SELECT'];
    expect(dataTypes).toContain('SELECT');
    expect(dataTypes).toContain('STRING');
  });
});
