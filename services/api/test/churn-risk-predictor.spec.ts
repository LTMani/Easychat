import { Test, TestingModule } from '@nestjs/testing';
import { ChurnRiskPredictorService } from '../src/modules/support/churn-risk-predictor.service';

describe('ChurnRiskPredictorService', () => {
  let service: ChurnRiskPredictorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChurnRiskPredictorService],
    }).compile();
    service = module.get<ChurnRiskPredictorService>(ChurnRiskPredictorService);
  });

  it('should flag account with 3+ urgent tickets as CRITICAL churn risk', () => {
    const res = service.predictAccountRisk('acc_01', 'Enterprise Global', 15000, 4, 60, 4);
    expect(res.churnRiskLevel).toBe('CRITICAL');
    expect(res.suggestedRetentionAction).toContain('Senior VP');
  });

  it('should mark healthy accounts as LOW churn risk', () => {
    const res = service.predictAccountRisk('acc_02', 'Happy Customer Corp', 4000, 0, 0, 10);
    expect(res.churnRiskLevel).toBe('LOW');
  });
});
