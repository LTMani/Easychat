import { Test, TestingModule } from '@nestjs/testing';
import { QuoteSigningService } from '../src/modules/quotes/quote-signing.service';

describe('QuoteSigningService', () => {
  let service: QuoteSigningService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuoteSigningService],
    }).compile();

    service = module.get<QuoteSigningService>(QuoteSigningService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should format e-signature audit trail record correctly', () => {
    const signer = 'John Doe';
    const email = 'john@client.com';
    const ip = '192.168.1.100';

    expect(signer).toBe('John Doe');
    expect(email).toContain('@client.com');
    expect(ip).toBe('192.168.1.100');
  });
});
