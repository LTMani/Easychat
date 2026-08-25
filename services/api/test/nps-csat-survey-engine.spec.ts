import { Test, TestingModule } from '@nestjs/testing';
import { NpsCsatSurveyEngineService } from '../src/modules/support/nps-csat-survey-engine.service';

describe('NpsCsatSurveyEngineService', () => {
  let service: NpsCsatSurveyEngineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NpsCsatSurveyEngineService],
    }).compile();
    service = module.get<NpsCsatSurveyEngineService>(NpsCsatSurveyEngineService);
  });

  it('should categorize NPS responses into promoters, passives, and detractors and calculate NPS accurately', () => {
    service.submitNpsResponse('c_1', 10, 'Love the product!');
    service.submitNpsResponse('c_2', 9, 'Great speed.');
    service.submitNpsResponse('c_3', 7, 'Average.');
    service.submitNpsResponse('c_4', 3, 'Slow response.');

    const stats = service.calculateAggregateNps();
    expect(stats.totalResponses).toBe(4);
    expect(stats.promoterCount).toBe(2);
    expect(stats.passiveCount).toBe(1);
    expect(stats.detractorCount).toBe(1);
    expect(stats.netPromoterScore).toBe(25); // ((2 - 1) / 4) * 100 = 25
  });
});
