import { Test, TestingModule } from '@nestjs/testing';
import { AbTestingService } from '../src/modules/marketing/ab-testing.service';

describe('AbTestingService', () => {
  let service: AbTestingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AbTestingService],
    }).compile();
    service = module.get<AbTestingService>(AbTestingService);
  });

  it('should be defined', () => expect(service).toBeDefined());

  it('should select a variant from the variants list', () => {
    const variants = [
      { id: 'v1', name: 'Variant A', content: 'Hello!', weight: 50 },
      { id: 'v2', name: 'Variant B', content: 'Hi there!', weight: 50 },
    ];
    const selected = service.selectVariant(variants);
    expect(['v1', 'v2']).toContain(selected.id);
  });

  it('should favor the higher weight variant when weight is 100 vs 0', () => {
    const variants = [
      { id: 'v1', name: 'Dominant', content: 'A', weight: 100 },
      { id: 'v2', name: 'Ignored', content: 'B', weight: 0 },
    ];
    const selected = service.selectVariant(variants);
    expect(selected.id).toBe('v1');
  });

  it('should correctly compute open rate from sent and open counts', () => {
    const results = service.analyzeTestResults([
      { variantId: 'v1', variantName: 'A', sentCount: 100, openCount: 25, clickCount: 10 },
      { variantId: 'v2', variantName: 'B', sentCount: 100, openCount: 40, clickCount: 15 },
    ]);
    expect(results[0].openRate).toBe(25.0);
    expect(results[1].openRate).toBe(40.0);
  });

  it('should correctly mark the winner based on highest click rate', () => {
    const results = service.analyzeTestResults([
      { variantId: 'v1', variantName: 'A', sentCount: 100, openCount: 25, clickCount: 5 },
      { variantId: 'v2', variantName: 'B', sentCount: 100, openCount: 40, clickCount: 18 },
    ]);
    const winner = service.determineWinner(results);
    expect(winner?.variantId).toBe('v2');
    expect(winner?.isWinner).toBe(true);
  });

  it('should handle zero sent count without division errors', () => {
    const results = service.analyzeTestResults([
      { variantId: 'v1', variantName: 'A', sentCount: 0, openCount: 0, clickCount: 0 },
    ]);
    expect(results[0].openRate).toBe(0);
    expect(results[0].clickRate).toBe(0);
  });
});
