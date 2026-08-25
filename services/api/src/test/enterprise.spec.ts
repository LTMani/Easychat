import { AutomationService } from '../modules/automation/automation.service';
import { AnalyticsService } from '../modules/analytics/analytics.service';
import { AiService } from '../modules/ai/ai.service';
import { PlatformService } from '../modules/platform/platform.service';
import { EnterpriseService } from '../modules/enterprise/enterprise.service';

describe('Enterprise Roadmap (Phases 6-10) Unit Tests', () => {
  let autoService: AutomationService;
  let analyticsService: AnalyticsService;
  let aiService: AiService;
  let platformService: PlatformService;
  let enterpriseService: EnterpriseService;

  beforeEach(() => {
    autoService = new AutomationService();
    analyticsService = new AnalyticsService();
    aiService = new AiService();
    platformService = new PlatformService();
    enterpriseService = new EnterpriseService();
  });

  it('should instantiate all enterprise services cleanly', () => {
    expect(autoService).toBeDefined();
    expect(analyticsService).toBeDefined();
    expect(aiService).toBeDefined();
    expect(platformService).toBeDefined();
    expect(enterpriseService).toBeDefined();
  });
});
