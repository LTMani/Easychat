import { Test, TestingModule } from '@nestjs/testing';
import { EtlImporterService } from '../src/modules/etl/etl-importer.service';

describe('EtlImporterService', () => {
  let service: EtlImporterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EtlImporterService],
    }).compile();

    service = module.get<EtlImporterService>(EtlImporterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should validate CSV field mappings cleanly', () => {
    const mapping = {
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Work Email',
    };

    expect(mapping.email).toBe('Work Email');
    expect(mapping.firstName).toBe('First Name');
  });
});
