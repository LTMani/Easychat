import { Test, TestingModule } from '@nestjs/testing';
import { PredictiveRfmScoringService } from '../src/modules/cdp/predictive-rfm-scoring.service';

describe('PredictiveRfmScoringService', () => {
  let service: PredictiveRfmScoringService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PredictiveRfmScoringService],
    }).compile();
    service = module.get<PredictiveRfmScoringService>(PredictiveRfmScoringService);
  });

  it('should classify high-value recent customers as CHAMPIONS', () => {
    const res = service.calculateRfmScore('c_01', 4, 25, 35000); // 4 days ago, 25 orders, $35k
    expect(res.segment).toBe('CHAMPIONS');
    expect(res.recencyScore).toBe(5);
    expect(res.frequencyScore).toBe(5);
    expect(res.monetaryScore).toBe(5);
    expect(res.compositeRfmScore).toBe(555);
  });

  it('should classify inactive past buyers as AT_RISK', () => {
    const res = service.calculateRfmScore('c_02', 150, 12, 12000); // 150 days ago, 12 orders, $12k
    expect(res.segment).toBe('AT_RISK');
    expect(res.recencyScore).toBe(1);
  });
});
