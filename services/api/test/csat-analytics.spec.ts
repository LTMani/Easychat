import { Test, TestingModule } from '@nestjs/testing';
import { CsatAnalyticsService } from '../src/modules/support/csat-analytics.service';

describe('CsatAnalyticsService', () => {
  let service: CsatAnalyticsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CsatAnalyticsService],
    }).compile();
    service = module.get<CsatAnalyticsService>(CsatAnalyticsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
