import { Test, TestingModule } from '@nestjs/testing';
import { ContactDeduplicationService } from '../src/modules/crm/contact-deduplication.service';

describe('ContactDeduplicationService', () => {
  let service: ContactDeduplicationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContactDeduplicationService],
    }).compile();
    service = module.get<ContactDeduplicationService>(ContactDeduplicationService);
  });

  it('should be defined', () => expect(service).toBeDefined());

  it('should normalize email to lowercase and trimmed', () => {
    const result = (service as any).normalizeEmail('  John@Example.COM  ');
    expect(result).toBe('john@example.com');
  });

  it('should normalize phone by stripping spaces, dashes, and country code prefix', () => {
    const result = (service as any).normalizePhone('+1 (555) 123-4567');
    expect(result).toBe('15551234567');
  });

  it('should strip leading zeros from phone numbers', () => {
    const result = (service as any).normalizePhone('0044 207 946 0958');
    expect(result).toBe('442079460958');
  });

  it('should handle empty email gracefully in normalize', () => {
    const result = (service as any).normalizeEmail('');
    expect(result).toBe('');
  });

  it('should handle phone numbers with parentheses and periods', () => {
    const result = (service as any).normalizePhone('(555) 123.4567');
    expect(result).toBe('5551234567');
  });
});
