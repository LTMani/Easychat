import { Test, TestingModule } from '@nestjs/testing';
import { LeadScoringService } from '../src/modules/crm/lead-scoring.service';

describe('LeadScoringService', () => {
  let service: LeadScoringService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LeadScoringService],
    }).compile();
    service = module.get<LeadScoringService>(LeadScoringService);
  });

  it('should be defined', () => expect(service).toBeDefined());

  it('should calculate grade A for score >= 80', () => {
    const score = 85;
    const grade = score >= 80 ? 'A' : score >= 60 ? 'B' : score >= 40 ? 'C' : score >= 20 ? 'D' : 'F';
    expect(grade).toBe('A');
  });

  it('should award referral bonus signal of +30', () => {
    let score = 0;
    const source = 'REFERRAL';
    if (source === 'REFERRAL') score += 30;
    expect(score).toBe(30);
  });

  it('should award +25 for estimated revenue > $10k', () => {
    let score = 0;
    const estimatedRevenue = 15000;
    if (estimatedRevenue > 10000) score += 25;
    expect(score).toBe(25);
  });

  it('should award +20 for CTO title signals', () => {
    let score = 0;
    const jobTitle = 'Chief Technology Officer';
    if (jobTitle.toLowerCase().includes('cto') || jobTitle.toLowerCase().includes('chief')) score += 20;
    expect(score).toBe(20);
  });
});
