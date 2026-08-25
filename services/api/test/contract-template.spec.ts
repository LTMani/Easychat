import { Test, TestingModule } from '@nestjs/testing';
import { ContractTemplateService } from '../src/modules/contracts/contract-template.service';

describe('ContractTemplateService', () => {
  let service: ContractTemplateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContractTemplateService],
    }).compile();
    service = module.get<ContractTemplateService>(ContractTemplateService);
  });

  it('should list available contract templates', () => {
    const templates = service.listTemplates();
    expect(templates.length).toBeGreaterThanOrEqual(3);
  });

  it('should render MSA template replacing placeholders', () => {
    const result = service.renderTemplate('tmpl_msa', {
      CLIENT_NAME: 'Acme International',
      ORGANIZATION_NAME: 'EasyChat Global',
      EFFECTIVE_DATE: '2026-09-01',
      ANNUAL_FEE: '$120,000 USD',
      PAYMENT_TERMS: 'Net 30 Days',
    });

    expect(result.missingVariables).toHaveLength(0);
    expect(result.html).toContain('Acme International');
    expect(result.html).toContain('$120,000 USD');
  });

  it('should report missing template variables', () => {
    const result = service.renderTemplate('tmpl_msa', {
      CLIENT_NAME: 'Acme International',
    });

    expect(result.missingVariables).toContain('ORGANIZATION_NAME');
    expect(result.missingVariables).toContain('ANNUAL_FEE');
  });
});
