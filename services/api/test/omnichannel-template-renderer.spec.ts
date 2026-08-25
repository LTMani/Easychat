import { Test, TestingModule } from '@nestjs/testing';
import { OmnichannelTemplateRendererService } from '../src/modules/automation/omnichannel-template-renderer.service';

describe('OmnichannelTemplateRendererService', () => {
  let service: OmnichannelTemplateRendererService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OmnichannelTemplateRendererService],
    }).compile();
    service = module.get<OmnichannelTemplateRendererService>(OmnichannelTemplateRendererService);
  });

  it('should interpolate template variables and handle missing defaults', () => {
    const tpl = 'Hello {{ first_name }}, your quote for {{ plan_name }} is ready! View at {{ portal_url }}.';
    const res = service.renderTemplate(tpl, { first_name: 'Rahul', plan_name: 'Enterprise Tier' });

    expect(res.renderedText).toContain('Hello Rahul');
    expect(res.renderedText).toContain('Enterprise Tier');
    expect(res.missingVariables).toContain('portal_url');
  });
});
