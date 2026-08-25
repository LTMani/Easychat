import { Injectable, Logger } from '@nestjs/common';

export interface ContractTemplate {
  id: string;
  name: string;
  category: 'SALES' | 'LEGAL' | 'HR' | 'PARTNER';
  templateHtml: string;
  requiredVariables: string[];
}

@Injectable()
export class ContractTemplateService {
  private readonly logger = new Logger(ContractTemplateService.name);

  readonly TEMPLATES: ContractTemplate[] = [
    {
      id: 'tmpl_msa',
      name: 'Master Services Agreement (Enterprise)',
      category: 'SALES',
      requiredVariables: ['CLIENT_NAME', 'ORGANIZATION_NAME', 'EFFECTIVE_DATE', 'ANNUAL_FEE', 'PAYMENT_TERMS'],
      templateHtml: `
        <h1>MASTER SERVICES AGREEMENT</h1>
        <p>This Master Services Agreement is entered into on <strong>{{EFFECTIVE_DATE}}</strong> between <strong>{{ORGANIZATION_NAME}}</strong> ("Provider") and <strong>{{CLIENT_NAME}}</strong> ("Customer").</p>
        <h2>1. Scope of Services</h2>
        <p>Provider agrees to deliver enterprise cloud CRM and communications infrastructure as detailed in attached Service Orders.</p>
        <h2>2. Fees & Payment</h2>
        <p>Customer shall pay an annual subscription fee of <strong>{{ANNUAL_FEE}}</strong> in accordance with <strong>{{PAYMENT_TERMS}}</strong>.</p>
      `,
    },
    {
      id: 'tmpl_dpa',
      name: 'Data Processing Addendum (GDPR / Standard Contractual Clauses)',
      category: 'LEGAL',
      requiredVariables: ['CONTROLLER_NAME', 'PROCESSOR_NAME', 'DPO_EMAIL', 'DATA_CATEGORIES'],
      templateHtml: `
        <h1>DATA PROCESSING ADDENDUM</h1>
        <p>Pursuant to GDPR Article 28, between <strong>{{CONTROLLER_NAME}}</strong> (Data Controller) and <strong>{{PROCESSOR_NAME}}</strong> (Data Processor).</p>
        <h2>1. Processing Scope</h2>
        <p>Categories of processed personal data include: <em>{{DATA_CATEGORIES}}</em>.</p>
        <p>Data Protection Officer contact: <strong>{{DPO_EMAIL}}</strong>.</p>
      `,
    },
    {
      id: 'tmpl_sla_addendum',
      name: 'Service Level Agreement & Uptime Guarantee Addendum',
      category: 'LEGAL',
      requiredVariables: ['UPTIME_PERCENT', 'RESPONSE_MINUTES', 'CREDIT_PERCENT'],
      templateHtml: `
        <h1>SERVICE LEVEL AGREEMENT ADDENDUM</h1>
        <p>Provider commits to maintaining a monthly service availability of at least <strong>{{UPTIME_PERCENT}}%</strong>.</p>
        <p>Target initial response time for Critical Priority incidents is <strong>{{RESPONSE_MINUTES}} minutes</strong>.</p>
        <p>Failure to meet quarterly targets entitles Customer to a <strong>{{CREDIT_PERCENT}}%</strong> service credit.</p>
      `,
    },
  ];

  renderTemplate(templateId: string, variables: Record<string, string>): { html: string; missingVariables: string[] } {
    this.logger.debug(`Rendering contract template ${templateId}`);

    const template = this.TEMPLATES.find((t) => t.id === templateId);
    if (!template) throw new Error(`Contract template ${templateId} not found`);

    const missingVariables: string[] = [];
    for (const req of template.requiredVariables) {
      if (!variables[req]) {
        missingVariables.push(req);
      }
    }

    let rendered = template.templateHtml;
    for (const [key, val] of Object.entries(variables)) {
      const regex = new RegExp(`{{${key}}}`, 'g');
      rendered = rendered.replace(regex, val);
    }

    return { html: rendered, missingVariables };
  }

  listTemplates(category?: ContractTemplate['category']): ContractTemplate[] {
    if (category) return this.TEMPLATES.filter((t) => t.category === category);
    return this.TEMPLATES;
  }
}
