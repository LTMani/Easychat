import { Test, TestingModule } from '@nestjs/testing';
import { BulkImportService } from '../src/modules/etl/bulk-import.service';

describe('BulkImportService', () => {
  let service: BulkImportService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BulkImportService],
    }).compile();
    service = module.get<BulkImportService>(BulkImportService);
  });

  it('should be defined', () => expect(service).toBeDefined());

  it('should parse a simple CSV line into fields', () => {
    const result = service.parseCsvLine('John,Doe,john@example.com,+15551234567');
    expect(result).toEqual(['John', 'Doe', 'john@example.com', '+15551234567']);
  });

  it('should handle quoted CSV fields with commas', () => {
    const result = service.parseCsvLine('"Smith, John",Doe,john@example.com');
    expect(result[0]).toBe('Smith, John');
    expect(result[1]).toBe('Doe');
  });

  it('should transform UPPERCASE field', () => {
    const result = service.transformField('us', 'UPPERCASE');
    expect(result).toBe('US');
  });

  it('should transform PARSE_FLOAT from formatted currency string', () => {
    const result = service.transformField('$12,500.00', 'PARSE_FLOAT');
    expect(result).toBe(12500);
  });

  it('should transform SPLIT_COMMA into an array', () => {
    const result = service.transformField('enterprise, vip, priority', 'SPLIT_COMMA');
    expect(result).toEqual(['enterprise', 'vip', 'priority']);
  });

  it('should validate required fields and report errors for missing firstName', () => {
    const row = { 'First Name': '', 'Email': 'test@example.com' };
    const result = service.validateRow(row, service.CONTACT_IMPORT_TEMPLATE);
    expect(result.isValid).toBe(false);
    expect(result.errors.some((e) => e.includes("'First Name'"))).toBe(true);
  });

  it('should validate invalid email format', () => {
    const row = { 'First Name': 'John', 'Email': 'not-an-email' };
    const result = service.validateRow(row, service.CONTACT_IMPORT_TEMPLATE);
    expect(result.isValid).toBe(false);
    expect(result.errors.some((e) => e.includes('email'))).toBe(true);
  });

  it('should pass validation for a complete valid row', () => {
    const row = { 'First Name': 'Jane', 'Last Name': 'Smith', 'Email': 'jane@example.com', 'Country': 'US', 'Lifetime Value': '5000' };
    const result = service.validateRow(row, service.CONTACT_IMPORT_TEMPLATE);
    expect(result.isValid).toBe(true);
    expect(result.data['firstName']).toBe('Jane');
    expect(result.data['email']).toBe('jane@example.com');
    expect(result.data['country']).toBe('US');
  });

  it('should return 0 for non-numeric PARSE_FLOAT input', () => {
    const result = service.transformField('N/A', 'PARSE_FLOAT');
    expect(result).toBe(0);
  });
});
