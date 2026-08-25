import { Test, TestingModule } from '@nestjs/testing';
import { CampaignExecutorService } from '../src/modules/marketing/campaign-executor.service';
import { EmailTemplateRendererService } from '../src/modules/marketing/email-template-renderer.service';

describe('Marketing Services', () => {
  let campaignService: CampaignExecutorService;
  let rendererService: EmailTemplateRendererService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CampaignExecutorService, EmailTemplateRendererService],
    }).compile();

    campaignService = module.get<CampaignExecutorService>(CampaignExecutorService);
    rendererService = module.get<EmailTemplateRendererService>(EmailTemplateRendererService);
  });

  it('should define marketing services', () => {
    expect(campaignService).toBeDefined();
    expect(rendererService).toBeDefined();
  });

  it('should render handlebars template variables correctly', () => {
    const template = 'Hello {{firstName}}, welcome to {{companyName}}!';
    const context = { firstName: 'Alice', companyName: 'Acme Corp' };
    const result = rendererService.renderTemplate(template, context);

    expect(result).toBe('Hello Alice, welcome to Acme Corp!');
  });

  it('should inject tracking pixel into HTML email body', () => {
    const html = '<html><body><p>Test Email</p></body></html>';
    const result = rendererService.injectTrackingPixel(html, 'trk_123');

    expect(result).toContain('api.easychat.io/v1/marketing/track/open/trk_123');
  });
});
