import { Test, TestingModule } from '@nestjs/testing';
import { NlpExtractionService } from '../src/modules/ai/nlp-extraction.service';

describe('NlpExtractionService', () => {
  let service: NlpExtractionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NlpExtractionService],
    }).compile();
    service = module.get<NlpExtractionService>(NlpExtractionService);
  });

  it('should be defined', () => expect(service).toBeDefined());

  it('should extract email address from text', () => {
    const result = service.extractEntities('Please contact me at john.doe@example.com for more info.');
    const emails = result.entities.filter((e) => e.type === 'EMAIL');
    expect(emails).toHaveLength(1);
    expect(emails[0].value).toBe('john.doe@example.com');
    expect(emails[0].confidence).toBeGreaterThan(0.9);
  });

  it('should extract phone number in US format', () => {
    const result = service.extractEntities('Call me at (555) 123-4567 anytime.');
    const phones = result.entities.filter((e) => e.type === 'PHONE');
    expect(phones.length).toBeGreaterThan(0);
    expect(phones[0].value).toContain('555');
  });

  it('should extract dollar amount', () => {
    const result = service.extractEntities('The total invoice is $12,500.00 due next week.');
    const money = result.entities.filter((e) => e.type === 'MONEY');
    expect(money.length).toBeGreaterThan(0);
    expect(money[0].value).toContain('12,500');
  });

  it('should classify PRICING_INQUIRY intent for pricing keywords', () => {
    const { intent, confidence } = service.classifyIntent('I wanted to ask about your pricing and get a quote.');
    expect(intent).toBe('PRICING_INQUIRY');
    expect(confidence).toBeGreaterThan(0.8);
  });

  it('should classify CANCELLATION_REQUEST intent', () => {
    const { intent } = service.classifyIntent('I would like to cancel my subscription immediately.');
    expect(intent).toBe('CANCELLATION_REQUEST');
  });

  it('should classify SUPPORT_REQUEST for error-related messages', () => {
    const { intent } = service.classifyIntent('Hey, I am getting an error when I try to login. Please help.');
    expect(intent).toBe('SUPPORT_REQUEST');
  });

  it('should return UNKNOWN intent for unrecognized messages', () => {
    const { intent, confidence } = service.classifyIntent('Lorem ipsum dolor sit amet.');
    expect(intent).toBe('UNKNOWN');
    expect(confidence).toBeLessThan(0.5);
  });

  it('should extract multiple entities from a complex message', () => {
    const text = 'Hi, my name is John. Email: john@acme.com. Phone: 555-123-4567. We need a $50,000 contract signed by January 15, 2027.';
    const result = service.extractEntities(text);
    const types = result.entities.map((e) => e.type);
    expect(types).toContain('EMAIL');
    expect(types).toContain('PHONE');
    expect(types).toContain('MONEY');
    expect(types).toContain('DATE');
  });
});
